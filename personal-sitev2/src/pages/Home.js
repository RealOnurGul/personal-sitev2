import React, { useState, useRef } from 'react';
import Section from './Section';
import ExperienceSection from './ExperienceSection';
import LogoLoop from '../components/LogoLoop';
import ColorBends from '../components/ColorBends/ColorBends';
import TiltedCard from '../components/TiltedCard/TiltedCard';
import CardSwap, { Card } from '../components/CardSwap/CardSwap';
import FadeContent from '../components/FadeContent';
import Beams from '../components/Beams/Beams';
import './Home.css';

// Images
import profilePic from '../assets/profile.png';
import educationImage from '../assets/education.png';
import technicalImage from '../assets/technical.png';
import extracurricularsImage from '../assets/extracurriculars.png';
import onurBackstroke from '../assets/Onur_BACKSTROKE.jpeg';

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
import matlabLogo from '../assets/skills/matlab.png';
import ocamlLogo from '../assets/skills/ocaml.png';
import swiftLogo from '../assets/skills/swift.png';
import assemblyLogo from '../assets/skills/assembly.png';
import rubyLogo from '../assets/skills/ruby.png';
import sqlLogo from '../assets/skills/sql.png';
import cppLogo from '../assets/skills/cpp.png';
import typescriptLogo from '../assets/skills/typescript.png';

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
  { name: 'C', logo: cLogo },
  { name: 'MATLAB', logo: matlabLogo },
  { name: 'OCaml', logo: ocamlLogo },
  { name: 'Swift', logo: swiftLogo },
  { name: 'Assembly', logo: assemblyLogo },
  { name: 'Ruby', logo: rubyLogo },
  { name: 'SQL', logo: sqlLogo },
  { name: 'C++', logo: cppLogo },
  { name: 'TypeScript', logo: typescriptLogo }
];

const CARD_TITLES = ['About Me', 'Education', 'Extracurriculars'];
const CARD_TEXTS = [
  <>
    <p>Hello! I'm Onur Gul, a fourth year Mathematics and Computer Science student at McGill University, passionate about software engineering, machine learning, and competitive swimming. My journey includes internships, leadership roles, and active contributions to web development and data science projects.</p>
    <p>Welcome to my digital space!</p>
  </>,
  <>
    <p>Currently pursuing a Bachelor of Science in Mathematics and Computer Science at McGill University, expected to graduate in spring 2026.</p>
    <p>My coursework spans Machine Learning, Quantitative Risk Management, Probability, Statistics, Calculus, Abstract Algebra, Data Structures, Algorithms and more.</p>
  </>,
  <>
    <p>I've been swimming competitively for over 13 years and am currently on the McGill Varsity Swim Team. I have competed at high-level international competitions, and have qualified for Olympic Swimming Trials.</p>
    <p>Outside of swimming, I enjoy surfing, golf, tennis, chess and much more!</p>
  </>
];

const Home = () => {
  const [copied, setCopied] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardSwapRef = useRef(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('onur@onurgul.ca');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="home-page">
      {/* Hero Section - background extends down so it can "leak" into experience */}
      <div className="hero-banner">
        <div className="hero-banner-bg">
          <ColorBends
            colors={['#ff5c7a', '#8a5cff', '#00ffd1']}
            rotation={0}
            speed={0.2}
            scale={1}
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
        {/* Bottom gradient: hero background fades to black */}
        <div className="hero-bottom-gradient" aria-hidden="true" />
        {/* EXPERIENCE title lives in hero so it sits in the fade */}
        <h2 className="hero-experience-heading">EXPERIENCE</h2>
      </div>

      {/* Experience Section (list only; title is in hero) */}
      <ExperienceSection />

      {/* More About Me: black section, white text left, card stack right */}
      <section className="more-about-section">
        <div className="more-about-left">
          <h2 className="more-about-headline">More about me.</h2>
          <div className="more-about-body">
            <FadeContent
              key={activeCardIndex}
              blur={true}
              duration={1000}
              ease="ease-out"
              initialOpacity={0}
              triggerOnMount={true}
            >
              {CARD_TEXTS[activeCardIndex]}
            </FadeContent>
          </div>
        </div>
        <div className="more-about-right">
          <div className="card-swap-wrap">
            <CardSwap
              ref={cardSwapRef}
              width={940}
              height={640}
              cardDistance={48}
              verticalDistance={160}
              delay={10000}
              pauseOnHover={false}
              easing="power1.inOut"
              onFrontChange={setActiveCardIndex}
              onCardClick={() => cardSwapRef.current?.next()}
            >
              <Card>
                <div className="card-inner card-inner-with-header">
                  <div className="card-header-bar">
                    <span className="card-header-icon">&lt;/&gt;</span>
                    {CARD_TITLES[0]}
                  </div>
                  <div className="card-photo-wrap">
                    <img src={onurBackstroke} alt="Onur Backstroke" className="card-photo" />
                  </div>
                </div>
              </Card>
              <Card>
                <div className="card-inner card-inner-with-header">
                  <div className="card-header-bar">
                    <span className="card-header-icon">&lt;/&gt;</span>
                    {CARD_TITLES[1]}
                  </div>
                  <div className="card-photo-wrap">
                    <img src={educationImage} alt="Education" className="card-photo" />
                  </div>
                </div>
              </Card>
              <Card>
                <div className="card-inner card-inner-with-header">
                  <div className="card-header-bar">
                    <span className="card-header-icon">&lt;/&gt;</span>
                    {CARD_TITLES[2]}
                  </div>
                  <div className="card-photo-wrap">
                    <img src={extracurricularsImage} alt="Extracurriculars" className="card-photo" />
                  </div>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>

      {/* Technical Skills with Beams background */}
      <div className="technical-skills-with-beams">
        <Beams
          beamWidth={2.5}
          beamHeight={22}
          beamNumber={20}
          lightColor="#b2c7f0"
          speed={1.3}
          noiseIntensity={1.3}
          scale={0.23}
          rotation={30}
        />
        <Section
          title="Technical Skills"
          description={(
            <>
              <p>
                I'm currently in my fourth year at McGill University, studying Mathematics and Computer Science, constantly learning new
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
            </>
          )}
          imageUrl={technicalImage}
          bgColor="transparent"
          className="section--shorter section--on-beams"
        />

        {/* Technical skills conveyor belt */}
        <LogoLoop
          logos={techSkills}
          logoHeight={52}
          gap={40}
          speed={38}
          direction="left"
        />
      </div>

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
