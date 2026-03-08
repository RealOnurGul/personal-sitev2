import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

const PostFX = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.15} darkness={0.7} />
    </EffectComposer>
  );
};

export default PostFX;
