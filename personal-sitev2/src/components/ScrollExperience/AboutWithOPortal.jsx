import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import {
  SECTION_COUNT,
  O_CENTER_X,
  O_CENTER_Y,
  O_CENTER_Z,
  O_DISC_RADIUS,
} from './constants';

const FONT_URL =
  'https://cdn.jsdelivr.net/npm/three@0.167.1/examples/fonts/helvetiker_bold.typeface.json';

const AboutWithOPortal = ({ scrollProgressRef, adaptive }) => {
  const textGroupRef = useRef();

  const bevelSegments = adaptive?.textBevelSegments ?? 3;
  const curveSegments = adaptive?.textCurveSegments ?? 10;

  useFrame(() => {
    if (!textGroupRef.current) return;

    const progress = scrollProgressRef.current;
    const localProgress = progress * SECTION_COUNT;

    // Text fades out when camera is very close to the front face (~44-49% of section).
    // At that point the O counter fills the viewport and only the disc is visible.
    const textOpacity =
      localProgress > 0.44
        ? Math.max(0, 1 - (localProgress - 0.44) / 0.05)
        : 1;

    textGroupRef.current.traverse((child) => {
      if (child.material) {
        child.material.opacity = textOpacity;
        child.material.transparent = true;
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ABOUT text — Center wraps so bounding-box center sits at origin */}
      <group ref={textGroupRef}>
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
            ABOUT
            <meshStandardMaterial
              color="#e8e8f0"
              emissive="#c0c0d0"
              emissiveIntensity={0.2}
              metalness={0.6}
              roughness={0.25}
              envMapIntensity={1.3}
            />
          </Text3D>
        </Center>
      </group>

      {/*
        White disc portal — sits inside the O at center depth (z=0 after Center).
        The Text3D mesh occludes it on all sides except through the O's counter hole.
        As the camera zooms toward this disc, it grows via perspective until it
        fills the entire viewport, then the DOM overlay takes over seamlessly.
      */}
      <mesh position={[O_CENTER_X, O_CENTER_Y, O_CENTER_Z]}>
        <circleGeometry args={[O_DISC_RADIUS, 64]} />
        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default AboutWithOPortal;
