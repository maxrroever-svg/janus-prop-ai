const Landing = () => {
  return (
    <>
      {/* Direct HTML injection - complete page replacement */}
      <div 
        dangerouslySetInnerHTML={{
          __html: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Janus — XAI × Bloomberg</title>

<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=GFS+Didot&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet"/>

<style>
/* ===========================================================
   JANUS — Final Front Page (Matte Black, All-White Text, Dust Fixed)
   =========================================================== */
:root{
  color-scheme: dark;
  --bg:#000;
  --white:#fff;
  --hair:rgba(255,255,255,.12);
  --up:#00DC96;
  --down:#FF6969;
  --fog: .18;       /* teeny-weeny fog strength (0..1). Set 0 to fully disable */
  --gloss-1: rgba(255,255,255,.06);
  --gloss-2: rgba(255,255,255,.03);
}

*{box-sizing:border-box}
html,body{height:100%}
html{scroll-behavior:smooth}

/* ===== Global base ===== */
body{
  margin:0; background:var(--bg) !important; color:var(--white) !important;
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility; overflow-x:hidden;
}
::selection{background:rgba(255,255,255,.18); color:#000}

/* ===== Force ALL text to white ===== */
h1,h2,h3,h4,h5,h6,p,li,small,span,em,strong,nav,a,button,label,div,section,footer,header,svg text{
  color:var(--white) !important;
  -webkit-text-fill-color:var(--white);
  text-decoration-color:var(--white);
}
a{text-decoration:none}
a:hover{text-decoration:underline; text-underline-offset:6px}

/* ===== Typography ===== */
h1,h2,h3{font-family:"GFS Didot", serif; letter-spacing:.0045em; line-height:1.12; margin:0 0 .6rem}
p,li,small,span,button,input,textarea,select,nav,a{font-family:"IBM Plex Sans", system-ui, sans-serif}
.num{font-family:"IBM Plex Mono", monospace}

/* ===== Tiny Top Fog (nearly invisible, no animation) ===== */
#fog{
  position:fixed; left:0; right:0; top:0; height:22vh; z-index:0; pointer-events:none;
  background:
    radial-gradient(140% 200% at 50% -30%, rgba(255,255,255,calc(.22*var(--fog))), rgba(255,255,255,0) 58%),
    radial-gradient(110% 160% at 40% -20%, rgba(210,210,210,calc(.14*var(--fog))), rgba(210,210,210,0) 62%),
    radial-gradient(120% 180% at 60% -18%, rgba(200,200,200,calc(.12*var(--fog))), rgba(200,200,200,0) 64%);
  filter:blur(28px) saturate(103%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,.5) 55%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,.5) 55%, rgba(0,0,0,0) 100%);
}

/* ===== Header (transparent, no bar/line) ===== */
.header{
  position:sticky; top:0; z-index:10;
  display:flex; align-items:center; justify-content:space-between;
  padding:1.0rem 1.2rem; background:transparent !important; border:none !important; box-shadow:none !important;
}
.brand{
  font-family:"GFS Didot", serif; font-size:1.2rem; letter-spacing:.02em;
}
.nav{display:flex; gap:1.4rem; align-items:center; margin-left:auto}
.nav a{
  font-weight:600; letter-spacing:.01em; font-size:.98rem; position:relative;
}
.nav a::after{
  content:""; position:absolute; left:0; right:100%; bottom:-6px; height:2px;
  background:linear-gradient(90deg, #8EC5FF, #C68CFF, #FF9E7A); transition:right .25s ease;
}
.nav a:hover::after, .nav a.active::after{right:0}

/* ===== Sections ===== */
.section{padding:clamp(56px,8vw,100px) 1.2rem; position:relative; z-index:1}
.container{max-width:1120px; margin:0 auto}

/* ===== Subtle Gloss for CTAs ===== */
.glass{
  background:linear-gradient(180deg, var(--gloss-1), var(--gloss-2));
  border:1px solid var(--hair);
  backdrop-filter:saturate(115%) blur(4px);
  -webkit-backdrop-filter:saturate(115%) blur(4px);
  border-radius:14px;
}

/* ===== Ticker ===== */
.ticker{
  padding:0.9rem 0; border-top:1px solid var(--hair); border-bottom:1px solid var(--hair);
  overflow-x:auto; white-space:nowrap; scrollbar-width:none; position:relative; z-index:1;
}
.ticker::-webkit-scrollbar{display:none}
.tick{
  display:inline-flex; align-items:center; gap:.6rem; padding:.38rem .78rem; margin-right:.45rem;
  border-radius:999px; background:rgba(255,255,255,.06); border:1px solid var(--hair);
}
.tick .label{opacity:.9; font-size:.78rem; letter-spacing:.02em; text-transform:uppercase}
.tick .value{font-weight:700}
.tick .delta{font-family:"IBM Plex Mono"; font-size:.82rem}
.tick .delta.up{color:var(--up)} .tick .delta.down{color:var(--down)}

/* ===== Diagram ===== */
.diagram text{font:600 13px "IBM Plex Sans"}
.diagram .node{fill:rgba(255,255,255,.2)}
.diagram .lane{stroke:rgba(255,255,255,.18); stroke-width:1}
.diagram .flow{stroke:rgba(120,200,255,.7); stroke-width:1.6; marker-end:url(#arrow)}

/* ===== Consumer / Investor Bands ===== */
.band{
  width:100%; padding:clamp(88px,12vh,160px) 1.2rem; position:relative; overflow:hidden;
  background:rgba(255,255,255,.025); border:none !important; z-index:1;
}
.band .container{position:relative; z-index:4} /* text on top */
.band h2{font-size:2rem; text-align:center}
.band p{font-size:1.06rem; text-align:center; max-width:920px; margin:.8rem auto 0; line-height:1.7}
.band .actions{display:flex; gap:1rem; justify-content:center; margin-top:1.2rem}
.cta{
  display:inline-flex; align-items:center; justify-content:center;
  padding:.7rem 1.1rem; border:1px solid var(--hair);
  border-radius:999px; background:rgba(255,255,255,.06); color:#000;
  color:#fff;
}
.cta:hover{background:rgba(255,255,255,.1)}

/* Dust Canvas — behind content, guaranteed sizing */
.dust-canvas{
  position:absolute; inset:0; z-index:1; pointer-events:none; opacity:.42; mix-blend-mode:screen;
}

/* Corner glows only (not bottom stripe) */
.glowfield{
  position:absolute; inset:0; z-index:2; pointer-events:none;
  background:
    radial-gradient(240px 200px at 3% 6%, rgba(140,200,255,.12), rgba(0,0,0,0) 72%),
    radial-gradient(260px 220px at 98% 12%, rgba(255,170,96,.10), rgba(0,0,0,0) 74%),
    radial-gradient(220px 200px at 6% 96%, rgba(200,140,255,.10), rgba(0,0,0,0) 70%),
    radial-gradient(240px 200px at 96% 92%, rgba(120,255,220,.08), rgba(0,0,0,0) 70%);
  filter:blur(8px);
}

/* ===== Footer + Bigger Bottom Nebula ===== */
footer{
  background:transparent !important; border-top:none !important;
  padding:3.2rem 1.2rem 2.4rem; position:relative; z-index:1;
}
.footer-wrap{
  position:relative; z-index:2;
  max-width:1120px; margin:0 auto 1.2rem; display:grid; gap:1.2rem;
  grid-template-columns:repeat(2,1fr);
}
@media(min-width:900px){ .footer-wrap{grid-template-columns:repeat(4,1fr)} }
.footer-col h4{font:600 .95rem "IBM Plex Sans"; margin:0 0 .6rem}
.footer-col a{display:block; margin:.28rem 0}
.footer-col a:hover{text-decoration:underline}
.badges{display:flex; gap:.5rem; flex-wrap:wrap}
.badge{border:1px solid var(--hair); border-radius:999px; padding:.35rem .7rem; background:rgba(255,255,255,.06)}

#nebula{
  position:absolute; left:0; right:0; bottom:0; height:115vh; pointer-events:none; z-index:1;
  background:
    radial-gradient(60% 120% at 50% 122%, rgba(32,12,64,.92) 0%, rgba(0,0,0,0) 60%),
    radial-gradient(62% 122% at 50% 134%, rgba(8,26,96,.85) 0%, rgba(0,0,0,0) 70%),
    radial-gradient(64% 126% at 50% 146%, rgba(18,88,220,.72) 0%, rgba(0,0,0,0) 76%),
    radial-gradient(70% 136% at 50% 158%, rgba(0,235,255,.38) 0%, rgba(0,0,0,0) 82%),
    radial-gradient(78% 150% at 50% 170%, rgba(255,178,84,.42) 0%, rgba(0,0,0,0) 88%);
  filter: blur(68px) saturate(138%);
  -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 55%);
          mask-image: linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 55%);
}

.copyright{position:relative; z-index:2; text-align:center; margin-top:.6rem}

/* ===== Reveal-on-scroll (kept minimal) ===== */
.reveal{opacity:0; transform:translateY(12px)}
.reveal.visible{animation:fadeUp .42s ease forwards}
@keyframes fadeUp{to{opacity:1; transform:translateY(0)}}
</style>
</head>
<body>

<!-- tiny fog; set --fog:0 to kill -->
<div id="fog" aria-hidden="true"></div>

<!-- Transparent header: brand left, nav right -->
<header class="header">
  <a class="brand" href="#home">Janus</a>
  <nav class="nav">
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
  <!-- HERO -->
  <section id="home" class="section">
    <div class="container">
      <h1>AI for Real Estate, Without the Noise.</h1>
      <p>Janus runs every opportunity through an <b>agentic investment committee</b> — sourcing, comps, underwriting, risk, fit, and a final memo — so you act with confidence.</p>
    </div>
  </section>

  <!-- TICKER -->
  <section class="ticker">
    <div class="container" style="max-width:none">
      <span class="tick"><span class="label">Deal Score</span><span class="value num">91</span><span class="delta up num">+2.1</span></span>
      <span class="tick"><span class="label">DSCR</span><span class="value num">1.28</span><span class="delta up num">+0.03</span></span>
      <span class="tick"><span class="label">Cap Rate</span><span class="value num">6.8%</span><span class="delta down num">-0.2%</span></span>
      <span class="tick"><span class="label">Rent Band</span><span class="value num">$1,780</span><span class="delta up num">+15</span></span>
      <span class="tick"><span class="label">Risk Flags</span><span class="value num">Low</span><span class="delta up num">✓</span></span>
      <span class="tick"><span class="label">Spread</span><span class="value num">$13.5k</span><span class="delta up num">+$900</span></span>
    </div>
  </section>

  <!-- VISION -->
  <section id="vision" class="section">
    <div class="container">
      <div class="reveal" style="max-width:920px">
        <h2>Vision</h2>
        <p style="margin-top:.6rem">
          Build the <b>agent-first</b> platform for real estate. Specialist agents — <em>Sourcing</em>, <em>Comps</em>, <em>Underwriter</em>, <em>Risk</em>, <em>Portfolio Fit</em>, <em>Critic</em> — produce evidence, challenge each other, and deliver a clean memo with a verdict:
          <span class="num">YES / REVISE / NO</span>. Every conclusion is cited and auditable.
        </p>
      </div>
      <div style="border-top:1px solid var(--hair); margin:2rem 0"></div>
      <div class="reveal" style="display:grid; grid-template-columns:1fr; gap:1rem; max-width:1120px">
        <div><h3 style="font:700 1.05rem 'IBM Plex Sans'">Explainable by Default</h3><p>Every number is traceable to comps, assumptions, and sources. No black boxes.</p></div>
        <div><h3 style="font:700 1.05rem 'IBM Plex Sans'">Risk-Aware</h3><p>Flood, crime, HOA, title, permits — surfaced as gates with severity thresholds.</p></div>
        <div><h3 style="font:700 1.05rem 'IBM Plex Sans'">Portfolio Fit</h3><p>Your "box" enforced: metros, leverage, min DSCR/CoC, hold, and concentration.</p></div>
        <div><h3 style="font:700 1.05rem 'IBM Plex Sans'">One-Tap Memo</h3><p>Final IC memo with dissent, sensitivities, and conditions to close.</p></div>
      </div>
    </div>
  </section>

  <!-- AGENTS -->
  <section id="agents" class="section">
    <div class="container diagram">
      <div class="reveal" style="text-align:center; margin-bottom:1.2rem">
        <h2>Agent Strategy</h2>
        <p style="opacity:.95; margin-top:.4rem">Sourcing → Comps → Underwrite → Risk → Portfolio Fit → Critic → Memo</p>
      </div>
      <svg width="100%" height="420" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMid meet" role="img">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="rgba(180,220,255,.95)"></path>
          </marker>
        </defs>
        <line class="lane" x1="60" y1="120" x2="940" y2="120"/>
        <line class="lane" x1="60" y1="220" x2="940" y2="220"/>
        <line class="lane" x1="60" y1="320" x2="940" y2="320"/>
        <circle class="node" cx="120" cy="220" r="3"/><text x="120" y="200" text-anchor="middle">Sourcing</text>
        <circle class="node" cx="260" cy="220" r="3"/><text x="260" y="200" text-anchor="middle">Comps</text>
        <circle class="node" cx="420" cy="220" r="3"/><text x="420" y="200" text-anchor="middle">Underwrite</text>
        <circle class="node" cx="560" cy="220" r="3"/><text x="560" y="200" text-anchor="middle">Risk</text>
        <circle class="node" cx="700" cy="220" r="3"/><text x="700" y="200" text-anchor="middle">Portfolio Fit</text>
        <circle class="node" cx="820" cy="220" r="3"/><text x="820" y="200" text-anchor="middle">Critic</text>
        <circle class="node" cx="920" cy="220" r="3"/><text x="920" y="200" text-anchor="middle">Memo</text>
        <path class="flow" d="M120 220 L260 220"/><path class="flow" d="M260 220 L420 220"/>
        <path class="flow" d="M420 220 L560 220"/><path class="flow" d="M560 220 L700 220"/>
        <path class="flow" d="M700 220 L820 220"/><path class="flow" d="M820 220 L920 220"/>
        <text x="340" y="110" text-anchor="middle" fill="#fff">Rent / ARV Band</text>
        <text x="640" y="310" text-anchor="middle" fill="#fff">Gates &amp; Conditions</text>
        <text x="520" y="260" text-anchor="middle" fill="#fff">Cap • CoC • DSCR • IRR • Sensitivities</text>
      </svg>
    </div>
  </section>

  <!-- CONSUMER -->
  <section id="consumer" class="band" aria-labelledby="consumerTitle">
    <canvas class="dust-canvas" aria-hidden="true"></canvas>
    <div class="glowfield" aria-hidden="true"></div>
    <div class="container">
      <div class="reveal" style="max-width:980px; margin:0 auto; text-align:center">
        <h2 id="consumerTitle">Consumer</h2>
        <p>
          Plain-English deal scores with rationale; market rent and ARV bands; alerts when the thesis changes.
          Build a watchlist, set thresholds (<span class="num">DSCR≥1.25</span>, <span class="num">Cap≥6%</span>), and share a one-page memo from your phone.
        </p>
        <div class="actions"><a class="cta glass" href="/consumer">Enter Dashboard</a></div>
      </div>
    </div>
  </section>

  <!-- INVESTORS -->
  <section id="investor" class="band" aria-labelledby="investorTitle">
    <canvas class="dust-canvas" aria-hidden="true"></canvas>
    <div class="glowfield" aria-hidden="true"></div>
    <div class="container">
      <div class="reveal" style="max-width:980px; margin:0 auto; text-align:center">
        <h2 id="investorTitle">Investors</h2>
        <p>
          Committee-grade underwriting with adversarial review. Standardize BRRRR, value-add, and distressed:
          <span class="num">Cap • CoC • DSCR • IRR</span>, risk gates (flood/HOA/title), conditions to close, and a confidence-weighted verdict.
        </p>

        <div style="margin-top:1.1rem; display:flex; gap:.6rem; flex-wrap:wrap; justify-content:center">
          <span class="tick"><span class="label">LTV</span><span class="value num">64%</span><span class="delta up num">+1%</span></span>
          <span class="tick"><span class="label">CoC</span><span class="value num">8.9%</span><span class="delta up num">+0.3%</span></span>
          <span class="tick"><span class="label">IRR(5y)</span><span class="value num">17.2%</span><span class="delta up num">+0.6%</span></span>
          <span class="tick">
            <span class="label">DSCR</span><span class="value num">1.32</span>
            <svg width="64" height="16" viewBox="0 0 64 16" aria-hidden="true"><path d="M0 13 L12 12 L24 10 L36 9 L48 8 L64 7" fill="none" stroke="#00DC96" stroke-width="2"/></svg>
          </span>
        </div>

        <div class="actions" style="margin-top:1.1rem"><a class="cta glass" href="/dashboard">Enter Dashboard</a></div>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section id="pricing" class="section">
    <div class="container" style="text-align:center">
      <div class="reveal" style="max-width:900px; margin:0 auto">
        <h2>Pricing</h2>
        <p style="margin-top:.6rem">Templates only — final pricing TBD.</p>
        <div class="actions" style="margin-top:1.2rem">
          <a class="cta glass" href="#contact">Consumer — Learn More</a>
          <a class="cta glass" href="#contact">Investors — Learn More</a>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="section" aria-labelledby="ctitle">
    <div class="container">
      <div class="reveal" style="text-align:center">
        <h2 id="ctitle">Contact</h2>
        <p style="margin:.6rem 0 1.2rem">Partnerships, pilots, or access:</p>
        <p style="font-size:1.05rem"><a href="mailto:contact@janus.ai">contact@janus.ai</a></p>
      </div>
    </div>
  </section>
</main>

<!-- FOOTER + Nebula -->
<footer>
  <div class="footer-wrap">
    <div class="footer-col"><h4>Resources</h4><a href="#safety">Safety</a><a href="#legal">Legal</a><a href="#security">Security</a></div>
    <div class="footer-col"><h4>Company</h4><a href="#about">About</a><a href="#careers">Careers</a><a href="#news">News</a></div>
    <div class="footer-col"><h4>Products</h4><a href="#agents">Agents</a><a href="#consumer">Consumer</a><a href="#investor">Investors</a></div>
    <div class="footer-col"><h4>Access</h4><div class="badges"><span class="badge">Web</span><span class="badge">iOS</span><span class="badge">Android</span></div></div>
  </div>
  <div class="copyright">© 2025 Janus • All rights reserved</div>
  <div id="nebula" aria-hidden="true"></div>
</footer>

<script>
/* ===== Scrollspy + reveals ===== */
(function(){
  const links = [...document.querySelectorAll('.nav a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      const id = '#'+e.target.id;
      if(e.isIntersecting){
        links.forEach(l=>l.classList.remove('active'));
        links.filter(l=>l.getAttribute('href')===id).forEach(l=>l.classList.add('active'));
      }
    });
  }, { rootMargin:'-35% 0px -60% 0px', threshold:0.01 });
  sections.forEach(s=>spy.observe(s));

  const reveals = [...document.querySelectorAll('.reveal')];
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { rootMargin:'-10% 0px -10% 0px', threshold:0.02 });
  reveals.forEach(el=>io.observe(el));
})();

/* ===== Dust in Consumer/Investor bands — robust sizing ===== */
(function(){
  const canvases = document.querySelectorAll('.dust-canvas');
  const RO = window.ResizeObserver ? new ResizeObserver(entries=>{
    entries.forEach(e=>{
      const c = e.target; if(c.__dustInit) c.__dustResize();
    });
  }) : null;

  canvases.forEach(canvas=>{
    setupDust(canvas);
    if(RO) RO.observe(canvas);
  });

  function setupDust(canvas){
    const ctx = canvas.getContext('2d', { alpha: true });
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w=0,h=0, particles=[]; canvas.__dustInit=true;

    canvas.__dustResize = function(){
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * DPR; canvas.height = h * DPR;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
      init();
    };

    function init(){
      const count = Math.max(24, Math.floor((w*h)/22000)); // density with sane floor
      particles = new Array(count).fill(0).map(()=>({
        x: Math.random()*w, y: Math.random()*h,
        r: Math.random()*1.2 + 0.5, a: Math.random()*0.45 + 0.25,
        vx: (Math.random()*0.22 - 0.11), vy: (Math.random()*0.22 - 0.11)
      }));
    }

    function step(){
      ctx.clearRect(0,0,w,h);
      for(const p of particles){
        p.x += p.vx; p.y += p.vy;
        if(p.x < -6) p.x = w+6; if(p.x > w+6) p.x = -6;
        if(p.y < -6) p.y = h+6; if(p.y > h+6) p.y = -6;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = \`rgba(255,255,255,\${p.a})\`; ctx.fill();
      }
      requestAnimationFrame(step);
    }

    canvas.__dustResize();
    step();
    window.addEventListener('resize', canvas.__dustResize, {passive:true});
  }
})();
</script>
</body>
</html>`
        }}
      />
    </>
  );
};

export default Landing;