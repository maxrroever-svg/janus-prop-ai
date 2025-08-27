import { useState } from "react";
import { SmartFilters } from "./SmartFilters";
import { MapListView } from "./MapListView";
import { PropertyPreview } from "./PropertyPreview";
import { AgentActivityConsole } from "./AgentActivityConsole";

export function MainDashboard() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const handlePropertySelect = (property: any) => {
    setSelectedProperty(property);
  };

  return (
    <section className="bg-background">
      <div className="h-screen flex">
        {/* Left Panel - Smart Filters */}
        <SmartFilters />
        
        {/* Center Panel - Map & List Toggle */}
        <MapListView onPropertySelect={handlePropertySelect} />
        
        {/* Right Panel - Property Preview & AI Insight */}
        <PropertyPreview property={selectedProperty} />
        
        {/* Floating Agent Activity Console */}
        <AgentActivityConsole />
      </div>
    </section>
  );
}