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
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Meet Your AI
            <br />
            <span className="bg-gradient-success bg-clip-text text-transparent">
              Agent Stack
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                className="data-card group hover:glow-primary transition-all duration-500"
                style={{ "--delay": `${index * 0.2}s` } as any}
              >
                <div className="flex items-center gap-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex-shrink-0 w-20 h-20 bg-gradient-primary rounded-xl flex items-center justify-center"
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-4">
                      {agent.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="agent-status running">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        Running
                      </div>
                      <span className="text-success font-semibold">
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
                    className="hidden md:block w-12 h-12 border-2 border-primary/30 rounded-full"
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