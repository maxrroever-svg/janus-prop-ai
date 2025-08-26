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
    address: "1247 Oak Street, Austin, TX",
    lienScore: 94,
    capRate: 12.4,
    strategy: "Buy-to-Hold",
    aiSummary: "Prime location with strong rental demand. Tax lien provides 35% discount to market value.",
    risk: "low",
    price: "$185,000",
    rentEstimate: "$2,100/mo"
  },
  {
    id: 2,
    address: "892 Pine Avenue, Houston, TX", 
    lienScore: 87,
    capRate: 10.8,
    strategy: "BRRRR",
    aiSummary: "Distressed property in gentrifying neighborhood. High renovation potential.",
    risk: "medium",
    price: "$145,000",
    rentEstimate: "$1,800/mo"
  },
  {
    id: 3,
    address: "3456 Elm Drive, Dallas, TX",
    lienScore: 76,
    capRate: 8.9,
    strategy: "Cap Rate Arbitrage",
    aiSummary: "Stable cash flow opportunity in established residential area.",
    risk: "low", 
    price: "$225,000",
    rentEstimate: "$2,400/mo"
  },
  {
    id: 4,
    address: "789 Maple Court, San Antonio, TX",
    lienScore: 91,
    capRate: 11.2,
    strategy: "Buy-to-Hold",
    aiSummary: "Recently renovated duplex with dual income streams. Owner motivated.",
    risk: "low",
    price: "$165,000", 
    rentEstimate: "$1,950/mo"
  },
  {
    id: 5,
    address: "555 Cedar Lane, Fort Worth, TX",
    lienScore: 68,
    capRate: 7.3,
    strategy: "Long-term Hold",
    aiSummary: "Growing suburban market with planned infrastructure improvements.",
    risk: "medium",
    price: "$198,000",
    rentEstimate: "$1,750/mo"
  },
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
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/30">
                <TableHead>Property</TableHead>
                <TableHead>Lien Score</TableHead>
                <TableHead>Cap Rate</TableHead>
                <TableHead>Strategy</TableHead>
                <TableHead>AI Summary</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow 
                  key={deal.id} 
                  className="deal-row cursor-pointer"
                  onClick={() => onPropertySelect(deal)}
                >
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{deal.address}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {deal.price}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {deal.rentEstimate}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={`${getScoreColor(deal.lienScore)} font-mono`}>
                      {deal.lienScore}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <span className="font-mono text-success font-medium">
                      {deal.capRate}%
                    </span>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className="bg-primary/10 text-primary border-primary/30"
                    >
                      {deal.strategy}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground truncate">
                      {deal.aiSummary}
                    </p>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
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
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="ghost"
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
        </CardContent>
      </Card>
    </div>
  );
}