import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Eye, 
  Star, 
  TrendingUp,
  MapPin,
  DollarSign
} from "lucide-react";

const mockDeals = [
  {
    id: 1,
    address: "1247 Atlantic Avenue",
    city: "Brooklyn, NY",
    lienScore: 87,
    capRate: 14.2,
    strategy: "Multi-Family",
    aiSummary: "High-confidence opportunity with 35% upside post-rehab",
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
    aiSummary: "Title issue flagged, negotiate 15% price reduction",
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
    aiSummary: "Foreclosure filing detected, 22% below-market pricing",
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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredDeals = mockDeals.filter(deal =>
    deal.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.strategy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-normal">Active Opportunities</h2>
          <p className="text-muted-foreground text-sm">
            {filteredDeals.length} high-priority deals • Updated 3 min ago
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-48 bg-secondary/20 border-border/50"
            />
          </div>
          
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="institutional-card cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => onPropertySelect(deal)}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base font-medium mb-1 truncate">
                    {deal.address}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{deal.city}</span>
                  </div>
                </div>
                <Badge className={getScoreColor(deal.lienScore)}>
                  {deal.lienScore}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Price</span>
                  <p className="font-medium">{deal.price}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Cap Rate</span>
                  <p className="font-medium text-success">{deal.capRate}%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">{deal.strategy}</Badge>
                  <span className={`text-sm ${getPredictionColor(deal.prediction)}`}>
                    {deal.prediction}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {deal.aiSummary}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-muted-foreground">Upside</span>
                  <p className="font-semibold text-gold">{deal.upside}</p>
                </div>
                
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}