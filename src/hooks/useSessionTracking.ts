import { useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useSessionTracking = () => {
  const initializeSession = useCallback(async (email: string) => {
    const sessionId = crypto.randomUUID();
    sessionStorage.setItem('session_id', sessionId);
    sessionStorage.setItem('user_email', email);
    sessionStorage.setItem('session_start', new Date().toISOString());

    try {
      await supabase.from('email_submissions').insert({
        email,
        user_agent: navigator.userAgent,
      });
      await supabase.from('user_engagement').insert({
        email,
        session_id: sessionId,
        session_start: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error initializing session:', err);
    }
    return sessionId;
  }, []);

  const endSession = useCallback(async () => {
    const sessionId = sessionStorage.getItem('session_id');
    const email = sessionStorage.getItem('user_email');
    const sessionStart = sessionStorage.getItem('session_start');
    if (!sessionId || !email || !sessionStart) return;

    try {
      const sessionEnd = new Date().toISOString();
      const durationSeconds = Math.floor(
        (new Date(sessionEnd).getTime() - new Date(sessionStart).getTime()) / 1000
      );
      await supabase.from('user_engagement')
        .update({
          session_end: sessionEnd,
          duration_seconds: durationSeconds,
        })
        .eq('session_id', sessionId);
    } catch (err) {
      console.error('Error ending session:', err);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => endSession();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      endSession();
    };
  }, [endSession]);

  return { initializeSession, endSession };
};
