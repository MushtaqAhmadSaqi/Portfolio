/* ============================================
   MUSHTAQ AHMAD SAQI — Portfolio JavaScript
   Animations · 3D · Cursor · Scroll Effects
   ============================================ */

(function () {
  'use strict';

  // ── Configuration ────────────────────────
  const CONFIG = {
    cursor: {
      lerpFactor: 0.12,      // Lower = more lag / smoother follow
      dotLerp: 0.35,         // Inner dot follows faster
    },
    nav: {
      hideThreshold: 80,     // px scrolled before nav hides
    },
    loader: {
      minDuration: 1300,     // Minimum loader display time (ms)
    },
  };


  // ── State ────────────────────────────────
  const mouse = { x: 0, y: 0, smooth: { x: 0, y: 0 }, dotSmooth: { x: 0, y: 0 } };
  let lastScrollY = 0;
  let ticking = false;


  // ──────────────────────────────────────────
  //  1.  PAGE LOADER
  // ──────────────────────────────────────────
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const start = Date.now();

    function hideLoader() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, CONFIG.loader.minDuration - elapsed);

      setTimeout(() => {
        loader.classList.add('hidden');
        // Start hero animations after loader finishes
        setTimeout(initHeroAnimations, 400);
      }, remaining);
    }

    // Wait for all critical content
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }
  }


  // ──────────────────────────────────────────
  //  2.  CUSTOM CURSOR
  // ──────────────────────────────────────────
  function initCursor() {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    // Track mouse position & show cursor on first move
    let cursorVisible = false;
    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!cursorVisible) {
        cursorVisible = true;
        // Snap to position immediately, then show
        mouse.smooth.x = e.clientX;
        mouse.smooth.y = e.clientY;
        mouse.dotSmooth.x = e.clientX;
        mouse.dotSmooth.y = e.clientY;
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    });

    // Hover state for interactive elements
    const interactiveSelectors = 'a, button, .btn, .project-card, .skill-badge, .social-link, .navbar__burger, input, textarea';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      });
    });

    // Animate cursor with lerp (linear interpolation)
    function animateCursor() {
      // Ring (outer) — more lag
      mouse.smooth.x += (mouse.x - mouse.smooth.x) * CONFIG.cursor.lerpFactor;
      mouse.smooth.y += (mouse.y - mouse.smooth.y) * CONFIG.cursor.lerpFactor;
      ring.style.left = mouse.smooth.x + 'px';
      ring.style.top = mouse.smooth.y + 'px';

      // Dot (inner) — less lag
      mouse.dotSmooth.x += (mouse.x - mouse.dotSmooth.x) * CONFIG.cursor.dotLerp;
      mouse.dotSmooth.y += (mouse.y - mouse.dotSmooth.y) * CONFIG.cursor.dotLerp;
      dot.style.left = mouse.dotSmooth.x + 'px';
      dot.style.top = mouse.dotSmooth.y + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }




  // ──────────────────────────────────────────
  //  4.  HERO TEXT ANIMATIONS (GSAP)
  // ──────────────────────────────────────────
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    // Split name into characters
    const nameEl = document.getElementById('heroName');
    if (nameEl) {
      const words = nameEl.querySelectorAll('.word');
      words.forEach((word) => {
        const text = word.getAttribute('data-word');
        word.innerHTML = '';
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char;
          word.appendChild(span);
        });
      });
    }

    // Timeline
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Greeting
    tl.to('.hero__greeting', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    });

    // Characters (staggered)
    tl.to('.hero__name .char', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.04,
    }, '-=0.3');

    // Subtitle
    tl.to('.hero__title', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.5');

    tl.to('.hero__subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.7,
    }, '-=0.5');

    // CTA buttons
    tl.to('.hero__cta', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.4');

    // Scroll indicator
    tl.to('.hero__scroll', {
      opacity: 0.6,
      duration: 1,
    }, '-=0.2');
  }


  // ──────────────────────────────────────────
  //  5.  SCROLL-TRIGGERED REVEALS
  // ──────────────────────────────────────────
  function initScrollReveals() {
    // Use Intersection Observer for performance
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
  }


  // ──────────────────────────────────────────
  //  6.  NAVIGATION SCROLL BEHAVIOR
  // ──────────────────────────────────────────
  function initNavScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      const currentScrollY = window.scrollY;

      // Add/remove glass effect
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Hide/show on scroll direction
      if (currentScrollY > CONFIG.nav.hideThreshold) {
        if (currentScrollY > lastScrollY) {
          navbar.classList.add('nav-hidden');
        } else {
          navbar.classList.remove('nav-hidden');
        }
      } else {
        navbar.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    });
  }


  // ──────────────────────────────────────────
  //  7.  PROJECT CARD 3D TILT EFFECT
  // ──────────────────────────────────────────
  function initCardTilt() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card) => {
      const maxTilt = 15; // Increased for better effect

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }


  // ──────────────────────────────────────────
  //  7.5. THREE.JS 3D BACKGROUND
  // ──────────────────────────────────────────
  function initThreeJS() {
    if (typeof THREE === 'undefined') return;

    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 12;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Connections (lines)
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x14b8a6, 
        transparent: true, 
        opacity: 0.1 
    });
    
    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 4;

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    document.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5);
      targetMouseY = (e.clientY / window.innerHeight - 0.5);
    });

    function animate() {
      requestAnimationFrame(animate);

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      // Dynamic line connections (update a few every frame)
      const positions = particlesGeometry.attributes.position.array;
      const linePositions = [];
      const threshold = 1.8;

      for (let i = 0; i < particlesCount; i++) {
          for (let j = i + 1; j < particlesCount; j++) {
              const dx = positions[i * 3] - positions[j * 3];
              const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
              const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
              const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

              if (dist < threshold) {
                  linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                  linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
              }
          }
          // Limit lines to prevent performance drop
          if (linePositions.length > 1000) break;
      }
      
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
      lineMesh.rotation.y = particlesMesh.rotation.y;
      lineMesh.rotation.x = particlesMesh.rotation.x;

      // Camera parallax
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * -1.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }


  // ──────────────────────────────────────────
  //  8.  MOBILE MENU
  // ──────────────────────────────────────────
  function initMobileMenu() {
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('mobileMenu');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    menu.querySelectorAll('.mobile-menu__link').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ──────────────────────────────────────────
  //  9.  SMOOTH SCROLL FOR NAV LINKS
  // ──────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        const offset = 40; // Extra top padding
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      });
    });
  }


  // ──────────────────────────────────────────
  //  10. CONTACT FORM (basic handler)
  // ──────────────────────────────────────────
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('formSubmit');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) return;

      // Update button state to show loading
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        // Replace this URL with your actual Formspree endpoint
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
          btn.textContent = '✓ Message Sent!';
          btn.style.background = '#22c55e';
          btn.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.35)';
          form.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        btn.textContent = '✕ Error sending';
        btn.style.background = '#ef4444';
      } finally {
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.boxShadow = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }


  // ──────────────────────────────────────────
  //  11. GSAP SCROLL TRIGGER ENHANCEMENTS
  // ──────────────────────────────────────────
  function initGSAPScrollEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Parallax on hero content
    gsap.to('.hero__content', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 100,
      opacity: 0.2,
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.about__stat-number');
    stats.forEach((stat) => {
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
          stat.style.opacity = '1';
          stat.style.transform = 'translateY(0)';
        },
        once: true,
      });
    });

    // Project cards stagger
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'expo.out',
      });
    });

    // Vision quote scale-in
    gsap.from('.vision__quote', {
      scrollTrigger: {
        trigger: '.vision__quote',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      scale: 0.92,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
    });

    // Skills terminal-style reveal
    gsap.utils.toArray('.skill-badge').forEach((badge, i) => {
      gsap.from(badge, {
        scrollTrigger: {
          trigger: badge,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        duration: 0.15,
        delay: i * 0.08,
        ease: 'power2.out',
        onComplete: () => {
          // Add typing effect
          const dot = badge.querySelector('.skill-badge__dot');
          if (dot) {
            gsap.from(dot, {
              scale: 0,
              duration: 0.1,
              ease: 'back.out(1.7)',
            });
          }
        }
      });
    });
  }


  // ──────────────────────────────────────────
  //  12. ACTIVE NAV LINK HIGHLIGHTING
  // ──────────────────────────────────────────
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }


  // ──────────────────────────────────────────
  //  13. THEME TOGGLE (DARK / LIGHT JELLY SWITCH)
  // ──────────────────────────────────────────
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const thumb = document.getElementById('jellyThumb');
    if (!toggle || !thumb) return;

    // The maximum travel distance for the thumb
    // total width = 72, thumb = 26, left = 4, right = 4 -> total movement = 72 - 26 - 8 = 38
    const TRAVEL_X = 38;

    function applyThumbPosition(isLight, animate = false) {
      const targetX = isLight ? TRAVEL_X : 0;
      
      if (animate && typeof gsap !== 'undefined') {
        const tl = gsap.timeline();
        tl.to(thumb, {
          duration: 0.2,
          scaleX: 1.5,
          ease: "power2.out"
        })
        .to(thumb, {
          duration: 0.6,
          x: targetX,
          scaleX: 1,
          ease: "elastic.out(1, 0.4)"
        }, "-=0.1");
      } else {
        if (typeof gsap !== 'undefined') {
          gsap.set(thumb, { x: targetX, scaleX: 1 });
        } else {
          thumb.style.transform = `translateX(${targetX}px)`;
        }
      }
    }

    // Restore saved preference on load
    const saved = localStorage.getItem('theme');
    const initialLight = saved === 'light';
    if (initialLight) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Set initial position without animating
    applyThumbPosition(initialLight, false);

    toggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        applyThumbPosition(false, true);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        applyThumbPosition(true, true);
      }
    });
  }


  // ──────────────────────────────────────────
  //  14. BACK TO TOP
  // ──────────────────────────────────────────
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ──────────────────────────────────────────
  //  INITIALIZATION
  // ──────────────────────────────────────────
  function init() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    initLoader();
    if (!prefersReducedMotion) {
      initCursor();
    }
    initScrollReveals();
    initNavScroll();
    if (!prefersReducedMotion) {
      initCardTilt();
    }
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initActiveNavHighlight();
    initThemeToggle();
    initBackToTop();
    initThreeJS();

    // Graceful photo fallback — hide broken img, show initials
    const aboutPhoto = document.querySelector('.about__photo');
    if (aboutPhoto) {
      aboutPhoto.addEventListener('error', () => {
        aboutPhoto.style.display = 'none';
        const placeholder = aboutPhoto.nextElementSibling;
        if (placeholder) placeholder.style.display = '';
      });
    }

    // Delay GSAP scroll effects to ensure DOM is ready
    if (!prefersReducedMotion) {
      setTimeout(initGSAPScrollEffects, 100);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
