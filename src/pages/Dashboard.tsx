import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DealMapContainer } from "@/components/dashboard/DealMapContainer";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-foreground">
                Janus Investor
              </span>
              <button 
                onClick={() => window.location.href = '/'} 
                className="hover:opacity-80 transition-opacity"
              >
                <span className="font-display text-xl text-foreground">Janus AI</span>
              </button>
            </div>
          </div>
          <DashboardHeader />
          <main className="flex-1 p-6">
            <div className="h-full">
              <DealMapContainer onDealSelect={(deal) => console.log('Selected deal:', deal)} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;