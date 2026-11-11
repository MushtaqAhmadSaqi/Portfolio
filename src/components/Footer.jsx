import React, { useState, useEffect } from 'react';

export default function Footer({ meta, onOpen404 }) {
  const [pktTime, setPktTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: meta.timezone || 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setPktTime(`${formatted} PKT`);
      } catch (_) {
        setPktTime('Islamabad, PK (UTC+5)');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [meta.timezone]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="notebook-footer" aria-label="Site Footer">
      <div className="footer-top-gradient" aria-hidden="true" />
      <div className="footer-inner">
        <div className="footer-col-left">
          <div className="footer-brand">
            <span className="brand-bracket">&lt;</span>
            <span className="brand-name">M.Ahmad</span>
            <span className="brand-bracket"> /&gt;</span>
          </div>
          <p className="footer-credit">
            Designed &amp; engineered by <strong>{meta.name}</strong>
          </p>
          <p className="footer-subtext">
            BS Artificial Intelligence · COMSATS University Islamabad
          </p>
        </div>

        <div className="footer-col-center">
          <div className="footer-clock-pill">
            <span className="live-clock-dot" aria-hidden="true" />
            <span>Local Time: <strong>{pktTime}</strong> (UTC+5)</span>
          </div>
          <p className="footer-reading-line">
            Off-screen: <em>Franz Kafka</em> · <em>One Piece</em> · Table Tennis
          </p>
        </div>

        <div className="footer-col-right">
          <button
            type="button"
            className="footer-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </button>

          <button
            type="button"
            className="footer-404-btn"
            onClick={onOpen404}
            title="Preview custom 404 route"
          >
            [Test 404 Route]
          </button>
        </div>
      </div>
    </footer>
  );
}
