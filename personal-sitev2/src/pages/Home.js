import React from 'react';
import ColorBends from '../components/ColorBends/ColorBends';
import TiltedCard from '../components/TiltedCard/TiltedCard';
import ExperienceSection from './ExperienceSection';
import ScrollExperience from '../components/ScrollExperience/ScrollExperience';
import AboutContent from '../components/ScrollExperience/sections/AboutContent';
import EducationContent from '../components/ScrollExperience/sections/EducationContent';
import ExtracurricularsContent from '../components/ScrollExperience/sections/ExtracurricularsContent';
import SkillsContent from '../components/ScrollExperience/sections/SkillsContent';
import ContactContent from '../components/ScrollExperience/sections/ContactContent';
import './Home.css';

import profilePic from '../assets/profile.png';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero + Experience share the same ColorBends background */}
      <div className="hero-experience-wrapper">
        <div className="hero-experience-bg">
          <ColorBends
            colors={['#ff5c7a', '#8a5cff', '#00ffd1']}
            rotation={0}
            speed={0.2}
            scale={0.8}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.5}
            noise={0.1}
            transparent
            autoRotate={0}
          />
        </div>

        <div className="hero-content-wrap">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-title">ONUR GUL</h1>
              <h2 className="hero-subtitle">MCGILL UNIVERSITY</h2>
              <h2 className="hero-subtitle">VARSITY SWIMMER</h2>
              <h2 className="hero-subtitle">SOFTWARE ENGINEER</h2>
            </div>
            <div className="hero-photo-container">
              <TiltedCard
                imageSrc={profilePic}
                altText="Onur Gul"
                captionText=""
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
              />
            </div>
          </div>
        </div>

        <h2 className="hero-experience-heading">EXPERIENCE</h2>

        <div className="hero-experience-section">
          <ExperienceSection />
        </div>

        <div className="hero-bottom-gradient" aria-hidden="true" />
      </div>

      {/* 3D Scroll Experience — sections after experience */}
      <ScrollExperience>
        <AboutContent />
        <EducationContent />
        <ExtracurricularsContent />
        <SkillsContent />
        <ContactContent />
      </ScrollExperience>
    </div>
  );
};

export default Home;
