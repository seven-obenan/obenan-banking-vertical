import { motion } from "framer-motion";
import { Check, Calendar, Link2, RefreshCw, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      className="bg-card border border-border rounded-2xl p-6 shadow-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <Badge variant="outline" className="text-xs mb-1">Step {step}</Badge>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{duration}</p>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-status-excellent shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

const steps = [
  {
    step: 1,
    title: "Audit & Baseline",
    duration: "Week 1–2",
    icon: Calendar,
    items: [
      "Full network audit across all discovery platforms",
      "Master list reconciliation (branches + ATMs)",
      "Unclaimed, duplicate, shadow identification",
      "Review corpus analysis and sentiment mapping",
    ],
  },
  {
    step: 2,
    title: "Claim & Correct",
    duration: "Week 3–8",
    icon: Shield,
    items: [
      "Ownership claims for all unclaimed listings",
      "Duplicate suppression requests to Google",
      "Shadow listing removal workflows",
      "Category and contact information corrections",
    ],
  },
  {
    step: 3,
    title: "Sync & Govern",
    duration: "Week 9–12",
    icon: Link2,
    items: [
      "70+ directory synchronization activated",
      "Role-based access: branch → regional → HQ",
      "Automated review response in brand voice",
      "Real-time anomaly detection enabled",
    ],
  },
  {
    step: 4,
    title: "Maintain & Scale",
    duration: "Ongoing",
    icon: RefreshCw,
    items: [
      "Continuous governance monitoring",
      "Branch opening/closure auto-propagation",
      "Monthly governance health reports",
      "AI-powered customer routing optimization",
    ],
  },
];

export function ExecutionPlanSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Execution Plan
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            From audit to full governance in 12 weeks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A phased rollout that starts delivering value from week one.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <StepCard key={step.step} {...step} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
