import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, MessageCircle, ShieldCheck, Eye, Ghost, Copy, Zap } from "lucide-react";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";
import { AnimatedCounter } from "./AnimatedCounter";
import { useScrollPhase } from "@/hooks/useScrollPhase";

const { transformation } = bankingVerticalPack;

const metrics = [
  { icon: Eye, label: "Listing Accuracy", before: transformation.before.accuracy, after: transformation.after.accuracy, suffix: "%" },
  { icon: MessageCircle, label: "Review Response Rate", before: transformation.before.response_rate, after: transformation.after.response_rate, suffix: "%" },
  { icon: ShieldCheck, label: "Unclaimed Rate", before: transformation.before.unclaimed_rate, after: transformation.after.unclaimed_rate, suffix: "%", invertColors: true },
  { icon: Ghost, label: "Shadow Listings", before: transformation.before.shadow_rate, after: transformation.after.shadow_rate, suffix: "%", invertColors: true },
  { icon: Copy, label: "Duplicate Rate", before: transformation.before.duplicate_rate, after: transformation.after.duplicate_rate, suffix: "%", invertColors: true },
  { icon: Star, label: "Description Coverage", before: transformation.before.description_coverage, after: transformation.after.description_coverage, suffix: "%" },
];

export function TransformationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { phase, setManualPhase } = useScrollPhase(sectionRef, {
    threshold: 0.35,
    transitionDuration: 2000,
  });

  const isTransformed = phase === "transformed";
  const isSuffering = phase === "suffering";

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className={`inline-block rounded-full px-4 py-2 text-[14px] font-light mb-4 transition-colors duration-500 ${isTransformed ? "text-[#17C864] bg-[#17C864]/10" : "text-[#006EEE] bg-[#006EEE]/10"}`}>
            Transformation
          </span>
          <h2 className="text-[32px] md:text-[40px] font-light leading-[120%] text-gradient-4 mb-4">
            From audit findings to full network governance
          </h2>
          <p className="text-[16px] font-light text-description max-w-2xl mx-auto">
            See what happens when Obenan takes control of a banking network's digital presence.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-1 p-1.5 bg-[#F5F5F5] rounded-full">
            <button
              onClick={() => setManualPhase(false)}
              className={`px-8 py-3 rounded-full text-[16px] font-light transition-all duration-300 ${isSuffering ? "bg-white text-base-black shadow-sm" : "text-description hover:text-base-black"}`}
            >
              Before Obenan
            </button>
            <button
              onClick={() => setManualPhase(true)}
              className={`px-8 py-3 rounded-full text-[16px] font-light transition-all duration-300 flex items-center gap-2 ${isTransformed ? "bg-black text-white shadow-sm" : "text-description hover:text-base-black"}`}
            >
              <Zap className={`w-4 h-4 transition-all duration-300 ${isTransformed ? "fill-current" : ""}`} />
              With Obenan
            </button>
          </div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {metrics.map((metric, index) => {
            const value = isTransformed ? metric.after : metric.before;
            const isGood = metric.invertColors ? value === 0 : value >= 90;
            const colorClass = isGood ? "text-[#17C864]" : "text-[#F5A424]";

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-[#fbfcff] rounded-3xl p-6 text-center transition-all duration-500 shadow-card ${isTransformed ? "ring-1 ring-[#17C864]/20" : ""}`}
              >
                <metric.icon className={`w-6 h-6 mx-auto mb-3 transition-colors duration-500 ${colorClass}`} />
                <div className={`text-[36px] font-light tabular-nums transition-colors duration-500 ${colorClass}`}>
                  {isTransformed ? (
                    <AnimatedCounter end={metric.after} duration={1.5} suffix={metric.suffix} decimals={metric.after % 1 !== 0 ? 1 : 0} />
                  ) : (
                    <>{metric.before}{metric.suffix}</>
                  )}
                </div>
                <p className="text-[14px] font-light text-description mt-2">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
