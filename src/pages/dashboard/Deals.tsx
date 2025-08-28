import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MainDashboard } from "@/components/dashboard/MainDashboard";

const Deals = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1">
            <MainDashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Deals;