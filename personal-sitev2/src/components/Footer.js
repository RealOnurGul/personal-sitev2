// File: src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-left">
        Onur Gul © {currentYear}
      </div>
    </footer>
  );
};

export default Footer;
