import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => onComplete(), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-subtle" />

      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute"
          >
            <motion.div
              className="w-48 h-48 rounded-full border-2 border-[#006EEE]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-[#6062D4]/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-[#00A4E3]/10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative z-10 text-center"
          >
            <motion.div
              className="mx-auto mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(84deg, #E9C100 0%, #FB1B33 28.98%, #6062D4 71.84%, #00A4E3 100%)' }}>
                  <span className="text-white font-medium text-lg">O</span>
                </div>
                <span className="text-[24px] font-light text-base-black tracking-tight">obenan</span>
              </div>
            </motion.div>

            {phase >= 3 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-[24px] font-light tracking-[4px] text-base-black/70 uppercase">
                  Banking Network Governance
                </h1>
                <p className="text-[14px] text-description mt-3 tracking-wide font-light">
                  Industry Intelligence Report
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-[14px] text-description hover:text-base-black transition-colors font-light"
      >
        Skip →
      </motion.button>
    </motion.div>
  );
};
