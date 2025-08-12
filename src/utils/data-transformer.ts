/**
 * Data Transformation Utilities
 * Utilities for transforming project data between different formats
 */

import { 
  ProjectAchievement, 
  DisplayProject, 
  SearchIndexItem, 
  ExportProject,
  ApiProjectResponse,
  ProjectTransformers 
} from '../types';

/**
 * Transform project to display format for UI components
 */
export function transformToDisplayFormat(project: ProjectAchievement): DisplayProject {
  // Get primary metric for display
  const primaryMetric = project.metrics.primary[0];
  
  // Create team summary
  const teamSummary = project.team.length === 1 
    ? project.team[0].name
    : `${project.team.length} team members`;
  
  // Get top technologies
  const techStack = project.technologies
    .slice(0, 5)
    .map((tech: { name: string }) => tech.name);
  
  // Format duration
  const durationText = formatDuration(project.timeline);
  
  // Get status color
  const statusColor = getStatusColor(project.status);
  
  // Create short description
  const shortDescription = project.description.length > 150 
    ? project.description.substring(0, 147) + '...'
    : project.description;

  return {
    id: project.id,
    title: project.title,
    shortDescription,
    displayCategory: formatCategory(project.category),
    statusLabel: formatStatus(project.status),
    statusColor,
    durationText,
    teamSummary,
    techStack,
    primaryMetric: primaryMetric ? {
      label: primaryMetric.label,
      value: formatMetricValue(primaryMetric.value, primaryMetric.type, primaryMetric.unit),
      color: primaryMetric.color || 'info',
    } : undefined,
    thumbnailUrl: project.images?.[0]?.thumbnail || project.images?.[0]?.url,
  };
}

/**
 * Transform project to search index format
 */
export function transformToSearchIndex(project: ProjectAchievement): SearchIndexItem {
  // Create searchable text from all relevant fields
  const searchableFields = [
    project.title,
    project.description,
    project.category,
    project.status,
    ...project.tags,
    ...project.technologies.map(tech => tech.name),
    ...project.team.map(member => `${member.name} ${member.role}`),
  ];
  
  const searchableText = searchableFields
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  
  // Create keywords for better search matching
  const keywords = [
    ...project.tags.map((tag: string) => tag.toLowerCase()),
    ...project.technologies.map((tech: { name: string }) => tech.name.toLowerCase()),
    (project.category as unknown as string).toLowerCase(),
    (project.status as unknown as string).toLowerCase(),
    ...project.team.map((member: { role: string }) => member.role.toLowerCase()),
  ];
  
  // Calculate weight based on project importance
  const weight = calculateProjectWeight(project);
  
  return {
    id: project.id,
    searchableText,
    keywords: [...new Set(keywords)], // Remove duplicates
    category: project.category,
    tags: project.tags,
    weight,
  };
}

/**
 * Transform project to export format
 */
export function transformToExportFormat(project: ProjectAchievement): ExportProject {
  // Format dates
  const startDate = project.timeline.startDate.toISOString().split('T')[0];
  const endDate = project.timeline.endDate?.toISOString().split('T')[0];
  
  // Extract team member names
  const team = project.team.map((member: { name: string; role: string }) => `${member.name} (${member.role})`);
  
  // Extract technology names
  const technologies = project.technologies.map((tech: { name: string }) => tech.name);
  
  // Format metrics as key-value pairs
  const metrics: Record<string, string | number> = {};
  project.metrics.primary.forEach((metric: { label: string; value: any; type: string; unit?: string }) => {
    metrics[metric.label] = formatMetricValue(metric.value, metric.type, metric.unit);
  });
  project.metrics.secondary?.forEach((metric: { label: string; value: any; type: string; unit?: string }) => {
    metrics[metric.label] = formatMetricValue(metric.value, metric.type, metric.unit);
  });
  
  // Extract links
  const links = project.links?.map((link: { title: string; url: string }) => `${link.title}: ${link.url}`) || [];
  
  return {
    title: project.title,
    description: project.description,
    category: project.category,
    status: project.status,
    startDate,
    endDate,
    duration: project.timeline.duration,
    team,
    technologies,
    metrics,
    links,
  };
}

/**
 * Transform API response to project format
 */
export function transformFromApiResponse(apiResponse: ApiProjectResponse): ProjectAchievement {
  const attrs = apiResponse.attributes;
  
  return {
    id: apiResponse.id,
    title: attrs.title,
    description: attrs.description,
    category: attrs.category as any,
    status: attrs.status as any,
    timeline: {
      startDate: new Date(attrs.start_date),
      endDate: attrs.end_date ? new Date(attrs.end_date) : undefined,
      duration: calculateDuration(new Date(attrs.start_date), attrs.end_date ? new Date(attrs.end_date) : undefined),
      isOngoing: !attrs.end_date,
      milestones: [], // Would need to be populated from separate API call
    },
    metrics: {
      primary: attrs.metrics?.map(transformApiMetric) || [],
      secondary: [],
      kpis: [],
    },
    team: attrs.team_members?.map(transformApiTeamMember) || [],
    technologies: attrs.technologies?.map(transformApiTechnology) || [],
    links: apiResponse.relationships?.links?.data?.map(transformApiLink) || [],
    images: apiResponse.relationships?.images?.data?.map(transformApiImage) || [],
    tags: [], // Would need to be included in API response
    createdAt: new Date(attrs.created_at),
    updatedAt: new Date(attrs.updated_at),
  };
}

// Helper functions for API transformation
function transformApiMetric(apiMetric: any): any {
  return {
    id: apiMetric.id,
    label: apiMetric.label,
    value: apiMetric.value,
    type: apiMetric.type,
    unit: apiMetric.unit,
  };
}

function transformApiTeamMember(apiMember: any): any {
  return {
    id: apiMember.id,
    name: apiMember.name,
    role: apiMember.role,
    avatar: apiMember.avatar_url,
  };
}

function transformApiTechnology(apiTech: any): any {
  return {
    id: apiTech.id,
    name: apiTech.name,
    category: apiTech.category,
    icon: apiTech.icon_url,
  };
}

function transformApiLink(apiLink: any): any {
  return {
    id: apiLink.id,
    title: apiLink.title,
    url: apiLink.url,
    type: apiLink.type,
  };
}

function transformApiImage(apiImage: any): any {
  return {
    id: apiImage.id,
    url: apiImage.url,
    alt: apiImage.alt,
    caption: apiImage.caption,
    type: 'screenshot', // Default type
  };
}

// Utility functions
function formatDuration(timeline: ProjectAchievement['timeline']): string {
  if (timeline.isOngoing) {
    const now = new Date();
    const monthsDiff = (now.getFullYear() - timeline.startDate.getFullYear()) * 12 + 
                      (now.getMonth() - timeline.startDate.getMonth());
    
    if (monthsDiff < 1) {
      const daysDiff = Math.floor((now.getTime() - timeline.startDate.getTime()) / (1000 * 60 * 60 * 24));
      return `${daysDiff} days (ongoing)`;
    } else if (monthsDiff < 12) {
      return `${monthsDiff} months (ongoing)`;
    } else {
      const yearsDiff = Math.floor(monthsDiff / 12);
      const remainingMonths = monthsDiff % 12;
      return remainingMonths > 0 
        ? `${yearsDiff}y ${remainingMonths}m (ongoing)`
        : `${yearsDiff} years (ongoing)`;
    }
  }
  
  return timeline.duration;
}

function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    web: 'Web Application',
    mobile: 'Mobile App',
    desktop: 'Desktop Application',
    api: 'API/Backend',
    infrastructure: 'Infrastructure',
    research: 'Research Project',
  };
  
  return categoryMap[category] || category;
}

function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    completed: 'Completed',
    ongoing: 'In Progress',
    paused: 'Paused',
    cancelled: 'Cancelled',
  };
  
  return statusMap[status] || status;
}

function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    completed: 'success',
    ongoing: 'info',
    paused: 'warning',
    cancelled: 'error',
  };
  
  return colorMap[status] || 'info';
}

function formatMetricValue(value: string | number, type: string, unit?: string): string {
  if (typeof value === 'string') {
    return value;
  }
  
  switch (type) {
    case 'percentage':
      return `${value}%`;
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    case 'number':
      const formatted = new Intl.NumberFormat('en-US').format(value);
      return unit ? `${formatted} ${unit}` : formatted;
    default:
      return unit ? `${value} ${unit}` : String(value);
  }
}

function calculateProjectWeight(project: ProjectAchievement): number {
  let weight = 1;
  
  // Boost weight for completed projects
  if (project.status === 'completed') weight += 0.2;
  
  // Boost weight for projects with more team members
  weight += Math.min(project.team.length * 0.1, 0.5);
  
  // Boost weight for projects with more technologies
  weight += Math.min(project.technologies.length * 0.05, 0.3);
  
  // Boost weight for projects with metrics
  if (project.metrics.primary.length > 0) weight += 0.2;
  if (project.metrics.kpis.length > 0) weight += 0.3;
  
  // Boost weight for recent projects
  const monthsOld = (Date.now() - project.updatedAt.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (monthsOld < 6) weight += 0.2;
  else if (monthsOld < 12) weight += 0.1;
  
  return Math.min(weight, 3); // Cap at 3x weight
}

function calculateDuration(startDate: Date, endDate?: Date): string {
  const end = endDate || new Date();
  const diffTime = Math.abs(end.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (remainingMonths > 0) {
      return `${years}y ${remainingMonths}m`;
    }
    return `${years} year${years > 1 ? 's' : ''}`;
  }
}

// Create transformer object
export const projectTransformers: ProjectTransformers = {
  toDisplayFormat: {
    transform: transformToDisplayFormat,
    validate: (input: ProjectAchievement) => Boolean(input.id && input.title),
    fallback: {
      id: '',
      title: 'Unknown Project',
      shortDescription: 'No description available',
      displayCategory: 'Unknown',
      statusLabel: 'Unknown',
      statusColor: 'info',
      durationText: 'Unknown duration',
      teamSummary: 'No team information',
      techStack: [],
    },
  },
  toSearchIndex: {
    transform: transformToSearchIndex,
    validate: (input: ProjectAchievement) => Boolean(input.id && input.title),
    fallback: {
      id: '',
      searchableText: '',
      keywords: [],
      category: '',
      tags: [],
      weight: 1,
    },
  },
  toExportFormat: {
    transform: transformToExportFormat,
    validate: (input: ProjectAchievement) => Boolean(input.id && input.title),
    fallback: {
      title: 'Unknown Project',
      description: 'No description available',
      category: 'unknown',
      status: 'unknown',
      startDate: new Date().toISOString().split('T')[0],
      duration: 'Unknown',
      team: [],
      technologies: [],
      metrics: {},
      links: [],
    },
  },
  fromApiResponse: {
    transform: transformFromApiResponse,
    validate: (input: ApiProjectResponse) => Boolean(input.id && input.attributes),
    fallback: {
      id: '',
      title: 'Unknown Project',
      description: 'No description available',
      category: 'web' as any,
      status: 'completed' as any,
      timeline: {
        startDate: new Date(),
        duration: 'Unknown',
        isOngoing: false,
        milestones: [],
      },
      metrics: {
        primary: [],
        kpis: [],
      },
      team: [],
      technologies: [],
      links: [],
      images: [],
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};

// Batch transformation utilities
export function transformProjectsToDisplayFormat(projects: ProjectAchievement[]): DisplayProject[] {
  return projects.map(project => {
    try {
      return transformToDisplayFormat(project);
    } catch (error) {
      console.error('Failed to transform project to display format:', error);
      return projectTransformers.toDisplayFormat.fallback!;
    }
  });
}

export function transformProjectsToSearchIndex(projects: ProjectAchievement[]): SearchIndexItem[] {
  return projects.map(project => {
    try {
      return transformToSearchIndex(project);
    } catch (error) {
      console.error('Failed to transform project to search index:', error);
      return projectTransformers.toSearchIndex.fallback!;
    }
  });
}

export function transformProjectsToExportFormat(projects: ProjectAchievement[]): ExportProject[] {
  return projects.map(project => {
    try {
      return transformToExportFormat(project);
    } catch (error) {
      console.error('Failed to transform project to export format:', error);
      return projectTransformers.toExportFormat.fallback!;
    }
  });
}