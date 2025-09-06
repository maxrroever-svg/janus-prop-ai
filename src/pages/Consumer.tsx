import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { SmartSearch } from "@/components/consumer/SmartSearch";
import { Button } from "@/components/ui/button";

const Consumer = () => {
  return (
    <div className="janus janus-dashboard">
      <SidebarProvider>
        <div className="min-h-screen w-full bg-gradient-cosmic flex">
          <div className="star-field"></div>
          <ConsumerSidebar />
          <div className="flex-1 flex flex-col relative z-10">
            <header className="janus-header navbar flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <span className="font-display text-lg font-semibold text-foreground">
                  Janus Consumer
                </span>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '/'}
                className="font-display text-lg font-semibold text-foreground hover:text-white glow-text"
              >
                Janus AI
              </Button>
            </header>
            <main className="flex-1 p-6">
              <SmartSearch />
            </main>
          </div>
        </div>
      </SidebarProvider>
      <link rel="stylesheet" href="/css/janus-theme.css" />
      <script src="/js/janus-effects.js"></script>
    </div>
  );
};

export default Consumer;