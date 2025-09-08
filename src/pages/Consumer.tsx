import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { SmartSearch } from "@/components/consumer/SmartSearch";

const Consumer = () => {
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Smart Search" subtitle="AI-powered real estate search and analysis" />
        
        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Main Dashboard content */}
          <div className="p-6">
            <SmartSearch />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Consumer;