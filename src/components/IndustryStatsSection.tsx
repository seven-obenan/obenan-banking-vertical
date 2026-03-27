import { motion } from "framer-motion";
import { ShieldAlert, Copy, Ghost, Tag, MessageCircleWarning } from "lucide-react";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";
import { AnimatedCounter } from "./AnimatedCounter";
import { Badge } from "@/components/ui/badge";

const { audit, industry } = bankingVerticalPack;

const findings = [
  {
    icon: ShieldAlert,
    value: audit.unclaimed_listings,
    label: "Unclaimed Listings",
    description: "Where anyone can edit your business information",
    percentage: `${audit.unclaimed_percentage}%`,
    color: "text-status-watch",
    bgColor: "bg-status-watch/10",
  },
  {
    icon: Copy,
    value: audit.duplicate_clusters,
    label: "Duplicate Clusters",
    description: "Splitting customer traffic and diluting reviews",
    percentage: `${audit.duplicate_percentage}%`,
    color: "text-status-watch",
    bgColor: "bg-status-watch/10",
  },
  {
    icon: Ghost,
    value: audit.shadow_locations,
    label: "Shadow Listings",
    description: "Not owned by the bank but appearing under its name",
    percentage: `${audit.shadow_percentage}%`,
    color: "text-status-watch",
    bgColor: "bg-status-watch/10",
  },
  {
    icon: Tag,
    value: audit.category_mismatches,
    label: "Category Mismatches",
    description: "Making branches invisible for banking searches",
    percentage: `${audit.category_percentage}%`,
    color: "text-status-watch",
    bgColor: "bg-status-watch/10",
  },
  {
    icon: MessageCircleWarning,
    value: Math.round(audit.avg_unanswered_rate * 10) / 10,
    label: "Reviews Unanswered",
    description: `Across ${audit.reviews_scanned.toLocaleString()} customer reviews scanned`,
    percentage: `${audit.avg_unanswered_rate}%`,
    color: "text-status-watch",
    bgColor: "bg-status-watch/10",
    isSuffix: true,
  },
];

export const IndustryStatsSection = () => {
  return (
    <section id="audit" className="py-16 md:py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-keynote" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-status-watch/10 text-status-watch border-status-watch/20">
            Audit Evidence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What we found across{" "}
            <span className="text-status-watch tabular-nums">
              {industry.total_analysed.toLocaleString()}
            </span>{" "}
            analyzed listings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two of Turkey's largest banks. {industry.total_branches.toLocaleString()} branches. {industry.total_atms.toLocaleString()} ATMs. {industry.total_touchpoints.toLocaleString()} total touchpoints. Here's what the maps actually show.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {findings.map((finding, index) => (
            <motion.div
              key={finding.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${finding.bgColor} flex items-center justify-center`}>
                  <finding.icon className={`w-5 h-5 ${finding.color}`} />
                </div>
                <Badge variant="outline" className={`text-xs ${finding.color} border-current/20`}>
                  {finding.percentage}
                </Badge>
              </div>

              <div className="mb-2">
                <span className={`text-3xl font-bold tabular-nums ${finding.color}`}>
                  {finding.isSuffix ? (
                    <>{finding.percentage}</>
                  ) : (
                    <AnimatedCounter end={finding.value} duration={2} />
                  )}
                </span>
              </div>

              <h3 className="text-base font-semibold text-foreground mb-1">
                {finding.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {finding.description}
              </p>
            </motion.div>
          ))}

          {/* Summary card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-foreground mb-3">
              The Pattern Is Clear
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is not isolated to one bank. Every institution with a large physical network has the same structural problem: listings created by Google, edited by users, duplicated by algorithms, and never centrally governed.
            </p>
            <div className="mt-4 pt-4 border-t border-primary/10">
              <p className="text-xs text-muted-foreground">
                Based on audits of {industry.banks_audited} major Turkish banks with a combined {industry.total_touchpoints.toLocaleString()} physical touchpoints.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
