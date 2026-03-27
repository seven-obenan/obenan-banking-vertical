import { motion } from "framer-motion";
import { Building2, MapPin, Eye, ArrowRight } from "lucide-react";
import { prospectPack } from "@/data/prospectPack";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const HQProofSection = () => {
  const { audit } = prospectPack;
  const { language } = useLanguage();

  const content = {
    tr: {
      badge: "Genel Müdürlük Kanıtı",
      headline: "Genel Müdürlük bölgesinde bile eski veri artefaktları var — ve bu düzeltilebilir",
      subheadline: "Eski veriler her yerde var, en önemli konumlarınız dahil. Bu, örnek olarak liderlik etmek için bir fırsat.",
      location: "Levent / Plaza Bölgesi",
      sublocation: "Yapı Kredi Genel Müdürlük Bölgesi",
      shadowLabel: "Gölge liste",
      officialLabel: "Resmi liste",
      question: "Hangisi gerçek Yapı Kredi?",
      cta: "Genel Müdürlük kanıt paketini görüntüle",
    },
    en: {
      badge: "HQ Proof",
      headline: "Even the HQ area has artefacts — and that's fixable",
      subheadline: "Legacy data exists everywhere, including your most prominent locations. This is an opportunity to lead by example.",
      location: "Levent / Plaza Area",
      sublocation: "Yapı Kredi Headquarters Region",
      shadowLabel: "Shadow listings",
      officialLabel: "Official listing",
      question: "Which one is the real Yapı Kredi?",
      cta: "View HQ evidence pack",
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
            {t.headline}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.subheadline}
          </p>
        </motion.div>

        {/* HQ Evidence Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-white rounded-2xl border border-primary/20 overflow-hidden shadow-xl">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
            
            <div className="p-8">
              {/* Location header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{t.location}</h3>
                  <p className="text-muted-foreground">{t.sublocation}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-status-focus">{audit.hq_shadow_count}</p>
                  <p className="text-sm text-muted-foreground">{t.shadowLabel}</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-foreground">1</p>
                  <p className="text-sm text-muted-foreground">{t.officialLabel}</p>
                </div>
              </div>

              {/* Visual representation */}
              <div className="relative mb-8 p-6 bg-secondary/30 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {t.question}
                </p>
                
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  {/* Official pin */}
                  <div className="relative group">
                    <div className="w-12 h-12 rounded-full bg-status-excellent/10 flex items-center justify-center border-2 border-status-excellent">
                      <MapPin className="w-6 h-6 text-status-excellent" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-status-excellent whitespace-nowrap font-medium">
                      Official
                    </span>
                  </div>

                  {/* Shadow pins */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="relative"
                    >
                      <div className="w-10 h-10 rounded-full bg-status-watch/10 flex items-center justify-center border border-status-watch/50 opacity-70">
                        <MapPin className="w-5 h-5 text-status-watch" />
                      </div>
                    </motion.div>
                  ))}
                  <span className="text-muted-foreground">...</span>
                </div>
              </div>

              {/* CTA */}
              <Button
                className="w-full bg-cta hover:bg-cta/90 transition-all font-semibold shadow-cta"
                size="lg"
              >
                <Eye className="w-5 h-5 mr-2" />
                {t.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
