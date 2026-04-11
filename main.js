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
    three: {
      particleCount: 1200,
      meshRotationSpeed: 0.003,
      mouseInfluence: 0.0005,
    },
    nav: {
      hideThreshold: 80,     // px scrolled before nav hides
    },
    loader: {
      minDuration: 2200,     // Minimum loader display time (ms)
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
  //  3.  THREE.JS — 3D HERO SCENE
  // ──────────────────────────────────────────
  function initThreeScene() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ─── Icosahedron (wireframe mesh) ───
    const icoGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x6C63FF,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icosahedron);

    // ─── Inner glow mesh ───
    const innerGeo = new THREE.IcosahedronGeometry(1.3, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x6C63FF,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // ─── Particle field ───
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = CONFIG.three.particleCount;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 14;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x6C63FF,
      size: 0.015,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // ─── Mouse tracking for 3D ───
    const mouseTarget = { x: 0, y: 0 };

    document.addEventListener('mousemove', (e) => {
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ─── Resize handler ───
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    // ─── Animation loop ───
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Rotate meshes
      icosahedron.rotation.x += CONFIG.three.meshRotationSpeed;
      icosahedron.rotation.y += CONFIG.three.meshRotationSpeed * 0.7;

      innerMesh.rotation.x -= CONFIG.three.meshRotationSpeed * 0.5;
      innerMesh.rotation.y -= CONFIG.three.meshRotationSpeed * 0.3;

      // Subtle scale breathing
      const breathe = 1 + Math.sin(elapsed * 0.8) * 0.04;
      icosahedron.scale.set(breathe, breathe, breathe);

      // Mouse influence on rotation
      icosahedron.rotation.x += mouseTarget.y * CONFIG.three.mouseInfluence;
      icosahedron.rotation.y += mouseTarget.x * CONFIG.three.mouseInfluence;

      // Rotate particles slowly
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      renderer.render(scene, camera);
    }

    animate();
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
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach((card) => {
      const maxTilt = 8; // degrees

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      });
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
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('.mobile-menu__link').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
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
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) return;

      // Compose mailto link as fallback
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:mushtaq@example.com?subject=${subject}&body=${body}`;

      // Visual feedback
      const btn = document.getElementById('formSubmit');
      btn.textContent = '✓ Opening email client...';
      btn.style.background = '#22c55e';
      btn.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.35)';

      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.style.boxShadow = '';
        form.reset();
      }, 2500);
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
            link.style.color = link.getAttribute('href') === `#${id}`
              ? 'var(--accent-light)'
              : '';
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }


  // ──────────────────────────────────────────
  //  INITIALIZATION
  // ──────────────────────────────────────────
  function init() {
    initLoader();
    initCursor();
    initThreeScene();
    initScrollReveals();
    initNavScroll();
    initCardTilt();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initActiveNavHighlight();

    // Delay GSAP scroll effects to ensure DOM is ready
    setTimeout(initGSAPScrollEffects, 100);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
