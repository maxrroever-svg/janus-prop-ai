import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { DealMapContainer } from "@/components/dashboard/DealMapContainer";
import { Button } from "@/components/ui/button";

const MapView = () => {
  return (
    <div className="janus janus-consumer">
      <SidebarProvider>
        <div className="min-h-screen w-full bg-background flex">
          <div className="star-field"></div>
          <ConsumerSidebar />
          <div className="flex-1 flex flex-col relative z-10">
            <header className="janus-header navbar flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-semibold text-foreground">
                  Map View
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
              <DealMapContainer onDealSelect={(deal) => console.log('Selected property:', deal)} />
            </main>
          </div>
        </div>
      </SidebarProvider>
      <div id="nebula" aria-hidden="true"></div>
      <link rel="stylesheet" href="/css/janus-theme.css" />
      <script src="/js/janus-dust.js"></script>
    </div>
  );
};

export default MapView;