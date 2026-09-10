import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  description: string;
  capabilities: string[];
}

export interface Project {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  mediaType: "image" | "video";
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  initials: string;
}

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}
