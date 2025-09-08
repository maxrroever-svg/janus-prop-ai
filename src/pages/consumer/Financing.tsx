import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { FinancingHub } from "@/components/consumer/FinancingHub";

const ConsumerFinancing = () => {
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Financing Hub" />
        <main className="flex-1 overflow-y-auto p-6">
          <FinancingHub />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerFinancing;