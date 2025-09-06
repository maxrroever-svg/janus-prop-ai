// =======================================================
// JANUS EFFECTS — dust, scrollspy, reveal-on-scroll
// (No nebula here; nebula is just a front-page element)
// =======================================================
(function(){
  // Reveal-on-scroll
  function revealInit(){
    const els = document.querySelectorAll('.janus .reveal');
    if(!els.length) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { rootMargin:'-10% 0px -10% 0px', threshold:0.02 });
    els.forEach(el=>io.observe(el));
  }

  // Scrollspy for header nav (front page)
  function spyInit(){
    const links = [...document.querySelectorAll('.janus .nav a')];
    if(!links.length) return;
    const sections = links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const spy = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const id = '#'+e.target.id;
          links.forEach(l=>l.classList.remove('active'));
          links.filter(l=>l.getAttribute('href')===id).forEach(l=>l.classList.add('active'));
        }
      });
    }, { rootMargin:'-35% 0px -60% 0px', threshold:0.01 });
    sections.forEach(s=>spy.observe(s));
  }

  // Dust fields for any .dust-canvas
  function dustInit(){
    document.querySelectorAll('.janus .dust-canvas').forEach(canvas=>{
      if(canvas.__janusDust) return; canvas.__janusDust = true;
      const ctx = canvas.getContext('2d', { alpha:true });
      const DPR = Math.min(window.devicePixelRatio||1, 2);
      let w=0,h=0, parts=[];

      function resize(){
        const r = canvas.getBoundingClientRect();
        w = Math.max(1, Math.floor(r.width));
        h = Math.max(1, Math.floor(r.height));
        canvas.width = w*DPR; canvas.height = h*DPR;
        ctx.setTransform(DPR,0,0,DPR,0,0);
        const n = Math.max(24, Math.floor((w*h)/22000));
        parts = new Array(n).fill(0).map(()=>({
          x:Math.random()*w, y:Math.random()*h,
          r:Math.random()*1.2 + 0.5, a:Math.random()*0.45 + 0.25,
          vx:(Math.random()*0.22 - 0.11), vy:(Math.random()*0.22 - 0.11)
        }));
      }

      function step(){
        ctx.clearRect(0,0,w,h);
        for(const p of parts){
          p.x+=p.vx; p.y+=p.vy;
          if(p.x<-6)p.x=w+6; if(p.x>w+6)p.x=-6;
          if(p.y<-6)p.y=h+6; if(p.y>h+6)p.y=-6;
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fillStyle = `rgba(255,255,255,${p.a})`;
          ctx.fill();
        }
        requestAnimationFrame(step);
      }

      resize(); step();
      window.addEventListener('resize', resize, { passive:true });
      if('ResizeObserver' in window){ new ResizeObserver(resize).observe(canvas); }
    });
  }

  // Boot
  function boot(){
    revealInit();
    spyInit();
    dustInit();
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', boot); }
  else{ boot(); }
  // Re-init on SPA mutations
  new MutationObserver(boot).observe(document.body,{childList:true,subtree:true});
})();