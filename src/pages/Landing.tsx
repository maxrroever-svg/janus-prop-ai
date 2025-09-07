const Landing = () => {
  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Janus — AI for Real Estate</title>
<link rel="stylesheet" href="/css/janus-theme.css"/>
</head>
<body>
<div class="janus" id="homeRoot">

  <!-- Steady fog + BIG nebula (front page only) -->
  <div id="fog" aria-hidden="true"></div>
  <div id="nebula" aria-hidden="true"></div>

  <!-- Header -->
  <header class="janus-header">
    <div class="section" style="padding:18px;">
      <div class="container" style="display:flex; align-items:center; gap:16px;">
        <div style="font-family:'GFS Didot',serif; font-size:20px; letter-spacing:.02em">Janus</div>
        <nav class="nav" style="display:flex; gap:16px; margin-left:auto; font-weight:600">
          <a href="#home">Home</a>
          <a href="#vision">Vision</a>
          <a href="#agents">Agents</a>
          <a href="#consumer">Consumer</a>
          <a href="#investor">Investors</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </div>
  </header>

  <main>

    <!-- HERO -->
    <section id="home" class="section">
      <div class="container reveal">
        <h1>AI for Real Estate, Without the Noise.</h1>
        <p style="max-width:820px">Agentic investment committee — sourcing, comps, underwriting, risk, portfolio fit, and a final memo with conditions to close.</p>
        <div class="actions" style="margin-top:12px">
          <a class="glass" href="/consumer/consumer" style="padding:.7rem 1.1rem; border-radius:999px; border:1px solid var(--hair)">Enter Consumer Dashboard</a>
          <a class="glass" href="/investor/investor" style="padding:.7rem 1.1rem; border-radius:999px; border:1px solid var(--hair)">Enter Investor Dashboard</a>
        </div>
      </div>
    </section>

    <!-- Bloomberg Ticker -->
    <section class="section" style="padding-top:12px">
      <div class="container reveal" style="overflow-x:auto; white-space:nowrap">
        <span class="tick"><span class="label">Deal Score</span><span class="value num">91</span></span>
        <span class="tick"><span class="label">DSCR</span><span class="value num">1.31</span></span>
        <span class="tick"><span class="label">Cap</span><span class="value num">6.9%</span></span>
        <span class="tick"><span class="label">Rent Band</span><span class="value num">$1,780</span></span>
        <span class="tick"><span class="label">Risk Flags</span><span class="value num">Low</span></span>
        <span class="tick"><span class="label">Spread</span><span class="value num">$13.5k</span></span>
      </div>
    </section>

    <!-- Vision -->
    <section id="vision" class="section">
      <div class="container reveal" style="max-width:920px">
        <h2>Vision</h2>
        <p>Bloomberg-grade rigor meets XAI-native intelligence. Explainable, risk-aware, portfolio-fit decisions with audit trails and one-tap memos.</p>
      </div>
    </section>

    <!-- Agents Diagram -->
    <section id="agents" class="section">
      <div class="container reveal diagram">
        <h2 style="text-align:center; margin-bottom:12px">Agent Strategy</h2>
        <svg width="100%" height="420" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMid meet" role="img">
          <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="rgba(180,220,255,.95)"></path></marker></defs>
          <line class="lane" x1="60" y1="120" x2="940" y2="120" stroke="rgba(255,255,255,.18)"/>
          <line class="lane" x1="60" y1="220" x2="940" y2="220" stroke="rgba(255,255,255,.18)"/>
          <line class="lane" x1="60" y1="320" x2="940" y2="320" stroke="rgba(255,255,255,.18)"/>
          <circle cx="120" cy="220" r="3" fill="rgba(255,255,255,.25)"/><text x="120" y="200" text-anchor="middle">Sourcing</text>
          <circle cx="260" cy="220" r="3" fill="rgba(255,255,255,.25)"/><text x="260" y="200" text-anchor="middle">Comps</text>
          <circle cx="420" cy="220" r="3" fill="rgba(255,255,255,.25)"/><text x="420" y="200" text-anchor="middle">Underwrite</text>
          <circle cx="560" cy="220" r="3" fill="rgba(255,255,255,.25)"/><text x="560" y="200" text-anchor="middle">Risk</text>
          <circle cx="700" cy="220" r="3" fill="rgba(255,255,255,.25)"/><text x="700" y="200" text-anchor="middle">Portfolio Fit</text>
          <circle cx="820" cy="220" r="3" fill="rgba(255,255,255,.25)"/><text x="820" y="200" text-anchor="middle">Critic</text>
          <circle cx="920" cy="220" r="3" fill="rgba(255,255,255,.25)"/><text x="920" y="200" text-anchor="middle">Memo</text>
          <path d="M120 220 L260 220" stroke="rgba(120,200,255,.85)" stroke-width="1.6" marker-end="url(#arrow)"/>
          <path d="M260 220 L420 220" stroke="rgba(120,200,255,.85)" stroke-width="1.6" marker-end="url(#arrow)"/>
          <path d="M420 220 L560 220" stroke="rgba(120,200,255,.85)" stroke-width="1.6" marker-end="url(#arrow)"/>
          <path d="M560 220 L700 220" stroke="rgba(120,200,255,.85)" stroke-width="1.6" marker-end="url(#arrow)"/>
          <path d="M700 220 L820 220" stroke="rgba(120,200,255,.85)" stroke-width="1.6" marker-end="url(#arrow)"/>
          <path d="M820 220 L920 220" stroke="rgba(120,200,255,.85)" stroke-width="1.6" marker-end="url(#arrow)"/>
          <text x="520" y="260" text-anchor="middle">Cap • CoC • DSCR • IRR • Sensitivities</text>
        </svg>
      </div>
    </section>

    <!-- Consumer band with dust + corner glows -->
    <section id="consumer" class="band">
      <canvas class="dust-canvas" aria-hidden="true"></canvas>
      <div class="glowfield" aria-hidden="true"></div>
      <div class="container band-content reveal">
        <h2>Consumer</h2>
        <p>Plain-English deal scores with rationale; rent/ARV bands; alerts when the thesis changes. Watchlist thresholds (DSCR≥1.25, Cap≥6%).</p>
        <div class="actions"><a class="cta glass" href="/consumer/consumer">Enter Dashboard</a></div>
      </div>
    </section>

    <!-- Investors band with dust + corner glows -->
    <section id="investor" class="band">
      <canvas class="dust-canvas" aria-hidden="true"></canvas>
      <div class="glowfield" aria-hidden="true"></div>
      <div class="container band-content reveal">
        <h2>Investors</h2>
        <p>Committee-grade underwriting, risk gates (flood/HOA/title), portfolio fit, dissent, and conditions to close with a confidence verdict.</p>
        <div class="actions">
          <a class="cta glass" href="/investor/investor">Enter Dashboard</a>
        </div>
      </div>
    </section>

    <!-- Pricing (template only) -->
    <section id="pricing" class="section">
      <div class="container reveal" style="text-align:center">
        <h2>Pricing</h2>
        <p>Templates only — final pricing TBD.</p>
        <div class="actions" style="justify-content:center">
          <a class="glass" href="#contact" style="padding:.7rem 1.1rem; border-radius:999px; border:1px solid var(--hair)">Consumer — Learn More</a>
          <a class="glass" href="#contact" style="padding:.7rem 1.1rem; border-radius:999px; border:1px solid var(--hair)">Investors — Learn More</a>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section">
      <div class="container reveal" style="text-align:center">
        <h2>Contact</h2>
        <p><a href="mailto:contact@janus.ai">contact@janus.ai</a></p>
      </div>
    </section>

  </main>
</div>

<script src="/js/janus-effects.js"></script>
</body>
</html>`
      }}
    />
  );
};

export default Landing;