/**
 * Utility Types
 * Helper types for filtering, sorting, data transformation, and common utilities
 */

import { ProjectAchievement, ProjectCategory, ProjectStatus, TeamMember, Technology } from './project-achievement';
import { FilterOptions, SortOptions, SearchOptions } from './interaction';

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
// Avoid clashing with built-in Required<T> by using RequireKeys
export type RequireKeys<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Array and collection utilities
export type NonEmptyArray<T> = [T, ...T[]];
export type ArrayElement<T> = T extends (infer U)[] ? U : never;
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Filtering utility types
export interface FilterFunction<T> {
  (item: T, filters: FilterOptions): boolean;
}

export interface FilterPreset {
  id: string;
  name: string;
  description: string;
  filters: FilterOptions;
  icon?: string;
  isDefault?: boolean;
}

export interface FilterGroup {
  id: string;
  name: string;
  filters: FilterPreset[];
  exclusive?: boolean; // Only one filter can be active at a time
}

// Sorting utility types
export interface SortFunction<T> {
  (a: T, b: T, options: SortOptions): number;
}

export interface SortPreset {
  id: string;
  name: string;
  description: string;
  sort: SortOptions;
  icon?: string;
  isDefault?: boolean;
}

// Search utility types
export interface SearchFunction<T> {
  (items: T[], options: SearchOptions): T[];
}

export interface SearchIndex {
  [key: string]: {
    item: ProjectAchievement;
    searchableText: string;
    keywords: string[];
    weight: number;
  };
}

// Data transformation utilities
export interface DataTransformer<TInput, TOutput> {
  transform: (input: TInput) => TOutput;
  validate?: (input: TInput) => boolean;
  fallback?: TOutput;
}

export interface ProjectTransformers {
  toDisplayFormat: DataTransformer<ProjectAchievement, DisplayProject>;
  toSearchIndex: DataTransformer<ProjectAchievement, SearchIndexItem>;
  toExportFormat: DataTransformer<ProjectAchievement, ExportProject>;
  fromApiResponse: DataTransformer<ApiProjectResponse, ProjectAchievement>;
}

// Display and presentation types
export interface DisplayProject {
  id: string;
  title: string;
  shortDescription: string;
  displayCategory: string;
  statusLabel: string;
  statusColor: string;
  durationText: string;
  teamSummary: string;
  techStack: string[];
  primaryMetric?: {
    label: string;
    value: string;
    color: string;
  };
  thumbnailUrl?: string;
}

export interface SearchIndexItem {
  id: string;
  searchableText: string;
  keywords: string[];
  category: string;
  tags: string[];
  weight: number;
}

export interface ExportProject {
  title: string;
  description: string;
  category: string;
  status: string;
  startDate: string;
  endDate?: string;
  duration: string;
  team: string[];
  technologies: string[];
  metrics: Record<string, string | number>;
  links: string[];
}

// API response types
export interface ApiProjectResponse {
  id: string;
  attributes: {
    title: string;
    description: string;
    category: string;
    status: string;
    start_date: string;
    end_date?: string;
    team_members: ApiTeamMember[];
    technologies: ApiTechnology[];
    metrics: ApiMetric[];
    created_at: string;
    updated_at: string;
  };
  relationships?: {
    images: { data: ApiImage[] };
    links: { data: ApiLink[] };
  };
}

export interface ApiTeamMember {
  id: string;
  name: string;
  role: string;
  avatar_url?: string;
}

export interface ApiTechnology {
  id: string;
  name: string;
  category: string;
  icon_url?: string;
}

export interface ApiMetric {
  id: string;
  label: string;
  value: string | number;
  type: string;
  unit?: string;
}

export interface ApiImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface ApiLink {
  id: string;
  title: string;
  url: string;
  type: string;
}

// Validation utility types
export interface ValidationRule<T> {
  field: keyof T;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  value: any;
  rule: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  value: any;
  suggestion?: string;
}

// Pagination utility types
export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationConfig;
  filters?: FilterOptions;
  sort?: SortOptions;
  search?: SearchOptions;
}

// Caching utility types
export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum number of items
  strategy: 'lru' | 'fifo' | 'lfu'; // Cache eviction strategy
}

export interface CacheItem<T> {
  key: string;
  value: T;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

// Performance monitoring types
export interface PerformanceMetrics {
  renderTime: number;
  filterTime: number;
  sortTime: number;
  searchTime: number;
  memoryUsage: number;
  itemsProcessed: number;
}

export interface PerformanceBenchmark {
  operation: string;
  duration: number;
  itemCount: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Configuration and settings types
export interface UtilityConfig {
  filtering: {
    debounceDelay: number;
    caseSensitive: boolean;
    fuzzySearch: boolean;
    maxResults: number;
  };
  sorting: {
    stableSort: boolean;
    naturalSort: boolean;
    localeCompare: boolean;
  };
  caching: CacheConfig;
  performance: {
    enableMetrics: boolean;
    sampleRate: number;
    maxBenchmarks: number;
  };
}

// Event and callback types
export interface UtilityCallbacks {
  onFilterChange?: (filters: FilterOptions, results: ProjectAchievement[]) => void;
  onSortChange?: (sort: SortOptions, results: ProjectAchievement[]) => void;
  onSearchChange?: (query: string, results: ProjectAchievement[]) => void;
  onError?: (error: Error, operation: string) => void;
  onPerformanceMetric?: (metric: PerformanceBenchmark) => void;
}