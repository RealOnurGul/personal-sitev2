import React, { useState } from 'react';
import { FaGlobe, FaLinkedin } from 'react-icons/fa';
import './ExperienceSection.css';

const ExperienceCard = ({ experience }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="experience-card" onClick={toggleExpand}>
      <div className="experience-header">
        <img
          src={experience.logo}
          alt={experience.title}
          className="experience-logo"
        />
        <h3>{experience.title}</h3>
      </div>

      {/* Icons for website & LinkedIn (clickable) */}
      <div className="experience-links">
        <a
          href={experience.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} /* Prevent card toggle */
        >
          <FaGlobe />
        </a>
        <a
          href={experience.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} /* Prevent card toggle */
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="experience-details">
          {experience.details.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
