import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import DataVisualization from './components/DataVisualization';
import GameModal from './components/GameModal';

const App: React.FC = () => {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  return (
    <div className="App">
      <DataVisualization />
      <Header />
      <main>
        <Hero onGameClick={() => setIsGameModalOpen(true)} />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <GameModal 
        isOpen={isGameModalOpen} 
        onClose={() => setIsGameModalOpen(false)} 
      />
    </div>
  );
};

export default App;