// File: src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import StaggeredMenu from './components/StaggeredMenu/StaggeredMenu';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import GradualBlur from './components/GradualBlur/GradualBlur';
import logoImage from './assets/onur.png';
import './App.css';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Resume', ariaLabel: 'Open resume', link: '/resume.pdf' },
  { label: 'Projects', ariaLabel: 'View projects', link: '/projects' }
];

const socialItems = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/onurgul1/' },
  { label: 'YouTube', link: 'https://www.youtube.com/@realonurgul' },
  { label: 'GitHub', link: 'https://github.com/RealOnurGul' }
];

function App() {
  return (
    <div className="App">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={['#5227FF', '#6b3dff', '#8455ff']}
        logoUrl={logoImage}
        accentColor="#5227FF"
        isFixed={true}
        closeOnClickAway={true}
      />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {/* The site-wide footer at the bottom */}
      <Footer />
      <Analytics />
      {/* Constant blur at the bottom of the screen, full width, always visible */}
      <div
        className="app-gradual-blur-wrap"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '4rem',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 5
        }}
      >
        <GradualBlur
          target="page"
          position="bottom"
          height="4rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
        />
      </div>
    </div>
  );
}

export default App;
