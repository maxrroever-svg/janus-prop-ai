import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const dustRef = useRef<HTMLCanvasElement | null>(null);

  // Simplified scrollspy with robust error handling
  useEffect(() => {
    // Wait for DOM to be fully ready
    const timer = setTimeout(() => {
      console.log('Initializing scrollspy...');
      
      const links = document.querySelectorAll('.landing .nav a[href^="#"]');
      console.log('Found navigation links:', links.length);
      
      if (links.length === 0) {
        console.warn('No navigation links found');
        return;
      }

      const updateActive = () => {
        try {
          const scrollY = window.scrollY + 100; // offset for header
          let activeId = 'home'; // default

          // Check each section
          const sections = ['home', 'vision', 'agents', 'consumer', 'investor', 'pricing', 'contact'];
          
          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const elementTop = window.scrollY + rect.top;
              
              if (elementTop <= scrollY) {
                activeId = sectionId;
              }
            }
          }

          // Update active state
          links.forEach((link: Element) => {
            const href = link.getAttribute('href');
            const isActive = href === `#${activeId}`;
            link.classList.toggle('active', isActive);
          });
          
        } catch (error) {
          console.error('Scrollspy error:', error);
        }
      };

      // Initial update
      updateActive();

      // Listen to scroll
      const handleScroll = () => {
        requestAnimationFrame(updateActive);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', updateActive, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', updateActive);
      };
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Dust effect implementation from the refined HTML
  useEffect(() => {
    const host = document.getElementById('twins');
    if (!host) return;
    
    const c = dustRef.current;
    if (!c) return;
    
    const ctx = c.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, P: Array<{x:number;y:number;r:number;a:number;vx:number;vy:number}> = [];

    function size() {
      const r = host.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      c.width = w * DPR;
      c.height = h * DPR;
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      
      const n = Math.max(260, Math.floor((w * h) / 6000));
      P = new Array(n).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + .6,
        a: Math.random() * .40 + .25,
        vx: (Math.random() * .12 - .06),
        vy: (Math.random() * .12 - .06)
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of P) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;
        if (p.y < -12) p.y = h + 12;
        if (p.y > h + 12) p.y = -12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    size();
    frame();
    window.addEventListener('resize', size, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(size).observe(host);

    return () => {
      window.removeEventListener('resize', size);
    };
  }, []);

  // Client-side routing handler from the refined HTML
  useEffect(() => {
    function go(href: string) {
      // Since we're using React Router, this will be handled by Link components
      window.location.href = href;
    }
    
    const handleClick = (e: Event) => {
      const a = (e.target as Element).closest('a[data-route]') as HTMLAnchorElement;
      if (!a) return;
      e.preventDefault();
      go(a.getAttribute('data-route') || a.getAttribute('href') || '');
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <style>{`
        /* ===========================================================
           JANUS Landing — Perfect Front Page (scoped)
           =========================================================== */
        :root { color-scheme: dark }

        .landing{
          /* tokens */
          --bg:#000; --white:#fff; --hair:rgba(255,255,255,.12);
          --up:#00DC96; --down:#FF6969; --primary:#CFE2FF;
          --maxw:1120px; --prose:980px;
          background:var(--bg); color:var(--white);
          -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
        }

        /* ——— Base ——— */
        .landing *{ box-sizing:border-box }
        .landing a{ color:var(--white); text-decoration:none }
        .landing a:hover{ text-decoration:underline; text-underline-offset:6px }
        .landing ::selection{ background:rgba(255,255,255,.18); color:#000 }
        .landing :where(h1,h2,h3,h4,h5,h6,p,li,small,span,em,strong,nav,button,label,div,section,footer,header,svg text){
          color:var(--white)!important; -webkit-text-fill-color:var(--white);
        }
        .landing svg text{ fill:#fff }

        /* ——— Type ——— */
        .landing h1{ font-family:"GFS Didot",serif; font-weight:400; letter-spacing:.0025em; line-height:1.02;
          font-size:clamp(3.0rem,6.2vw,4.8rem); margin:0 0 18px }
        .landing h2{ font-family:"GFS Didot",serif; font-weight:400; letter-spacing:.003em; line-height:1.08;
          font-size:clamp(2.3rem,3.9vw,3.2rem); margin:0 0 12px }
        .landing h3{ font-family:"GFS Didot",serif; font-weight:400; font-size:clamp(1.15rem,1.6vw,1.35rem); margin:0 0 12px }
        .landing p, .landing li, .landing small, .landing span, .landing nav, .landing button, .landing input, .landing textarea, .landing select{
          font-family:"IBM Plex Sans", system-ui, sans-serif;
        }
        .landing p{ margin:0 0 16px; line-height:1.66 }
        .landing .num{ font-family:"IBM Plex Mono", monospace }
        .landing .prose{ max-width:var(--prose) }

        /* ——— Structure ——— */
        .landing .section{ padding:clamp(60px,8vw,96px) 16px; position:relative; z-index:1 }
        .landing .container{ max-width:var(--maxw); margin:0 auto }
        .landing .right-shift{ max-width:var(--prose); margin-left:auto; margin-right:0; text-align:left }
        .landing #home .right-shift p,
        .landing #vision .right-shift p{ font-size:clamp(1.10rem,1.4vw,1.28rem); opacity:.98 }

        /* ——— Header (transparent, sticky, no boxes) ——— */
        .landing .header{
          position:sticky; top:0; left:0; right:0; z-index:40;
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 16px; background:transparent; border:none; box-shadow:none;
        }
        .landing .brand{ font-family:"GFS Didot",serif; font-size:1.2rem; letter-spacing:.02em }
        .landing .nav{ display:flex; gap:1.1rem; align-items:center; margin-left:auto }
        .landing .nav a{ font-weight:600; letter-spacing:.01em; font-size:.98rem; position:relative; padding-bottom:6px }
        .landing .nav a::after{
          content:""; position:absolute; left:0; right:100%; bottom:0; height:2px;
          background:linear-gradient(90deg,#8EC5FF,#C68CFF,#FF9E7A); transition:right .22s ease;
        }
        .landing .nav a:hover::after, .landing .nav a.active::after{ right:0 }

        /* ——— Bloomberg strip (thinner) ——— */
        .landing .bstrip{ 
          border-top:1px solid var(--hair); border-bottom:1px solid var(--hair); padding:8px 0;
          background: #000;
        }
        .landing .bstrip .container{ display:flex; align-items:center; justify-content:center; gap:1rem; max-width:none; flex-wrap:wrap }
        .landing .bitem{ 
          display:inline-flex; align-items:baseline; gap:.5rem; line-height:1.2;
          padding:.4rem .6rem; border-radius:6px; transition:all .2s ease;
        }
        .landing .bitem.positive{ background:rgba(0,220,150,.12); border:1px solid rgba(0,220,150,.2) }
        .landing .bitem.negative{ background:rgba(255,105,105,.12); border:1px solid rgba(255,105,105,.2) }
        .landing .bitem.neutral{ background:rgba(207,226,255,.08); border:1px solid rgba(207,226,255,.15) }
        .landing .bitem .label{ letter-spacing:.02em; opacity:.92; font-size:.78rem; text-transform:uppercase }
        .landing .bitem .value{ font-weight:700; color:var(--primary) }
        .landing .bitem.positive .value{ color:var(--up) }
        .landing .bitem.negative .value{ color:var(--down) }
        .landing .bitem .delta{ font-family:"IBM Plex Mono"; font-size:.9rem; font-weight:600 }
        .landing .bitem .delta.up{ color:var(--up)!important }   /* green */
        .landing .bitem .delta.down{ color:var(--down)!important }/* red   */

        /* ——— Features grid ——— */
        .landing .features{ display:grid; gap:16px; margin-top:28px }
        @media (min-width:900px){ .landing .features{ grid-template-columns:repeat(4,1fr) } }
        .landing .feature .kicker{ font:700 1rem "IBM Plex Sans" }

        /* ——— Agent diagram (glossy) ——— */
        .landing .diagram svg{ max-width:100%; height:auto; display:block; filter:drop-shadow(0 0 12px rgba(255,255,255,.10)) }
        .landing .diagram .lane{ stroke:rgba(255,255,255,.16); stroke-width:1 }
        .landing .diagram .node{ fill:rgba(255,255,255,.98) }
        .landing .diagram text{ font:600 13px "IBM Plex Sans"; fill:rgba(255,255,255,.98) }
        .landing .diagram .flow{
          stroke:rgba(245,248,255,.96); stroke-width:1.9; marker-end:url(#arrow);
          filter:drop-shadow(0 0 6px rgba(255,255,255,.22))
        }

        /* ——— ONE combined band (Consumer + Investors) ——— */
        .landing .band{
          width:100%; min-height:100vh; padding:0 16px; background:rgba(255,255,255,.02);
          overflow:hidden; position:relative; isolation:isolate; display:flex; align-items:center;
        }
        .landing .band .inner{ max-width:var(--maxw); margin:0 auto; position:relative; z-index:3; width:100% }
        .landing .band .grid{ display:grid; gap:clamp(80px,12vh,120px); align-items:center; min-height:100vh; padding:clamp(60px,8vh,100px) 0 }
        .landing .band h2{ margin-bottom:10px; text-align:center }
        .landing .band p{ text-align:center; max-width:920px; margin:.7rem auto 0 }
        .landing .actions{ display:flex; justify-content:center; gap:1rem; margin-top:16px }
        .landing .cta{
          display:inline-flex; align-items:center; justify-content:center;
          padding:.82rem 1.25rem;
          border:1px solid rgba(255,255,255,.12);            /* hairline */
          border-radius:999px;                                /* pill */
          background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
          color:#fff; text-decoration:none;

          /* the magic: blur the BACKGROUND behind the button */
          backdrop-filter: blur(6px) saturate(120%);
          -webkit-backdrop-filter: blur(6px) saturate(120%);  /* Safari */

          transition: background .2s ease, border-color .2s ease, transform .12s ease;
        }

        .landing .cta:hover {
          background:linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.05));
        }

        .landing .cta:active {
          transform: translateY(1px);
        }

        .landing .cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255,255,255,.18);
        }

        /* ——— Event-horizon glow from RIGHT (static, hazy, glossy) ——— */
        .landing .horizon{
          position:absolute; inset:0; z-index:1; pointer-events:none; overflow:hidden;
          background:
            radial-gradient(126% 126% at 108% 50%, rgba(255,136,60,.434) 0%, rgba(255,120,40,.296) 22%, rgba(180,80,30,.158) 48%, rgba(0,0,0,0) 72%),
            radial-gradient(84% 74%  at 96%  50%, rgba(120,170,255,.099) 0%, rgba(120,170,255,0) 70%),
            linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,.030));
          filter: blur(19px) saturate(138%) contrast(111%) brightness(102%);
        }

        /* ——— Dust (covers whole band) ——— */
        .landing .dust-canvas{
          position:absolute; inset:0; z-index:2; pointer-events:none; opacity:.55; mix-blend-mode:screen;
        }

        /* ——— Pricing / I&C / Contact ——— */
        .landing #pricing .right-shift,
        .landing #contact .right-shift{ margin-left:auto; margin-right:auto; text-align:center }
        .landing #pricing h2, .landing #contact h2{ font-size:clamp(2.3rem,3.9vw,3.2rem) }
        .landing #pricing p,  .landing #contact p{ font-size:clamp(1.10rem,1.4vw,1.28rem) }
        .landing .ic-slab{ border-top:1px solid var(--hair); padding-top:32px }
        .landing .ic-grid{ display:grid; grid-template-columns:1fr; gap:8px; max-width:980px; margin:0 auto }
        @media (min-width:900px){ .landing .ic-grid{ grid-template-columns:1fr 1fr; column-gap:24px } }
        .landing .ic-item h3{ font:600 1rem "IBM Plex Sans"; margin:0 0 6px }
        .landing .ic-item p{ opacity:.94 }

        /* ——— Footer + Nebula (PINNED BOTTOM) ——— */
        .landing footer{ background:transparent; border-top:none; padding:3.2rem 16px 2.4rem; position:relative; z-index:1 }
        .landing .footer-wrap{
          position:relative; z-index:2; max-width:var(--maxw); margin:0 auto 1.2rem;
          display:grid; gap:1.2rem; grid-template-columns:repeat(2,1fr)
        }
        @media (min-width:900px){ .landing .footer-wrap{ grid-template-columns:repeat(4,1fr) } }
        .landing .footer-col h4{ font:600 .95rem "IBM Plex Sans"; margin:0 0 .6rem }
        .landing .footer-col a{ display:block; margin:.28rem 0 }
        .landing .footer-col a:hover{ text-decoration:underline }
        .landing .access-badges{ display:flex; gap:.5rem; flex-wrap:wrap }
        .landing .badge{ border:1px solid var(--hair); border-radius:999px; padding:.35rem .7rem; background:rgba(255,255,255,.06) }
        /* Pinned bottom nebula — dark to light blue with white afterglow */
        #nebula {
          position: absolute;       /* Stays at the bottom of web content */
          left: 0; right: 0; bottom: 0;
          height: 110vh;            /* Even taller so the glow rises higher */
          pointer-events: none;
          z-index: 0;

          background:
            /* deep midnight base */
            radial-gradient(120% 140% at 50% 118%,
              rgba(4,10,28,0.96) 0%,
              rgba(4,10,28,0.85) 25%,
              rgba(4,10,28,0.00) 65%),

            /* navy core */
            radial-gradient(100% 120% at 50% 120%,
              rgba(12,24,64,0.88) 0%,
              rgba(12,24,64,0.00) 60%),

            /* cobalt-to-light blue haze */
            radial-gradient(160% 140% at 50% 135%,
              rgba(28,72,180,0.66) 0%,
              rgba(64,160,255,0.48) 45%,
              rgba(64,160,255,0.00) 72%),

            /* white afterglow near top */
            radial-gradient(180% 160% at 50% 145%,
              rgba(255,255,255,0.25) 0%,
              rgba(255,255,255,0.00) 70%);

          filter: blur(100px) saturate(150%) contrast(108%) brightness(106%);
          -webkit-mask-image: linear-gradient(to top,
              rgba(0,0,0,1) 10%, rgba(0,0,0,0) 65%);
                  mask-image: linear-gradient(to top,
              rgba(0,0,0,1) 10%, rgba(0,0,0,0) 65%);
        }

        /* ——— Reveal off (we keep it immediate) ——— */
        .landing .reveal{ opacity:1; transform:none }

        .landing .copyright{ text-align:center; margin-top:1.2rem; opacity:.6; font-size:.9rem }
      `}</style>

      <div className="landing">
        {/* Header */}
        <header className="header" id="siteHeader">
          <Link className="brand" to="/">Janus</Link>
          <nav className="nav" id="siteNav">
            <a href="#home">Home</a>
            <a href="#vision">Vision</a>
            <a href="#agents">Agents</a>
            <a href="#consumer">Consumer</a>
            <a href="#investor">Investors</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
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

          {/* Bloomberg strip (thin) */}
          <section className="bstrip">
            <div className="container">
              <span className="bitem positive"><span className="label">DEAL SCORE</span><span className="value num">91</span><span className="delta up num">+2.1</span></span>
              <span className="bitem positive"><span className="label">DSCR</span><span className="value num">1.28</span><span className="delta up num">+0.03</span></span>
              <span className="bitem negative"><span className="label">CAP RATE</span><span className="value num">6.8%</span><span className="delta down num">-0.2%</span></span>
              <span className="bitem positive"><span className="label">RENT BAND</span><span className="value num">$1,780</span><span className="delta up num">+15</span></span>
              <span className="bitem positive"><span className="label">RISK FLAGS</span><span className="value num">Low</span><span className="delta up num">+</span></span>
              <span className="bitem positive"><span className="label">SPREAD</span><span className="value num">$13.5k</span><span className="delta up num">+$900</span></span>
            </div>
          </section>

          {/* VISION */}
          <section id="vision" className="section">
            <div className="container">
              <div className="right-shift">
                <h2>Vision</h2>
                <p>
                  Build the <b>agent-first</b> platform for real estate. Specialist agents — <em>Sourcing</em>, <em>Comps</em>, <em>Underwriter</em>, <em>Risk</em>, <em>Portfolio Fit</em>, <em>Critic</em> — produce evidence, challenge each other, and deliver a clean memo with a verdict: <span className="num">YES / REVISE / NO</span>. Every conclusion is cited and auditable.
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
                    <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,.98)"></path>
                  </marker>
                </defs>
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

          {/* ONE Combined Band: Consumer + Investors */}
          <section id="twins" className="band">
            <div className="horizon" aria-hidden="true"></div>
            <canvas ref={dustRef} className="dust-canvas" aria-hidden="true"></canvas>

            <div className="inner">
              <div className="grid">
                {/* Consumer Column */}
                <div>
                  <h2 id="consumer">Consumer</h2>
                  <p>
                    Plain-English deal scores with rationale; market rent and ARV bands; alerts when the thesis changes.
                    Build a watchlist, set thresholds (<span className="num">DSCR≥1.25</span>, <span className="num">Cap≥6%</span>), and share a one-page memo from your phone.
                  </p>
                  <div className="actions"><Link className="cta" to="/consumer">Enter Dashboard</Link></div>
                </div>

                {/* Investors Column */}
                <div>
                  <h2 id="investor">Investors</h2>
                  <p>
                    Committee-grade underwriting with adversarial review. Standardize BRRRR, value-add, and distressed:
                    <span className="num">Cap • CoC • DSCR • IRR</span>, risk gates (flood/HOA/title), conditions to close, and a confidence-weighted verdict.
                  </p>

                  {/* Bloomberg-style micro line */}
                  <div style={{marginTop:10, display:'flex', gap:'1rem', flexWrap:'wrap', justifyContent:'center'}}>
                    <span className="bitem"><span className="label">LTV</span><span className="value num">64%</span><span className="delta up num">+1%</span></span>
                    <span className="bitem"><span className="label">CoC</span><span className="value num">8.9%</span><span className="delta up num">+0.3%</span></span>
                    <span className="bitem"><span className="label">IRR(5y)</span><span className="value num">17.2%</span><span className="delta up num">+0.6%</span></span>
                    <span className="bitem"><span className="label">DSCR</span><span className="value num">1.32</span><span className="delta down num">-0.02</span></span>
                  </div>

                  <div className="actions" style={{marginTop:14}}><Link className="cta" to="/investor">Enter Dashboard</Link></div>
                </div>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section id="pricing" className="section">
            <div className="container">
              <div className="right-shift" style={{marginLeft:'auto', marginRight:'auto', textAlign:'center'}}>
                <h2>Pricing</h2>
                <p>Templates only — final pricing TBD.</p>
                <div className="actions" style={{marginTop:'1.2rem', justifyContent:'center'}}>
                  <a className="cta" href="#contact">Consumer — Learn More</a>
                  <a className="cta" href="#contact">Investors — Learn More</a>
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
              <div className="right-shift" style={{marginLeft:'auto', marginRight:'auto', textAlign:'center'}}>
                <h2>Contact</h2>
                <p>Partnerships, pilots, or access:</p>
                <p style={{fontSize:'1.12rem'}}><a href="mailto:contact@janus.ai">contact@janus.ai</a></p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer + Nebula pinned bottom */}
        <footer>
          <div className="footer-wrap">
            <div className="footer-col"><h4>Resources</h4><a href="#safety">Safety</a><a href="#legal">Legal</a><a href="#security">Security</a><a href="#docs">Docs</a></div>
            <div className="footer-col"><h4>Company</h4><a href="#about">About</a><a href="#careers">Careers</a><a href="#news">News</a></div>
            <div className="footer-col"><h4>Products</h4><a href="#agents">Agents</a><Link to="/consumer">Consumer</Link><Link to="/investor">Investors</Link></div>
            <div className="footer-col"><h4>Access</h4><div className="access-badges"><span className="badge">Web</span><span className="badge">iOS</span><span className="badge">Android</span></div></div>
          </div>
          <div className="copyright">© 2025 Janus • All rights reserved</div>
          <div id="nebula" aria-hidden="true"></div>
        </footer>
      </div>
    </>
  );
}