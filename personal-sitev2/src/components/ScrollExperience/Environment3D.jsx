import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingParticles = ({ count = 400 }) => {
  const meshRef = useRef();

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1400;
      spd[i] = 0.15 + Math.random() * 0.5;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const baseX = positions[i * 3];
      const baseY = positions[i * 3 + 1];
      const baseZ = positions[i * 3 + 2];
      const speed = speeds[i];

      dummy.position.set(
        baseX + Math.sin(t * speed + i) * 2,
        baseY + Math.cos(t * speed * 0.7 + i * 0.5) * 1.5,
        baseZ
      );
      dummy.scale.setScalar(0.08 + Math.sin(t * speed * 2 + i) * 0.04);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#8899bb" transparent opacity={0.5} />
    </instancedMesh>
  );
};

const Environment3D = ({ adaptive }) => {
  const particleCount = adaptive?.particleCount ?? 400;
  const starCount = adaptive?.starCount ?? 3000;

  return (
    <>
      <color attach="background" args={['#06060f']} />
      <fog attach="fog" args={['#06060f', 80, 350]} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 30]} intensity={2.0} color="#b0c4ff" />
      <directionalLight position={[-15, -5, -20]} intensity={0.8} color="#ff8866" />
      <pointLight position={[0, 5, 50]} intensity={1.0} color="#aaaaff" distance={300} />

      <Stars
        radius={400}
        depth={300}
        count={starCount}
        factor={4}
        saturation={0.15}
        fade
        speed={0.4}
      />

      <FloatingParticles count={particleCount} />
    </>
  );
};

export default Environment3D;
