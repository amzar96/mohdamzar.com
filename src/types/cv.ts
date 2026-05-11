export interface CVPersonal {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  linkedin_url: string;
  github: string;
  github_url: string;
  website: string;
  website_url: string;
}

export interface CVSkillCategory {
  category: string;
  items: string[];
}

export interface CVExperience {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  technologies: string[];
}

export interface CVEducation {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface CVCertification {
  name: string;
  issuer: string;
  date: string;
}

export interface CV {
  start_year: number;
  personal: CVPersonal;
  summary: string;
  skills: CVSkillCategory[];
  experience: CVExperience[];
  education: CVEducation[];
  certifications: CVCertification[];
  achievements: string[];
}
