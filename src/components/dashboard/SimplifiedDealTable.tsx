import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Star, 
  MapPin
} from "lucide-react";

const mockDeals = [
  {
    id: 1,
    address: "1247 Atlantic Avenue",
    city: "Brooklyn, NY",
    lienScore: 87,
    capRate: 14.2,
    strategy: "Multi-Family",
    aiSummary: "High-confidence opportunity with 35% upside post-rehab based on coordinated analysis from multiple AI agents",
    prediction: "Strong Buy",
    upside: "$200k",
    price: "$650,000",
    rentEstimate: "$6,500/mo"
  },
  {
    id: 2,
    address: "156 MacDonough Street", 
    city: "Brooklyn, NY",
    lienScore: 82,
    capRate: 12.8,
    strategy: "Single Family",
    aiSummary: "Title issue flagged during due diligence review, recommend negotiating 15% price reduction to account for legal complexities",
    prediction: "Buy w/ Conditions",
    upside: "$160k",
    price: "$420,000",
    rentEstimate: "$4,300/mo"
  },
  {
    id: 3,
    address: "91-15 Corona Avenue",
    city: "Queens, NY",
    lienScore: 79,
    capRate: 13.5,
    strategy: "Multi-Family",
    aiSummary: "Foreclosure filing detected 48 hours ago, property priced 22% below current market value in rapidly gentrifying area",
    prediction: "Urgent Buy",
    upside: "$140k",
    price: "$580,000",
    rentEstimate: "$5,600/mo"
  }
];

interface SimplifiedDealTableProps {
  onPropertySelect: (property: any) => void;
}

export function SimplifiedDealTable({ onPropertySelect }: SimplifiedDealTableProps) {

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-success/10 text-success border-success/20";
    if (score >= 70) return "bg-warning/10 text-warning border-warning/20"; 
    return "bg-muted text-muted-foreground";
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "Strong Buy": return "text-success font-semibold";
      case "Buy": return "text-ice font-medium";
      case "Buy w/ Conditions": return "text-warning font-medium";
      case "Urgent Buy": return "text-gold font-semibold";
      default: return "text-muted-foreground";
    }
  };

  const filteredDeals = mockDeals;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display text-xl font-normal text-foreground">Active Opportunities</h2>
        <p className="text-muted-foreground text-sm">
          {filteredDeals.length} high-priority deals • Updated 3 min ago
        </p>
      </div>

      {/* Deals List - Full Width, No Horizontal Scroll */}
      <div className="space-y-6 w-full">
        {filteredDeals.map((deal) => (
          <div key={deal.id} 
               className="institutional-card p-6 cursor-pointer hover:border-primary/30 transition-colors w-full"
               onClick={() => onPropertySelect(deal)}>
            
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-2 break-words">
                  {deal.address}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{deal.city}</span>
                </div>
              </div>
              <Badge className={`${getScoreColor(deal.lienScore)} shrink-0 text-sm px-3 py-1`}>
                Score: {deal.lienScore}
              </Badge>
            </div>

            {/* Metrics Grid - Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <span className="text-sm font-medium text-muted-foreground block mb-1">Price</span>
                <p className="font-bold text-lg text-foreground">{deal.price}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground block mb-1">Cap Rate</span>
                <p className="font-bold text-lg text-success">{deal.capRate}%</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground block mb-1">Upside</span>
                <p className="font-bold text-lg text-gold">{deal.upside}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground block mb-1">Est. Rent</span>
                <p className="font-bold text-lg text-ice">{deal.rentEstimate}</p>
              </div>
            </div>
            
            {/* Strategy and Prediction Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <Badge variant="outline" className="text-sm px-4 py-2 w-fit">
                {deal.strategy}
              </Badge>
              <span className={`text-base font-bold ${getPredictionColor(deal.prediction)}`}>
                {deal.prediction}
              </span>
            </div>
            
            {/* AI Summary */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground leading-relaxed break-words">
                {deal.aiSummary}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button size="sm" variant="outline" className="px-6">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button size="sm" variant="default" className="px-6">
                <Star className="w-4 h-4 mr-2" />
                Save Deal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}