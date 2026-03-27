import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Shield,
  MessageSquare,
  Users,
  Globe,
  Car,
  FileText,
  BarChart3,
  Star,
  TrendingUp,
  Check,
  HelpCircle,
  X,
  Info,
  ChevronDown,
  ChevronUp,
  Zap,
  AlertTriangle,
  Lock,
  Globe2,
  Brain,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  comparisonPricingPack,
  proofBulletsTR,
  directoryLogos,
  oemLogos,
  disclaimerTR,
  exclusiveCapabilities,
} from "@/data/comparisonPricingPack";
import type { ClaimStatus, ComparisonRow } from "@/types/comparisonPricing";
import {
  calculatePricing,
  formatEur,
  formatNumber,
} from "@/lib/pricingCalculator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { prospectPack } from "@/data/prospectPack";

// ── Icon map for exclusive capabilities ─────────────────────────────────────

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Globe2: <Globe2 className="w-5 h-5" />,
};

// ── Category Icons ──────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Data freshness & recovery": <RefreshCw className="w-4 h-4" />,
  "Unauthorized edit recovery": <Shield className="w-4 h-4" />,
  "Review response & auto-escalation": <MessageSquare className="w-4 h-4" />,
  "Organization-wide dashboard access": <Users className="w-4 h-4" />,
  "Directory & navigation coverage": <Globe className="w-4 h-4" />,
  "Content automation": <FileText className="w-4 h-4" />,
  "Review requests & surveys": <Star className="w-4 h-4" />,
  "Historical search data & location intelligence": <BarChart3 className="w-4 h-4" />,
};

// ── Cell Capability Icon ────────────────────────────────────────────────────

type CellType = "obenan" | "kaydet" | "manual";

const CellIcon = ({ type }: { type: CellType }) => {
  if (type === "obenan") {
    return (
      <div className="w-7 h-7 rounded-full bg-status-excellent/15 flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 text-status-excellent" />
      </div>
    );
  }
  if (type === "kaydet") {
    return (
      <div className="w-7 h-7 rounded-full bg-status-watch/15 flex items-center justify-center flex-shrink-0">
        <HelpCircle className="w-4 h-4 text-status-watch" />
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
      <X className="w-4 h-4 text-destructive" />
    </div>
  );
};

// ── Plain-language Status Badge ─────────────────────────────────────────────

const StatusBadge = ({ status, lang }: { status: ClaimStatus; lang: "tr" | "en" }) => {
  const labels: Record<ClaimStatus, { tr: string; en: string; style: string; icon: React.ReactNode }> = {
    Verified: {
      tr: "Kanıtlanmış Obenan Yeteneği",
      en: "Verified Obenan Capability",
      style: "bg-status-excellent/10 text-status-excellent border-status-excellent/20",
      icon: <Check className="w-3 h-3" />,
    },
    Modeled: {
      tr: "Tahmine Dayalı Rakip Bilgisi",
      en: "Estimate-based Competitor Info",
      style: "bg-status-watch/10 text-status-watch border-status-watch/20",
      icon: <Info className="w-3 h-3" />,
    },
    Strategic: {
      tr: "Sadece Obenan Erişimi",
      en: "Exclusive Obenan Access",
      style: "bg-primary/10 text-primary border-primary/20",
      icon: <Lock className="w-3 h-3" />,
    },
  };

  const l = labels[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${l.style}`}>
      {l.icon} {l[lang]}
    </span>
  );
};

// ── Logo Strip ──────────────────────────────────────────────────────────────

const LogoStrip = ({ type }: { type: "directory" | "oem" }) => {
  const logos = type === "directory" ? directoryLogos : oemLogos;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {logos.map((logo) => (
        <TooltipProvider key={logo.key}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-6 h-6 rounded bg-white border border-border/50 overflow-hidden flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="w-4 h-4 object-contain"
                  loading="lazy"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {logo.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      {type === "directory" && (
        <span className="text-[10px] text-status-excellent font-medium self-center ml-1">+60</span>
      )}
    </div>
  );
};

// ── Bilingual helpers ───────────────────────────────────────────────────────

function getRowText(row: ComparisonRow, field: "category" | "metric" | "obenan" | "kaydet" | "manual" | "proof_note", lang: "tr" | "en"): string {
  if (lang === "tr") {
    const trField = `${field}_tr` as keyof ComparisonRow;
    const trVal = row[trField];
    if (typeof trVal === "string" && trVal) return trVal;
  }
  return row[field] as string;
}

function getHeadline(row: ComparisonRow, cell: CellType, lang: "tr" | "en"): string {
  const trKey = `${cell}_headline_tr` as keyof ComparisonRow;
  const enKey = `${cell}_headline` as keyof ComparisonRow;
  if (lang === "tr") {
    const trVal = row[trKey];
    if (typeof trVal === "string" && trVal) return trVal;
  }
  const enVal = row[enKey];
  return typeof enVal === "string" ? enVal : "";
}

function getBusinessImpact(row: ComparisonRow, lang: "tr" | "en"): string {
  if (lang === "tr") return (row as any).business_impact_tr || "";
  return (row as any).business_impact || "";
}

// ── Column background styles ────────────────────────────────────────────────

const COL_BG: Record<CellType, string> = {
  obenan: "bg-status-excellent/[0.04]",
  kaydet: "bg-status-watch/[0.04]",
  manual: "bg-destructive/[0.03]",
};

const COL_BG_HEADER: Record<CellType, string> = {
  obenan: "bg-status-excellent/[0.08]",
  kaydet: "bg-status-watch/[0.06]",
  manual: "bg-destructive/[0.04]",
};

// ── Desktop Matrix Row ──────────────────────────────────────────────────────

const MatrixRowDesktop = ({ row, lang }: { row: ComparisonRow; lang: "tr" | "en" }) => {
  const cells: { type: CellType; field: "obenan" | "kaydet" | "manual"; statusField: "obenan_status" | "kaydet_status" | "manual_status" }[] = [
    { type: "obenan", field: "obenan", statusField: "obenan_status" },
    { type: "kaydet", field: "kaydet", statusField: "kaydet_status" },
    { type: "manual", field: "manual", statusField: "manual_status" },
  ];

  const businessImpact = getBusinessImpact(row, lang);

  return (
    <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-0 border-b border-border/50 last:border-b-0">
      {/* Category */}
      <div className="p-4 flex flex-col gap-2 border-r border-border/50 bg-secondary/30">
        <div className="flex items-start gap-2">
          <span className="text-primary mt-0.5 flex-shrink-0">
            {CATEGORY_ICONS[row.category] || <Check className="w-4 h-4" />}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{getRowText(row, "category", lang)}</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{getRowText(row, "metric", lang)}</p>
          </div>
        </div>
        {businessImpact && (
          <div className="bg-primary/5 border border-primary/10 rounded-lg px-2.5 py-1.5 mt-auto">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-0.5">
              {lang === "tr" ? "İş Etkisi" : "Business Impact"}
            </p>
            <p className="text-[11px] text-primary/80 leading-tight">{businessImpact}</p>
          </div>
        )}
      </div>

      {/* Three capability cells */}
      {cells.map(({ type, field, statusField }) => {
        const headline = getHeadline(row, type, lang);
        const detail = getRowText(row, field, lang);

        return (
          <div key={type} className={`p-4 border-r border-border/30 last:border-r-0 ${COL_BG[type]}`}>
            <div className="flex items-start gap-2.5">
              <CellIcon type={type} />
              <div className="min-w-0 flex-1">
                {headline && (
                  <p className={`text-sm font-bold mb-1 ${
                    type === "obenan" ? "text-status-excellent" : type === "kaydet" ? "text-status-watch" : "text-destructive"
                  }`}>
                    {headline}
                  </p>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
                {type === "obenan" && row.has_logo_strip && (
                  <LogoStrip type={row.has_logo_strip} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Mobile Card Row ─────────────────────────────────────────────────────────

const MatrixRowMobile = ({ row, lang, manualLabel }: { row: ComparisonRow; lang: "tr" | "en"; manualLabel: string }) => {
  const [expanded, setExpanded] = useState(false);
  const businessImpact = getBusinessImpact(row, lang);

  const cells: { label: string; type: CellType; field: "obenan" | "kaydet" | "manual"; statusField: "obenan_status" | "kaydet_status" | "manual_status" }[] = [
    { label: "Obenan", type: "obenan", field: "obenan", statusField: "obenan_status" },
    { label: "Kaydet", type: "kaydet", field: "kaydet", statusField: "kaydet_status" },
    { label: manualLabel, type: "manual", field: "manual", statusField: "manual_status" },
  ];

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-primary flex-shrink-0">
            {CATEGORY_ICONS[row.category] || <Check className="w-4 h-4" />}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{getRowText(row, "category", lang)}</p>
            {businessImpact && (
              <p className="text-[10px] text-primary mt-0.5 truncate">{businessImpact}</p>
            )}
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-border divide-y divide-border">
          {cells.map(({ label, type, field, statusField }) => {
            const headline = getHeadline(row, type, lang);
            const detail = getRowText(row, field, lang);

            return (
              <div key={type} className={`p-3 ${COL_BG[type]}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <CellIcon type={type} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      type === "obenan" ? "text-status-excellent" : type === "kaydet" ? "text-status-watch" : "text-destructive"
                    }`}>{label}</span>
                  </div>
                </div>
                {headline && (
                  <p className={`text-sm font-bold mb-0.5 ${
                    type === "obenan" ? "text-status-excellent" : type === "kaydet" ? "text-status-watch" : "text-destructive"
                  }`}>
                    {headline}
                  </p>
                )}
                <p className="text-xs text-foreground leading-relaxed">{detail}</p>
                {type === "obenan" && row.has_logo_strip && (
                  <LogoStrip type={row.has_logo_strip} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Exclusive Capabilities Block ────────────────────────────────────────────

const ExclusiveCapabilitiesBlock = ({ lang }: { lang: "tr" | "en" }) => {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-full px-4 py-2 mb-4">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-primary">
            {lang === "tr" ? "Sadece Obenan'da" : "Only with Obenan"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {lang === "tr"
            ? "Bu yetenekler Kaydet veya manuel operasyonlarla sağlanamaz — yalnızca Obenan platformu üzerinden erişilebilir."
            : "These capabilities cannot be provided by Kaydet or manual operations — accessible only through the Obenan platform."
          }
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {exclusiveCapabilities.map((cap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-xl border-2 border-primary/10 p-5 shadow-sm hover:shadow-md hover:border-primary/25 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/15 transition-colors">
              {ICON_MAP[cap.icon] || <Zap className="w-5 h-5" />}
            </div>
            <h4 className="text-sm font-bold text-foreground mb-2 leading-tight">
              {lang === "tr" ? cap.title_tr : cap.title_en}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {lang === "tr" ? cap.desc_tr : cap.desc_en}
            </p>
            <div className="bg-status-excellent/5 border border-status-excellent/15 rounded-lg px-2.5 py-1.5">
              <p className="text-[10px] font-bold text-status-excellent uppercase tracking-wider mb-0.5">
                {lang === "tr" ? "Sonuç" : "Outcome"}
              </p>
              <p className="text-[11px] text-status-excellent/80 leading-tight">
                {lang === "tr" ? cap.impact_tr : cap.impact_en}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ── Badge Legend ─────────────────────────────────────────────────────────────

const BadgeLegend = ({ lang }: { lang: "tr" | "en" }) => {
  const items: { status: ClaimStatus; desc_tr: string; desc_en: string }[] = [
    {
      status: "Verified",
      desc_tr: "Obenan'ın kendi ürününden doğrulanmış bilgi",
      desc_en: "Information verified from Obenan's own product",
    },
    {
      status: "Modeled",
      desc_tr: "Rakip hakkında bağımsız olarak doğrulanmamış bilgi",
      desc_en: "Competitor information not independently verified",
    },
    {
      status: "Strategic",
      desc_tr: "Yalnızca Obenan'ın sahip olduğu platform erişimi",
      desc_en: "Platform access exclusive to Obenan",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 bg-secondary/50 rounded-xl px-4 py-3 mb-4 border border-border/50">
      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        {lang === "tr" ? "Güven Düzeyleri:" : "Confidence Levels:"}
      </span>
      {items.map((item) => (
        <div key={item.status} className="flex items-center gap-2">
          <StatusBadge status={item.status} lang={lang} />
          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            {lang === "tr" ? item.desc_tr : item.desc_en}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Simplified Pricing Offer Card ────────────────────────────────────────────

const PricingOfferCard = ({ t, locale }: { t: ReturnType<typeof useContent>; locale: "tr" | "en" }) => {
  const totalLocations = prospectPack.official_network.total; // 6,753
  const pricing = useMemo(
    () =>
      calculatePricing({
        price_per_location_eur: 8.5,
        cap_locations: 6500,
        eur_try_helper_rate: 39,
        active_locations: totalLocations,
        new_locations_added_this_month: 0,
      }),
    [totalLocations]
  );

  const annualFee = pricing.effective_monthly_fee_eur * 12;
  const freeLocations = totalLocations - pricing.billable_locations_this_month;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-subtle p-6 border-b border-border text-center">
        <h3 className="text-lg font-semibold text-foreground">
          {locale === "tr" ? "Tam Koruma Paketi" : "Full Protection Package"}
        </h3>
        <p className="text-3xl font-bold text-primary mt-2">
          €8,50
          <span className="text-base font-normal text-muted-foreground ml-2">
            / {locale === "tr" ? "konum" : "location"} / {locale === "tr" ? "ay" : "month"}
          </span>
        </p>
      </div>

      {/* Pricing summary table */}
      <div className="p-6">
        <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
          {[
            {
              label: locale === "tr" ? "Toplam Ağ" : "Total Network",
              value: formatNumber(totalLocations, locale),
            },
            {
              label: locale === "tr" ? "Fatura Tavanı" : "Billing Cap",
              value: formatNumber(6500, locale),
            },
            {
              label: locale === "tr" ? "Tavan Üstü (ücretsiz)" : "Above Cap (free)",
              value: formatNumber(freeLocations, locale),
              highlight: true,
            },
            {
              label: locale === "tr" ? "Aylık Bedel" : "Monthly Fee",
              value: formatEur(pricing.effective_monthly_fee_eur, locale),
              bold: true,
            },
            {
              label: locale === "tr" ? "Yıllık Bedel" : "Annual Fee",
              value: formatEur(annualFee, locale),
              bold: true,
            },
          ].map((row, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-5 py-3.5 ${
                row.bold ? "bg-primary/[0.03]" : ""
              }`}
            >
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span
                className={`tabular-nums ${
                  row.bold
                    ? "text-base font-bold text-primary"
                    : row.highlight
                    ? "text-sm font-semibold text-status-excellent"
                    : "text-sm font-semibold text-foreground"
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Policy notes */}
        <div className="mt-5 space-y-2">
          <p className="text-sm text-status-excellent font-medium text-center">
            {locale === "tr"
              ? `6.500 tavan — ${formatNumber(freeLocations, locale)} konum ücretsiz dahil.`
              : `6,500 cap — ${formatNumber(freeLocations, locale)} locations included free.`}
          </p>
          <p className="text-xs text-muted-foreground text-center">
            {locale === "tr"
              ? "Tam portföy onboarding için geçerlidir."
              : "Valid for full portfolio onboarding."}
          </p>
        </div>

        {/* Bottom disclaimers */}
        <div className="mt-5 bg-secondary/40 rounded-lg px-4 py-3 flex flex-wrap gap-x-6 gap-y-1">
          <p className="text-[10px] text-muted-foreground">
            {locale === "tr" ? "Tüm hesaplama EUR bazlıdır." : "All calculations are EUR-based."}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {locale === "tr"
              ? "Bu kapsam için sunduğumuz en düşük birim fiyat."
              : "The lowest unit price we offer for this scope."}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Proof Bullets ───────────────────────────────────────────────────────────

const ProofBullets = ({ t }: { t: ReturnType<typeof useContent> }) => {
  const icons = [
    <RefreshCw className="w-4 h-4" />,
    <FileText className="w-4 h-4" />,
    <Users className="w-4 h-4" />,
    <AlertTriangle className="w-4 h-4" />,
    <BarChart3 className="w-4 h-4" />,
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {comparisonPricingPack.proof_bullets.map((bullet, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex items-start gap-3 bg-white rounded-xl border border-border p-4 shadow-sm"
        >
          <span className="text-cta flex-shrink-0 mt-0.5">{icons[i]}</span>
          <p className="text-sm text-foreground leading-relaxed">{t.proofBullets[i] || bullet}</p>
        </motion.div>
      ))}
    </div>
  );
};

// ── Micro Transition (Quantified) ───────────────────────────────────────────

const MicroTransition = ({ t }: { t: ReturnType<typeof useContent> }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Today */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-status-watch/5 border border-status-watch/20 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-status-watch" />
          <h4 className="font-semibold text-foreground">{t.todayTitle}</h4>
        </div>
        <ul className="space-y-3">
          {t.todayMetrics.map((m, i) => (
            <li key={i} className="flex items-start gap-3">
              <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-base font-bold text-status-watch tabular-nums">{m.value}</span>
                <p className="text-sm text-muted-foreground">{m.label}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Greyed out directory logos */}
        <div className="flex flex-wrap gap-1.5 mt-4 opacity-30">
          {directoryLogos.slice(0, 8).map(logo => (
            <div key={logo.key} className="w-5 h-5 rounded overflow-hidden bg-muted">
              <img src={logo.url} alt={logo.name} className="w-full h-full object-contain grayscale" loading="lazy" />
            </div>
          ))}
          <span className="text-[9px] text-muted-foreground self-center">+60</span>
        </div>
      </motion.div>

      {/* With Obenan */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-status-excellent/[0.04] border border-status-excellent/20 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-status-excellent" />
          <h4 className="font-semibold text-foreground">{t.obenanTitle}</h4>
        </div>
        <ul className="space-y-3">
          {t.obenanMetrics.map((m, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-status-excellent flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-base font-bold text-status-excellent tabular-nums">{m.value}</span>
                <p className="text-sm text-foreground">{m.label}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Active directory logos */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {directoryLogos.slice(0, 8).map(logo => (
            <div key={logo.key} className="w-5 h-5 rounded overflow-hidden bg-white border border-status-excellent/20">
              <img src={logo.url} alt={logo.name} className="w-full h-full object-contain" loading="lazy" />
            </div>
          ))}
          <span className="text-[9px] text-status-excellent font-medium self-center">+60</span>
        </div>
      </motion.div>
    </div>
  );
};

// ── Content Hook ────────────────────────────────────────────────────────────

function useContent() {
  const { language } = useLanguage();
  const locale = language;
  const audit = prospectPack.audit;

  const content = {
    tr: {
      badge: "Karşılaştırma ve Maliyet Analizi",
      title: "Obenan vs Kaydet vs Manuel Operasyon",
      subtitle: "Teknik değil, operasyonel ve finansal farkı gösterir.",
      promise: "Kontrol, hız ve büyüme etkisi tek panelde.",
      matrixTitle: "Kategori",
      obenanHeader: "Obenan",
      kaydetHeader: "Kaydet",
      manualLabel: "Manuel",
      recommendedBadge: "Önerilen Çözüm",
      calcTitle: "Tam Koruma Paketi",
      calcSubtitle: "Aylık faturalandırma: min(sözleşme kapsamı, 6.500) × €8,50",
      contractScopeLabel: "Aktif Korunan Lokasyon Sayısı",
      newLocLabel: "Bu Ay Eklenen Yeni Konum",
      advancedLabel: "Döviz kuru ayarı",
      fxLabel: "EUR/TRY Yardımcı Kur",
      billableLabel: "Aktif Korunan Lokasyon",
      monthlyLabel: "Tam Kapsam Aylık Sözleşme Bedeli",
      nextMonthLabel: "Sonraki Ay Fatura (Yeni Konum Kredisi Sonrası)",
      creditLabel: "kredi uygulandı",
      capBadge: "Tavan Uygulandı",
      manualCostLabel: "Manuel Maliyet Tahmini",
      modeledLabel: "Modellenmiş tahmin (seçili yoğunluk)",
      fxDisclaimer: "Yalnızca yardımcı dönüşüm. Faturalama EUR cinsindendir.",
      proofTitle: "Neden Önemli",
      proofBullets: proofBulletsTR,
      transitionTitle: "Bugün vs Obenan ile",
      todayTitle: "Bugünkü Durum",
      todayMetrics: [
        { value: audit.shadow_locations.toString(), label: "gölge konum — müşteri trafiğini böler" },
        { value: prospectPack.unclaimed_data.total_bank_atm.toString(), label: "talep edilmemiş liste — kontrol dışı" },
        { value: "0", label: "otomatik eskalasyon — şikayetler kaybolur" },
        { value: "0", label: "review request sistemi — geri bildirim toplanamaz" },
        { value: "0/70+", label: "dizin senkronize — TomTom/OEM erişimi yok" },
      ],
      todayCaption: "Bu boşluklar her gün müşteri güveni ve operasyonel verimlilik kaybına neden olur",
      obenanTitle: "Obenan ile Kontrol",
      obenanMetrics: [
        { value: "0", label: "gölge konum — tümü birleştirilmiş" },
        { value: "100%", label: "sahiplenilmiş listeler — tam kontrol" },
        { value: "Aktif", label: "otomatik eskalasyon — İlçe→İl→Ülke→Bölge" },
        { value: "Aktif", label: "review request + anket — proaktif geri bildirim" },
        { value: "70+", label: "platform senkron — TomTom/OEM dahil" },
      ],
      obenanCaption: "Tüm organizasyon tek dashboard'dan erişir — her seviyede kontrol",
      disclaimerComp: disclaimerTR.competition,
      disclaimerCurrency: disclaimerTR.currency,
    },
    en: {
      badge: "Comparison & Cost Analysis",
      title: "Obenan vs Kaydet vs Manual Operations",
      subtitle: "Not technical — operational and financial differentiation.",
      promise: "Control, speed, and growth impact in one panel.",
      matrixTitle: "Category",
      obenanHeader: "Obenan",
      kaydetHeader: "Kaydet",
      manualLabel: "Manual",
      recommendedBadge: "Recommended",
      calcTitle: "Full Portfolio Offer Card",
      calcSubtitle: "Monthly billing: min(contract scope, 6,500) × €8.50",
      contractScopeLabel: "Contract Scope Locations",
      newLocLabel: "New Locations Added This Month",
      advancedLabel: "Exchange rate setting",
      fxLabel: "EUR/TRY Helper Rate",
      billableLabel: "Billable Locations",
      monthlyLabel: "Full-Scope Monthly Contract Fee",
      nextMonthLabel: "Next Month Invoice (After New Location Credit)",
      creditLabel: "credit applied",
      capBadge: "Cap Applied",
      manualCostLabel: "Manual Cost Estimate",
      modeledLabel: "Modeled estimate (selected intensity)",
      fxDisclaimer: "Helper conversion only. Invoicing in EUR.",
      proofTitle: "Why This Matters",
      proofBullets: comparisonPricingPack.proof_bullets,
      transitionTitle: "Today vs With Obenan",
      todayTitle: "Today",
      todayMetrics: [
        { value: audit.shadow_locations.toString(), label: "shadow locations — split customer traffic" },
        { value: prospectPack.unclaimed_data.total_bank_atm.toString(), label: "unclaimed listings — out of control" },
        { value: "0", label: "auto-escalation — complaints get lost" },
        { value: "0", label: "review request system — no feedback collection" },
        { value: "0/70+", label: "directories synced — no TomTom/OEM access" },
      ],
      todayCaption: "These gaps cause daily loss of customer trust and operational efficiency",
      obenanTitle: "With Obenan",
      obenanMetrics: [
        { value: "0", label: "shadow locations — all consolidated" },
        { value: "100%", label: "claimed listings — full control" },
        { value: "Active", label: "auto-escalation — District→City→Country→Region" },
        { value: "Active", label: "review request + survey — proactive feedback" },
        { value: "70+", label: "platforms synced — including TomTom/OEM" },
      ],
      obenanCaption: "Entire organization accesses one dashboard — control at every level",
      disclaimerComp: comparisonPricingPack.disclaimer.competition,
      disclaimerCurrency: comparisonPricingPack.disclaimer.currency,
    },
  };

  return { ...content[language], locale };
}

// ── Main Section ────────────────────────────────────────────────────────────

export const PricingComparisonSection = () => {
  const { language } = useLanguage();
  const t = useContent();
  const rows = comparisonPricingPack.rows;

  return (
    <section className="py-24 px-4 bg-gradient-subtle relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── 1. Executive Header ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
            {t.subtitle}
          </p>
          <p className="text-base font-semibold text-primary">
            {t.promise}
          </p>
        </motion.div>

        {/* ── 2. "Sadece Obenan'da" Exclusive Block ──────────────────── */}
        <ExclusiveCapabilitiesBlock lang={language} />

        {/* ── 3. Executive Comparison Table ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold text-foreground text-center mb-2">
            {language === "tr" ? "Yetenek Karşılaştırması" : "Capability Comparison"}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {language === "tr" ? "8 kritik alan — her satırda iş etkisi" : "8 critical areas — business impact per row"}
          </p>

          {/* Badge Legend */}
          <BadgeLegend lang={language} />

          {/* Desktop matrix */}
          <div className="hidden lg:block bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-0 border-b-2 border-border">
              <div className="p-4 bg-secondary/50">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.matrixTitle}</p>
              </div>
              <div className={`p-4 border-l border-border/50 ${COL_BG_HEADER.obenan}`}>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-status-excellent" />
                  <p className="text-sm font-bold text-status-excellent">{t.obenanHeader}</p>
                  <span className="text-[10px] font-bold bg-status-excellent/15 text-status-excellent px-2 py-0.5 rounded-full">
                    {t.recommendedBadge}
                  </span>
                </div>
              </div>
              <div className={`p-4 border-l border-border/50 ${COL_BG_HEADER.kaydet}`}>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-status-watch" />
                  <p className="text-sm font-bold text-status-watch">{t.kaydetHeader}</p>
                </div>
              </div>
              <div className={`p-4 border-l border-border/50 ${COL_BG_HEADER.manual}`}>
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive" />
                  <p className="text-sm font-bold text-destructive">{t.manualLabel}</p>
                </div>
              </div>
            </div>

            {/* Data rows */}
            {rows.map((row) => (
              <MatrixRowDesktop key={row.category} row={row} lang={language} />
            ))}
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-3">
            {rows.map((row) => (
              <MatrixRowMobile key={row.category} row={row} lang={language} manualLabel={t.manualLabel} />
            ))}
          </div>
        </motion.div>

        {/* ── 4. Bugün vs Obenan ile ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold text-foreground text-center mb-6">{t.transitionTitle}</h3>
          <MicroTransition t={t} />
        </motion.div>

        {/* ── 5. Proof Bullets (full width strip) ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">{t.proofTitle}</h3>
          <ProofBullets t={t} />
        </motion.div>

        {/* ── 6. Full-Width Offer Card ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <PricingOfferCard t={t} locale={t.locale} />
        </motion.div>

        {/* ── Disclaimers ──────────────────────────────────────────────── */}
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground/60 italic">{t.disclaimerComp}</p>
          <p className="text-xs text-muted-foreground/60 italic">{t.disclaimerCurrency}</p>
        </div>
      </div>
    </section>
  );
};
