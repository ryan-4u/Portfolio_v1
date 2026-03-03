// ── CURSOR ────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function anim(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  if(cursor){ cursor.style.left=mx+'px'; cursor.style.top=my+'px'; }
  if(cursorRing){ cursorRing.style.left=rx+'px'; cursorRing.style.top=ry+'px'; }
  requestAnimationFrame(anim);
})();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursorRing&&(cursorRing.style.transform='translate(-50%,-50%) scale(1.6)'));
  el.addEventListener('mouseleave',()=>cursorRing&&(cursorRing.style.transform='translate(-50%,-50%) scale(1)'));
});

// ── HAMBURGER ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('navOverlay');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navOverlay.classList.toggle('open');
  document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
});
function closeMenu() {
  hamburger.classList.remove('open');
  navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ── FILTER ────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.feat-card').forEach(c => {
      const show = f === 'all' || c.dataset.status === f;
      c.style.display = show ? 'flex' : 'none';
      // Re-trigger reveal for shown items
      if (show && !c.classList.contains('revealed')) {
        setTimeout(() => c.classList.add('revealed'), 50);
      }
    });
    document.querySelectorAll('.proj-row').forEach(r => {
      const show = f === 'all' || r.dataset.status === f;
      r.style.display = show ? 'grid' : 'none';
      if (show && !r.classList.contains('revealed')) {
        setTimeout(() => r.classList.add('revealed'), 50);
      }
    });
  });
});

// ── SCROLL REVEAL ─────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));