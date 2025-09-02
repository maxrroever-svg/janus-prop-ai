import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="h-full w-full relative bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${deal.imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      {!isFirst && (
        <button
          onClick={onPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40 bg-black/30 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/50 transition-all"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
      
      {!isLast && (
        <button
          onClick={onNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40 bg-black/30 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/50 transition-all"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-30">
        {/* Top Section - Rank Badge & Property Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              {/* Rank Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex"
              >
                <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/50 text-sm font-bold">
                  #{rank} Best Deal Today
                </Badge>
              </motion.div>
              
              <h1 className="text-2xl font-bold text-white leading-tight">
                {deal.address}
              </h1>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{deal.location}</span>
              </div>
              <Badge variant="outline" className="bg-black/30 text-white border-white/20">
                {deal.propertyType}
              </Badge>
            </div>
            
            <Badge className={`${getRiskColor(deal.riskRating)} border animate-pulse`}>
              {deal.riskRating.toUpperCase()} RISK
            </Badge>
          </div>

          {/* AI Summary */}
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start space-x-2">
              <Brain className="h-5 w-5 text-blue-400 mt-0.5 animate-pulse" />
              <p className="text-white text-sm leading-relaxed">
                {deal.aiSummary}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Middle Section - Metrics */}
        {showMetrics && (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Asking Price */}
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Asking</span>
                </div>
                <p className="text-lg font-bold text-white">{formatPrice(deal.askingPrice)}</p>
              </div>

              {/* ARV */}
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-wide">ARV</span>
                </div>
                <p className="text-lg font-bold text-white">{formatPrice(deal.arv)}</p>
              </div>

              {/* Cap Rate */}
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="h-4 w-4 text-purple-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Cap Rate</span>
                </div>
                <p className="text-lg font-bold text-white">{formatPercentage(deal.capRate)}</p>
              </div>

              {/* ROI */}
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-pulse" />
                <div className="relative">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Proj. ROI</span>
                  </div>
                  <p className="text-lg font-bold text-white">{formatPercentage(deal.roi)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Section - Action Buttons */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white border-0 h-12 text-sm font-medium"
              onClick={() => console.log("View Investment Memo")}
            >
              <Eye className="h-4 w-4 mr-2" />
              Investment Memo
            </Button>
            
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white border-0 h-12 text-sm font-medium"
              onClick={() => console.log("Underwrite with AI")}
            >
              <Brain className="h-4 w-4 mr-2" />
              Underwrite AI
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 h-12 text-sm font-medium"
              onClick={() => console.log("Contact Seller")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Seller
            </Button>
            
            <Button 
              variant="outline" 
              className={`backdrop-blur-sm border-white/20 h-12 text-sm font-medium transition-all ${
                isSaved 
                  ? "bg-red-600/20 border-red-500/30 text-red-400" 
                  : "bg-black/30 text-white hover:bg-white/10"
              }`}
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Save Deal"}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Hint - More Engaging */}
      <motion.div 
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/80 text-sm flex items-center space-x-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="h-4 w-4" />
        <span>Scroll for next deal</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </div>
  );
};