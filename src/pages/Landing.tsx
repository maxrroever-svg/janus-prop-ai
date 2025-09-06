import { HeroSection } from "@/components/landing/HeroSection";
import { JanusVisionSection } from "@/components/landing/JanusVisionSection";
import { JanusConsumerSection } from "@/components/landing/JanusConsumerSection";
import { JanusInvestorSection } from "@/components/landing/JanusInvestorSection";
import { LienIntelligenceSection } from "@/components/landing/LienIntelligenceSection";
import { ClosingSection } from "@/components/landing/ClosingSection";
import { ScrollNavigation } from "@/components/landing/ScrollNavigation";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-cosmic overflow-x-hidden relative">
      <div className="star-field"></div>
      <ScrollNavigation />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="vision">
        <JanusVisionSection />
      </div>
      <div id="consumer">
        <JanusConsumerSection />
      </div>
      <div id="investor">
        <JanusInvestorSection />
      </div>
      <div id="lien-intelligence">
        <LienIntelligenceSection />
      </div>
      <div id="demo">
        <ClosingSection />
      </div>
    </div>
  );
};

export default Landing;