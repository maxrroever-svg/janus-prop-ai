import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DealFeedCard } from "@/components/dashboard/DealFeedCard";
import { DealFeedControls } from "@/components/dashboard/DealFeedControls";
import { mockDeals } from "@/lib/seedData";

export type DealFeedMode = "feed" | "search" | "upload";

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

const DealFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [mode, setMode] = useState<DealFeedMode>("feed");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Transform mock deals into feed format
  useEffect(() => {
    const transformedDeals: Deal[] = mockDeals.map((deal, index) => ({
      id: deal.id,
      address: deal.address,
      location: `${deal.city}, ${deal.state}`,
      propertyType: deal.propertyType,
      askingPrice: deal.listPrice,
      arv: deal.arv || deal.listPrice * 1.25, // Use ARV if available, otherwise estimate
      capRate: 6.5 + Math.random() * 4, // Random cap rate 6.5-10.5%
      irr: 12 + Math.random() * 8, // Random IRR 12-20%
      roi: 15 + Math.random() * 10, // Random ROI 15-25%
      riskRating: index % 3 === 0 ? "low" : index % 3 === 1 ? "medium" : "high",
      aiSummary: generateAISummary(deal),
      imageUrl: `https://images.unsplash.com/photo-${1560518821 + index}?w=800&h=1200&fit=crop&crop=entropy&auto=format&q=80`,
      distressSignals: deal.distressSignals
    }));
    setDeals(transformedDeals);
  }, []);

  const generateAISummary = (deal: any): string => {
    const summaries = [
      `Undervalued ${deal.propertyType.toLowerCase()} in ${deal.city}, ${deal.state}. Needs ~$30k rehab. Projected 18% ROI in 12 months.`,
      `High-yield opportunity in ${deal.city}, ${deal.state}. Strong rental market. Estimated 22% IRR with value-add potential.`,
      `Distressed property with significant upside. ${deal.distressSignals[0]}. Perfect for experienced investors.`,
      `Prime location investment. Below market price due to motivated seller. Quick close opportunity.`,
      `Value-add play in emerging neighborhood. Recent comparable sales support strong ARV projections.`
    ];
    return summaries[Math.floor(Math.random() * summaries.length)];
  };

  const loadMoreDeals = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would fetch more deals from the API
    const newDeals = [...deals]; // For demo, just cycle through existing deals
    setDeals(prev => [...prev, ...newDeals.slice(0, 5)]);
    setIsLoading(false);
  }, [deals, isLoading]);

  const handleNext = useCallback(() => {
    if (currentIndex < deals.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    
    // Load more deals when approaching the end
    if (currentIndex >= deals.length - 3) {
      loadMoreDeals();
    }
  }, [currentIndex, deals.length, loadMoreDeals]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      handleNext();
    }
    if (isDownSwipe) {
      handlePrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious]);

  if (deals.length === 0) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading deals...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* Feed Controls */}
      <DealFeedControls mode={mode} onModeChange={setMode} />
      
      {/* Main Feed Container */}
      <div
        ref={containerRef}
        className="h-full w-full relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.6 
            }}
            className="absolute inset-0"
          >
            <DealFeedCard 
              deal={deals[currentIndex]} 
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={currentIndex === 0}
              isLast={currentIndex === deals.length - 1}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(10, deals.length) }).map((_, i) => (
            <div
              key={i}
              className={`h-1 w-6 rounded-full transition-all duration-300 ${
                i <= (currentIndex % 10) ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="text-white text-sm flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Loading more deals...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealFeed;