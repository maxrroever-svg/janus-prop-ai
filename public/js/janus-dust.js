// JANUS dust — visual-only; content remains untouched
(function(){
  function setupDust(canvas){
    const ctx = canvas.getContext('2d', { alpha: true });
    const DPR = Math.min(window.devicePixelRatio||1, 2);
    let w=0,h=0, particles=[];

    function resize(){
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = w*DPR; canvas.height = h*DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
      init();
    }
    function init(){
      const count = Math.max(24, Math.floor((w*h)/22000));
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
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
      }
      requestAnimationFrame(step);
    }

    resize(); step();
    window.addEventListener('resize', resize, { passive:true });
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  }

  function initAll(){
    document.querySelectorAll('.janus .dust-canvas').forEach(setupDust);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();