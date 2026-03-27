import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ExternalLink, MapPin, Copy, Users } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { prospectPack } from "@/data/prospectPack";
import { useLanguage } from "@/contexts/LanguageContext";
// Import canonical evidence JSON at build time for consistency with Proof Explorer
import unclaimedSummary from "../../public/data/unclaimed-summary.json";

interface MetricCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  insight: string;
  evidence: Array<{ title: string; city?: string; address?: string; url: string }>;
  status: "watch" | "focus" | "strong";
  delay: number;
  evidenceShowText: string;
  evidenceHideText: string;
}

const MetricCard = ({ icon, value, suffix = "", label, insight, evidence, status, delay, evidenceShowText, evidenceHideText }: MetricCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    watch: "border-status-watch/30 hover:border-status-watch/50",
    focus: "border-status-focus/30 hover:border-status-focus/50",
    strong: "border-status-strong/30 hover:border-status-strong/50",
  };

  const statusBgColors = {
    watch: "bg-status-watch/10",
    focus: "bg-status-focus/10",
    strong: "bg-status-strong/10",
  };

  const statusTextColors = {
    watch: "text-status-watch",
    focus: "text-status-focus",
    strong: "text-status-strong",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-white rounded-2xl border ${statusColors[status]} transition-all duration-300 overflow-hidden shadow-lg hover:shadow-keynote`}
    >
      <div className="p-6">
        {/* Icon and value */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${statusBgColors[status]} flex items-center justify-center`}>
            <span className={statusTextColors[status]}>{icon}</span>
          </div>
          <div className="text-right">
            <AnimatedCounter
              key={`opp-${value}`}
              end={value}
              suffix={suffix}
              className={`text-4xl font-semibold ${statusTextColors[status]} tabular-nums`}
            />
          </div>
        </div>

        {/* Label */}
        <h3 className="text-lg font-semibold text-foreground mb-2">{label}</h3>
        
        {/* Insight */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{insight}</p>

        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isExpanded ? evidenceHideText : evidenceShowText}
        </button>
      </div>

      {/* Evidence panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border"
          >
            <div className="p-4 space-y-3 bg-secondary/30">
              {evidence.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.city || item.address}</p>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 ml-3 text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const OpportunitySnapshot = () => {
  const { audit, clustersTop10 } = prospectPack;
  const { language } = useLanguage();

  // Use canonical evidence JSON (same source as Proof Explorer) with fallback chain
  const unclaimedTotal = unclaimedSummary.unclaimed_total ?? 
    prospectPack.unclaimed_data.total_all_categories ?? 
    prospectPack.audit.unclaimed_listings ?? 
    1015;

  // Calculate unclaimed percentage based on analysed locations (not total network)
  const unclaimedPercentage = ((unclaimedTotal / audit.analysed_locations_total) * 100).toFixed(1);

  // Create evidence from real cluster data
  const clusterEvidence = clustersTop10.slice(0, 3).map((cluster) => ({
    title: cluster.listings[0]?.title || `Cluster ${cluster.clusterId}`,
    city: cluster.city,
    url: cluster.listings[0]?.url || "#",
  }));

  const shadowEvidence = clustersTop10
    .flatMap((cluster) => cluster.listings.filter((l) => l.segment === "Shadow"))
    .slice(0, 3)
    .map((listing) => ({
      title: listing.title,
      address: listing.address,
      url: listing.url,
    }));

  const content = {
    tr: {
      badge: "Yönetişim Yüzey Alanı",
      title: "Merkezi yönetişime hazır alan",
      subtitle: "Canlı Google Haritalar varlığınızdan elde edilen kesin metrikler. Her biri merkezi kontrol ile iyileştirme fırsatını temsil ediyor.",
      evidenceShow: "Kanıtı göster",
      evidenceHide: "Kanıtı gizle",
      metrics: [
        {
          icon: <MapPin className="w-6 h-6" />,
          value: audit.shadow_locations,
          label: "Sahipsiz / Gölge Lokasyon",
          insight: `Ağın %${audit.shadow_percentage.toFixed(1).replace('.', ',')}'inde eski pinler görünürlük için yarışıyor — her biri trafiği birleştirmek için bir fırsat`,
          evidence: shadowEvidence,
          status: "focus" as const,
        },
        {
          icon: <Copy className="w-6 h-6" />,
          value: unclaimedTotal,
          label: "Güvenlik Riski (Unclaimed)",
          insight: `Ağın %28'i şu an savunmasız. Kötü niyetli 3. şahıslar veya rakipler bu listeleri sahiplenebilir veya kapatabilir.`,
          evidence: clusterEvidence,
          status: "watch" as const,
        },
        {
          icon: <Users className="w-6 h-6" />,
          value: audit.duplicate_clusters,
          label: "Mükerrer Kayıt (Duplicate)",
          insight: `HQ ve kritik şubeler dahil trafik bölünmesi (Cannibalization) yaratan kayıtlar.`,
          evidence: clusterEvidence,
          status: "focus" as const,
        },
      ],
    },
    en: {
      badge: "Governance Surface Area",
      title: "Area ready for centralized governance",
      subtitle: "Precise metrics from your live Google Maps presence. Each represents an opportunity for improvement through centralized control.",
      evidenceShow: "See evidence",
      evidenceHide: "Hide evidence",
      metrics: [
        {
          icon: <MapPin className="w-6 h-6" />,
          value: audit.shadow_locations,
          label: "Shadow locations ready for consolidation",
          insight: `${audit.shadow_percentage.toFixed(1)}% of the network has legacy pins competing for visibility — each is an opportunity to consolidate traffic`,
          evidence: shadowEvidence,
          status: "focus" as const,
        },
        {
          icon: <Copy className="w-6 h-6" />,
          value: unclaimedTotal,
          label: "Claimable listings",
          insight: `${unclaimedPercentage}% governance surface area — ready to be brought under centralized control`,
          evidence: clusterEvidence,
          status: "watch" as const,
        },
        {
          icon: <Users className="w-6 h-6" />,
          value: audit.duplicate_clusters,
          label: "Clusters awaiting consolidation",
          insight: `${audit.traffic_splitting_clusters} of these actively split traffic between official and shadow listings`,
          evidence: clusterEvidence,
          status: "focus" as const,
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section id="opportunity" className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-keynote opacity-50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Metric cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.metrics.map((metric, index) => (
            <MetricCard 
              key={`${metric.label}-${metric.value}`} 
              {...metric} 
              delay={index * 0.1} 
              evidenceShowText={t.evidenceShow}
              evidenceHideText={t.evidenceHide}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
