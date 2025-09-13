import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SimplifiedDealTable } from "@/components/dashboard/SimplifiedDealTable";
import { DealMap } from "@/components/dashboard/DealMap";
import { ExplainPanel } from "@/components/dashboard/ExplainPanel";
import { AgentInsights } from "@/components/dashboard/AgentInsights";
import { PropertyAnalyzer } from "@/components/dashboard/PropertyAnalyzer";
import { useState } from "react";

const Deals = () => {
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [view, setView] = useState<'deals' | 'map' | 'analyzer'>('deals');

  const handlePropertySelect = (property: any) => {
    setSelectedDeal(property);
  };

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Deal Management" subtitle="View and manage active deals" />
        <main className="flex-1 overflow-y-auto">
          <div className="h-full flex flex-col">
            {/* Left Panel - Main Content */}
            <div className="flex-1 flex flex-col">
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
                    onClick={() => setView('analyzer')} 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === 'analyzer' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    Property Analysis
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
              
              {/* Content Area */}
              <div className="flex-1 p-6">
                {view === 'deals' ? (
                  <div className="w-full">
                    <SimplifiedDealTable onPropertySelect={handlePropertySelect} />
                  </div>
                ) : view === 'analyzer' ? (
                  <div className="w-full">
                    <PropertyAnalyzer />
                  </div>
                ) : (
                  <div className="w-full h-full min-h-[600px]">
                    <DealMap onDealSelect={setSelectedDeal} />
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Panel - Property Details ONLY WHEN SELECTED */}
            {selectedDeal && (
              <div className="w-96 shrink-0 border-l border-border bg-secondary/30 overflow-y-auto">
                <ExplainPanel deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Deals;