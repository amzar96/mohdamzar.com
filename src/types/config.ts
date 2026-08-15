export interface Profile {
  name: string;
  pronouns: string;
  title: string;
  current_role: string;
  email: string;
  location: string;
  location_link: string;
  image: string;
  start_year: number;
  description: string;
  current_description: string;
}

export interface Social {
  github: string;
  linkedin: string;
  stackoverflow: string;
  behance: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  status: string;
  link: string;
}

export interface ContactMethod {
  icon_type: string;
  title: string;
  value: string;
  link: string;
}

export interface Contact {
  methods: ContactMethod[];
  form_action: string;
  message: string;
}

export interface Config {
  profile: Profile;
  social: Social;
  experience: Experience[];
  projects: Project[];
  contact: Contact;
  cv: CV;
}

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
