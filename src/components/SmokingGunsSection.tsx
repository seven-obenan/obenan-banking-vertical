import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Building, Clock, Type, MapPin, BookOpen } from "lucide-react";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";
import { Badge } from "@/components/ui/badge";

const icons: Record<number, typeof MapPin> = {
  1: MapPin,
  2: Building,
  3: Type,
  4: Clock,
  5: BookOpen,
};

export function SmokingGunsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-status-watch/10 text-status-watch border-status-watch/20">
            Governance Gaps
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Five problems every bank has
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These aren't edge cases. They're systemic patterns we found in every bank we audited.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {bankingVerticalPack.smokingGuns.map((gun, index) => {
            const Icon = icons[gun.id] || MapPin;
            const isExpanded = expandedId === gun.id;

            return (
              <motion.div
                key={gun.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : gun.id)}
                  className="w-full text-left bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-status-watch/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-status-watch" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{gun.title}</h3>
                        <p className="text-xs text-muted-foreground">{gun.location}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-4">{gun.problem}</p>
                          <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                            <p className="text-sm font-medium text-foreground italic">
                              "{gun.talkingPoint}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
