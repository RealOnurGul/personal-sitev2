import React from 'react';
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import FloatingLines from '../components/FloatingLines/FloatingLines';
import './Resume.css';

const Resume = () => {
  return (
    <div className="resume-page">
      <div className="resume-page-bg" aria-hidden="true">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          linesGradient={['#B19EEF', '#c4b5f7', '#9f8ae0']}
        />
      </div>
      <div className="resume-page-content">
      {/* Desktop: download + embedded PDF */}
      <a
        href="/resume.pdf"
        download="Onur_Gul_Resume.pdf"
        className="resume-download-btn resume-desktop-only"
      >
        <FaDownload className="resume-download-icon" />
        Download PDF
      </a>

      <div className="resume-embed-wrap resume-desktop-only">
        <iframe
          src="/resume.pdf"
          title="Onur Gul Resume"
          className="resume-iframe"
        />
      </div>

      {/* Mobile: compact card, open in browser so text is readable */}
      <div className="resume-mobile-only">
        <p className="resume-mobile-text">View or download my resume</p>
        <div className="resume-mobile-buttons">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-mobile-btn resume-mobile-btn-primary"
          >
            <FaExternalLinkAlt />
            Open PDF
          </a>
          <a
            href="/resume.pdf"
            download="Onur_Gul_Resume.pdf"
            className="resume-mobile-btn resume-mobile-btn-secondary"
          >
            <FaDownload />
            Download
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Resume;
