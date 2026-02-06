import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PasswordGate from './components/PasswordGate';
import App from './App';
import './index.css';

// Toggle this flag to enable/disable the password gate globally
const ENABLE_PASSWORD_GATE = false;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {ENABLE_PASSWORD_GATE ? (
      <PasswordGate>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PasswordGate>
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
  </React.StrictMode>
);
