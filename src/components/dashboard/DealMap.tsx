import { MapPin } from "lucide-react";

interface DealMapProps {
  onDealSelect: (deal: any) => void;
}

export function DealMap({ onDealSelect }: DealMapProps) {
  return (
    <div className="h-full bg-muted/20 relative flex items-center justify-center">
      {/* Placeholder for map integration */}
      <div className="text-center">
        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-display text-lg text-foreground mb-2">Deal Canvas</h3>
        <p className="text-muted-foreground text-sm max-w-md">
          Interactive map view will display here. Mapbox integration coming soon.
          <br />
          <br />
          Deals will appear as pins with scores, distress signals, and quick actions.
        </p>
      </div>
    </div>
  );
}