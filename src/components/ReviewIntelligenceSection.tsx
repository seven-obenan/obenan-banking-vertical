import { motion, type Easing } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { prospectPack } from "@/data/prospectPack";
import { 
  Phone, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare, 
  Star, 
  ExternalLink,
  Search,
  UserCheck,
  FileWarning,
  Sparkles,
  ShieldCheck,
  MessageCircleReply,
  Building,
  Users,
  ArrowRight
} from "lucide-react";
import golcukScreenshotEn from "@/assets/golcuk-review-screenshot.png";
import golcukScreenshotTr from "@/assets/golcuk-review-screenshot-tr.png";

export const ReviewIntelligenceSection = () => {
  const { language } = useLanguage();
  const data = prospectPack.review_intelligence;

  const content = {
    tr: {
      badge: "Müşteri Sinyalleri",
      title: "Her yorum bir veri sinyali.",
      subtitle: "Her sinyal bir fırsat.",
      metrics: {
        scanned: "Yorum Tarandı",
        unanswered: "Yanıtsız",
        phoneComplaints: "Telefon Şikayeti"
      },
      caseTitle: "Örnek Vaka: Telefon Verisi Tutarsızlığı",
      caseLocation: "Yapı Kredi Bankası Gölcük Şubesi",
      caseCity: "Gölcük, Kocaeli",
      phoneVariantsLabel: "farklı numara tespit edildi",
      keywordsLabel: "Tespit edilen anahtar kelimeler",
      reviewerLabel: "Yorumcu",
      whatWeDoTitle: "Obenan Ne Yapar?",
      actions: [
        { icon: Search, text: "Anahtar kelime tespiti", detail: "telefon, ulaşamadım, müşteri temsilcisi", keywords: ["telefon", "ulaşamadım", "müşteri"] },
        { icon: UserCheck, text: "Yorumcu doğrulama", detail: `${data.featured_case.reviewer_name} gerçek mi?` },
        { icon: ShieldCheck, text: "Sahte yorum analizi", detail: "Yorum örüntülerini değerlendir" },
        { icon: FileWarning, text: "Veri tutarsızlığı tespiti", detail: "5 farklı numara işaretlendi!" },
        { icon: Phone, text: "Doğru numara önerisi", detail: data.featured_case.correct_phone },
        { icon: Building, text: "Departman eskalasyonu", detail: "Şube Müdürü, Müşteri Hizmetleri" },
        { icon: MessageCircleReply, text: "Marka sesinde yanıt önerisi", detail: "Kişiselleştirilmiş özür + düzeltme" }
      ],
      suggestedResponseTitle: "Önerilen Yanıt",
      closingTitle: "Türkiye'nin müşteri sinyallerine proaktif olarak yanıt veren ilk bankası olun.",
      closingSubtitle: "30,348 yorum. Sıfır kaçırılmış fırsat.",
      viewOnMaps: "Yorumu Gör"
    },
    en: {
      badge: "Customer Signals",
      title: "Every review is a data signal.",
      subtitle: "Every signal is an opportunity.",
      metrics: {
        scanned: "Reviews Scanned",
        unanswered: "Unanswered",
        phoneComplaints: "Phone Complaints"
      },
      caseTitle: "Case Study: Phone Data Inconsistency",
      caseLocation: "Yapı Kredi Bankası Gölcük Şubesi",
      caseCity: "Gölcük, Kocaeli",
      phoneVariantsLabel: "different numbers detected",
      keywordsLabel: "Detected keywords",
      reviewerLabel: "Reviewer",
      whatWeDoTitle: "What Obenan Does",
      actions: [
        { icon: Search, text: "Keyword detection", detail: "phone, unreachable, customer service", keywords: ["phone", "unreachable", "customer"] },
        { icon: UserCheck, text: "Reviewer verification", detail: `Is ${data.featured_case.reviewer_name} real?` },
        { icon: ShieldCheck, text: "Fake review analysis", detail: "Evaluate review patterns" },
        { icon: FileWarning, text: "Data inconsistency detection", detail: "5 different numbers flagged!" },
        { icon: Phone, text: "Correct number suggestion", detail: data.featured_case.correct_phone },
        { icon: Building, text: "Department escalation", detail: "Branch Manager, Customer Service" },
        { icon: MessageCircleReply, text: "Brand-voice response", detail: "Personalized apology + correction" }
      ],
      suggestedResponseTitle: "Suggested Response",
      closingTitle: "Become the first bank in Turkey to proactively respond to every customer signal.",
      closingSubtitle: "30,348 reviews. Zero missed opportunities.",
      viewOnMaps: "View Review"
    }
  };

  const t = content[language];
  const suggestedResponse = language === 'tr' 
    ? data.featured_case.suggested_response_tr 
    : data.featured_case.suggested_response_en;

  const easeOut: Easing = [0.25, 0.46, 0.45, 0.94];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: easeOut }
    }
  };

  return (
    <section className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-keynote pointer-events-none" />
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5 text-primary"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {t.badge}
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            {t.title}
          </h2>
          <p className="text-3xl md:text-4xl font-semibold text-primary">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {/* Reviews Scanned */}
          <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <AnimatedCounter end={data.reviews_scanned_audit} duration={2} suffix="+" />
              </div>
              <p className="text-muted-foreground font-medium">{t.metrics.scanned}</p>
            </CardContent>
          </Card>

          {/* Unanswered */}
          <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-[hsl(var(--status-watch))] mb-2">
                ~<AnimatedCounter end={data.unanswered_percentage} duration={1.5} suffix="%" />
              </div>
              <p className="text-muted-foreground font-medium">{t.metrics.unanswered}</p>
            </CardContent>
          </Card>

          {/* Phone Complaints */}
          <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-4xl font-bold text-[hsl(var(--status-watch))] mb-2">
                <Phone className="w-7 h-7" />
                <AnimatedCounter end={data.phone_complaints_detected} duration={1.8} />
              </div>
              <p className="text-muted-foreground font-medium">{t.metrics.phoneComplaints}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Case Study */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card border-border shadow-keynote max-w-6xl mx-auto overflow-hidden">
            {/* Case Header */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{t.caseTitle}</h3>
                  <p className="text-muted-foreground">
                    {t.caseLocation} • {t.caseCity}
                  </p>
                </div>
                <a 
                  href={data.featured_case.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  {t.viewOnMaps}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Review Screenshot */}
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-border shadow-md">
                    <img 
                      src={language === 'tr' ? golcukScreenshotTr : golcukScreenshotEn} 
                      alt="Gölcük branch review showing customer complaint"
                      className="w-full h-auto"
                    />
                    {/* Star rating overlay */}
                    <div className="absolute top-3 right-3 z-20 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5 whitespace-nowrap">
                      <Star className="w-4 h-4 min-w-4 fill-[hsl(var(--status-watch))] text-[hsl(var(--status-watch))] flex-shrink-0" />
                      <span className="font-semibold text-foreground text-sm">1/5</span>
                    </div>
                    {/* Reviewer name overlay */}
                    <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
                      <span className="text-sm text-muted-foreground">{t.reviewerLabel}:</span>
                      <span className="font-medium text-foreground ml-1">{data.featured_case.reviewer_name}</span>
                    </div>
                  </div>

                  {/* Keywords detected */}
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">{t.keywordsLabel}:</p>
                    <div className="flex flex-wrap gap-2">
                      {data.featured_case.keywords_detected.map((keyword, idx) => (
                        <Badge 
                          key={idx}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Phone Numbers Chaos + Actions */}
                <div className="space-y-6">
                  {/* Phone numbers list */}
                  <div className="bg-[hsl(var(--status-watch))]/5 border border-[hsl(var(--status-watch))]/20 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-[hsl(var(--status-watch))]" />
                      <span className="font-semibold text-foreground">
                        {data.featured_case.phone_variants_found.length} {t.phoneVariantsLabel}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {data.featured_case.phone_variants_found.map((phone, idx) => (
                        <div 
                          key={idx}
                          className={`font-mono text-lg rounded-lg px-4 py-2.5 border ${
                            phone === data.featured_case.correct_phone
                              ? 'bg-primary/10 border-primary/30 text-primary font-bold'
                              : 'bg-card border-border text-foreground'
                          }`}
                        >
                          {phone}
                          {phone === data.featured_case.correct_phone && (
                            <span className="ml-2 text-sm font-normal">✓ {language === 'tr' ? 'Doğru' : 'Correct'}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What Obenan Does - Expanded */}
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      {t.whatWeDoTitle}
                    </h4>
                    
                    <div className="space-y-3">
                      {t.actions.map((action, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <action.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-foreground font-medium">{action.text}</span>
                            <p className="text-sm text-muted-foreground truncate">{action.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggested Response Card - Full Width */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageCircleReply className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{t.suggestedResponseTitle}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'tr' ? 'AI tarafından oluşturulan marka sesinde yanıt' : 'AI-generated brand-voice response'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-5 border border-border shadow-sm">
                    <div className="prose prose-sm max-w-none">
                      {suggestedResponse?.split('\n').map((line, idx) => (
                        <p key={idx} className={`text-foreground ${line.includes(data.featured_case.correct_phone) ? 'font-semibold text-primary' : ''} ${line === '' ? 'h-2' : 'mb-2'}`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Escalation indicator */}
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ArrowRight className="w-4 h-4" />
                      <span>{language === 'tr' ? 'Dahili eskalasyon:' : 'Internal escalation:'}</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                        <Building className="w-3 h-3 mr-1" />
                        {language === 'tr' ? 'Şube Müdürü' : 'Branch Manager'}
                      </Badge>
                      <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                        <Users className="w-3 h-3 mr-1" />
                        {language === 'tr' ? 'Müşteri Hizmetleri' : 'Customer Service'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Closing Statement */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-card border border-primary/20 rounded-2xl p-8 shadow-keynote"
          >
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t.closingTitle}
            </p>
            <p className="text-lg text-primary font-semibold">
              {t.closingSubtitle}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
