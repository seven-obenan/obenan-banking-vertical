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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-gradient-keynote" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[36px] md:text-[48px] lg:text-[60px] font-light leading-[100%] tracking-[0px] text-gradient-4 text-balance mb-6">
            Your customers are searching. Your branches are invisible.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[14px] lg:text-[16px] font-light leading-[140%] text-description max-w-2xl mx-auto mb-12"
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
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-black text-white font-normal text-[16px] hover:bg-[#333] transition-colors"
          >
            See the Evidence
          </a>
          <a
            href="#cta"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-gray-200 bg-white text-gray-blackish font-normal text-[16px] hover:bg-gray-50 transition-colors"
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
              className="bg-[#fbfcff] rounded-3xl p-4 md:p-6 shadow-card"
            >
              <span className="block text-[24px] md:text-[32px] font-light text-gradient-4 tabular-nums">
                <AnimatedCounter end={stat.value} duration={2} suffix={stat.suffix} />
              </span>
              <span className="text-[12px] md:text-[14px] font-light text-description">{stat.label}</span>
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
          <ChevronDown className="w-6 h-6 text-description" />
        </motion.div>
      </motion.div>
    </section>
  );
};
