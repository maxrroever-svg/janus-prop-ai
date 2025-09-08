import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DealCanvas } from "@/components/dashboard/DealCanvas";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  console.log("Dashboard component is rendering");
  const navigate = useNavigate();
  
  return (
    <div className="janus janus-dashboard">
      <SidebarProvider>
        <div className="min-h-screen w-full flex overflow-hidden">
          <div className="star-field opacity-30 fixed inset-0 z-0"></div>
          <DashboardSidebar />
          
          {/* MAIN CONTENT - Properly positioned relative to sidebar */}
          <div className="flex-1 flex flex-col min-w-0 relative z-10">
            {/* Fixed header */}
            <header className="janus-header sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/30">
              <div className="flex items-center justify-between px-6 h-16">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <span className="font-display text-lg font-semibold text-foreground">
                    Janus Investor
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/')}
                  className="font-display font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Janus AI
                </Button>
              </div>
            </header>
            
            {/* Scrollable main content */}
            <main className="flex-1 overflow-y-auto">
              <DealCanvas />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;