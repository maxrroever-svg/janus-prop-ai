import { motion } from "framer-motion";
import { Home, Search, Brain, DollarSign, FileText, Key, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const JanusConsumerSection = () => {
  const consumerFeatures = [
    {
      icon: Search,
      title: "Smart Property Search",
      description: "Natural language search powered by AI. Simply describe your dream home and watch our agents find it across all listings."
    },
    {
      icon: Brain,
      title: "Property Analysis Agent",
      description: "Comprehensive AI analysis including neighborhood insights, crime data, school ratings, and comparable properties."
    },
    {
      icon: DollarSign,
      title: "Financing Hub",
      description: "Instant pre-qualification, loan comparison, and automated underwriting with real-time approval status."
    },
    {
      icon: FileText,
      title: "One-Click Underwriting",
      description: "Advanced AI evaluates your financial profile and property details to provide instant underwriting decisions."
    },
    {
      icon: Key,
      title: "Digital Closing Room",
      description: "Streamlined closing process with document automation, e-signatures, and real-time transaction tracking."
    },
    {
      icon: Shield,
      title: "Ownership Protection",
      description: "Ongoing property monitoring, market value tracking, and automated insurance and maintenance coordination."
    }
  ];

  const agents = [
    "Lead Agent - Supervises and coordinates all activities",
    "Search Agent - Finds properties matching your criteria", 
    "Property Analysis Agent - Evaluates neighborhoods and comparables",
    "Underwriting Agent - Assesses financial qualification",
    "Financing Agent - Manages loan process and approvals",
    "Closing Agent - Handles documentation and closing process",
    "Ownership Agent - Monitors property post-purchase"
  ];

  return (
    <section className="professional-section relative overflow-hidden" id="consumer">
      <div className="star-field"></div>
      <div className="professional-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 glow-text">
            Janus Consumer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your personal real estate AI assistant. From search to closing and beyond, 
            our intelligent agents guide you through every step of homeownership.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Features Grid */}
          <div className="space-y-8">
            <h3 className="text-2xl font-display font-semibold glow-text-accent mb-8">
              Consumer Features
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {consumerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="institutional-card p-6 flex items-start space-x-4"
                >
                  <div className="p-3 rounded-full bg-primary/20 border border-primary/30">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Agents */}
          <div className="space-y-8">
            <h3 className="text-2xl font-display font-semibold glow-text-accent mb-8">
              AI Agent Network
            </h3>
            <div className="institutional-card p-8">
              <div className="space-y-4">
                {agents.map((agent, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50 border border-border/30"
                  >
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-foreground">{agent}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="btn-professional text-lg px-8 py-4"
            onClick={() => window.location.href = '/consumer'}
          >
            <Home className="mr-2 h-5 w-5" />
            Start Your Home Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
};