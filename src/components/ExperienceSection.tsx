import React from 'react';
import Section from './Section';

const ExperienceSection: React.FC = () => {
  const techLogos: { [key: string]: { src: string; alt: string } } = {
    "Python": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      alt: "Python"
    },
    "dbt": {
      src: "https://seeklogo.com/images/D/dbt-logo-500AB0BAA7-seeklogo.com.png",
      alt: "dbt"
    },
    "Terraform": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
      alt: "Terraform"
    },
    "AWS": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      alt: "AWS"
    },
    "Git": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      alt: "Git"
    },
    "SQL": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
      alt: "SQL"
    },
    "PostgreSQL": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      alt: "PostgreSQL"
    },
    "Kubernetes": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
      alt: "Kubernetes"
    },
    "SQLAlchemy": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg",
      alt: "SQLAlchemy"
    },
    "Google Data Studio": {
      src: "https://www.gstatic.com/analytics-suite/header/suite/v2/ic_data_studio.svg",
      alt: "Google Data Studio"
    },
    "Splunk": {
      src: "https://img.icons8.com/?size=512&id=49188&format=png",
      alt: "Splunk"
    },
    "Tableau": {
      src: "https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png",
      alt: "Tableau"
    },
    "Power BI": {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
      alt: "Power BI"
    },
    "Selenium": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
      alt: "Selenium"
    },
    "Bash": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
      alt: "Bash"
    },
    "Linux": {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      alt: "Linux"
    }
  };

  const experiences = [
    {
      title: "Senior Data Engineer",
      company: "AEON Bank",
      period: "Sep 2024 - Present",
      location: "Kuala Lumpur · Hybrid",
      description: "",
      technologies: ["Python", "dbt", "Terraform", "AWS", "Kubernetes", "Git", "SQL"]
    },
    {
      title: "Analytics Engineer & Platform Engineer",
      company: "Be U by Bank Islam",
      period: "Jul 2022 - Sep 2024 · 2 yrs 3 mos",
      location: "Kuala Lumpur · Hybrid",
      description: "",
      technologies: ["Python", "AWS", "Kubernetes", "SQL", "Git"]
    },
    {
      title: "Performance & System Analyst",
      company: "DHL eCommerce Solutions",
      period: "Sep 2020 - Jul 2022 · 1 yr 11 mos",
      location: "Puchong · Hybrid",
      description: "",
      technologies: ["Python", "PostgreSQL", "Google Data Studio", "Splunk", "Tableau", "Power BI", "Selenium", "Bash", "Linux"]
    }
  ];

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
                {'location' in exp && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {(exp as any).location}
                  </p>
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full mt-2 lg:mt-0 self-start">
                {exp.period}
              </span>
            </div>
            
            {/* <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {exp.description}
            </p> */}
            
            <div className="flex flex-wrap gap-4">
              {exp.technologies.map((tech, techIndex) => {
                const logo = techLogos[tech];
                return (
                  <div 
                    key={techIndex}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                    title={tech}
                  >
                    <img 
                      src={logo.src}
                      alt={logo.alt}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const textSpan = document.createElement('span');
                          textSpan.textContent = tech;
                          textSpan.className = 'text-sm font-medium text-gray-700 dark:text-gray-300';
                          parent.appendChild(textSpan);
                        }
                      }}
                    />
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

export default ExperienceSection;