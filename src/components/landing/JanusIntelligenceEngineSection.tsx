import { motion } from "framer-motion";
import { 
  Brain, 
  Search, 
  Scale, 
  Calculator, 
  FileText, 
  GitBranch, 
  TrendingUp, 
  Database, 
  Shield,
  Target,
  Network,
  BarChart3,
  Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const agents = [
  {
    name: "Eden",
    role: "Executive Strategist", 
    description: "Makes ROI-based acquisition calls",
    icon: Brain
  },
  {
    name: "Orion",
    role: "Market Scanner",
    description: "Finds distressed or high-potential assets", 
    icon: Search
  },
  {
    name: "Atelius",
    role: "Legal Parser",
    description: "Reads liens, code violations, and court docs",
    icon: Scale
  },
  {
    name: "Osiris", 
    role: "Financial Modeler",
    description: "Forecasts returns, redemption risk, yield",
    icon: Calculator
  },
  {
    name: "Celestia",
    role: "Report Creator",
    description: "Writes investor-ready summaries",
    icon: FileText
  },
  {
    name: "Aurora",
    role: "Task Coordinator", 
    description: "Connects agents and times workflows",
    icon: GitBranch
  },
  {
    name: "Valyria",
    role: "Market Forecaster",
    description: "Predicts rent growth, demand, risk shifts",
    icon: TrendingUp
  },
  {
    name: "Elysia",
    role: "Data Integrator",
    description: "Prepares and links public and private data", 
    icon: Database
  },
  {
    name: "Spring",
    role: "Quality Control",
    description: "Ensures accuracy and fixes edge cases",
    icon: Shield
  }
];

const processSteps = [
  {
    step: "1",
    title: "Ingest",
    description: "Millions of liens, filings, and property records, pulled daily"
  },
  {
    step: "2",
    title: "Analyze", 
    description: "Agents interpret each signal independently"
  },
  {
    step: "3",
    title: "Score",
    description: "Investment potential is ranked by ROI, risk, timing"
  },
  {
    step: "4",
    title: "Forecast",
    description: "Neighborhood demand, redemption outcomes, rent"
  },
  {
    step: "5", 
    title: "Deliver",
    description: "Reports, alerts, and actionable insights"
  },
  {
    step: "6",
    title: "Feedback",
    description: "System learns with every action and user decision"
  }
];

const advantages = [
  {
    icon: Target,
    title: "We pull data no one else does — deep legal and municipal filings"
  },
  {
    icon: Network, 
    title: "We use a true AI agent architecture — modular and adaptive"
  },
  {
    icon: BarChart3,
    title: "We don't give dashboards. We give decisions."
  },
  {
    icon: Zap,
    title: "Every week, the system gets smarter."
  }
];

export const JanusIntelligenceEngineSection = () => {
  return (
    <section className="professional-section bg-background text-foreground">
      <div className="professional-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Janus AI: The Real Estate Intelligence Engine
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A system of autonomous agents built to think, reason, and execute like elite real estate investors.
          </p>
        </motion.div>

        {/* Agent Grid */}
        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => {
              const IconComponent = agent.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="h-full"
                >
                  <Card className="institutional-card h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-lg mb-1 text-foreground">
                            {agent.name}
                          </h4>
                          <p className="text-sm font-medium text-accent mb-2">
                            {agent.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {agent.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold mb-12 text-center text-foreground"
          >
            How Janus Works
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="institutional-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <h4 className="font-display font-bold text-xl text-foreground">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why We Win */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold mb-12 text-center text-foreground"
          >
            Why We Win
          </motion.h3>

          <div className="space-y-6">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="institutional-card">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="p-3 rounded-lg bg-accent/10 text-accent shrink-0">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {advantage.title}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};