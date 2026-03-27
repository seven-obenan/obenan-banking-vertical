import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Plus, Search, MessageSquare, ChevronDown, ChevronRight,
  RotateCcw, Sparkles, Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bankingVerticalPack } from "@/data/bankingVerticalPack";

interface ContentBlock {
  type: "heading" | "paragraph" | "table" | "subheading" | "bullet";
  text?: string;
  data?: { metric: string; value: string }[];
}

const { audit } = bankingVerticalPack;

const streamingContent: ContentBlock[] = [
  { type: "heading", text: "Unauthorized Location Detection" },
  { type: "paragraph", text: `A total of **${(audit.shadow_locations + audit.unclaimed_listings).toLocaleString()} locations** are outside your control:` },
  { type: "table", data: [
    { metric: "Shadow Locations", value: audit.shadow_locations.toString() },
    { metric: "Unclaimed Listings", value: audit.unclaimed_listings.toLocaleString() },
    { metric: "Duplicate Clusters", value: audit.duplicate_clusters.toLocaleString() },
    { metric: "Category Mismatches", value: audit.category_mismatches.toString() },
  ]},
  { type: "subheading", text: "Requiring Immediate Action:" },
  { type: "bullet", text: "**HQ Financial District** — 6 shadow pins detected within 1km of headquarters" },
  { type: "bullet", text: "**Urban ATM Corridors** — 162 traffic-splitting duplicate clusters actively diluting reviews" },
  { type: "bullet", text: "**Closed Branches** — Multiple locations still showing as 'Open' on Google Maps" },
  { type: "paragraph", text: "Would you like me to generate ownership claims and suppression requests for these locations?" },
];

const chatHistory = [
  { id: 1, title: "Unauthorized Location Detection", date: "today" },
  { id: 2, title: "Duplicate ATM Report", date: "today" },
  { id: 3, title: "Unclaimed Listings by Region", date: "yesterday" },
  { id: 4, title: "Review Response Gap Analysis", date: "yesterday" },
];

function ThinkingIndicator({ text, isExpanded, onToggle }: { text: string; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="mb-4">
      <button onClick={onToggle} className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors">
        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-4 h-4" />
        </motion.div>
        <div className="flex items-center gap-2">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <Sparkles className="w-4 h-4 text-cta" />
          </motion.div>
          <span>Thinking...</span>
        </div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/40 mt-2 ml-6 italic">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function renderMarkdownBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-white">{part}</strong> : part);
}

function StreamingText({ contentBlocks, startStreaming }: { contentBlocks: ContentBlock[]; startStreaming: boolean }) {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (!startStreaming) { setVisibleItems(0); return; }
    if (visibleItems < contentBlocks.length) {
      const timer = setTimeout(() => setVisibleItems(prev => prev + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [visibleItems, contentBlocks.length, startStreaming]);

  return (
    <div className="space-y-3">
      {contentBlocks.slice(0, visibleItems).map((item, idx) => (
        <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {item.type === "heading" && <h3 className="text-lg font-semibold text-white">{item.text}</h3>}
          {item.type === "subheading" && <h4 className="text-base font-medium text-white mt-4">{item.text}</h4>}
          {item.type === "paragraph" && <p className="text-white/90">{renderMarkdownBold(item.text || "")}</p>}
          {item.type === "bullet" && (
            <div className="flex items-start gap-2 ml-2">
              <span className="text-cta mt-1.5">•</span>
              <p className="text-white/90">{renderMarkdownBold(item.text || "")}</p>
            </div>
          )}
          {item.type === "table" && item.data && (
            <div className="bg-white/5 rounded-lg p-3 my-3">
              <table className="w-full text-sm">
                <tbody>
                  {item.data.map((row, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-white/10 last:border-0">
                      <td className="py-2 text-white/70">{row.metric}</td>
                      <td className="py-2 text-right font-mono text-white font-medium">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      ))}
      {startStreaming && visibleItems < contentBlocks.length && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-2 h-4 bg-cta ml-1" />
      )}
    </div>
  );
}

export function AIDataChatSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const hasStartedRef = useRef(false);

  const [showConversation, setShowConversation] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingExpanded, setThinkingExpanded] = useState(true);
  const [showResponse, setShowResponse] = useState(false);

  const userQuery = "Are there any branches or ATMs opened outside our control?";
  const thinkingText = `Scanning... Comparing ${bankingVerticalPack.industry.total_touchpoints.toLocaleString()} official locations against Google Maps data, detecting unverified pins, checking suspended listings...`;

  const startConversation = () => {
    setInputValue(userQuery);
    setShowConversation(true);
    setIsThinking(true);
    setThinkingExpanded(true);
    setShowResponse(false);
    setTimeout(() => {
      setThinkingExpanded(false);
      setTimeout(() => { setIsThinking(false); setShowResponse(true); }, 500);
    }, 3000);
  };

  const resetDemo = () => {
    hasStartedRef.current = false;
    setShowConversation(false);
    setInputValue("");
    setIsThinking(false);
    setShowResponse(false);
    setTimeout(() => { startConversation(); hasStartedRef.current = true; }, 500);
  };

  useEffect(() => {
    if (isInView && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startConversation();
    }
  }, [isInView]);

  const todayChats = chatHistory.filter(c => c.date === "today");
  const yesterdayChats = chatHistory.filter(c => c.date === "yesterday");

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-cta/10 text-cta border-cta/20">AI-Powered Query</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Talk to your data</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understand your entire branch and ATM network with a single question.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <div className="flex h-[500px] md:h-[550px]">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-64 bg-[#171717] border-r border-white/10">
                <div className="p-3">
                  <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 text-sm transition-colors">
                    <Plus className="w-4 h-4" />New Chat
                  </button>
                </div>
                <div className="px-3 pb-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/50 text-sm">
                    <Search className="w-4 h-4" />Search Chats
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-2">
                  <div className="mb-4">
                    <p className="text-xs text-white/40 px-2 py-1">Today</p>
                    {todayChats.map(chat => (
                      <button key={chat.id} className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors ${chat.id === 1 ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}>
                        <MessageSquare className="w-4 h-4 shrink-0" /><span className="truncate">{chat.title}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-white/40 px-2 py-1">Yesterday</p>
                    {yesterdayChats.map(chat => (
                      <button key={chat.id} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-left text-white/70 hover:bg-white/5 transition-colors">
                        <MessageSquare className="w-4 h-4 shrink-0" /><span className="truncate">{chat.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main chat */}
              <div className="flex-1 flex flex-col bg-[#212121]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">Obenan AI</span>
                    <ChevronDown className="w-4 h-4 text-white/50" />
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetDemo} className="text-white/50 hover:text-white hover:bg-white/10">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence mode="wait">
                    {showConversation && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="flex justify-end">
                          <div className="bg-[#2f2f2f] rounded-2xl px-4 py-3 max-w-[80%]">
                            <p className="text-white">{userQuery}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-cta flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            {isThinking && <ThinkingIndicator text={thinkingText} isExpanded={thinkingExpanded} onToggle={() => setThinkingExpanded(!thinkingExpanded)} />}
                            <StreamingText contentBlocks={streamingContent} startStreaming={showResponse} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center gap-2 bg-[#2f2f2f] rounded-2xl px-4 py-3">
                    <input type="text" value={inputValue} readOnly placeholder="Ask a question about your network..." className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm" />
                    <button className="w-8 h-8 rounded-full bg-cta flex items-center justify-center hover:opacity-90 transition-opacity">
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
