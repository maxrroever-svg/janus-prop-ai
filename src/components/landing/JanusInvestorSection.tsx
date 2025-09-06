import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Target, MapPin, Database, Users, Bot, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export const JanusInvestorSection = () => {
  const dustRef = useRef<HTMLCanvasElement | null>(null);
  const bandRef = useRef<HTMLElement | null>(null);

  // Render static dust once across the band (no animation)
  useEffect(() => {
    const c = dustRef.current, band = bandRef.current;
    if (!c || !band) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const r = band.getBoundingClientRect();
    const w = Math.max(1, Math.floor(r.width));
    const h = Math.max(1, Math.floor(r.height));

    c.width = w * DPR;
    c.height = h * DPR;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const n = Math.max(200, Math.floor((w * h) / 7500)); // slightly denser for investor band
    for (let i = 0; i < n; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const rad = Math.random() * 1.3 + 0.5;
      const a = 0.22 + 0.28 * Math.random();
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    }
  }, []);

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
    // Janus band with right-edge event horizon + static dust
    <section className="section band band--horizon relative overflow-hidden" id="investor" ref={bandRef as any}>
      {/* Static dust layer (blends via CSS) */}
      <canvas className="dust-canvas" ref={dustRef as any} aria-hidden="true" />

      <div className="container band-content relative z-10">
        {/* Heading / Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-display font-normal mb-4">
            Investors
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Committee-grade underwriting with adversarial review, portfolio fit checks, and one-tap memos — built for serious operators.
          </p>
        </motion.div>

        {/* Bloomberg chips (manual red/green via .up / .down) */}
        <div className="strip justify-center mb-12">
          <span className="chip">
            <span className="label">LTV</span>
            <span className="value num">64%</span>
            <span className="delta up num">+1%</span>
          </span>
          <span className="chip">
            <span className="label">CoC</span>
            <span className="value num">8.9%</span>
            <span className="delta up num">+0.3%</span>
          </span>
          <span className="chip">
            <span className="label">IRR(5y)</span>
            <span className="value num">17.2%</span>
            <span className="delta up num">+0.6%</span>
          </span>
          <span className="chip">
            <span className="label">DSCR</span>
            <span className="value num">1.32</span>
            <span className="delta down num">-0.01</span>
          </span>
        </div>

        {/* Features + Agents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 mb-14">
          {/* Features */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-display font-semibold mb-6">Investor Platform</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investorFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="glass p-6"
                >
                  <div className="p-3 rounded-full bg-[rgba(255,255,255,.08)] border border-[rgba(255,255,255,.12)] w-fit mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="opacity-90">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Agents */}
          <div className="space-y-8">
            <h3 className="text-2xl font-display font-semibold mb-6">Investment Agents</h3>
            <div className="glass p-6">
              <div className="space-y-3">
                {agents.map((agent, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.03)]"
                  >
                    <Bot className="w-4 h-4 text-[var(--up)]" />
                    <span className="text-sm">{agent}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h3 className="text-2xl font-display font-semibold mb-6 text-center">
            Investment Strategies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass p-4 flex items-center space-x-3"
              >
                <div className="w-2 h-2 rounded-full bg-white/70"></div>
                <span>{strategy}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="glass text-lg px-8 py-4"
            onClick={() => (window.location.href = "/dashboard")}
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Start Investing
          </Button>
        </motion.div>
      </div>
    </section>
  );
};