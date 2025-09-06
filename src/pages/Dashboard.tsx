import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DealMapContainer } from "@/components/dashboard/DealMapContainer";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-cosmic flex">
        <div className="star-field"></div>
        <DashboardSidebar />
        <div className="flex-1 flex flex-col relative z-10">
          <header className="navbar flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <span className="font-display text-lg font-semibold text-foreground">
                Janus Investor
              </span>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/'}
              className="font-display text-lg font-semibold text-foreground hover:text-white glow-text"
            >
              Janus AI
            </Button>
          </header>
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