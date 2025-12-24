import React from 'react';
import Section from './common/Section';
import JumpGame from './JumpGame';

const GameSection: React.FC = () => {
  return (
    <Section
      id="game"
      title="Take a Break"
      subtitle="Need a quick break from data? Try this fun mini-game!"
      background="alternate"
    >
      <div className="max-w-2xl mx-auto">
        <JumpGame />
      </div>
    </Section>
  );
};

export default GameSection;