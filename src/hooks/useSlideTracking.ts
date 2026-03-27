import { useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SlideTrackingOptions {
  slideId: string;
  isActive: boolean;
}

export const useSlideTracking = ({ slideId, isActive }: SlideTrackingOptions) => {
  const viewStartRef = useRef<string | null>(null);
  const slideViewIdRef = useRef<string | null>(null);

  const trackSlideView = useCallback(async () => {
    const sessionId = sessionStorage.getItem('session_id');
    const email = sessionStorage.getItem('user_email');
    if (!sessionId || !email) return;

    const viewStart = new Date().toISOString();
    viewStartRef.current = viewStart;

    try {
      const { data } = await supabase.from('slide_views')
        .insert({
          session_id: sessionId,
          email,
          slide_id: slideId,
          view_start: viewStart,
        })
        .select('id')
        .single();

      slideViewIdRef.current = data?.id || null;
    } catch (err) {
      console.error('Error tracking slide view:', err);
    }
  }, [slideId]);

  const endSlideView = useCallback(async () => {
    if (!slideViewIdRef.current || !viewStartRef.current) return;

    const viewEnd = new Date().toISOString();
    const durationSeconds = Math.floor(
      (new Date(viewEnd).getTime() - new Date(viewStartRef.current).getTime()) / 1000
    );

    try {
      await supabase.from('slide_views')
        .update({
          view_end: viewEnd,
          duration_seconds: durationSeconds,
        })
        .eq('id', slideViewIdRef.current);
    } catch (err) {
      console.error('Error ending slide view:', err);
    }

    slideViewIdRef.current = null;
    viewStartRef.current = null;
  }, []);

  useEffect(() => {
    if (isActive) {
      trackSlideView();
    } else if (slideViewIdRef.current) {
      endSlideView();
    }

    return () => {
      if (slideViewIdRef.current) {
        endSlideView();
      }
    };
  }, [isActive, trackSlideView, endSlideView]);

  return { trackSlideView, endSlideView };
};
