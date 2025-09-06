import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for individual investors getting started",
      features: [
        "AI property analysis",
        "Market intelligence reports",
        "Basic deal screening",
        "Email support",
        "5 properties per month"
      ]
    },
    {
      name: "Growth",
      price: "$299",
      period: "/month",
      description: "For active investors scaling their portfolio",
      features: [
        "Everything in Starter",
        "Advanced AI agents",
        "Unlimited property analysis",
        "Priority support",
        "Custom market alerts",
        "Portfolio tracking"
      ]
    },
    {
      name: "Institutional",
      price: "Custom",
      period: "",
      description: "Enterprise-grade platform for institutional investors",
      features: [
        "Everything in Growth",
        "Dedicated AI agents",
        "White-label solutions",
        "Custom integrations",
        "24/7 dedicated support",
        "SLA guarantees"
      ]
    }
  ];

  return (
    <section id="pricing" className="professional-section">
      <div className="professional-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6 glow-text">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scale your real estate intelligence with plans designed for every investor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="institutional-card p-8 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-3">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </div>

                <div className="flex-1 mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-white mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full btn-professional"
                  variant={index === 1 ? "default" : "outline"}
                >
                  {plan.name === "Institutional" ? "Contact Sales" : "Get Started"}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};