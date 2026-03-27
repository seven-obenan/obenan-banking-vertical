import { motion } from "framer-motion";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";
import { AnimatedCounter } from "./AnimatedCounter";
import { ChevronDown } from "lucide-react";

const stats = [
  { value: bankingVerticalPack.platform.directories_count, suffix: "+", label: "platforms synced" },
  { value: bankingVerticalPack.industry.total_touchpoints, suffix: "", label: "touchpoints audited" },
  { value: bankingVerticalPack.industry.banks_audited, suffix: "", label: "banks audited" },
  { value: bankingVerticalPack.audit.reviews_scanned, suffix: "", label: "reviews analyzed" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-gradient-keynote" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
            Your customers are searching.{" "}
            <span className="text-status-watch">Your branches are invisible.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Across Turkey's banking sector, we audited {bankingVerticalPack.industry.total_touchpoints.toLocaleString()} physical touchpoints and found systemic governance gaps that no internal team had full visibility into.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#audit"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-cta text-white font-semibold text-lg shadow-cta hover:opacity-90 transition-opacity"
          >
            See the Evidence
          </a>
          <a
            href="#cta"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-card border border-border text-foreground font-medium text-lg hover:border-primary/30 transition-colors"
          >
            Get Your Bank's Audit
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 100, damping: 30 }}
              className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-md"
            >
              <span className="block text-2xl md:text-3xl font-bold text-primary tabular-nums">
                <AnimatedCounter end={stat.value} duration={2} suffix={stat.suffix} />
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};
