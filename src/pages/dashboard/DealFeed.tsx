import { useState, useEffect, useRef, useCallback } from "react";
import { DealFeedCard } from "@/components/dashboard/DealFeedCard";
import { DealFeedControls } from "@/components/dashboard/DealFeedControls";
import { mockDeals } from "@/lib/seedData";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp } from "lucide-react";

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
  score?: number;
}

const DealFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [mode, setMode] = useState<DealFeedMode>("feed");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Transform mock deals into feed format - BEST DEALS FIRST
  useEffect(() => {
    const transformedDeals: Deal[] = mockDeals
      .map((deal, index) => ({
        id: deal.id,
        address: deal.address,
        location: `${deal.city}, ${deal.state}`,
        propertyType: deal.propertyType,
        askingPrice: deal.listPrice,
        arv: deal.arv || deal.listPrice * 1.25,
        capRate: 6.5 + Math.random() * 4,
        irr: 12 + Math.random() * 8,
        roi: 15 + Math.random() * 10,
        riskRating: (deal.score > 85 ? "low" : deal.score > 75 ? "medium" : "high") as "low" | "medium" | "high",
        aiSummary: generateAISummary(deal),
        imageUrl: `https://images.unsplash.com/photo-${1560518821 + index}?w=800&h=1200&fit=crop&crop=entropy&auto=format&q=80`,
        distressSignals: deal.distressSignals,
        score: deal.score
      }))
      // Sort by score (highest first) - BEST DEALS OF THE DAY
      .sort((a, b) => (b.score || 0) - (a.score || 0));
    
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

  // Simplified next/previous with wheel scrolling
  const handleNext = useCallback(() => {
    if (currentIndex < deals.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (currentIndex >= deals.length - 3) {
      loadMoreDeals();
    }
  }, [currentIndex, deals.length, loadMoreDeals]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // Simplified touch/wheel handlers
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 30) {
      handleNext();
    } else if (e.deltaY < -30) {
      handlePrevious();
    }
  }, [handleNext, handlePrevious]);

  // Touch handlers - simplified
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    const distance = touchStart - touchEnd;
    
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  // Keyboard + wheel navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevious();
      }
    };

    const feedContainer = containerRef.current;
    if (feedContainer) {
      feedContainer.addEventListener("wheel", handleWheel, { passive: false });
    }

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      if (feedContainer) {
        feedContainer.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious, handleWheel]);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col bg-black">
          {/* Header */}
          <div className="shrink-0 p-4 bg-black border-b border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <Brain className="h-5 w-5 text-accent" />
              <div>
                <h1 className="text-lg font-medium text-white">Deal Feed</h1>
                <p className="text-xs text-gray-400">AI-curated opportunities</p>
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
              Live
            </Badge>
          </div>

          {/* Main Feed */}
          <div className="flex-1 relative overflow-hidden">
            {deals.length === 0 ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-white text-xl">Loading best deals...</div>
              </div>
            ) : (
              <>
                {/* Feed Controls */}
                <DealFeedControls mode={mode} onModeChange={setMode} />
                
                {/* Deal Feed Container */}
                <div
                  ref={containerRef}
                  className="h-full w-full relative"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="absolute inset-0">
                    <DealFeedCard 
                      deal={deals[currentIndex]} 
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                      isFirst={currentIndex === 0}
                      isLast={currentIndex === deals.length - 1}
                      rank={currentIndex + 1}
                    />
                  </div>
                </div>

                {/* Deal Counter */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="bg-black/60 backdrop-blur-sm rounded px-3 py-1 border border-white/20">
                    <div className="text-white text-xs flex items-center space-x-2">
                      <span>#{currentIndex + 1} of {deals.length}</span>
                    </div>
                  </div>
                </div>

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                      <div className="text-white text-sm flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-400 border-t-transparent"></div>
                        <span>Finding more deals...</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DealFeed;