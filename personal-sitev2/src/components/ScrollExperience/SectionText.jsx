import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { SECTION_COUNT } from './constants';

const FONT_URL = 'https://cdn.jsdelivr.net/npm/three@0.167.1/examples/fonts/helvetiker_bold.typeface.json';

const SectionText = ({ text, position, theme, scrollProgressRef, sectionIndex, adaptive }) => {
  const groupRef = useRef();

  const textColor = useMemo(() => {
    return theme === 'light' ? '#c0c0c0' : '#9090b0';
  }, [theme]);

  const bevelSegments = adaptive?.textBevelSegments ?? 4;
  const curveSegments = adaptive?.textCurveSegments ?? 12;

  useFrame(() => {
    if (!groupRef.current) return;

    const progress = scrollProgressRef.current;
    const sectionStart = sectionIndex / SECTION_COUNT;
    const sectionEnd = (sectionIndex + 1) / SECTION_COUNT;
    const localProgress = (progress - sectionStart) / (sectionEnd - sectionStart);

    const approachFactor = Math.max(0, Math.min(1, localProgress * 1.5));
    const scale = THREE.MathUtils.lerp(0.7, 1, approachFactor);
    groupRef.current.scale.setScalar(scale);

    const opacity = localProgress > 0.28 ? Math.max(0, 1 - (localProgress - 0.28) / 0.15) : 1;
    groupRef.current.traverse((child) => {
      if (child.material) {
        child.material.opacity = opacity;
        child.material.transparent = true;
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={8}
          height={4}
          bevelEnabled
          bevelSize={0.3}
          bevelThickness={0.2}
          bevelSegments={bevelSegments}
          curveSegments={curveSegments}
        >
          {text}
          <meshStandardMaterial
            color={textColor}
            metalness={0.92}
            roughness={0.12}
            envMapIntensity={1.5}
          />
        </Text3D>
      </Center>
    </group>
  );
};

export default SectionText;
