import { useState } from "react";
import { DealMap } from "./DealMap";
import { ExplainPanel } from "./ExplainPanel";
import { CommandBar } from "./CommandBar";
import { SimplifiedDealTable } from "./SimplifiedDealTable";

export function DealCanvas() {
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [view, setView] = useState<'deals' | 'map'>('deals');

  const handleCommand = async (command: string) => {
    // Orchestrator logic for AI command processing
    console.log('Processing AI command:', command);
    // Future implementation: Send command to Eden AI orchestrator
  };

  const handlePropertySelect = (property: any) => {
    setSelectedDeal(property);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Command Bar */}
      <div className="shrink-0 border-b border-border">
        <CommandBar onCommand={handleCommand} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
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
          
          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {view === 'deals' ? (
                <SimplifiedDealTable onPropertySelect={handlePropertySelect} />
              ) : (
                <DealMap onDealSelect={setSelectedDeal} />
              )}
            </div>
          </div>
        </div>
        
        {/* Right Panel - Property Details */}
        <div className="w-96 shrink-0 border-l border-border bg-secondary/30 overflow-hidden">
          <ExplainPanel deal={selectedDeal} />
        </div>
      </div>
    </div>
  );
}