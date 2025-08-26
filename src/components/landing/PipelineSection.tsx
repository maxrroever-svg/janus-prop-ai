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
    <section className="py-32 px-6 bg-gradient-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Real-Time Data
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Pipeline
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch as raw data flows through our intelligence engine,
            emerging as actionable investment insights
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Janus Core - Fixed overlap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="w-24 h-24 terminal-panel flex items-center justify-center relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="terminal-green font-display text-sm font-bold"
              >
                JANUS
              </motion.div>
              
              {/* Pulsing rings - reduced size to prevent overlap */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-[hsl(var(--terminal-green))]/30 rounded-full"
                  style={{
                    width: `${100 + i * 20}px`,
                    height: `${100 + i * 20}px`,
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Data Source Cards - Bloomberg Terminal style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {dataSources.map((source, index) => {
              const IconComponent = source.icon;
              
              return (
                <motion.div
                  key={source.name}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -60 : 60,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="terminal-panel p-6 relative"
                  style={{ marginBottom: index >= 2 ? '3rem' : '0' }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 terminal-panel-contrast rounded-sm flex items-center justify-center">
                      <IconComponent className={`w-5 h-5 ${source.color.replace('text-', 'text-[hsl(var(--')}.replace(')', '))')]')}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-[hsl(var(--terminal-text))]">{source.name}</h3>
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
            className="text-center terminal-panel p-6"
          >
            <div className="flex items-center justify-center gap-4 text-lg">
              <span className="text-[hsl(var(--terminal-text))]">Raw Data</span>
              <ArrowRight className="terminal-green" />
              <span className="terminal-green font-semibold">AI Processing</span>
              <ArrowRight className="terminal-green" />
              <span className="text-[hsl(var(--terminal-text))] font-semibold">Investment Intelligence</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};