import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeaturedPlatformCardProps {
  name: string;
  logoUrl: string;
  currentPercent: number;
  isSynced: boolean;
  isSuffering: boolean;
  index: number;
  syncedLabel: string;
  visibleLabel: string;
}

export const FeaturedPlatformCard = ({
  name,
  logoUrl,
  currentPercent,
  isSynced,
  isSuffering,
  index,
  syncedLabel,
  visibleLabel,
}: FeaturedPlatformCardProps) => {
  const { language } = useLanguage();
  const displayPercent = isSynced ? 100 : currentPercent;
  const hasPartial = currentPercent > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className={`bg-card rounded-2xl border p-6 md:p-8 transition-all duration-700 ${
        isSynced
          ? "border-status-excellent/30 shadow-lg"
          : isSuffering && !hasPartial
            ? "border-status-watch/20 shadow-sm"
            : isSuffering && hasPartial
              ? "border-status-watch/30 shadow-md"
              : "border-border shadow-sm"
      }`}
    >
      {/* Logo & Name */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden flex-shrink-0 bg-background border transition-all duration-500 ${
            isSynced
              ? "border-status-excellent/30 ring-2 ring-status-excellent/20"
              : "border-border"
          }`}
        >
          <img
            src={logoUrl}
            alt={name}
            className="w-full h-full object-contain p-1"
            loading="lazy"
          />
        </div>
        <span className="text-lg md:text-xl font-semibold text-foreground">
          {name}
        </span>
      </div>

      {/* Big percentage */}
      <div className="mb-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={isSynced ? "synced" : "current"}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
            className={`text-3xl md:text-4xl font-bold tabular-nums transition-colors duration-500 ${
              isSynced
                ? "text-status-excellent"
                : hasPartial
                  ? "text-status-watch"
                  : "text-muted-foreground/40"
            }`}
          >
            {displayPercent}%
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden mb-4">
        <motion.div
          className={`h-full rounded-full transition-colors duration-500 ${
            isSynced ? "bg-status-excellent" : hasPartial ? "bg-status-watch" : "bg-muted-foreground/20"
          }`}
          initial={{ width: `${currentPercent}%` }}
          animate={{ width: `${displayPercent}%` }}
          transition={{
            duration: 1.2,
            delay: isSynced ? index * 0.3 : 0,
            ease: "easeOut",
          }}
        />
        {/* Glow effect when synced */}
        {isSynced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.3 }}
            className="absolute inset-0 bg-status-excellent/20 blur-sm rounded-full"
          />
        )}
      </div>

      {/* Status label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isSynced ? "synced" : "current"}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${
            isSynced
              ? "bg-status-excellent/10 text-status-excellent"
              : hasPartial
                ? "bg-status-watch/10 text-status-watch"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {isSynced && <Check className="w-3.5 h-3.5" />}
          {isSynced
            ? `100% ${syncedLabel}`
            : `${currentPercent}% ${visibleLabel}`}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
