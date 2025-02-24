import React from 'react';
import AboutMeSection from './AboutMeSection';
import Section from './Section';
import ExperienceSection from './ExperienceSection';
import './Home.css';

/* Import images for hero and stripes */
import profilePic from '../assets/profile.png';
import educationImage from '../assets/education.png';
import technicalImage from '../assets/technical.png';
import extracurricularsImage from '../assets/extracurriculars.png';

/* Skill logos for Technical Skills */
import pythonLogo from '../assets/skills/python.png';
import javaLogo from '../assets/skills/java.png';
import reactLogo from '../assets/skills/react.png';
import jsLogo from '../assets/skills/javascript.png';
import htmlLogo from '../assets/skills/html.png';
import cssLogo from '../assets/skills/css.png';
import pytorchLogo from '../assets/skills/pytorch.png';
import sassLogo from '../assets/skills/sass.png';
import rstudioLogo from '../assets/skills/rstudio.png';
import cLogo from '../assets/skills/c.png';

const techSkills = [
  { name: 'Python', logo: pythonLogo },
  { name: 'Java', logo: javaLogo },
  { name: 'React', logo: reactLogo },
  { name: 'JavaScript', logo: jsLogo },
  { name: 'HTML', logo: htmlLogo },
  { name: 'CSS', logo: cssLogo },
  { name: 'PyTorch', logo: pytorchLogo },
  { name: 'SASS', logo: sassLogo },
  { name: 'RStudio', logo: rstudioLogo },
  { name: 'C', logo: cLogo }
];

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero / Intro Section with fade-in animation */}
      <div className="hero-banner">
        <div className="hero-left">
          <h1 className="hero-title">ONUR GUL</h1>
          <h2 className="hero-subtitle">MCGILL UNIVERSITY</h2>
          <h2 className="hero-subtitle">VARSITY SWIMMER</h2>
          <h2 className="hero-subtitle">SOFTWARE ENGINEER</h2>
        </div>
        <div className="hero-right">
          <img src={profilePic} alt="Profile" className="hero-profile-pic" />
        </div>
      </div>

      {/* About Me Section with additional filler text */}
      <AboutMeSection>
        <p>
          I am a passionate software engineer currently in my third year at McGill University.
          I challenge myself by exploring new technologies and tackling complex projects.
          I recently presented innovative solutions at National Bank, and I strive to push the limits
          of my knowledge every day.
        </p>
      </AboutMeSection>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Subheading */}
      <h2 className="section-intro">More About Me!</h2>

      {/* Education Section with filler text */}
      <Section
        title="Education"
        description={`I graduated from a top program where I honed my analytical and technical skills.
        My academic journey has equipped me with the discipline and knowledge to tackle real-world problems.`}
        imageUrl={educationImage}
        bgColor="#ffffff"
      />

      {/* Technical Skills Section with updated filler text */}
      <Section
        title="Technical Skills"
        description={(
          <>
            <p>
              As a third-year student at McGill University, I continuously learn and refine my skills.
              I recently presented at National Bank, demonstrating my expertise in modern web technologies.
            </p>
            <div className="tech-icons-row">
              {techSkills.map((skill) => (
                <div className="tech-icon" key={skill.name}>
                  <img src={skill.logo} alt={skill.name} />
                  <span className="tooltip-text">{skill.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
        imageUrl={technicalImage}
        bgColor="#f7f7f7"
        reverse
      />

      {/* Extracurriculars Section with filler text */}
      <Section
        title="Extracurriculars"
        description={`Beyond academics, I actively engage in extracurricular activities that foster leadership and creativity.
        Whether it's organizing tech workshops or participating in competitive sports, I embrace challenges with enthusiasm.`}
        imageUrl={extracurricularsImage}
        bgColor="#ffffff"
      />
    </div>
  );
};

export default Home;
