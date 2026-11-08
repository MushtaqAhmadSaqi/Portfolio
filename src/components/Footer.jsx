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
        setPktTime(`${formatted} PKT (UTC+5)`);
      } catch (_) {
        setPktTime('Islamabad, PK (UTC+5)');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [meta.timezone]);

  return (
    <footer className="notebook-footer">
      <div className="footer-inner">
        <div>
          <strong>Designed &amp; built by {meta.name}</strong> · Last updated {meta.lastUpdated}
        </div>

        <div>
          Local time in {meta.location}: <strong>{pktTime}</strong> · Reading: <em>Kafka</em> &amp;{' '}
          <em>One Piece</em>
        </div>

        <div>
          <button
            type="button"
            className="nav-item-btn"
            onClick={onOpen404}
            title="Preview the custom torn-page 404 route"
          >
            [Test 404 Torn Page]
          </button>
        </div>
      </div>
    </footer>
  );
}
