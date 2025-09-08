import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { AIBuyingAssistant } from "@/components/consumer/AIBuyingAssistant";

const ConsumerAssistant = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full flex overflow-hidden">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <ConsumerHeader title="AI Buying Assistant" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              <AIBuyingAssistant />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerAssistant;