/* ============================================================
   Lakshmi Pandranki Portfolio — main.js
   ============================================================ */

'use strict';

// ── Theme Toggle ─────────────────────────────────────────────
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme Button ── */
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ── Scroll Progress Bar ── */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    if (progressBar) progressBar.style.width = `${pct}%`;
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── Cursor Glow ── */
  const cursor = document.querySelector('.cursor-glow');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    (function animate() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.left = `${cx}px`;
      cursor.style.top  = `${cy}px`;
      requestAnimationFrame(animate);
    })();
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  /* ── Hamburger / Mobile Menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileLinks.forEach(a => a.addEventListener('click', closeMobileMenu));
  }

  /* ── Navbar Active + Scroll-hide ── */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let lastScroll = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (navbar) {
      if (current > lastScroll && current > 120) {
        navbar.style.top = '-80px';
      } else {
        navbar.style.top = '1rem';
      }
    }
    lastScroll = current;
  }, { passive: true });

  /* ── Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObserver.observe(el));

  /* ── Skill Bars Animation ── */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct = fill.getAttribute('data-width') || '0';
        setTimeout(() => { fill.style.width = `${pct}%`; }, 150);
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(b => barObserver.observe(b));

  /* ── Project Filtering ── */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cats = card.getAttribute('data-category') || '';
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ── Contact Form ── */
  const form = document.getElementById('contact-form');
  const formEl = document.getElementById('form-element');
  const successMsg = document.getElementById('form-success');

  // Initialize EmailJS (replace with your Public Key from emailjs.com)
  emailjs.init('L3wzfQ24xaXVhp8C0');

  if (formEl) {
    const inputs = formEl.querySelectorAll('.form-input');
    inputs.forEach(inp => {
      inp.addEventListener('focus', () => formEl.closest('.contact-form')?.classList.add('focused'));
      inp.addEventListener('blur', () => {
        const anyFocused = [...inputs].some(i => i === document.activeElement);
        if (!anyFocused) formEl.closest('.contact-form')?.classList.remove('focused');
      });
    });

    formEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();
      const data = {
        name: formEl.querySelector('[name="name"]').value.trim(),
        email: formEl.querySelector('[name="email"]').value.trim(),
        subject: formEl.querySelector('[name="subject"]').value.trim(),
        message: formEl.querySelector('[name="message"]').value.trim(),
      };
      let valid = true;

      if (!data.name) { showError('name-error', 'Name is required'); valid = false; }
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showError('email-error', 'Valid email required'); valid = false;
      }
      if (!data.subject) { showError('subject-error', 'Subject is required'); valid = false; }
      if (!data.message) { showError('message-error', 'Message is required'); valid = false; }
      if (!valid) return;

      const submitBtn = formEl.querySelector('.btn-submit');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner"></span> Sending...`;

      try {
        // Send both Contact Us email (to Lakshmi) and Auto Reply (to visitor)
        await Promise.all([
          // Send to Lakshmi
          emailjs.send(
            'service_5xqescd',      // Service ID
            'template_8acndpm',     // Contact Us Template ID
            {
              to_email: 'lakshmipandranki006@gmail.com',  // Your email
              from_name: data.name,
              from_email: data.email,
              subject: data.subject,
              message: data.message,
            }
          ),
          // Send Auto Reply to visitor
          emailjs.send(
            'service_5xqescd',      // Service ID
            'template_bvsy3e5',     // Auto Reply Template ID
            {
              to_email: data.email,   // Visitor's email
              from_name: data.name,
              subject: data.subject,
              message: data.message,
            }
          )
        ]);

        // Success state
        formEl.style.display = 'none';
        if (successMsg) successMsg.classList.add('visible');
        setTimeout(() => {
          if (successMsg) successMsg.classList.remove('visible');
          formEl.style.display = '';
          formEl.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m22 2-7 20-4-9-9-4z"/><path d="m22 2-11 11"/></svg> Send Message`;
        }, 4000);
      } catch (error) {
        console.error('EmailJS error:', error);
        showError('message-error', 'Failed to send message. Please try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m22 2-7 20-4-9-9-4z"/><path d="m22 2-11 11"/></svg> Send Message`;
      }
    });
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(e => e.textContent = '');
  }

  /* ── Tilt Effect on Project Cards ── */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s linear';
    });
  });

  /* ── Typed Hero Roles ── */
  const typedEl = document.getElementById('typed-role');
  if (typedEl) {
    const roles = [
      'Full Stack Developer',
      'Machine Learning Engineer',
      'Cybersecurity Researcher',
      'Data Science Enthusiast',
    ];
    let roleIdx = 0, charIdx = 0, deleting = false;

    function type() {
      const current = roles[roleIdx];
      if (!deleting) {
        typedEl.textContent = current.slice(0, charIdx++);
        if (charIdx > current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, charIdx--);
        if (charIdx < 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          charIdx = 0;
          setTimeout(type, 300);
          return;
        }
      }
      setTimeout(type, deleting ? 45 : 90);
    }
    type();
  }

  /* ── Counter Animation ── */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1500;
      const start = performance.now();
      function update(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (t < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

}); // end DOMContentLoaded
