import { useState } from "react";
import { SmartFilters } from "./SmartFilters";
import { MapListView } from "./MapListView";
import { PropertyPreview } from "./PropertyPreview";
import { PropertyDetailView } from "./PropertyDetailView";
import { DecisionHistory } from "./DecisionHistory";

import { AgentModules } from "./AgentModules";

export function MainDashboard() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [detailProperty, setDetailProperty] = useState<any>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  const handlePropertySelect = (property: any) => {
    setSelectedProperty(property);
  };

  const handlePropertyDetail = (property: any) => {
    setDetailProperty(property);
    setIsDetailViewOpen(true);
  };

  return (
    <section className="glass">
      <div className="h-screen flex">
        {/* Left Panel - Smart Filters & Agent Modules */}
        <div className="w-80 flex flex-col">
          <div className="flex-1">
            <SmartFilters />
          </div>
          <div className="h-80 border-t border-border">
            <AgentModules />
          </div>
        </div>
        
        {/* Center Panel - Map & List Toggle */}
        <MapListView 
          onPropertySelect={handlePropertySelect}
          onPropertyDetail={handlePropertyDetail}
        />
        
        {/* Right Panel - Property Preview & Decision History */}
        <div className="w-96 flex flex-col">
          <div className="flex-1">
            <PropertyPreview property={selectedProperty} />
          </div>
          <div className="h-80 border-t border-border">
            <DecisionHistory />
          </div>
        </div>


        {/* Property Detail Modal */}
        <PropertyDetailView
          property={detailProperty}
          open={isDetailViewOpen}
          onClose={() => setIsDetailViewOpen(false)}
        />
      </div>
    </section>
  );
}