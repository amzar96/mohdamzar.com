import React from 'react';
import { useConfig } from '../hooks/useConfig';
import { Loading } from '../components/common/Loading';
import { getYearsOfExperience, interpolateDescription } from '../config/loader';
import type { CVExperience, CVEducation, CVCertification, CVSkillCategory } from '../types/config';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-3">
    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100 print:text-black">
      {children}
    </h2>
    <div className="border-b border-gray-900 dark:border-gray-400 mt-1 print:border-black" />
  </div>
);

const ExperienceItem: React.FC<{ exp: CVExperience }> = ({ exp }) => (
  <div className="mb-5">
    <div className="flex justify-between items-baseline">
      <span className="font-bold text-sm text-gray-900 dark:text-gray-100 print:text-black">{exp.title}</span>
      <span className="text-xs text-gray-600 dark:text-gray-400 shrink-0 ml-2 print:text-black">{exp.period}</span>
    </div>
    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 print:text-black">{exp.company}</div>
    <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
      {exp.bullets.map((b, i) => (
        <li key={i} className="text-xs text-gray-700 dark:text-gray-300 print:text-black">{b}</li>
      ))}
    </ul>
    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 print:text-black">
      <span className="font-semibold">Technologies: </span>
      {exp.technologies.join(', ')}
    </p>
  </div>
);

const EducationItem: React.FC<{ edu: CVEducation }> = ({ edu }) => (
  <div className="mb-3">
    <div className="flex justify-between items-baseline">
      <span className="font-bold text-sm text-gray-900 dark:text-gray-100 print:text-black">{edu.degree}</span>
      <span className="text-xs text-gray-600 dark:text-gray-400 shrink-0 ml-2 print:text-black">{edu.period}</span>
    </div>
    <div className="text-sm text-gray-700 dark:text-gray-300 print:text-black">
      {edu.institution} · {edu.location}
    </div>
  </div>
);

const CertItem: React.FC<{ cert: CVCertification }> = ({ cert }) => (
  <div className="mb-1.5 flex justify-between items-baseline">
    <span className="text-sm text-gray-900 dark:text-gray-100 print:text-black">
      <span className="font-semibold">{cert.name}</span>
      <span className="text-gray-600 dark:text-gray-400 print:text-black"> · {cert.issuer}</span>
    </span>
    <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 ml-2 print:text-black">{cert.date}</span>
  </div>
);

const SkillRow: React.FC<{ skill: CVSkillCategory }> = ({ skill }) => (
  <div className="mb-1 text-xs text-gray-800 dark:text-gray-200 print:text-black">
    <span className="font-semibold">{skill.category}: </span>
    {skill.items.join(', ')}
  </div>
);

export const CV: React.FC = () => {
  const { config, loading, error } = useConfig();

  if (loading) return <Loading />;
  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <p className="text-red-600">Error loading CV data.</p>
      </div>
    );
  }

  const cv = config.cv;
  const { personal, skills, experience, education, certifications, achievements } = cv;
  const years = getYearsOfExperience(cv.start_year);
  const summary = interpolateDescription(cv.summary, years);

  return (
    <>
      <style>{`
        @media print {
          @page { margin: 0.45in; size: A4; }
          .no-print { display: none !important; }
          body { background: white !important; }
          #cv-sheet {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
            background: white !important;
            color: #000 !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 10.5pt !important;
            line-height: 1.4 !important;
          }
          #cv-sheet * { color: #000 !important; background: transparent !important; }
        }
      `}</style>

      <div className="no-print flex justify-end max-w-3xl mx-auto px-6 pt-20 pb-4">
        <button
          onClick={() => window.print()}
          className="btn-ghost text-sm px-4 py-2"
        >
          Download PDF
        </button>
      </div>

      <div className="min-h-screen bg-stone-100 dark:bg-stone-900 pb-16 print:bg-white print:pb-0">
        <div
          id="cv-sheet"
          className="max-w-3xl mx-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-10 py-10 print:shadow-none print:bg-white print:border-0"
        >
          <div className="text-center border-b-2 border-gray-900 dark:border-gray-300 pb-4 mb-6 print:border-black">
            <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 print:text-black">
              {personal.name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 print:text-black">{personal.title}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 print:text-black">
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
              {' · '}
              <a href={`tel:${personal.phone}`} className="hover:underline">{personal.phone}</a>
              {' · '}
              {personal.location}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 print:text-black">
              <a href={personal.linkedin_url} className="hover:underline">{personal.linkedin}</a>
              {' · '}
              <a href={personal.github_url} className="hover:underline">{personal.github}</a>
              {' · '}
              <a href={personal.website_url} className="hover:underline">{personal.website}</a>
            </p>
          </div>

          <div className="mb-5">
            <SectionTitle>Professional Summary</SectionTitle>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed text-justify print:text-black">
              {summary}
            </p>
          </div>

          <div className="mb-5">
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="grid grid-cols-1 gap-0.5">
              {skills.map((s, i) => <SkillRow key={i} skill={s} />)}
            </div>
          </div>

          <div className="mb-5">
            <SectionTitle>Professional Experience</SectionTitle>
            {experience.map((exp, i) => <ExperienceItem key={i} exp={exp} />)}
          </div>

          <div className="mb-5">
            <SectionTitle>Education</SectionTitle>
            {education.map((edu, i) => <EducationItem key={i} edu={edu} />)}
          </div>

          <div className="mb-5">
            <SectionTitle>Certifications</SectionTitle>
            {certifications.map((cert, i) => <CertItem key={i} cert={cert} />)}
          </div>

          <div>
            <SectionTitle>Key Achievements</SectionTitle>
            <ul className="list-disc list-outside ml-4 space-y-0.5">
              {achievements.map((a, i) => (
                <li key={i} className="text-xs text-gray-700 dark:text-gray-300 print:text-black">{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
