/**
 * Component-specific type definitions
 */

import { ProjectAchievement } from './project-achievement';
import { CardError } from './error';
import { FilterOptions, SortOptions } from './interaction';

// Project Achievement Cards Props
export interface ProjectAchievementCardsProps {
  projects: ProjectAchievement[];
  initialFilter?: string;
  initialSort?: string;
  gridColumns?: {
    mobile: number;
    tablet: number;
    desktop: number;
    wide: number;
    ultrawide: number;
  };
  showFilters?: boolean;
  showSort?: boolean;
  showSearch?: boolean;
  animationDelay?: number;
  className?: string;
  onProjectSelect?: (project: ProjectAchievement) => void;
  onError?: (error: CardError) => void;
}

// Achievement Card Props
export interface AchievementCardProps {
  project: ProjectAchievement;
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  showMetrics?: boolean;
  showTeam?: boolean;
  showTimeline?: boolean;
  showTechnologies?: boolean;
  isSelected?: boolean;
  isExpanded?: boolean;
  onExpand?: (expanded: boolean) => void;
  actions?: {
    onCardClick?: (project: ProjectAchievement) => void;
    onCardExpand?: (projectId: string) => void;
    onCardHover?: (project: ProjectAchievement | null) => void;
    onMetricClick?: (metric: any, project: ProjectAchievement) => void;
    onTeamMemberClick?: (member: any, project: ProjectAchievement) => void;
    onTechnologyClick?: (technology: string, project: ProjectAchievement) => void;
    onLinkClick?: (url: string, type: string) => void;
  };
  animationDelay?: number;
  className?: string;
}

// Stagger Animation Props
export interface StaggerAnimationProps {
  children: React.ReactNode;
  stagger?: {
    delayChildren?: number;
    staggerChildren?: number;
    when?: 'beforeChildren' | 'afterChildren';
  };
  className?: string;
}

// CardHeader public props (re-exported for external typing convenience)
export interface CardHeaderProps {
  project: ProjectAchievement;
  showCategory?: boolean;
  showStatus?: boolean;
  showActions?: boolean;
  className?: string;
  onTitleClick?: (project: ProjectAchievement) => void;
  onCategoryClick?: (category: ProjectAchievement['category']) => void;
  onStatusClick?: (status: ProjectAchievement['status']) => void;
}

// CardContent public props (re-exported for external typing convenience)
export interface CardContentProps {
  project: ProjectAchievement;
  maxLines?: number;
  showExpandButton?: boolean;
  showTechnologies?: boolean;
  maxTechnologies?: number;
  className?: string;
  onExpandClick?: () => void;
  onTechnologyClick?: (technology: {
    id: string;
    name: string;
    category: string;
    icon?: string;
    version?: string;
  }) => void;
}

// Card metrics props
export interface CardMetricsProps {
  metrics: ProjectAchievement['metrics'];
  layout?: 'grid' | 'horizontal' | 'vertical';
  showTrends?: boolean;
  showTooltips?: boolean;
  maxVisible?: number;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  onMetricClick?: (metric: ProjectAchievement['metrics']['primary'][number]) => void;
}

// Card team props
export interface CardTeamProps {
  team: ProjectAchievement['team'];
  layout?: 'avatars' | 'list' | 'grid' | 'compact';
  maxVisible?: number;
  showRoles?: boolean;
  showContributions?: boolean;
  avatarSize?: 'small' | 'medium' | 'large';
  className?: string;
  onMemberClick?: (member: ProjectAchievement['team'][number]) => void;
}

// Card timeline props
export interface CardTimelineProps {
  timeline: ProjectAchievement['timeline'];
  showProgress?: boolean;
  showMilestones?: boolean;
  format?: 'short' | 'long' | 'relative';
  className?: string;
  onMilestoneClick?: (milestone: NonNullable<ProjectAchievement['timeline']['milestones']>[number]) => void;
}

// Expandable section props
export interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onToggle?: (expanded: boolean) => void;
}

// Filter controls props
export interface FilterControlsProps {
  filters: FilterOptions;
  availableCategories: string[];
  availableStatuses: string[];
  availableTechnologies: string[];
  availableTags: string[];
  showPresets?: boolean;
  showClearAll?: boolean;
  className?: string;
  onChange: (filters: FilterOptions) => void;
  onReset?: () => void;
}

// Sort controls props
export interface SortControlsProps {
  sort: SortOptions;
  availableFields: { key: string; label: string; icon?: string }[];
  showDirection?: boolean;
  showPresets?: boolean;
  className?: string;
  onChange: (sort: SortOptions) => void;
}

// Search controls props
export interface SearchProps {
  query: string;
  placeholder?: string;
  showFilters?: boolean;
  showSuggestions?: boolean;
  debounceDelay?: number;
  className?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

// Avatar props used by UI Avatar
export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  fallback?: string;
  className?: string;
  onClick?: () => void;
}

// Animation wrapper props
export interface AnimationWrapperProps {
  children: React.ReactNode;
  animation: import('./animation').CardAnimationConfig;
  trigger?: 'mount' | 'scroll' | 'manual' | 'hover';
  className?: string;
  style?: React.CSSProperties;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

// Re-export some UI props for convenience
export type { CardProps, BadgeProps } from './ui';