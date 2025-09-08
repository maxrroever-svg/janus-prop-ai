import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { DealMapContainer } from "@/components/dashboard/DealMapContainer";

const MapView = () => {
  console.log('MapView page rendering');
  
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col" style={{ minHeight: '100vh' }}>
          <ConsumerHeader title="Map View" subtitle="Interactive property search and analysis" />
          <main className="flex-1 p-6" style={{ marginTop: '0', paddingTop: '1.5rem' }}>
            <DealMapContainer onDealSelect={(deal) => console.log('Selected property:', deal)} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MapView;