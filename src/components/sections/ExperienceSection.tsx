import React from 'react';
import { Section } from '../common/Section';
import type { Experience, TechLogo } from '../../types/config';

interface ExperienceSectionProps {
  experiences: Experience[];
  techLogos: Record<string, TechLogo>;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, techLogos }) => {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="My professional journey in technologies field"
      background="alternate"
    >
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {exp.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  {exp.company}
                </p>
                {exp.location && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {exp.location}
                  </p>
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full mt-2 lg:mt-0 self-start">
                {exp.period}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              {exp.technologies.map((tech, techIndex) => {
                const logo = techLogos[tech];
                return (
                  <div
                    key={techIndex}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                    title={tech}
                  >
                    {logo && (
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tech}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
