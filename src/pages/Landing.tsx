import { HeroSection } from "@/components/landing/HeroSection";
import { LienIntelligenceSection } from "@/components/landing/LienIntelligenceSection";
import { AgentStackSection } from "@/components/landing/AgentStackSection";
import { IntelligenceSystemSection } from "@/components/landing/IntelligenceSystemSection";
import { PipelineSection } from "@/components/landing/PipelineSection";
import { DealIntelligenceSection } from "@/components/landing/DealIntelligenceSection";
import { ClosingSection } from "@/components/landing/ClosingSection";
import { ScrollNavigation } from "@/components/landing/ScrollNavigation";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollNavigation />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="lien-intelligence">
        <LienIntelligenceSection />
      </div>
      <div id="investment-intelligence">
        <AgentStackSection />
      </div>
      <div id="ai-system">
        <IntelligenceSystemSection />
      </div>
      <div id="pipeline">
        <PipelineSection />
      </div>
      <div id="architecture">
        <DealIntelligenceSection />
      </div>
      <div id="demo">
        <ClosingSection />
      </div>
    </div>
  );
};

export default Landing;