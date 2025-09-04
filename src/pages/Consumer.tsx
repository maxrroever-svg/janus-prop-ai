import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { SmartSearch } from "@/components/consumer/SmartSearch";
import { AIBuyingAssistant } from "@/components/consumer/AIBuyingAssistant";
import { OneClickUnderwriting } from "@/components/consumer/OneClickUnderwriting";
import { FinancingHub } from "@/components/consumer/FinancingHub";
import { ClosingRoom } from "@/components/consumer/ClosingRoom";
import { AfterYouOwnIt } from "@/components/consumer/AfterYouOwnIt";
import { ConsumerCTA } from "@/components/consumer/ConsumerCTA";

const Consumer = () => {
  return (
    <div className="min-h-screen bg-background">
      <ConsumerHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-8">
            <SmartSearch />
            <OneClickUnderwriting />
            <FinancingHub />
            <ClosingRoom />
            <AfterYouOwnIt />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AIBuyingAssistant />
          </div>
        </div>
        
        <ConsumerCTA />
      </main>
    </div>
  );
};

export default Consumer;