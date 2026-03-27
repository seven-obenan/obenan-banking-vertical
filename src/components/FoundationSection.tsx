import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Zap, Navigation, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useScrollPhase } from "@/hooks/useScrollPhase";

interface DirectoryInfo {
  key: string;
  name: string;
  logoUrl: string;
  currentPercent: number;
  tier: 1 | 2 | 3;
}

const directories: DirectoryInfo[] = [
  { key: "GOOGLE", name: "Google", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/GOOGLE.png", currentPercent: 54, tier: 1 },
  { key: "FACEBOOK", name: "Facebook", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/FACEBOOK.png", currentPercent: 0, tier: 1 },
  { key: "APPLE_MAPS", name: "Apple Maps", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/APPLE_MAPS.png", currentPercent: 22, tier: 1 },
  { key: "BING", name: "Bing", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/BING.png", currentPercent: 12, tier: 1 },
  { key: "YANDEX", name: "Yandex", logoUrl: "/logos/yandex-logo.png", currentPercent: 43, tier: 1 },
  { key: "TOMTOM", name: "TomTom", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/TOMTOM.png", currentPercent: 4, tier: 1 },
  { key: "FOURSQUARE", name: "Foursquare", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/FOURSQUARE.png", currentPercent: 0, tier: 1 },
  { key: "HERE", name: "HERE", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/NOKIA_HERE.png", currentPercent: 0, tier: 1 },
  { key: "SIRI", name: "Siri", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/SIRI.png", currentPercent: 0, tier: 1 },
  { key: "ALEXA", name: "Alexa", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/ALEXA.png", currentPercent: 0, tier: 1 },
  { key: "UBER", name: "Uber", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/UBER.png", currentPercent: 0, tier: 1 },
  { key: "NAVMII", name: "Navmii", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/NAVMII.png", currentPercent: 0, tier: 1 },
  { key: "BAIDU", name: "Baidu", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/BAIDU.png", currentPercent: 0, tier: 1 },
  { key: "PETAL", name: "Petal Search", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/HUAWEI.png", currentPercent: 0, tier: 1 },
  { key: "NEXTDOOR", name: "Nextdoor", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/NEXT_DOOR.png", currentPercent: 0, tier: 1 },
  { key: "CORTANA", name: "Cortana", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/MICROSOFT_CORTANA.png", currentPercent: 0, tier: 1 },
  // Tier 2
  { key: "CYLEX", name: "Cylex", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/CYLEX.png", currentPercent: 0, tier: 2 },
  { key: "HOTFROG", name: "Hotfrog", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/HOTFROG.png", currentPercent: 0, tier: 2 },
  { key: "INFOBEL", name: "Infobel", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/INFOBEL.png", currentPercent: 0, tier: 2 },
  { key: "TUPALO", name: "Tupalo", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/TUPALO.png", currentPercent: 0, tier: 2 },
  { key: "IGLOBAL", name: "iGlobal", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/I_GLOBAL.png", currentPercent: 0, tier: 2 },
  { key: "INFOISINFO", name: "infoisinfo", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/INFO_IS_INFO.png", currentPercent: 0, tier: 2 },
  { key: "FIND_OPEN", name: "Find Open", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/FIND_OPEN.png", currentPercent: 0, tier: 2 },
  { key: "WHERE_TO", name: "Where To?", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/WHERE_TO.png", currentPercent: 0, tier: 2 },
  { key: "BROWNBOOK", name: "Brownbook", logoUrl: "https://www.brownbook.net/favicon.ico", currentPercent: 0, tier: 2 },
  // Tier 3 - OEM
  { key: "AUDI", name: "Audi", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/AUDI.png", currentPercent: 0, tier: 3 },
  { key: "BMW", name: "BMW", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/BMW.png", currentPercent: 0, tier: 3 },
  { key: "MERCEDES", name: "Mercedes-Benz", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/MERCEDES.png", currentPercent: 0, tier: 3 },
  { key: "VW", name: "Volkswagen", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/VW.png", currentPercent: 0, tier: 3 },
  { key: "TOYOTA", name: "Toyota", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/TOYOTA.png", currentPercent: 0, tier: 3 },
  { key: "FORD", name: "Ford", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/FORD.png", currentPercent: 0, tier: 3 },
  { key: "GM", name: "General Motors", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/GM.png", currentPercent: 0, tier: 3 },
  { key: "FIAT", name: "Fiat", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/FIAT.png", currentPercent: 0, tier: 3 },
];

function PlatformCard({ dir, isSynced, index }: { dir: DirectoryInfo; isSynced: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`bg-card border rounded-xl p-4 flex items-center gap-3 transition-all duration-500 ${
        isSynced ? "border-status-excellent/30 shadow-sm" : "border-border"
      }`}
    >
      <div className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-background border flex items-center justify-center transition-all duration-500 ${
        isSynced ? "border-status-excellent/30" : "border-border"
      } ${!isSynced && dir.currentPercent === 0 ? "grayscale opacity-40" : ""}`}>
        <img src={dir.logoUrl} alt={dir.name} className="w-8 h-8 object-contain" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-foreground block truncate">{dir.name}</span>
        <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-colors duration-500 ${isSynced ? "bg-status-excellent" : "bg-status-watch"}`}
            initial={{ width: 0 }}
            animate={{ width: isSynced ? "100%" : `${dir.currentPercent}%` }}
            transition={{ duration: 1, delay: index * 0.05 }}
          />
        </div>
      </div>
      <span className={`text-xs font-medium tabular-nums transition-colors duration-500 ${isSynced ? "text-status-excellent" : "text-muted-foreground"}`}>
        {isSynced ? "100%" : `${dir.currentPercent}%`}
      </span>
    </motion.div>
  );
}

function LogoGrid({ dirs, isSynced }: { dirs: DirectoryInfo[]; isSynced: boolean }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {dirs.map((dir) => (
          <div
            key={dir.key}
            className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all duration-500 ${
              isSynced ? "border-status-excellent/30 bg-status-excellent/5" : "border-border bg-muted/30 grayscale opacity-40"
            }`}
          >
            <img src={dir.logoUrl} alt={dir.name} className="w-8 h-8 object-contain" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export const FoundationSection = () => {
  const [showLocal, setShowLocal] = useState(false);
  const [showOEM, setShowOEM] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { phase, setManualPhase } = useScrollPhase(sectionRef, {
    threshold: 0.35,
    transitionDuration: 2500,
  });

  const isSynced = phase === "transformed";
  const isSuffering = phase === "suffering";

  const featured = directories.filter(d => d.tier === 1 && ["GOOGLE", "APPLE_MAPS", "BING", "YANDEX", "TOMTOM", "FOURSQUARE"].includes(d.key));
  const network = directories.filter(d => d.tier === 1 && !["GOOGLE", "APPLE_MAPS", "BING", "YANDEX", "TOMTOM", "FOURSQUARE"].includes(d.key));
  const tier2 = directories.filter(d => d.tier === 2);
  const tier3 = directories.filter(d => d.tier === 3);

  return (
    <section ref={sectionRef} className={`py-16 md:py-24 relative transition-all duration-700 ${isSuffering ? "bg-gradient-to-b from-background via-background to-status-watch/5" : "bg-background"}`}>
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge className={`mb-4 transition-colors duration-500 ${isSynced ? "bg-status-excellent/10 text-status-excellent border-status-excellent/20" : "bg-primary/10 text-primary border-primary/20"}`}>
            Directory Sync
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Banks are on Google.{" "}
            <span className={`transition-colors duration-500 ${isSynced ? "text-status-excellent" : "text-status-watch"}`}>
              But what about the other 70 platforms?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Apple Maps, Yandex, Bing, and car navigation included — full dominance across the entire digital ecosystem.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 p-1.5 bg-muted rounded-full">
            <button
              onClick={() => setManualPhase(false)}
              className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${isSuffering ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Today
            </button>
            <button
              onClick={() => setManualPhase(true)}
              className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 flex items-center gap-2 ${isSynced ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Zap className={`w-4 h-4 transition-all duration-300 ${isSynced ? "fill-current" : ""}`} />
              With Obenan
            </button>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Featured platforms */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {featured.map((dir, i) => (
              <PlatformCard key={dir.key} dir={dir} isSynced={isSynced} index={i} />
            ))}
          </div>

          {/* Network logos */}
          <div className="mb-6">
            <LogoGrid dirs={network} isSynced={isSynced} />
          </div>

          {/* Tier 2 - Local */}
          <Collapsible open={showLocal} onOpenChange={setShowLocal}>
            <CollapsibleTrigger className="w-full">
              <div className={`flex items-center justify-between w-full bg-card border px-4 py-3 rounded-xl text-sm mb-4 cursor-pointer transition-colors ${isSynced ? "border-status-excellent/30" : "border-border hover:border-primary/30"}`}>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Navigation className={`w-4 h-4 ${isSynced ? "text-status-excellent" : ""}`} />
                  <span>Local directories</span>
                  <Badge variant="outline" className={`text-xs ${isSynced ? "border-status-excellent/50 text-status-excellent" : ""}`}>
                    {isSynced ? `✓ ${tier2.length}` : `+${tier2.length}`}
                  </Badge>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showLocal ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mb-4"><LogoGrid dirs={tier2} isSynced={isSynced} /></div>
            </CollapsibleContent>
          </Collapsible>

          {/* Tier 3 - OEM */}
          <Collapsible open={showOEM} onOpenChange={setShowOEM}>
            <CollapsibleTrigger className="w-full">
              <div className={`flex items-center justify-between w-full bg-card border px-4 py-3 rounded-xl text-sm cursor-pointer transition-colors ${isSynced ? "border-status-excellent/30" : "border-border hover:border-primary/30"}`}>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Car className={`w-4 h-4 ${isSynced ? "text-status-excellent" : ""}`} />
                  <span>In-car & OEM ecosystems</span>
                  <Badge variant="outline" className={`text-xs ${isSynced ? "border-status-excellent/50 text-status-excellent" : ""}`}>
                    {isSynced ? `✓ ${tier3.length}` : `+${tier3.length}`}
                  </Badge>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showOEM ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-4"><LogoGrid dirs={tier3} isSynced={isSynced} /></div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className={`mt-12 flex flex-wrap justify-center gap-8 bg-card rounded-2xl p-6 md:p-8 border shadow-lg max-w-xl mx-auto transition-all duration-500 ${isSynced ? "border-status-excellent/30" : "border-border"}`}
        >
          <div className="text-center">
            <span className={`block text-4xl font-bold transition-colors duration-500 ${isSynced ? "text-status-excellent" : "text-primary"}`}>70+</span>
            <span className="text-sm text-muted-foreground">Directories</span>
          </div>
          <div className="text-center">
            <span className="block text-4xl font-bold text-foreground">1</span>
            <span className="text-sm text-muted-foreground">Dashboard</span>
          </div>
          <div className="text-center">
            <span className={`block text-4xl font-bold transition-colors duration-500 ${isSynced ? "text-status-excellent" : "text-status-watch"}`}>∞</span>
            <span className="text-sm text-muted-foreground">Real-time Sync</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
