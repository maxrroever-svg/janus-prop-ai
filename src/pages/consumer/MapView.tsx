import { DealMapContainer } from "@/components/dashboard/DealMapContainer";

const MapView = () => {
  return (
    <div className="h-full">
      <DealMapContainer onDealSelect={(deal) => console.log('Selected property:', deal)} />
    </div>
  );
};

export default MapView;