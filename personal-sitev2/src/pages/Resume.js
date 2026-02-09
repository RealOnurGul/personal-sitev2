import React from 'react';
import { FaDownload } from 'react-icons/fa';
import './Resume.css';

const Resume = () => {
  return (
    <div className="resume-page">
      <a
        href="/resume.pdf"
        download="Onur_Gul_Resume.pdf"
        className="resume-download-btn"
      >
        <FaDownload className="resume-download-icon" />
        Download PDF
      </a>
      <div className="resume-embed-wrap">
        <iframe
          src="/resume.pdf"
          title="Onur Gul Resume"
          className="resume-iframe"
        />
      </div>
    </div>
  );
};

export default Resume;
