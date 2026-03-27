import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, Zap, Navigation, Car } from "lucide-react";
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
  { key: "CYLEX", name: "Cylex", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/CYLEX.png", currentPercent: 0, tier: 2 },
  { key: "HOTFROG", name: "Hotfrog", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/HOTFROG.png", currentPercent: 0, tier: 2 },
  { key: "INFOBEL", name: "Infobel", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/INFOBEL.png", currentPercent: 0, tier: 2 },
  { key: "TUPALO", name: "Tupalo", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/TUPALO.png", currentPercent: 0, tier: 2 },
  { key: "IGLOBAL", name: "iGlobal", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/I_GLOBAL.png", currentPercent: 0, tier: 2 },
  { key: "INFOISINFO", name: "infoisinfo", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/INFO_IS_INFO.png", currentPercent: 0, tier: 2 },
  { key: "FIND_OPEN", name: "Find Open", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/FIND_OPEN.png", currentPercent: 0, tier: 2 },
  { key: "WHERE_TO", name: "Where To?", logoUrl: "https://preprodapi.obenan.com/api/v1/assets/static/uberall_source/WHERE_TO.png", currentPercent: 0, tier: 2 },
  { key: "BROWNBOOK", name: "Brownbook", logoUrl: "https://www.brownbook.net/favicon.ico", currentPercent: 0, tier: 2 },
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
      className={`bg-[#fbfcff] rounded-2xl p-4 flex items-center gap-3 transition-all duration-500 shadow-card ${isSynced ? "ring-1 ring-[#17C864]/20" : ""}`}
    >
      <div className={`w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-100 flex items-center justify-center transition-all duration-500 ${!isSynced && dir.currentPercent === 0 ? "grayscale opacity-40" : ""}`}>
        <img src={dir.logoUrl} alt={dir.name} className="w-8 h-8 object-contain" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[14px] font-normal text-base-black block truncate">{dir.name}</span>
        <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-colors duration-500 ${isSynced ? "bg-[#17C864]" : "bg-[#F5A424]"}`}
            initial={{ width: 0 }}
            animate={{ width: isSynced ? "100%" : `${dir.currentPercent}%` }}
            transition={{ duration: 1, delay: index * 0.05 }}
          />
        </div>
      </div>
      <span className={`text-[12px] font-light tabular-nums transition-colors duration-500 ${isSynced ? "text-[#17C864]" : "text-description"}`}>
        {isSynced ? "100%" : `${dir.currentPercent}%`}
      </span>
    </motion.div>
  );
}

function LogoGrid({ dirs, isSynced }: { dirs: DirectoryInfo[]; isSynced: boolean }) {
  return (
    <div className="bg-[#fbfcff] rounded-2xl p-4 shadow-card">
      <div className="flex flex-wrap gap-3 justify-center">
        {dirs.map((dir) => (
          <div
            key={dir.key}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ${
              isSynced ? "border-[#17C864]/20 bg-[#17C864]/5" : "border-gray-100 bg-gray-50 grayscale opacity-40"
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

  const { phase, setManualPhase } = useScrollPhase(sectionRef, { threshold: 0.35, transitionDuration: 2500 });
  const isSynced = phase === "transformed";
  const isSuffering = phase === "suffering";

  const featured = directories.filter(d => d.tier === 1 && ["GOOGLE", "APPLE_MAPS", "BING", "YANDEX", "TOMTOM", "FOURSQUARE"].includes(d.key));
  const network = directories.filter(d => d.tier === 1 && !["GOOGLE", "APPLE_MAPS", "BING", "YANDEX", "TOMTOM", "FOURSQUARE"].includes(d.key));
  const tier2 = directories.filter(d => d.tier === 2);
  const tier3 = directories.filter(d => d.tier === 3);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className={`inline-block rounded-full px-4 py-2 text-[14px] font-light mb-4 transition-colors duration-500 ${isSynced ? "text-[#17C864] bg-[#17C864]/10" : "text-[#006EEE] bg-[#006EEE]/10"}`}>
            Directory Sync
          </span>
          <h2 className="text-[32px] md:text-[40px] font-light leading-[120%] mb-4">
            <span className="text-base-black">Banks are on Google. </span>
            <span className={`transition-colors duration-500 ${isSynced ? "text-[#17C864]" : "text-[#F5A424]"}`}>
              But what about the other 70 platforms?
            </span>
          </h2>
          <p className="text-[16px] font-light text-description max-w-2xl mx-auto">
            Apple Maps, Yandex, Bing, and car navigation included — full dominance across the entire digital ecosystem.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 p-1.5 bg-[#F5F5F5] rounded-full">
            <button onClick={() => setManualPhase(false)} className={`px-8 py-3 rounded-full text-[16px] font-light transition-all duration-300 ${isSuffering ? "bg-white text-base-black shadow-sm" : "text-description hover:text-base-black"}`}>
              Today
            </button>
            <button onClick={() => setManualPhase(true)} className={`px-8 py-3 rounded-full text-[16px] font-light transition-all duration-300 flex items-center gap-2 ${isSynced ? "bg-black text-white shadow-sm" : "text-description hover:text-base-black"}`}>
              <Zap className={`w-4 h-4 transition-all duration-300 ${isSynced ? "fill-current" : ""}`} />
              With Obenan
            </button>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {featured.map((dir, i) => <PlatformCard key={dir.key} dir={dir} isSynced={isSynced} index={i} />)}
          </div>
          <div className="mb-6"><LogoGrid dirs={network} isSynced={isSynced} /></div>

          <Collapsible open={showLocal} onOpenChange={setShowLocal}>
            <CollapsibleTrigger className="w-full">
              <div className={`flex items-center justify-between w-full bg-[#fbfcff] px-4 py-3 rounded-2xl text-[14px] font-light mb-4 cursor-pointer shadow-card transition-colors`}>
                <div className="flex items-center gap-2 text-description">
                  <Navigation className={`w-4 h-4 ${isSynced ? "text-[#17C864]" : ""}`} />
                  <span>Local directories</span>
                  <span className={`rounded-full px-2 py-0.5 text-[12px] border ${isSynced ? "border-[#17C864]/30 text-[#17C864]" : "border-gray-200 text-description"}`}>
                    {isSynced ? `✓ ${tier2.length}` : `+${tier2.length}`}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-description transition-transform ${showLocal ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent><div className="mb-4"><LogoGrid dirs={tier2} isSynced={isSynced} /></div></CollapsibleContent>
          </Collapsible>

          <Collapsible open={showOEM} onOpenChange={setShowOEM}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full bg-[#fbfcff] px-4 py-3 rounded-2xl text-[14px] font-light cursor-pointer shadow-card">
                <div className="flex items-center gap-2 text-description">
                  <Car className={`w-4 h-4 ${isSynced ? "text-[#17C864]" : ""}`} />
                  <span>In-car & OEM ecosystems</span>
                  <span className={`rounded-full px-2 py-0.5 text-[12px] border ${isSynced ? "border-[#17C864]/30 text-[#17C864]" : "border-gray-200 text-description"}`}>
                    {isSynced ? `✓ ${tier3.length}` : `+${tier3.length}`}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-description transition-transform ${showOEM ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent><div className="mt-4"><LogoGrid dirs={tier3} isSynced={isSynced} /></div></CollapsibleContent>
          </Collapsible>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-8 bg-[#fbfcff] rounded-3xl p-6 md:p-8 shadow-card max-w-xl mx-auto"
        >
          <div className="text-center">
            <span className={`block text-[36px] font-light transition-colors duration-500 ${isSynced ? "text-[#17C864]" : "text-gradient-4"}`}>70+</span>
            <span className="text-[14px] font-light text-description">Directories</span>
          </div>
          <div className="text-center">
            <span className="block text-[36px] font-light text-base-black">1</span>
            <span className="text-[14px] font-light text-description">Dashboard</span>
          </div>
          <div className="text-center">
            <span className={`block text-[36px] font-light transition-colors duration-500 ${isSynced ? "text-[#17C864]" : "text-[#F5A424]"}`}>∞</span>
            <span className="text-[14px] font-light text-description">Real-time Sync</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
