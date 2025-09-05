import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { SmartSearch } from "@/components/consumer/SmartSearch";

const Consumer = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-semibold text-foreground">
                  Janus Consumer
                </span>
                <button 
                  onClick={() => window.location.href = '/'} 
                  className="hover:opacity-80 transition-opacity"
                >
                  <span className="font-display text-xl text-foreground">Janus AI</span>
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <SmartSearch />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Consumer;