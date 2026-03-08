import React, { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import ElectricBorder from '../../ElectricBorder/ElectricBorder';

const ContactContent = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('onur@onurgul.ca');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="section-contact-content">
      <div className="get-in-touch-wrap" style={{ margin: '0 auto', padding: 0 }}>
        <ElectricBorder
          color="#B19EEF"
          speed={1}
          chaos={0.12}
          thickness={2}
          borderRadius={16}
          className="get-in-touch-card"
        >
          <div className="get-in-touch-content">
            <h2 className="get-in-touch-title">Get in Touch</h2>
            <p className="get-in-touch-subtitle">I'd love to hear your thoughts!</p>

            <a href="mailto:onur@onurgul.ca" className="get-in-touch-email">
              <FaEnvelope className="get-in-touch-email-icon" />
              <span>onur@onurgul.ca</span>
            </a>
            <div
              className="get-in-touch-copy"
              onClick={handleCopyEmail}
              onKeyDown={(e) => e.key === 'Enter' && handleCopyEmail()}
              role="button"
              tabIndex={0}
            >
              Copy email
            </div>
            <p className={`get-in-touch-clipboard-msg ${copied ? 'show' : ''}`}>
              Copied to clipboard!
            </p>

            <div className="get-in-touch-socials">
              <a
                href="https://www.linkedin.com/in/onurgul1/"
                target="_blank"
                rel="noopener noreferrer"
                className="get-in-touch-social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/RealOnurGul"
                target="_blank"
                rel="noopener noreferrer"
                className="get-in-touch-social-link"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.youtube.com/@realonurgul"
                target="_blank"
                rel="noopener noreferrer"
                className="get-in-touch-social-link"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>

            <a
              href="mailto:onur@onurgul.ca?subject=Let's%20schedule%20a%20call"
              className="get-in-touch-schedule-btn"
            >
              Schedule a Call
            </a>
          </div>
        </ElectricBorder>
      </div>
    </div>
  );
};

export default ContactContent;
