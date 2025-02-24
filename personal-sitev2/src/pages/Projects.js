import React, { useState, useEffect } from 'react';
import './Projects.css';
import { FaGlobe, FaLinkedin } from 'react-icons/fa';

/* Placeholder images for the project squares. Replace with your actual logos if you have them. */
import mlstocksImage from '../assets/mlstocks.png';
import mcgillquantImage from '../assets/mcgillquant.png';
import pharmahacksImage from '../assets/pharmahacks.png';

const Projects = () => {
  const [selectedProj, setSelectedProj] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  // We'll store each project similarly to how we did experiences
  // "skills" is optional if you want skill bubbles; you can skip it or add them.
  const projects = [
    {
      shortTitle: 'ML Stock Correlation Dashboard',
      image: mlstocksImage,
      dateRange: 'Second Place, National Bank Challenge',
      details: {
        title: 'Machine Learning Stock Correlation Dashboard',
        website: 'https://devpost.com/software/volatility-vision',
        linkedin: 'https://www.linkedin.com', /* placeholder or remove if not relevant */
        description: [
          'Developed a frontend using React to create interactive visualizations of stock performance, enabling clear analysis of trends across five unknown stocks with data recorded at microsecond intervals.',
          'Trained a Recurrent Neural Network (RNN) using PyTorch to predict stock price movements, achieving 80–90% accuracy on test data.',
          'Designed a momentum-based pairs trading algorithm using Pearson correlation analysis to predict and rebalance correlated stocks, optimizing profitability.',
          'Access the project here: https://devpost.com/software/volatility-vision'
        ]
      }
    },
    {
      shortTitle: 'McGill Quantitative Research Club',
      image: mcgillquantImage,
      dateRange: 'October 2024 - Present',
      details: {
        title: 'McGill Quantitative Research Club',
        website: 'https://www.linkedin.com', /* placeholder or remove if not relevant */
        linkedin: 'https://www.linkedin.com', /* placeholder */
        description: [
          'Founder, Head of Algorithmic Trading',
          'Created McGill’s first quantitative finance club to conduct student-led research in areas such as algorithmic programming, data science, and risk management.',
          'Currently leading research on a machine learning-based algorithmic trading method, focusing on high-volatility securities and refining trade execution to enhance profitability.'
        ]
      }
    },
    {
      shortTitle: 'Pharmahacks Hackathon',
      image: pharmahacksImage,
      dateRange: 'Oct 2024 - Present',
      details: {
        title: 'Pharmahacks Hackathon (Vice President of Web Dev)',
        website: 'https://pharmahacks.com',
        linkedin: 'https://www.linkedin.com', /* placeholder */
        description: [
          'Montreal QC, Canada',
          'Head of development of the hackathon’s website using React (pharmahacks.com).',
          'Implemented reusable components and modular code for rapid updates and scalability in future events.'
        ]
      }
    }
  ];

  // Clicking a card -> set data, then open drawer
  const handleCardClick = (proj) => {
    setSelectedProj(proj);
    setTimeout(() => {
      setShowDrawer(true);
    }, 0);
  };

  // Close drawer -> slide down, then clear data
  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setTimeout(() => {
      setSelectedProj(null);
    }, 300);
  };

  // Lock/unlock scroll
  useEffect(() => {
    if (showDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showDrawer]);

  return (
    <div className="projects-page">
      <h2 className="projects-title">Welcome to my projects dashboard! With more to come!</h2>

      {/* Grid of bigger squares */}
      <div className="projects-grid">
        {projects.map((proj, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() => handleCardClick(proj)}
          >
            <img src={proj.image} alt={proj.shortTitle} className="project-card-image" />
            <div className="project-card-text">
              {proj.shortTitle}
            </div>
          </div>
        ))}
      </div>

      {/* Drawer overlay */}
      {(selectedProj || showDrawer) && (
        <div
          className={`projects-drawer-overlay ${showDrawer ? 'open' : ''}`}
          onClick={handleCloseDrawer}
        >
          <div
            className="projects-drawer-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="projects-drawer-close" onClick={handleCloseDrawer}>
              &times;
            </button>

            {selectedProj && (
              <>
                <div className="projects-drawer-content">
                  <h3 className="projects-drawer-title">
                    {selectedProj.details.title}
                  </h3>
                  <div className="projects-drawer-description">
                    {selectedProj.details.description.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>

                <footer className="projects-drawer-footer-bar">
                  <div className="projects-drawer-footer-left">
                    {/* Round icons, if relevant */}
                    <a
                      href={selectedProj.details.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon-circle linkedin-circle"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={selectedProj.details.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon-circle globe-circle"
                    >
                      <FaGlobe />
                    </a>
                  </div>
                  <div className="projects-drawer-footer-right">
                    {selectedProj.dateRange}
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

export default Projects;
