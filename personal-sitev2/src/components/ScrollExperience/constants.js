export const SECTIONS = [
  { id: 'about', text: 'ABOUT', theme: 'dark', textZ: 0 },
  { id: 'education', text: 'EDUCATION', theme: 'light', textZ: -110 },
  { id: 'extracurriculars', text: 'EXTRA', theme: 'dark', textZ: -240 },
  { id: 'skills', text: 'SKILLS', theme: 'light', textZ: -375 },
  { id: 'contact', text: 'CONTACT', theme: 'dark', textZ: -510 },
];

export const SECTION_COUNT = SECTIONS.length;

// O portal: white disc inside the O of "ABOUT"
// After Center, the O counter center is approximately at origin
// Disc sits at z=0 (center of text depth), visible through the O hole
export const O_CENTER_X = 0;
export const O_CENTER_Y = 0;
export const O_CENTER_Z = 0;
export const O_DISC_RADIUS = 3.0;

// Camera
export const CAMERA_START_Z = 80;
export const CAMERA_END_Z = -600;
export const ZOOM_END_Z = 0.5;
