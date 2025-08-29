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
    if (score >= 85) return "score-high";
    if (score >= 70) return "score-medium"; 
    return "score-low";
  };

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: "bg-success/20 text-success border-success/30",
      medium: "bg-warning/20 text-warning border-warning/30", 
      high: "bg-destructive/20 text-destructive border-destructive/30"
    };
    return variants[risk as keyof typeof variants] || variants.medium;
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-normal">Live Deal Pipeline</h2>
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

      <Card className="data-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Investment Opportunities
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/30">
                  <TableHead className="w-[280px] min-w-[280px]">Property</TableHead>
                  <TableHead className="w-[100px] text-center">Janus Score</TableHead>
                  <TableHead className="w-[100px] text-center">Cap Rate</TableHead>
                  <TableHead className="w-[120px] text-center">Prediction</TableHead>
                  <TableHead className="w-[100px] text-center">Upside</TableHead>
                  <TableHead className="w-[300px] min-w-[300px]">AI Agent Analysis</TableHead>
                  <TableHead className="w-[120px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {filteredDeals.map((deal) => (
                  <TableRow 
                    key={deal.id} 
                    className="deal-row cursor-pointer"
                    onClick={() => onPropertySelect(deal)}
                  >
                    <TableCell className="w-[280px] min-w-[280px]">
                      <div className="space-y-1">
                        <div className="font-medium text-sm leading-tight break-words">
                          {deal.address}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 whitespace-nowrap">
                            <DollarSign className="w-3 h-3 flex-shrink-0" />
                            {deal.price}
                          </span>
                          <span className="flex items-center gap-1 whitespace-nowrap">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            {deal.rentEstimate}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="w-[100px] text-center">
                      <Badge className={`${getScoreColor(deal.lienScore)} font-mono text-xs`}>
                        {deal.lienScore}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="w-[100px] text-center">
                      <span className="font-mono text-success font-medium text-sm">
                        {deal.capRate}%
                      </span>
                    </TableCell>
                    
                    <TableCell className="w-[120px] text-center">
                      <div className={`text-sm ${getPredictionColor(deal.prediction)}`}>
                        {deal.prediction}
                      </div>
                    </TableCell>
                    
                    <TableCell className="w-[100px] text-center">
                      <div className="text-center">
                        <div className="font-semibold text-gold text-sm">
                          {deal.upside}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {deal.upsidePercent}%
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="w-[300px] min-w-[300px]">
                      <div className="space-y-1">
                        <Badge 
                          variant="outline" 
                          className="bg-primary/10 text-primary border-primary/30 text-xs"
                        >
                          {deal.strategy}
                        </Badge>
                        <div className="text-sm text-muted-foreground leading-relaxed break-words">
                          {deal.aiSummary}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="w-[120px]">
                      <div className="flex items-center justify-center gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
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
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Archive className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}