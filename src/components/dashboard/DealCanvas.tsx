import { useState } from "react";
import { AgentStack } from "./AgentStack";
import { DealMap } from "./DealMap";
import { ExplainPanel } from "./ExplainPanel";
import { CommandBar } from "./CommandBar";
import { SimplifiedDealTable } from "./SimplifiedDealTable";
import { DecisionHistory } from "./DecisionHistory";

export function DealCanvas() {
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [agentRuns, setAgentRuns] = useState<any[]>([]);
  const [view, setView] = useState<'map' | 'deals'>('deals');

  const handleCommand = async (command: string) => {
    // TODO: Implement orchestrator logic
    console.log('Processing command:', command);
  };

  const handlePropertySelect = (property: any) => {
    setSelectedDeal(property);
  };

  return (
    <div className="h-full flex">
      {/* Left Panel - Agent Stack */}
      <div className="w-80 border-r border-border bg-secondary/30 flex flex-col">
        <AgentStack runs={agentRuns} />
      </div>
      
      {/* Center Panel - Deals Table or Map with Command Bar */}
      <div className="flex-1 flex flex-col">
        <CommandBar onCommand={handleCommand} />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setView('deals')} 
                className={`px-4 py-2 rounded-lg transition-colors ${view === 'deals' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
              >
                Deal Table
              </button>
              <button 
                onClick={() => setView('map')} 
                className={`px-4 py-2 rounded-lg transition-colors ${view === 'map' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
              >
                Map View
              </button>
            </div>
          </div>
          
          {view === 'deals' ? (
            <SimplifiedDealTable onPropertySelect={handlePropertySelect} />
          ) : (
            <DealMap onDealSelect={setSelectedDeal} />
          )}
        </div>
      </div>
      
      {/* Right Panel - Explain Panel and Decision History */}
      <div className="w-96 border-l border-border bg-secondary/30 flex flex-col">
        <div className="flex-1 border-b border-border overflow-hidden">
          <ExplainPanel deal={selectedDeal} />
        </div>
        <div className="h-80 overflow-hidden">
          <DecisionHistory />
        </div>
      </div>
    </div>
  );
}