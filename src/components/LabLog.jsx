import React, { useState } from 'react';
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
        <span className="margin-index">04 // EXPERIENCE</span>
        <p className="margin-handnote">Internships &amp; Sprints</p>
      </div>

      <div className="lablog-content-wrap">
        <div className="section-header-block">
          <h2 id="lab-log-heading" className="section-title">
            Experience &amp; Engineering Log
          </h2>
          <p className="section-subtitle">
            Documenting real production sprints, remote internships, model evaluations, and systems engineering.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          className="lab-filter-bar"
          role="group"
          aria-label="Filter lab log entries by topic"
        >
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

        {/* Vertical Timeline Stream */}
        <div className="timeline-stream">
          <div className="timeline-spine" aria-hidden="true" />

          <ol className="timeline-items-list">
            {visibleEntries.map((entry, idx) => {
              const isOpen = expandedId === entry.id;
              const isLatest = idx === 0;

              return (
                <li
                  key={entry.id}
                  className={`timeline-entry-row ${isOpen ? 'is-open' : ''} ${isLatest ? 'is-latest' : ''}`}
                >
                  {/* Timeline Node Dot */}
                  <div className="timeline-node" aria-hidden="true">
                    <span className={`timeline-dot ${isLatest ? 'has-pulse' : ''}`} />
                  </div>

                  {/* Timeline Entry Card */}
                  <article
                    className="timeline-card"
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
                    <div className="timeline-card-header">
                      <div className="timeline-stamp-box">
                        <span className="timeline-id">{entry.id}</span>
                        <span className="timeline-date">{entry.date}</span>
                        <span className="timeline-cat-pill">{entry.category}</span>
                      </div>

                      <div className="timeline-badge-group">
                        <span className="timeline-metric-pill">{entry.metric}</span>
                        <span className="timeline-toggle-icon" aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>
                    </div>

                    <h3 className="timeline-title">{entry.title}</h3>
                    <p className="timeline-summary">{entry.summary}</p>

                    <ul className="tech-tag-row" aria-label="Tags for this log">
                      {entry.tags.map((tag) => (
                        <li key={tag} className="tech-tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
