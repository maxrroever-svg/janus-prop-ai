import { MapPin, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DealMapContainerProps {
  onDealSelect: (deal: any) => void;
}

export function DealMapContainer({ onDealSelect }: DealMapContainerProps) {
  const mockDeals = [
    { id: 1, address: "123 Main St", score: 92, price: "$450K", status: "Hot" },
    { id: 2, address: "456 Oak Ave", score: 78, price: "$320K", status: "Warm" },
    { id: 3, address: "789 Pine Rd", score: 85, price: "$520K", status: "Hot" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Map Controls */}
      <Card className="institutional-card mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Deal Canvas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by location, score, or criteria..."
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Area */}
      <Card className="institutional-card flex-1">
        <CardContent className="h-full p-6">
          <div className="h-full bg-muted/10 rounded-lg relative flex items-center justify-center border border-dashed border-border">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary/60 mx-auto mb-4" />
              <h3 className="font-display text-xl text-foreground mb-2">Interactive Deal Map</h3>
              <p className="text-muted-foreground text-sm max-w-md mb-6">
                Mapbox integration coming soon. Deals will appear as interactive pins with real-time scores and quick actions.
              </p>
              
              {/* Mock Deal List */}
              <div className="space-y-2 max-w-sm mx-auto">
                <h4 className="font-medium text-foreground mb-3">Nearby Deals</h4>
                {mockDeals.map((deal) => (
                  <div 
                    key={deal.id}
                    className="p-3 bg-card border border-border rounded-lg text-left cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => onDealSelect(deal)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">{deal.address}</p>
                        <p className="text-xs text-muted-foreground">{deal.price}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">{deal.score}</div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          deal.status === "Hot" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                        }`}>
                          {deal.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}