import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AIAssistantSection } from "@/components/dashboard/AIAssistantSection";

const Assistant = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full flex overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
                <p className="text-muted-foreground">Chat with Janus AI for insights and assistance</p>
              </div>
              <AIAssistantSection />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Assistant;