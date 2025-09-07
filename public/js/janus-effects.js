// Resize-aware dust painter for .dust-canvas
(function(){
  const canvases = document.querySelectorAll('.dust-canvas, .twins-canvas');
  if(!canvases.length) return;

  function setup(canvas){
    const ctx = canvas.getContext('2d', { alpha: true });
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w=0,h=0, P=[];

    function resize(){
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      canvas.width = w*DPR; canvas.height = h*DPR;
      canvas.style.width = w+'px'; canvas.style.height = h+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
      const n = Math.max(220, Math.floor((w*h)/6500));
      P = new Array(n).fill(0).map(()=>({
        x:Math.random()*w, y:Math.random()*h,
        r:Math.random()*1.4+.6, a:Math.random()*.4+.25
      }));
      draw();
    }

    function draw(){
      ctx.clearRect(0,0,w,h);
      for(const p of P){
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
      }
    }
    resize();
    window.addEventListener('resize', resize, { passive:true });
    if('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  }

  canvases.forEach(setup);
})();