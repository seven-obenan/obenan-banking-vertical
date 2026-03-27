import { motion } from "framer-motion";
import {
  Award,
  Globe,
  Building2,
  Quote,
  ArrowRight,
  ChevronRight,
  MapPin,
  TrendingUp,
  Zap,
  MessageSquare,
  ImageIcon,
  Star,
  Search,
  Navigation,
  Calendar,
  Users,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PortfolioImpactDashboard } from "@/components/PortfolioImpactDashboard";

// ── Trust Strip Badges ──────────────────────────────────────────────────────

const trustBadges = [
  { icon: <Calendar className="w-4 h-4" />, text: "4+ yıl operasyonel deneyim" },
  { icon: <Globe className="w-4 h-4" />, text: "43+ ülkede operasyonel kapsam" },
  { icon: <Building2 className="w-4 h-4" />, text: "50+ sektörde uygulama" },
  { icon: <Users className="w-4 h-4" />, text: "Çok lokasyonlu ağ yönetiminde uzmanlık" },
  { icon: <MapPin className="w-4 h-4" />, text: "1.244+ lokasyon analiz edildi" },
];

// ── Case Studies ────────────────────────────────────────────────────────────

interface CaseStudy {
  brand: string;
  industry: string;
  scale: string;
  icon: React.ReactNode;
  quotes: string[];
  outcomes: string[];
  ykMeaning: string;
  videoId?: string;
  accentColor: string;
}

const caseStudies: CaseStudy[] = [
  {
    brand: "Le Pain Quotidien",
    industry: "Küresel Zincir Yönetimi",
    scale: "250+ lokasyon, 30 ülke",
    icon: <Globe className="w-5 h-5" />,
    quotes: [
      "Google is happier than ever before… more leads, more qualified web visitors, higher rankings.",
      "Without Obenan, we would need several full-time employees and still be slower.",
    ],
    outcomes: [
      "Google görünürlüğünde medyan %41,5 artış (portföy geneli)",
      "Daha fazla nitelikli web ziyaretçisi ve müşteri aksiyonu",
      "30 ülkeye ölçeklenen merkezi lokasyon yönetimi",
    ],
    ykMeaning: "Şube/ATM ağında görünürlük ve talep yakalama hızını artırır.",
    videoId: "vxrYXjTXJp4",
    accentColor: "bg-[hsl(30,60%,95%)]",
  },
  {
    brand: "Nusr-Et",
    industry: "Premium Marka Grubu",
    scale: "30+ lokasyon, 15 şehir, 7 ülke",
    icon: <Star className="w-5 h-5" />,
    quotes: [
      "Obenan has transformed visibility and management… operational teams manage branches through our exclusive dashboard.",
      "It has become a core platform within our organization.",
    ],
    outcomes: [
      "Pazarlama dışındaki ekipler de aktif kullanıma geçti",
      "Küresel operasyonlarda tek panelden yönetim",
      "Emotion AI (since 2022) ile çok dilli müşteri geri bildirim yönetimi",
    ],
    ykMeaning: "Tüm organizasyonun rol bazlı katılımıyla merkezi kontrol sağlar.",
    videoId: "yzpqbLYtdis",
    accentColor: "bg-[hsl(0,40%,95%)]",
  },
];

// ── Transfer Mapping ────────────────────────────────────────────────────────

interface TransferRow {
  proven: string;
  capability: string;
  capabilityIcon: React.ReactNode;
  impact: string;
}

const transferRows: TransferRow[] = [
  {
    proven: "Daha fazla görünürlük",
    capability: "70+ dizin + TomTom + OEM/navigasyon veri beslemesi",
    capabilityIcon: <Navigation className="w-4 h-4" />,
    impact: "Şube/ATM bulunabilirliği artar",
  },
  {
    proven: "Daha hızlı operasyon",
    capability: "Otomatik eskalasyon zinciri (İlçe→İl→Ülke→Bölge)",
    capabilityIcon: <Zap className="w-4 h-4" />,
    impact: "Çağrı merkezi ve operasyon yükü azalır",
  },
  {
    proven: "Daha güçlü içerik disiplini",
    capability: "Lokasyon başına günlük 1 görsel + günlük 1 Google Post + aylık geri bildirim tabanlı içerik yenileme",
    capabilityIcon: <ImageIcon className="w-4 h-4" />,
    impact: "Tutarlı marka görünümü",
  },
  {
    proven: "Daha iyi müşteri yönetimi",
    capability: "Review request + survey yönlendirmesi",
    capabilityIcon: <MessageSquare className="w-4 h-4" />,
    impact: "Düşük puanlar iç aksiyona, yüksek puanlar kamuya",
  },
  {
    proven: "Daha iyi lokasyon kararı",
    capability: "Discovery/Branded search verisini tarihsel saklama",
    capabilityIcon: <Search className="w-4 h-4" />,
    impact: "Nerede ATM aç/kapat karar desteği",
  },
];

// ── Case Card Component ─────────────────────────────────────────────────────

const CaseCard = ({ study, index }: { study: CaseStudy; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="group relative bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
  >
    {/* Top accent bar */}
    <div className={`h-1 w-full ${study.accentColor}`} />

    <div className="p-6 sm:p-7">
      {/* Header: Brand + scale */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center text-primary flex-shrink-0">
          {study.icon}
        </div>
        <div className="min-w-0">
          <h4 className="text-lg font-bold text-foreground leading-tight">{study.brand}</h4>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full">
              {study.industry}
            </span>
            <span className="text-xs text-muted-foreground">{study.scale}</span>
          </div>
        </div>
      </div>

      {/* Quotes */}
      <div className="space-y-3 mb-5">
        {study.quotes.map((quote, qi) => (
          <div key={qi} className="relative pl-4 border-l-2 border-primary/20">
            <Quote className="absolute -left-2.5 -top-0.5 w-4 h-4 text-primary/30 bg-white" />
            <p className="text-sm text-foreground/80 italic leading-relaxed">"{quote}"</p>
          </div>
        ))}
      </div>

      {/* Outcomes */}
      <div className="space-y-2 mb-5">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          Müşteri ile Kanıtlandı
        </p>
        {study.outcomes.map((outcome, oi) => (
          <div key={oi} className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[hsl(var(--status-excellent))]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ChevronRight className="w-3 h-3 text-[hsl(var(--status-excellent))]" />
            </div>
            <p className="text-sm text-foreground/90 leading-snug">{outcome}</p>
          </div>
        ))}
      </div>

      {/* YK Meaning */}
      <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3">
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
          Yapı Kredi için anlamı
        </p>
        <p className="text-sm text-primary/80 leading-snug">{study.ykMeaning}</p>
      </div>

    </div>
  </motion.div>
);

// ── Main Section ────────────────────────────────────────────────────────────

export const CustomerSuccessProofSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background texture — warm, distinct from the comparison matrix */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(40,30%,98%)] via-white to-[hsl(40,20%,97%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--status-excellent)),transparent_50%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Section Header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--status-excellent))] bg-[hsl(var(--status-excellent))]/8 border border-[hsl(var(--status-excellent))]/15 rounded-full px-4 py-1.5 mb-5">
            <Award className="w-4 h-4" />
            Müşteri ile Kanıtlandı
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
            Sahada Kanıtlandı:{" "}
            <span className="text-primary">Çok Lokasyonlu Markalarda Gerçek Sonuçlar</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Eğitim, sağlık, perakende, konaklama ve daha pek çok sektörde, farklı ülkelerde aynı sonuç: daha yüksek görünürlük, daha hızlı operasyon, daha güçlü kontrol.
          </p>
        </motion.div>

        {/* ── Trust Strip ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 bg-white border border-border/80 rounded-full px-4 py-2 text-sm text-foreground/80 shadow-sm"
            >
              <span className="text-primary">{badge.icon}</span>
              <span className="font-medium">{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Portfolio Impact Dashboard ────────────────────────── */}
        <PortfolioImpactDashboard />

        {/* ── Case Cards ────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {caseStudies.map((study, i) => (
            <CaseCard key={study.brand} study={study} index={i} />
          ))}
        </div>

        {/* ── Video Testimonials — side by side in macOS frames ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-center text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-6">
            Müşteri Röportajları
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.filter(s => s.videoId).map((study, i) => (
              <motion.div
                key={study.videoId}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative"
              >
                {/* macOS Browser Frame */}
                <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-[0_12px_40px_-10px_rgba(0,0,0,0.2)] border border-black/10">
                  {/* Title Bar */}
                  <div className="bg-gradient-to-b from-[#e8e6e8] to-[#d4d2d4] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center relative">
                    <div className="flex items-center gap-1.5 z-10">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e] border border-[#dea123]" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840] border border-[#1aab29]" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] sm:text-[11px] text-[#4a4a4a] font-normal tracking-wide">
                        {study.brand} — Müşteri Röportajı
                      </span>
                    </div>
                  </div>
                  {/* Video */}
                  <div className="relative bg-[#1a1a1a] aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${study.videoId}`}
                      title={`${study.brand} - Müşteri Röportajı`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
                {/* Subtle reflection */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-black/6 blur-xl rounded-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Transfer-to-Banking Block ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Bu Etki Yapı Kredi'ye Nasıl Taşınır?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Farklı sektörlerde kanıtlanan sonuçlar, Yapı Kredi'nin şube ve ATM ağına doğrudan uygulanabilir.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-3 gap-0 border-b-2 border-primary/10">
              <div className="p-4 bg-[hsl(var(--status-excellent))]/5">
                <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--status-excellent))]">Kanıtlanan Sonuç</p>
              </div>
              <div className="p-4 bg-primary/5 border-x border-border/30">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Platform Yeteneği</p>
              </div>
              <div className="p-4 bg-[hsl(var(--cta))]/5">
                <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--cta))]">Operasyonel Etki</p>
              </div>
            </div>

            {/* Data rows */}
            {transferRows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-0 border-b border-border/50 last:border-b-0 hover:bg-secondary/30 transition-colors"
              >
                <div className="p-4 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[hsl(var(--status-excellent))]/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-[hsl(var(--status-excellent))]" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{row.proven}</p>
                </div>
                <div className="p-4 border-x border-border/30 flex items-center gap-2">
                  <span className="text-primary flex-shrink-0">{row.capabilityIcon}</span>
                  <p className="text-sm text-foreground/80 leading-snug">{row.capability}</p>
                </div>
                <div className="p-4 flex items-center">
                  <p className="text-sm font-medium text-[hsl(var(--cta))]">{row.impact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {transferRows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-xl border border-border shadow-sm p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[hsl(var(--status-excellent))]/10 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-[hsl(var(--status-excellent))]" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{row.proven}</p>
                </div>
                <div className="pl-9 space-y-2">
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5">Platform Yeteneği</p>
                    <p className="text-xs text-foreground/80 leading-relaxed">{row.capability}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[hsl(var(--cta))] uppercase tracking-wider mb-0.5">Operasyonel Etki</p>
                    <p className="text-xs font-medium text-[hsl(var(--cta))]">{row.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
