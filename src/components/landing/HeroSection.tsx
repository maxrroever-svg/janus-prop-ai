import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Target } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-primary/5 to-background" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-12 h-12 text-primary" />
            </motion.div>
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-8 h-8 text-success" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Target className="w-8 h-8 text-warning" />
            </motion.div>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6">
            The Real Estate
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Intelligence Engine
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          Janus AI transforms raw property data into investable intelligence.
          <br />
          Built for institutional investors who demand precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-primary text-lg px-8 py-6">
              Launch Demo
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            Watch Intelligence Flow
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-sm text-muted-foreground"
        >
          Trusted by institutional investors managing $2.4B+ in real estate assets
        </motion.div>
      </div>
    </section>
  );
};