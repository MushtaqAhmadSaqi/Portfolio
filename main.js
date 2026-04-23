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
        const rx = (y - 0.5) * -3;
        const ry = (x - 0.5) * 3;

        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
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



  function initMagneticButtons() {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const buttons = selectAll(".magnetic");
    if (!buttons.length) return;

    const STRENGTH = 0.2;      // how strongly the button follows the cursor
    const LABEL_LAG = 0.3;     // inner label moves slightly for depth
    const FIELD = 40;          // px outside the button where the effect starts

    buttons.forEach((btn) => {
      const label = btn.querySelector(".button-label");

      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Normalized position inside the button for the glow ring
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        btn.style.setProperty("--mx", `${mx}%`);
        btn.style.setProperty("--my", `${my}%`);

        const tx = dx * STRENGTH;
        const ty = dy * STRENGTH;

        btn.style.transform = `translate(${tx}px, ${ty}px)`;
        btn.style.setProperty("--tx", `${tx}px`);
        btn.style.setProperty("--ty", `${ty}px`);

        if (label) {
          label.style.transform = `translate(${tx * LABEL_LAG}px, ${ty * LABEL_LAG}px)`;
        }
      };

      const onEnterField = () => btn.classList.add("is-near");

      const onLeave = () => {
        btn.classList.remove("is-near");
        btn.style.transform = "";
        btn.style.setProperty("--tx", "0px");
        btn.style.setProperty("--ty", "0px");
        if (label) label.style.transform = "";
      };

      // Attach a larger "gravity field" to each button using a proxy zone
      btn.addEventListener("mouseenter", onEnterField);
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);

      // Wider field detection: use mousemove on document with distance check
      document.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const inside =
          e.clientX >= r.left - FIELD &&
          e.clientX <= r.right + FIELD &&
          e.clientY >= r.top - FIELD &&
          e.clientY <= r.bottom + FIELD;

        if (inside && !btn.matches(":hover")) {
          // Soft pre-pull when cursor is near but not yet inside
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = (e.clientX - cx) * STRENGTH * 0.15;
          const dy = (e.clientY - cy) * STRENGTH * 0.15;
          btn.style.transform = `translate(${dx}px, ${dy}px)`;
          btn.classList.add("is-near");
        } else if (!inside && !btn.matches(":hover")) {
          btn.style.transform = "";
          btn.classList.remove("is-near");
        }
      }, { passive: true });
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
    // initCardTilt();
    initScrollProgress();
    initTypewriter();
    // initMagneticButtons();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
