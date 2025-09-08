import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AIAssistantSection } from "@/components/dashboard/AIAssistantSection";

const Assistant = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          {/* Dashboard Metrics Banner */}
          <section className="section band band--horizon glass border-b border-border/30 p-6">
            <div className="container max-w-4xl mx-auto">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-display font-bold text-foreground mb-2">AI Assistant</h1>
                <p className="text-muted-foreground">
                  Chat with Janus AI for insights and assistance
                </p>
              </div>
            </div>
          </section>

          {/* Main Assistant content */}
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <AIAssistantSection />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Assistant;