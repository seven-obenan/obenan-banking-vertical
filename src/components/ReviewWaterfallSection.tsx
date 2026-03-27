import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Plus, Brain, Search, Database, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StreamingReview {
  id: number;
  stars: number;
  text: string;
  category: "location" | "service" | "atm";
  city: string;
}

// Anonymized reviews from real audit data across both banks
const reviewPool: StreamingReview[] = [
  { id: 1, stars: 1, text: "No ATM. Don't believe it. This is inside a residential complex.", category: "location", city: "Istanbul" },
  { id: 2, stars: 1, text: "There's no ATM here at all", category: "location", city: "Ankara" },
  { id: 3, stars: 1, text: "Location is marked incorrectly", category: "location", city: "Izmir" },
  { id: 4, stars: 1, text: "There's no such place here", category: "location", city: "Bursa" },
  { id: 5, stars: 1, text: "ATM removed but still shows on map", category: "location", city: "Antalya" },
  { id: 6, stars: 1, text: "Wrong address, another bank is here", category: "location", city: "Adana" },
  { id: 7, stars: 1, text: "Google Maps shows wrong location", category: "location", city: "Konya" },
  { id: 8, stars: 1, text: "Branch is closed but shows open on map", category: "location", city: "Gaziantep" },
  { id: 9, stars: 1, text: "Cash deposit machine broken for 2 years", category: "atm", city: "Istanbul" },
  { id: 10, stars: 2, text: "Constantly out of order is the problem", category: "atm", city: "Ankara" },
  { id: 11, stars: 1, text: "Queue is chaotic. Last to arrive gets served first", category: "service", city: "Izmir" },
  { id: 12, stars: 1, text: "ATM is very old. Tears bills and returns them", category: "atm", city: "Bursa" },
  { id: 13, stars: 1, text: "They moved but address wasn't updated", category: "location", city: "Antalya" },
  { id: 14, stars: 1, text: "Walked 30 minutes, place is empty", category: "location", city: "Kayseri" },
  { id: 15, stars: 1, text: "No bank at this address anymore", category: "location", city: "Samsun" },
  { id: 16, stars: 1, text: "ATM doesn't dispense but deducts from balance", category: "atm", city: "Istanbul" },
  { id: 17, stars: 2, text: "Swallowed my card, no one helped", category: "atm", city: "Ankara" },
  { id: 18, stars: 1, text: "Screen broken, buttons don't work", category: "atm", city: "Izmir" },
  { id: 19, stars: 1, text: "ATM hasn't worked for 3 months, why still on map?", category: "atm", city: "Bursa" },
  { id: 20, stars: 1, text: "World's slowest bank. They make you wait for hours", category: "service", city: "Antalya" },
  { id: 21, stars: 1, text: "Terrible branch, enter in morning, leave at noon", category: "service", city: "Konya" },
  { id: 22, stars: 1, text: "Bring tent and sleeping bag before coming", category: "service", city: "Gaziantep" },
  { id: 23, stars: 1, text: "ATM on map but not in reality", category: "location", city: "Istanbul" },
  { id: 24, stars: 1, text: "Building demolished but ATM still on map", category: "location", city: "Ankara" },
  { id: 25, stars: 1, text: "Don't come to this address, waste of time", category: "location", city: "Izmir" },
  { id: 26, stars: 1, text: "Location completely wrong", category: "location", city: "Bursa" },
  { id: 27, stars: 1, text: "Staff very uninterested", category: "service", city: "Adana" },
  { id: 28, stars: 1, text: "Would give 0 stars if I could", category: "service", city: "Konya" },
  { id: 29, stars: 1, text: "Pin in wrong place, 500 meters away", category: "location", city: "Kayseri" },
  { id: 30, stars: 1, text: "Navigation brought me here, no bank", category: "location", city: "Samsun" },
  { id: 31, stars: 1, text: "Wrong street marked", category: "location", city: "Denizli" },
  { id: 32, stars: 1, text: "Bank in opposite building, this one empty", category: "location", city: "Istanbul" },
  { id: 33, stars: 1, text: "Deposited money, didn't reflect in account", category: "atm", city: "Ankara" },
  { id: 34, stars: 2, text: "No light, unusable at night", category: "atm", city: "Izmir" },
  { id: 35, stars: 1, text: "Constant 'transaction failed' error", category: "atm", city: "Bursa" },
  { id: 36, stars: 1, text: "Made appointment, waited 1 hour", category: "service", city: "Adana" },
  { id: 37, stars: 2, text: "They don't answer the phone", category: "service", city: "Konya" },
  { id: 38, stars: 1, text: "Went 5km, branch was closed", category: "location", city: "Samsun" },
  { id: 39, stars: 1, text: "Map wrong, shows different city", category: "location", city: "Denizli" },
  { id: 40, stars: 1, text: "Branch moved, no one knows", category: "location", city: "Istanbul" },
  { id: 41, stars: 1, text: "Google says open but it's closed", category: "location", city: "Ankara" },
  { id: 42, stars: 1, text: "I called the number on Google, completely different business answered", category: "service", city: "Gaziantep" },
  { id: 43, stars: 1, text: "The ATM ate my card and the branch next door said it's not theirs", category: "atm", city: "Kayseri" },
  { id: 44, stars: 1, text: "Listed as open 24/7 but the door was locked at 3pm", category: "location", city: "Antalya" },
  { id: 45, stars: 2, text: "Three different Google pins for the same branch. Which one is real?", category: "location", city: "Izmir" },
  { id: 46, stars: 1, text: "Drove 20 minutes based on Google Maps, found an empty lot", category: "location", city: "Ankara" },
  { id: 47, stars: 1, text: "The hours listed are completely wrong. Closed when it says open.", category: "location", city: "Istanbul" },
  { id: 48, stars: 1, text: "Can someone from the bank please claim this listing and fix the info?", category: "location", city: "Bursa" },
];

const column1 = reviewPool.filter((_, i) => i % 4 === 0);
const column2 = reviewPool.filter((_, i) => i % 4 === 1);
const column3 = reviewPool.filter((_, i) => i % 4 === 2);
const column4 = reviewPool.filter((_, i) => i % 4 === 3);

function StreamingCard({ review }: { review: StreamingReview }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < review.stars
                ? review.stars <= 2 ? "fill-status-watch text-status-watch" : "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-foreground line-clamp-3 mb-3">"{review.text}"</p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
        <MapPin className="w-3 h-3" />
        <span>{review.city}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <span className="absolute inset-0 bg-status-watch/30 rounded-full animate-pulse-ring" />
          <span className="absolute inset-0 bg-status-watch/20 rounded-full animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          <Badge className="relative text-xs px-2 py-0.5 bg-status-watch/10 text-status-watch border-status-watch/20 hover:bg-status-watch/15">
            Awaiting Response
          </Badge>
        </div>
      </div>
    </div>
  );
}

function StreamingColumn({ reviews, duration }: { reviews: StreamingReview[]; duration: number }) {
  const duplicated = [...reviews, ...reviews];
  return (
    <div className="animate-scroll-up" style={{ "--duration": `${duration}s` } as React.CSSProperties}>
      {duplicated.map((review, index) => (
        <StreamingCard key={`${review.id}-${index}`} review={review} />
      ))}
    </div>
  );
}

function MethodologyIcon({ type }: { type: string }) {
  const cls = "w-4 h-4 text-primary";
  switch (type) {
    case "brain": return <Brain className={cls} />;
    case "search": return <Search className={cls} />;
    case "chart": return <BarChart3 className={cls} />;
    case "database": return <Database className={cls} />;
    default: return <Brain className={cls} />;
  }
}

export function ReviewWaterfallSection() {
  const [showMethodology, setShowMethodology] = useState(false);

  const methodologyItems = [
    { icon: "brain", text: "Emotion AI analysis of 6,463 Google Maps reviews across two major banks" },
    { icon: "search", text: "Keywords: 'wrong address', 'couldn't find', 'closed', 'different location', 'doesn't exist'" },
    { icon: "chart", text: "Sentiment analysis to identify location confusion, ATM malfunction, and routing failures" },
    { icon: "database", text: "Cross-referenced with official branch and ATM master lists from both institutions" },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Customer Voice
          </Badge>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-4">
            These reviews show why location data governance matters.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Across two major banks,{" "}
            <span className="text-status-watch tabular-nums">99.3%</span>{" "}
            of customer reviews went unanswered
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Every unanswered review is a public complaint your competitors can see.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowMethodology(!showMethodology)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground bg-background border border-border hover:border-primary/30 px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            <Plus className={`w-4 h-4 transition-transform duration-200 ${showMethodology ? "rotate-45" : ""}`} />
            How We Analyzed This
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showMethodology && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="max-w-3xl mx-auto mb-10 bg-background rounded-xl border border-border p-6 shadow-lg">
                <div className="grid sm:grid-cols-2 gap-4">
                  {methodologyItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="mt-0.5"><MethodologyIcon type={item.icon} /></div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-muted/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-muted/30 to-transparent z-10 pointer-events-none" />
          <div className="h-[500px] md:h-[600px] overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <StreamingColumn reviews={column1} duration={25} />
              <StreamingColumn reviews={column2} duration={30} />
              <StreamingColumn reviews={column3} duration={35} />
              <StreamingColumn reviews={column4} duration={28} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
