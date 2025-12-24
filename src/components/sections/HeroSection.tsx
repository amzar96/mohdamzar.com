import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getYearsOfExperience, interpolateDescription } from '../../config/loader';
import { GitHubIcon, LinkedInIcon, StackOverflowIcon, BehanceIcon } from '../common/Icons';
import type { Profile, Social } from '../../types/config';

interface HeroSectionProps {
  profile: Profile;
  social: Social;
  onGameClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, social, onGameClick }) => {
  const { ref, isVisible } = useScrollAnimation();
  const workingYears = getYearsOfExperience(profile.start_year);
  const description = interpolateDescription(profile.description, workingYears);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className={`max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>

        <div className="relative">
          <div className="glass-effect rounded-2xl p-8 text-center">
            <div className="relative">
              <img
                src={profile.image}
                alt={`${profile.name} Profile Photo`}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white dark:border-gray-700 shadow-2xl"
              />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {profile.name} <span className="text-sm text-gray-500 dark:text-gray-400">({profile.pronouns})</span>
            </h1>
            <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-4">
              {profile.title}
            </p>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {profile.location}
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${profile.email}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Building Data
              <span className="gradient-text block">Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {profile.current_description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Get In Touch
            </a>
            <button onClick={onGameClick} className="btn-ghost">
              🎮 Play Game
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <a
              href={social.github}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href={social.linkedin}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href={social.stackoverflow}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Stack Overflow"
            >
              <StackOverflowIcon />
            </a>
            <a
              href={social.behance}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Behance"
            >
              <BehanceIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
