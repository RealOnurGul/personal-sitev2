import React, { useState } from 'react';
import './ExperienceSection.css';
import { FaLinkedin, FaGlobe } from 'react-icons/fa';
import FlowingMenu from '../components/FlowingMenu/FlowingMenu';

import hypekraftImage from '../assets/hypekraft.png';
import shopifyImage from '../assets/shopify.png';
import rentyvrImage from '../assets/rentYVR.jpeg';
import nbcImage from '../assets/nbc.png';

const experiences = [
  {
    company: 'Shopify',
    shortTitle: 'Incoming SWE Intern (x2) @ Shopify',
    image: shopifyImage,
    dateRange: 'Incoming May 2026',
    rowLabel: 'Shopify · 2026',
    skills: ['Shopify', 'Software Engineering', 'Returning Intern'],
    details: {
      title: 'Shopify (Incoming Software Engineering Intern, x2)',
      website: 'https://www.shopify.com',
      linkedin: 'https://www.linkedin.com/company/shopify/',
      description: [
        'Incoming May 2026',
        'Software Engineering Intern (x2) — Incoming May 2026',
        '● Returning to Shopify for another internship term.'
      ]
    }
  },
  {
    company: 'National Bank',
    shortTitle: 'Quant Dev Intern @ National Bank',
    image: nbcImage,
    dateRange: 'September 2025 - Present',
    rowLabel: 'National Bank · 2025',
    skills: ['Python', 'SEC EDGAR', 'Machine Learning', 'Algorithmic Trading'],
    details: {
      title: 'National Bank of Canada (Quantitative Developer Intern)',
      website: 'https://www.nbc.ca',
      linkedin: 'https://www.linkedin.com/company/national-bank-of-canada/',
      description: [
        'Montreal QC, Canada',
        'Quantitative Developer Intern - ETF & Electronic Trading Team: Algorithmic Trading',
        'September 2025 - Present',
        '● Developed an automated pipeline leveraging SEC EDGAR filings to extract and summarize key info for financial forms.',
        '● Built a regression-driven ranking algorithm that scores filings by estimated market impact, highlighting those most likely to present bullish or bearish signals.'
      ]
    }
  },
  {
    company: 'Shopify',
    shortTitle: 'SWE Intern @ Shopify',
    image: shopifyImage,
    dateRange: 'May 2025 - August 2025',
    rowLabel: 'Shopify · 2025',
    skills: ['Python', 'Google Gemini API', 'Ruby', 'Data Dashboards'],
    details: {
      title: 'Shopify (Software Engineering Intern)',
      website: 'https://www.shopify.com',
      linkedin: 'https://www.linkedin.com/company/shopify/',
      description: [
        'Montreal QC, Canada',
        'Software Engineering Intern: CX Growth RnD',
        'May 2025 - August 2025',
        '● Developed an AI-powered phone assistant for Shopify merchants using Python and the Google Gemini API.',
        '● Now live and deployed across multiple support lines.',
        '● Led a data migration of over 30,000 internal documents; leveraged Ruby to create scripts to automate the process.',
        '● Built numerous internal data dashboards that automatically notify developers when Growth RnD services encounter issues.'
      ]
    }
  },
  {
    company: 'Hypekraft',
    shortTitle: 'SWE Intern @ Hypekraft',
    image: hypekraftImage,
    dateRange: 'May 2024 - August 2024',
    rowLabel: 'Hypekraft · 2024',
    skills: ['JavaScript', 'Figma', 'Responsive Web', 'Microdata'],
    details: {
      title: 'Hypekraft Digital Ltd. (Software Engineer Intern)',
      website: 'https://www.hypekraft.com',
      linkedin: 'https://www.linkedin.com/company/hypekraft/',
      description: [
        'Vancouver BC, Canada',
        'Software Engineer Intern (May 2024 - Aug 2024)',
        '● Using JavaScript, built calculators for financing and leasing, implemented smooth scrolling, static images, and other interactive features.',
        '● Designed and implemented responsive websites based on custom Figma prototypes, leveraging microdata integration to optimize website performance.'
      ]
    }
  },
  {
    company: 'Hypekraft',
    shortTitle: 'Web Dev & Marketing @ Hypekraft',
    image: hypekraftImage,
    dateRange: 'May 2023 - August 2023',
    rowLabel: 'Hypekraft · 2023',
    skills: ['HTML', 'CSS/SASS', 'SEO', 'Marketing'],
    details: {
      title: 'Hypekraft Digital Ltd. (Web Dev & Marketing Intern)',
      website: 'https://www.hypekraft.com',
      linkedin: 'https://www.linkedin.com/company/hypekraft/',
      description: [
        'Vancouver BC, Canada',
        'Web Development and Marketing Intern (May 2023 - Aug 2023)',
        '● Optimized multiple client websites, leveraging HTML, CSS, and SASS to improve UX/UI elements.',
        '● Conducted comprehensive SEO audits and implemented effective strategies, improving search engine rankings for client websites.',
        '● Authored data-driven articles optimized for SEO, amplifying web traffic and customer engagement.'
      ]
    }
  },
  {
    company: 'RentYVR',
    shortTitle: 'Marketing Assistant @ RentYVR',
    image: rentyvrImage,
    dateRange: 'Aug 2022 - Present',
    rowLabel: 'RentYVR',
    skills: ['SEO', 'Drone Videography', 'Content Writing'],
    details: {
      title: 'RentYVR (Marketing Assistant)',
      website: 'https://www.rentyvr.com',
      linkedin: 'https://www.linkedin.com/company/rentyvr',
      description: [
        'West Vancouver BC, Canada',
        'Marketing Assistant (Aug 2022 - Present)',
        '● Conducted comprehensive SEO audits and implemented targeted strategies to enhance online visibility for luxury real estate and rental listings.',
        '● Operated drones to capture high-quality video footage, elevating the presentation of luxury real estate properties.',
        '● Authored industry-specific articles to boost SEO and engage potential clients, contributing to a more dynamic online presence.'
      ]
    }
  }
];

const menuItems = experiences.map((exp) => ({
  link: '#',
  text: exp.rowLabel,
  image: exp.image
}));

const ExperienceSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (item, index) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  const renderDetail = (item, index) => {
    const exp = experiences[index];
    if (!exp) return null;
    return (
      <div className="experience-detail-panel-inner">
        <button
          type="button"
          className="experience-detail-close"
          onClick={() => setSelectedIndex(null)}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="experience-detail-content">
          <h3 className="experience-detail-title">{exp.details.title}</h3>
          <div className="experience-detail-skills">
            {exp.skills.map((skill, idx) => (
              <span key={idx} className="skill-bubble">
                {skill}
              </span>
            ))}
          </div>
          <div className="experience-detail-description">
            {exp.details.description.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
        <footer className="experience-detail-footer">
          <div className="experience-detail-footer-links">
            <a
              href={exp.details.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-circle linkedin-circle"
            >
              <FaLinkedin />
            </a>
            <a
              href={exp.details.website}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-circle globe-circle"
            >
              <FaGlobe />
            </a>
          </div>
          <span className="experience-detail-date">{exp.dateRange}</span>
        </footer>
      </div>
    );
  };

  return (
    <div className="experience-section">
      <h2 className="experience-title">EXPERIENCE</h2>

      <div className="experience-flowing-wrap" style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu
          items={menuItems}
          speed={15}
          textColor="#ffffff"
          bgColor="#000"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#060010"
          borderColor="#ffffff"
          onItemClick={handleItemClick}
          expandedIndex={selectedIndex}
          renderDetail={renderDetail}
        />
      </div>
    </div>
  );
};

export default ExperienceSection;
