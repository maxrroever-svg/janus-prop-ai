import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { OneClickUnderwriting } from "@/components/consumer/OneClickUnderwriting";

const ConsumerUnderwriting = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <main className="flex-1 flex flex-col">
          <ConsumerHeader title="One-Click Underwriting" />
          <div className="flex-1 p-6">
            <OneClickUnderwriting />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerUnderwriting;