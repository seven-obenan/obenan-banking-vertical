import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SupportingMetric {
  icon: React.ElementType;
  labelTr: string;
  labelEn: string;
  todayTr: string;
  todayEn: string;
  futureTr: string;
  futureEn: string;
  tooltipTr: string;
  tooltipEn: string;
}

interface SupportingMetricGridProps {
  metrics: SupportingMetric[];
  isTransformed: boolean;
  isSuffering: boolean;
  automatedLabel: string;
}

export const SupportingMetricGrid = ({
  metrics,
  isTransformed,
  isSuffering,
  automatedLabel,
}: SupportingMetricGridProps) => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const label = language === "tr" ? metric.labelTr : metric.labelEn;
        const today = language === "tr" ? metric.todayTr : metric.todayEn;
        const future = language === "tr" ? metric.futureTr : metric.futureEn;
        const tooltip = language === "tr" ? metric.tooltipTr : metric.tooltipEn;

        return (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.06 }}
                className={`bg-card rounded-xl border p-4 text-center cursor-help transition-all duration-500 ${
                  isTransformed
                    ? "border-status-excellent/20 shadow-sm"
                    : isSuffering
                      ? "border-status-watch/20"
                      : "border-border"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center transition-colors duration-500 ${
                    isTransformed
                      ? "bg-status-excellent/10"
                      : isSuffering
                        ? "bg-status-watch/10"
                        : "bg-secondary"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-500 ${
                      isTransformed
                        ? "text-status-excellent"
                        : isSuffering
                          ? "text-status-watch"
                          : "text-muted-foreground"
                    }`}
                  />
                </div>

                <p className="text-xs font-medium text-muted-foreground mb-1 truncate">
                  {label}
                </p>

                {/* Value with crossfade */}
                <div className="relative h-[36px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isTransformed ? (
                      <motion.span
                        key="future"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl md:text-3xl font-bold text-status-excellent tabular-nums"
                      >
                        {future}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="today"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className={`text-2xl md:text-3xl font-bold tabular-nums ${
                          isSuffering
                            ? "text-status-watch"
                            : "text-foreground"
                        }`}
                      >
                        {today}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Automated mini badge */}
                <AnimatePresence>
                  {isTransformed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        delay: 0.3 + index * 0.08,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="mt-2 inline-flex items-center gap-1 text-status-excellent text-[10px] font-medium"
                    >
                      <Check className="w-3 h-3" />
                      {automatedLabel}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
