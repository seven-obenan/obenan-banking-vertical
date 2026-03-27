import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  MousePointerClick,
  CheckCircle2,
  MapPin,
  TrendingDown,
  TrendingUp,
  ChevronDown,
  Info,
  BarChart3,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { prospectPack } from "@/data/prospectPack";

// ── Metric Card Data ────────────────────────────────────────────────────────

interface MetricCard {
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  subLabel: string;
  icon: React.ReactNode;
}

const metrics: MetricCard[] = [
  {
    value: 41.5,
    suffix: "%",
    decimals: 1,
    label: "Görünürlük Artışı",
    subLabel: "Google görüntülenme (Maps + Arama) — Medyan",
    icon: <Eye className="w-5 h-5" />,
  },
  {
    value: 28.3,
    suffix: "%",
    decimals: 1,
    label: "Müşteri Aksiyonu Artışı",
    subLabel: "Arama, yol tarifi, web sitesi tıklama — Medyan",
    icon: <MousePointerClick className="w-5 h-5" />,
  },
  {
    value: 54,
    suffix: "%",
    decimals: 0,
    label: "Dönüşüm Başarısı",
    subLabel: "Ölçülebilir görünürlük artışı sağlayan lokasyonlar",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    value: 1244,
    suffix: "",
    decimals: 0,
    label: "Lokasyon Analiz Edildi",
    subLabel: "Yeterli veri ile değerlendirilen lokasyon sayısı",
    icon: <MapPin className="w-5 h-5" />,
  },
];

// ── Methodology Items ───────────────────────────────────────────────────────

const methodologyItems = [
  { label: "Veri Kaynağı", value: "GBP performans metrikleri" },
  { label: "Dönem", value: "12 ay önce vs 12 ay sonra" },
  { label: "Yöntem", value: "Medyan + percentiles (outlier etkisini önlemek için)" },
  { label: "Not", value: "Sonuçlar lokasyona göre değişir, garanti değildir" },
];

// ── Sub-Components ──────────────────────────────────────────────────────────

const DoubleImprovementBand = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.5, duration: 0.5 }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
  >
    <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.08] rounded-xl px-5 py-3.5">
      <div className="w-9 h-9 rounded-lg bg-[hsl(173,77%,50%)]/10 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-4 h-4 text-[hsl(173,77%,55%)]" />
      </div>
      <div>
        <p className="text-xl font-extrabold text-white tracking-tight">
          <AnimatedCounter end={47.2} suffix="%" decimals={1} duration={2} />
        </p>
        <p className="text-[11px] text-white/50 leading-snug">
          Hem görünürlük hem aksiyonda iyileşme
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.08] rounded-xl px-5 py-3.5">
      <div className="w-9 h-9 rounded-lg bg-[hsl(173,77%,50%)]/10 flex items-center justify-center flex-shrink-0">
        <TrendingUp className="w-4 h-4 text-[hsl(173,77%,55%)]" />
      </div>
      <div>
        <p className="text-xl font-extrabold text-white tracking-tight">
          <AnimatedCounter end={371} duration={2} /> lokasyon
        </p>
        <p className="text-[11px] text-white/50 leading-snug">
          %20+ çift iyileşme adayı
        </p>
      </div>
    </div>
  </motion.div>
);

const OpportunityContrastBlock = () => {
  const invisibleCount = prospectPack.official_network.missing_invisible;
  const totalNetwork = prospectPack.official_network.total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.55, duration: 0.6 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-r from-[hsl(173,77%,50%)]/[0.06] to-[hsl(35,90%,55%)]/[0.06] border border-white/[0.1] rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {/* Left: Obenan Portfolio (managed, already active) */}
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[hsl(173,77%,50%)]/15 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[hsl(173,77%,55%)]" />
              </div>
              <p className="text-[10px] font-bold text-[hsl(173,77%,55%)] uppercase tracking-wider">
                Obenan Portföyü
              </p>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Bu sonuçlar <span className="font-semibold text-white/90">zaten dijitalde aktif</span> olan çok lokasyonlu markalarda ölçüldü.
            </p>
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-lg px-3 py-2">
              <span className="text-2xl font-extrabold text-[hsl(173,77%,55%)]">%41,5</span>
              <span className="text-xs text-white/50">medyan görünürlük artışı</span>
            </div>
          </div>

          {/* Right: Yapı Kredi (invisible, untapped) */}
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[hsl(35,90%,55%)]/15 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-[hsl(35,90%,60%)]" />
              </div>
              <p className="text-[10px] font-bold text-[hsl(35,90%,60%)] uppercase tracking-wider">
                Yapı Kredi Fırsatı
              </p>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Yapı Kredi'nin <span className="font-semibold text-white/90">{invisibleCount.toLocaleString("tr-TR")}+ lokasyonu</span> henüz Google'da bile görünmüyor.
            </p>
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-lg px-3 py-2">
              <span className="text-2xl font-extrabold text-[hsl(35,90%,60%)]">
                {invisibleCount.toLocaleString("tr-TR")}+
              </span>
              <span className="text-xs text-white/50">
                / {totalNetwork.toLocaleString("tr-TR")} ağda görünmeyen lokasyon
              </span>
            </div>
          </div>
        </div>

        {/* Connector strip */}
        <div className="bg-white/[0.04] border-t border-white/[0.08] px-6 py-4">
          <p className="text-center text-sm text-white/60 leading-relaxed">
            <span className="text-white/80 font-medium">Zaten görünür olan işletmeler %41,5 büyüdü.</span>{" "}
            Henüz görünmeyen{" "}
            <span className="font-semibold text-[hsl(35,90%,60%)]">
              {invisibleCount.toLocaleString("tr-TR")}+ lokasyonunuz
            </span>{" "}
            için fırsat çok daha büyük.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Component ──────────────────────────────────────────────────────────

export const PortfolioImpactDashboard = () => {
  const [methodOpen, setMethodOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-14"
    >
      {/* ── Dark Panel ─────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(209,100%,12%)] via-[hsl(209,100%,18%)] to-[hsl(209,80%,22%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_30%,hsl(173,77%,50%),transparent_50%),radial-gradient(circle_at_80%_70%,hsl(209,100%,60%),transparent_50%)]" />

        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
          {/* Section mini-header */}
          <div className="text-center mb-9">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[hsl(173,77%,55%)] bg-[hsl(173,77%,50%)]/10 border border-[hsl(173,77%,50%)]/20 rounded-full px-3.5 py-1 mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              Portföy Verisiyle Kanıtlandı
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Portföy Etki Fotoğrafı{" "}
              <span className="text-white/40 font-normal text-lg sm:text-xl">(12 Ay Önce/Sonra)</span>
            </h3>
            <p className="text-sm text-white/50 max-w-xl mx-auto">
              Çok lokasyonlu işletmeleri GBP performans verileri — konservatif medyan değerler
            </p>
          </div>

          {/* ── 4 Metric Cards ──────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-xl p-5 sm:p-6 text-center hover:bg-white/[0.1] transition-colors duration-300">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(173,77%,50%)]/10 text-[hsl(173,77%,55%)] mb-4">
                    {metric.icon}
                  </div>

                  {/* Big number */}
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1.5 tracking-tight">
                    <AnimatedCounter
                      key={`pid-${metric.label}-${metric.value}`}
                      end={metric.value}
                      suffix={metric.suffix}
                      prefix={metric.prefix}
                      decimals={metric.decimals}
                      duration={2.2}
                    />
                  </div>

                  {/* Label */}
                  <p className="text-sm font-semibold text-white/80 mb-1">{metric.label}</p>
                  <p className="text-[11px] text-white/40 leading-snug">{metric.subLabel}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Double Improvement Highlight Band ───────────────────── */}
          <DoubleImprovementBand />

          {/* ── Opportunity Contrast Block ──────────────────────────── */}
          <OpportunityContrastBlock />

          {/* ── Range Claim Band ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center bg-white/[0.04] border border-white/[0.06] rounded-xl px-5 py-3.5 mb-6"
          >
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Müşteri lokasyonlarının <span className="font-semibold text-white/80">%25'i en az %18</span>,{" "}
              <span className="font-semibold text-white/80">%75'i ise %104'e kadar</span>{" "}
              görünürlük artışı yaşadı.
            </p>
          </motion.div>

          {/* ── Churn Validation Insight ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-start gap-3 bg-[hsl(173,77%,50%)]/[0.08] border border-[hsl(173,77%,50%)]/15 rounded-xl px-5 py-4 mb-6"
          >
            <TrendingDown className="w-5 h-5 text-[hsl(173,77%,55%)] flex-shrink-0 mt-0.5" />
            <div>
            <p className="text-xs font-bold text-[hsl(173,77%,55%)] uppercase tracking-wider mb-1">
                Vazgeçmenin Maliyeti
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Obenan devre dışı kaldığında görünürlük metriklerinin anında düştüğü kanıtlandı. Bu, platformun organik büyüme üzerindeki 'Kausal' (Nedensel) etkisidir.
              </p>
            </div>
          </motion.div>

          {/* ── Collapsible Methodology ─────────────────────────────── */}
          <Collapsible open={methodOpen} onOpenChange={setMethodOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-2 mx-auto text-xs text-white/40 hover:text-white/60 transition-colors group">
                <Info className="w-3.5 h-3.5" />
                <span>Metodoloji & Veri Kaynağı</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    methodOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4"
              >
                <div className="space-y-2.5">
                  {methodologyItems.map((item) => (
                    <div key={item.label} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider min-w-[120px]">
                        {item.label}
                      </span>
                      <span className="text-xs text-white/50">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-white/30 italic">
                  Sonuçlar değişkenlik gösterebilir. Tüm veriler konservatif medyan değerlerle raporlanmıştır.
                </p>
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </motion.div>
  );
};
