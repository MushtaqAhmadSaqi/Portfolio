import React, { useState, useEffect } from 'react';
import { HandUnderline } from './HandDrawnSvg';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import InteractiveSchematic from './InteractiveSchematic';

/**
 * Animated Metric Matrix for Featured Projects
 * Animates numbers dynamically from 0 when section scrolls into view
 */
function FeaturedMetricsMatrix({ slug, rawMetrics, isVisible }) {
  const openprepQuestions = useAnimatedCounter(12100, 1600, isVisible);
  const hotelRecords = useAnimatedCounter(1001, 1400, isVisible);
  const generalStat = useAnimatedCounter(100, 1200, isVisible);

  if (slug === 'openprep') {
    return (
      <div className="project-metrics-matrix" aria-label="OpenPrep Key Metrics">
        <div className="metric-tile">
          <span className="metric-tile-number">
            {openprepQuestions.toLocaleString()}+
          </span>
          <span className="metric-tile-label">Verified MCQs</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-number">2 Tracks</span>
          <span className="metric-tile-label">IBA Karachi &amp; MDCAT</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-number">0 Paywalls</span>
          <span className="metric-tile-label">100% Free Open Access</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-number">&lt; 45ms</span>
          <span className="metric-tile-label">State Machine Latency</span>
        </div>
      </div>
    );
  }

  if (slug === 'comsatsprephub') {
    return (
      <div className="project-metrics-matrix" aria-label="COMSATSPrepHub Key Metrics">
        <div className="metric-tile">
          <span className="metric-tile-number">Gemini API</span>
          <span className="metric-tile-label">AI Guardrail Quizzes</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-number">Supabase</span>
          <span className="metric-tile-label">Auth &amp; Per-User Quotas</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-number">{generalStat}% Valid</span>
          <span className="metric-tile-label">JSON Output Schema</span>
        </div>
      </div>
    );
  }

  if (slug === 'edulearn') {
    return (
      <div className="project-metrics-matrix" aria-label="EduLearn Key Metrics">
        <div className="metric-tile">
          <span className="metric-tile-number">100% Client</span>
          <span className="metric-tile-label">Zero Server Latency</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-number">Synced Notes</span>
          <span className="metric-tile-label">Video Timestamp Anchor</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-number">Pomodoro</span>
          <span className="metric-tile-label">Focus Streak Tracker</span>
        </div>
      </div>
    );
  }

  if (slug === 'hotel-management-system') {
    return (
      <div className="project-metrics-matrix" aria-label="Hotel System Key Metrics">
        <div className="metric-tile">
          <span className="metric-tile-number">
            {hotelRecords.toLocaleString()} Records
          </span>
          <span className="metric-tile-label">Seeded Test Suite</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-number">Dual Stack</span>
          <span className="metric-tile-label">Java Swing &amp; Node REST</span>
        </div>
        <div className="metric-tile">
          <span className="metric-tile-number">Full CRUD</span>
          <span className="metric-tile-label">MongoDB &amp; Mongoose</span>
        </div>
      </div>
    );
  }

  return <div className="project-metrics-banner">{rawMetrics}</div>;
}

export default function SelectedWork({ projects, onOpenCaseStudy }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const sectionRef = useScrollReveal();
  const [isSectionInView, setIsSectionInView] = useState(false);

  const categories = ['ALL', 'WEB', 'AI', 'SYSTEMS'];
  const filteredProjects =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);
  const visibleFeatured =
    filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const secondaryProjects = filteredProjects.filter(
    (p) => p.slug !== visibleFeatured?.slug
  );

  // Monitor when sectionRef receives `is-visible` to trigger counters
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const checkVisibility = () => {
      if (el.classList.contains('is-visible')) {
        setIsSectionInView(true);
      }
    };

    checkVisibility();
    const observer = new MutationObserver(checkVisibility);
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      className="notebook-section observe-section"
      id="work"
      aria-labelledby="work-heading"
    >
      {/* Left Margin Index */}
      <div className="section-margin">
        <span className="margin-index">01 // SELECTED WORK</span>
        <p className="margin-handnote">Live production builds &amp; architecture.</p>
        <div className="margin-live-indicator" aria-hidden="true">
          <span className="status-pulse-dot" />
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--success-ink)' }}>
            ACTIVE LAB SPRINT
          </span>
        </div>
      </div>

      {/* Right Content Canvas */}
      <div>
        <div className="section-header-block">
          <h2 id="work-heading" className="section-title">
            Selected work
            <HandUnderline width={210} />
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div
          className="lab-filter-bar work-filter-bar"
          role="group"
          aria-label="Filter projects by focus"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Project Card: Full-Width Architectural Blueprint */}
        {visibleFeatured && (
          <article
            key={visibleFeatured.slug}
            className="work-featured-card work-card-interactive featured-card-elevated"
          >
            {/* Top Metadata & Production Beacon */}
            <div className="project-meta-top">
              <span className="project-fig">
                {visibleFeatured.indexNumber} · FEATURED · {visibleFeatured.period}
              </span>
              <span className="project-status-pill live-beacon-badge">
                <span className="beacon-ping-dot" aria-hidden="true" />
                <span>{visibleFeatured.status}</span>
              </span>
            </div>

            <div className="featured-split">
              {/* Left Column: Context, Story, Metrics Matrix & Action Buttons */}
              <div className="featured-content-col">
                <h3 className="project-title">{visibleFeatured.title}</h3>
                <p className="project-role-line">
                  {visibleFeatured.role} — {visibleFeatured.subtitle}
                </p>
                <p className="project-desc">{visibleFeatured.oneLiner}</p>

                {/* Animated Interactive Metrics Matrix */}
                <FeaturedMetricsMatrix
                  slug={visibleFeatured.slug}
                  rawMetrics={visibleFeatured.metrics}
                  isVisible={isSectionInView}
                />

                {/* Tech Tags with Interactive Hover */}
                <ul className="tech-tag-row" aria-label="Technologies used">
                  {visibleFeatured.techTags.map((tag) => (
                    <li key={tag} className="tech-tag tech-tag-interactive">
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* Action Row */}
                <div className="project-action-row">
                  <button
                    type="button"
                    className="case-study-trigger"
                    onClick={() => onOpenCaseStudy(visibleFeatured.slug)}
                  >
                    <span>Read Case Study</span>
                    <span aria-hidden="true">→</span>
                  </button>

                  {visibleFeatured.links.live && (
                    <a
                      href={visibleFeatured.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ink-link action-live-link"
                    >
                      <span>Live Platform</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}

                  {visibleFeatured.links.github && (
                    <a
                      href={visibleFeatured.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ink-link"
                    >
                      <span>GitHub</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Interactive Animated Blueprint & Live Demo */}
              <InteractiveSchematic
                project={visibleFeatured}
                isVisible={isSectionInView}
              />
            </div>
          </article>
        )}

        {/* Secondary Projects: Staggered 2-Column Ledger */}
        <div className="work-staggered-grid">
          {secondaryProjects.map((project, idx) => (
            <article
              key={project.slug}
              className="work-secondary-card work-card-interactive"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              <div>
                <div className="project-meta-top">
                  <span className="project-fig">
                    {project.indexNumber} · {project.period}
                  </span>
                  <span className="project-status-pill">{project.status}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-role-line">{project.role}</p>
                <p className="project-desc">{project.oneLiner}</p>

                <div className="project-metrics-banner">{project.metrics}</div>

                <ul className="tech-tag-row" aria-label="Technologies used">
                  {project.techTags.map((tag) => (
                    <li key={tag} className="tech-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="project-action-row">
                <button
                  type="button"
                  className="case-study-trigger"
                  onClick={() => onOpenCaseStudy(project.slug)}
                >
                  <span>Read Case Study</span>
                  <span aria-hidden="true">→</span>
                </button>

                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink-link"
                  >
                    <span>
                      {project.links.live.includes('github.com')
                        ? 'Repository'
                        : 'Live Demo'}
                    </span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}

                {project.links.secondaryGithub && (
                  <a
                    href={project.links.secondaryGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ink-link"
                  >
                    <span>Java OOP Repo</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
