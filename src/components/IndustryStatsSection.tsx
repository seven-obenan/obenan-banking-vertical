import { motion } from "framer-motion";
import { ShieldAlert, Copy, Ghost, Tag, MessageCircleWarning } from "lucide-react";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";
import { AnimatedCounter } from "./AnimatedCounter";

const { audit, industry } = bankingVerticalPack;

const findings = [
  {
    icon: ShieldAlert,
    value: audit.unclaimed_listings,
    label: "Unclaimed Listings",
    description: "Where anyone can edit your business information",
    percentage: `${audit.unclaimed_percentage}%`,
  },
  {
    icon: Copy,
    value: audit.duplicate_clusters,
    label: "Duplicate Clusters",
    description: "Splitting customer traffic and diluting reviews",
    percentage: `${audit.duplicate_percentage}%`,
  },
  {
    icon: Ghost,
    value: audit.shadow_locations,
    label: "Shadow Listings",
    description: "Not owned by the bank but appearing under its name",
    percentage: `${audit.shadow_percentage}%`,
  },
  {
    icon: Tag,
    value: audit.category_mismatches,
    label: "Category Mismatches",
    description: "Making branches invisible for banking searches",
    percentage: `${audit.category_percentage}%`,
  },
  {
    icon: MessageCircleWarning,
    value: audit.avg_unanswered_rate,
    label: "Reviews Unanswered",
    description: `Across ${audit.reviews_scanned.toLocaleString()} customer reviews scanned`,
    percentage: `${audit.avg_unanswered_rate}%`,
    isSuffix: true,
  },
];

export const IndustryStatsSection = () => {
  return (
    <section id="audit" className="py-16 md:py-24 bg-white relative">
      <div className="absolute inset-0 bg-gradient-keynote" />
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full px-4 py-2 text-[14px] font-light text-status-watch bg-[#F5A424]/10 mb-4">
            Audit Evidence
          </span>
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-light leading-[120%] text-gradient-4 mb-4">
            What we found across {industry.total_analysed.toLocaleString()} analyzed listings
          </h2>
          <p className="text-[14px] lg:text-[16px] font-light leading-[140%] text-description max-w-2xl mx-auto">
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
              className="bg-[#fbfcff] rounded-3xl p-6 shadow-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5A424]/10 flex items-center justify-center">
                  <finding.icon className="w-5 h-5 text-status-watch" />
                </div>
                <span className="rounded-full px-3 py-1 text-[12px] font-light text-status-watch bg-[#F5A424]/10">
                  {finding.percentage}
                </span>
              </div>

              <div className="mb-2">
                <span className="text-[32px] font-light tabular-nums text-status-watch">
                  {finding.isSuffix ? (
                    <>{finding.percentage}</>
                  ) : (
                    <AnimatedCounter end={finding.value} duration={2} />
                  )}
                </span>
              </div>

              <h3 className="text-[16px] font-normal text-base-black mb-1">
                {finding.label}
              </h3>
              <p className="text-[14px] font-light text-description">
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
            className="bg-[#fbfcff] rounded-3xl p-6 shadow-card"
          >
            <h3 className="text-[18px] font-normal text-base-black mb-3">
              The Pattern Is Clear
            </h3>
            <p className="text-[14px] font-light text-description leading-relaxed">
              This is not isolated to one bank. Every institution with a large physical network has the same structural problem: listings created by Google, edited by users, duplicated by algorithms, and never centrally governed.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[12px] font-light text-description">
                Based on audits of {industry.banks_audited} major Turkish banks with a combined {industry.total_touchpoints.toLocaleString()} physical touchpoints.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
