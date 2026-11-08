import React, { useEffect } from 'react';

export default function CaseStudyView({ project, allProjects, onBackHome, onSelectProject }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.slug]);

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const tocSections = [
    { id: 'cs-problem', label: '01. The Problem' },
    { id: 'cs-approach', label: '02. My Approach' },
    { id: 'cs-built', label: '03. What I Built' },
    { id: 'cs-challenge', label: '04. Hardest Challenge' },
    { id: 'cs-learned', label: '05. What I Learned' },
    { id: 'cs-differently', label: '06. What I’d Do Differently' },
  ];

  return (
    <article className="case-study-wrapper" aria-labelledby="cs-title">
      <button type="button" className="back-to-notebook-btn" onClick={() => onBackHome('#work')}>
        <span aria-hidden="true">←</span>
        <span>Back to Selected Work</span>
      </button>

      <header className="case-study-header">
        <div className="project-meta-top" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
          <span className="project-fig">
            CASE STUDY // {project.indexNumber} · {project.period}
          </span>
          <span className="project-status-pill">{project.status}</span>
          <span className="tech-tag">{project.caseStudy.readingTime}</span>
        </div>

        <h1 id="cs-title" style={{ fontSize: 'var(--text-hero)', marginBottom: '0.6rem' }}>
          {project.title}
        </h1>
        <p className="hero-lead" style={{ marginBottom: '1.25rem' }}>
          {project.caseStudy.summary}
        </p>

        <div className="project-metrics-banner" style={{ maxWidth: '68ch' }}>
          <strong>ROLE:</strong> {project.role} &nbsp;|&nbsp; <strong>KEY METRICS:</strong>{' '}
          {project.metrics}
        </div>

        <ul className="tech-tag-row" style={{ marginBottom: '1rem' }}>
          {project.techTags.map((tag) => (
            <li key={tag} className="tech-tag">
              {tag}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginTop: '1rem' }}>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>
                {project.links.live.includes('github.com')
                  ? 'View Source on GitHub ↗'
                  : 'Visit Live Platform ↗'}
              </span>
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <span>GitHub Repository ↗</span>
            </a>
          )}
          {project.links.secondaryGithub && (
            <a
              href={project.links.secondaryGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <span>Java Swing OOP Repo ↗</span>
            </a>
          )}
        </div>
      </header>

      <div className="case-study-layout">
        {/* Sticky Left Table of Contents */}
        <aside className="case-study-toc" aria-label="Case study sections">
          <div className="margin-index" style={{ marginBottom: '0.75rem' }}>
            CONTENTS // {project.indexNumber}
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {tocSections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="nav-item-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {sec.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Readable 68ch Article Column */}
        <div className="case-study-article">
          <section id="cs-problem" className="case-section-block">
            <h3>01. The Problem</h3>
            <p>{project.caseStudy.problem}</p>
          </section>

          <section id="cs-approach" className="case-section-block">
            <h3>02. My Approach</h3>
            <p>{project.caseStudy.approach}</p>
          </section>

          <section id="cs-built" className="case-section-block">
            <h3>03. What I Built &amp; System Architecture</h3>
            <ul className="case-bullet-list" style={{ marginBottom: '1.5rem' }}>
              {project.caseStudy.whatIBuilt.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <div className="schematic-box">
              <div className="schematic-caption">{project.architecturePreview.caption}</div>
              <ol className="schematic-steps">
                {project.architecturePreview.nodes.map((node, idx) => (
                  <li key={node} className="schematic-step">
                    <span className="schematic-step-num">STEP 0{idx + 1}</span>
                    <span>{node}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="cs-challenge" className="case-section-block">
            <h3>04. Hardest Engineering Challenge</h3>
            <p>{project.caseStudy.hardestChallenge}</p>
          </section>

          <section id="cs-learned" className="case-section-block">
            <h3>05. What I Learned</h3>
            <p>{project.caseStudy.whatILearned}</p>
          </section>

          <section id="cs-differently" className="case-section-block">
            <h3>06. What I’d Do Differently Next Time</h3>
            <p>{project.caseStudy.whatIdDoDifferently}</p>
          </section>

          {/* Next Case Study Card */}
          {nextProject && (
            <div
              className="work-secondary-card"
              style={{ marginTop: '1rem', borderStyle: 'dashed' }}
            >
              <span className="margin-index">NEXT CASE STUDY IN NOTEBOOK</span>
              <h4 style={{ fontSize: '1.35rem', margin: '0.35rem 0' }}>{nextProject.title}</h4>
              <p style={{ fontSize: 'var(--text-sm)', marginBottom: '1rem' }}>
                {nextProject.oneLiner}
              </p>
              <button
                type="button"
                className="case-study-trigger"
                style={{ alignSelf: 'flex-start' }}
                onClick={() => onSelectProject(nextProject.slug)}
              >
                <span>Read {nextProject.title} Case Study →</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
