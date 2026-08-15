import React from 'react';
import { Section } from '../common/Section';
import type { Project } from '../../types/config';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work">
      <div>
        {projects.map((project, index) => (
          <article
            key={index}
            className={`py-10 ${index > 0 ? 'border-t border-stone-200 dark:border-stone-800' : ''}`}
          >
            <div className="flex items-baseline justify-between gap-4 mb-3">
              <h3 className="font-display text-2xl text-stone-900 dark:text-stone-100">
                {project.title}
              </h3>
              <span className="font-mono text-xs text-stone-500 dark:text-stone-400 shrink-0">
                {project.status}
              </span>
            </div>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              {project.technologies.map((tech, i) => (
                <span key={i} className="font-mono text-xs text-stone-500 dark:text-stone-400">
                  {tech}
                </span>
              ))}
            </div>
            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm font-medium text-stone-900 dark:text-stone-100"
              >
                View Project →
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
};
