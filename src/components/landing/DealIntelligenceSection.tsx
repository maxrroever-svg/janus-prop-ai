import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye, Archive } from "lucide-react";

const mockDeals = [
  {
    address: "1247 Oak Street, Austin TX",
    lienScore: 94,
    capRate: "8.2%",
    strategy: "Buy-to-Hold",
    aiSummary: "Prime location, undervalued, strong rental demand",
    riskLevel: "low"
  },
  {
    address: "892 Pine Avenue, Dallas TX",
    lienScore: 87,
    capRate: "7.8%",
    strategy: "Cap Rate Arbitrage",
    aiSummary: "Distressed seller, quick flip opportunity",
    riskLevel: "medium"
  },
  {
    address: "456 Elm Drive, Houston TX",
    lienScore: 76,
    capRate: "6.9%",
    strategy: "Value-Add",
    aiSummary: "Renovation needed, high upside potential",
    riskLevel: "high"
  }
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "low": return "score-high";
    case "medium": return "score-medium";
    case "high": return "score-low";
    default: return "score-medium";
  }
};

export const DealIntelligenceSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Live Deal
            <br />
            <span className="bg-gradient-success bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time property analysis with AI-generated investment strategies
            and risk assessment
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="data-card"
        >
          {/* Table Header */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 border-b border-border/30 text-sm font-semibold text-muted-foreground">
            <div>Property Address</div>
            <div className="hidden md:block">Lien Score</div>
            <div className="hidden md:block">Cap Rate</div>
            <div className="hidden md:block">Strategy</div>
            <div>AI Summary</div>
            <div>Action</div>
          </div>

          {/* Table Rows */}
          {mockDeals.map((deal, index) => (
            <motion.div
              key={deal.address}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="deal-row grid grid-cols-2 md:grid-cols-6 gap-4 p-4 hover:bg-secondary/30 transition-all duration-200 group"
            >
              <div className="font-medium">
                {deal.address}
              </div>
              
              <div className="hidden md:block">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(deal.riskLevel)}`}>
                  {deal.lienScore}
                </span>
              </div>
              
              <div className="hidden md:flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 text-success" />
                {deal.capRate}
              </div>
              
              <div className="hidden md:block">
                <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                  {deal.strategy}
                </span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {deal.aiSummary}
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Archive className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}

          {/* Loading animation for more deals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="p-4 border-t border-border/30 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
              />
              AI analyzing 847 more properties...
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-gradient-primary text-lg px-8 py-6">
            Run Your Own Portfolio Analysis
          </Button>
        </motion.div>
      </div>
    </section>
  );
};