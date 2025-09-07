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
      <style>{`
        /* Missing styles for landing page */
        /* Navigation - clean text links with proper underline positioning */
        .janus-landing .nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        .janus-landing .nav a {
          font-weight: 600;
          font-size: .96rem;
          position: relative;
          padding: 8px 0;
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-radius: 0 !important;
        }
        .janus-landing .nav a::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: 2px;
          height: 2px;
          background: linear-gradient(90deg, #8EC5FF, #C68CFF, #FF9E7A);
          transition: right .22s ease;
        }
        .janus-landing .nav a:hover::after,
        .janus-landing .nav a.is-active::after {
          right: 0;
        }
        .janus-landing .nav a:hover {
          text-decoration: none;
        }
        
        /* Bloomberg strip - clean like Hero/Vision sections */
        .janus-landing .bstrip {
          padding: clamp(56px,8vw,96px) 18px;
          position: relative;
          z-index: 1;
          background: transparent;
          border: none;
        }
        .janus-landing .bstrip .container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          align-items: center;
          max-width: var(--maxw);
          margin: 0 auto;
        }
        .janus-landing .bstrip .chip {
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          padding: 0;
          border: none;
          border-radius: 0;
          background: transparent;
          white-space: nowrap;
          font-size: 0.9rem;
        }
        
        .janus-landing .features {
          display: grid;
          gap: 16px;
          margin-top: 28px;
        }
        @media(min-width:900px) {
          .janus-landing .features {
            grid-template-columns: repeat(4,1fr);
          }
        }
        .janus-landing .feature .kicker {
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--primary);
        }
        
        .janus-landing .diagram svg {
          max-width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 0 12px rgba(255,255,255,.10));
        }
        .janus-landing .diagram .lane {
          stroke: rgba(255,255,255,.16);
          stroke-width: 1;
        }
        .janus-landing .diagram .node {
          fill: rgba(255,255,255,.98);
        }
        .janus-landing .diagram text {
          font: 600 13px "IBM Plex Sans";
          fill: rgba(255,255,255,.98);
        }
        .janus-landing .diagram .flow {
          stroke: rgba(245,248,255,.96);
          stroke-width: 1.9;
          filter: drop-shadow(0 0 6px rgba(255,255,255,.22));
        }
        
        .janus-landing .glowfield {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(240px 200px at 3% 6%, rgba(140,200,255,.12), transparent 72%),
            radial-gradient(260px 220px at 98% 12%, rgba(255,170,96,.10), transparent 74%),
            radial-gradient(220px 200px at 6% 96%, rgba(200,140,255,.10), transparent 70%),
            radial-gradient(240px 200px at 96% 92%, rgba(120,255,220,.08), transparent 70%);
          filter: blur(8px);
        }
        
        .janus-landing .ic-slab {
          border-top: 1px solid var(--hair);
          padding-top: 32px;
        }
        .janus-landing .ic-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          max-width: 980px;
          margin: 0 auto;
        }
        @media(min-width:900px) {
          .janus-landing .ic-grid {
            grid-template-columns: 1fr 1fr;
            column-gap: 24px;
          }
        }
        .janus-landing .ic-item h3 {
          margin-bottom: 8px;
        }
        
        .janus-landing footer {
          position: relative;
          z-index: 1;
          padding: 48px 24px 24px;
          border-top: 1px solid var(--hair);
          margin-top: 48px;
        }
        /* Twins section - one seamless section, no glow, no separator */
        .janus-landing .twins-section {
          position: relative;
          width: 100%;
          background: rgba(255,255,255,.02);
          overflow: hidden;
        }
        .janus-landing .twins-section .band {
          background: transparent !important;
          border: none !important;
        }
        .janus-landing .twins-section .dust-canvas {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: .55;
          mix-blend-mode: screen;
        }
        
        /* Nebula pinned to very bottom of website */
        .janus-landing footer {
          position: relative;
          z-index: 1;
          padding: 48px 24px 160px;
          border-top: 1px solid var(--hair);
          margin-top: 48px;
        }
        .janus-landing #nebula {
          position: fixed !important;
          left: 0; 
          right: 0; 
          bottom: 0;
          height: 140vh; 
          pointer-events: none; 
          z-index: -1;
          background:
            radial-gradient(60% 120% at 50% 122%, rgba(32,12,64,.95) 0%, rgba(0,0,0,0) 60%),
            radial-gradient(62% 122% at 50% 134%, rgba(8,26,96,.92) 0%, rgba(0,0,0,0) 70%),
            radial-gradient(64% 126% at 50% 146%, rgba(18,88,220,.78) 0%, rgba(0,0,0,0) 76%),
            radial-gradient(70% 136% at 50% 158%, rgba(0,235,255,.44) 0%, rgba(0,0,0,0) 82%),
            radial-gradient(78% 150% at 50% 170%, rgba(255,178,84,.48) 0%, rgba(0,0,0,0) 88%),
            radial-gradient(76% 146% at 50% 178%, rgba(212,96,255,.38) 0%, rgba(0,0,0,0) 90%);
          filter: blur(100px) saturate(155%);
          -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 12%, rgba(0,0,0,0) 58%);
          mask-image: linear-gradient(to top, rgba(0,0,0,1) 12%, rgba(0,0,0,0) 58%);
        }
        .janus-landing .footer-col h4 {
          margin-bottom: 12px;
          font-size: 1rem;
        }
        .janus-landing .footer-col a {
          display: block;
          margin-bottom: 8px;
          opacity: 0.8;
        }
        .janus-landing .footer-col a:hover {
          opacity: 1;
        }
        .janus-landing .access-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .janus-landing .badge {
          padding: 4px 8px;
          border: 1px solid var(--hair);
          border-radius: 4px;
          font-size: 0.8rem;
        }
        .janus-landing .copyright {
          text-align: center;
          opacity: 0.6;
          font-size: 0.9rem;
        }
        
        .janus-landing .footer-wrap {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          max-width: var(--maxw);
          margin: 0 auto 24px;
        }
        
        /* Top fog */
        .janus-landing #fog {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          height: 22vh;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(140% 200% at 50% -30%, rgba(255,255,255,.18), rgba(255,255,255,0) 58%),
            radial-gradient(110% 160% at 40% -20%, rgba(210,210,210,.12), rgba(210,210,210,0) 62%),
            radial-gradient(120% 180% at 60% -18%, rgba(200,200,200,.10), rgba(200,200,200,0) 64%);
          filter: blur(28px) saturate(103%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.5) 55%, rgba(0,0,0,0));
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,.5) 55%, rgba(0,0,0,0));
        }
      `}</style>
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
            <a href="#consumer">Consumer</a>
            <a href="#investor">Investor</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
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

        {/* CONSUMER + INVESTOR — one section, shared dust/light, no gap */}
        <section className="twins-section">
          <canvas ref={dustRef} className="dust-canvas" aria-hidden="true" />
          
          <div id="consumer" className="band band--horizon" style={{marginBottom: 0, paddingBottom: 'clamp(40px,6vh,80px)'}}>
            <div className="band-content container">
              <h2>Consumer</h2>
              <p>
                Plain-English deal scores with rationale; market rent and ARV bands; alerts when the thesis changes.
                Build a watchlist, set thresholds, and share a one-page memo from your phone.
              </p>
              <div className="actions" style={{marginTop:18}}>
                <Link to="/consumer" className="cta glass">Enter Dashboard</Link>
              </div>
            </div>
          </div>

          <div id="investor" className="band band--horizon" style={{marginTop: 0, paddingTop: 'clamp(40px,6vh,80px)'}}>
            <div className="band-content container">
              <h2>Investor</h2>
              <p>
                Committee-grade underwriting with adversarial review. Standardize BRRRR, value-add, and distressed
                strategies with confidence-weighted verdicts and auditable memos.
              </p>
              <div className="actions" style={{marginTop:18}}>
                <Link to="/investor" className="cta glass">Enter Dashboard</Link>
              </div>
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