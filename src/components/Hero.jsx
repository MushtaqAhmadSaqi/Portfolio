import React from 'react';
import { HandCircleHighlight } from './HandDrawnSvg';

export default function Hero({ hero, meta }) {
  const scrollToWork = (e) => {
    e.preventDefault();
    const el = document.querySelector('#work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="top" aria-labelledby="hero-heading">
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

          <p className="hero-lead">{hero.positioning}</p>

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

          <p className="status-primary-text">{hero.currentStatus.primary}</p>

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
