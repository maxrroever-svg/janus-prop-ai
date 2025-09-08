import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { SmartSearch } from "@/components/consumer/SmartSearch";
import { Button } from "@/components/ui/button";

const Consumer = () => {
  console.log("Consumer component is rendering");
  const navigate = useNavigate();
  // static dust (draw once) for the top band
  const dustRef = useRef<HTMLCanvasElement | null>(null);
  const bandRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const c = dustRef.current;
    const band = bandRef.current;
    if (!c || !band) return;

    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const rect = band.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));

    c.width = w * DPR;
    c.height = h * DPR;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const n = Math.max(180, Math.floor((w * h) / 8000));
    for (let i = 0; i < n; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 1.3 + 0.5;
      const a = 0.22 + 0.28 * Math.random();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    }
  }, []);

  return (
    <SidebarProvider>
      <ConsumerSidebar />
      
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Fixed header */}
        <header className="h-16 flex items-center justify-between px-6 bg-background border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <a className="brand text-foreground font-display font-semibold" href="/">Janus</a>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="/#vision" className="text-muted-foreground hover:text-foreground transition-colors">Vision</a>
            <a href="/#agents" className="text-muted-foreground hover:text-foreground transition-colors">Agents</a>
            <a href="/consumer" className="text-accent-green font-medium">Consumer</a>
            <a href="/investor" className="text-muted-foreground hover:text-foreground transition-colors">Investors</a>
            <a href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto">
          {/* TOP BAND */}
          <section ref={bandRef as any} className="section band band--horizon glass border-b border-border/30" style={{ paddingTop: 48, paddingBottom: 48 }}>
            <canvas ref={dustRef as any} className="dust-canvas" aria-hidden="true" />
            <div className="container band-content">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">Consumer Dashboard</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real-time deal analysis, market bands, alerts when your thesis changes.
              </p>

              {/* Bloomberg metrics */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">DEAL SCORE</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">91</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+2.1</span>
                </span>
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">DSCR</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">1.28</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+0.03</span>
                </span>
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">CAP RATE</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">6.8%</span>
                  <span className="delta down num text-red-400 text-sm ml-1">-0.2%</span>
                </span>
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">RENT BAND</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">$1,780</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+15</span>
                </span>
              </div>
            </div>
          </section>

          {/* Dashboard content */}
          <div className="p-6">
            <SmartSearch />
            
            <div className="mt-6">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="font-display font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Consumer;