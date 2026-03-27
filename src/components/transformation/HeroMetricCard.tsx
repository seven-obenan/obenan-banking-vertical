import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroMetricCardProps {
  icon: React.ElementType;
  labelTr: string;
  labelEn: string;
  todayTr: string;
  todayEn: string;
  futureTr: string;
  futureEn: string;
  isTransformed: boolean;
  isSuffering: boolean;
  index: number;
  automatedLabel: string;
}

export const HeroMetricCard = ({
  icon: Icon,
  labelTr,
  labelEn,
  todayTr,
  todayEn,
  futureTr,
  futureEn,
  isTransformed,
  isSuffering,
  index,
  automatedLabel,
}: HeroMetricCardProps) => {
  const { language } = useLanguage();
  const label = language === "tr" ? labelTr : labelEn;
  const today = language === "tr" ? todayTr : todayEn;
  const future = language === "tr" ? futureTr : futureEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className={`relative bg-card rounded-2xl border p-6 md:p-8 text-center transition-all duration-700 overflow-hidden ${
        isTransformed
          ? "border-status-excellent/30 shadow-lg"
          : isSuffering
            ? "border-status-watch/30 shadow-md"
            : "border-border shadow-sm"
      }`}
      style={{
        animation: isSuffering
          ? "phase-suffering-glow 3s ease-in-out infinite"
          : isTransformed
            ? "phase-success-glow 3s ease-in-out infinite"
            : "none",
      }}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-colors duration-500 ${
          isTransformed
            ? "bg-status-excellent/10"
            : isSuffering
              ? "bg-status-watch/10"
              : "bg-secondary"
        }`}
      >
        <Icon
          className={`w-6 h-6 transition-colors duration-500 ${
            isTransformed
              ? "text-status-excellent"
              : isSuffering
                ? "text-status-watch"
                : "text-muted-foreground"
          }`}
        />
      </div>

      {/* Label */}
      <p className="text-lg md:text-xl font-medium text-muted-foreground mb-3">
        {label}
      </p>

      {/* Value — crossfade between today and future */}
      <div className="relative h-[72px] md:h-[88px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isTransformed ? (
            <motion.span
              key="future"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.15, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-status-excellent tabular-nums"
            >
              {future}
            </motion.span>
          ) : (
            <motion.span
              key="today"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.15, ease: "easeOut" }}
              className={`text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums ${
                isSuffering ? "text-status-watch" : "text-foreground"
              }`}
            >
              {today}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Inactive value hint */}
      <p
        className={`text-sm mt-2 transition-all duration-500 ${
          isTransformed ? "text-muted-foreground/60" : "text-muted-foreground/40"
        }`}
      >
        {isTransformed ? `${language === "tr" ? "Bugün" : "Today"}: ${today}` : `${language === "tr" ? "Obenan ile" : "With Obenan"}: ${future}`}
      </p>

      {/* Automated badge */}
      <AnimatePresence>
        {isTransformed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 200 }}
            className="mt-4 inline-flex items-center gap-1.5 bg-status-excellent/10 text-status-excellent text-sm font-medium px-3 py-1.5 rounded-full"
          >
            <Check className="w-3.5 h-3.5" />
            {automatedLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
