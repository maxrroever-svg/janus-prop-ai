import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-20">
      {/* Minimal background elements */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-success"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12"
        >
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold font-display text-foreground leading-tight tracking-tight">
              Janus AI
              <br />
              <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Real Estate Intelligence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed font-light">
              Autonomous AI agents that revolutionize real estate investment and home buying with 
              superhuman precision, instant analysis, and seamless execution.
            </p>
          </div>

          {/* Dual Platform Launch */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <Card className="institutional-card p-8 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-foreground mb-3">Janus Investor</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Institutional-grade investment platform with AI agents for deal sourcing, 
                      analysis, and portfolio management.
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full btn-gradient group-hover:scale-105 transition-transform"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Launch Platform
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <Card className="institutional-card p-8 cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Home className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-foreground mb-3">Janus Consumer</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Intelligent home buying assistant with AI-powered search, analysis, 
                      and closing support for individual buyers.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full border-2 group-hover:scale-105 transition-transform hover:border-accent hover:text-accent"
                    onClick={() => window.location.href = '/consumer'}
                  >
                    Start Searching
                    <Home className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success animate-pulse" />
            Trusted by institutional investors managing $2.4B+ in real estate assets
          </div>
        </motion.div>

        {/* Simple scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border border-primary/30 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-3 bg-primary/50 mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};