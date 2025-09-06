import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataLakeSection } from "@/components/dashboard/DataLakeSection";

const DataLake = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <DataLakeSection />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DataLake;