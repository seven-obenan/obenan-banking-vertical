import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CinematicIntro } from "@/components/CinematicIntro";

// Act 1: The Banking Visibility Crisis
import { HeroSection } from "@/components/HeroSection";
import { IndustryStatsSection } from "@/components/IndustryStatsSection";

// Act 2: The Obenan Platform
import { FoundationSection } from "@/components/FoundationSection";
import { AIDataChatSection } from "@/components/AIDataChatSection";

// Act 3: Industry Evidence Wall
import { ReviewWaterfallSection } from "@/components/ReviewWaterfallSection";
import { SmokingGunsSection } from "@/components/SmokingGunsSection";
import { UnclaimedLocationsMarquee } from "@/components/UnclaimedLocationsMarquee";

// Act 4: Transformation & Commercial
import { TransformationSection } from "@/components/TransformationSection";
import { ExecutionPlanSection } from "@/components/ExecutionPlanSection";
import { ClosingCTASection } from "@/components/ClosingCTASection";

type AppState = "intro" | "main";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("intro");

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {appState === "intro" && (
          <CinematicIntro key="intro" onComplete={() => setAppState("main")} />
        )}
      </AnimatePresence>

      {appState === "main" && (
        <main>
          {/* Act 1: The Banking Visibility Crisis */}
          <HeroSection />
          <IndustryStatsSection />

          {/* Act 2: The Obenan Platform */}
          <FoundationSection />
          <AIDataChatSection />

          {/* Act 3: Industry Evidence Wall */}
          <ReviewWaterfallSection />
          <SmokingGunsSection />
          <UnclaimedLocationsMarquee />

          {/* Act 4: Transformation & Commercial */}
          <TransformationSection />
          <ExecutionPlanSection />
          <ClosingCTASection />
        </main>
      )}
    </div>
  );
};

export default Index;
