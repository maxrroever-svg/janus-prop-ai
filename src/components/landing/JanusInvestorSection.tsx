import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Target, MapPin, Database, Users, Bot, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export const JanusInvestorSection = () => {
  const investorFeatures = [
    {
      icon: Target,
      title: "Deal Intelligence",
      description: "AI-powered deal sourcing and analysis with automated underwriting, market comparables, and risk assessment."
    },
    {
      icon: BarChart3,
      title: "Investment Plans",
      description: "Institutional-grade investment strategies from BRRRR to opportunistic distressed debt with AI execution guidance."
    },
    {
      icon: MapPin,
      title: "Market Intelligence",
      description: "Real-time market analytics, demographic trends, and predictive modeling for investment decision making."
    },
    {
      icon: Database,
      title: "Data Lake",
      description: "Comprehensive real estate data feeds, analytics, and business intelligence for informed investment decisions."
    },
    {
      icon: Users,
      title: "Lead Management", 
      description: "Automated lead generation, contact ranking, and outreach campaigns with AI-powered motivation scoring."
    },
    {
      icon: Building,
      title: "Portfolio Analytics",
      description: "Advanced portfolio tracking, performance metrics, and predictive analytics for optimal asset allocation."
    }
  ];

  const strategies = [
    "BRRRR Strategy - Buy, Rehab, Rent, Refinance, Repeat",
    "Pre-Foreclosure Acquisition - Distressed property sourcing",
    "Multifamily Value-Add - Repositioning and optimization",
    "Opportunistic Distressed Debt - Notes and tax liens",
    "Core-Plus Multifamily - Stable properties with upside",
    "Development Arbitrage - Land acquisition and development",
    "Short-Term Rental Yield Play - Tourism-focused properties",
    "Green Retrofit Strategy - ESG-focused improvements"
  ];

  const agents = [
    "Lead Agent - Orchestrates investment strategy execution",
    "Deal Sourcing Agent - Identifies and evaluates opportunities",
    "Market Analysis Agent - Provides real-time intelligence", 
    "Underwriting Agent - Conducts financial analysis",
    "Outreach Agent - Manages seller and broker relationships",
    "Portfolio Agent - Monitors and optimizes holdings"
  ];

  return (
    <section className="professional-section relative overflow-hidden" id="investor">
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
            Janus Investor
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Institutional-grade investment platform powered by AI. From deal sourcing 
            to portfolio management, our intelligent agents execute your investment strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Features Grid */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-display font-semibold glow-text-accent mb-8">
              Investor Platform
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investorFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="institutional-card p-6"
                >
                  <div className="p-3 rounded-full bg-primary/20 border border-primary/30 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Agents */}
          <div className="space-y-8">
            <h3 className="text-2xl font-display font-semibold glow-text-accent mb-8">
              Investment Agents
            </h3>
            <div className="institutional-card p-6">
              <div className="space-y-3">
                {agents.map((agent, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50 border border-border/30"
                  >
                    <Bot className="w-4 h-4 text-success" />
                    <span className="text-sm text-foreground">{agent}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Investment Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-display font-semibold glow-text-accent mb-8 text-center">
            Investment Strategies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="institutional-card p-4 flex items-center space-x-3"
              >
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground">{strategy}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            onClick={() => window.location.href = '/dashboard'}
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Start Investing
          </Button>
        </motion.div>
      </div>
    </section>
  );
};