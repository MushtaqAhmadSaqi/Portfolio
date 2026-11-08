import React from 'react';
import { TornPaperEdge } from './HandDrawnSvg';

export default function NotFound404({ onReturnHome }) {
  return (
    <section className="torn-page-card" aria-labelledby="err-404-title">
      <TornPaperEdge />
      <div className="torn-page-body">
        <div className="margin-index" style={{ marginBottom: '0.5rem' }}>
          ERR 404 // MISSING LEAF
        </div>
        <h1 id="err-404-title" style={{ fontSize: '2.1rem', marginBottom: '0.75rem' }}>
          This page was torn out of the notebook.
        </h1>
        <p style={{ marginBottom: '1.5rem' }}>
          Either the URL has a typo, or this experiment was crumpled up and thrown in the recycling
          bin during a late-night debugging session in Islamabad.
        </p>
        <button type="button" className="btn-primary" onClick={() => onReturnHome('#top')}>
          <span>← Flip back to Page 01 (Home)</span>
        </button>
      </div>
    </section>
  );
}
