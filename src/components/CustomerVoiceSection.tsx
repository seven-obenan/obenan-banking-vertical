import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Plus, AlertCircle, MapPin, ExternalLink } from "lucide-react";
import { prospectPack } from "@/data/prospectPack";
import { useLanguage } from "@/contexts/LanguageContext";

export const CustomerVoiceSection = () => {
  const { audit, quotesTop12 } = prospectPack;
  const [showMore, setShowMore] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const { language } = useLanguage();

  const displayedReviews = showMore ? quotesTop12 : quotesTop12.slice(0, 6);

  const content = {
    tr: {
      badge: "Dijital Güven",
      title1: "Müşteri sinyali",
      title2: "verilerin daha temiz olabileceğini gösteriyor",
      subtitle: "Yapı Kredi konumlarına giden müşterilerden gerçek geri bildirimler. Her sinyal bir iyileştirme fırsatıdır.",
      showMore: "daha fazla yorum göster",
      showLess: "Daha az göster",
      methodology: "Karışıklık kalıplarını nasıl tespit ediyoruz",
      methodologyTitle: "Kalıp Tespit Metodolojisi",
      methodologyItems: [
        `${audit.reviews_scanned.toLocaleString()} Google Haritalar yorumunun NLP analizi`,
        "Anahtar kelimeler: \"yanlış adres\", \"bulamadım\", \"kapalı\", \"farklı konum\", \"harita yanlış\"",
        "Hayal kırıklığı sinyallerini belirlemek için duygu analizi",
        "Resmi şube/ATM verileriyle çapraz referans",
      ],
      confusion: "Konum Kafa Karışıklığı",
      malfunction: "ATM Arızası",
    },
    en: {
      badge: "Digital Trust",
      title1: "customer signals",
      title2: "that the data can be cleaner",
      subtitle: "Real feedback from customers navigating to Yapı Kredi locations. Each signal is an opportunity for improvement.",
      showMore: "more quotes",
      showLess: "Show less",
      methodology: "How we detect confusion patterns",
      methodologyTitle: "Pattern Detection Methodology",
      methodologyItems: [
        `NLP analysis of ${audit.reviews_scanned.toLocaleString()} Google Maps reviews`,
        "Keywords: \"wrong address\", \"couldn't find\", \"closed\", \"different location\", \"harita yanlış\"",
        "Sentiment analysis to identify frustration signals",
        "Cross-reference with official branch/ATM data",
      ],
      confusion: "Location Confusion",
      malfunction: "ATM Malfunction",
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
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">
            <span className="text-status-watch tabular-nums">{audit.location_confusion_mentions.toLocaleString()}</span> {t.title1}
            <br />{t.title2}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Review cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-border p-6 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              {/* Category badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {review.categories.map((category, catIndex) => (
                  <span
                    key={catIndex}
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      category === "Location Confusion"
                        ? "text-status-watch bg-status-watch/10"
                        : "text-status-focus bg-status-focus/10"
                    }`}
                  >
                    {category === "Location Confusion" ? (
                      <AlertCircle className="w-3 h-3" />
                    ) : (
                      <MapPin className="w-3 h-3" />
                    )}
                    {category === "Location Confusion" ? t.confusion : t.malfunction}
                  </span>
                ))}
              </div>

              {/* Quote based on language */}
              <p className="text-foreground mb-3 leading-relaxed text-sm">
                "{language === "tr" ? review.textTR : review.textEN}"
              </p>

              {/* Translation hint for Turkish */}
              {language === "tr" && (
                <p className="text-xs text-muted-foreground italic mb-4 leading-relaxed">
                  "{review.textEN}"
                </p>
              )}

              {/* Location info */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                  <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{review.title}</span>
                </div>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 ml-2 text-primary hover:text-primary/80 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanders */}
        <div className="flex flex-wrap justify-center gap-4">
          {quotesTop12.length > 6 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-2 text-primary bg-primary/10 hover:bg-primary/15 px-6 py-3 rounded-xl transition-colors font-medium"
            >
              <Plus className={`w-4 h-4 transition-transform ${showMore ? "rotate-45" : ""}`} />
              {showMore ? t.showLess : `${quotesTop12.length - 6} ${t.showMore}`}
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowMethodology(!showMethodology)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground bg-white border border-border hover:border-primary/30 px-6 py-3 rounded-xl transition-colors"
          >
            <Plus className={`w-4 h-4 transition-transform ${showMethodology ? "rotate-45" : ""}`} />
            {t.methodology}
          </motion.button>
        </div>

        {/* Methodology panel */}
        <AnimatePresence>
          {showMethodology && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 bg-white rounded-xl border border-border p-6 shadow-lg overflow-hidden"
            >
              <h4 className="font-semibold mb-4 text-foreground">{t.methodologyTitle}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.methodologyItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
