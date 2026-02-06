import React, { useState, useEffect } from 'react';
import './PasswordGate.css';

const STORAGE_KEY = 'site_admin_unlocked';
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

const PasswordGate = ({ children }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'true') setUnlocked(true);
    setChecking(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password.trim() === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setUnlocked(true);
    } else {
      setError('Incorrect password.');
    }
  };

  if (checking) {
    return (
      <div className="password-gate-wrap">
        <div className="password-gate-loading">Loading...</div>
      </div>
    );
  }

  if (unlocked) {
    return children;
  }

  return (
    <div className="password-gate-wrap">
      <div className="password-gate-card">
        <h1 className="password-gate-title">Website going under changes</h1>
        <p className="password-gate-subtitle">Password for admin access. Otherwise, stay tuned for the new website soon.</p>
        <form onSubmit={handleSubmit} className="password-gate-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="password-gate-input"
            autoFocus
          />
          <button type="submit" className="password-gate-btn">Enter</button>
        </form>
        {error && <p className="password-gate-error">{error}</p>}
        <p className="password-gate-stay-tuned">Stay tuned for the new website soon.</p>
      </div>
    </div>
  );
};

export default PasswordGate;
