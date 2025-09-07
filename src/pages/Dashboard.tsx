import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
        <div className="min-h-screen w-full bg-background flex">
          <div className="star-field opacity-30"></div>
          <DashboardSidebar />
          <div className="flex-1 flex flex-col relative z-10">
            <header className="janus-header navbar flex items-center justify-between px-6 h-16">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <span className="font-display text-lg font-semibold text-foreground glow-text">
                  Janus Investor
                </span>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
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
    </div>
  );
};

export default Dashboard;