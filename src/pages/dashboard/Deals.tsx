import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SimplifiedDealTable } from "@/components/dashboard/SimplifiedDealTable";
import { DealMap } from "@/components/dashboard/DealMap";
import { ExplainPanel } from "@/components/dashboard/ExplainPanel";
import { AgentInsights } from "@/components/dashboard/AgentInsights";
import { useState } from "react";

const Deals = () => {
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [view, setView] = useState<'deals' | 'map'>('deals');

  const handlePropertySelect = (property: any) => {
    setSelectedDeal(property);
  };

  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 flex overflow-hidden">
            {/* Left Panel - Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Agent Insights Section */}
              <div className="shrink-0 p-6 border-b border-border bg-secondary/20">
                <AgentInsights />
              </div>
              
              {/* View Toggle */}
              <div className="shrink-0 p-4 border-b border-border bg-secondary/30">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setView('deals')} 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === 'deals' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    Deal Table
                  </button>
                  <button 
                    onClick={() => setView('map')} 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === 'map' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    Map View
                  </button>
                </div>
              </div>
              
              {/* Content Area - NO HORIZONTAL SCROLLING */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="p-6 w-full">
                  {view === 'deals' ? (
                    <div className="w-full max-w-none">
                      <SimplifiedDealTable onPropertySelect={handlePropertySelect} />
                    </div>
                  ) : (
                    <div className="w-full h-full">
                      <DealMap onDealSelect={setSelectedDeal} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Panel - Property Details ONLY WHEN SELECTED */}
            {selectedDeal && (
              <div className="w-96 shrink-0 border-l border-border bg-secondary/30 overflow-hidden">
                <ExplainPanel deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Deals;