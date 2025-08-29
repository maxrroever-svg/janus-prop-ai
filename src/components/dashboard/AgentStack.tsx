import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Triangle, 
  Hexagon, 
  Shield, 
  ChevronUp, 
  Circle, 
  Brain,
  Database,
  MapPin,
  Scale,
  MessageSquare,
  FileText,
  DollarSign,
  Target,
  Search,
  Zap
} from "lucide-react";

const agents = [
  {
    name: "Orion",
    fullName: "Orion (Market Scout)",
    icon: Search,
    description: "Foreclosure & distress monitoring, market scanning",
    status: "running",
    features: ["Foreclosure tracking", "Tax lien monitoring", "Market alerts", "Distress signals"],
    progress: 75
  },
  {
    name: "Eden", 
    fullName: "Eden (AI Coordinator)",
    icon: Brain,
    description: "Multi-agent orchestration & decision coordination",
    status: "running", 
    features: ["Agent coordination", "Strategy optimization", "Risk assessment", "Priority ranking"],
    progress: 90
  },
  {
    name: "Osiris",
    fullName: "Osiris (Underwriter)",
    icon: Hexagon,
    description: "Financial analysis, comps, ARV, rehab estimates",
    status: "done",
    features: ["Comp analysis", "ARV calculations", "Rehab estimates", "Cash flow projections"],
    progress: 100
  },
  {
    name: "Atelius",
    fullName: "Atelius (Legal)",
    icon: Scale, 
    description: "Title research, liens, zoning, legal compliance",
    status: "idle",
    features: ["Title verification", "Lien analysis", "Zoning compliance", "Legal risk assessment"],
    progress: 0
  },
  {
    name: "Celestia",
    fullName: "Celestia (Capital)",
    icon: DollarSign,
    description: "DSCR analysis, lender matching, rate optimization", 
    status: "idle",
    features: ["DSCR calculations", "Lender matching", "Rate analysis", "Financing optimization"],
    progress: 0
  },
  {
    name: "Valyria",
    fullName: "Valyria (Outreach)",
    icon: MessageSquare,
    description: "Owner contact, outreach automation, deal coordination",
    status: "idle",
    features: ["Owner identification", "Contact research", "Outreach templates", "Communication tracking"],
    progress: 0
  },
  {
    name: "Nexus",
    fullName: "Nexus (Data Ingestion)",
    icon: Database,
    description: "Multi-source data aggregation & processing",
    status: "running",
    features: ["MLS integration", "County records", "ATTOM data", "Public records"],
    progress: 65,
    dataStatus: {
      mls: "connected",
      attom: "syncing", 
      county: "error"
    }
  }
];

const statusColors = {
  idle: "bg-muted text-muted-foreground",
  running: "bg-warning/10 text-warning border-warning/20",
  done: "bg-success/10 text-success border-success/20", 
  error: "bg-destructive/10 text-destructive border-destructive/20"
};

const dataStatusColors = {
  connected: "bg-success/10 text-success border-success/20",
  syncing: "bg-warning/10 text-warning border-warning/20",
  error: "bg-destructive/10 text-destructive border-destructive/20"
};

interface AgentStackProps {
  runs: any[];
}

export function AgentStack({ runs }: AgentStackProps) {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="font-display text-lg text-foreground flex items-center gap-2">
          Agent Operations
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">LIVE</span>
          </div>
        </h2>
        <p className="text-sm text-muted-foreground">
          {agents.filter(a => a.status === 'running').length} running • {agents.filter(a => a.status === 'done').length} completed
        </p>
      </div>
      
      <div className="space-y-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isRunning = agent.status === 'running';
          
          return (
            <Card key={agent.name} className={`institutional-card p-4 transition-all duration-300 ${
              isRunning ? 'border-primary/30 bg-primary/5 animate-pulse' : ''
            }`}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-2 rounded-lg transition-all duration-300 ${
                    isRunning 
                      ? 'bg-primary/20 animate-[pulse_2s_ease-in-out_infinite]' 
                      : 'bg-secondary'
                  }`}>
                    <Icon className={`w-5 h-5 transition-all duration-300 ${
                      isRunning ? 'text-primary animate-[spin_3s_linear_infinite]' : 'text-primary'
                    }`} />
                  </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between mb-1">
                       <h3 className="font-medium text-foreground break-words pr-2 flex items-center gap-2">
                         {agent.name}
                         {isRunning && (
                           <div className="flex gap-1">
                             <div className="w-1 h-1 bg-primary rounded-full animate-[bounce_1s_infinite_0ms]"></div>
                             <div className="w-1 h-1 bg-primary rounded-full animate-[bounce_1s_infinite_150ms]"></div>
                             <div className="w-1 h-1 bg-primary rounded-full animate-[bounce_1s_infinite_300ms]"></div>
                           </div>
                         )}
                       </h3>
                       <Badge className={`${statusColors[agent.status as keyof typeof statusColors]} shrink-0 transition-all duration-300 ${
                         isRunning ? 'animate-[pulse_1.5s_ease-in-out_infinite]' : ''
                       }`}>
                         {agent.status}
                       </Badge>
                     </div>
                     <p className="text-xs text-muted-foreground mb-2 break-words leading-relaxed">{agent.description}</p>
                     
                     {agent.status === 'running' && (
                       <div className="space-y-2">
                         <div className="flex justify-between text-xs">
                           <span className="text-muted-foreground">Progress</span>
                           <span className="text-foreground font-medium animate-[fade-in_0.5s_ease-out]">{agent.progress}%</span>
                         </div>
                         <div className="relative">
                           <Progress value={agent.progress} className="h-2 transition-all duration-500" />
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[slide-in-right_2s_ease-in-out_infinite]"></div>
                         </div>
                       </div>
                     )}
                     
                     {agent.name === 'Nexus' && agent.dataStatus && (
                       <div className="space-y-2 mt-2">
                         <p className="text-xs font-medium text-foreground flex items-center gap-2">
                           Data Sources
                           {isRunning && <div className="w-1 h-1 bg-ice rounded-full animate-ping"></div>}
                         </p>
                         <div className="grid grid-cols-3 gap-1">
                           <Badge className={`${dataStatusColors[agent.dataStatus.mls]} text-xs justify-center px-1 py-0.5 truncate transition-all duration-300 ${
                             agent.dataStatus.mls === 'syncing' ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''
                           }`}>
                             MLS
                           </Badge>
                           <Badge className={`${dataStatusColors[agent.dataStatus.attom]} text-xs justify-center px-1 py-0.5 truncate transition-all duration-300 ${
                             agent.dataStatus.attom === 'syncing' ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''
                           }`}>
                             ATTOM
                           </Badge>
                           <Badge className={`${dataStatusColors[agent.dataStatus.county]} text-xs justify-center px-1 py-0.5 truncate transition-all duration-300 ${
                             agent.dataStatus.county === 'error' ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''
                           }`}>
                             County
                           </Badge>
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
                 
                 {agent.features && (
                   <div className="space-y-1">
                     <p className="text-xs font-medium text-foreground">Capabilities</p>
                     <div className="grid grid-cols-2 gap-1">
                       {agent.features.map((feature, idx) => (
                         <span 
                           key={idx}
                           className={`text-xs px-1.5 py-0.5 bg-secondary rounded border text-muted-foreground break-words text-center transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 ${
                             isRunning ? 'hover:scale-105' : ''
                           }`}
                           title={feature}
                         >
                           {feature.length > 12 ? feature.slice(0, 12) + '...' : feature}
                         </span>
                       ))}
                     </div>
                   </div>
                 )}
                 
                 <div className="grid grid-cols-2 gap-2">
                   <Button size="sm" variant="outline" className={`text-xs h-7 min-w-0 transition-all duration-200 hover:scale-105 ${
                     isRunning ? 'border-primary/30 text-primary hover:bg-primary/10' : ''
                   }`}>
                     Config
                   </Button>
                   <Button size="sm" variant="ghost" className={`text-xs h-7 min-w-0 transition-all duration-200 hover:scale-105 ${
                     isRunning ? 'text-primary hover:bg-primary/10' : ''
                   }`}>
                     Logs
                   </Button>
                 </div>
               </div>
             </Card>
           );
         })}
       </div>
       
       <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-ice/5 border border-primary/20 rounded-lg relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[slide-in-right_3s_ease-in-out_infinite]"></div>
         <p className="text-xs text-foreground italic relative z-10 flex items-center gap-2">
           <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
           "All agents coordinated through Eden's orchestration engine."
         </p>
       </div>
     </div>
   );
 }