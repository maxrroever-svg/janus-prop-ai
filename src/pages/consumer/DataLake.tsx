import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { DataLakeSection } from "@/components/dashboard/DataLakeSection";

const ConsumerDataLake = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <main className="flex-1 flex flex-col">
          <ConsumerHeader title="Data Lake" />
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <DataLakeSection />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerDataLake;