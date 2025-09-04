import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { FinancingHub } from "@/components/consumer/FinancingHub";

const ConsumerFinancing = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6">
            <SidebarTrigger />
            <h1 className="ml-4 font-display text-xl font-semibold text-foreground">
              Financing Hub
            </h1>
          </header>
          <main className="flex-1 p-6">
            <FinancingHub />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerFinancing;