import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DirectoryInfo {
  key: string;
  nameEN: string;
  nameTR: string;
  logoUrl: string;
  currentPercent: number;
}

interface NetworkLogoGridProps {
  directories: DirectoryInfo[];
  language: "tr" | "en";
  isSynced: boolean;
  isSuffering: boolean;
  anchorDirectory?: DirectoryInfo | null;
  networkLabel: string;
  platformCount: number;
}

export const NetworkLogoGrid = ({
  directories,
  language,
  isSynced,
  isSuffering,
  anchorDirectory,
  networkLabel,
  platformCount,
}: NetworkLogoGridProps) => {
  const syncedLabel = language === "tr" ? "senkron" : "synced";
  const platformLabel = language === "tr" ? "platform" : "platforms";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      {/* Section Header */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <h3 className="text-lg font-semibold text-foreground">
          {networkLabel}
        </h3>
        <Badge
          variant="outline"
          className={`text-xs transition-colors duration-500 ${
            isSynced
              ? "border-status-excellent/50 text-status-excellent"
              : "border-border text-muted-foreground"
          }`}
        >
          {platformCount} {platformLabel}
        </Badge>
      </div>

      {/* Yapı Kredi Anchor Card — full width, special treatment */}
      {anchorDirectory && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{
            borderColor: isSynced
              ? "hsl(var(--status-excellent) / 0.4)"
              : isSuffering
                ? "hsl(var(--border) / 0.8)"
                : "hsl(var(--border))",
          }}
          transition={{ duration: 0.5 }}
          className={`relative bg-card rounded-xl border p-4 md:p-5 flex items-center gap-4 transition-all duration-700 ${
            isSynced
              ? "border-status-excellent/40 shadow-md shadow-status-excellent/5"
              : "border-border"
          }`}
        >
          <div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden flex-shrink-0 bg-background border flex items-center justify-center transition-all duration-500 ${
              isSynced
                ? "border-status-excellent/30 ring-2 ring-status-excellent/20"
                : "border-border"
            }`}
          >
            <img
              src={anchorDirectory.logoUrl}
              alt={
                language === "tr"
                  ? anchorDirectory.nameTR
                  : anchorDirectory.nameEN
              }
              className="w-10 h-10 md:w-11 md:h-11 object-contain p-0.5"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-base font-semibold text-foreground block">
              {language === "tr"
                ? anchorDirectory.nameTR
                : anchorDirectory.nameEN}
            </span>
            <span className="text-xs text-muted-foreground">
              {language === "tr" ? "Mevcut web sitesi" : "Existing website"}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.div
              animate={{
                backgroundColor: isSynced
                  ? "hsl(var(--status-excellent) / 0.1)"
                  : "hsl(var(--muted))",
              }}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-500 ${
                isSynced
                  ? "text-status-excellent"
                  : "text-muted-foreground"
              }`}
            >
              {isSynced && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.6,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <Check className="w-3.5 h-3.5" />
                </motion.div>
              )}
              100% {syncedLabel}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Directory Cascade Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {directories.map((dir, index) => {
          const name = language === "tr" ? dir.nameTR : dir.nameEN;

          return (
            <motion.div
              key={dir.key}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.03 }}
              className="relative"
            >
              <motion.div
                animate={{
                  opacity: isSynced ? 1 : 0.5,
                  filter: isSynced ? "grayscale(0)" : "grayscale(0.8)",
                  scale: isSynced ? [1, 1.03, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: isSynced ? 0.8 + index * 0.1 : 0,
                  ease: "easeOut",
                  scale: {
                    duration: 0.4,
                    delay: isSynced ? 0.8 + index * 0.1 : 0,
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  },
                }}
                className={`bg-card rounded-xl border p-3 md:p-4 flex flex-col items-center gap-2 text-center transition-all duration-500 ${
                  isSynced
                    ? "border-status-excellent/30 shadow-sm"
                    : isSuffering
                      ? "border-border/50"
                      : "border-border"
                }`}
              >
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden flex-shrink-0 bg-background border flex items-center justify-center transition-all duration-500 ${
                    isSynced
                      ? "border-status-excellent/20"
                      : "border-border/50"
                  }`}
                >
                  <img
                    src={dir.logoUrl}
                    alt={name}
                    className="w-6 h-6 md:w-7 md:h-7 object-contain"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`text-xs md:text-sm font-medium leading-tight transition-colors duration-500 line-clamp-1 ${
                    isSynced ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {name}
                </span>
              </motion.div>

              {/* Green check overlay */}
              {isSynced && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-status-excellent rounded-full flex items-center justify-center shadow-sm"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
