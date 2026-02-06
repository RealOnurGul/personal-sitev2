import React from 'react';
import './GradualBlur.css';

/**
 * Gradual blur overlay for the bottom or top of a scrollable area.
 * Renders stacked layers with increasing backdrop-filter blur.
 *
 * @param {string} target - Optional target identifier (e.g. "page")
 * @param {'bottom'|'top'} position - Where to attach the blur
 * @param {string} height - Height of the blur zone (e.g. "7rem")
 * @param {number} strength - Blur strength multiplier
 * @param {number} divCount - Number of overlay layers
 * @param {string} curve - "bezier" or "linear" (affects distribution)
 * @param {boolean} exponential - If true, blur increases exponentially per layer
 * @param {number} opacity - Max opacity of the overlay (0–1)
 */
function GradualBlur({
  target,
  position = 'bottom',
  height = '7rem',
  strength = 2.5,
  divCount = 8,
  curve = 'bezier',
  exponential = false,
  opacity = 1
}) {
  const isBottom = position === 'bottom';
  const layers = Array.from({ length: divCount }, (_, i) => {
    const t = (i + 1) / divCount;
    const factor = curve === 'bezier'
      ? t * t * (3 - 2 * t)
      : t;
    const blurPx = exponential
      ? strength * (Math.exp(factor * 2) - 1) / (Math.exp(2) - 1)
      : strength * factor;
    const layerOpacity = (opacity * (i + 1)) / divCount;
    return {
      blur: Math.min(blurPx * 4, 40),
      opacity: layerOpacity
    };
  });

  return (
    <div
      className={`gradual-blur gradual-blur--${position}`}
      style={{
        height,
        ['--gradual-blur-height']: height
      }}
      data-target={target}
      aria-hidden="true"
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          className="gradual-blur__layer"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            opacity: layer.opacity,
            [isBottom ? 'top' : 'bottom']: `${(i / divCount) * 100}%`
          }}
        />
      ))}
    </div>
  );
}

export default GradualBlur;
