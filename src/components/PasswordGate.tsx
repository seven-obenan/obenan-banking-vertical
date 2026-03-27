import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { prospectPack } from "@/data/prospectPack";

interface PasswordGateProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = "YapiKrediObenan";
const STORAGE_KEY = "yk_report_unlocked";

export const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const isUnlocked = localStorage.getItem(STORAGE_KEY);
    if (isUnlocked === "true") {
      onUnlock();
    }
  }, [onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const content = {
    tr: {
      title: "Özel Fırsat Raporu",
      for: "için",
      subtitle: "Canlı Google Haritalar konum verilerinden oluşturuldu",
      placeholder: "Erişim kodunu girin",
      error: "Geçersiz erişim kodu. Lütfen tekrar deneyin.",
      button: "Rapora Eriş",
      footer: "Yapı Kredi için hazırlandı",
      by: "tarafından",
    },
    en: {
      title: "Private Opportunity Report",
      for: "for",
      subtitle: "Built from live Google Maps location data",
      placeholder: "Enter access code",
      error: "Invalid access code. Please try again.",
      button: "Access Report",
      footer: "Prepared for Yapı Kredi by",
      by: "",
    },
  };

  const reportDate = prospectPack.reportDate[language];

  const t = content[language];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-subtle"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Floating dots - subtle */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className={`relative z-10 w-full max-w-md mx-4 ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          animation: isShaking ? "shake 0.5s ease-in-out" : undefined,
        }}
      >
        <div className="bg-white rounded-2xl p-8 border border-border shadow-xl">
          {/* YK Logo */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <img 
              src="/yapikredi-logo.svg" 
              alt="Yapı Kredi" 
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Lock Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-150" />
              <div className="relative w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <Lock className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-2xl font-bold text-center mb-2 text-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t.title}
          </motion.h1>
          
          <motion.p
            className="text-muted-foreground text-center mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-primary font-semibold">Yapı Kredi</span> {t.for}
          </motion.p>

          <motion.p
            className="text-sm text-muted-foreground text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t.subtitle}
          </motion.p>

          {/* Password Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="relative mb-4">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder={t.placeholder}
                className={`pr-10 bg-secondary/50 border-border focus:border-primary transition-colors ${
                  error ? "border-status-watch" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-status-watch text-sm text-center mb-4"
                >
                  {t.error}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full bg-cta hover:bg-cta/90 transition-all font-semibold shadow-cta"
            >
              {t.button}
            </Button>
          </motion.form>

          {/* Footer */}
          <motion.p
            className="text-xs text-muted-foreground text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {language === "tr" 
              ? `Yapı Kredi için hazırlandı • Obenan tarafından • ${reportDate}`
              : `Prepared for Yapı Kredi by Obenan • ${reportDate}`
            }
          </motion.p>
        </div>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </motion.div>
  );
};
