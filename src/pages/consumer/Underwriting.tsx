import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { OneClickUnderwriting } from "@/components/consumer/OneClickUnderwriting";

const ConsumerUnderwriting = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <ConsumerHeader title="One-Click Underwriting" />
          <main className="flex-1 p-6">
            <OneClickUnderwriting />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerUnderwriting;