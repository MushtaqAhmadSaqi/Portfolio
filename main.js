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

    const animate = (el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString() + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });

    nodes.forEach((n) => io.observe(n));
  }

  function initTilt() {
    if (window.matchMedia("(hover: none)").matches) return;
    selectAll(".project-card, .skill-card, .profile-card, .hero-panel").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
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
    initTilt();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
