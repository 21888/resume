/**
 * Interaction State Types
 * TypeScript interfaces for card interactions, state management, and user interactions
 */

import { ProjectAchievement, MetricItem, TeamMember } from './project-achievement';
import { CardError } from './error';

// Card interaction states
export interface CardInteractionState {
  hoveredCard: string | null;
  selectedCard: string | null;
  expandedCards: Set<string>;
  filterState: FilterOptions;
  sortState: SortOptions;
  viewMode: ViewMode;
  detailModalOpen: boolean;
  detailModalProject: ProjectAchievement | null;
  searchQuery: string;
  isLoading: boolean;
  error: CardError | null;
}

// View and layout types
export type ViewMode = 'grid' | 'list' | 'masonry' | 'timeline';
export type CardVariant = 'default' | 'compact' | 'detailed' | 'minimal';
export type CardSize = 'small' | 'medium' | 'large';

// Filtering and sorting interfaces
export interface FilterOptions {
  category?: string[];
  status?: string[];
  technologies?: string[];
  teamSize?: [number, number];
  dateRange?: [Date, Date];
  tags?: string[];
  hasMetrics?: boolean;
  hasTeam?: boolean;
}

export interface SortOptions {
  field: SortField;
  direction: SortDirection;
  secondary?: {
    field: SortField;
    direction: SortDirection;
  };
}

export type SortField = 
  | 'title' 
  | 'startDate' 
  | 'endDate' 
  | 'duration' 
  | 'teamSize' 
  | 'category' 
  | 'status'
  | 'updatedAt'
  | 'createdAt';

export type SortDirection = 'asc' | 'desc';

// Search and query interfaces
export interface SearchOptions {
  query: string;
  fields: SearchField[];
  fuzzy: boolean;
  caseSensitive: boolean;
  minScore?: number;
}

export type SearchField = 
  | 'title' 
  | 'description' 
  | 'tags' 
  | 'technologies' 
  | 'teamMembers' 
  | 'category';

export interface SearchResult {
  project: ProjectAchievement;
  score: number;
  matches: SearchMatch[];
}

export interface SearchMatch {
  field: SearchField;
  value: string;
  indices: [number, number][];
}

// Card action interfaces
export interface CardActions {
  onCardClick?: (project: ProjectAchievement) => void;
  onCardHover?: (project: ProjectAchievement | null) => void;
  onCardExpand?: (projectId: string) => void;
  onCardCollapse?: (projectId: string) => void;
  onMetricClick?: (metric: MetricItem, project: ProjectAchievement) => void;
  onTeamMemberClick?: (member: TeamMember, project: ProjectAchievement) => void;
  onTechnologyClick?: (technology: string, project: ProjectAchievement) => void;
  onLinkClick?: (url: string, type: string) => void;
  onImageClick?: (imageUrl: string, project: ProjectAchievement) => void;
}

// Modal and detail view interfaces
export interface DetailModalState {
  isOpen: boolean;
  project: ProjectAchievement | null;
  activeTab: DetailTab;
  scrollPosition: number;
  previousFocus: HTMLElement | null;
}

export type DetailTab = 
  | 'overview' 
  | 'metrics' 
  | 'team' 
  | 'timeline' 
  | 'technologies' 
  | 'gallery';

// Keyboard navigation interfaces
export interface KeyboardNavigationState {
  focusedCardIndex: number;
  focusedElement: FocusableElement | null;
  navigationMode: NavigationMode;
  shortcuts: KeyboardShortcuts;
}

export type NavigationMode = 'grid' | 'linear' | 'modal';

export type FocusableElement = 
  | 'card' 
  | 'metric' 
  | 'team-member' 
  | 'technology' 
  | 'link' 
  | 'expand-button'
  | 'close-button';

export interface KeyboardShortcuts {
  [key: string]: () => void;
}

// Accessibility interfaces
export interface AccessibilityState {
  announcements: string[];
  focusVisible: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  screenReaderMode: boolean;
  keyboardNavigation: boolean;
}

export interface AriaLabels {
  card: (project: ProjectAchievement) => string;
  metric: (metric: MetricItem) => string;
  teamMember: (member: TeamMember) => string;
  expandButton: (isExpanded: boolean) => string;
  closeButton: string;
  filterButton: string;
  sortButton: string;
  searchInput: string;
}

// Touch and gesture interfaces (for mobile)
export interface TouchInteractionState {
  activeTouch: string | null;
  swipeDirection: SwipeDirection | null;
  pinchScale: number;
  longPressActive: boolean;
  touchStartTime: number;
}

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

export interface GestureConfig {
  swipeThreshold: number;
  longPressDelay: number;
  pinchSensitivity: number;
  tapTimeout: number;
}

// Performance monitoring for interactions
export interface InteractionPerformanceMetrics {
  responseTime: number;
  renderTime: number;
  memoryUsage: number;
  eventHandlerLatency: number;
  scrollPerformance: number;
}