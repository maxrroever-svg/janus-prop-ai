import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Search, 
  Upload, 
  Filter,
  MapPin,
  DollarSign,
  Home,
  X,
  Settings
} from "lucide-react";

export type DealFeedMode = "feed" | "search" | "upload";

interface DealFeedControlsProps {
  mode: DealFeedMode;
  onModeChange: (mode: DealFeedMode) => void;
}

export const DealFeedControls = ({ mode, onModeChange }: DealFeedControlsProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    priceMin: "",
    priceMax: "",
    propertyType: "",
    riskLevel: ""
  });

  const modes = [
    { 
      id: "feed" as const, 
      label: "AI Feed", 
      icon: Zap, 
      description: "Curated by Janus AI" 
    },
    { 
      id: "search" as const, 
      label: "Search", 
      icon: Search, 
      description: "Manual filters" 
    },
    { 
      id: "upload" as const, 
      label: "Upload", 
      icon: Upload, 
      description: "Analyze your deal" 
    }
  ];

  return (
    <>
      {/* Mode Selector - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <div className="dashboard-surface backdrop-blur-md rounded-xl border border-border/30 p-2">
          <div className="flex space-x-1">
            {modes.map((modeOption) => {
              const Icon = modeOption.icon;
              const isActive = mode === modeOption.id;
              
              return (
                <Button
                  key={modeOption.id}
                  variant="ghost"
                  size="sm"
                  className={`
                    relative px-3 py-2 text-xs transition-all duration-200
                    ${isActive 
                      ? "text-foreground bg-primary/20 border-primary/30" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                    }
                  `}
                  onClick={() => onModeChange(modeOption.id)}
                >
                  <Icon className="h-4 w-4 mr-1.5" />
                  {modeOption.label}
                  
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-md"
                      layoutId="activeMode"
                      initial={false}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    />
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter Toggle - Top Left */}
      {mode === "search" && (
        <div className="absolute top-6 left-6 z-50">
          <Button
            variant="ghost"
            size="sm"
            className="dashboard-surface backdrop-blur-md border border-border/30 text-foreground hover:bg-accent/10"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {Object.values(filters).some(v => v) && (
              <Badge className="ml-2 bg-primary/20 text-primary border-primary/30 text-xs">
                Active
              </Badge>
            )}
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && mode === "search" && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 h-full w-80 dashboard-surface backdrop-blur-xl border-r border-border/30 z-40"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground glow-text">Search Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Brooklyn, Manhattan, etc."
                  className="w-full px-3 py-2 bg-background/80 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none backdrop-blur-sm"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Min"
                    className="px-3 py-2 bg-background/80 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-sm backdrop-blur-sm"
                    value={filters.priceMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="Max"
                    className="px-3 py-2 bg-background/80 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-sm backdrop-blur-sm"
                    value={filters.priceMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Property Type
                </label>
                <select
                  className="w-full px-3 py-2 bg-background/80 border border-border/50 rounded-lg text-foreground focus:border-primary/50 focus:outline-none backdrop-blur-sm"
                  value={filters.propertyType}
                  onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                >
                  <option value="">All Types</option>
                  <option value="Single Family">Single Family</option>
                  <option value="Multi Family">Multi Family</option>
                  <option value="Apartment Building">Apartment Building</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Mixed Use">Mixed Use</option>
                </select>
              </div>

              {/* Risk Level */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Risk Level</label>
                <div className="flex space-x-2">
                  {["low", "medium", "high"].map((risk) => (
                    <Button
                      key={risk}
                      variant="outline"
                      size="sm"
                      className={`
                        border-border/50 text-xs transition-all backdrop-blur-sm
                        ${filters.riskLevel === risk
                          ? "bg-primary/20 text-primary border-primary/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                        }
                      `}
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        riskLevel: prev.riskLevel === risk ? "" : risk 
                      }))}
                    >
                      {risk.charAt(0).toUpperCase() + risk.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/10 backdrop-blur-sm"
                onClick={() => setFilters({
                  location: "",
                  priceMin: "",
                  priceMax: "",
                  propertyType: "",
                  riskLevel: ""
                })}
              >
                Clear All Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Panel */}
      <AnimatePresence>
        {mode === "upload" && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 dashboard-surface backdrop-blur-xl z-40 flex items-center justify-center"
          >
            <div className="max-w-md w-full mx-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground glow-text">Upload Deal for Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Upload property documents, photos, or deals for AI analysis
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer backdrop-blur-sm">
                  <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-foreground text-sm">
                    Drop files here or click to browse
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>

                <Button className="w-full dashboard-card text-foreground hover:bg-accent/10 border border-border/30">
                  <Settings className="h-4 w-4 mr-2" />
                  Analyze with Janus AI
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};