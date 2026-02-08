import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PasswordGate from './components/PasswordGate';
import App from './App';
import './index.css';

// Suppress benign ResizeObserver loop error (common on mobile/resize; does not affect behavior)
const resizeObserverErr = (e) => {
  if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || e.message === 'ResizeObserver loop limit exceeded') {
    e.stopImmediatePropagation();
    return true;
  }
  return false;
};
window.addEventListener('error', resizeObserverErr);

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
