import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  SECTION_COUNT,
  CAMERA_START_Z,
  CAMERA_END_Z,
  ZOOM_END_Z,
  O_CENTER_X,
  O_CENTER_Y,
  O_CENTER_Z,
} from './constants';

// Zoom into O takes the first half of the About section
const ABOUT_END = 1 / SECTION_COUNT;
const ABOUT_ZOOM_END = ABOUT_END * 0.5;

const CameraRig = ({ scrollProgressRef }) => {
  const { camera } = useThree();
  const smoothProgress = useRef(0);

  const curve = useMemo(() => {
    const points = [];
    const steps = 100;
    const startZ = ZOOM_END_Z;
    const endZ = CAMERA_END_Z;
    const range = startZ - endZ;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const z = startZ - range * t;
      const y = Math.sin(t * Math.PI * 4) * 1.0;
      const x = Math.cos(t * Math.PI * 3) * 0.6;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame(() => {
    const target = scrollProgressRef.current;
    const lerpFactor = target <= ABOUT_ZOOM_END ? 0.04 : 0.025;
    smoothProgress.current += (target - smoothProgress.current) * lerpFactor;

    const p = Math.max(0, Math.min(1, smoothProgress.current));

    if (p <= ABOUT_ZOOM_END) {
      // PHASE 1 — Zoom straight into the O
      const t = p / ABOUT_ZOOM_END;
      const eased = t * t * (3 - 2 * t); // smoothstep

      const z = THREE.MathUtils.lerp(CAMERA_START_Z, ZOOM_END_Z, eased);
      const x = THREE.MathUtils.lerp(0, O_CENTER_X * 0.85, eased);

      camera.position.set(x, 0, z);
      camera.lookAt(O_CENTER_X, O_CENTER_Y, O_CENTER_Z);
    } else {
      // PHASE 2 — Fly through remaining sections
      const curveT = (p - ABOUT_ZOOM_END) / (1 - ABOUT_ZOOM_END);
      const clamped = Math.max(0, Math.min(1, curveT));

      const point = curve.getPointAt(clamped);
      camera.position.copy(point);

      const lookAhead = Math.min(clamped + 0.015, 1);
      const lookTarget = curve.getPointAt(lookAhead);
      camera.lookAt(lookTarget);
    }
  });

  return null;
};

export default CameraRig;
