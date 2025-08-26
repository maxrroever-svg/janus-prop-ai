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
  ArrowRight,
  Target,
  Network,
  BarChart3,
  Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const agents = [
  {
    name: "Eden",
    role: "Lead Investment Strategist",
    description: "Evaluates properties for ROI, risk, and decision clarity",
    icon: Brain,
    delay: 0.1
  },
  {
    name: "Orion", 
    role: "Market Intelligence Scanner",
    description: "Tracks liens, auctions, and distress signals across counties",
    icon: Search,
    delay: 0.2
  },
  {
    name: "Atelius",
    role: "Legal Analyzer", 
    description: "Parses court documents, liens, and legal filings",
    icon: Scale,
    delay: 0.3
  },
  {
    name: "Osiris",
    role: "Financial Modeler",
    description: "Calculates yield, redemption timelines, and risk-adjusted returns", 
    icon: Calculator,
    delay: 0.4
  },
  {
    name: "Celestia",
    role: "Report Generator",
    description: "Writes investor-facing reports and AI-generated PDF memos",
    icon: FileText,
    delay: 0.5
  },
  {
    name: "Aurora", 
    role: "Workflow Orchestrator",
    description: "Manages coordination between agents and ensures task flow",
    icon: GitBranch,
    delay: 0.6
  },
  {
    name: "Valyria",
    role: "Market Forecaster",
    description: "Projects neighborhood trends, rental growth, and buyer activity",
    icon: TrendingUp,
    delay: 0.7
  },
  {
    name: "Elysia",
    role: "Data Integrator", 
    description: "Cleans and enriches public data sources for analysis",
    icon: Database,
    delay: 0.8
  },
  {
    name: "Spring",
    role: "Quality & Oversight",
    description: "Ensures output precision, error detection, and system resilience",
    icon: Shield,
    delay: 0.9
  }
];

const processSteps = [
  {
    step: "1",
    title: "Ingest",
    description: "We pull fragmented property records, lien filings, code violations, rent court cases, and auction lists — daily."
  },
  {
    step: "2", 
    title: "Analyze",
    description: "Each agent independently processes their domain — legal, financial, market, etc."
  },
  {
    step: "3",
    title: "Score", 
    description: "Properties are ranked for profitability, urgency, redemption risk, and investment fit."
  },
  {
    step: "4",
    title: "Forecast",
    description: "We predict price movement, competition, and cashflow outcomes across time horizons."
  },
  {
    step: "5",
    title: "Deliver",
    description: "Clear investment reports, daily alerts, PDF memos, and portfolio summaries."
  },
  {
    step: "6",
    title: "Feedback", 
    description: "User actions and results retrain the system. Janus gets smarter with every deal."
  }
];

const advantages = [
  {
    icon: Target,
    title: "Deepest Data Coverage",
    description: "We extract value from public documents no one else touches — liens, court filings, violations."
  },
  {
    icon: Network,
    title: "Autonomous Agent Architecture", 
    description: "Instead of scripts or static tools, we run a network of intelligent agents that cooperate."
  },
  {
    icon: BarChart3,
    title: "Investor-Grade Outputs",
    description: "You don't just get charts. You get buy/sell signals, reports, and real ROI models."
  },
  {
    icon: Zap,
    title: "Full Intelligence Loop",
    description: "Our system learns, scores, forecasts, and delivers — at scale — 24/7."
  }
];

export const IntelligenceSystemSection = () => {
  return (
    <section className="professional-section bg-background text-foreground">
      <div className="professional-container">
        {/* Headline Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Janus AI: The Real Estate Intelligence System
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with autonomous agents. Tuned for precision investing.
          </p>
        </motion.div>

        {/* Agent Grid */}
        <div className="mb-32">
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold mb-12 text-center text-foreground"
          >
            Our AI Agent Network
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => {
              const IconComponent = agent.icon;
              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: agent.delay }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="institutional-card h-full hover:border-accent/50 transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-accent/10 text-accent">
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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="institutional-card">
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
                
                {/* Arrow connector - hidden on last item */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-accent">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Janus Wins */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold mb-12 text-center text-foreground"
          >
            Why Janus Wins
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Card className="institutional-card h-full">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="p-3 rounded-lg bg-accent/10 text-accent shrink-0">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-xl mb-3 text-foreground">
                            {advantage.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {advantage.description}
                          </p>
                        </div>
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