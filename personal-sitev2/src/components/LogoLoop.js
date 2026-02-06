import React from 'react';
import './LogoLoop.css';

/**
 * Conveyor-belt logo loop. Pass logos as array of { src, alt } or { logo, name }.
 * Uses two copies of the list for seamless infinite scroll.
 */
const LogoLoop = ({ logos = [], logoHeight = 48, gap = 32, speed = 40, direction = 'left', className = '' }) => {
  const normalized = logos.map((item) => ({
    src: item.src ?? item.logo,
    alt: item.alt ?? item.name ?? 'Logo',
    name: item.name ?? item.alt ?? 'Logo'
  })).filter((item) => item.src);

  if (normalized.length === 0) return null;

  const trackStyle = {
    '--logo-height': `${logoHeight}px`,
    '--gap': `${gap}px`,
    '--speed': `${speed}s`
  };

  return (
    <div className={`logo-loop-wrap ${direction === 'right' ? 'logo-loop--right' : ''} ${className}`} style={{ minHeight: logoHeight + 24 }}>
      <div className="logo-loop-track" style={trackStyle} aria-hidden="true">
        <div className="logo-loop-inner">
          {normalized.map((logo, i) => (
            <div key={`a-${i}`} className="logo-loop-item">
              <span className="logo-loop-label">{logo.name}</span>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
        <div className="logo-loop-inner" aria-hidden="true">
          {normalized.map((logo, i) => (
            <div key={`b-${i}`} className="logo-loop-item">
              <span className="logo-loop-label">{logo.name}</span>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoLoop;
