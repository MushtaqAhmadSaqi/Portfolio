import React, { useState } from 'react';
import { HandUnderline } from './HandDrawnSvg';

export default function About({ about }) {
  const [showNotes, setShowNotes] = useState(false);
  return (
    <section
      className="notebook-section observe-section is-visible"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="section-margin">
        <span className="margin-index">04 // ABOUT ME</span>
        <p className="margin-handnote">Skardu → Islamabad</p>
      </div>

      <div>
        <div className="section-header-block">
          <h2 id="about-heading" className="section-title">
            {about.heading}
            <HandUnderline width={240} />
          </h2>
        </div>

        <div className="about-spread">
          {/* Left Column: Tactile Polaroid Frame (Replace src in content.js when ready) */}
          <figure className="polaroid-frame">
            <div className="polaroid-sketch-canvas" role="img" aria-label="Portrait frame of Mushtaq Ahmad">
              <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
                <circle cx="44" cy="44" r="40" stroke="var(--ink-primary)" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="44" cy="34" r="14" stroke="var(--accent-ink)" strokeWidth="2.2" />
                <path
                  d="M20 72C24 56 64 56 68 72"
                  stroke="var(--ink-primary)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--stamp-ink)',
                  marginTop: '0.5rem',
                }}
              >
                [PORTRAIT SLOT // DROP PHOTO IN public/photo.jpg]
              </span>
            </div>
            <figcaption className="polaroid-caption">{about.photoCaption}</figcaption>
          </figure>

          {/* Right Column: Warm First-Person Story */}
          <div className="about-story-prose">
            {about.storyParagraphs.slice(0, 1).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <button
              type="button"
              className="text-toggle"
              aria-expanded={showNotes}
              onClick={() => setShowNotes((open) => !open)}
            >
              {showNotes ? 'Hide story ↑' : 'More about me ↓'}
            </button>
            {showNotes && (
              <div className="about-expanded">
                {about.storyParagraphs.slice(1).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4 Personal Margin Cards */}
        <div className={`human-notes-grid ${showNotes ? 'is-expanded' : ''}`}>
          {about.humanDetails.map((detail) => (
            <div key={detail.label} className="human-note-card">
              <div className="human-note-label">{detail.label}</div>
              <p style={{ fontSize: 'var(--text-sm)' }}>{detail.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
