import React, { useState, useEffect } from 'react';

export default function Hero({ hero, meta }) {
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const fullText = hero.positioning;

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [charIndex, fullText]);

  const scrollToWork = (e) => {
    e.preventDefault();
    const el = document.querySelector('#work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section is-visible" id="top" aria-labelledby="hero-heading">
      <div className="hero-grid">
        {/* Left Column: Heading, Positioning, Socials & CTAs */}
        <div className="hero-content-col">
          <div className="hero-badge-row">
            <span className="hero-kicker-badge">
              <span className="pulse-dot" aria-hidden="true" />
              <span>BS AI · COMSATS ISLAMABAD</span>
            </span>
            <span className="hero-exp-badge">&lt; 2+ Years Building &gt;</span>
          </div>

          <p className="hero-name-kicker">
            Mushtaq Ahmad Saqi · Islamabad, Pakistan
          </p>

          <h1 id="hero-heading" className="hero-headline">
            BUILDING FAST, SCALABLE &amp;{' '}
            <span className="hero-highlight-word">INTELLIGENT</span>
            <br className="hero-br-desktop" /> WEB APPLICATIONS
          </h1>

          <p className="hero-lead">
            {displayedText}
            {charIndex < fullText.length && (
              <span className="cursor-blink" aria-hidden="true">|</span>
            )}
          </p>

          {/* Social Row with DevSync style "/" prefix */}
          <div className="hero-socials-row" aria-label="Direct profile links">
            <a
              href={meta.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              <span className="social-slash">/</span> GitHub
            </a>
            <a
              href={meta.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              <span className="social-slash">/</span> LinkedIn
            </a>
            <a
              href={meta.socials.openprep}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              <span className="social-slash">/</span> OpenPrep
            </a>
            <a
              href={meta.socials.comsatsprephub}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              <span className="social-slash">/</span> COMSATSPrepHub
            </a>
          </div>

          {/* Action CTAs */}
          <div className="hero-actions">
            <a href="#work" onClick={scrollToWork} className="btn-primary hero-btn-main">
              <span>See Selected Work</span>
              <span className="btn-arrow" aria-hidden="true">↓</span>
            </a>
            <a
              href={meta.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary hero-btn-sub"
            >
              <span>Download CV</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Right Column: Hero Portrait Stage with Abstract Elements & Floating Badges */}
        <div className="hero-visual-col">
          <div className="hero-portrait-stage" aria-label="Mushtaq Ahmad Portrait Preview">
            {/* Ambient Green & Amber Backdrop Glow Orbs */}
            <div className="hero-ambient-glow" aria-hidden="true" />
            
            {/* Geometric Framing Accents (Coder/DevSync inspired) */}
            <div className="hero-corner-accent corner-tl" aria-hidden="true" />
            <div className="hero-corner-accent corner-br" aria-hidden="true" />

            <div className="hero-portrait-card">
              <div className="portrait-image-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}photo.jpeg`}
                  alt="Portrait of Mushtaq Ahmad"
                  className="hero-portrait-img"
                  loading="eager"
                />
                <div className="portrait-gradient-overlay" />
              </div>

              {/* Floating Top Badge: Open to Internships */}
              <div className="hero-float-badge">
                <span className="status-live-dot" aria-hidden="true" />
                <span>OPEN TO WORK // AUTUMN 2026</span>
              </div>

              {/* Floating Bottom Spec Card */}
              <div className="hero-float-spec-card">
                <div className="spec-card-topline">
                  <span className="spec-badge">CURRENT FOCUS</span>
                  <span className="spec-sem">4TH SEMESTER</span>
                </div>
                <div className="spec-cgpa-row">
                  <span className="spec-label">BS AI · CGPA</span>
                  <span className="spec-value">3.60</span>
                  <span className="spec-max">/4.00</span>
                </div>
                <p className="spec-subtext">
                  Co-founder of OpenPrep · 12,100+ live exam questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
