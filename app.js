// ── CUSTOM CURSOR (desktop only) ───────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (hasPointer) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left    = mx + 'px';
    cursor.style.top     = my + 'px';
    cursor.style.opacity = '1';
  }, { passive: true });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .skill-tag, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width       = '56px';
      ring.style.height      = '56px';
      ring.style.opacity     = '0.9';
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width       = '36px';
      ring.style.height      = '36px';
      ring.style.opacity     = '0.5';
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// ── SCROLL REVEAL ──────────────────────────────────────────
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── ACTIVE NAV LINK ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--gold)' : '';
  });
}, { passive: true });

// ── HAMBURGER MENU ─────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
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

// ── TERMINAL TYPEWRITER ────────────────────────────────────
const terminalEl = document.getElementById('terminalBody');
if (terminalEl) {
  const lines = [
    { html: '<span class="t-comment">// Aaryan\'s profile</span>' },
    { html: '' },
    { html: '<span class="t-key">const</span> <span class="t-val">aaryan</span> <span class="t-bracket">= {</span>' },
    { html: '&nbsp;&nbsp;<span class="t-key">role</span><span class="t-bracket">:</span>     <span class="t-str">"Full-Stack Dev"</span><span class="t-bracket">,</span>' },
    { html: '&nbsp;&nbsp;<span class="t-key">location</span><span class="t-bracket">:</span> <span class="t-str">"Haryana, IN"</span><span class="t-bracket">,</span>' },
    { html: '&nbsp;&nbsp;<span class="t-key">stack</span><span class="t-bracket">:</span>    <span class="t-bracket">[</span><span class="t-str">"C++"</span><span class="t-bracket">,</span> <span class="t-str">"React"</span><span class="t-bracket">,</span>' },
    { html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-str">"Node"</span><span class="t-bracket">,</span> <span class="t-str">"MongoDB"</span><span class="t-bracket">],</span>' },
    { html: '&nbsp;&nbsp;<span class="t-key">status</span><span class="t-bracket">:</span>   <span class="t-str">"open to work"</span><span class="t-bracket">,</span>' },
    { html: '&nbsp;&nbsp;<span class="t-key">goal</span><span class="t-bracket">:</span>     <span class="t-str">"high-impact SWE"</span>' },
    { html: '<span class="t-bracket">}</span>' },
    { html: '' },
    { html: '<span class="t-comment">&gt; currently building...<span class="t-cursor"></span></span>' },
  ];

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) return;
    const div = document.createElement('div');
    div.innerHTML = lines[lineIndex].html;
    terminalEl.appendChild(div);
    lineIndex++;
    const delay = lineIndex <= 2 ? 320 : lineIndex >= 11 ? 200 : 130;
    setTimeout(typeLine, delay);
  }

  // Start after hero animations settle
  setTimeout(typeLine, 1600);
}

// ── ABOUT STATS COUNT-UP ──────────────────────────────
function countUp(el, target, duration, suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

function getMonthsSince(year, month, day) {
  const now = new Date();
  const start = new Date(year, month - 1, day);
  const months = (now.getFullYear() - start.getFullYear()) * 12
    + (now.getMonth() - start.getMonth());
  // Subtract 1 if we haven't reached the start day yet this month
  return now.getDate() >= start.getDate() ? months : months - 1;
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    statsObserver.unobserve(entry.target);

    const cards = entry.target.querySelectorAll('.stat-card');

    cards.forEach((card, i) => {
      const numEl = card.querySelector('.stat-number');
      if (!numEl) return;

      const duration = 1800;

      if (i === 0) {
        // Months — dynamic from Sept 2023
        const months = getMonthsSince(2024, 9 ,1);
        countUp(numEl, months, duration);

      } else if (i === 1) {
        // Projects — 10+
        countUp(numEl, 10, duration, '+');

      } else if (i === 2) {
        // Technologies — 15+
        countUp(numEl, 15, duration, '+');

      } else if (i === 3) {
        // 4th card — counts to 99 then flips to ∞
        let start = 0;
        const target = 99;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            clearInterval(timer);
            numEl.style.transition = 'opacity 0.4s';
            numEl.style.opacity = '0';
            setTimeout(() => {
              numEl.textContent = '∞';
              numEl.style.opacity = '1';
            }, 400);
          } else {
            numEl.textContent = Math.floor(start);
          }
        }, 16);
      }
    });
  });
}, { threshold: 0.3 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

// ── CERTIFICATE MODAL ──────────────────────────────────────
const certModal      = document.getElementById('certModal');
const certModalImg   = document.getElementById('certModalImg');
const certModalTitle = document.getElementById('certModalTitle');

function openCert(src, title) {
  certModalImg.src           = src;
  certModalTitle.textContent = title;
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCert(e) {
  if (!e || e.target === certModal || e.target.closest('.cert-modal-close')) {
    certModal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { certModalImg.src = ''; }, 300);
  }
}

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCert();
});

// Attach click listeners via JS instead of onclick in HTML
document.querySelectorAll('.cert-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const src   = thumb.querySelector('img').src;
    const title = thumb.querySelector('span').textContent;
    openCert(src, title);
  });
});

// ── CONTACT FORM ──────────────────────────────────────
// Add this to the bottom of your app.js

const contactForm  = document.getElementById('contactForm');
const formSubmit   = document.getElementById('formSubmit');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Loading state
    formSubmit.disabled = true;
    formSubmit.querySelector('.submit-text').textContent = 'Sending...';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.reset();
        formSuccess.classList.add('show');
        formSubmit.style.display = 'none';
        setTimeout(() => {
          formSuccess.classList.remove('show');
          formSubmit.style.display = 'inline-flex';
          formSubmit.disabled = false;
          formSubmit.querySelector('.submit-text').textContent = 'Send Message';
        }, 5000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      formSubmit.disabled = false;
      formSubmit.querySelector('.submit-text').textContent = 'Try Again';
      setTimeout(() => {
        formSubmit.querySelector('.submit-text').textContent = 'Send Message';
      }, 3000);
    }
  });
}