import { motion } from "framer-motion";
import { Check, Calendar, Link2, RefreshCw, Shield } from "lucide-react";

interface StepCardProps {
  step: number;
  title: string;
  duration: string;
  items: string[];
  icon: typeof Check;
  delay: number;
}

function StepCard({ step, title, duration, items, icon: Icon, delay }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-[#fbfcff] rounded-3xl p-6 shadow-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#006EEE]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#006EEE]" />
        </div>
        <div>
          <span className="inline-block rounded-full px-3 py-0.5 text-[12px] font-light text-description border border-gray-200 mb-1">Step {step}</span>
          <h3 className="text-[18px] font-normal text-base-black">{title}</h3>
        </div>
      </div>
      <p className="text-[12px] font-light text-description mb-3">{duration}</p>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-[14px] font-light text-description">
            <Check className="w-4 h-4 text-[#17C864] shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

const steps = [
  {
    step: 1, title: "Audit & Baseline", duration: "Week 1–2", icon: Calendar,
    items: ["Full network audit across all discovery platforms", "Master list reconciliation (branches + ATMs)", "Unclaimed, duplicate, shadow identification", "Review corpus analysis and sentiment mapping"],
  },
  {
    step: 2, title: "Claim & Correct", duration: "Week 3–8", icon: Shield,
    items: ["Ownership claims for all unclaimed listings", "Duplicate suppression requests to Google", "Shadow listing removal workflows", "Category and contact information corrections"],
  },
  {
    step: 3, title: "Sync & Govern", duration: "Week 9–12", icon: Link2,
    items: ["70+ directory synchronization activated", "Role-based access: branch → regional → HQ", "Automated review response in brand voice", "Real-time anomaly detection enabled"],
  },
  {
    step: 4, title: "Maintain & Scale", duration: "Ongoing", icon: RefreshCw,
    items: ["Continuous governance monitoring", "Branch opening/closure auto-propagation", "Monthly governance health reports", "AI-powered customer routing optimization"],
  },
];

export function ExecutionPlanSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F9FAFB]">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full px-4 py-2 text-[14px] font-light text-[#006EEE] bg-[#006EEE]/10 mb-4">
            Execution Plan
          </span>
          <h2 className="text-[32px] md:text-[40px] font-light leading-[120%] text-gradient-4 mb-4">
            From audit to full governance in 12 weeks
          </h2>
          <p className="text-[16px] font-light text-description max-w-2xl mx-auto">
            A phased rollout that starts delivering value from week one.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <StepCard key={step.step} {...step} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
