import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TransformationMomentProps {
  isActive: boolean;
  onComplete?: () => void;
}

const content = {
  tr: {
    activating: "Obenan Aktif",
  },
  en: {
    activating: "Obenan Active",
  },
};

/**
 * The "activation moment" overlay that appears during the transition phase.
 * Shows a centered badge with a subtle ripple effect.
 * Enterprise-grade: clean, not gamified.
 */
export const TransformationMoment = ({ isActive, onComplete }: TransformationMomentProps) => {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center"
          onAnimationComplete={() => {
            // Trigger complete after exit animation
            if (!isActive && onComplete) {
              onComplete();
            }
          }}
        >
          {/* Subtle ripple effect - slower expansion */}
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-32 h-32 rounded-full border-2 border-cta/30"
          />
          
          {/* Second ripple with delay - more deliberate */}
          <motion.div
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
            className="absolute w-32 h-32 rounded-full border border-cta/20"
          />
          
          {/* Third ripple for extra depth */}
          <motion.div
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
            className="absolute w-32 h-32 rounded-full border border-cta/15"
          />

          {/* Activation badge - delayed entrance, stays visible longer */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ 
              scale: [0.8, 1.02, 1], 
              opacity: 1, 
              y: 0 
            }}
            exit={{ scale: 0.95, opacity: 0, y: -5 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.5 
            }}
            className="relative flex items-center gap-2 px-5 py-2.5 bg-cta text-cta-foreground rounded-full shadow-cta"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-4 h-4 fill-current" />
            </motion.div>
            <span className="font-semibold text-sm tracking-wide">{t.activating}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
