import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaLinkedin, FaGithub, FaYoutube, FaBars, FaTimes } from 'react-icons/fa';
import logoImage from '../assets/onur.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Disable page scrolling when the menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logoImage} alt="Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">ONUR GUL</span>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-right desktop-menu">
        <a
          href="/resume.pdf"
          className="navbar-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          Resume
        </a>
        <Link to="/projects" className="navbar-link" onClick={closeMobileMenu}>
          Projects
        </Link>
        <a
          href="https://buymeacoffee.com/onurgul"
          className="navbar-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          Buy Me A Coffee
        </a>
        <a
          href="https://www.linkedin.com/in/onurgul1/"
          className="navbar-link navbar-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.youtube.com/@realonurgul"
          className="navbar-link navbar-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          <FaYoutube />
        </a>
        <a
          href="https://github.com/RealOnurGul"
          className="navbar-link navbar-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          <FaGithub />
        </a>
      </div>

      {/* Hamburger Icon (mobile) */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu with fade transition */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a
          href="/resume.pdf"
          className="navbar-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          Resume
        </a>
        <Link to="/projects" className="navbar-link" onClick={closeMobileMenu}>
          Projects
        </Link>
        <a
          href="https://buymeacoffee.com/onurgul"
          className="navbar-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          Buy Me A Coffee
        </a>
        <a
          href="https://www.linkedin.com/in/onurgul1/"
          className="navbar-link navbar-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.youtube.com/@realonurgul"
          className="navbar-link navbar-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          <FaYoutube />
        </a>
        <a
          href="https://github.com/RealOnurGul"
          className="navbar-link navbar-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
        >
          <FaGithub />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
