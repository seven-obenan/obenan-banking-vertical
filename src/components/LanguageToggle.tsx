import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-border">
        <motion.button
          onClick={() => setLanguage("tr")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            language === "tr"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          TR
        </motion.button>
        <motion.button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            language === "en"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          EN
        </motion.button>
      </div>
    </div>
  );
};
