import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DealCanvas } from "@/components/dashboard/DealCanvas";

const Dashboard = () => {
  console.log("Dashboard component is rendering");
  
  return (
    <SidebarProvider>
      <DashboardSidebar />
      
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        
        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Dashboard Metrics Banner */}
          <section className="section band band--horizon glass border-b border-border/30 p-6">
            <div className="container max-w-6xl mx-auto">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-display font-bold text-foreground mb-2">Deal Canvas</h1>
                <p className="text-muted-foreground">
                  AI-powered deal orchestration and property analysis
                </p>
              </div>

              {/* Investment metrics */}
              <div className="flex flex-wrap justify-center gap-4">
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">ACTIVE DEALS</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">47</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+3</span>
                </span>
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">AVG IRR</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">18.3%</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+1.2%</span>
                </span>
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">DEAL FLOW</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">$2.4M</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+$180K</span>
                </span>
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">SUCCESS RATE</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">73%</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+4%</span>
                </span>
              </div>
            </div>
          </section>

          {/* Deal Canvas Content */}
          <DealCanvas />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;