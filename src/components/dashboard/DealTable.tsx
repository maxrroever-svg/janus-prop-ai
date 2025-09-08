import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Eye, 
  Star, 
  Archive, 
  TrendingUp,
  MapPin,
  DollarSign
} from "lucide-react";

const mockDeals = [
  {
    id: 1,
    address: "1247 Atlantic Avenue, Brooklyn NY",
    lienScore: 87,
    capRate: 14.2,
    strategy: "Multi-Family",
    aiSummary: "Eden: High-confidence opportunity identified by Orion. Osiris projects 35% upside post-rehab.",
    prediction: "Strong Buy",
    upside: "$200k",
    upsidePercent: 31,
    risk: "low",
    price: "$650,000",
    rentEstimate: "$6,500/mo"
  },
  {
    id: 2,
    address: "156 MacDonough Street, Brooklyn NY", 
    lienScore: 82,
    capRate: 12.8,
    strategy: "Single Family",
    aiSummary: "Atelius flagged title issue. Valyria suggests 15% price reduction negotiation strategy.",
    prediction: "Buy w/ Conditions",
    upside: "$160k",
    upsidePercent: 38,
    risk: "medium",
    price: "$420,000",
    rentEstimate: "$4,300/mo"
  },
  {
    id: 3,
    address: "91-15 Corona Avenue, Queens NY",
    lienScore: 79,
    capRate: 13.5,
    strategy: "Multi-Family",
    aiSummary: "Orion detected foreclosure filing. Osiris confirms 22% below-market pricing opportunity.",
    prediction: "Urgent Buy",
    upside: "$140k",
    upsidePercent: 24,
    risk: "low", 
    price: "$580,000",
    rentEstimate: "$5,600/mo"
  },
  {
    id: 4,
    address: "1455 Webster Avenue, Bronx NY",
    lienScore: 75,
    capRate: 15.1,
    strategy: "Multi-Family",
    aiSummary: "Eden coordinated analysis shows strong cash flow. Celestia confirms favorable financing terms.",
    prediction: "Buy",
    upside: "$135k",
    upsidePercent: 35,
    risk: "low",
    price: "$385,000", 
    rentEstimate: "$4,000/mo"
  },
  {
    id: 5,
    address: "1567 Calle San Sebastián, San Juan PR",
    lienScore: 89,
    capRate: 18.7,
    strategy: "Single Family",
    aiSummary: "Exceptional ROI in emerging market. Valyria identified motivated seller with timeline pressure.",
    prediction: "Strong Buy",
    upside: "$100k",
    upsidePercent: 54,
    risk: "low",
    price: "$185,000",
    rentEstimate: "$2,700/mo"
  },
  {
    id: 6,
    address: "234 Avenida Ashford, San Juan PR",
    lienScore: 84,
    capRate: 16.9,
    strategy: "Multi-Family",
    aiSummary: "Osiris projects strong appreciation in luxury corridor. Below-market rent upside identified.",
    prediction: "Buy",
    upside: "$105k",
    upsidePercent: 33,
    risk: "medium",
    price: "$320,000",
    rentEstimate: "$4,500/mo"
  },
  {
    id: 7,
    address: "789 Calle Principal, Carolina PR",
    lienScore: 77,
    capRate: 17.2,
    strategy: "Single Family",
    aiSummary: "Orion found building permit opportunity. Eden suggests minor rehab for maximum value creation.",
    prediction: "Buy",
    upside: "$70k",
    upsidePercent: 42,
    risk: "low",
    price: "$165,000",
    rentEstimate: "$2,300/mo"
  },
  {
    id: 8,
    address: "456 Calle Degetau, Bayamón PR",
    lienScore: 81,
    capRate: 19.4,
    strategy: "Multi-Family",
    aiSummary: "Highest ROI in portfolio. Celestia confirms 95% LTV available. Valyria drafted initial offer.",
    prediction: "Strong Buy",
    upside: "$80k",
    upsidePercent: 41,
    risk: "low",
    price: "$195,000",
    rentEstimate: "$3,100/mo"
  }
];

interface DealTableProps {
  onPropertySelect: (property: any) => void;
}

export function DealTable({ onPropertySelect }: DealTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("lienScore");

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-success/10 text-success border-success/30";
    if (score >= 70) return "bg-gold/10 text-gold border-gold/30"; 
    return "bg-red-500/10 text-red-600 border-red-500/30";
  };

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: "bg-success/10 text-success border-success/30",
      medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30", 
      high: "bg-red-500/10 text-red-600 border-red-500/30"
    };
    return variants[risk as keyof typeof variants] || variants.medium;
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "Strong Buy": return "text-success font-semibold";
      case "Buy": return "text-ice font-medium";
      case "Buy w/ Conditions": return "text-yellow-600 font-medium";
      case "Urgent Buy": return "text-gold font-semibold animate-pulse";
      default: return "text-muted-foreground";
    }
  };

  const filteredDeals = mockDeals.filter(deal =>
    deal.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.strategy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-normal">Deal Pipeline</h2>
          <p className="text-muted-foreground mt-1">
            {filteredDeals.length} opportunities • Updated 3 minutes ago
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 bg-secondary/20 border-border/50"
            />
          </div>
          
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="institutional-card bg-success/5 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Strong Buys</p>
                <p className="text-xl font-semibold text-success">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="institutional-card bg-gold/5 border-gold/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gold" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Cap Rate</p>
                <p className="text-xl font-semibold text-gold">15.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="institutional-card bg-ice/5 border-ice/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-ice" />
              <div>
                <p className="text-sm text-muted-foreground">Markets</p>
                <p className="text-xl font-semibold text-ice">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="institutional-card bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Upside</p>
                <p className="text-xl font-semibold text-primary">$810K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simplified Deal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="institutional-card cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => onPropertySelect(deal)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1 truncate">{deal.address}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    <span>{deal.price}</span>
                  </div>
                </div>
                <Badge className={`${getScoreColor(deal.lienScore)} text-xs`}>
                  {deal.lienScore}
                </Badge>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cap Rate</span>
                  <span className="font-medium text-success">{deal.capRate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Upside</span>
                  <span className="font-medium text-gold">{deal.upside}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Risk Level</span>
                  <Badge variant="outline" className={`text-xs ${getRiskBadge(deal.risk)}`}>
                    {deal.risk}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <Badge variant="outline" className="text-xs">{deal.strategy}</Badge>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {deal.aiSummary}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-sm font-medium ${getPredictionColor(deal.prediction)}`}>
                  {deal.prediction}
                </div>
                
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPropertySelect(deal);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-gold/10 hover:text-gold"
                    onClick={(e) => e.stopPropagation()}
                  >
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