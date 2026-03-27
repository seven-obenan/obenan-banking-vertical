import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EyeOff, MapPin, BarChart3, ChevronDown, MapPinOff, MessageSquareWarning, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { prospectPack } from "@/data/prospectPack";

export const VisibilityCrisisSection = () => {
  const { language } = useLanguage();
  const [showInactionPanel, setShowInactionPanel] = useState(false);
  const { official_network, inaction_cost, unclaimed_data } = prospectPack;

  // Calculate percentages
  const visiblePercent = ((official_network.detected_on_maps / official_network.total) * 100).toFixed(0);
  const missingPercent = ((official_network.missing_invisible / official_network.total) * 100).toFixed(0);

  const content = {
    tr: {
      badge: "Ağ Durum Değerlendirmesi",
      headline: "Mevcut dijital ayak iziniz",
      subheadline: "Canlı Google Haritalar verisinden elde edilen ağ görünürlük görüntüsü.",
      stats: {
        official: { label: "Resmi ağ", sublabel: `(${official_network.atm.toLocaleString('tr-TR')} ATM + ${official_network.branch.toLocaleString('tr-TR')} Şube)` },
        visible: { label: "Maps'te görünür" },
        missing: { label: "Yönetişim alanı" },
      },
      controlGap: "Bu kontrol boşluğu her ay büyüyor.",
      inactionTitle: "Kontrol boşluğunun aylık etkisi",
      inactionItems: [
        { icon: "shadow", value: inaction_cost.new_shadows_per_month, label: "Yeni gölge konum", suffix: "/ay" },
        { icon: "review", value: inaction_cost.confusion_reviews_per_month, label: '"Bulamadım" yorumu', suffix: "/ay" },
        { icon: "unclaimed", value: unclaimed_data.total_bank_atm, label: "Sahipsiz konum", suffix: "" },
      ],
      inactionConsequences: [
        "Olumsuz yorumlar kalıcıdır",
        "Rakipler yapay zeka sorgularını kazanır",
        "Sahipsiz konumlar manipülasyona açık kalır",
      ],
    },
    en: {
      badge: "Network Status Assessment",
      headline: "Your current digital footprint",
      subheadline: "Network visibility snapshot from live Google Maps data.",
      stats: {
        official: { label: "Official network", sublabel: `(${official_network.atm.toLocaleString('en-US')} ATM + ${official_network.branch.toLocaleString('en-US')} Branch)` },
        visible: { label: "Visible on Maps" },
        missing: { label: "Governance area" },
      },
      controlGap: "This control gap grows every month.",
      inactionTitle: "Monthly impact of the control gap",
      inactionItems: [
        { icon: "shadow", value: inaction_cost.new_shadows_per_month, label: "New shadow locations", suffix: "/mo" },
        { icon: "review", value: inaction_cost.confusion_reviews_per_month, label: '"Can\'t find it" reviews', suffix: "/mo" },
        { icon: "unclaimed", value: unclaimed_data.total_bank_atm, label: "Unclaimed locations", suffix: "" },
      ],
      inactionConsequences: [
        "Negative reviews are permanent",
        "Competitors win AI queries",
        "Unclaimed locations remain vulnerable",
      ],
    },
  };

  const t = content[language];

  const inactionIcons = {
    shadow: <MapPinOff className="w-5 h-5" />,
    review: <MessageSquareWarning className="w-5 h-5" />,
    unclaimed: <Shield className="w-5 h-5" />,
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4 bg-primary/10 px-4 py-2 rounded-full">
            <BarChart3 className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground text-balance">
            {t.headline}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subheadline}
          </p>
        </motion.div>

        {/* Stats comparison */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Official Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-secondary/30 rounded-2xl border border-border p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <p className="text-4xl md:text-5xl font-bold text-foreground tabular-nums mb-2">
              <AnimatedCounter end={official_network.total} duration={2} />
            </p>
            <p className="text-lg font-medium text-foreground">{t.stats.official.label}</p>
            <p className="text-sm text-muted-foreground">{t.stats.official.sublabel}</p>
          </motion.div>

          {/* Visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-status-excellent/5 rounded-2xl border border-status-excellent/20 p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-status-excellent/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-status-excellent" />
            </div>
            <p className="text-4xl md:text-5xl font-bold text-status-excellent tabular-nums mb-2">
              <AnimatedCounter end={official_network.detected_on_maps} duration={2} suffix="" />
              <span className="text-2xl ml-2 text-muted-foreground">({visiblePercent}%)</span>
            </p>
            <p className="text-lg font-medium text-foreground">{t.stats.visible.label}</p>
          </motion.div>

          {/* Governance Area (formerly Missing) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-status-watch/5 rounded-2xl border border-status-watch/20 p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-status-watch/10 flex items-center justify-center mx-auto mb-4">
              <EyeOff className="w-8 h-8 text-status-watch" />
            </div>
            <p className="text-4xl md:text-5xl font-bold text-status-watch tabular-nums mb-2">
              ~<AnimatedCounter end={official_network.missing_invisible} duration={2} />
              <span className="text-2xl ml-2 text-muted-foreground">({missingPercent}%)</span>
            </p>
            <p className="text-lg font-medium text-foreground">{t.stats.missing.label}</p>
          </motion.div>
        </div>

        {/* Single concise risk line (keeps urgency without alarm) */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-base font-medium text-muted-foreground mb-6"
        >
          {t.controlGap}
        </motion.p>

        {/* Collapsed Inaction Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <button
            onClick={() => setShowInactionPanel(!showInactionPanel)}
            className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground bg-secondary/50 border border-border hover:border-primary/30 px-5 py-3 rounded-xl transition-all"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showInactionPanel ? "rotate-180" : ""}`} />
            {t.inactionTitle}
          </button>
          <AnimatePresence>
            {showInactionPanel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-secondary/30 rounded-b-xl border-x border-b border-border mt-[-1px]">
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    {t.inactionItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-border">
                        <div className="w-10 h-10 rounded-lg bg-status-watch/10 flex items-center justify-center text-status-watch flex-shrink-0">
                          {inactionIcons[item.icon as keyof typeof inactionIcons]}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-status-watch tabular-nums">
                            {typeof item.value === 'number' ? (
                              <AnimatedCounter end={item.value} duration={1.5} />
                            ) : (
                              item.value
                            )}
                            <span className="text-xs text-muted-foreground ml-1">{item.suffix}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-1.5">
                    {t.inactionConsequences.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
