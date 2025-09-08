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
        <DashboardHeader title="Deal Canvas" />
        
        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto">
          <DealCanvas />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;