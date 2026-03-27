import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Tag, Plus, ExternalLink, AlertTriangle } from "lucide-react";
import { prospectPack } from "@/data/prospectPack";
import { useLanguage } from "@/contexts/LanguageContext";

export const PolicyAnomaliesSection = () => {
  const { audit, categoryMismatches, twentyFourHourViolations } = prospectPack;
  const [showHoursEvidence, setShowHoursEvidence] = useState(false);
  const [showCategoryEvidence, setShowCategoryEvidence] = useState(false);
  const { language } = useLanguage();

  const content = {
    tr: {
      badge: "Politika Tarzı Anomaliler",
      title: "Çalışma saatleri ve kategori doğruluğu güveni korur",
      subtitle: "Çalışma saatleri veya kategoriler yanlış olduğunda, müşteriler kapalı kapılara veya yanlış konumlara ulaşır. Bunlar yüksek güven riskli veri noktalarıdır.",
      hoursCount: "Şube \"24 saat açık\" gösteriyor",
      hoursDesc: "Şube kategorisindeki konumlar, gerçek saatler farklı olduğunda 24 saat kullanılabilirlik gösteriyor. Müşteriler kapalı kapılar bulduğunda bu anında güven erozyonu yaratır.",
      categoryCount: "ATM/şube kategori uyuşmazlığı",
      categoryDesc: "ATM'ler şube olarak ve tam tersi kategorize edilmiş. Bu, arama sıralamasını ve müşteri beklentilerini etkiler. Doğru taksonomi, doğru aramanın doğru hizmete ulaşmasını sağlar.",
      seeEvidence: "Kanıt listesini göster",
      hideEvidence: "Kanıtı gizle",
      warningTitle: "Güven riski göstergesi",
      warningDesc: "Saat ve kategori yanlışlıkları, müşterilerin hizmete ihtiyaç duyduğu tam o anda görünür. Bu hatalar doğrudan müşteri memnuniyetini ve şube verimliliğini etkiler.",
    },
    en: {
      badge: "Policy-Style Anomalies",
      title: "Hours and category accuracy protect trust",
      subtitle: "When business hours or categories are incorrect, customers arrive at closed doors or wrong locations. These are high-trust-risk data points.",
      hoursCount: "Branches show \"24 hours open\"",
      hoursDesc: "Branch-category locations displaying round-the-clock availability when actual hours differ. This creates immediate trust erosion when customers find closed doors.",
      categoryCount: "ATM/branch category mismatches",
      categoryDesc: "ATMs categorized as branches and vice versa. This affects search ranking and customer expectations. Proper taxonomy ensures the right service appears for the right search.",
      seeEvidence: "See evidence list",
      hideEvidence: "Hide evidence",
      warningTitle: "Trust risk indicator",
      warningDesc: "Hours and category inaccuracies are visible to customers at the exact moment they need service. These errors directly impact customer satisfaction and branch efficiency.",
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
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Anomaly cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* 24-hour violations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-status-watch/30 overflow-hidden shadow-lg"
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-status-watch/10 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-status-watch" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-status-watch">{audit.twenty_four_hour_bank_violations}</p>
                  <p className="text-muted-foreground">{t.hoursCount}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {t.hoursDesc}
              </p>

              <button
                onClick={() => setShowHoursEvidence(!showHoursEvidence)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Plus className={`w-4 h-4 transition-transform ${showHoursEvidence ? "rotate-45" : ""}`} />
                {showHoursEvidence ? t.hideEvidence : t.seeEvidence}
              </button>
            </div>

            <AnimatePresence>
              {showHoursEvidence && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-6 space-y-3 bg-secondary/30">
                    {twentyFourHourViolations.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.city} • {item.issue}</p>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Category mismatches */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-status-focus/30 overflow-hidden shadow-lg"
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-status-focus/10 flex items-center justify-center">
                  <Tag className="w-7 h-7 text-status-focus" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-status-focus">{audit.category_mismatches}</p>
                  <p className="text-muted-foreground">{t.categoryCount}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {t.categoryDesc}
              </p>

              <button
                onClick={() => setShowCategoryEvidence(!showCategoryEvidence)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Plus className={`w-4 h-4 transition-transform ${showCategoryEvidence ? "rotate-45" : ""}`} />
                {showCategoryEvidence ? t.hideEvidence : t.seeEvidence}
              </button>
            </div>

            <AnimatePresence>
              {showCategoryEvidence && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-6 space-y-3 bg-secondary/30">
                    {categoryMismatches.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.city}</p>
                        </div>
                        <span className="text-xs text-status-focus bg-status-focus/10 px-2 py-1 rounded-full font-medium">
                          {item.type.replace(/_/g, " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Warning note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-start gap-4 bg-status-watch/5 rounded-xl p-6 border border-status-watch/20"
        >
          <AlertTriangle className="w-6 h-6 text-status-watch flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">{t.warningTitle}</p>
            <p className="text-sm text-muted-foreground">
              {t.warningDesc}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
