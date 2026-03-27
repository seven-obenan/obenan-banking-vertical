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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
};

export default Index;
