export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
  featured?: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  tagline: string;
  avatar?: string;
  bio?: string;
  socialLinks: SocialLink[];
}

export interface Experience {
  id: string;
  title: string;
  period: string;
  description: string;
}
