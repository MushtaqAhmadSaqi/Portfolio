import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact({ contact, meta }) {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useScrollReveal();

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
    } catch (_) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;
    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      className="notebook-section observe-section"
      id="contact"
      aria-labelledby="contact-heading"
      style={{ borderBottom: 'none' }}
    >
      <div className="section-margin">
        <span className="margin-index">06 // CONTACT</span>
        <p className="margin-subnote">{contact.availabilityNote}</p>
      </div>

      <div className="contact-content-wrap">
        <div className="section-header-block">
          <h2 id="contact-heading" className="section-title">
            {contact.heading}
          </h2>
          <p className="section-subtitle">
            {contact.subtext} Let's build something exceptional together.
          </p>
        </div>

        <div className="contact-sheet">
          {/* Left Column: Direct Outreach & Quick Links */}
          <div className="contact-left-col">
            <p className="contact-lead-text">
              Whether you're looking for an AI/Frontend engineer for an internship, want to collaborate on OpenPrep, or discuss system architecture — feel free to drop a message.
            </p>

            <div className="email-copy-box">
              <div className="email-text-group">
                <span className="email-label">DIRECT EMAIL</span>
                <a className="email-address-mono" href={`mailto:${meta.email}`}>
                  {meta.email}
                </a>
              </div>
              <button
                type="button"
                className={`copy-email-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopyEmail}
                aria-label="Copy email address to clipboard"
              >
                {copied ? 'COPIED ✓' : 'COPY'}
              </button>
            </div>

            <div className="contact-social-grid" aria-label="External profiles">
              <a
                href={meta.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
              >
                <span className="social-pill-dot" />
                <span>GitHub ↗</span>
              </a>
              <a
                href={meta.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
              >
                <span className="social-pill-dot" />
                <span>LinkedIn ↗</span>
              </a>
              <a
                href={meta.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
              >
                <span className="social-pill-dot" />
                <span>Download CV ↗</span>
              </a>
              <a
                href={meta.socials.openprep}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
              >
                <span className="social-pill-dot" />
                <span>OpenPrep.com.pk ↗</span>
              </a>
            </div>

            <div className="contact-live-status">
              <span className="status-pulse-dot" aria-hidden="true" />
              <span>Based in Islamabad (PKT / UTC+5) · Open for remote &amp; local roles</span>
            </div>
          </div>

          {/* Right Column: Modern Glassmorphic Message Form */}
          <div className="contact-right-col">
            <form
              className="notebook-form"
              onSubmit={handleSubmit}
              aria-label="Send a direct note to Mushtaq Ahmad"
            >
              <div className="form-top-title">
                <span className="form-tag">DIRECT MESSAGE</span>
                <span className="form-num">REF // 06</span>
              </div>

              <div className="form-field">
                <label htmlFor="sender-name" className="form-label">
                  01. YOUR NAME
                </label>
                <input
                  id="sender-name"
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Alex Carter or Recruiter"
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
                  placeholder="name@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label htmlFor="sender-message" className="form-label">
                  03. PROJECT OR ROLE NOTE
                </label>
                <textarea
                  id="sender-message"
                  rows="4"
                  required
                  maxLength={500}
                  className="form-textarea"
                  placeholder="Tell me about the role, project, or question..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
                <div className="char-count-line">
                  {formState.message.length} / 500 chars
                </div>
              </div>

              <button type="submit" className="btn-primary form-submit-btn">
                <span>Send Note</span>
                <span aria-hidden="true">→</span>
              </button>

              {submitted && (
                <div className="form-status-note" role="status">
                  ✓ Message saved! Feel free to also send directly via email above.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
