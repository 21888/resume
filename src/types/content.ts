/**
 * Content models for resume data
 */

import { ContentVariant } from './role';

export interface PersonalInfo {
  name: string;
  title: string;
  experience: string;
  avatar: string;
  taglines: ContentVariant<string>;
  location: string;
}

export interface AboutContent {
  tagline: string;
  coreValues: string[];
  description: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  techStack: string[];
  responsibilities: ContentVariant<string[]>;
  metrics: ContentVariant<string[]>;
  description?: string;
  highlights?: ContentVariant<string[]>;
}

export interface SkillCategory {
  name: string;
  level: number; // 1-10 scale
  experience: string;
  examples: string[];
  category: 'frontend' | 'backend' | 'devops' | 'management' | 'other';
}

export interface ContactInfo {
  phone: string;
  email: string;
  wechat: string;
  github: string;
  linkedin: string;
  pdfUrl: string;
}

export interface SalaryInfo {
  location: string;
  range: string;
  negotiable: boolean;
  benefits: ContentVariant<string[]>;
  notes?: ContentVariant<string>;
}

export interface ResumeContent {
  personal: PersonalInfo;
  about: ContentVariant<AboutContent>;
  experience: ExperienceItem[];
  skills: SkillCategory[];
  contact: ContactInfo;
  salary: SalaryInfo;
}

export interface HeroSectionProps {
  role: 'hr' | 'boss';
  personal: PersonalInfo;
}

export interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  role: 'hr' | 'boss';
}

export interface SkillsRadarProps {
  skills: SkillCategory[];
  interactive?: boolean;
  showDetails?: boolean;
}