import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { JanusVisionSection } from "@/components/landing/JanusVisionSection";
import { JanusConsumerSection } from "@/components/landing/JanusConsumerSection";
import { JanusInvestorSection } from "@/components/landing/JanusInvestorSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { ClosingSection } from "@/components/landing/ClosingSection";

const Landing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <div className="star-field"></div>
      <LandingNavbar />
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
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <ClosingSection />
    </div>
  );
};

export default Landing;