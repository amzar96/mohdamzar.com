import React from 'react';
import { getYearsOfExperience, interpolateDescription } from '../../config/loader';
import { GitHubIcon, LinkedInIcon, StackOverflowIcon, BehanceIcon } from '../common/Icons';
import type { Profile, Social } from '../../types/config';

interface HeroSectionProps {
  profile: Profile;
  social: Social;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, social }) => {
  const workingYears = getYearsOfExperience(profile.start_year);
  const description = interpolateDescription(profile.description, workingYears);

  return (
    <section className="px-6 pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-6">
          {profile.title} · {profile.location}
        </p>

        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-stone-900 dark:text-stone-100">
          {profile.name}
          <span className="text-primary-600 dark:text-primary-400">.</span>
        </h1>

        <p className="mt-8 text-lg md:text-xl leading-relaxed text-stone-700 dark:text-stone-300 max-w-2xl">
          {description}
        </p>

        <p className="mt-6 text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
          {profile.current_description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href="#contact" className="btn-primary">
            Get in Touch
          </a>
          <a href="/cv" className="btn-ghost">
            View CV
          </a>
        </div>

        <div className="mt-12 flex items-center gap-5 text-stone-500 dark:text-stone-400">
          <span className="font-mono text-xs uppercase tracking-widest">{workingYears}+ years · Data &amp; Analytics</span>
          <span className="w-px h-4 bg-stone-300 dark:bg-stone-700" />
          <a href={social.github} aria-label="GitHub" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            <GitHubIcon />
          </a>
          <a href={social.linkedin} aria-label="LinkedIn" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            <LinkedInIcon />
          </a>
          <a href={social.stackoverflow} aria-label="Stack Overflow" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            <StackOverflowIcon />
          </a>
          <a href={social.behance} aria-label="Behance" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            <BehanceIcon />
          </a>
        </div>
      </div>
    </section>
  );
};
