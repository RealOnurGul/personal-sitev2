import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SECTION_COUNT } from './constants';

const PortalGlow = ({ position, theme, scrollProgressRef, sectionIndex }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  const glowColor = useMemo(() => {
    return theme === 'light' ? new THREE.Color('#ffffff') : new THREE.Color('#1a1a3e');
  }, [theme]);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    const progress = scrollProgressRef.current;
    const sectionStart = sectionIndex / SECTION_COUNT;
    const sectionSize = 1 / SECTION_COUNT;
    const localProgress = (progress - sectionStart) / sectionSize;

    // Portal glow activates as camera gets close to text (local progress 0.25 - 0.45)
    let intensity = 0;
    let scale = 1;

    if (localProgress > 0.2 && localProgress < 0.5) {
      if (localProgress < 0.3) {
        intensity = (localProgress - 0.2) / 0.1;
      } else if (localProgress < 0.4) {
        intensity = 1;
        scale = 1 + (localProgress - 0.3) / 0.1 * 8;
      } else {
        intensity = 1 - (localProgress - 0.4) / 0.1;
        scale = 9 + (localProgress - 0.4) / 0.1 * 20;
      }
    }

    materialRef.current.opacity = intensity * 0.85;
    materialRef.current.emissiveIntensity = intensity * 2;
    meshRef.current.scale.setScalar(scale);
    meshRef.current.visible = intensity > 0.01;
  });

  return (
    <mesh
      ref={meshRef}
      position={[position[0], position[1], position[2] - 3]}
    >
      <planeGeometry args={[30, 15]} />
      <meshStandardMaterial
        ref={materialRef}
        color={glowColor}
        emissive={glowColor}
        emissiveIntensity={0}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

export default PortalGlow;
