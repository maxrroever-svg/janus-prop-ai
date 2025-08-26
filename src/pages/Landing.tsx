import { HeroSection } from "@/components/landing/HeroSection";
import { LienIntelligenceSection } from "@/components/landing/LienIntelligenceSection";
import { AgentStackSection } from "@/components/landing/AgentStackSection";
import { PipelineSection } from "@/components/landing/PipelineSection";
import { DealIntelligenceSection } from "@/components/landing/DealIntelligenceSection";
import { ClosingSection } from "@/components/landing/ClosingSection";
import { LandingNavbar } from "@/components/landing/LandingNavbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LandingNavbar />
      <HeroSection />
      <LienIntelligenceSection />
      <AgentStackSection />
      <PipelineSection />
      <DealIntelligenceSection />
      <ClosingSection />
    </div>
  );
};

export default Landing;