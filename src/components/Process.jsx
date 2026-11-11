import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Process({ processList }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const sectionRef = useScrollReveal();

  if (!processList || processList.length === 0) return null;

  const currentStep = processList[activeStepIndex] || processList[0];

  return (
    <section
      ref={sectionRef}
      className="notebook-section observe-section"
      id="process"
      aria-labelledby="process-heading"
    >
      <div className="section-margin">
        <span className="margin-index">05 // WORKFLOW</span>
        <p className="margin-handnote">How I build &amp; ship</p>
      </div>

      <div className="process-content-wrap">
        <div className="section-header-block">
          <h2 id="process-heading" className="section-title">
            Engineering Process &amp; Workflow
          </h2>
          <p className="section-subtitle">
            How ideas transition from raw student friction into resilient, high-performance web products.
          </p>
        </div>

        {/* Horizontal Step Tabs (Inspired by Alex Carter) */}
        <div className="process-stepper-bar" role="tablist" aria-label="Workflow Steps">
          {processList.map((stepItem, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={stepItem.step}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`step-tab-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveStepIndex(idx)}
              >
                <span className="step-tab-num">{stepItem.step}</span>
                <span className="step-tab-name">{stepItem.title.split(' ')[0]}</span>
                {isActive && <span className="step-tab-glow" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Detailed Step Stage Card */}
        <div className="step-stage-card">
          <div className="step-stage-top">
            <div className="step-badge-line">
              <span className="step-phase-pill">PHASE // {currentStep.step}</span>
              <span className="step-tagline">{currentStep.tagline}</span>
            </div>
            <span className="step-progress-indicator">
              0{activeStepIndex + 1} / 0{processList.length}
            </span>
          </div>

          <h3 className="step-headline">{currentStep.title}</h3>
          <p className="step-desc">{currentStep.description}</p>

          <div className="step-deliverables-box">
            <span className="deliverables-label">KEY DELIVERABLES:</span>
            <div className="deliverables-chips">
              {currentStep.deliverables.map((item) => (
                <span key={item} className="deliverable-chip">
                  <span className="deliverable-check" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

