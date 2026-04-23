/* Portfolio rewrite
   File: main.js */

(function () {
  "use strict";

  const SELECTORS = {
    header: "#siteHeader",
    themeToggle: "#themeToggle",
    menuToggle: "#menuToggle",
    mobileMenu: "#mobileMenu",
    navLinks: ".site-nav a, .mobile-nav a",
    reveal: "[data-reveal]",
    sections: "main section[id]",
    contactForm: "#contactForm",
    formStatus: "#formStatus",
    currentYear: "#currentYear"
  };

  const state = {
    theme: document.documentElement.getAttribute("data-theme") || "dark"
  };

  function select(selector) {
    return document.querySelector(selector);
  }

  function selectAll(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  function setRevealDelays() {
    selectAll(SELECTORS.reveal).forEach((element) => {
      const delay = element.getAttribute("data-reveal-delay");
      if (delay) {
        element.style.setProperty("--reveal-delay", `${Number(delay)}ms`);
      }
    });
  }

  function initHeaderShadow() {
    const header = select(SELECTORS.header);
    if (!header) {
      return;
    }

    const updateHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const button = select(SELECTORS.themeToggle);
    if (button) {
      const isLight = theme === "light";
      button.setAttribute("aria-pressed", String(isLight));
      button.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }
  }

  function initThemeToggle() {
    const button = select(SELECTORS.themeToggle);
    if (!button) {
      return;
    }

    applyTheme(state.theme);

    button.addEventListener("click", () => {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  function closeMobileMenu() {
    const button = select(SELECTORS.menuToggle);
    const menu = select(SELECTORS.mobileMenu);

    if (!button || !menu) {
      return;
    }

    button.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  }

  function initMobileMenu() {
    const button = select(SELECTORS.menuToggle);
    const menu = select(SELECTORS.mobileMenu);

    if (!button || !menu) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("is-open", !isOpen);
    });

    selectAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) {
        closeMobileMenu();
      }
    });
  }

  function initRevealAnimations() {
    const elements = selectAll(SELECTORS.reveal);

    if (!elements.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    elements.forEach((element) => observer.observe(element));
  }

  function initActiveNavigation() {
    const links = selectAll(SELECTORS.navLinks);
    const sections = selectAll(SELECTORS.sections);

    if (!links.length || !sections.length) {
      return;
    }

    const map = new Map(
      links.map((link) => [link.getAttribute("href"), link])
    );

    const setActiveLink = (id) => {
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveLink(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -55% 0px"
      }
    );

    sections.forEach((section) => {
      observer.observe(section);

      if (!map.has(`#${section.id}`)) {
        return;
      }
    });
  }

  function initContactForm() {
    const form = select(SELECTORS.contactForm);
    const status = select(SELECTORS.formStatus);

    if (!form || !status) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in your name, email, and message.";
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = "Please enter a valid email address.";
        return;
      }

      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          message
        ].join("\n")
      );

      status.textContent = "Opening your email app...";
      window.location.href = `mailto:mushtaqahmadsaqi@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    });
  }

  function setCurrentYear() {
    const yearNode = select(SELECTORS.currentYear);
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }
  }

  function initCounters() {
    const nodes = selectAll("[data-count]");
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => {
        const d = Number(n.dataset.decimals || 0);
        n.textContent = Number(n.dataset.count).toFixed(d) + (n.dataset.suffix || "");
      });
      return;
    }

    const animate = (el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const decimals = Number(el.dataset.decimals || 0);
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (eased * target).toFixed(decimals) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    nodes.forEach((n) => io.observe(n));
  }

  function initCardTilt() {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = selectAll(".project-card, .skill-card, .timeline-item, .hero-panel, .profile-card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (y - 0.5) * -6;
        const ry = (x - 0.5) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function initScrollProgress() {
    const bar = select("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = `${scrolled}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initTypewriter() {
    const el = select("#typewriter");
    if (!el) return;

    const phrases = [
      "Full-Stack Developer",
      "AI Enthusiast",
      "COMSATS University Student",
      "Product-Focused Builder"
    ];

    // Reduced motion: just show a static line
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = phrases.join(" · ");
      return;
    }

    const TYPE_MS   = 70;    // speed while typing
    const DELETE_MS = 35;    // speed while deleting
    const HOLD_MS   = 1400;  // pause at full word
    const GAP_MS    = 400;   // pause between words

    let phraseIndex = 0;
    let charIndex   = 0;
    let deleting    = false;

    const tick = () => {
      const current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(tick, HOLD_MS);
        }
        return setTimeout(tick, TYPE_MS + Math.random() * 40);
      }

      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        return setTimeout(tick, GAP_MS);
      }
      return setTimeout(tick, DELETE_MS);
    };

    tick();
  }

  function initCustomCursor() {
    const dot  = select("#cursorDot");
    const ring = select("#cursorRing");
    if (!dot || !ring) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) {
      dot.remove();
      ring.remove();
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let targetX = mouseX;
    let targetY = mouseY;

    const EASE = 0.18;
    const SNAP_RADIUS = 60; // snap when within this many px of a magnetic element

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // Check for nearest magnetic target to snap ring to
      const mags = document.querySelectorAll("[data-magnetic]");
      let snapped = false;
      mags.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(mouseX - cx, mouseY - cy);
        if (dist < Math.max(SNAP_RADIUS, Math.max(r.width, r.height) * 0.55)) {
          targetX = cx;
          targetY = cy;
          snapped = true;
        }
      });
      if (!snapped) {
        targetX = mouseX;
        targetY = mouseY;
      }
      ring.classList.toggle("is-snapped", snapped);
    });

    const render = () => {
      ringX += (targetX - ringX) * EASE;
      ringY += (targetY - ringY) * EASE;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(render);
    };
    render();

    // Hover states
    const hoverables = "a, button, .card, .theme-toggle, .menu-toggle, label, [role='button']";
    const textInputs = "input, textarea";

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(textInputs)) {
        ring.classList.add("is-text");
        dot.classList.add("is-text");
        ring.classList.remove("is-hover");
        dot.classList.remove("is-hover");
        return;
      }
      if (e.target.closest(hoverables)) {
        ring.classList.add("is-hover");
        dot.classList.add("is-hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(textInputs)) {
        ring.classList.remove("is-text");
        dot.classList.remove("is-text");
      }
      if (e.target.closest(hoverables)) {
        ring.classList.remove("is-hover");
        dot.classList.remove("is-hover");
      }
    });

    // Click pulse
    document.addEventListener("mousedown", () => ring.classList.add("is-click"));
    document.addEventListener("mouseup",   () => ring.classList.remove("is-click"));

    // Hide when leaving the window
    document.addEventListener("mouseleave", () => {
      dot.classList.add("is-hidden");
      ring.classList.add("is-hidden");
    });
    document.addEventListener("mouseenter", () => {
      dot.classList.remove("is-hidden");
      ring.classList.remove("is-hidden");
    });
  }

  function initMagneticButtons() {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = selectAll("[data-magnetic]");
    if (!targets.length) return;

    // Wrap each target's contents in .magnetic-inner so text can move independently
    targets.forEach((el) => {
      if (!el.querySelector(".magnetic-inner")) {
        const inner = document.createElement("span");
        inner.className = "magnetic-inner";
        while (el.firstChild) inner.appendChild(el.firstChild);
        el.appendChild(inner);
      }
    });

    const RADIUS = 90;       // px — how close the cursor must be to activate
    const STRENGTH = 0.35;   // 0–1 — how far the button follows the cursor
    const TEXT_STRENGTH = 0.6; // inner text follows more eagerly for parallax
    const active = new Map();  // el → { rafId }

    const onMove = (e) => {
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);

        // Influence radius scales with button size (bigger buttons = bigger field)
        const influence = Math.max(RADIUS, Math.max(rect.width, rect.height) * 0.75);

        if (dist < influence) {
          const pull = 1 - dist / influence;
          const tx = dx * STRENGTH * pull;
          const ty = dy * STRENGTH * pull;
          const ix = dx * TEXT_STRENGTH * pull;
          const iy = dy * TEXT_STRENGTH * pull;

          el.classList.add("is-magnetic-active");
          el.classList.remove("is-magnetic-reset");
          el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;

          const inner = el.querySelector(".magnetic-inner");
          if (inner) inner.style.transform = `translate(${ix.toFixed(2)}px, ${iy.toFixed(2)}px)`;

          active.set(el, true);
        } else if (active.has(el)) {
          releaseMagnet(el);
        }
      });
    };

    const releaseMagnet = (el) => {
      el.classList.remove("is-magnetic-active");
      el.classList.add("is-magnetic-reset");
      el.style.transform = "";
      const inner = el.querySelector(".magnetic-inner");
      if (inner) inner.style.transform = "";
      active.delete(el);

      // Clean up the reset class once the transition ends
      setTimeout(() => el.classList.remove("is-magnetic-reset"), 620);
    };

    // Throttle with rAF so we never run more than once per frame
    let ticking = false;
    let lastEvent = null;
    window.addEventListener("mousemove", (e) => {
      lastEvent = e;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (lastEvent) onMove(lastEvent);
          ticking = false;
        });
        ticking = true;
      }
    });

    // Release all magnets when leaving the window
    window.addEventListener("mouseleave", () => {
      targets.forEach((el) => { if (active.has(el)) releaseMagnet(el); });
    });
  }

  function init() {
    setRevealDelays();
    initHeaderShadow();
    initThemeToggle();
    initMobileMenu();
    initRevealAnimations();
    initActiveNavigation();
    initContactForm();
    setCurrentYear();
    initCounters();
    initCardTilt();
    initScrollProgress();
    initTypewriter();
    initCustomCursor();
    initMagneticButtons();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
