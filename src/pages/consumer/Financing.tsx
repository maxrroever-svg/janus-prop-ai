import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { FinancingHub } from "@/components/consumer/FinancingHub";

const ConsumerFinancing = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <main className="flex-1 flex flex-col">
          <ConsumerHeader title="Financing Hub" />
          <div className="flex-1 p-6">
            <FinancingHub />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerFinancing;