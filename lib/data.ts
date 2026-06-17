export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
};

export type Skill = {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "design";
};

// ─── Brand Constants ──────────────────────────────────────────────────────────
export const BRAND = {
  name: "Alex Morgan",
  tagline: "Full-Stack Developer & Designer",
  email: "hello@alexmorgan.dev",
  github: "https://github.com/alexmorgan",
  linkedin: "https://linkedin.com/in/alexmorgan",
  twitter: "https://twitter.com/alexmorgan",
  resumeUrl: "/alex-morgan-resume.pdf",
} as const;

// ─── Navigation (single source of truth) ─────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Resume", href: "/resume" },
];

// ─── Primary CTA ──────────────────────────────────────────────────────────────
export const primaryCTA = {
  label: "View My Work",
  href: "#projects",
};
