/**
 * Core Project Achievement Types
 * Comprehensive TypeScript interfaces for project achievement cards
 */

// Core project data types
export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'api' | 'infrastructure' | 'research';
export type ProjectStatus = 'completed' | 'ongoing' | 'paused' | 'cancelled';

// Metric and KPI types
export type MetricType = 'number' | 'percentage' | 'currency' | 'text';
export type TrendDirection = 'up' | 'down' | 'neutral';
export type MetricColor = 'success' | 'warning' | 'error' | 'info';

// Technology categories
export type TechnologyCategory = 'frontend' | 'backend' | 'database' | 'tool' | 'platform';

// Main project achievement interface
export interface ProjectAchievement {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  timeline: ProjectTimeline;
  metrics: ProjectMetrics;
  team: TeamMember[];
  technologies: Technology[];
  links?: ProjectLink[];
  images?: ProjectImage[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Timeline and milestone interfaces
export interface ProjectTimeline {
  startDate: Date;
  endDate?: Date;
  duration: string;
  milestones?: Milestone[];
  isOngoing: boolean;
  estimatedCompletion?: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

// Metrics and KPI interfaces
export interface ProjectMetrics {
  primary: MetricItem[];
  secondary?: MetricItem[];
  kpis: KPIItem[];
}

export interface MetricItem {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  type: MetricType;
  trend?: TrendDirection;
  icon?: string;
  color?: MetricColor;
  description?: string;
  target?: string | number;
  previousValue?: string | number;
}

export interface KPIItem extends MetricItem {
  weight: number; // Importance weight for overall project success
  threshold: {
    excellent: number;
    good: number;
    acceptable: number;
  };
}

// Team member interfaces
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  contribution?: string;
  isLead?: boolean;
  skills?: string[];
  contactInfo?: ContactInfo;
  joinDate?: Date;
  leaveDate?: Date;
}

export interface ContactInfo {
  email?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

// Technology interfaces
export interface Technology {
  id: string;
  name: string;
  category: TechnologyCategory;
  icon?: string;
  proficiency?: number; // 1-10 scale
  version?: string;
  description?: string;
  website?: string;
}

// Project links and media
export interface ProjectLink {
  id: string;
  title: string;
  url: string;
  type: 'demo' | 'repository' | 'documentation' | 'article' | 'video' | 'other';
  icon?: string;
  description?: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  type: 'screenshot' | 'diagram' | 'photo' | 'logo' | 'other';
  width?: number;
  height?: number;
  thumbnail?: string;
}