import { motion } from "framer-motion";
import { Clock, TrendingUp, AlertTriangle, MessageSquareWarning, MapPinOff, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { prospectPack } from "@/data/prospectPack";

export const InactionCostSection = () => {
  const { language } = useLanguage();
  const { inaction_cost, unclaimed_data } = prospectPack;

  const content = {
    tr: {
      badge: "Hareketsizliğin Bedeli",
      headline: "Her geçen gün sorun büyüyor",
      subheadline: "Bu riskler bugün başlıyor ve birikerek devam ediyor.",
      accumulating: {
        title: "Aylık Biriken Riskler",
        items: [
          { icon: <MapPinOff className="w-6 h-6" />, value: inaction_cost.new_shadows_per_month, label: "Yeni gölge konum", suffix: "/ay", isNumeric: false },
          { icon: <MessageSquareWarning className="w-6 h-6" />, value: inaction_cost.confusion_reviews_per_month, label: '"Bulamadım" yorumu', suffix: "/ay", isNumeric: false },
          { icon: <Shield className="w-6 h-6" />, value: unclaimed_data.total_bank_atm, label: "Risk altındaki sahipsiz konum", suffix: "", isNumeric: true },
        ],
      },
      permanent: {
        title: "Kalıcı Sonuçlar",
        items: [
          "Olumsuz yorumlar sonsuza kadar kalır",
          "Rakipler yapay zeka sorgularını kazanır",
          "Sahipsiz konumlar manipülasyona açık kalır",
        ],
      },
      closing: "Kaç müşteri daha yanlış adrese gidecek?",
    },
    en: {
      badge: "The Cost of Inaction",
      headline: "The problem grows every day",
      subheadline: "These risks start today and accumulate over time.",
      accumulating: {
        title: "Monthly Accumulating Risks",
        items: [
          { icon: <MapPinOff className="w-6 h-6" />, value: inaction_cost.new_shadows_per_month, label: "New shadow locations", suffix: "/mo", isNumeric: false },
          { icon: <MessageSquareWarning className="w-6 h-6" />, value: inaction_cost.confusion_reviews_per_month, label: '"Can\'t find it" reviews', suffix: "/mo", isNumeric: false },
          { icon: <Shield className="w-6 h-6" />, value: unclaimed_data.total_bank_atm, label: "Unclaimed locations at risk", suffix: "", isNumeric: true },
        ],
      },
      permanent: {
        title: "Permanent Consequences",
        items: [
          "Negative reviews stay forever",
          "Competitors win AI queries",
          "Unclaimed locations remain vulnerable",
        ],
      },
      closing: "How many more customers will go to the wrong address?",
    },
  };

  const t = content[language];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-status-watch uppercase tracking-wider mb-4 bg-status-watch/10 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {t.headline}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subheadline}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Accumulating risks */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-status-watch/5 rounded-2xl border border-status-watch/20 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-status-watch" />
              <h3 className="text-xl font-semibold text-foreground">{t.accumulating.title}</h3>
            </div>
            <div className="space-y-6">
              {t.accumulating.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-border shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-status-watch/10 flex items-center justify-center text-status-watch flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-status-watch tabular-nums">
                      {item.isNumeric ? (
                        <AnimatedCounter end={item.value as number} duration={1.5} />
                      ) : (
                        item.value
                      )}
                      <span className="text-sm text-muted-foreground ml-1">{item.suffix}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Permanent consequences */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-secondary/30 rounded-2xl border border-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-foreground" />
              <h3 className="text-xl font-semibold text-foreground">{t.permanent.title}</h3>
            </div>
            <div className="space-y-4">
              {t.permanent.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 border border-border shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-status-watch/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-status-watch font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-foreground font-medium pt-1">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Emotional closer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-block bg-status-watch/10 rounded-2xl px-8 py-6 border border-status-watch/20">
            <p className="text-xl md:text-2xl font-semibold text-status-watch">
              {t.closing}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
