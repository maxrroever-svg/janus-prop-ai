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

        <div className="relative">
          {/* Central Janus Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-white font-display text-lg font-bold"
              >
                JANUS
              </motion.div>
              
              {/* Pulsing rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border-2 border-primary/30 rounded-full"
                  style={{
                    width: `${150 + i * 30}px`,
                    height: `${150 + i * 30}px`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
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

          {/* Data Source Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {dataSources.map((source, index) => {
              const IconComponent = source.icon;
              const positions = [
                "md:-translate-x-8 md:-translate-y-8", // Top left
                "md:translate-x-8 md:-translate-y-8",  // Top right
                "md:-translate-x-8 md:translate-y-8",  // Bottom left
                "md:translate-x-8 md:translate-y-8"    // Bottom right
              ];
              
              return (
                <motion.div
                  key={source.name}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -100 : 100,
                    y: index < 2 ? -50 : 50
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`data-card relative ${positions[index]}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${source.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold">{source.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-success">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    Live Data Stream
                  </div>

                  {/* Animated connector line */}
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.3 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <svg className="w-full h-full">
                      <motion.path
                        d={`M ${index % 2 === 0 ? '100' : '0'} ${index < 2 ? '100' : '0'} L 50 50`}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                        animate={{ strokeDashoffset: [-10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Data Flow Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 text-lg">
              <span className="text-muted-foreground">Raw Data</span>
              <ArrowRight className="text-primary" />
              <span className="text-primary font-semibold">AI Processing</span>
              <ArrowRight className="text-primary" />
              <span className="text-success font-semibold">Investment Intelligence</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};