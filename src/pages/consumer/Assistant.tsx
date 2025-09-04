import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { AIBuyingAssistant } from "@/components/consumer/AIBuyingAssistant";

const ConsumerAssistant = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6">
            <SidebarTrigger />
            <h1 className="ml-4 font-display text-xl font-semibold text-foreground">
              AI Buying Assistant
            </h1>
          </header>
          <main className="flex-1 p-6">
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