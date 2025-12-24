import React, { useState } from 'react';
import Header from '../components/Header';
import { HeroSection } from '../components/sections/HeroSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';
import DataVisualization from '../components/DataVisualization';
import GameModal from '../components/GameModal';
import Footer from '../components/Footer';
import type { Config } from '../types/config';

interface HomeProps {
  config: Config;
}

export const Home: React.FC<HomeProps> = ({ config }) => {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <HeroSection
        profile={config.profile}
        social={config.social}
        onGameClick={() => setIsGameOpen(true)}
      />
      <ExperienceSection
        experiences={config.experience}
        techLogos={config.tech_logos}
      />
      <ProjectsSection projects={config.projects} />
      <DataVisualization />
      <ContactSection contact={config.contact} />
      <Footer />
      <GameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </div>
  );
};
