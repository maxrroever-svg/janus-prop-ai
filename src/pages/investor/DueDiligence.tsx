import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DueDiligenceManager } from "@/components/dashboard/DueDiligenceManager";

const DueDiligence = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Due Diligence" subtitle="AI-powered document review and workflow automation" />
        <main className="flex-1 overflow-y-auto">
          <DueDiligenceManager />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DueDiligence;