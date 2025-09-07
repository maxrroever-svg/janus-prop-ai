import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { AfterYouOwnIt } from "@/components/consumer/AfterYouOwnIt";

const ConsumerOwnership = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <ConsumerHeader title="After You Own It" />
          <main className="flex-1 p-6">
            <AfterYouOwnIt />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerOwnership;