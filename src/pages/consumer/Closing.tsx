import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { ClosingRoom } from "@/components/consumer/ClosingRoom";

const ConsumerClosing = () => {
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Closing Room" subtitle="Track closing timeline and manage requirements" />
        <main className="flex-1 overflow-y-auto p-6">
          <ClosingRoom />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerClosing;