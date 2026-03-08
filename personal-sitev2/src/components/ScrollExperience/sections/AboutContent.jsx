import React from 'react';
import backstrokePhoto from '../../../assets/Onur_BACKSTROKE.jpeg';

const AboutContent = () => (
  <div className="about-section-inner">
    <div className="about-col-text">
      <h2 className="about-heading about-reveal">About Me</h2>
      <div className="about-divider about-reveal" />
      <p className="about-paragraph about-reveal">
        Hello! I'm Onur Gul, a fourth year Mathematics and Computer Science
        student at McGill University, passionate about software engineering,
        machine learning, and competitive swimming.
      </p>
      <p className="about-paragraph about-reveal">
        My journey includes internships at companies like Shopify and the
        National Bank of Canada, leadership roles, and active contributions to
        web development and data science projects.
      </p>
      <p className="about-paragraph about-reveal">
        Welcome to my digital space!
      </p>
    </div>
    <div className="about-col-photo">
      <div className="about-photo-frame about-reveal">
        <img
          src={backstrokePhoto}
          alt="Onur Gul — backstroke"
          className="about-photo-img"
        />
      </div>
    </div>
  </div>
);

export default AboutContent;
