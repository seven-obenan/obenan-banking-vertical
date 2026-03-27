import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

type LoginState = "form" | "sending" | "sent" | "error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loginState, setLoginState] = useState<LoginState>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { language } = useLanguage();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // If already authenticated, redirect immediately
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          const intended = localStorage.getItem('intended_destination');
          localStorage.removeItem('intended_destination');
          navigate(intended || '/', { replace: true });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const intended = localStorage.getItem('intended_destination');
        localStorage.removeItem('intended_destination');
        navigate(intended || '/', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) return;

    setLoginState("sending");
    setErrorMessage("");

    try {
      const { data, error } = await supabase.functions.invoke('send-magic-link', {
        body: { email },
      });

      if (error) throw error;

      // CRITICAL: Check the response body for success: false
      if (data && data.success === false) {
        throw new Error(data.error || "Failed to send email. Please try again.");
      }

      setLoginState("sent");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred";
      setErrorMessage(msg);
      setLoginState("error");
    }
  };

  const content = {
    tr: {
      title: "Yapı Kredi İçin Hazırlandı",
      subtitle: "Obenan Dijital Yönetişim Platformu",
      description: "E-posta adresinizi girerek özel fırsat raporunuza erişin.",
      placeholder: "kurumsal@yapikredi.com.tr",
      button: "Erişim Linki Gönder",
      sending: "Gönderiliyor...",
      sentTitle: "E-postanızı Kontrol Edin",
      sentDescription: "adresine bir doğrulama linki gönderdik. Lütfen gelen kutunuzu kontrol edin.",
      sentNote: "Link 1 saat içinde geçerliliğini yitirir.",
      errorTitle: "Bir Hata Oluştu",
      tryAgain: "Tekrar Dene",
      footer: "Erişim kodunuz e-posta adresinize bağlıdır",
      by: "tarafından",
    },
    en: {
      title: "Prepared for Yapı Kredi",
      subtitle: "Obenan Digital Governance Platform",
      description: "Enter your email to access your private opportunity report.",
      placeholder: "corporate@yapikredi.com.tr",
      button: "Send Access Link",
      sending: "Sending...",
      sentTitle: "Check Your Email",
      sentDescription: "We sent a verification link to",
      sentNote: "The link expires in 1 hour.",
      errorTitle: "Something Went Wrong",
      tryAgain: "Try Again",
      footer: "Your access is tied to your email address",
      by: "by",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center relative">
      <LanguageToggle />
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
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
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl p-8 border border-border shadow-xl">
          {/* YK Logo */}
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <img 
              src="/yapikredi-logo.svg" 
              alt="Yapı Kredi" 
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-150" />
              <div className="relative w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <Mail className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* FORM STATE */}
            {loginState === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h1 className="text-2xl font-bold text-center mb-1 text-foreground">
                  {t.title}
                </h1>
                <p className="text-primary font-semibold text-center mb-1 text-sm">
                  {t.subtitle}
                </p>
                <p className="text-muted-foreground text-center mb-6 text-sm">
                  {t.description}
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="relative mb-4">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.placeholder}
                      className="pl-10 bg-secondary/50 border-border focus:border-primary transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isValidEmail}
                    className="w-full bg-cta hover:bg-cta/90 transition-all font-semibold shadow-cta disabled:opacity-50"
                  >
                    {t.button}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </motion.div>
            )}

            {/* SENDING STATE */}
            {loginState === "sending" && (
              <motion.div
                key="sending"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-4"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">{t.sending}</p>
              </motion.div>
            )}

            {/* SENT STATE */}
            {loginState === "sent" && (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-4"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">{t.sentTitle}</h2>
                <p className="text-muted-foreground text-sm mb-1">
                  {t.sentDescription} <strong className="text-foreground">{email}</strong>
                </p>
                <p className="text-muted-foreground/60 text-xs mb-4">{t.sentNote}</p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setLoginState("form");
                    setEmail("");
                  }}
                  className="text-sm text-primary"
                >
                  {t.tryAgain}
                </Button>
              </motion.div>
            )}

            {/* ERROR STATE */}
            {loginState === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-4"
              >
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-7 h-7 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">{t.errorTitle}</h2>
                <p className="text-muted-foreground text-sm mb-4">{errorMessage}</p>
                <Button
                  variant="ghost"
                  onClick={() => setLoginState("form")}
                  className="text-sm text-primary"
                >
                  {t.tryAgain}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.p
            className="text-xs text-muted-foreground text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {t.footer} • Obenan
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
