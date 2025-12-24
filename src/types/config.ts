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

export interface TechLogo {
  src: string;
  alt: string;
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
  tech_logos: Record<string, TechLogo>;
  contact: Contact;
}
