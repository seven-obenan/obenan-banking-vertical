import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, MessageCircle, ShieldCheck, Eye, Ghost, Copy } from "lucide-react";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";
import { AnimatedCounter } from "./AnimatedCounter";
import { Badge } from "@/components/ui/badge";
import { useScrollPhase } from "@/hooks/useScrollPhase";

const { transformation } = bankingVerticalPack;

const metrics = [
  {
    icon: Eye,
    label: "Listing Accuracy",
    before: transformation.before.accuracy,
    after: transformation.after.accuracy,
    suffix: "%",
  },
  {
    icon: MessageCircle,
    label: "Review Response Rate",
    before: transformation.before.response_rate,
    after: transformation.after.response_rate,
    suffix: "%",
  },
  {
    icon: ShieldCheck,
    label: "Unclaimed Rate",
    before: transformation.before.unclaimed_rate,
    after: transformation.after.unclaimed_rate,
    suffix: "%",
    invertColors: true,
  },
  {
    icon: Ghost,
    label: "Shadow Listings",
    before: transformation.before.shadow_rate,
    after: transformation.after.shadow_rate,
    suffix: "%",
    invertColors: true,
  },
  {
    icon: Copy,
    label: "Duplicate Rate",
    before: transformation.before.duplicate_rate,
    after: transformation.after.duplicate_rate,
    suffix: "%",
    invertColors: true,
  },
  {
    icon: Star,
    label: "Description Coverage",
    before: transformation.before.description_coverage,
    after: transformation.after.description_coverage,
    suffix: "%",
  },
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className={`mb-4 transition-colors duration-500 ${isTransformed ? "bg-status-excellent/10 text-status-excellent border-status-excellent/20" : "bg-primary/10 text-primary border-primary/20"}`}>
            Transformation
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            From audit findings to{" "}
            <span className={`transition-colors duration-500 ${isTransformed ? "text-status-excellent" : "text-status-watch"}`}>
              full network governance
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
          <div className="inline-flex items-center gap-1 p-1.5 bg-muted rounded-full">
            <button
              onClick={() => setManualPhase(false)}
              className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${isSuffering ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Before Obenan
            </button>
            <button
              onClick={() => setManualPhase(true)}
              className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${isTransformed ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              With Obenan
            </button>
          </div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {metrics.map((metric, index) => {
            const value = isTransformed ? metric.after : metric.before;
            const isGood = metric.invertColors ? value === 0 : value >= 90;
            const colorClass = isGood ? "text-status-excellent" : "text-status-watch";

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card border rounded-2xl p-6 text-center transition-all duration-500 ${isTransformed ? "border-status-excellent/30 shadow-md" : "border-border"}`}
              >
                <metric.icon className={`w-6 h-6 mx-auto mb-3 transition-colors duration-500 ${colorClass}`} />
                <div className={`text-4xl font-bold tabular-nums transition-colors duration-500 ${colorClass}`}>
                  {isTransformed ? (
                    <AnimatedCounter end={metric.after} duration={1.5} suffix={metric.suffix} decimals={metric.after % 1 !== 0 ? 1 : 0} />
                  ) : (
                    <>{metric.before}{metric.suffix}</>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
