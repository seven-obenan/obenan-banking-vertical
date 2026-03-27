import { motion } from "framer-motion";

interface DirectoryInfo {
  key: string;
  nameEN: string;
  nameTR: string;
  logoUrl: string;
}

interface DirectoryChipListProps {
  directories: DirectoryInfo[];
  language: "tr" | "en";
  isSynced: boolean;
}

export const DirectoryChipList = ({
  directories,
  language,
  isSynced,
}: DirectoryChipListProps) => {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {directories.map((dir) => (
        <motion.div
          key={dir.key}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-500 ${
            isSynced
              ? "bg-status-excellent/10 text-status-excellent border border-status-excellent/20"
              : "bg-muted/50 text-muted-foreground border border-border/50"
          }`}
        >
          <div className="w-4 h-4 rounded overflow-hidden flex-shrink-0 bg-background">
            <img
              src={dir.logoUrl}
              alt={language === "tr" ? dir.nameTR : dir.nameEN}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <span>{language === "tr" ? dir.nameTR : dir.nameEN}</span>
          <span
            className={`transition-colors duration-500 ${
              isSynced ? "text-status-excellent font-medium" : ""
            }`}
          >
            → {isSynced ? "100%" : "0%"}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
