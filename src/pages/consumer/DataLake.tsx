import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { DataLakeSection } from "@/components/dashboard/DataLakeSection";

const ConsumerDataLake = () => {
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Data Lake" subtitle="Access comprehensive property and market data" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <DataLakeSection />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerDataLake;