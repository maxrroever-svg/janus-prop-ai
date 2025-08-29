import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Header } from "@/components/layout/Header";
import { AIAssistantSection } from "@/components/dashboard/AIAssistantSection";

const Assistant = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
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