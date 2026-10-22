import React, { useCallback, useState } from 'react';
import { ProjectArchitectureModal } from '../common/ProjectArchitectureModal';
import { Section } from '../common/Section';
import type { Project } from '../../types/config';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeArchitecture = useCallback(() => setActiveProject(null), []);

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

            {(project.diagram || (project.link && project.link !== '#')) && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {project.diagram && (
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    aria-haspopup="dialog"
                    className="link-underline inline-flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-stone-100"
                  >
                    View architecture
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.75}
                        d="M4 6h6v4H4V6zm10 8h6v4h-6v-4zM7 10v4h7"
                      />
                    </svg>
                  </button>
                )}

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
              </div>
            )}
          </article>
        ))}
      </div>

      {activeProject?.diagram && (
        <ProjectArchitectureModal project={activeProject} onClose={closeArchitecture} />
      )}
    </Section>
  );
};
