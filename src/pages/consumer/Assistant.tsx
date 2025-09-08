import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { AIBuyingAssistant } from "@/components/consumer/AIBuyingAssistant";

const ConsumerAssistant = () => {
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="AI Buying Assistant" subtitle="Get personalized assistance with your property search" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <AIBuyingAssistant />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerAssistant;