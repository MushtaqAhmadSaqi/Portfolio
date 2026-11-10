import React, { useState, useEffect, useRef } from 'react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

function StatTile({ stat, isVisible }) {
  const animatedValue = useAnimatedCounter(
    stat.value,
    1400,
    isVisible,
    stat.decimals || 0
  );

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-tag">{stat.tag}</span>
        <span className="stat-indicator-dot" aria-hidden="true" />
      </div>

      <div className="stat-number-wrapper">
        <span className="stat-number">
          {stat.decimals > 0
            ? animatedValue.toFixed(stat.decimals)
            : animatedValue.toLocaleString()}
        </span>
        <span className="stat-suffix">{stat.suffix}</span>
      </div>

      <h3 className="stat-label">{stat.label}</h3>
      <p className="stat-subtext">{stat.subtext}</p>
    </div>
  );
}

export default function StatsBar({ stats }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!stats || stats.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className={`stats-strip-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Key Achievements and Statistics"
    >
      <div className="stats-strip-inner">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatTile key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
