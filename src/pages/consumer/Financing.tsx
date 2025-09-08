import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { FinancingHub } from "@/components/consumer/FinancingHub";

const ConsumerFinancing = () => {
  console.log('ConsumerFinancing page rendering');
  
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col" style={{ minHeight: '100vh' }}>
          <ConsumerHeader title="Financing Hub" />
          <main className="flex-1 p-6" style={{ marginTop: '0', paddingTop: '1.5rem' }}>
            <FinancingHub />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerFinancing;