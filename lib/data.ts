export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url?: string;
};

export type Skill = {
  name: string;
  category: string;
};

export const APP_NAME = "Alex Mercer";
export const APP_TAGLINE = "Creative Developer";
export const APP_EMAIL = "hello@alexmercer.dev";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const CTA_LABEL = "View My Work";
export const CTA_HREF = "#projects";