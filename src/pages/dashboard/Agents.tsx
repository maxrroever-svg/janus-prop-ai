import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AgentStack } from "@/components/dashboard/AgentStack";

const Agents = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1">
            <AgentStack runs={[]} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Agents;