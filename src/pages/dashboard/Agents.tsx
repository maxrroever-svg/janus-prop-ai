import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AgentModules } from "@/components/dashboard/AgentModules";
import { AgentActivityConsole } from "@/components/dashboard/AgentActivityConsole";
import { AgentInsights } from "@/components/dashboard/AgentInsights";

const Agents = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full flex overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-display font-bold text-foreground">
                  Janus AI Agents
                </h1>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AgentModules />
                <AgentActivityConsole />
              </div>
              
              <AgentInsights />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Agents;