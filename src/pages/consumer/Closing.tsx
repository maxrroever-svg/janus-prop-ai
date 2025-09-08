import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { ClosingRoom } from "@/components/consumer/ClosingRoom";

const ConsumerClosing = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <ConsumerHeader title="Closing Room" />
          <main className="flex-1 p-6">
            <ClosingRoom />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerClosing;