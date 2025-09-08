import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { AfterYouOwnIt } from "@/components/consumer/AfterYouOwnIt";

const ConsumerOwnership = () => {
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="After You Own It" subtitle="Post-purchase assistance and property management" />
        <main className="flex-1 overflow-y-auto p-6">
          <AfterYouOwnIt />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerOwnership;