import React, { useState } from 'react';
import { HandUnderline } from './HandDrawnSvg';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About({ about }) {
  const [showNotes, setShowNotes] = useState(false);
  const sectionRef = useScrollReveal();
  return (
    <section
      ref={sectionRef}
      className="notebook-section observe-section"
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
          {/* Left Column: Tactile Polaroid Frame */}
          <figure className="polaroid-frame">
            <div className="portrait-card-topline" aria-hidden="true">
              <span>PORTRAIT / 05</span>
              <span className="portrait-card-status">
                <span className="portrait-card-dot" />
                FIELD NOTE
              </span>
            </div>
            <div className="polaroid-sketch-canvas">
              <img
                className="polaroid-photo"
                src={`${import.meta.env.BASE_URL}photo.jpeg`}
                alt="Portrait of Mushtaq Ahmad"
              />
            </div>
            <figcaption className="polaroid-caption">
              <span className="polaroid-caption-mark" aria-hidden="true" />
              {about.photoCaption}
            </figcaption>
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

        {/* 4 Personal Margin Cards — always visible */}
        <div className="human-notes-grid">
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
