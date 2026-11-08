import React from 'react';

/**
 * Hand-drawn SVG annotations that give the portfolio a real human notebook feel.
 * Strokes animate via CSS stroke-dashoffset when parent receives `.is-visible`.
 */

export function HandUnderline({ width = 180 }) {
  return (
    <svg
      width={width}
      height="12"
      viewBox="0 0 200 12"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', marginTop: '4px', overflow: 'visible' }}
    >
      <path
        className="svg-draw-path"
        d="M3 8.5C52 3.2 135 2.5 197 7.8C152 9.5 84 9.2 28 10.2"
        stroke="var(--accent-ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HandCircleHighlight() {
  return (
    <svg
      viewBox="0 0 260 64"
      fill="none"
      aria-hidden="true"
      className="svg-draw-immediate"
      style={{
        position: 'absolute',
        inset: '-8px -10px',
        width: 'calc(100% + 20px)',
        height: 'calc(100% + 16px)',
        pointerEvents: 'none',
      }}
    >
      <path
        className="svg-draw-path"
        d="M18 34C14 14 78 5 142 7C210 9 254 20 250 37C246 54 185 60 116 58C52 56 11 46 24 27"
        stroke="var(--accent-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HandMarginArrow() {
  return (
    <svg
      width="44"
      height="28"
      viewBox="0 0 44 28"
      fill="none"
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '6px' }}
    >
      <path
        className="svg-draw-path"
        d="M2 8C14 20 26 20 39 14M39 14L31 8M39 14L33 22"
        stroke="var(--accent-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TornPaperEdge() {
  return (
    <svg
      viewBox="0 0 640 24"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ width: '100%', height: '22px', display: 'block', background: 'var(--bg-paper)' }}
    >
      <path
        d="M0 24L0 8L22 18L45 5L72 19L98 6L128 17L156 4L188 18L216 7L248 20L280 6L312 18L344 5L376 19L410 7L442 18L476 5L510 19L544 6L578 18L610 7L640 16L640 24Z"
        fill="var(--bg-paper-elevated)"
        stroke="var(--ink-primary)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
