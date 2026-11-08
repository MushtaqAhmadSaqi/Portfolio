import React, { useState } from 'react';
import { HandUnderline } from './HandDrawnSvg';
import { useScrollReveal } from '../hooks/useScrollReveal';

function ToolboxCard({ skill }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <li
      className={`toolbox-item ${flipped ? 'is-flipped' : ''}`}
      onClick={() => setFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name}. Click or tap to view details.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
    >
      <div className="toolbox-item-inner">
        <div className="toolbox-item-front">
          <div className="toolbox-front-content">
            <h3 className="toolbox-item-name">{skill.name}</h3>
            <span className="toolbox-tap-hint" aria-hidden="true">
              tap to flip ↻
            </span>
          </div>
        </div>
        <div className="toolbox-item-back">
          <p className="toolbox-item-context">{skill.context}</p>
        </div>
      </div>
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
        <p className="margin-handnote">What I use and study.</p>
      </div>

      <div>
        <div className="section-header-block">
          <h2 id="toolbox-heading" className="section-title">
            Toolbox
            <HandUnderline width={195} />
          </h2>
        </div>

        <div className="toolbox-grid">
          {toolbox.map((group) => (
            <div key={group.tier} className="toolbox-column">
              <div className="toolbox-tier-header">
                <div className="toolbox-tier-title">{group.tier}</div>
                <p className="toolbox-tier-sub">{group.subtitle}</p>
              </div>

              <ul className="toolbox-items-list">
                {group.items.map((skill) => (
                  <ToolboxCard key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
