import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DealCanvas } from "@/components/dashboard/DealCanvas";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  console.log("Dashboard component is rendering");
  return (
    <div className="janus janus-dashboard">
      <SidebarProvider>
        <div className="min-h-screen w-full bg-gradient-cosmic flex">
          <div className="star-field"></div>
          <DashboardSidebar />
          <div className="flex-1 flex flex-col relative z-10">
            <header className="janus-header navbar flex items-center justify-between px-6">
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
            <main className="flex-1">
              <DealCanvas />
            </main>
          </div>
        </div>
      </SidebarProvider>
      <link rel="stylesheet" href="/css/janus-theme.css" />
      <script src="/js/janus-effects.js"></script>
    </div>
  );
};

export default Dashboard;