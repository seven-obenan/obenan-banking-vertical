import { motion } from "framer-motion";
import { 
  RefreshCw, 
  Image, 
  FileText, 
  AlertTriangle, 
  Bot,
  Star,
  Search,
  Link2,
  Heart,
  Globe,
  BarChart3,
  MapPin,
  Users,
  MessageSquare
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ============================================
// TYPES & DATA
// ============================================

type BenefitCategory = "automation" | "detection" | "intelligence";

interface PlatformBenefit {
  category: BenefitCategory;
  icon: React.ReactNode;
  titleTR: string;
  titleEN: string;
  descriptionTR: string;
  descriptionEN: string;
}

const iconClass = "w-5 h-5";

const platformBenefits: PlatformBenefit[] = [
  // AUTOMATION
  {
    category: "automation",
    icon: <RefreshCw className={iconClass} />,
    titleTR: "Anlık Veri Eşitleme",
    titleEN: "Auto Sync",
    descriptionTR: "Her 48 saatte 6,753 lokasyon tüm platformlarda güncellenir",
    descriptionEN: "6,753 locations updated across all platforms every 48 hours"
  },
  {
    category: "automation",
    icon: <Image className={iconClass} />,
    titleTR: "Marka Vitrini Yönetimi",
    titleEN: "Visual Management",
    descriptionTR: "Günlük otomatik görsel yükleme — sıfır insan müdahalesi",
    descriptionEN: "Daily automated image uploads — zero human intervention"
  },
  {
    category: "automation",
    icon: <FileText className={iconClass} />,
    titleTR: "İçerik Yayını",
    titleEN: "Content Publishing",
    descriptionTR: "Her lokasyondan günlük otomatik paylaşımlar",
    descriptionEN: "Daily automated posts from every location"
  },
  {
    category: "automation",
    icon: <AlertTriangle className={iconClass} />,
    titleTR: "Otomatik Kriz Yönetimi",
    titleEN: "Escalation Hierarchy",
    descriptionTR: "Sorunlar otomatik olarak İlçe → Şehir → Ülke → Bölge Müdürü'ne iletilir",
    descriptionEN: "Issues auto-routed: District → City → Country → Regional Manager"
  },
  {
    category: "automation",
    icon: <Bot className={iconClass} />,
    titleTR: "7/24 Duygusal Zeka (Emotion AI)",
    titleEN: "AI Review Response",
    descriptionTR: "Marka sesiyle humanize edilmiş AI ile anında yanıt",
    descriptionEN: "Instant responses with humanized AI in brand voice"
  },

  // DETECTION
  {
    category: "detection",
    icon: <Star className={iconClass} />,
    titleTR: "Reputasyon Koruma Kalkanı",
    titleEN: "Rating Boost",
    descriptionTR: "QR kod ile yorum talep sistemi — şube/ATM puanları yükselir",
    descriptionEN: "QR code review request system — branch/ATM ratings increase"
  },
  {
    category: "detection",
    icon: <Search className={iconClass} />,
    titleTR: "Hata Tespiti",
    titleEN: "Error Detection",
    descriptionTR: "Yanlış saatler, duplicate veya askıda lokasyonlar anında tespit",
    descriptionEN: "Wrong hours, duplicates, or pending locations detected instantly"
  },
  {
    category: "detection",
    icon: <Link2 className={iconClass} />,
    titleTR: "Tek Kaynak",
    titleEN: "Single Source",
    descriptionTR: "Obenan ↔ Website ↔ Arama Ekosistemi çift yönlü senkron",
    descriptionEN: "Obenan ↔ Website ↔ Search Ecosystem bi-directional sync"
  },
  {
    category: "detection",
    icon: <Heart className={iconClass} />,
    titleTR: "Duygu Analizi",
    titleEN: "Sentiment Analysis",
    descriptionTR: "Aylık şube bazlı Emotion AI raporları",
    descriptionEN: "Monthly branch-level Emotion AI reports"
  },
  {
    category: "detection",
    icon: <Globe className={iconClass} />,
    titleTR: "Platform Kapsamı",
    titleEN: "Platform Coverage",
    descriptionTR: "Google, Apple Maps, Bing, Yandex + tüm arama ekosistemi",
    descriptionEN: "Google, Apple Maps, Bing, Yandex + full search ecosystem"
  },

  // INTELLIGENCE
  {
    category: "intelligence",
    icon: <BarChart3 className={iconClass} />,
    titleTR: "Yıllık Raporlama",
    titleEN: "Annual Reporting",
    descriptionTR: "Yol tarifi, site tıklaması, anahtar kelime aramaları",
    descriptionEN: "Directions, site clicks, keyword searches"
  },
  {
    category: "intelligence",
    icon: <MapPin className={iconClass} />,
    titleTR: "Stratejik Analiz",
    titleEN: "Strategic Analysis",
    descriptionTR: "Hangi ilçeler ATM arar? Stratejik yerleşim planlaması",
    descriptionEN: "Which districts search for ATMs? Strategic placement planning"
  },
  {
    category: "intelligence",
    icon: <Users className={iconClass} />,
    titleTR: "Şirket Kullanıcı Yönetimi",
    titleEN: "Company User Management",
    descriptionTR: "Rol tabanlı erişim — şube, bölge ve merkez yetkileri ayrı",
    descriptionEN: "Role-based access — separate branch, region, and HQ permissions"
  },
  {
    category: "intelligence",
    icon: <MessageSquare className={iconClass} />,
    titleTR: "ATM Arıza Toplama",
    titleEN: "ATM Issue Collection",
    descriptionTR: "Müşteri geri bildirimleri otomatik toplanır ve eskalasyon edilir",
    descriptionEN: "Customer feedback on broken ATMs auto-collected and escalated"
  }
];

// ============================================
// CONTENT
// ============================================

const content = {
  tr: {
    title: "Platform Faydaları",
    subtitle: "Obenan ile ne kazanırsınız?",
    categories: {
      automation: "OTOMASYON",
      detection: "TESPİT & DÜZELTME",
      intelligence: "RAPORLAMA & ANALİZ"
    }
  },
  en: {
    title: "Platform Benefits",
    subtitle: "What do you get with Obenan?",
    categories: {
      automation: "AUTOMATION",
      detection: "DETECTION & CORRECTION",
      intelligence: "REPORTING & ANALYTICS"
    }
  }
};

// ============================================
// CATEGORY CONFIG
// ============================================

const categoryConfig: Record<BenefitCategory, { colorClass: string; bgClass: string; borderClass: string }> = {
  automation: {
    colorClass: "text-cta",
    bgClass: "bg-cta/10",
    borderClass: "border-cta/20"
  },
  detection: {
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    borderClass: "border-primary/20"
  },
  intelligence: {
    colorClass: "text-status-excellent",
    bgClass: "bg-status-excellent/10",
    borderClass: "border-status-excellent/20"
  }
};

// ============================================
// SUB-COMPONENTS
// ============================================

function BenefitCard({ 
  benefit, 
  language, 
  index 
}: { 
  benefit: PlatformBenefit; 
  language: "tr" | "en";
  index: number;
}) {
  const config = categoryConfig[benefit.category];
  const title = language === "tr" ? benefit.titleTR : benefit.titleEN;
  const description = language === "tr" ? benefit.descriptionTR : benefit.descriptionEN;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-start gap-3 p-4 rounded-xl border ${config.borderClass} ${config.bgClass} hover:shadow-md transition-shadow`}
    >
      <div className={`${config.colorClass} mt-0.5`}>
        {benefit.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function CategoryColumn({ 
  category, 
  categoryLabel,
  benefits, 
  language 
}: { 
  category: BenefitCategory;
  categoryLabel: string;
  benefits: PlatformBenefit[];
  language: "tr" | "en";
}) {
  const config = categoryConfig[category];
  
  return (
    <div className="space-y-4">
      <div className={`text-xs font-bold uppercase tracking-wider ${config.colorClass} pb-2 border-b-2 ${config.borderClass}`}>
        {categoryLabel}
      </div>
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <BenefitCard 
            key={benefit.titleEN} 
            benefit={benefit} 
            language={language}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export const PlatformBenefitsGrid = () => {
  const { language } = useLanguage();
  const t = content[language];

  const automationBenefits = platformBenefits.filter(b => b.category === "automation");
  const detectionBenefits = platformBenefits.filter(b => b.category === "detection");
  const intelligenceBenefits = platformBenefits.filter(b => b.category === "intelligence");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 pt-12 border-t border-border"
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {t.title}
        </h3>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        <CategoryColumn 
          category="automation"
          categoryLabel={t.categories.automation}
          benefits={automationBenefits}
          language={language}
        />
        <CategoryColumn 
          category="detection"
          categoryLabel={t.categories.detection}
          benefits={detectionBenefits}
          language={language}
        />
        <CategoryColumn 
          category="intelligence"
          categoryLabel={t.categories.intelligence}
          benefits={intelligenceBenefits}
          language={language}
        />
      </div>
    </motion.div>
  );
};
