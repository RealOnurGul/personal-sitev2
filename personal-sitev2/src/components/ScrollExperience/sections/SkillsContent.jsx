import React from 'react';
import LogoLoop from '../../LogoLoop';

import pythonLogo from '../../../assets/skills/python.png';
import javaLogo from '../../../assets/skills/java.png';
import reactLogo from '../../../assets/skills/react.png';
import jsLogo from '../../../assets/skills/javascript.png';
import htmlLogo from '../../../assets/skills/html.png';
import cssLogo from '../../../assets/skills/css.png';
import pytorchLogo from '../../../assets/skills/pytorch.png';
import sassLogo from '../../../assets/skills/sass.png';
import rstudioLogo from '../../../assets/skills/rstudio.png';
import cLogo from '../../../assets/skills/c.png';
import matlabLogo from '../../../assets/skills/matlab.png';
import ocamlLogo from '../../../assets/skills/ocaml.png';
import swiftLogo from '../../../assets/skills/swift.png';
import assemblyLogo from '../../../assets/skills/assembly.png';
import rubyLogo from '../../../assets/skills/ruby.png';
import sqlLogo from '../../../assets/skills/sql.png';
import cppLogo from '../../../assets/skills/cpp.png';
import typescriptLogo from '../../../assets/skills/typescript.png';

const techSkills = [
  { name: 'Python', logo: pythonLogo },
  { name: 'Java', logo: javaLogo },
  { name: 'React', logo: reactLogo },
  { name: 'JavaScript', logo: jsLogo },
  { name: 'HTML', logo: htmlLogo },
  { name: 'CSS', logo: cssLogo },
  { name: 'PyTorch', logo: pytorchLogo },
  { name: 'SASS', logo: sassLogo },
  { name: 'RStudio', logo: rstudioLogo },
  { name: 'C', logo: cLogo },
  { name: 'MATLAB', logo: matlabLogo },
  { name: 'OCaml', logo: ocamlLogo },
  { name: 'Swift', logo: swiftLogo },
  { name: 'Assembly', logo: assemblyLogo },
  { name: 'Ruby', logo: rubyLogo },
  { name: 'SQL', logo: sqlLogo },
  { name: 'C++', logo: cppLogo },
  { name: 'TypeScript', logo: typescriptLogo },
];

const SkillsContent = () => (
  <div className="section-skills-content">
    <h2 className="section-content-title">Technical Skills</h2>
    <div className="section-content-body">
      <p>
        I'm currently in my fourth year at McGill University, studying Mathematics and Computer
        Science, constantly learning new languages and frameworks by tackling various projects.
      </p>
      <p>
        As a co-founder of the McGill Quantitative Research Club, I am currently leading our
        algorithmic trading sector, working on developing a predictor for currency futures.
      </p>
    </div>
    <div style={{ marginTop: '40px' }}>
      <LogoLoop logos={techSkills} logoHeight={52} gap={40} speed={38} direction="left" />
    </div>
  </div>
);

export default SkillsContent;
