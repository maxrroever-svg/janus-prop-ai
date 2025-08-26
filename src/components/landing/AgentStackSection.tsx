import { motion } from "framer-motion";
import { Database, Search, Calculator, Target, BarChart3 } from "lucide-react";

const agents = [
  {
    name: "Data Sourcing Agent",
    description: "Ingests county records, MLS data, and public liens",
    stats: "425 Liens Ingested",
    icon: Database,
    animation: "slideLeft",
  },
  {
    name: "Enrichment Agent",
    description: "Enriches properties with rental comps and market data",
    stats: "89% Data Completeness",
    icon: Search,
    animation: "fadeUp",
  },
  {
    name: "Underwriting Agent",
    description: "Evaluates cash flow, cap rates, and investment returns",
    stats: "156 Properties Analyzed",
    icon: Calculator,
    animation: "slideRight",
  },
  {
    name: "Strategy Agent",
    description: "Recommends optimal investment strategies per property",
    stats: "12 Active Strategies",
    icon: Target,
    animation: "bounceIn",
  },
  {
    name: "Portfolio Optimizer",
    description: "Balances risk and return across your entire portfolio",
    stats: "$2.4M Portfolio Value",
    icon: BarChart3,
    animation: "scaleUp",
  },
];

const getAnimationVariants = (type: string) => {
  switch (type) {
    case "slideLeft":
      return {
        initial: { opacity: 0, x: -100 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8 }
      };
    case "slideRight":
      return {
        initial: { opacity: 0, x: 100 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8 }
      };
    case "fadeUp":
      return {
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
      };
    case "bounceIn":
      return {
        initial: { opacity: 0, scale: 0.3 },
        whileInView: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, type: "spring" as const, bounce: 0.5 }
      };
    case "scaleUp":
      return {
        initial: { opacity: 0, scale: 0.8 },
        whileInView: { opacity: 1, scale: 1 },
        transition: { duration: 0.8 }
      };
    default:
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.8 }
      };
  }
};

export const AgentStackSection = () => {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            Built with Modular
            <br />
            <span className="text-[hsl(var(--success))]">Intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Five specialized AI agents working in harmony to deliver
            institutional-grade real estate intelligence
          </p>
        </motion.div>

        <div className="space-y-8">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="institutional-card p-8 group"
              >
                <div className="flex items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-secondary border border-[hsl(var(--border))] flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-[hsl(var(--success))]" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {agent.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="ai-status-active inline-flex items-center gap-2 px-3 py-1 text-sm font-medium">
                        <div className="w-2 h-2 bg-[hsl(var(--success))] animate-pulse" />
                        Running
                      </div>
                      <span className="text-[hsl(var(--success))] font-medium">
                        {agent.stats}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ 
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className="hidden md:block w-12 h-12 border border-[hsl(var(--success))]/30"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};