import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DealCanvas } from "@/components/dashboard/DealCanvas";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  console.log("Dashboard component is rendering");
  const navigate = useNavigate();
  
  return (
    <SidebarProvider>
      <DashboardSidebar />
      
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Fixed header */}
        <header className="h-16 flex items-center justify-between px-6 bg-background border-b border-border shrink-0">
          <div className="flex items-center gap-3">
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
        </header>
        
        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto">
          <DealCanvas />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;