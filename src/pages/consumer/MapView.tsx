import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { DealMapContainer } from "@/components/dashboard/DealMapContainer";

const MapView = () => {
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Map View" subtitle="Interactive property search and analysis" />
        <main className="flex-1 overflow-y-auto p-6">
          <DealMapContainer onDealSelect={(deal) => console.log('Selected property:', deal)} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MapView;