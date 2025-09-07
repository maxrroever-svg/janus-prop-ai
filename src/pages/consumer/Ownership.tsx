import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { AfterYouOwnIt } from "@/components/consumer/AfterYouOwnIt";

const ConsumerOwnership = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6">
            <SidebarTrigger />
            <h1 className="ml-4 font-display text-xl font-semibold text-foreground">
              After You Own It
            </h1>
          </header>
          <main className="flex-1 p-6">
            <AfterYouOwnIt />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerOwnership;