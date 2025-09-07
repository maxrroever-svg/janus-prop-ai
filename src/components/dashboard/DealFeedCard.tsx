import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  Target,
  Eye,
  Brain,
  Phone,
  Heart,
  ChevronUp,
  ChevronDown
} from "lucide-react";

interface Deal {
  id: string;
  address: string;
  location: string;
  propertyType: string;
  askingPrice: number;
  arv: number;
  capRate: number;
  irr: number;
  roi: number;
  riskRating: "low" | "medium" | "high";
  aiSummary: string;
  imageUrl: string;
  distressSignals: string[];
}

interface DealFeedCardProps {
  deal: Deal;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  rank: number;
}

export const DealFeedCard = ({ deal, onNext, onPrevious, isFirst, isLast, rank }: DealFeedCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showMetrics, setShowMetrics] = useState(true);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="h-full w-full relative bg-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${deal.imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </div>

      {/* Navigation Arrows */}
      {!isFirst && (
        <button
          onClick={onPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40 dashboard-card rounded-sm p-2 text-foreground hover:bg-white/15"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
      
      {!isLast && (
        <button
          onClick={onNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40 dashboard-card rounded-sm p-2 text-foreground hover:bg-white/15"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-30">
        {/* Top Section - Property Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              {/* Rank Badge */}
              <div className="inline-flex">
                <Badge className="bg-primary/20 text-primary border-primary/30 text-sm font-medium">
                  #{rank}
                </Badge>
              </div>
              
              <h1 className="font-display text-2xl font-bold text-foreground glow-text leading-tight">
                {deal.address}
              </h1>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{deal.location}</span>
              </div>
              <Badge variant="outline" className="dashboard-card text-foreground border-border/30">
                {deal.propertyType}
              </Badge>
            </div>
            
            <Badge className={`${getRiskColor(deal.riskRating)} border`}>
              {deal.riskRating.toUpperCase()} RISK
            </Badge>
          </div>

          {/* AI Summary */}
          <div className="dashboard-card rounded-lg p-4 border border-border/20">
            <div className="flex items-start space-x-2">
              <Brain className="h-4 w-4 text-primary mt-0.5" />
              <p className="text-foreground text-sm leading-relaxed">
                {deal.aiSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Middle Section - Metrics */}
        {showMetrics && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Asking Price */}
              <div className="dashboard-card rounded-lg p-3 border border-border/20">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Asking</span>
                </div>
                <p className="text-lg font-bold text-foreground">{formatPrice(deal.askingPrice)}</p>
              </div>

              {/* ARV */}
              <div className="dashboard-card rounded-lg p-3 border border-border/20">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">ARV</span>
                </div>
                <p className="text-lg font-bold text-foreground">{formatPrice(deal.arv)}</p>
              </div>

              {/* Cap Rate */}
              <div className="dashboard-card rounded-lg p-3 border border-border/20">
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Cap Rate</span>
                </div>
                <p className="text-lg font-bold text-foreground">{formatPercentage(deal.capRate)}</p>
              </div>

              {/* ROI */}
              <div className="dashboard-card rounded-lg p-3 border border-border/20">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Proj. ROI</span>
                </div>
                <p className="text-lg font-bold text-foreground">{formatPercentage(deal.roi)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section - Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 h-11 text-sm"
              onClick={() => console.log("View Investment Memo")}
            >
              <Eye className="h-4 w-4 mr-2" />
              Investment Memo
            </Button>
            
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 h-11 text-sm"
              onClick={() => console.log("Underwrite with AI")}
            >
              <Brain className="h-4 w-4 mr-2" />
              Underwrite AI
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="dashboard-card border-border/30 text-foreground hover:bg-white/15 h-11 text-sm"
              onClick={() => console.log("Contact Seller")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Seller
            </Button>
            
            <Button 
              variant="outline" 
              className={`dashboard-card border-border/30 h-11 text-sm ${
                isSaved 
                  ? "bg-destructive/20 border-destructive/40 text-destructive" 
                  : "text-foreground hover:bg-white/15"
              }`}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Save Deal"}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-muted-foreground text-xs flex items-center space-x-1">
        <ChevronDown className="h-3 w-3" />
        <span>Scroll for next</span>
        <ChevronDown className="h-3 w-3" />
      </div>
    </div>
  );
};