import React, { useState } from 'react';
import { HandUnderline } from './HandDrawnSvg';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function SelectedWork({ projects, onOpenCaseStudy }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const sectionRef = useScrollReveal();
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

  return (
    <section ref={sectionRef} className="notebook-section observe-section" id="work" aria-labelledby="work-heading">
      {/* Left Margin Index */}
      <div className="section-margin">
        <span className="margin-index">01 // SELECTED WORK</span>
        <p className="margin-handnote">Filter by focus →</p>
      </div>

      {/* Right Content Canvas */}
      <div>
        <div className="section-header-block">
          <h2 id="work-heading" className="section-title">
            Selected work
            <HandUnderline width={210} />
          </h2>
        </div>

        <div className="lab-filter-bar work-filter-bar" role="group" aria-label="Filter projects by focus">
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

        {/* Featured Project 01: Full-Width Architectural Blueprint Card */}
        {visibleFeatured && (
          <article className="work-featured-card work-card-interactive">
            <div className="project-meta-top">
              <span className="project-fig">
                {visibleFeatured.indexNumber} · FEATURED · {visibleFeatured.period}
              </span>
              <span className="project-status-pill">{visibleFeatured.status}</span>
            </div>

            <div className="featured-split">
              <div>
                <h3 className="project-title">{visibleFeatured.title}</h3>
                <p className="project-role-line">
                  {visibleFeatured.role} — {visibleFeatured.subtitle}
                </p>
                <p className="project-desc">{visibleFeatured.oneLiner}</p>

                <div className="project-metrics-banner">{visibleFeatured.metrics}</div>

                <ul className="tech-tag-row" aria-label="Technologies used">
                  {visibleFeatured.techTags.map((tag) => (
                    <li key={tag} className="tech-tag">
                      {tag}
                    </li>
                  ))}
                </ul>

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
                      className="ink-link"
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

              {/* Right Schematic Preview */}
              <div className="schematic-box" aria-label="Architecture flow preview">
                <div className="schematic-caption">
                  {visibleFeatured.architecturePreview.caption}
                </div>
                <ol className="schematic-steps">
                  {visibleFeatured.architecturePreview.nodes.map((node, idx) => (
                    <li key={node} className="schematic-step">
                      <span className="schematic-step-num">0{idx + 1}.</span>
                      <span>{node}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
        )}

        {/* Secondary Projects 02–04: Asymmetric Staggered 2-Column Ledger */}
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
                      {project.links.live.includes('github.com') ? 'Repository' : 'Live Demo'}
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
