import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Home } from "lucide-react";
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

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Clean logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-12"
          >
            <div className="inline-flex items-center justify-center mb-8">
              <span className="font-display text-2xl text-foreground">Janus AI</span>
            </div>
          </motion.div>
          
          <h1 className="font-display text-5xl md:text-7xl font-normal mb-6 text-foreground leading-tight">
            The Real Estate
            <br />
            <span className="text-primary">Intelligence Engine</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          AI-powered insights for investors, homeowners, and institutions.
          <br />
          Transform property data into intelligent investment decisions.
        </motion.p>

        {/* Consumer and Investor Dashboards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <Link to="/consumer" className="group">
              <div className="p-8 border border-border/30 bg-background hover:border-primary/30 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Janus Consumer
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI-powered homebuying assistant with smart search, financing, and closing tools
                </p>
              </div>
            </Link>
            
            <Link to="/dashboard" className="group">
              <div className="p-8 border border-border/30 bg-background hover:border-primary/30 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-success/10 flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Janus Investor
                </h3>
                <p className="text-muted-foreground text-sm">
                  Professional real estate intelligence platform for investors and institutions
                </p>
              </div>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="btn-institutional text-base px-8 py-3 font-medium"
          >
            Schedule Demo
          </Button>
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