import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About({ about }) {
  const [showFullStory, setShowFullStory] = useState(false);
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="notebook-section observe-section"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="section-margin">
        <span className="margin-index">02 // ABOUT ME</span>
        <p className="margin-handnote">Roots, journey &amp; beliefs</p>
      </div>

      <div className="about-content-wrap">
        <div className="section-header-block">
          <h2 id="about-heading" className="section-title">
            {about.heading}
          </h2>
        </div>

        {/* Bento Grid Layout (Alex Carter & SIFT inspired) */}
        <div className="about-bento-grid">
          {/* Card 1: Core Story Card (Large) */}
          <div className="bento-card bento-story-card">
            <div className="bento-card-top">
              <span className="bento-tag">ORIGIN STORY</span>
              <span className="bento-num">01</span>
            </div>

            <div className="bento-story-body">
              <p className="bento-lead-para">{about.storyParagraphs[0]}</p>

              {showFullStory && (
                <div className="bento-expanded-story">
                  {about.storyParagraphs.slice(1).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="bento-story-toggle"
                onClick={() => setShowFullStory((prev) => !prev)}
                aria-expanded={showFullStory}
              >
                <span>{showFullStory ? 'Read less ↑' : 'Read full journey ↓'}</span>
              </button>
            </div>

            <div className="bento-milestones-row">
              <span className="milestone-chip">⛰ Skardu Roots</span>
              <span className="milestone-chip">🏥 Pre-Med Switch</span>
              <span className="milestone-chip">🎓 COMSATS AI</span>
              <span className="milestone-chip">🚀 OpenPrep Co-Founder</span>
            </div>
          </div>

          {/* Card 2: Location & Geographic Journey */}
          <div className="bento-card bento-location-card">
            <div className="bento-card-top">
              <span className="bento-tag">TRAJECTORY</span>
              <span className="bento-num">02</span>
            </div>

            <h3 className="bento-card-title">Roots &amp; Current Base</h3>

            <div className="location-route-visual">
              <div className="route-step">
                <span className="route-dot" />
                <div className="route-info">
                  <span className="route-city">Skardu, GB</span>
                  <span className="route-desc">Hometown &amp; Mountain roots</span>
                </div>
              </div>
              <div className="route-connector" />
              <div className="route-step">
                <span className="route-dot" />
                <div className="route-info">
                  <span className="route-city">Karachi</span>
                  <span className="route-desc">Intermediate &amp; Pre-med</span>
                </div>
              </div>
              <div className="route-connector" />
              <div className="route-step is-current">
                <span className="route-dot pulse" />
                <div className="route-info">
                  <span className="route-city">Islamabad</span>
                  <span className="route-desc">COMSATS University (BS AI)</span>
                </div>
              </div>
            </div>

            <div className="bento-card-bottom-pill">
              <span className="live-clock-dot" />
              <span>UTC+5 (PKT) · Islamabad, Pakistan</span>
            </div>
          </div>

          {/* Card 3: Software Philosophy */}
          <div className="bento-card bento-belief-card">
            <div className="bento-card-top">
              <span className="bento-tag">PHILOSOPHY</span>
              <span className="bento-num">03</span>
            </div>

            <h3 className="bento-card-title">What I Believe About Software</h3>
            <blockquote className="bento-quote">
              "{about.humanDetails[2]?.text || 'Good software respects the user\'s time, data plan, and attention.'}"
            </blockquote>
          </div>

          {/* Card 4: Outside of Code / Passions */}
          <div className="bento-card bento-interests-card">
            <div className="bento-card-top">
              <span className="bento-tag">OFF-SCREEN</span>
              <span className="bento-num">04</span>
            </div>

            <h3 className="bento-card-title">Outside of Code</h3>
            <p className="bento-text-sm">
              {about.humanDetails[1]?.text || 'Table tennis, mountain trails, reading Kafka, and One Piece.'}
            </p>
            <div className="interests-pills-row">
              <span className="interest-pill">🏓 Table Tennis</span>
              <span className="interest-pill">📖 Franz Kafka</span>
              <span className="interest-pill">🏴‍☠️ One Piece</span>
              <span className="interest-pill">🏔 Mountain Treks</span>
            </div>
          </div>

          {/* Card 5: Current Curiosity in AI */}
          <div className="bento-card bento-curiosity-card">
            <div className="bento-card-top">
              <span className="bento-tag">AI RESEARCH</span>
              <span className="bento-num">05</span>
            </div>

            <h3 className="bento-card-title">What I'm Curious About Now</h3>
            <p className="bento-text-sm">
              {about.humanDetails[3]?.text || 'Combining deterministic SQL filters with lightweight LLMs to prevent hallucinations in education.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
