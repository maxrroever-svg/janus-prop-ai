import React, { useEffect, useRef } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { SmartSearch } from "@/components/consumer/SmartSearch";
import { Button } from "@/components/ui/button";

const Consumer = () => {
  console.log("Consumer component is rendering");
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
    <div className="janus janus-dashboard">
        <SidebarProvider>
          {/* Remove conflicting backgrounds to keep matte black */}
          <div className="min-h-screen w-full flex">
            <ConsumerSidebar />

            {/* MAIN COLUMN */}
            <div className="flex-1 flex flex-col relative z-10">
              {/* Sticky transparent header (logo left, nav right) */}
              <header className="janus-header">
                <div className="row">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger />
                    <a className="brand" href="/">Janus</a>
                  </div>
                  <nav className="nav">
                    <a href="/">Home</a>
                    <a href="/#vision">Vision</a>
                    <a href="/#agents">Agents</a>
                    <a href="/consumer" className="is-active">Consumer</a>
                    <a href="/investor">Investors</a>
                    <a href="/#pricing">Pricing</a>
                    <a href="/#contact">Contact</a>
                  </nav>
                </div>
              </header>

              {/* TOP BAND: right-edge event horizon + static dust + Bloomberg strip */}
              <section ref={bandRef as any} className="section band band--horizon" style={{ paddingTop: 48, paddingBottom: 48 }}>
                <canvas ref={dustRef as any} className="dust-canvas" aria-hidden="true" />
                <div className="container band-content">
                  <h2>Consumer Dashboard</h2>
                  <p className="prose" style={{ margin: "8px auto 0" }}>
                    Real-time deal analysis, market bands, alerts when your thesis changes.
                  </p>

                  {/* Bloomberg micro-metrics (manual red/green via .up / .down) */}
                  <div className="strip" style={{ marginTop: 14, justifyContent: "center" }}>
                    <span className="chip">
                      <span className="label">DEAL SCORE</span>
                      <span className="value num">91</span>
                      <span className="delta up num">+2.1</span>
                    </span>
                    <span className="chip">
                      <span className="label">DSCR</span>
                      <span className="value num">1.28</span>
                      <span className="delta up num">+0.03</span>
                    </span>
                    <span className="chip">
                      <span className="label">CAP RATE</span>
                      <span className="value num">6.8%</span>
                      <span className="delta down num">-0.2%</span>
                    </span>
                    <span className="chip">
                      <span className="label">RENT BAND</span>
                      <span className="value num">$1,780</span>
                      <span className="delta up num">+15</span>
                    </span>
                  </div>
                </div>
              </section>

              {/* YOUR EXISTING DASHBOARD CONTENT */}
              <main className="flex-1 p-6">
                <SmartSearch />

                {/* Example: keep your CTA to home if you like */}
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    onClick={() => (window.location.href = "/")}
                    className="font-display text-lg font-semibold hover:text-white"
                  >
                    Back to Home
                  </Button>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
    </div>
  );
};

export default Consumer;