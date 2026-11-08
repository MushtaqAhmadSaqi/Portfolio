import React, { useState, useEffect } from 'react';
import { HandCircleHighlight } from './HandDrawnSvg';

function useCountUp(end, duration = 1200, decimals = 0) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(decimals)));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, decimals]);
  return count;
}

function AnimatedCGPA() {
  const cgpa = useCountUp(3.60, 1400, 2);
  return (
    <p className="status-primary-text">
      BS AI · COMSATS Islamabad · CGPA{' '}
      <span style={{ color: 'var(--accent-ink)', fontWeight: 700 }}>{cgpa.toFixed(2)}</span>
      /4.00
    </p>
  );
}

export default function Hero({ hero, meta }) {
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const fullText = hero.positioning;

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 22);
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
        {/* Left 7 Columns: Positioning & Actions */}
        <div>
          <div className="hero-stamp">
            <span>●</span>
            <span>{hero.stamp}</span>
          </div>

          <p className="hero-name-kicker">
            {meta.name} · {meta.location}
          </p>

          <h1 id="hero-heading" className="hero-headline">
            {hero.headlinePrefix}
            <span className="hero-highlight-wrap">
              {hero.headlineHighlight}
              <HandCircleHighlight />
            </span>
            {hero.headlineSuffix}
          </h1>

          <p className="hero-lead">
            {displayedText}
            {charIndex < fullText.length && <span className="cursor-blink" aria-hidden="true">|</span>}
          </p>

          <div className="hero-actions">
            <a href="#work" onClick={scrollToWork} className="btn-primary">
              <span>{hero.ctas.primary.label}</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href={meta.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <span>{hero.ctas.secondary.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="scroll-hint" aria-hidden="true">
            <span className="scroll-hint-label">scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path d="M8 4v16M2 14l6 6 6-6" stroke="var(--accent-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Right 5 Columns: Pinned Index Card with Current Status */}
        <aside className="status-index-card" aria-label="Current Academic and Engineering Status">
          <div className="status-card-header">
            <span className="status-pulse">
              <span className="status-pulse-dot" aria-hidden="true" />
              <span>{hero.currentStatus.badge}</span>
            </span>
            <span>REF // 00-A</span>
          </div>

          <AnimatedCGPA />

          <ul className="status-ledger-list">
            {hero.currentStatus.items.map((item) => (
              <li key={item.label} className="status-ledger-item">
                <span className="status-item-label">{item.label}</span>
                <span className="status-item-val">{item.text}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
