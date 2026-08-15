import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';
import type { Config } from '../types/config';

interface HomeProps {
  config: Config;
}

export const Home: React.FC<HomeProps> = ({ config }) => {
  return (
    <div>
      <HeroSection profile={config.profile} social={config.social} />
      <ExperienceSection experiences={config.experience} />
      <ProjectsSection projects={config.projects} />
      <ContactSection contact={config.contact} />
    </div>
  );
};
