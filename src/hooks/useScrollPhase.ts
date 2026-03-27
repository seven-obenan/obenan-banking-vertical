import { useState, useEffect, useRef, RefObject } from "react";

export type TransformationPhase = "suffering" | "transitioning" | "transformed";

interface UseScrollPhaseOptions {
  /** Scroll progress threshold to trigger transition (0-1). Default 0.4 */
  threshold?: number;
  /** Duration of the transitioning phase in ms. Default 1200 */
  transitionDuration?: number;
  /** Respect prefers-reduced-motion. Default true */
  respectReducedMotion?: boolean;
}

interface UseScrollPhaseReturn {
  phase: TransformationPhase;
  scrollProgress: number;
  isManuallyLocked: boolean;
  setManualPhase: (transformed: boolean) => void;
}

/**
 * Scroll-driven phase management for storytelling transitions.
 * Tracks scroll progress within a section and transitions through phases:
 * suffering → transitioning → transformed
 * 
 * Manual toggle locks the phase (won't fight user interaction).
 */
export function useScrollPhase(
  sectionRef: RefObject<HTMLElement>,
  options: UseScrollPhaseOptions = {}
): UseScrollPhaseReturn {
  const {
    threshold = 0.4,
    transitionDuration = 1200,
    respectReducedMotion = true,
  } = options;

  const [phase, setPhase] = useState<TransformationPhase>("suffering");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isManuallyLocked, setIsManuallyLocked] = useState(false);
  const hasTransitioned = useRef(false);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = respectReducedMotion && 
    typeof window !== "undefined" && 
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Manual toggle handler - locks the phase
  const setManualPhase = (transformed: boolean) => {
    setIsManuallyLocked(true);
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    if (prefersReducedMotion) {
      // Skip transition phase for reduced motion
      setPhase(transformed ? "transformed" : "suffering");
    } else if (transformed && phase === "suffering") {
      setPhase("transitioning");
      transitionTimeoutRef.current = setTimeout(() => {
        setPhase("transformed");
      }, transitionDuration);
    } else if (!transformed) {
      setPhase("suffering");
      hasTransitioned.current = false;
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const calculateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section is visible/scrolled
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Progress: 0 when section top enters viewport, 1 when section bottom exits
      const visibleTop = Math.max(0, viewportHeight - sectionTop);
      const progress = Math.min(1, Math.max(0, visibleTop / (viewportHeight + sectionHeight * 0.5)));
      
      return progress;
    };

    const handleScroll = () => {
      // Don't auto-switch if manually locked
      if (isManuallyLocked) return;

      const progress = calculateProgress();
      setScrollProgress(progress);

      // Trigger transition when crossing threshold
      if (progress >= threshold && !hasTransitioned.current) {
        hasTransitioned.current = true;

        if (prefersReducedMotion) {
          setPhase("transformed");
        } else {
          setPhase("transitioning");
          transitionTimeoutRef.current = setTimeout(() => {
            setPhase("transformed");
          }, transitionDuration);
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [sectionRef, threshold, transitionDuration, isManuallyLocked, prefersReducedMotion]);

  return {
    phase,
    scrollProgress,
    isManuallyLocked,
    setManualPhase,
  };
}
