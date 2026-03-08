import React from 'react';
import CameraRig from './CameraRig';
import SectionText from './SectionText';
import PortalGlow from './PortalGlow';
import AboutWithOPortal from './AboutWithOPortal';
import Environment3D from './Environment3D';
import PostFX from './PostFX';
import { SECTIONS } from './constants';

const Scene = ({ scrollProgressRef, adaptive }) => {
  return (
    <>
      <CameraRig scrollProgressRef={scrollProgressRef} />
      <Environment3D adaptive={adaptive} />

      {/* About section: custom O portal zoom */}
      <AboutWithOPortal scrollProgressRef={scrollProgressRef} adaptive={adaptive} />

      {/* Remaining sections: standard 3D text + glow */}
      {SECTIONS.slice(1).map((section, i) => {
        const sectionIndex = i + 1;
        const position = [0, 0, section.textZ];
        return (
          <React.Fragment key={section.id}>
            <SectionText
              text={section.text}
              position={position}
              theme={section.theme}
              scrollProgressRef={scrollProgressRef}
              sectionIndex={sectionIndex}
              adaptive={adaptive}
            />
            <PortalGlow
              position={position}
              theme={section.theme}
              scrollProgressRef={scrollProgressRef}
              sectionIndex={sectionIndex}
            />
          </React.Fragment>
        );
      })}

      {adaptive.enablePostProcessing && <PostFX />}
    </>
  );
};

export default Scene;
