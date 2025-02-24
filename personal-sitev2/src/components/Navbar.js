import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaLinkedin, FaGithub, FaYoutube, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link navbar-logo" onClick={handleLinkClick}>
          ONUR GUL
        </Link>
      </div>
      <div className="navbar-right desktop-menu">
        <a
          href="/resume.pdf"
          className="navbar-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          Resume
        </a>
        <Link to="/projects" className="navbar-link" onClick={handleLinkClick}>
          Projects
        </Link>
        <Link to="/contact" className="navbar-link" onClick={handleLinkClick}>
          Contact Me
        </Link>
        <a
          href="https://www.linkedin.com/in/onurgul1/"
          className="navbar-link navbar-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.youtube.com/@realonurgul"
          className="navbar-link navbar-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          <FaYoutube />
        </a>
        <a
          href="https://github.com/RealOnurGul"
          className="navbar-link navbar-icon-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          <FaGithub />
        </a>
      </div>
      <div className="mobile-menu-icon" onClick={handleToggleMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a
            href="/resume.pdf"
            className="navbar-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            Resume
          </a>
          <Link to="/projects" className="navbar-link" onClick={handleLinkClick}>
            Projects
          </Link>
          <Link to="/contact" className="navbar-link" onClick={handleLinkClick}>
            Contact Me
          </Link>
          <a
            href="https://www.linkedin.com/in/onurgul1/"
            className="navbar-link navbar-icon-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.youtube.com/@realonurgul"
            className="navbar-link navbar-icon-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            <FaYoutube />
          </a>
          <a
            href="https://github.com/RealOnurGul"
            className="navbar-link navbar-icon-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            <FaGithub />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
