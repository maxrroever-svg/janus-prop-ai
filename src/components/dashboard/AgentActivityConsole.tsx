import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Activity, 
  Bot, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Calculator, 
  FileText,
  TrendingUp,
  Database,
  Shield,
  Brain,
  GitBranch,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const agentIcons = {
  "Eden": Brain,
  "Orion": Search,
  "Atelius": Shield,
  "Osiris": Calculator,
  "Celestia": FileText,
  "Valyria": TrendingUp,
  "Spring": CheckCircle,
  "Elysia": Database,
  "Aurora": GitBranch
};

const agentColors = {
  "Eden": "text-gold",
  "Orion": "text-ice",
  "Atelius": "text-success",
  "Osiris": "text-warning",
  "Celestia": "text-ice",
  "Valyria": "text-gold",
  "Spring": "text-success",
  "Elysia": "text-ice",
  "Aurora": "text-gold"
};

const mockActivities = [
  {
    id: 1,
    agent: "Orion",
    message: "Analyzing 47 pre-foreclosure homes in Brooklyn...",
    status: "in-progress",
    timestamp: "Just now",
    details: "Scanning MLS data, court filings, and auction schedules for distressed properties across 15 zip codes"
  },
  {
    id: 2,
    agent: "Celestia",
    message: "Generated 3 new investment reports",
    status: "completed",
    timestamp: "2 min ago",
    details: "Created comprehensive analysis reports for properties on Oak Street, Maple Ave, and Pine Road with ROI projections"
  },
  {
    id: 3,
    agent: "Eden",
    message: "Completed deal ranking for 12 properties",
    status: "completed",
    timestamp: "5 min ago",
    details: "Evaluated investment potential using all agent signals and ranked opportunities by expected returns and risk profile"
  },
  {
    id: 4,
    agent: "Valyria",
    message: "Market forecast updated for Queens zip codes",
    status: "completed",
    timestamp: "8 min ago",
    details: "Analyzed migration patterns, rental demand trends, and price movement predictions for 23 neighborhoods"
  },
  {
    id: 5,
    agent: "Atelius",
    message: "Flagged legal risk on Pine Road property",
    status: "alert",
    timestamp: "12 min ago",
    details: "Discovered pending litigation that may affect property title - requires further investigation"
  },
  {
    id: 6,
    agent: "Osiris",
    message: "Financial modeling complete for 8 properties",
    status: "completed",
    timestamp: "15 min ago",
    details: "Projected cash flows, redemption windows, and yield forecasts with 89% accuracy confidence"
  },
  {
    id: 7,
    agent: "Elysia",
    message: "Data integration from Redfin and Zillow complete",
    status: "completed",
    timestamp: "18 min ago",
    details: "Enriched property database with 2,847 new records including market comparables and pricing history"
  },
  {
    id: 8,
    agent: "Spring",
    message: "Quality audit found 3 data inconsistencies",
    status: "alert",
    timestamp: "22 min ago",
    details: "Identified discrepancies in tax assessment data for Brooklyn properties - corrections in progress"
  },
  {
    id: 9,
    agent: "Aurora",
    message: "Coordinated analysis workflow for 15 new properties",
    status: "completed",
    timestamp: "25 min ago",
    details: "Orchestrated task distribution among all agents for incoming property batch from Manhattan district"
  },
  {
    id: 10,
    agent: "Orion",
    message: "Court filing monitoring detected new foreclosure filings",
    status: "completed",
    timestamp: "28 min ago",
    details: "Identified 8 new foreclosure cases in target neighborhoods with upcoming auction dates"
  }
];

export function AgentActivityConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [activities] = useState(mockActivities);
  
  const activeActivities = activities.filter(a => a.status === 'in-progress').length;
  const recentAlerts = activities.filter(a => a.status === 'alert').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Clock className="w-4 h-4 text-ice animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Bot className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <>
      {/* Floating Console Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-ice text-ice-foreground hover:bg-ice/90 shadow-lg z-50"
          >
            <div className="relative">
              <Activity className="w-6 h-6" />
              {(activeActivities > 0 || recentAlerts > 0) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 h-5 w-5 bg-gold rounded-full flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-gold-foreground">
                    {activeActivities + recentAlerts}
                  </span>
                </motion.div>
              )}
            </div>
          </Button>
        </SheetTrigger>

        <SheetContent className="w-96 bg-card border-l border-border">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-foreground">
              <Bot className="w-5 h-5 text-ice" />
              Agent Activity Console
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            {/* Activity Summary */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="bg-secondary border-border">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-ice">{activeActivities}</div>
                  <div className="text-xs text-muted-foreground">Active Tasks</div>
                </CardContent>
              </Card>
              <Card className="bg-secondary border-border">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-gold">{activities.filter(a => a.status === 'completed').length}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Feed */}
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {activities.map((activity, index) => {
                    const IconComponent = agentIcons[activity.agent as keyof typeof agentIcons];
                    const agentColor = agentColors[activity.agent as keyof typeof agentColors];
                    
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="bg-secondary border-border">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              {/* Agent Avatar */}
                              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center shrink-0">
                                <IconComponent className={`w-4 h-4 ${agentColor}`} />
                              </div>
                              
                              {/* Activity Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-foreground text-sm">
                                    {activity.agent}
                                  </span>
                                  {getStatusIcon(activity.status)}
                                  <span className="text-xs text-muted-foreground ml-auto">
                                    {activity.timestamp}
                                  </span>
                                </div>
                                
                                <p className="text-sm text-foreground mb-2">
                                  {activity.message}
                                </p>
                                
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {activity.details}
                                </p>
                                
                                {activity.status === 'in-progress' && (
                                  <div className="mt-3">
                                    <div className="w-full bg-muted rounded-full h-1.5">
                                      <motion.div
                                        className="bg-ice h-1.5 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "75%" }}
                                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </ScrollArea>

            {/* Console Actions */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-muted">
                  <Bot className="w-4 h-4 mr-2" />
                  Agent Settings
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-muted">
                  <Activity className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}