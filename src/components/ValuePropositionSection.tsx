import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { prospectPack } from "@/data/prospectPack";

export const ValuePropositionSection = () => {
  const { language } = useLanguage();
  const { portfolio_results, official_network } = prospectPack;

  const content = {
    tr: {
      metrics: [
        {
          prefix: "",
          value: official_network.missing_invisible,
          suffix: "+",
          label: "konum şu an görünmez",
          sublabel: "70+ platformda görünür hale gelecek",
        },
        {
          prefix: "%",
          value: portfolio_results.review_response_rate_target,
          label: "Yanıt Oranı",
          sublabel: "(Garantili)",
        },
        {
          prefix: "",
          value: portfolio_results.monthly_automated_actions,
          suffix: "+",
          label: "aylık otomatik işlem",
          sublabel: "",
        },
      ],
      source: `Yapı Kredi için öngörülen muhafazakar etki tablosudur.`,
    },
    en: {
      metrics: [
        {
          prefix: "",
          value: official_network.missing_invisible,
          suffix: "+",
          label: "locations currently invisible",
          sublabel: "will become visible across 70+ platforms",
        },
        {
          prefix: "",
          value: portfolio_results.review_response_rate_target,
          suffix: "%",
          label: "Response Rate",
          sublabel: "(Guaranteed)",
        },
        {
          prefix: "",
          value: portfolio_results.monthly_automated_actions,
          suffix: "+",
          label: "automated actions monthly",
          sublabel: "",
        },
      ],
      source: `Conservative projected impact for Yapı Kredi.`,
    },
  };

  const t = content[language];

  return (
    <section className="py-20 md:py-28 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-keynote opacity-30" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-10">
          {t.metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="text-center"
            >
              <div className="mb-3">
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tabular-nums tracking-tight">
                  {metric.prefix}
                  <AnimatedCounter
                    key={`vp-${index}-${metric.value}`}
                    end={metric.value}
                    duration={2}
                    suffix={metric.suffix || ""}
                  />
                </span>
              </div>
              <p className="text-lg md:text-xl font-medium text-foreground">
                {metric.label}
              </p>
              {metric.sublabel && (
                <p className="text-sm text-muted-foreground mt-1">
                  {metric.sublabel}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground max-w-2xl mx-auto"
        >
          {t.source}
        </motion.p>
      </div>
    </section>
  );
};
