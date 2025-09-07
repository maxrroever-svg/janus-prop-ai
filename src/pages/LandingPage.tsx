import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleConsumerClick = () => {
    console.log("Consumer button clicked, navigating to /consumer");
    navigate("/consumer");
  };

  const handleInvestorClick = () => {
    console.log("Investor button clicked, navigating to /investor");
    navigate("/investor");
  };

  return (
    <div className="janus" id="homeRoot">
      {/* Steady fog + BIG nebula (front page only) */}
      <div id="fog" aria-hidden="true"></div>
      <div id="nebula" aria-hidden="true"></div>

      {/* Header */}
      <header className="janus-header">
        <div className="section" style={{ padding: "18px" }}>
          <div className="container" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontFamily: "'GFS Didot',serif", fontSize: "20px", letterSpacing: ".02em" }}>
              Janus
            </div>
            <nav className="nav" style={{ display: "flex", gap: "16px", marginLeft: "auto", fontWeight: "600" }}>
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
        {/* HERO */}
        <section id="home" className="section">
          <div className="container reveal">
            <h1>AI for Real Estate, Without the Noise.</h1>
            <p style={{ maxWidth: "820px" }}>
              Agentic investment committee — sourcing, comps, underwriting, risk, portfolio fit, and a final memo with conditions to close.
            </p>
            <div className="actions" style={{ marginTop: "12px" }}>
              <button
                className="glass"
                onClick={handleConsumerClick}
                style={{ padding: ".7rem 1.1rem", borderRadius: "999px", border: "1px solid var(--hair)", background: "transparent", cursor: "pointer", color: "white" }}
              >
                Enter Consumer Dashboard
              </button>
              <button
                className="glass"
                onClick={handleInvestorClick}
                style={{ padding: ".7rem 1.1rem", borderRadius: "999px", border: "1px solid var(--hair)", background: "transparent", cursor: "pointer", color: "white", marginLeft: "1rem" }}
              >
                Enter Investor Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* Bloomberg Ticker */}
        <section className="section" style={{ paddingTop: "12px" }}>
          <div className="container reveal" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <span className="tick">
              <span className="label">Deal Score</span>
              <span className="value num">91</span>
            </span>
            <span className="tick">
              <span className="label">DSCR</span>
              <span className="value num">1.31</span>
            </span>
            <span className="tick">
              <span className="label">Cap</span>
              <span className="value num">6.9%</span>
            </span>
            <span className="tick">
              <span className="label">Rent Band</span>
              <span className="value num">$1,780</span>
            </span>
            <span className="tick">
              <span className="label">Risk Flags</span>
              <span className="value num">Low</span>
            </span>
            <span className="tick">
              <span className="label">Spread</span>
              <span className="value num">$13.5k</span>
            </span>
          </div>
        </section>

        {/* Vision */}
        <section id="vision" className="section">
          <div className="container reveal" style={{ maxWidth: "920px" }}>
            <h2>Vision</h2>
            <p>
              Bloomberg-grade rigor meets XAI-native intelligence. Explainable, risk-aware, portfolio-fit decisions with audit trails and one-tap memos.
            </p>
          </div>
        </section>

        {/* Consumer band with dust + corner glows */}
        <section id="consumer" className="band">
          <canvas className="dust-canvas" aria-hidden="true"></canvas>
          <div className="glowfield" aria-hidden="true"></div>
          <div className="container band-content reveal">
            <h2>Consumer</h2>
            <p>
              Plain-English deal scores with rationale; rent/ARV bands; alerts when the thesis changes. Watchlist thresholds (DSCR≥1.25, Cap≥6%).
            </p>
            <div className="actions">
              <button
                className="cta glass"
                onClick={handleConsumerClick}
                style={{ 
                  display: "inline-block", 
                  padding: ".7rem 1.1rem", 
                  border: "1px solid var(--hair)", 
                  borderRadius: "999px", 
                  background: "rgba(255,255,255,.06)",
                  cursor: "pointer",
                  color: "white"
                }}
              >
                Enter Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* Investors band with dust + corner glows */}
        <section id="investor" className="band">
          <canvas className="dust-canvas" aria-hidden="true"></canvas>
          <div className="glowfield" aria-hidden="true"></div>
          <div className="container band-content reveal">
            <h2>Investors</h2>
            <p>
              Committee-grade underwriting, risk gates (flood/HOA/title), portfolio fit, dissent, and conditions to close with a confidence verdict.
            </p>
            <div className="actions">
              <button
                className="cta glass"
                onClick={handleInvestorClick}
                style={{ 
                  display: "inline-block", 
                  padding: ".7rem 1.1rem", 
                  border: "1px solid var(--hair)", 
                  borderRadius: "999px", 
                  background: "rgba(255,255,255,.06)",
                  cursor: "pointer",
                  color: "white"
                }}
              >
                Enter Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* Pricing (template only) */}
        <section id="pricing" className="section">
          <div className="container reveal" style={{ textAlign: "center" }}>
            <h2>Pricing</h2>
            <p>Templates only — final pricing TBD.</p>
            <div className="actions" style={{ justifyContent: "center" }}>
              <a
                className="glass"
                href="#contact"
                style={{ padding: ".7rem 1.1rem", borderRadius: "999px", border: "1px solid var(--hair)" }}
              >
                Consumer — Learn More
              </a>
              <a
                className="glass"
                href="#contact"
                style={{ padding: ".7rem 1.1rem", borderRadius: "999px", border: "1px solid var(--hair)" }}
              >
                Investors — Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <div className="container reveal" style={{ textAlign: "center" }}>
            <h2>Contact</h2>
            <p>
              <a href="mailto:contact@janus.ai">contact@janus.ai</a>
            </p>
          </div>
        </section>
      </main>

      <link rel="stylesheet" href="/css/janus-theme.css" />
      <script src="/js/janus-effects.js"></script>
    </div>
  );
};

export default LandingPage;