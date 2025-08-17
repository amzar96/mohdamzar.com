import React from 'react';
import Section from './Section';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "Data Pipeline Automation",
      description: "Automated ETL pipeline processing millions of records daily with real-time monitoring and alerting.",
      technologies: ["Python", "Apache Airflow", "PostgreSQL", "Redis"],
      status: "Production",
      link: "#"
    },
    {
      title: "Analytics Dashboard",
      description: "Interactive business intelligence dashboard providing real-time insights for stakeholders.",
      technologies: ["React", "D3.js", "FastAPI", "Docker"],
      status: "In Development",
      link: "#"
    }
  ];

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Some of the projects I've worked on in data engineering and software development"
    >
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                project.status === 'Production' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <a 
              href={project.link}
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              View Project
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-8 border-2 border-dashed border-primary-200 dark:border-primary-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Research Projects
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Machine learning and data science research projects will be showcased here.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900/20 dark:to-primary-900/20 rounded-xl p-8 border-2 border-dashed border-secondary-200 dark:border-secondary-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Open Source
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Contributions to open source projects and personal tools will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectsSection;