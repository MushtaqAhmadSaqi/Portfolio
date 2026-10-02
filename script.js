/* Portfolio interaction script
   Fixes applied vs original:
   - Theme no longer written to localStorage on every page load (only on user click)
   - localStorage calls wrapped in try/catch for private-browsing safety
   - aria-pressed removed from theme toggle; only aria-label is used
   - Active nav uses scroll-position check instead of IntersectionObserver thresholds
     that fail for tall sections
   - Escape key closes mobile menu and returns focus to button
   - Scroll progress bar uses transform:scaleX instead of width (no layout recalc)
   - All scroll/resize handlers share one rAF callback
   - Contact form: form is NOT reset after mailto, so message is preserved if no mail
     app opens; errors set aria-invalid and move focus to the failing field
   - readyState guard ensures init runs even if DOMContentLoaded already fired */
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
    currentYear: "#currentYear",
    scrollProgress: "#scrollProgress"
  };

  const THEME_KEY = "theme";
  const DESKTOP_BREAKPOINT = 960;
  const CONTACT_EMAIL = "mushtaqahmadsaqi@gmail.com";
  const root = document.documentElement;

  const select = (s) => document.querySelector(s);
  const selectAll = (s) => Array.from(document.querySelectorAll(s));
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme ---------- */
  function readStoredTheme() {
    try {
      const v = localStorage.getItem(THEME_KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (_) {
      return null; // private mode / blocked storage
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {
      /* storage unavailable; theme still applies this visit */
    }
  }

  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) storeTheme(theme);

    const btn = select(SELECTORS.themeToggle);
    if (btn) {
      btn.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  function initTheme() {
    // The head inline script already set data-theme before first paint.
    // Here we only attach the toggle listener; we do NOT re-persist the initial value.
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const initial =
      root.getAttribute("data-theme") || readStoredTheme() || systemTheme;
    applyTheme(initial, false);

    const btn = select(SELECTORS.themeToggle);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next, true);
    });
  }

  /* ---------- Mobile menu ---------- */
  function setMenuOpen(open) {
    const btn = select(SELECTORS.menuToggle);
    const menu = select(SELECTORS.mobileMenu);
    if (!btn || !menu) return;
    btn.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  }

  function initMobileMenu() {
    const btn = select(SELECTORS.menuToggle);
    const menu = select(SELECTORS.mobileMenu);
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      setMenuOpen(btn.getAttribute("aria-expanded") !== "true");
    });

    selectAll(".mobile-nav a").forEach((link) =>
      link.addEventListener("click", () => setMenuOpen(false))
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        btn.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > DESKTOP_BREAKPOINT) setMenuOpen(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function setRevealDelays() {
    selectAll(SELECTORS.reveal).forEach((el) => {
      const delay = Number(el.getAttribute("data-reveal-delay"));
      if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
    });
  }

  function showElement(el) {
    el.classList.add("is-visible");

    // Clear stagger delay after it fires so hover transitions stay snappy
    const delay = el.style.getPropertyValue("--reveal-delay");
    if (!delay) return;

    const clearDelay = (e) => {
      if (e.target !== el || e.propertyName !== "opacity") return;
      el.style.removeProperty("--reveal-delay");
      el.removeEventListener("transitionend", clearDelay);
    };
    el.addEventListener("transitionend", clearDelay);
  }

  function initRevealAnimations() {
    const elements = selectAll(SELECTORS.reveal);
    if (!elements.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          showElement(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ---------- Scroll effects: header, progress bar, active nav ---------- */
  function initScrollEffects() {
    const header = select(SELECTORS.header);
    const bar = select(SELECTORS.scrollProgress);
    const links = selectAll(SELECTORS.navLinks);
    const sections = selectAll(SELECTORS.sections);
    let activeId = null;
    let frame = null;

    function setActive(id) {
      if (id === activeId) return;
      activeId = id;
      links.forEach((link) => {
        const matches = id !== null && link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", matches);
        if (matches) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    function update() {
      frame = null;
      const y = window.scrollY;
      const total = root.scrollHeight - window.innerHeight;

      if (header) header.classList.toggle("is-scrolled", y > 12);

      // scaleX(0..1) — no layout cost
      if (bar) bar.style.transform = `scaleX(${total > 0 ? Math.min(y / total, 1) : 0})`;

      if (!links.length || !sections.length) return;

      // Section whose top edge has crossed the upper-third of the viewport
      const line = window.innerHeight * 0.35;
      let current = null;
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= line) current = section;
      });

      // At the very bottom of the page, force-highlight the last section
      if (total > 0 && y >= total - 2) current = sections[sections.length - 1];

      setActive(current ? current.id : null);
    }

    function schedule() {
      if (frame === null) frame = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    const form = select(SELECTORS.contactForm);
    const status = select(SELECTORS.formStatus);
    if (!form || !status) return;

    // Ensure ARIA live region is configured (HTML already sets these, but belt-and-braces)
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    const field = (name) => form.querySelector(`[name="${name}"]`);

    // Clear per-field error state as user types
    [field("name"), field("email"), field("message")].filter(Boolean).forEach((input) => {
      input.addEventListener("input", () => input.removeAttribute("aria-invalid"));
    });

    function fail(input, message) {
      status.textContent = message;
      if (input) {
        input.setAttribute("aria-invalid", "true");
        input.focus();
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name) return fail(field("name"), "Please enter your name.");
      if (!email) return fail(field("email"), "Please enter your email address.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return fail(field("email"), "Please enter a valid email address.");
      }
      if (!message) return fail(field("message"), "Please write a message.");

      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

      // The form is intentionally NOT reset: if no mail app opens, the visitor
      // still has their text and can copy it to send manually.
      status.textContent = `Opening your email app\u2026 If nothing happens, write to ${CONTACT_EMAIL}.`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- Misc ---------- */
  function setCurrentYear() {
    const node = select(SELECTORS.currentYear);
    if (node) node.textContent = String(new Date().getFullYear());
  }

  /* ---------- Bootstrap ---------- */
  function init() {
    setRevealDelays();
    initTheme();
    initMobileMenu();
    initRevealAnimations();
    initScrollEffects();
    initContactForm();
    setCurrentYear();
  }

  // Safe whether the script loads sync, deferred, or after DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
