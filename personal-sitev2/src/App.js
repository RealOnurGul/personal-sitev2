// File: src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
// import ResumePage from './pages/ResumePage'; // if you have a resume page or not
import ContactWidget from './components/ContactWidget'; // new sliding widget
import './App.css';

function App() {
  // State to control the contact form widget
  const [showContact, setShowContact] = useState(false);

  // Toggle function to open/close the contact widget
  const toggleContact = () => {
    setShowContact((prev) => !prev);
  };

  return (
    <div className="App">
      {/* Pass toggleContact & showContact to Navbar */}
      <Navbar toggleContact={toggleContact} />
      <ContactWidget show={showContact} close={() => setShowContact(false)} />

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          {/* If you want a separate Resume route or a PDF link, that’s up to you */}
          {/* <Route path="/resume" element={<ResumePage />} /> */}
          {/* ... any other routes */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
