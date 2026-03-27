import { motion } from "framer-motion";
import { MapPin, AlertTriangle } from "lucide-react";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";
import { Badge } from "@/components/ui/badge";

const examples = bankingVerticalPack.unclaimedExamples;
const row1 = examples.slice(0, 8);
const row2 = examples.slice(8, 16);
const row3 = examples.slice(16, 24);

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: typeof examples;
  duration: number;
  reverse?: boolean;
}) {
  const duplicated = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex gap-3 ${reverse ? "animate-scroll-right" : "animate-scroll-left"}`}
        style={{ "--duration": `${duration}s` } as React.CSSProperties}
      >
        {duplicated.map((item, index) => (
          <div
            key={`${item.district}-${index}`}
            className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5 whitespace-nowrap shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-status-watch shrink-0" />
            <span className="text-sm font-medium text-foreground">{item.type}</span>
            <span className="text-sm text-muted-foreground">— {item.district}, {item.city}</span>
            <Badge
              variant="outline"
              className="text-xs text-status-watch border-status-watch/30 bg-status-watch/5"
            >
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UnclaimedLocationsMarquee() {
  return (
    <section id="unclaimed-proof" className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge className="mb-4 bg-status-watch/10 text-status-watch border-status-watch/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Unclaimed Locations
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-status-watch tabular-nums">
              {bankingVerticalPack.audit.unclaimed_listings.toLocaleString()}
            </span>{" "}
            bank locations with no owner
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Anyone can suggest edits to unclaimed listings. Wrong hours, wrong phone numbers, wrong categories — all unprotected.
          </p>
        </motion.div>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={row1} duration={40} />
        <MarqueeRow items={row2} duration={45} reverse />
        <MarqueeRow items={row3} duration={35} />
      </div>
    </section>
  );
}
