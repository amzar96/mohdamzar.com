import React from 'react';
import { Section } from '../common/Section';
import type { Experience } from '../../types/config';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div>
        {experiences.map((exp, index) => (
          <article
            key={index}
            className={`py-10 ${index > 0 ? 'border-t border-stone-200 dark:border-stone-800' : ''}`}
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
              <h3 className="font-display text-2xl text-stone-900 dark:text-stone-100">
                {exp.title}
              </h3>
              <span className="font-mono text-xs text-stone-500 dark:text-stone-400 shrink-0">
                {exp.period}
              </span>
            </div>
            <p className="text-primary-700 dark:text-primary-400 font-medium">{exp.company}</p>
            {exp.location && (
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{exp.location}</p>
            )}
            {exp.description && (
              <p className="mt-3 text-stone-600 dark:text-stone-300 leading-relaxed">{exp.description}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {exp.technologies.map((tech, i) => (
                <span key={i} className="font-mono text-xs text-stone-500 dark:text-stone-400">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};
