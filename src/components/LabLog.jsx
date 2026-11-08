import React, { useState } from 'react';
import { HandUnderline } from './HandDrawnSvg';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function LabLog({ entries }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);
  const sectionRef = useScrollReveal();
  const categories = ['ALL', 'AI / ML', 'Web', 'Systems / OOP'];

  const visibleEntries =
    selectedCategory === 'ALL'
      ? entries
      : entries.filter((item) => item.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      className="notebook-section observe-section"
      id="lab-log"
      aria-labelledby="lab-log-heading"
    >
      <div className="section-margin">
        <span className="margin-index">02 // LAB LOG</span>
        <p className="margin-handnote">Recent experiments.</p>
      </div>

      <div>
        <div className="section-header-block">
          <h2 id="lab-log-heading" className="section-title">
            Lab log
            <HandUnderline width={190} />
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="lab-filter-bar" role="group" aria-label="Filter lab log entries by topic">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Chronological Ledger Timeline */}
        <ol className="lab-timeline">
          {visibleEntries.map((entry) => {
            const isOpen = expandedId === entry.id;
            return (
              <li
                key={entry.id}
                className={`lab-entry ${isOpen ? 'is-open' : ''}`}
                onClick={() => setExpandedId(isOpen ? null : entry.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedId(isOpen ? null : entry.id);
                  }
                }}
              >
                <div className="lab-entry-meta">
                  <span className="lab-date-stamp">
                    {entry.id} · {entry.date} · [{entry.category}]
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="lab-metric-badge">{entry.metric}</span>
                    <span className="lab-entry-expand-icon" aria-hidden="true">▾</span>
                  </div>
                </div>

                <h3 className="lab-entry-title">{entry.title}</h3>
                <p className="lab-entry-summary">{entry.summary}</p>

                <ul className="tech-tag-row" style={{ marginBottom: 0 }}>
                  {entry.tags.map((tag) => (
                    <li key={tag} className="tech-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
