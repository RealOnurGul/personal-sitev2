import React, { useRef, useState, useEffect } from 'react';
import './AboutMeSection.css';
import onurBackstroke from '../assets/Onur_BACKSTROKE.jpeg';

const AboutMeSection = () => {
  const sectionRef = useRef(null);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      /*
        The logic here: 
        - If the top of the section is below the viewport (rect.top < windowHeight),
          it means we can see some or all of the About Me section.
        - We calculate 'topInView' as how many pixels from the top of the section 
          to the bottom of the viewport. 
        - Once topInView >= 0, the fade begins.
      */

      const topInView = windowHeight - rect.top;

      // If the section hasn't entered the screen yet, keep overlay fully opaque
      if (topInView <= 0) {
        setOverlayOpacity(1);
        return;
      }

      // topInView goes from 0 (just entering) to rect.height (fully visible)
      let progress = topInView / rect.height;
      if (progress > 1) progress = 1;

      // newOpacity goes from 1 -> 0 as the user scrolls through the section
      const newOpacity = 1 - progress;
      setOverlayOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="about-me-section" ref={sectionRef}>
      {/* Left side: The photo + overlay */}
      <div className="left-side">
        <img
          src={onurBackstroke}
          alt="Onur Backstroke"
          className="background-image"
        />
        <div
          className="color-overlay"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Right side: About Me text */}
      <div className="right-side">
        <h2>About Me</h2>
        <p>
        Hello! I'm Onur Gul, a third year Mathematics and Computer Science student at McGill University, passionate about software engineering, machine learning, and 
        competitive swimming. My journey includes internships, leadership roles, and active contributions to web development and data science projects. 
        </p>
        <br></br>
        <p>
        Welcome to my digital space!
        </p>
      </div>
    </div>
  );
};

export default AboutMeSection;
