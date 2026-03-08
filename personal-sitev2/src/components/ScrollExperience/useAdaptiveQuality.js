import { useState, useEffect } from 'react';

export default function useAdaptiveQuality() {
  const [quality, setQuality] = useState('high');

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const width = window.innerWidth;

    if (isMobile || width < 768) {
      setQuality('low');
    } else if (width < 1200) {
      setQuality('medium');
    } else {
      setQuality('high');
    }
  }, []);

  return {
    quality,
    isMobile: quality === 'low',
    particleCount: quality === 'low' ? 80 : quality === 'medium' ? 200 : 400,
    enablePostProcessing: quality === 'high',
    textBevelSegments: quality === 'low' ? 2 : 3,
    textCurveSegments: quality === 'low' ? 6 : 10,
    starCount: quality === 'low' ? 800 : 3000,
    dpr: quality === 'low' ? [1, 1] : [1, 1.5],
  };
}
