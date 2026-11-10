import React, { useState, useEffect } from 'react';

export default function Navbar({ meta, theme, onToggleTheme, onNavigateHome, activeView }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { num: '01', label: 'Work', href: '#work' },
    { num: '02', label: 'About', href: '#about' },
    { num: '03', label: 'Skills', href: '#toolbox' },
    { num: '04', label: 'Experience', href: '#lab-log' },
    { num: '05', label: 'Contact', href: '#contact' },
  ];

  // Track window scroll for glass elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section in viewport
  useEffect(() => {
    if (activeView !== 'home') return;
    const sectionIds = ['work', 'about', 'toolbox', 'lab-log', 'contact'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: '-70px 0px -40% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, [activeView]);

  const handleAnchor = (href) => {
    setMobileOpen(false);
    if (activeView !== 'home') {
      onNavigateHome(href);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`notebook-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        {/* Brand Terminal Logo */}
        <button
          type="button"
          className="brand-stamp"
          onClick={() => onNavigateHome('#top')}
          aria-label="Return to top — Mushtaq Ahmad Portfolio"
        >
          <span className="brand-status-dot" aria-hidden="true" />
          <span className="brand-code">
            <span className="brand-bracket">&lt;</span>
            <span className="brand-name">M.Ahmad</span>
            <span className="brand-bracket"> /&gt;</span>
          </span>
          <span className="brand-badge-tag">AI · DEV</span>
        </button>

        {/* Center Navigation Links */}
        <div className="nav-controls">
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <li key={item.num}>
                    <button
                      type="button"
                      className={`nav-item-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleAnchor(item.href)}
                    >
                      <span className="nav-index-num">{item.num}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Theme Toggle Pill */}
          <button
            type="button"
            className="theme-tab-btn"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Switch to Day Light Studio theme'
                : 'Switch to Deep Night Dark theme'
            }
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === 'dark' ? '☀' : '☾'}
            </span>
            <span className="theme-toggle-label">
              {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </span>
          </button>

          {/* Let's Talk CTA */}
          <button
            type="button"
            className="nav-cta-btn"
            onClick={() => handleAnchor('#contact')}
          >
            <span>Let's Talk</span>
            <span className="cta-arrow" aria-hidden="true">→</span>
          </button>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            className={`mobile-menu-btn ${mobileOpen ? 'is-open' : ''}`}
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphic Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer" role="navigation" aria-label="Mobile Navigation">
          <div className="mobile-drawer-inner">
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.num}>
                  <button
                    type="button"
                    className={`mobile-nav-btn ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                    onClick={() => handleAnchor(item.href)}
                  >
                    <span className="mobile-num">{item.num}</span>
                    <span className="mobile-text">{item.label}</span>
                    <span className="mobile-arrow" aria-hidden="true">→</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-footer">
              <button
                type="button"
                className="nav-cta-btn mobile-cta-btn"
                onClick={() => handleAnchor('#contact')}
              >
                <span>Let's Talk</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
