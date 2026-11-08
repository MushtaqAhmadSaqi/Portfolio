import React, { useState, useEffect } from 'react';

export default function Navbar({ meta, theme, onToggleTheme, onNavigateHome, activeView }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { num: '01', label: 'Work', href: '#work' },
    { num: '02', label: 'Lab Log', href: '#lab-log' },
    { num: '03', label: 'Toolbox', href: '#toolbox' },
    { num: '04', label: 'About', href: '#about' },
    { num: '05', label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    if (activeView !== 'home') return;
    const sectionIds = ['work', 'lab-log', 'toolbox', 'about', 'contact'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
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
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="notebook-header">
      <div className="header-inner">
        <button
          type="button"
          className="brand-stamp"
          onClick={() => onNavigateHome('#top')}
          aria-label="Return to top of Mushtaq Ahmad Lab Notebook"
        >
          <span className="brand-dot" aria-hidden="true" />
          <span>{meta.notebookCode} — M. AHMAD</span>
        </button>

        <div className="nav-controls">
          <nav aria-label="Primary Notebook Sections">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.num}>
                  <button
                    type="button"
                    className={`nav-item-btn ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                    onClick={() => handleAnchor(item.href)}
                  >
                    <span className="nav-index-num">{item.num}.</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="theme-tab-btn"
            onClick={onToggleTheme}
            aria-label={
              theme === 'light'
                ? 'Switch to Night Carbon notebook mode'
                : 'Switch to Day Field Paper mode'
            }
          >
            <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
            <span>{theme === 'light' ? 'NIGHT CARBON' : 'DAY PAPER'}</span>
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-expanded={mobileOpen}
            aria-label="Toggle section index menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? 'CLOSE [×]' : 'INDEX [≡]'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-drawer" role="navigation" aria-label="Mobile Section Navigation">
          {navItems.map((item) => (
            <button
              key={item.num}
              type="button"
              className={`nav-item-btn ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
              onClick={() => handleAnchor(item.href)}
            >
              <span className="nav-index-num">{item.num}.</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
