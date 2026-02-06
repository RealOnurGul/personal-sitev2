import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PasswordGate from './components/PasswordGate';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PasswordGate>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PasswordGate>
  </React.StrictMode>
);
