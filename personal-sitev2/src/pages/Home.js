import React, { useState } from 'react';
import AboutMeSection from './AboutMeSection';
import Section from './Section';
import ExperienceSection from './ExperienceSection';
import './Home.css';

// Images
import profilePic from '../assets/profile.png';
import educationImage from '../assets/education.png';
import technicalImage from '../assets/technical.png';
import extracurricularsImage from '../assets/extracurriculars.png';

// Skills
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

// Icons for bottom contact
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

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
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('onur@onurgul.ca');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-banner">
        <div className="hero-left">
          <h1 className="hero-title">ONUR GUL</h1>
          <h2 className="hero-subtitle">MCGILL UNIVERSITY</h2>
          <h2 className="hero-subtitle">VARSITY SWIMMER</h2>
          <h2 className="hero-subtitle">SOFTWARE ENGINEER</h2>
        </div>
        {/* Separate container for the photo */}
        <div className="hero-photo-container">
          <img src={profilePic} alt="Profile" className="hero-profile-pic" />
        </div>
      </div>

      {/* About Me Section */}
      <AboutMeSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* "More About Me!" Subheading */}
      <h2 className="section-intro">More About Me!</h2>

      {/* Education Stripe */}
      <Section
        title="Education"
        description={(
          <>
            <p>
              Currently pursuing a Bachelor of Science in Mathematics and Computer Science at McGill University,
              expected to graduate in spring 2026.
            </p>
            <br />
            <p>
              My coursework spans Machine Learning, Quantitative Risk Management, Probability, Statistics, Calculus, Abstract Algebra, Data Structures, Algorithms and more.
            </p>
          </>
        )}
        imageUrl={educationImage}
        bgColor="#ffffff"
      />

      {/* Technical Skills Stripe */}
      <Section
        title="Technical Skills"
        description={(
          <>
            <p>
              I’m currently in my third year at McGill University, studying Mathematics and Computer Science, constantly learning new
              languages and frameworks by tackling various projects.
            </p>
            <br />
            <p>
              As a co-founder of the McGill Quantitative Research Club, I am currently leading our algorithmic trading sector, working on developing a predictor for currency futures.
            </p>
            <br />
            <p>
              I have also had the opportunity to present previous trading algorithms, including a Pearson correlation model and an RNN model, which I presented at the National Bank.
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

      {/* Extracurriculars Stripe */}
      <Section
        title="Extracurriculars"
        description={(
          <>
            <p>
              I've been swimming competitively for over 13 years and am currently on the McGill Varsity Swim Team.
              I have competed at high-level international competitions, and have qualified for Olympic Swimming Trials.
            </p>
            <br />
            <p>
              Outside of swimming, I enjoy surfing, golf, tennis, chess and much more!
            </p>
          </>
        )}
        imageUrl={extracurricularsImage}
        bgColor="#ffffff"
      />

      {/* Contact Section at the bottom */}
      <div className="home-contact-section">
        <h2>Get in Touch</h2>
        <p>I’d love to hear your thoughts!</p>

        <div className="contact-details">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Vancouver BC, Canada</span>
          </div>
          <div
            className="contact-item email-item"
            onClick={handleCopyEmail}
          >
            <FaEnvelope className="contact-icon" />
            <span className="clickable-email">onur@onurgul.ca</span>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <span>604-562-2408</span>
          </div>
          <p className={`clipboard-msg ${copied ? 'show' : ''}`}>
            Copied to clipboard!
          </p>
        </div>

        <div className="contact-socials">
          <a
            href="https://www.linkedin.com/in/onurgul1/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-link linkedin-link"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/RealOnurGul"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-link github-link"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.youtube.com/@realonurgul"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-link youtube-link"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
