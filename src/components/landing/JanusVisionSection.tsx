import { motion } from "framer-motion";
import { Brain, Zap, Target, Globe, TrendingUp, Sparkles } from "lucide-react";

export const JanusVisionSection = () => {
  const visionPoints = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze millions of data points to uncover hidden opportunities and predict market trends."
    },
    {
      icon: Zap,
      title: "Real-Time Execution",
      description: "Lightning-fast processing and automated workflows enable instant decision-making and rapid deal execution."
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Sophisticated algorithms identify the perfect properties, sellers, and investment opportunities tailored to your specific criteria."
    },
    {
      icon: Globe,
      title: "Comprehensive Coverage",
      description: "Access nationwide property data, market intelligence, and investment opportunities across all asset classes."
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast market movements, property values, and investment returns with unprecedented accuracy."
    },
    {
      icon: Sparkles,
      title: "Autonomous Operations",
      description: "AI agents work 24/7 to source deals, conduct analysis, and manage your entire investment pipeline."
    }
  ];

  return (
    <section className="professional-section relative overflow-hidden">
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
            The Future of Real Estate Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Janus AI revolutionizes real estate investing with autonomous agents, 
            predictive analytics, and comprehensive market intelligence. Our platform 
            empowers both consumers and investors to make smarter decisions faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="institutional-card p-8 text-center group"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-all duration-300">
                  <point.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                {point.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="institutional-card p-12">
            <h3 className="text-3xl font-display font-bold mb-6 glow-text-accent">
              One Platform, Infinite Possibilities
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From first-time homebuyers to institutional investors, Janus AI adapts 
              to your needs with specialized workflows, intelligent agents, and 
              real-time market insights that drive results.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};