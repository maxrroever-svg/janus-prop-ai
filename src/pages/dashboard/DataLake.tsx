import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataLakeSection } from "@/components/dashboard/DataLakeSection";

const DataLake = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Data Lake" subtitle="Access comprehensive property and market data" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <DataLakeSection />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DataLake;