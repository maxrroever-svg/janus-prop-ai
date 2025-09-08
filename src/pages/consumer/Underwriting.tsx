import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { OneClickUnderwriting } from "@/components/consumer/OneClickUnderwriting";

const ConsumerUnderwriting = () => {
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="One-Click Underwriting" />
        <main className="flex-1 overflow-y-auto p-6">
          <OneClickUnderwriting />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerUnderwriting;