import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Building, Clock, Type, MapPin, BookOpen } from "lucide-react";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";

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
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full px-4 py-2 text-[14px] font-light text-[#F5A424] bg-[#F5A424]/10 mb-4">
            Governance Gaps
          </span>
          <h2 className="text-[32px] md:text-[40px] font-light leading-[120%] text-gradient-4 mb-4">
            Five problems every bank has
          </h2>
          <p className="text-[16px] font-light text-description max-w-2xl mx-auto">
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
                  className="w-full text-left bg-[#fbfcff] rounded-2xl p-5 shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F5A424]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#F5A424]" />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-normal text-base-black">{gun.title}</h3>
                        <p className="text-[12px] font-light text-description">{gun.location}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-description transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
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
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-[14px] font-light text-description mb-4">{gun.problem}</p>
                          <div className="bg-[#006EEE]/5 rounded-xl p-3">
                            <p className="text-[14px] font-light text-base-black italic">
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
