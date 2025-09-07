import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleConsumerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Consumer button clicked, navigating to /consumer");
    navigate("/consumer");
  };

  const handleInvestorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Investor button clicked, navigating to /investor");
    navigate("/investor");
  };

  // Dust animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const STATIC = false;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, canvas.offsetWidth);
    const h = Math.max(1, canvas.offsetHeight);
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const particles: Array<{
      x: number;
      y: number;
      r: number;
      a: number;
      vx: number;
      vy: number;
    }> = [];
    const n = Math.max(320, Math.floor((w * h) / 8000));
    
    for (let i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        a: 0.12 + 0.22 * Math.random(),
        vx: STATIC ? 0 : (Math.random() - 0.5) * 0.08,
        vy: STATIC ? 0 : (Math.random() - 0.5) * 0.06
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (!STATIC) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }
      if (!STATIC) requestAnimationFrame(draw);
    }
    draw();
  }, []);

  return (
    <>
      <header className="janus-header">
        <div className="row">
          <a className="brand" href="/">Janus</a>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#vision">Vision</a>
            <a href="#agents">Agents</a>
            <a href="#consumer">Consumer</a>
            <a href="#investor">Investors</a>
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
              <p>Janus runs every opportunity through an <b>agentic investment committee</b> — sourcing, comps, underwriting, risk, fit, and a final memo — so you act with confidence.</p>
            </div>
          </div>
        </section>

        {/* Bloomberg strip (manual colors via classes) */}
        <section className="bstrip">
          <div className="container">
            <span className="bitem"><span className="label">DEAL SCORE</span><span className="value num">91</span><span className="delta up num">+2.1</span></span>
            <span className="bitem"><span className="label">DSCR</span><span className="value num">1.28</span><span className="delta up num">+0.03</span></span>
            <span className="bitem"><span className="label">CAP RATE</span><span className="value num">6.8%</span><span className="delta down num">-0.2%</span></span>
            <span className="bitem"><span className="label">RENT BAND</span><span className="value num">$1,780</span><span className="delta up num">+15</span></span>
            <span className="bitem"><span className="label">RISK FLAGS</span><span className="value num">Low</span><span className="delta up num">+</span></span>
            <span className="bitem"><span className="label">SPREAD</span><span className="value num">$13.5k</span><span className="delta up num">+$900</span></span>
          </div>
        </section>

        {/* VISION */}
        <section id="vision" className="section">
          <div className="container">
            <div className="right-shift reveal">
              <h2>Vision</h2>
              <p>Build the <b>agent-first</b> platform for real estate. Specialist agents — <em>Sourcing</em>, <em>Comps</em>, <em>Underwriter</em>, <em>Risk</em>, <em>Portfolio Fit</em>, <em>Critic</em> — produce evidence, challenge each other, and deliver a clean memo with a verdict: <span className="num">YES / REVISE / NO</span>. Every conclusion is cited and auditable.</p>
            </div>
            <div style={{borderTop:'1px solid var(--hair)',margin:'28px 0'}}></div>
            <div className="features reveal">
              <div className="feature"><div className="kicker">Explainable by Default</div><p>Every number is traceable to comps, assumptions, and sources. No black boxes.</p></div>
              <div className="feature"><div className="kicker">Risk-Aware</div><p>Flood, crime, HOA, title, permits — surfaced as gates with severity thresholds.</p></div>
              <div className="feature"><div className="kicker">Portfolio Fit</div><p>Your "box" enforced: metros, leverage, min DSCR/CoC, hold, and concentration.</p></div>
              <div className="feature"><div className="kicker">One-Tap Memo</div><p>Final IC memo with dissent, sensitivities, and conditions to close.</p></div>
            </div>
          </div>
        </section>

        {/* AGENTS */}
        <section id="agents" className="section">
          <div className="container diagram">
            <div className="right-shift" style={{marginBottom:'24px'}}>
              <h2>Agent Strategy</h2>
              <p>Sourcing → Comps → Underwrite → Risk → Portfolio Fit → Critic → Memo</p>
            </div>
            <svg viewBox="0 0 1000 260" role="img" aria-label="Agent Pipeline Diagram">
              <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,.98)"></path></marker></defs>
              <text x="500" y="78" textAnchor="middle">Rent / ARV Band</text>
              <line className="lane" x1="80" y1="90" x2="920" y2="90"/>
              <line className="lane" x1="80" y1="150" x2="920" y2="150"/>
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
              <line className="lane" x1="80" y1="210" x2="920" y2="210"/>
              <text x="500" y="232" textAnchor="middle">Gates &amp; Conditions</text>
            </svg>
          </div>
        </section>

        {/* Band with RIGHT-SIDE glow + dust */}
        <section className="twins">
          <div className="horizon" aria-hidden="true"></div>
          <canvas ref={canvasRef} className="twins-canvas" aria-hidden="true"></canvas>

          <section id="consumer" className="band">
            <div className="inner">
              <h2>Consumer</h2>
              <p>Plain-English deal scores with rationale; market rent and ARV bands; alerts when the thesis changes. Build a watchlist, set thresholds (<span className="num">DSCR≥1.25</span>, <span className="num">Cap≥6%</span>), and share a one-page memo from your phone.</p>
              <div className="actions">
                <a className="cta glass" href="/consumer">
                  Enter Dashboard
                </a>
              </div>
            </div>
          </section>

          <section id="investor" className="band">
            <div className="inner">
              <h2>Investors</h2>
              <p>Committee-grade underwriting with adversarial review. Standardize BRRRR, value-add, and distressed: <span className="num">Cap • CoC • DSCR • IRR</span>, risk gates (flood/HOA/title), conditions to close, and a confidence-weighted verdict.</p>
              <div style={{marginTop:'10px',display:'flex',gap:'1.25rem',flexWrap:'wrap',justifyContent:'center'}}>
                <span className="bitem"><span className="label">LTV</span><span className="value num">64%</span><span className="delta up num">+1%</span></span>
                <span className="bitem"><span className="label">CoC</span><span className="value num">8.9%</span><span className="delta up num">+0.3%</span></span>
                <span className="bitem"><span className="label">IRR(5y)</span><span className="value num">17.2%</span><span className="delta up num">+0.6%</span></span>
                <span className="bitem"><span className="label">DSCR</span><span className="value num">1.32</span><span className="delta down num">-0.02</span></span>
              </div>
              <div className="actions" style={{marginTop:'14px'}}>
                <a className="cta glass" href="/investor">
                  Enter Dashboard
                </a>
              </div>
            </div>
          </section>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section">
          <div className="container">
            <div className="right-shift" style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>
              <h2>Pricing</h2>
              <p>Templates only — final pricing TBD.</p>
              <div className="actions" style={{marginTop:'1.2rem',justifyContent:'center'}}>
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
            <div className="right-shift" style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>
              <h2>Contact</h2>
              <p>Partnerships, pilots, or access:</p>
              <p style={{fontSize:'1.12rem'}}><a href="mailto:contact@janus.ai">contact@janus.ai</a></p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-wrap">
          <div className="footer-col"><h4>Resources</h4><a href="#safety">Safety</a><a href="#legal">Legal</a><a href="#security">Security</a><a href="#docs">Docs</a></div>
          <div className="footer-col"><h4>Company</h4><a href="#about">About</a><a href="#careers">Careers</a><a href="#news">News</a></div>
          <div className="footer-col"><h4>Products</h4><a href="#agents">Agents</a><a href="/consumer">Consumer</a><a href="/investor">Investors</a></div>
          <div className="footer-col"><h4>Access</h4><div className="access-badges"><span className="badge">Web</span><span className="badge">iOS</span><span className="badge">Android</span></div></div>
        </div>
        <div className="copyright">© 2025 Janus • All rights reserved</div>
        <div id="nebula" aria-hidden="true"></div>
      </footer>
    </>
  );
};

export default LandingPage;