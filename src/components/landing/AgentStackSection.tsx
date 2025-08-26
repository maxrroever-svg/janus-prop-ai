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
    <section className="professional-section bg-background">
      <div className="professional-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            Built with Modular
            <br />
            <span className="terminal-green">Intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Five specialized AI agents working in harmony to deliver
            institutional-grade real estate intelligence
          </p>
        </motion.div>

        <div className="grid gap-8 md:gap-12">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            const variants = getAnimationVariants(agent.animation);
            
            return (
              <motion.div
                key={agent.name}
                {...variants}
                viewport={{ once: true }}
                className="terminal-panel p-8 group hover:shadow-[var(--shadow-terminal)] transition-all duration-500"
                style={{ "--delay": `${index * 0.2}s` } as any}
              >
                <div className="flex items-center gap-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 w-16 h-16 terminal-panel-contrast rounded-sm flex items-center justify-center"
                  >
                    <IconComponent className="w-8 h-8 terminal-green" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {agent.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-sm font-medium bg-[hsl(var(--terminal-green))]/10 text-[hsl(var(--terminal-green))] border border-[hsl(var(--terminal-green))]/20">
                        <div className="w-2 h-2 terminal-green-bg rounded-full animate-pulse" />
                        Running
                      </div>
                      <span className="terminal-green font-medium">
                        {agent.stats}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    className="hidden md:block w-12 h-12 border border-[hsl(var(--terminal-green))]/30 rounded-full"
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