import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

function SkillCard({ skill }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li
      className={`skill-item-card ${expanded ? 'is-expanded' : ''}`}
      onClick={() => setExpanded((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name}. Click to toggle details.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setExpanded((prev) => !prev);
        }
      }}
    >
      <div className="skill-card-header">
        <div className="skill-title-group">
          <span className="skill-dot" aria-hidden="true" />
          <h3 className="skill-item-name">{skill.name}</h3>
        </div>
        <span className="skill-expand-icon" aria-hidden="true">
          {expanded ? '−' : '+'}
        </span>
      </div>

      <p className="skill-item-context">{skill.context}</p>
    </li>
  );
}

export default function Toolbox({ toolbox }) {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="notebook-section observe-section"
      id="toolbox"
      aria-labelledby="toolbox-heading"
    >
      <div className="section-margin">
        <span className="margin-index">03 // TOOLBOX</span>
        <p className="margin-handnote">Core skills &amp; stack</p>
      </div>

      <div className="toolbox-content-wrap">
        <div className="section-header-block">
          <h2 id="toolbox-heading" className="section-title">
            Technical Arsenal &amp; Toolbox
          </h2>
          <p className="section-subtitle">
            An honest breakdown of technologies I build with, ship to production, and study daily.
          </p>
        </div>

        <div className="toolbox-grid">
          {toolbox.map((group, gIdx) => (
            <div key={group.tier} className="toolbox-column">
              <div className="toolbox-tier-header">
                <div className="toolbox-tier-badge">
                  <span className="tier-num">0{gIdx + 1}</span>
                  <span className="tier-tag">{group.tier.replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
                </div>
                <p className="toolbox-tier-sub">{group.subtitle}</p>
              </div>

              <ul className="toolbox-items-list">
                {group.items.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
