import { motion } from "framer-motion";
import { MapPin, AlertTriangle } from "lucide-react";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";

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
            className="flex items-center gap-2 bg-[#fbfcff] rounded-full px-4 py-2.5 whitespace-nowrap shadow-card"
          >
            <MapPin className="w-3.5 h-3.5 text-[#F5A424] shrink-0" />
            <span className="text-[14px] font-normal text-base-black">{item.type}</span>
            <span className="text-[14px] font-light text-description">— {item.district}, {item.city}</span>
            <span className="rounded-full px-3 py-0.5 text-[12px] font-light text-[#F5A424] bg-[#F5A424]/10">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UnclaimedLocationsMarquee() {
  return (
    <section id="unclaimed-proof" className="py-16 md:py-24 bg-[#F9FAFB] overflow-hidden">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-6xl mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-light text-[#F5A424] bg-[#F5A424]/10 mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            Unclaimed Locations
          </span>
          <h2 className="text-[32px] md:text-[40px] font-light leading-[120%] text-base-black mb-4">
            <span className="text-[#F5A424] tabular-nums">
              {bankingVerticalPack.audit.unclaimed_listings.toLocaleString()}
            </span>{" "}
            bank locations with no owner
          </h2>
          <p className="text-[16px] font-light text-description max-w-2xl mx-auto">
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
