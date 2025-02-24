import React, { useRef, useState, useEffect } from 'react';
import './Section.css';

const Section = ({ title, description, imageUrl, bgColor, reverse }) => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Render the description either as <p> if it's a string, or directly if it's JSX
  const renderDescription = () => {
    if (typeof description === 'string') {
      return <p>{description}</p>;
    }
    return description; // if it's already a React element
  };

  return (
    <section
      className={`section-container ${visible ? 'fade-in' : 'hidden'} ${
        reverse ? 'reverse' : ''
      }`}
      style={{ backgroundColor: bgColor }}
      ref={sectionRef}
    >
      <div className="section-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="section-content">
        <h2>{title}</h2>
        {renderDescription()}
      </div>
    </section>
  );
};

export default Section;
