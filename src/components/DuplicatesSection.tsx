import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, ExternalLink, AlertTriangle, ChevronDown, Building } from "lucide-react";
import { prospectPack } from "@/data/prospectPack";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const DuplicatesSection = () => {
  const { audit, clustersTop10 } = prospectPack;
  const [expandedCluster, setExpandedCluster] = useState<number | null>(null);
  const { language } = useLanguage();

  const content = {
    tr: {
      badge: "Gölge & Mükerrerler",
      title: "Mükerrer kayıtlar trafik bölünmesine neden oluyor",
      subtitle: "Birden fazla pin aynı konumu temsil ettiğinde, müşteri trafiği ve yorumlar bölünür. Bu, görünürlüğü azaltır ve kafa karışıklığı yaratır.",
      duplicateClusters: "Mükerrer Kayıt (Duplicate)",
      duplicatesDesc: "Google Haritalar'da birden fazla rekabet eden pine sahip konumlar",
      trafficSplitting: "Trafik Bölünmesi (Cannibalization)",
      trafficDesc: "Resmi ve gölge listeler arasında aktif olarak trafiği bölen kümeler",
      tableTitle: "En Yüksek 10 Trafik Bölen Küme",
      tableSubtitle: "Etkiye göre sıralandı — listeleri görmek için tıklayın",
      rank: "Sıra",
      city: "Şehir",
      size: "Boyut",
      official: "Resmi",
      shadow: "Gölge",
      hqArea: "GM Bölgesi",
    },
    en: {
      badge: "Shadow & Duplicates",
      title: "Traffic splits when duplicates compete",
      subtitle: "When multiple pins represent the same location, customer traffic and reviews get divided. This dilutes visibility and creates confusion.",
      duplicateClusters: "Duplicate clusters",
      duplicatesDesc: "Locations with multiple competing pins on Google Maps",
      trafficSplitting: "Traffic-splitting clusters",
      trafficDesc: "Official and shadow listings actively competing for traffic",
      tableTitle: "Top 10 Traffic-Splitting Clusters",
      tableSubtitle: "Ranked by impact — click to see listings",
      rank: "Rank",
      city: "City",
      size: "Size",
      official: "Official",
      shadow: "Shadow",
      hqArea: "HQ Area",
    },
  };

  const t = content[language];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
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

        {/* Stats cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-status-focus/30 p-8 shadow-lg hover:shadow-keynote transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-status-focus/10 flex items-center justify-center">
                <Copy className="w-7 h-7 text-status-focus" />
              </div>
              <div>
                <p className="text-4xl font-semibold text-status-focus tabular-nums">{audit.duplicate_clusters}</p>
                <p className="text-muted-foreground">{t.duplicateClusters}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.duplicatesDesc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-status-watch/30 p-8 shadow-lg hover:shadow-keynote transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-status-watch/10 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-status-watch" />
              </div>
              <div>
                <p className="text-4xl font-semibold text-status-watch tabular-nums">{audit.traffic_splitting_clusters}</p>
                <p className="text-muted-foreground">{t.trafficSplitting}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.trafficDesc}
            </p>
          </motion.div>
        </div>

        {/* Cluster table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border overflow-hidden shadow-lg"
        >
          <div className="p-4 border-b border-border bg-secondary/20">
            <h3 className="font-semibold text-foreground">{t.tableTitle}</h3>
            <p className="text-sm text-muted-foreground">{t.tableSubtitle}</p>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent bg-secondary/10">
                <TableHead className="text-muted-foreground font-semibold w-16">{t.rank}</TableHead>
                <TableHead className="text-muted-foreground font-semibold">{t.city}</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">{t.size}</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">{t.official}</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">{t.shadow}</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clustersTop10.map((cluster) => (
                <>
                  <TableRow
                    key={cluster.rank}
                    className={`border-border cursor-pointer transition-colors ${
                      expandedCluster === cluster.rank ? "bg-primary/5" : "hover:bg-secondary/20"
                    }`}
                    onClick={() => setExpandedCluster(expandedCluster === cluster.rank ? null : cluster.rank)}
                  >
                    <TableCell className="font-medium">
                      <span className="flex items-center gap-2 text-foreground">
                        #{cluster.rank}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-foreground">
                        {cluster.city}
                        {cluster.isHQ && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            <Building className="w-3 h-3" />
                            {t.hqArea}
                          </span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-status-focus font-semibold tabular-nums">
                      {cluster.size}
                    </TableCell>
                    <TableCell className="text-center text-status-excellent font-medium tabular-nums">
                      {cluster.officialCount}
                    </TableCell>
                    <TableCell className="text-center text-status-watch font-medium tabular-nums">
                      {cluster.shadowCount}
                    </TableCell>
                    <TableCell className="text-right">
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform ${
                          expandedCluster === cluster.rank ? "rotate-180" : ""
                        }`}
                      />
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded row with listings */}
                  <AnimatePresence>
                    {expandedCluster === cluster.rank && (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <TableCell colSpan={6} className="p-0 border-border">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-secondary/20 space-y-2">
                              {cluster.listings.map((listing, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <span
                                      className={`flex-shrink-0 w-2 h-2 rounded-full ${
                                        listing.segment === "Official"
                                          ? "bg-status-excellent"
                                          : "bg-status-watch"
                                      }`}
                                    />
                                    <div className="min-w-0">
                                      <p className="text-sm font-medium text-foreground truncate">
                                        {listing.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground truncate">
                                        {listing.address}
                                      </p>
                                    </div>
                                  </div>
                                  <a
                                    href={listing.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-shrink-0 ml-3 text-primary hover:text-primary/80 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </TableCell>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
  );
};
