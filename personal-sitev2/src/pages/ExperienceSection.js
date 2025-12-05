import React, { useState, useEffect } from 'react';
import './ExperienceSection.css';
import { FaLinkedin, FaGlobe } from 'react-icons/fa';

/* Images for the card previews */
import hypekraftImage from '../assets/hypekraft.png';
import shopifyImage from '../assets/shopify.png';
import rentyvrImage from '../assets/rentYVR.jpeg';
import nbcImage from '../assets/nbc.png';

const ExperienceSection = () => {
  const [selectedExp, setSelectedExp] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  // Five items now, with RentYVR last
  const experiences = [
    {
      shortTitle: 'Quant Dev Intern @ National Bank',
      image: nbcImage,
      dateRange: 'September 2025 - Present',
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
      shortTitle: 'SWE Intern @ Shopify',
      image: shopifyImage,
      dateRange: 'May 2025 - August 2025',
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
      shortTitle: 'SWE Intern @ Hypekraft',
      image: hypekraftImage,
      dateRange: 'May 2024 - August 2024',
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
      shortTitle: 'Web Dev & Marketing @ Hypekraft',
      image: hypekraftImage,
      dateRange: 'May 2023 - August 2023',
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
      shortTitle: 'Marketing Assistant @ RentYVR',
      image: rentyvrImage,
      dateRange: 'Aug 2022 - Present',
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

  // Clicking a card -> set the data, then trigger the drawer "open" in next tick
  const handleCardClick = (exp) => {
    setSelectedExp(exp);
    setTimeout(() => {
      setShowDrawer(true);
    }, 0);
  };

  // Close the drawer -> slide down, then clear data after animation
  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setTimeout(() => {
      setSelectedExp(null);
    }, 300);
  };

  // Lock/unlock scrolling when drawer is open
  useEffect(() => {
    if (showDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showDrawer]);

  return (
    <div className="experience-section">
      <h2 className="experience-title">Experience</h2>

      <div className="experience-grid">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="experience-card"
            onClick={() => handleCardClick(exp)}
          >
            <img
              src={exp.image}
              alt={exp.shortTitle}
              className="experience-card-image"
            />
            <div className="experience-card-text">
              {exp.shortTitle}
            </div>
          </div>
        ))}
      </div>

      {(selectedExp || showDrawer) && (
        <div
          className={`drawer-overlay ${showDrawer ? 'open' : ''}`}
          onClick={handleCloseDrawer}
        >
          <div
            className="drawer-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="drawer-close" onClick={handleCloseDrawer}>
              &times;
            </button>

            {selectedExp && (
              <>
                <div className="drawer-content">
                  <h3 className="drawer-title">
                    {selectedExp.details.title}
                  </h3>

                  <div className="drawer-skills">
                    {selectedExp.skills.map((skill, idx) => (
                      <span key={idx} className="skill-bubble">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="drawer-description">
                    {selectedExp.details.description.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>

                {/* True footer element pinned at the bottom of the drawer */}
                <footer className="drawer-footer-bar">
                  <div className="drawer-footer-left">
                    <a
                      href={selectedExp.details.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon-circle linkedin-circle"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={selectedExp.details.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon-circle globe-circle"
                    >
                      <FaGlobe />
                    </a>
                  </div>
                  <div className="drawer-footer-right">
                    {selectedExp.dateRange}
                  </div>
                </footer>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
