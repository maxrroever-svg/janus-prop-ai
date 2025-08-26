import { motion } from "framer-motion";
import { FileText, Home, DollarSign, MapPin, ArrowRight } from "lucide-react";

const dataSources = [
  { name: "County Tax Records", icon: FileText, color: "text-primary" },
  { name: "MLS Listings", icon: Home, color: "text-success" },
  { name: "Rental Databases", icon: DollarSign, color: "text-warning" },
  { name: "Public Liens", icon: MapPin, color: "text-destructive" },
];

export const PipelineSection = () => {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl text-foreground mb-6">
            Real-Time Data
            <br />
            <span className="terminal-green">
              Pipeline
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch as raw data flows through our intelligence engine,
            emerging as actionable investment insights
          </p>
        </motion.div>

        {/* Central Hub - Fixed positioning and size */}
        <div className="relative mb-20">
          <div className="flex justify-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="terminal-panel p-6 w-32 h-32 flex items-center justify-center relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="terminal-green font-display text-sm font-bold"
              >
                JANUS
              </motion.div>
              
              {/* Controlled pulsing rings */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-[hsl(var(--terminal-green))]/20 rounded-full pointer-events-none"
                  style={{
                    width: `${140 + i * 24}px`,
                    height: `${140 + i * 24}px`,
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.1, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.8,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Data Source Cards - Properly spaced grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {dataSources.map((source, index) => {
              const IconComponent = source.icon;
              
              return (
                <motion.div
                  key={source.name}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -60 : 60,
                    y: 20
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="terminal-data-panel p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 terminal-panel-contrast rounded-sm flex items-center justify-center">
                      <IconComponent className="w-5 h-5 terminal-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground font-display">{source.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm terminal-green">
                    <div className="w-2 h-2 terminal-green-bg rounded-full animate-pulse" />
                    Live Data Stream
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Data Flow Animation - Bloomberg style */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="text-center terminal-panel p-8"
          >
            <div className="flex items-center justify-center gap-6 text-lg flex-wrap">
              <span className="text-muted-foreground font-display">Raw Data</span>
              <ArrowRight className="terminal-green" />
              <span className="terminal-green font-semibold font-display">AI Processing</span>
              <ArrowRight className="terminal-green" />
              <span className="text-foreground font-semibold font-display">Investment Intelligence</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};