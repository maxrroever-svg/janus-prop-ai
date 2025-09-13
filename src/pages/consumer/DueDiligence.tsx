import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { DueDiligenceManager } from "@/components/dashboard/DueDiligenceManager";

const DueDiligence = () => {
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Due Diligence" />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Due Diligence Assistant
              </h1>
              <p className="text-muted-foreground">
                AI-powered document review and workflow automation for your property transactions
              </p>
            </div>
            <DueDiligenceManager />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DueDiligence;