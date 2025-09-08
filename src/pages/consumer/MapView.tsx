import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { DealMapContainer } from "@/components/dashboard/DealMapContainer";

const MapView = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full flex overflow-hidden">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <ConsumerHeader title="Map View" subtitle="Interactive property search and analysis" />
          <main className="flex-1 overflow-y-auto p-6">
            <DealMapContainer onDealSelect={(deal) => console.log('Selected property:', deal)} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MapView;