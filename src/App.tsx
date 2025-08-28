import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import GameSection from './components/GameSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import DataVisualization from './components/DataVisualization';

const App: React.FC = () => {
  return (
    <div className="App">
      <DataVisualization />
      <Header />
      <main>
        <Hero />
        <ExperienceSection />
        <GameSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;