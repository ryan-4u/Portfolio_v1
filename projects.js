// ── CURSOR (desktop only) ─────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (hasPointer) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  }, { passive: true });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.6)');
    el.addEventListener('mouseleave', () => ring.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}

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
// ── FILTER ────────────────────────────────────────────
const featuredLabel = document.querySelector('.sec-label.featured-label');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;

    // Filter featured cards with fade transition
    let visibleFeatured = 0;
    document.querySelectorAll('.feat-card').forEach(c => {
      const show = f === 'all' || c.dataset.status === f;
      if (show) {
        visibleFeatured++;
        c.style.opacity = '0';
        c.style.display = 'flex';
        setTimeout(() => {
          c.style.transition = 'opacity 0.35s ease';
          c.style.opacity = '1';
          if (!c.classList.contains('revealed')) c.classList.add('revealed');
        }, 30);
      } else {
        c.style.transition = 'opacity 0.25s ease';
        c.style.opacity = '0';
        setTimeout(() => { c.style.display = 'none'; }, 260);
      }
    });

    // Show/hide featured section label
    if (featuredLabel) {
      featuredLabel.style.transition = 'opacity 0.25s ease';
      featuredLabel.style.opacity = visibleFeatured === 0 ? '0' : '1';
      featuredLabel.style.display = visibleFeatured === 0 ? 'none' : 'flex';
    }

    // Filter list rows with fade transition
    document.querySelectorAll('.proj-row').forEach((r, i) => {
      const show = f === 'all' || r.dataset.status === f;
      if (show) {
        r.style.opacity = '0';
        r.style.display = 'grid';
        setTimeout(() => {
          r.style.transition = 'opacity 0.35s ease';
          r.style.opacity = '1';
          if (!r.classList.contains('revealed')) r.classList.add('revealed');
        }, 30 + i * 40);
      } else {
        r.style.transition = 'opacity 0.25s ease';
        r.style.opacity = '0';
        setTimeout(() => { r.style.display = 'none'; }, 260);
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