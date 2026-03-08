import React, { useRef, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLenis } from 'lenis/react';
import Scene from './Scene';
import useAdaptiveQuality from './useAdaptiveQuality';
import { SECTIONS, SECTION_COUNT } from './constants';
import './ScrollExperience.css';

function getOverlayOpacity(globalProgress, sectionIndex) {
  const sectionStart = sectionIndex / SECTION_COUNT;
  const sectionEnd = (sectionIndex + 1) / SECTION_COUNT;
  const sectionSize = sectionEnd - sectionStart;
  const localProgress = (globalProgress - sectionStart) / sectionSize;

  if (sectionIndex === 0) {
    /* About: overlay fades in after zoom, stays visible for most of section */
    if (localProgress < 0.40) return 0;
    if (localProgress < 0.52) return (localProgress - 0.40) / 0.12;
    if (localProgress < 0.90) return 1;
    if (localProgress < 0.97) return 1 - (localProgress - 0.90) / 0.07;
    return 0;
  }

  if (localProgress < 0.30 || localProgress > 0.95) return 0;
  if (localProgress < 0.40) return (localProgress - 0.30) / 0.10;
  if (localProgress < 0.80) return 1;
  return 1 - (localProgress - 0.80) / 0.15;
}

const ScrollExperience = ({ children }) => {
  const zoneRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const overlayRefs = useRef([]);
  const fixedRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const progressBarRef = useRef(null);
  const sectionLabelRef = useRef(null);
  const adaptive = useAdaptiveQuality();

  const setOverlayRef = useCallback((el, i) => {
    overlayRefs.current[i] = el;
  }, []);

  useLenis(({ scroll }) => {
    const zone = zoneRef.current;
    const fixed = fixedRef.current;
    if (!zone || !fixed) return;

    const rect = zone.getBoundingClientRect();
    const zoneTop = -rect.top;
    const zoneHeight = zone.offsetHeight - window.innerHeight;
    const vh = window.innerHeight;

    if (zoneHeight <= 0) return;

    // Show the fixed layer when approaching the zone (fade in over last 40% of viewport)
    // and keep it until we've scrolled past the zone
    const distFromTop = rect.top;
    let layerOpacity = 0;

    if (distFromTop > vh * 0.4) {
      // Zone is still well below viewport — hidden
      layerOpacity = 0;
    } else if (distFromTop > 0) {
      // Zone top is entering the viewport — fade in
      layerOpacity = 1 - distFromTop / (vh * 0.4);
    } else if (rect.bottom >= vh) {
      // Fully inside the zone
      layerOpacity = 1;
    } else if (rect.bottom > 0) {
      // Scrolled past the zone — fade out
      layerOpacity = rect.bottom / vh;
    } else {
      layerOpacity = 0;
    }

    if (layerOpacity > 0.01) {
      fixed.style.visibility = 'visible';
      fixed.style.opacity = layerOpacity;
      fixed.style.pointerEvents = layerOpacity > 0.5 ? 'auto' : 'none';
    } else {
      fixed.style.visibility = 'hidden';
      fixed.style.opacity = 0;
      fixed.style.pointerEvents = 'none';
      scrollProgressRef.current = distFromTop > 0 ? 0 : 1;
      return;
    }

    const rawProgress = zoneTop / zoneHeight;
    const progress = Math.max(0, Math.min(1, rawProgress));
    scrollProgressRef.current = progress;

    SECTIONS.forEach((_, i) => {
      const el = overlayRefs.current[i];
      if (!el) return;
      const opacity = getOverlayOpacity(progress, i);
      el.style.opacity = opacity;
      el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      el.style.zIndex = 5 + Math.round(opacity * 10);
      el.classList.toggle('active', opacity > 0.5);
    });

    if (canvasWrapRef.current) {
      const anyOverlayVisible = SECTIONS.some((_, i) => getOverlayOpacity(progress, i) > 0.5);
      canvasWrapRef.current.style.display = anyOverlayVisible ? 'none' : 'block';
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleY(${progress})`;
    }

    if (sectionLabelRef.current) {
      const activeIndex = Math.min(Math.floor(progress * SECTION_COUNT), SECTION_COUNT - 1);
      const label = SECTIONS[activeIndex]?.text || '';
      if (sectionLabelRef.current.textContent !== label) {
        sectionLabelRef.current.textContent = label;
      }
    }
  });

  const sectionChildren = React.Children.toArray(children);

  return (
    <>
      {/* Tall spacer div that creates the scroll distance */}
      <div className="scroll-experience-zone" ref={zoneRef} />

      {/* Fixed fullscreen layer — pinned to viewport, opacity controlled by JS */}
      <div
        className="scroll-experience-fixed"
        ref={fixedRef}
        style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
      >
        <div className="scroll-experience-canvas-wrap" ref={canvasWrapRef}>
          <Canvas
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            dpr={adaptive.dpr}
            camera={{ fov: 75, near: 0.1, far: 1500, position: [0, 0, 100] }}
          >
            <Suspense fallback={null}>
              <Scene scrollProgressRef={scrollProgressRef} adaptive={adaptive} />
            </Suspense>
          </Canvas>
        </div>

        {SECTIONS.map((section, i) => (
          <div
            key={section.id}
            className={`scroll-overlay scroll-overlay--${section.theme}`}
            ref={(el) => setOverlayRef(el, i)}
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            <div className="scroll-overlay-content">
              {sectionChildren[i] || null}
            </div>
          </div>
        ))}

        <div className="scroll-progress-track" aria-hidden="true">
          <div className="scroll-progress-fill" ref={progressBarRef} />
        </div>
        <div className="scroll-section-label" ref={sectionLabelRef} aria-hidden="true" />
      </div>
    </>
  );
};

export default ScrollExperience;
