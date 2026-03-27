import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Search, Copy, Clock, MessageSquare, Bot, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MacBookVideoFrame } from "./MacBookVideoFrame";

export const GovernanceLayerSection = () => {
  const [showWorkload, setShowWorkload] = useState(false);
  const [showKillSwitch, setShowKillSwitch] = useState(false);
  const { language } = useLanguage();

  const content = {
    tr: {
      badge: "Platform Yetenekleri",
      headline1: "Her konum için yönetişim katmanı —",
      headline2: " ekstra iş yükü olmadan",
      subheadline: "Obenan sürekli yönetişim sağlar, ekibiniz strateji ve müşteri hizmetlerine odaklanabilir.",
      features: [
        { icon: <Search className="w-6 h-6" />, title: "Gölge tespit & bastırma", description: "Yetkisiz pinler için sürekli izleme ve otomatik bastırma iş akışları" },
        { icon: <Copy className="w-6 h-6" />, title: "Yinelenen birleştirme prosedürleri", description: "Yinelenen listeleri birleştirmek ve yorumları korumak için standart süreçler" },
        { icon: <Shield className="w-6 h-6" />, title: "Şube/ATM taksonomi normalleştirme", description: "Doğru arama sonuçları için tüm konumlarda tutarlı kategorizasyon" },
        { icon: <Clock className="w-6 h-6" />, title: "Saat & iletişim uygulaması", description: "Çalışma saatleri ve iletişim bilgilerinin gerçek zamanlı izleme ve düzeltmesi" },
        { icon: <MessageSquare className="w-6 h-6" />, title: "Yorum yönetişimi", description: "Yanıt şablonları, eskalasyon kuralları ve duygu analizi izleme" },
        { icon: <Bot className="w-6 h-6" />, title: "Yapay zeka görünürlük hazırlığı", description: "Yapay zeka asistanları ve sesli arama için yapılandırılmış veri hijyeni" },
      ],
      workloadTitle: "Bunun yerine geçen (zaman + iş yükü)",
      workloadItems: [
        "Manuel Google Maps denetimleri (haftada 4+ saat)",
        "Elektronik tablo tabanlı konum takibi",
        "Google ile bireysel itiraz dosyalama",
        "Ekipler arası e-posta koordinasyonu",
        "Reaktif yorum yanıtlama iş akışları",
      ],
      killSwitchTitle: "Kill switch nasıl çalışır",
      killSwitchItems: [
        "Yeni onaylanmamış listeler için 7/24 izleme",
        "Ekibinize anında uyarılar",
        "Önceden onaylanmış bastırma talepleri sıraya alınır",
        "Uyumluluk için denetim izi",
        "Aylık yönetişim raporları",
      ],
      videoTitle: "Kontrol Paneli Önizleme Videosu",
      videoSubtitle: "Çok yakında",
    },
    en: {
      badge: "Platform Capabilities",
      headline1: "A governance layer for every location —",
      headline2: " without extra workload",
      subheadline: "Obenan runs continuous governance so your team can focus on strategy, not data cleanup.",
      features: [
        { icon: <Search className="w-6 h-6" />, title: "Shadow detection & suppression", description: "Continuous monitoring for unauthorized pins with automated suppression workflows" },
        { icon: <Copy className="w-6 h-6" />, title: "Duplicate merge playbooks", description: "Standardized processes to consolidate duplicate listings and preserve reviews" },
        { icon: <Shield className="w-6 h-6" />, title: "Branch/ATM taxonomy normalisation", description: "Consistent categorization across all locations for accurate search results" },
        { icon: <Clock className="w-6 h-6" />, title: "Hours & contact enforcement", description: "Real-time monitoring and correction of business hours and contact information" },
        { icon: <MessageSquare className="w-6 h-6" />, title: "Review governance", description: "Response templates, escalation rules, and sentiment monitoring" },
        { icon: <Bot className="w-6 h-6" />, title: "AI visibility readiness", description: "Structured data hygiene for AI assistants and voice search" },
      ],
      workloadTitle: "What this replaces (time + workload)",
      workloadItems: [
        "Manual Google Maps audits (4+ hours/week)",
        "Spreadsheet-based location tracking",
        "Individual dispute filing with Google",
        "Cross-team email coordination",
        "Reactive review response workflows",
      ],
      killSwitchTitle: "How the kill switch works",
      killSwitchItems: [
        "24/7 monitoring for new unapproved listings",
        "Instant alerts to your team",
        "Pre-approved suppression requests queued",
        "Audit trail for compliance",
        "Monthly governance reports",
      ],
      videoTitle: "Dashboard Preview Video",
      videoSubtitle: "Coming soon",
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
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t.headline1}
            <span className="text-cta">{t.headline2}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.subheadline}
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 group shadow-md hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-primary">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Dashboard preview in MacBook frame */}
        <div className="mb-12">
          <MacBookVideoFrame 
            videoSrc="/videos/obenan-dashboard-preview.mp4"
            title={t.videoTitle}
          />
        </div>

        {/* Expanders */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowWorkload(!showWorkload)}
              className="w-full flex items-center gap-3 bg-white rounded-xl border border-border p-4 hover:border-primary/30 transition-all text-left shadow-md"
            >
              <Plus className={`w-5 h-5 text-primary transition-transform ${showWorkload ? "rotate-45" : ""}`} />
              <span className="font-medium text-foreground">{t.workloadTitle}</span>
            </button>
            <AnimatePresence>
              {showWorkload && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-border shadow-md">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {t.workloadItems.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowKillSwitch(!showKillSwitch)}
              className="w-full flex items-center gap-3 bg-white rounded-xl border border-border p-4 hover:border-primary/30 transition-all text-left shadow-md"
            >
              <Plus className={`w-5 h-5 text-primary transition-transform ${showKillSwitch ? "rotate-45" : ""}`} />
              <span className="font-medium text-foreground">{t.killSwitchTitle}</span>
            </button>
            <AnimatePresence>
              {showKillSwitch && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-b-xl border-x border-b border-border shadow-md">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {t.killSwitchItems.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
