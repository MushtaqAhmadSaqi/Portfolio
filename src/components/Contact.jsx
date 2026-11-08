import React, { useState } from 'react';
import { HandUnderline } from './HandDrawnSvg';

export default function Contact({ contact, meta }) {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    const email = meta.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2600);
  };

  const fallbackCopy = (text) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (_) {
      // Ignore fallback errors in restricted sandboxes
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;
    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section
      className="notebook-section observe-section is-visible"
      id="contact"
      aria-labelledby="contact-heading"
      style={{ borderBottom: 'none' }}
    >
      <div className="section-margin">
        <span className="margin-index">05 // CONTACT</span>
        <p className="margin-subnote">{contact.availabilityNote}</p>
      </div>

      <div>
        <div className="section-header-block">
          <h2 id="contact-heading" className="section-title">
            {contact.heading}
            <HandUnderline width={220} />
          </h2>
        </div>

        <div className="contact-sheet">
          {/* Left Column: Direct Email + Copy to Clipboard + Socials */}
          <div>
            <p style={{ marginBottom: '1rem' }}>{contact.subtext}</p>

            <div className="email-copy-box">
              <a className="email-address-mono" href={`mailto:${meta.email}`}>{meta.email}</a>
              <button
                type="button"
                className={`copy-email-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopyEmail}
              >
                {copied ? 'COPIED TO CLIPBOARD ✓' : 'COPY EMAIL'}
              </button>
            </div>

            <ul className="contact-links-list" aria-label="External profile links">
              <li>
                <a
                  href={meta.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={meta.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={meta.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link"
                >
                  Résumé PDF ↗
                </a>
              </li>
              <li>
                <a
                  href={meta.socials.openprep}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link"
                >
                  OpenPrep.com.pk ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Frontend Message Slip (Ready for Formspree) */}
          <form className="notebook-form" onSubmit={handleSubmit} aria-label="Send a note to Mushtaq Ahmad">
            <div className="form-field">
              <label htmlFor="sender-name" className="form-label">
                01. YOUR NAME
              </label>
              <input
                id="sender-name"
                type="text"
                required
                className="form-input"
                placeholder="e.g., Bilal Khan"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label htmlFor="sender-email" className="form-label">
                02. YOUR EMAIL
              </label>
              <input
                id="sender-email"
                type="email"
                required
                className="form-input"
                placeholder="you@company.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label htmlFor="sender-message" className="form-label">
                03. MESSAGE NOTE
              </label>
              <textarea
                id="sender-message"
                rows="4"
                required
                className="form-textarea"
                placeholder="Tell me about the role, project, or question..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              <span>Send note</span>
              <span aria-hidden="true">→</span>
            </button>

            {submitted && (
              <div className="form-status-note" role="status">
                ✓ Preview saved. Use the email above to send it.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
