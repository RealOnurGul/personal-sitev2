// File: src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import GradualBlur from './components/GradualBlur/GradualBlur';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {/* The site-wide footer at the bottom */}
      <Footer />
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
