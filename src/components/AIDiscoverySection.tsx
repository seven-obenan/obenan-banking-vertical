import { motion } from "framer-motion";
import { Bot, Check, X, Sparkles, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const AIDiscoverySection = () => {
  const { language } = useLanguage();

  const content = {
    tr: {
      badge: "Yapay Zeka Hazırlık",
      headline: "ChatGPT ve Gemini İçin Marka Hazırlığı",
      subheadline: "Müşterileriniz artık Google'a değil, Yapay Zeka asistanlarına soruyor. Verilerinizi, AI modellerinin (LLM) anlayacağı formatta yapılandırarak markanızı 'tercih edilen cevap' yapıyoruz.",
      aiReady: {
        title: "Yapay Zeka Hazır",
        subtitle: "Yapılandırılmış veri = Keşfedilebilir",
        features: [
          "Doğru konum verisi",
          "Tutarlı çalışma saatleri",
          "Doğrulanmış iletişim bilgileri",
          "Standart kategorizasyon",
        ],
      },
      aiIgnored: {
        title: "Henüz Hazır Değil",
        subtitle: "Eksik veri = Keşfedilemiyor",
        features: [
          "Eksik veya çelişkili veriler",
          "Yanlış çalışma saatleri",
          "Doğrulanmamış listeler",
          "Tutarsız kategoriler",
        ],
      },
      closing: "Yapılandırılmış veri ile yapay zeka keşfedilebilirliğini güvence altına alın",
      prompt: '"Yakınımdaki en yakın Yapı Kredi ATM\'si nerede?"',
    },
    en: {
      badge: "AI Readiness",
      headline: "Brand Readiness for ChatGPT & Gemini",
      subheadline: "Your customers no longer ask Google — they ask AI assistants. We structure your data in a format AI models (LLMs) understand, making your brand the 'preferred answer.'",
      aiReady: {
        title: "AI Ready",
        subtitle: "Structured data = Discoverable",
        features: [
          "Accurate location data",
          "Consistent business hours",
          "Verified contact information",
          "Standard categorization",
        ],
      },
      aiIgnored: {
        title: "Not Yet Ready",
        subtitle: "Missing data = Not discoverable",
        features: [
          "Missing or conflicting data",
          "Incorrect business hours",
          "Unverified listings",
          "Inconsistent categories",
        ],
      },
      closing: "Secure AI discoverability with structured data",
      prompt: '"Where is the nearest Yapı Kredi ATM near me?"',
    },
  };

  const t = content[language];

  return (
    <section className="py-24 px-4 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4 bg-primary/10 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {t.headline}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subheadline}
          </p>
        </motion.div>

        {/* AI Prompt simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="bg-white rounded-2xl border border-border p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 bg-secondary/50 rounded-xl px-4 py-3">
                <p className="text-foreground font-medium">{t.prompt}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-cta" />
              </div>
              <motion.div
                className="flex-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex gap-1">
                  <motion.span
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* AI Ready */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-status-excellent/30 p-8 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-status-excellent" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-status-excellent/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-status-excellent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t.aiReady.title}</h3>
                <p className="text-sm text-muted-foreground">{t.aiReady.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {t.aiReady.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <Check className="w-5 h-5 text-status-excellent flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* AI Ignored */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-status-watch/30 p-8 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-status-watch" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-status-watch/10 flex items-center justify-center">
                <X className="w-6 h-6 text-status-watch" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t.aiIgnored.title}</h3>
                <p className="text-sm text-muted-foreground">{t.aiIgnored.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {t.aiIgnored.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <X className="w-5 h-5 text-status-watch flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-semibold text-primary">
            {t.closing}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
