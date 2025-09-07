import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const dustRef = useRef<HTMLCanvasElement | null>(null);

  // Lightweight dust field covering the whole merged band
  useEffect(() => {
    const c = dustRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let particles: {x:number;y:number;r:number;a:number;vx:number;vy:number;}[] = [];

    const resize = () => {
      const parent = c.parentElement!;
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      c.width = w * DPR;
      c.height = h * DPR;
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const n = Math.max(240, Math.floor((w * h) / 7000));
      particles = new Array(n).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.6,
        a: Math.random() * 0.35 + 0.25,
        vx: (Math.random() * 0.12 - 0.06),
        vy: (Math.random() * 0.12 - 0.06),
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }
      requestAnimationFrame(step);
    };

    resize();
    step();
    const ro = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    ro?.observe(c.parentElement!);
    window.addEventListener("resize", resize);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="janus janus-landing">
      {/* Fog (very subtle) */}
      <div id="fog" aria-hidden="true" />

      {/* Pinned bottom nebula */}
      <div id="nebula" aria-hidden="true" />

      {/* Header */}
      <header className="janus-header">
        <div className="row">
          <Link to="/" className="brand">Janus</Link>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#vision">Vision</a>
            <a href="#agents">Agents</a>
            <a href="#band">Dashboards</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
            <Link to="/consumer" className="glass cta" style={{marginLeft: "16px", padding: "8px 16px"}}>Consumer Dashboard</Link>
            <Link to="/investor" className="glass cta" style={{marginLeft: "8px", padding: "8px 16px"}}>Investor Dashboard</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="section">
          <div className="container">
            <div className="right-shift">
              <h1>AI for Real Estate, Without<br/>the Noise.</h1>
              <p>
                Janus runs every opportunity through an <b>agentic investment
                committee</b> — sourcing, comps, underwriting, risk, fit, and a
                final memo — so you act with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Thinner Bloomberg strip */}
        <section className="bstrip slim">
          <div className="container">
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
            <span className="chip">
              <span className="label">RISK FLAGS</span>
              <span className="value num">Low</span>
              <span className="delta up num">+</span>
            </span>
            <span className="chip">
              <span className="label">SPREAD</span>
              <span className="value num">$13.5k</span>
              <span className="delta up num">+$900</span>
            </span>
          </div>
        </section>

        {/* VISION */}
        <section id="vision" className="section">
          <div className="container">
            <div className="right-shift">
              <h2>Vision</h2>
              <p>
                Build the <b>agent-first</b> platform for real estate. Specialist
                agents — <em>Sourcing</em>, <em>Comps</em>, <em>Underwriter</em>,{" "}
                <em>Risk</em>, <em>Portfolio Fit</em>, <em>Critic</em> — produce
                evidence, challenge each other, and deliver a clean memo with a
                verdict: <span className="num">YES / REVISE / NO</span>. Every
                conclusion is cited and auditable.
              </p>
              <div style={{borderTop:"1px solid var(--hair)", margin:"28px 0"}} />
              <div className="features">
                <div className="feature"><div className="kicker">Explainable by Default</div><p>Every number is traceable to comps, assumptions, and sources. No black boxes.</p></div>
                <div className="feature"><div className="kicker">Risk-Aware</div><p>Flood, crime, HOA, title, permits — surfaced as gates with severity thresholds.</p></div>
                <div className="feature"><div className="kicker">Portfolio Fit</div><p>Your "box" enforced: metros, leverage, min DSCR/CoC, hold, and concentration.</p></div>
                <div className="feature"><div className="kicker">One-Tap Memo</div><p>Final IC memo with dissent, sensitivities, and conditions to close.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* AGENTS */}
        <section id="agents" className="section">
          <div className="container diagram">
            <div className="right-shift" style={{marginBottom:24}}>
              <h2>Agent Strategy</h2>
              <p>Sourcing → Comps → Underwrite → Risk → Portfolio Fit → Critic → Memo</p>
            </div>
            <svg viewBox="0 0 1000 260" role="img" aria-label="Agent Pipeline Diagram">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,.98)" />
                </marker>
              </defs>
              <text x="500" y="78" textAnchor="middle">Rent / ARV Band</text>
              <line className="lane" x1="80" y1="90" x2="920" y2="90" />
              <line className="lane" x1="80" y1="150" x2="920" y2="150" />
              <g>
                <circle className="node" cx="140" cy="150" r="2.6"/><text x="140" y="130" textAnchor="middle">Sourcing</text>
                <circle className="node" cx="260" cy="150" r="2.6"/><text x="260" y="130" textAnchor="middle">Comps</text>
                <circle className="node" cx="420" cy="150" r="2.6"/><text x="420" y="130" textAnchor="middle">Underwrite</text>
                <circle className="node" cx="560" cy="150" r="2.6"/><text x="560" y="130" textAnchor="middle">Risk</text>
                <circle className="node" cx="700" cy="150" r="2.6"/><text x="700" y="130" textAnchor="middle">Portfolio Fit</text>
                <circle className="node" cx="820" cy="150" r="2.6"/><text x="820" y="130" textAnchor="middle">Critic</text>
                <circle className="node" cx="900" cy="150" r="2.6"/><text x="900" y="130" textAnchor="middle">Memo</text>
              </g>
              <path className="flow" d="M140 150 L260 150" markerEnd="url(#arrow)"/>
              <path className="flow" d="M260 150 L420 150" markerEnd="url(#arrow)"/>
              <path className="flow" d="M420 150 L560 150" markerEnd="url(#arrow)"/>
              <path className="flow" d="M560 150 L700 150" markerEnd="url(#arrow)"/>
              <path className="flow" d="M700 150 L820 150" markerEnd="url(#arrow)"/>
              <path className="flow" d="M820 150 L900 150" markerEnd="url(#arrow)"/>
              <text x="500" y="178" textAnchor="middle">Cap • CoC • DSCR • IRR • Sensitivities</text>
              <line className="lane" x1="80" y1="210" x2="920" y2="210" />
              <text x="500" y="232" textAnchor="middle">Gates &amp; Conditions</text>
            </svg>
          </div>
        </section>

        {/* MERGED CONSUMER + INVESTOR — one big section with shared glow/dust */}
        <section id="band" className="band band--horizon">
          <div className="glowfield" aria-hidden="true" />
          <canvas ref={dustRef} className="dust-canvas" aria-hidden="true" />
          <div className="band-content container">
            <h2>Dashboards</h2>
            <p>
              Consumer &amp; Investor experiences share a single agentic core —
              plain-English scores, risk gates, and auditable memos for decisive action.
            </p>
            <div className="actions" style={{marginTop:18}}>
              <Link to="/consumer" className="cta glass">Enter Consumer</Link>
              <Link to="/investor" className="cta glass">Enter Investor</Link>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section">
          <div className="container">
            <div className="right-shift" style={{marginLeft:"auto", marginRight:"auto", textAlign:"center"}}>
              <h2>Pricing</h2>
              <p>Templates only — final pricing TBD.</p>
              <div className="actions" style={{marginTop:"1.2rem", justifyContent:"center", display:"flex", gap:"1rem"}}>
                <a className="cta glass" href="#contact">Consumer — Learn More</a>
                <a className="cta glass" href="#contact">Investors — Learn More</a>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations & Compliance */}
        <section className="section ic-slab">
          <div className="container">
            <div className="ic-grid">
              <div className="ic-item"><h3>Integrations</h3><p>MLS/assessor proxies, rental datasets, permit/title sources, FEMA flood, and alerts to email/SMS.</p></div>
              <div className="ic-item"><h3>Compliance</h3><p>Evidence objects stored with citations; guardrails on DSCR/CoC/risk. Exportable audit trail.</p></div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="container">
            <div className="right-shift" style={{marginLeft:"auto", marginRight:"auto", textAlign:"center"}}>
              <h2>Contact</h2>
              <p>Partnerships, pilots, or access:</p>
              <p style={{fontSize:"1.12rem"}}><a href="mailto:contact@janus.ai">contact@janus.ai</a></p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer links remain; nebula is pinned behind */}
      <footer>
        <div className="footer-wrap">
          <div className="footer-col"><h4>Resources</h4><a href="#safety">Safety</a><a href="#legal">Legal</a><a href="#security">Security</a><a href="#docs">Docs</a></div>
          <div className="footer-col"><h4>Company</h4><a href="#about">About</a><a href="#careers">Careers</a><a href="#news">News</a></div>
          <div className="footer-col"><h4>Products</h4><a href="#agents">Agents</a><Link to="/consumer">Consumer</Link><Link to="/investor">Investors</Link></div>
          <div className="footer-col"><h4>Access</h4><div className="access-badges"><span className="badge">Web</span><span className="badge">iOS</span><span className="badge">Android</span></div></div>
        </div>
        <div className="copyright">© 2025 Janus • All rights reserved</div>
      </footer>
    </div>
  );
}