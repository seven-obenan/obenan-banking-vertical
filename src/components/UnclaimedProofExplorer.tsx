import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  Building2, 
  Banknote,
  AlertTriangle,
  Info,
  ChevronDown,
  Filter,
  Shield,
  Users,
  Star,
  Phone,
  TrendingDown,
  Play,
  FileText,
  Database,
  Link2,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface UnclaimedLocation {
  inferred_type: string;
  title: string;
  address: string;
  placeId: string;
  maps_url: string;
}

type FilterType = "ALL" | "ATM" | "BRANCH";

// Summary data from the JSON file - loaded dynamically
interface SummaryData {
  run_date: string;
  unclaimed_total: number;
  unclaimed_bank_or_atm: number;
  unclaimed_other_categories: number;
  unclaimed_type_breakdown: {
    ATM: number;
    BRANCH: number;
  };
  missing_placeId_in_unclaimed_bank_atm: number;
  missing_maps_url_in_unclaimed_bank_atm: number;
}

const DEFAULT_SUMMARY: SummaryData = {
  run_date: "2026-02-05",
  unclaimed_total: 1015,
  unclaimed_bank_or_atm: 976,
  unclaimed_other_categories: 39,
  unclaimed_type_breakdown: {
    ATM: 856,
    BRANCH: 120
  },
  missing_placeId_in_unclaimed_bank_atm: 0,
  missing_maps_url_in_unclaimed_bank_atm: 0
};

/**
 * CRITICAL: URL builder with strict safety rules
 * 
 * Priority 1: Use maps_url EXACTLY as-is from CSV (contains both query= and query_place_id=)
 * Priority 2: Rebuild with BOTH query= AND query_place_id= if maps_url is missing/invalid
 * Priority 3: Last resort - use title only
 * 
 * NEVER use query_place_id alone - it redirects to generic map view, not the listing profile!
 */
/**
 * URL validation result for debugging
 */
interface UrlValidationResult {
  url: string;
  isValid: boolean;
  wasRebuilt: boolean;
  hasMissingPlaceId: boolean;
}

const validateAndBuildMapsUrl = (location: UnclaimedLocation): UrlValidationResult => {
  // Priority 1: Use the exact maps_url from CSV if it exists and looks valid
  // Valid = contains both 'query=' (not just query_place_id) and the placeId
  if (location.maps_url && 
      location.maps_url.includes('query=') && 
      location.placeId && 
      location.maps_url.includes(location.placeId)) {
    return {
      url: location.maps_url,
      isValid: true,
      wasRebuilt: false,
      hasMissingPlaceId: false
    };
  }
  
  // Priority 2: Rebuild with BOTH query (title/address) AND query_place_id
  if (location.placeId) {
    const queryText = location.title || location.address || 'Yapı Kredi';
    return {
      url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}&query_place_id=${location.placeId}`,
      isValid: false,
      wasRebuilt: true,
      hasMissingPlaceId: false
    };
  }
  
  // Priority 3: Last resort - search by title only (missing placeId)
  return {
    url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.title)}`,
    isValid: false,
    wasRebuilt: false,
    hasMissingPlaceId: true
  };
};

const buildMapsUrl = (location: UnclaimedLocation): string => {
  return validateAndBuildMapsUrl(location).url;
};

// Parse CSV data
const parseCSV = (csvText: string): UnclaimedLocation[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  // Parse headers - also handle potential quotes and trim whitespace
  const headerLine = lines[0];
  const headers = headerLine.split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const typeIdx = headers.indexOf('inferred_type');
  const titleIdx = headers.indexOf('title');
  const addressIdx = headers.indexOf('address');
  const placeIdIdx = headers.indexOf('placeId');
  const mapsUrlIdx = headers.indexOf('maps_url');
  
  return lines.slice(1).map(line => {
    // Handle CSV with quoted fields containing commas
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    return {
      inferred_type: values[typeIdx] || 'ATM',
      title: values[titleIdx] || '',
      address: values[addressIdx] || '',
      placeId: values[placeIdIdx] || '',
      maps_url: values[mapsUrlIdx] || ''
    };
  }).filter(loc => loc.title && loc.placeId);
};

export const UnclaimedProofExplorer = () => {
  const { language } = useLanguage();
  const [bankAtmData, setBankAtmData] = useState<UnclaimedLocation[]>([]);
  const [allCategoriesData, setAllCategoriesData] = useState<UnclaimedLocation[]>([]);
  const [summaryData, setSummaryData] = useState<SummaryData>(DEFAULT_SUMMARY);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [linkValidationStats, setLinkValidationStats] = useState({
    totalRows: 0,
    validMapsUrls: 0,
    rebuiltUrls: 0,
    missingPlaceIds: 0
  });

  const content = {
    tr: {
      badge: "Doğrulanmış Kanıt Veritabanı",
      headline: "Kendiniz Doğrulayın (Güven Gerektirmez)",
      subheadline: "Aşağıdaki her konum Google Maps'e bağlıdır. Tıklayın, \"İşletmeyi sahiplenin\" yazısını arayın — bu, yönetişim dışında olduğunu kanıtlar.",
      verifyTitle: "5 Saniyede Nasıl Doğrulanır",
      step1: "\"Google Maps'te Aç\" butonuna tıklayın",
      step2: "Google panelinde \"İşletmeyi sahiplenin\" yazısını arayın",
      step3: "Bu CTA mevcutsa, liste sahipsizdir (üçüncü taraf süreci başlatabilir)",
      snapshotNote: "Veri anlık görüntüsü: 15 Ocak 2026 — durum zamanla değişebilir. Asıl mesele yönetişimdir: bu varlıklar sürekli kontrol altında olmalıdır.",
      toggleAll: "Tüm kategorileri göster (1.015)",
      toggleBankAtm: "Sadece ATM & Şubeler (976)",
      filterAll: "Tümü",
      filterAtm: "ATM'ler",
      filterBranch: "Şubeler",
      searchPlaceholder: "Konum veya adres ara...",
      openMaps: "Google Maps'te Aç",
      copyLink: "Link Kopyala",
      copyPlaceId: "Place ID Kopyala",
      copied: "Kopyalandı!",
      loadMore: "Daha Fazla Yükle",
      showing: "Gösterilen",
      of: "/",
      locations: "konum",
      atmLabel: "ATM",
      branchLabel: "Şube",
      riskWarning: "Yönetim Riski",
      riskDescription: "Her liste bir fırsat bölgesidir — sahiplik talep edilebilir",
      whyMattersTitle: "Bu Neden Önemli",
      whyMatters: [
        { title: "Marka/Kimlik Kontrolü", desc: "Üçüncü şahıslar isim, kategori veya fotoğrafları değiştirebilir" },
        { title: "Müşteri Yanlış Yönlendirmesi", desc: "Yanlış konum beklentileri hayal kırıklığına yol açar" },
        { title: "İtibar Riski", desc: "Yorumlar yanlış varlıklara düşebilir" },
        { title: "Operasyonel Yük", desc: "Çağrılar, şikayetler ve destek talepleri artar" },
        { title: "SEO/Görünürlük Bölünmesi", desc: "Birden fazla varlık arama sonuçlarında rekabet eder" },
      ],
      demoScriptTitle: "Canlı Demo Senaryosu (30 Saniye)",
      demoScriptSteps: [
        "Herhangi bir konum seçin → tıklayın → 'İşletmeyi sahiplenin' yazısını arayın → bu yönetişim dışında.",
        "Farklı şehirlerde 3 kez tekrarlayın — bunun tek seferlik değil, sistemik olduğunu göstermek için.",
        "Sonuç: Bu eski veri artefaktları sürekli yönetişim gerektiriyor.",
      ],
      evidenceReportTitle: "Kanıt Bütünlüğü Raporu",
      evidenceReportDesc: "Bu bölüm, doğrulama ve denetim amaçlı dahili kullanım içindir.",
      dataSources: "Veri Kaynakları",
      computedCounts: "Hesaplanan Sayılar",
      linkValidation: "Link Doğrulama Mantığı",
      validUrls: "Geçerli URL'ler",
      rebuiltUrls: "Yeniden Oluşturulan",
      missingIds: "Eksik Place ID",
      auditSnapshot: "Denetim Anlık Görüntüsü",
    },
    en: {
      badge: "Verified Evidence Database",
      headline: "Verify It Yourself (No Trust Required)",
      subheadline: "Every location below links to Google Maps. Click, look for 'Claim this business' — that proves it's outside governance.",
      verifyTitle: "How to Verify in 5 Seconds",
      step1: "Click \"Open in Google Maps\"",
      step2: "Look for \"Claim this business\" in the Google panel",
      step3: "If that CTA exists, the listing is unclaimed (a third party can initiate a claim)",
      snapshotNote: "Data snapshot: January 15, 2026 — status may change over time. The point is governance: these assets must be continuously controlled.",
      toggleAll: "Show all categories (1,015)",
      toggleBankAtm: "ATMs & Branches only (976)",
      filterAll: "All",
      filterAtm: "ATMs",
      filterBranch: "Branches",
      searchPlaceholder: "Search location or address...",
      openMaps: "Open in Google Maps",
      copyLink: "Copy Link",
      copyPlaceId: "Copy Place ID",
      copied: "Copied!",
      loadMore: "Load More",
      showing: "Showing",
      of: "of",
      locations: "locations",
      atmLabel: "ATM",
      branchLabel: "Branch",
      riskWarning: "Governance Risk",
      riskDescription: "Each listing is an opportunity zone — ownership can be claimed",
      whyMattersTitle: "Why This Matters",
      whyMatters: [
        { title: "Brand/Identity Control", desc: "Third parties can edit name, category, or photos" },
        { title: "Customer Misdirection", desc: "Wrong location expectations cause frustration" },
        { title: "Reputation Risk", desc: "Reviews may land on the wrong entity" },
        { title: "Operational Load", desc: "Calls, complaints, and support requests increase" },
        { title: "SEO/Visibility Dilution", desc: "Multiple entities compete in search results" },
      ],
      demoScriptTitle: "Live Demo Script (30 Seconds)",
      demoScriptSteps: [
        "Pick any location → click → look for 'Claim this business' → this is outside governance.",
        "Repeat 3 times in different cities to show it's systemic, not a one-off.",
        "Conclusion: These legacy data artefacts require continuous governance.",
      ],
      evidenceReportTitle: "Evidence Integrity Report",
      evidenceReportDesc: "This section is for internal use, for verification and audit purposes.",
      dataSources: "Data Sources",
      computedCounts: "Computed Counts",
      linkValidation: "Link Validation Logic",
      validUrls: "Valid URLs",
      rebuiltUrls: "Rebuilt URLs",
      missingIds: "Missing Place IDs",
      auditSnapshot: "Audit Snapshot",
    }
  };

  const t = content[language];

  // Load CSV and summary data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [bankAtmRes, allCatRes, summaryRes] = await Promise.all([
          fetch('/data/unclaimed-bank-atm.csv'),
          fetch('/data/unclaimed-all-categories.csv'),
          fetch('/data/unclaimed-summary.json')
        ]);
        
        const bankAtmText = await bankAtmRes.text();
        const allCatText = await allCatRes.text();
        const summaryJson = await summaryRes.json();
        
        const parsedBankAtm = parseCSV(bankAtmText);
        const parsedAllCat = parseCSV(allCatText);
        
        setBankAtmData(parsedBankAtm);
        setAllCategoriesData(parsedAllCat);
        setSummaryData(summaryJson);
        
        // Calculate link validation stats using the same validation function
        let validUrls = 0;
        let rebuiltUrls = 0;
        let missingIds = 0;
        
        parsedBankAtm.forEach(loc => {
          const result = validateAndBuildMapsUrl(loc);
          if (result.isValid) {
            validUrls++;
          } else if (result.wasRebuilt) {
            rebuiltUrls++;
          } else if (result.hasMissingPlaceId) {
            missingIds++;
          }
        });
        
        setLinkValidationStats({
          totalRows: parsedBankAtm.length,
          validMapsUrls: validUrls,
          rebuiltUrls: rebuiltUrls,
          missingPlaceIds: missingIds
        });
        
      } catch (error) {
        console.error('Failed to load unclaimed data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Get current dataset based on toggle
  const currentData = showAllCategories ? allCategoriesData : bankAtmData;

  // Filter and search logic
  const filteredData = useMemo(() => {
    let result = currentData;
    
    // Apply type filter
    if (filter === "ATM") {
      result = result.filter(loc => loc.inferred_type === "ATM");
    } else if (filter === "BRANCH") {
      result = result.filter(loc => loc.inferred_type === "BRANCH");
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(loc => 
        loc.title.toLowerCase().includes(query) || 
        loc.address.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [currentData, filter, searchQuery]);

  const visibleData = filteredData.slice(0, visibleCount);

  // Copy handlers
  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(20);
  }, [filter, searchQuery, showAllCategories]);

  const getFilterCount = (type: FilterType): number => {
    if (showAllCategories) {
      if (type === "ALL") return summaryData.unclaimed_total;
      // For all categories, we need to count from data
      return allCategoriesData.filter(loc => 
        type === "ATM" ? loc.inferred_type === "ATM" : loc.inferred_type === "BRANCH"
      ).length;
    }
    
    if (type === "ALL") return summaryData.unclaimed_bank_or_atm;
    if (type === "ATM") return summaryData.unclaimed_type_breakdown.ATM;
    if (type === "BRANCH") return summaryData.unclaimed_type_breakdown.BRANCH;
    return 0;
  };

  return (
    <section id="unclaimed-proof-explorer" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t.headline}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {t.subheadline}
          </p>
          
          {/* Risk Warning Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-status-watch/10 border border-status-watch/30">
            <AlertTriangle className="w-4 h-4 text-status-watch" />
            <span className="text-sm font-medium text-status-watch">{t.riskWarning}:</span>
            <span className="text-sm text-muted-foreground">{t.riskDescription}</span>
          </div>
        </motion.div>

        {/* How to Verify Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-primary/5 border-primary/20 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-3">{t.verifyTitle}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                    <p className="text-sm text-muted-foreground">{t.step1}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
                    <p className="text-sm text-muted-foreground">{t.step2}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
                    <p className="text-sm text-muted-foreground">{t.step3}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  {t.snapshotNote}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* KPI Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <button
            onClick={() => { setFilter("ALL"); setShowAllCategories(false); }}
            className={cn(
              "p-4 rounded-xl border text-center transition-all",
              filter === "ALL" && !showAllCategories
                ? "bg-primary/10 border-primary shadow-lg"
                : "bg-card border-border hover:border-primary/50"
            )}
          >
            <p className="text-3xl font-bold text-foreground">{summaryData.unclaimed_bank_or_atm}</p>
            <p className="text-sm text-muted-foreground">{t.filterAll}</p>
          </button>
          <button
            onClick={() => setFilter("ATM")}
            className={cn(
              "p-4 rounded-xl border text-center transition-all",
              filter === "ATM"
                ? "bg-primary/10 border-primary shadow-lg"
                : "bg-card border-border hover:border-primary/50"
            )}
          >
            <p className="text-3xl font-bold text-status-watch">{summaryData.unclaimed_type_breakdown.ATM}</p>
            <p className="text-sm text-muted-foreground">{t.filterAtm}</p>
          </button>
          <button
            onClick={() => setFilter("BRANCH")}
            className={cn(
              "p-4 rounded-xl border text-center transition-all",
              filter === "BRANCH"
                ? "bg-primary/10 border-primary shadow-lg"
                : "bg-card border-border hover:border-primary/50"
            )}
          >
            <p className="text-3xl font-bold text-status-focus">{summaryData.unclaimed_type_breakdown.BRANCH}</p>
            <p className="text-sm text-muted-foreground">{t.filterBranch}</p>
          </button>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          {/* Dataset Toggle */}
          <div className="flex gap-2">
            <Button
              variant={showAllCategories ? "outline" : "default"}
              size="sm"
              onClick={() => setShowAllCategories(false)}
              className="text-xs"
            >
              <Building2 className="w-4 h-4 mr-1" />
              {t.toggleBankAtm}
            </Button>
            <Button
              variant={showAllCategories ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAllCategories(true)}
              className="text-xs"
            >
              <Filter className="w-4 h-4 mr-1" />
              {t.toggleAll}
            </Button>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-4">
          {t.showing} <span className="font-medium text-foreground">{Math.min(visibleCount, filteredData.length)}</span> {t.of} <span className="font-medium text-foreground">{filteredData.length}</span> {t.locations}
        </div>

        {/* Location Cards */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="space-y-3">
            {visibleData.map((location, index) => {
              const mapsUrl = buildMapsUrl(location);
              const isAtm = location.inferred_type === "ATM";
              
              return (
                <motion.div
                  key={location.placeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Icon & Type */}
                      <div className="flex items-center gap-3 md:w-48">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          isAtm ? "bg-status-watch/10" : "bg-status-focus/10"
                        )}>
                          {isAtm ? (
                            <Banknote className="w-5 h-5 text-status-watch" />
                          ) : (
                            <Building2 className="w-5 h-5 text-status-focus" />
                          )}
                        </div>
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          isAtm ? "border-status-watch/50 text-status-watch" : "border-status-focus/50 text-status-focus"
                        )}>
                          {isAtm ? t.atmLabel : t.branchLabel}
                        </Badge>
                      </div>
                      
                      {/* Title & Address */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{location.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">{location.address}</p>
                        <p className="text-xs text-muted-foreground/70 font-mono mt-1" title={location.placeId}>
                          {location.placeId}
                        </p>
                        {/* Debug: Show actual maps_url on hover */}
                        <p className="text-[9px] text-muted-foreground/50 font-mono mt-0.5 truncate max-w-xs" title={mapsUrl}>
                          {mapsUrl.length > 70 ? mapsUrl.substring(0, 70) + '...' : mapsUrl}
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(mapsUrl, `link-${location.placeId}`)}
                          className="text-xs"
                        >
                          {copiedId === `link-${location.placeId}` ? (
                            <Check className="w-3 h-3 mr-1 text-status-excellent" />
                          ) : (
                            <Copy className="w-3 h-3 mr-1" />
                          )}
                          {copiedId === `link-${location.placeId}` ? t.copied : t.copyLink}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(location.placeId, `id-${location.placeId}`)}
                          className="text-xs"
                        >
                          {copiedId === `id-${location.placeId}` ? (
                            <Check className="w-3 h-3 mr-1 text-status-excellent" />
                          ) : (
                            <Copy className="w-3 h-3 mr-1" />
                          )}
                          {copiedId === `id-${location.placeId}` ? t.copied : t.copyPlaceId}
                        </Button>
                        <Button
                          size="sm"
                          className="bg-cta hover:bg-cta/90"
                          asChild
                        >
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MapPin className="w-3 h-3 mr-1" />
                            {t.openMaps}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {visibleCount < filteredData.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount(prev => prev + 50)}
              className="gap-2"
            >
              <ChevronDown className="w-4 h-4" />
              {t.loadMore} ({filteredData.length - visibleCount} {language === 'tr' ? 'kaldı' : 'remaining'})
            </Button>
          </motion.div>
        )}

        {/* Why This Matters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-secondary/30 border-border p-8">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">
              {t.whyMattersTitle}
            </h3>
            <div className="grid md:grid-cols-5 gap-4">
              {t.whyMatters.map((item, index) => {
                const icons = [Shield, Users, Star, Phone, TrendingDown];
                const IconComponent = icons[index];
                return (
                  <div key={index} className="text-center p-4 rounded-lg bg-background/50">
                    <div className="w-10 h-10 rounded-full bg-status-watch/10 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-5 h-5 text-status-watch" />
                    </div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Demo Script Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="bg-foreground/5 border-primary/20 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center flex-shrink-0">
                <Play className="w-5 h-5 text-cta" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-3">{t.demoScriptTitle}</h3>
                <div className="space-y-2">
                  {t.demoScriptSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-cta/20 text-cta text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Evidence Integrity Report - Internal Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-secondary/20 border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t.evidenceReportTitle}</h3>
                <p className="text-xs text-muted-foreground">{t.evidenceReportDesc}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Data Sources */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Database className="w-4 h-4" />
                  {t.dataSources}
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• unclaimed-bank-atm.csv</li>
                  <li>• unclaimed-all-categories.csv</li>
                  <li>• unclaimed-summary.json</li>
                </ul>
              </div>

              {/* Computed Counts */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Calendar className="w-4 h-4" />
                  {t.computedCounts}
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank/ATM:</span>
                    <span className="font-mono text-foreground">{summaryData.unclaimed_bank_or_atm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">All Categories:</span>
                    <span className="font-mono text-foreground">{summaryData.unclaimed_total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ATMs:</span>
                    <span className="font-mono text-foreground">{summaryData.unclaimed_type_breakdown.ATM}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Branches:</span>
                    <span className="font-mono text-foreground">{summaryData.unclaimed_type_breakdown.BRANCH}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-muted-foreground">{t.auditSnapshot}:</span>
                    <span className="font-mono text-foreground">{summaryData.run_date}</span>
                  </div>
                </div>
              </div>

              {/* Link Validation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Link2 className="w-4 h-4" />
                  {t.linkValidation}
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.validUrls}:</span>
                    <span className="font-mono text-status-excellent">{linkValidationStats.validMapsUrls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.rebuiltUrls}:</span>
                    <span className="font-mono text-status-watch">{linkValidationStats.rebuiltUrls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.missingIds}:</span>
                    <span className="font-mono text-status-focus">{linkValidationStats.missingPlaceIds}</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-background/50 rounded text-[10px] font-mono text-muted-foreground">
                  Priority 1: Use exact maps_url from CSV<br/>
                  Priority 2: Rebuild with query + query_place_id<br/>
                  Priority 3: Fallback to title search
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
