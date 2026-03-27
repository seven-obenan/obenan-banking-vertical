import { motion } from "framer-motion";
import { MapPin, Globe, Zap, Shield } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";

const counters = [
  { icon: Globe, value: bankingVerticalPack.platform.directories_count, suffix: "+", label: "Platforms synced" },
  { icon: Zap, value: bankingVerticalPack.portfolio_results.monthly_automated_actions, suffix: "+", label: "Monthly actions" },
  { icon: Shield, value: 12, suffix: "", label: "Weeks to governance" },
  { icon: MapPin, value: bankingVerticalPack.audit.unclaimed_listings, suffix: "", label: "Listings to recover" },
];

export function ClosingCTASection() {
  return (
    <section id="cta" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-keynote" />

      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-light leading-[120%] text-gradient-4 mb-6 text-balance">
            By year end, your branch and ATM network becomes accurate, visible, governed, and AI-ready.
          </h2>
          <p className="text-[16px] font-light text-description max-w-2xl mx-auto mb-8">
            We'll audit your branch and ATM footprint across every major discovery platform and deliver a governance gap report within 48 hours. No commitment required.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://www.obenan.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-black text-white font-normal text-[16px] hover:bg-[#333] transition-colors"
            >
              Request a Free Network Audit
            </a>
            <a
              href="https://www.obenan.com/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full border border-gray-200 bg-white text-gray-blackish font-normal text-[16px] hover:bg-gray-50 transition-colors"
            >
              Schedule a Demo
            </a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {counters.map((counter, index) => (
            <motion.div
              key={counter.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 100, damping: 30 }}
              className="bg-[#fbfcff] rounded-3xl p-4 md:p-6 shadow-card text-center"
            >
              <counter.icon className="w-6 h-6 mx-auto mb-2 text-[#006EEE]" />
              <span className="block text-[24px] md:text-[32px] font-light text-gradient-4 tabular-nums">
                <AnimatedCounter end={counter.value} duration={2} suffix={counter.suffix} />
              </span>
              <span className="text-[12px] md:text-[14px] font-light text-description">{counter.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/obenan-logo.svg" alt="Obenan" className="h-8 w-auto" />
            <span className="text-[18px] font-light text-base-black">obenan</span>
          </div>
          <p className="text-[14px] font-light text-description">
            Banking Network Governance — Industry Intelligence Report
          </p>
          <p className="text-[12px] font-light text-description mt-2">
            Based on audits of {bankingVerticalPack.industry.banks_audited} major Turkish banks &bull; {bankingVerticalPack.industry.total_touchpoints.toLocaleString()} touchpoints &bull; {bankingVerticalPack.reportDate}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
