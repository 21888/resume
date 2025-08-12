/**
 * Data Loading Utilities
 * Utilities for loading, transforming, and managing project achievement data
 */

import { ProjectAchievement } from '../types';
import { validateProjectAchievement, validateProjectList } from './validation';
import { CardError, DataLoadError, ValidationError as CardValidationError } from '../types/error';

// Data loading configuration
export interface DataLoaderConfig {
  validateOnLoad: boolean;
  throwOnValidationError: boolean;
  enableCaching: boolean;
  cacheTimeout: number; // milliseconds
  retryAttempts: number;
  retryDelay: number; // milliseconds
  fallbackData?: ProjectAchievement[];
}

// Default configuration
export const DEFAULT_DATA_LOADER_CONFIG: DataLoaderConfig = {
  validateOnLoad: true,
  throwOnValidationError: false,
  enableCaching: true,
  cacheTimeout: 300000, // 5 minutes
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  fallbackData: [],
};

// Cache interface
interface CacheEntry {
  data: ProjectAchievement[];
  timestamp: number;
  source: string;
}

// Simple in-memory cache
class DataCache {
  private cache = new Map<string, CacheEntry>();
  private timeout: number;

  constructor(timeout: number = 300000) {
    this.timeout = timeout;
  }

  get(key: string): ProjectAchievement[] | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > this.timeout) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set(key: string, data: ProjectAchievement[], source: string): void {
    this.cache.set(key, {
      data: [...data], // Create a copy to avoid mutations
      timestamp: Date.now(),
      source,
    });
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.cache.has(key) && this.get(key) !== null;
  }
}

// Global cache instance
const dataCache = new DataCache();

// Data loader class
export class ProjectDataLoader {
  private config: DataLoaderConfig;

  constructor(config: Partial<DataLoaderConfig> = {}) {
    this.config = { ...DEFAULT_DATA_LOADER_CONFIG, ...config };
  }

  /**
   * Load projects from a JSON file
   */
  async loadFromFile(filePath: string): Promise<ProjectAchievement[]> {
    const cacheKey = `file:${filePath}`;
    
    // Check cache first
    if (this.config.enableCaching) {
      const cached = dataCache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw this.createDataLoadError(
          'DATA_LOAD_FAILED',
          `Failed to load data from ${filePath}: ${response.status} ${response.statusText}`,
          'file',
          filePath,
          response.status
        );
      }

      const rawData = await response.json();
      const projects = await this.processRawData(rawData, 'file');

      // Cache the results
      if (this.config.enableCaching) {
        dataCache.set(cacheKey, projects, 'file');
      }

      return projects;
    } catch (error) {
      return this.handleLoadError(error as Error, 'file', filePath);
    }
  }

  /**
   * Load projects from an API endpoint
   */
  async loadFromAPI(endpoint: string, options: RequestInit = {}): Promise<ProjectAchievement[]> {
    const cacheKey = `api:${endpoint}`;
    
    // Check cache first
    if (this.config.enableCaching) {
      const cached = dataCache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < this.config.retryAttempts; attempt++) {
      try {
        const response = await fetch(endpoint, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw this.createDataLoadError(
            'DATA_LOAD_FAILED',
            `API request failed: ${response.status} ${response.statusText}`,
            'api',
            endpoint,
            response.status,
            await response.text()
          );
        }

        const rawData = await response.json();
        const projects = await this.processRawData(rawData, 'api');

        // Cache the results
        if (this.config.enableCaching) {
          dataCache.set(cacheKey, projects, 'api');
        }

        return projects;
      } catch (error) {
        lastError = error as Error;
        
        // If this is the last attempt, handle the error
        if (attempt === this.config.retryAttempts - 1) {
          return this.handleLoadError(lastError, 'api', endpoint);
        }
        
        // Wait before retrying
        await this.delay(this.config.retryDelay * (attempt + 1));
      }
    }

    // This should never be reached, but just in case
    return this.handleLoadError(lastError || new Error('Unknown error'), 'api', endpoint);
  }

  /**
   * Load projects from localStorage
   */
  loadFromLocalStorage(key: string): ProjectAchievement[] {
    const cacheKey = `localStorage:${key}`;
    
    // Check cache first
    if (this.config.enableCaching) {
      const cached = dataCache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const rawData = localStorage.getItem(key);
      if (!rawData) {
        throw this.createDataLoadError(
          'DATA_LOAD_FAILED',
          `No data found in localStorage for key: ${key}`,
          'localStorage'
        );
      }

      const parsedData = JSON.parse(rawData);
      const projects = this.processRawDataSync(parsedData, 'localStorage');

      // Cache the results
      if (this.config.enableCaching) {
        dataCache.set(cacheKey, projects, 'localStorage');
      }

      return projects;
    } catch (error) {
      if (this.config.fallbackData && this.config.fallbackData.length > 0) {
        console.warn('Failed to load from localStorage, using fallback data:', error);
        return this.config.fallbackData;
      }
      
      if (this.config.throwOnValidationError) {
        throw error;
      }
      
      console.error('Failed to load from localStorage:', error);
      return [];
    }
  }

  /**
   * Save projects to localStorage
   */
  saveToLocalStorage(key: string, projects: ProjectAchievement[]): void {
    try {
      const serialized = JSON.stringify(projects, null, 2);
      localStorage.setItem(key, serialized);
      
      // Update cache
      if (this.config.enableCaching) {
        dataCache.set(`localStorage:${key}`, projects, 'localStorage');
      }
    } catch (error) {
      throw this.createDataLoadError(
        'DATA_LOAD_FAILED',
        `Failed to save to localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'localStorage'
      );
    }
  }

  /**
   * Process raw data and validate if configured
   */
  private async processRawData(rawData: any, source: string): Promise<ProjectAchievement[]> {
    return this.processRawDataSync(rawData, source);
  }

  private processRawDataSync(rawData: any, source: string): ProjectAchievement[] {
    // Ensure we have an array
    const dataArray = Array.isArray(rawData) ? rawData : [rawData];
    
    // Validate if configured
    if (this.config.validateOnLoad) {
      const validationResult = validateProjectList(dataArray);
      
      if (!validationResult.isValid) {
        const error = this.createValidationError(validationResult.errors, source);
        
        if (this.config.throwOnValidationError) {
          throw error;
        } else {
          console.warn('Data validation failed:', validationResult);
          // Continue with potentially invalid data
        }
      }
      
      if (validationResult.warnings.length > 0) {
        console.warn('Data validation warnings:', validationResult.warnings);
      }
    }

    // Transform data to ensure proper types
    return dataArray.map(this.transformProjectData);
  }

  /**
   * Transform raw project data to ensure proper types
   */
  private transformProjectData(rawProject: any): ProjectAchievement {
    return {
      ...rawProject,
      // Ensure dates are Date objects
      createdAt: new Date(rawProject.createdAt),
      updatedAt: new Date(rawProject.updatedAt),
      timeline: {
        ...rawProject.timeline,
        startDate: new Date(rawProject.timeline.startDate),
        endDate: rawProject.timeline.endDate ? new Date(rawProject.timeline.endDate) : undefined,
        estimatedCompletion: rawProject.timeline.estimatedCompletion 
          ? new Date(rawProject.timeline.estimatedCompletion) 
          : undefined,
        milestones: rawProject.timeline.milestones?.map((milestone: any) => ({
          ...milestone,
          date: new Date(milestone.date),
        })) || [],
      },
      // Ensure team members have proper date types
      team: rawProject.team.map((member: any) => ({
        ...member,
        joinDate: member.joinDate ? new Date(member.joinDate) : undefined,
        leaveDate: member.leaveDate ? new Date(member.leaveDate) : undefined,
      })),
      // Ensure arrays exist
      technologies: rawProject.technologies || [],
      links: rawProject.links || [],
      images: rawProject.images || [],
      tags: rawProject.tags || [],
    };
  }

  /**
   * Handle loading errors with fallback strategies
   */
  private handleLoadError(error: Error, source: string, endpoint?: string): ProjectAchievement[] {
    console.error(`Failed to load data from ${source}:`, error);
    
    // Try fallback data if available
    if (this.config.fallbackData && this.config.fallbackData.length > 0) {
      console.warn('Using fallback data due to load error');
      return this.config.fallbackData;
    }
    
    // If configured to throw, re-throw the error
    if (this.config.throwOnValidationError) {
      throw error;
    }
    
    // Return empty array as last resort
    return [];
  }

  /**
   * Create a standardized data load error
   */
  private createDataLoadError(
    type: 'DATA_LOAD_FAILED',
    message: string,
    source: 'api' | 'file' | 'cache' | 'localStorage',
    endpoint?: string,
    statusCode?: number,
    responseBody?: string
  ): DataLoadError {
    return {
      type,
      message,
      severity: 'high',
      recoverable: true,
      retryCount: 0,
      maxRetries: this.config.retryAttempts,
      timestamp: new Date(),
      source,
      endpoint,
      statusCode,
      responseBody,
    } as DataLoadError;
  }

  /**
   * Create a validation error from validation results
   */
  private createValidationError(errors: any[], source: string): CardValidationError {
    return {
      type: 'VALIDATION_ERROR',
      message: `Data validation failed: ${errors.length} errors found`,
      severity: 'medium',
      recoverable: true,
      retryCount: 0,
      maxRetries: 0,
      timestamp: new Date(),
      context: {
        source,
        errorCount: errors.length,
        errors: errors.slice(0, 5), // Include first 5 errors for context
      },
    } as CardValidationError;
  }

  /**
   * Utility method to add delay for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    dataCache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: dataCache['cache'].size,
      keys: Array.from(dataCache['cache'].keys()),
    };
  }
}

// Default loader instance
export const defaultDataLoader = new ProjectDataLoader();

// Convenience functions
export async function loadProjectsFromFile(filePath: string, config?: Partial<DataLoaderConfig>): Promise<ProjectAchievement[]> {
  const loader = config ? new ProjectDataLoader(config) : defaultDataLoader;
  return loader.loadFromFile(filePath);
}

export async function loadProjectsFromAPI(endpoint: string, options?: RequestInit, config?: Partial<DataLoaderConfig>): Promise<ProjectAchievement[]> {
  const loader = config ? new ProjectDataLoader(config) : defaultDataLoader;
  return loader.loadFromAPI(endpoint, options);
}

export function loadProjectsFromLocalStorage(key: string, config?: Partial<DataLoaderConfig>): ProjectAchievement[] {
  const loader = config ? new ProjectDataLoader(config) : defaultDataLoader;
  return loader.loadFromLocalStorage(key);
}

export function saveProjectsToLocalStorage(key: string, projects: ProjectAchievement[], config?: Partial<DataLoaderConfig>): void {
  const loader = config ? new ProjectDataLoader(config) : defaultDataLoader;
  loader.saveToLocalStorage(key, projects);
}

// Data transformation utilities for backward compatibility
export interface DataMigration {
  version: string;
  description: string;
  migrate: (data: any) => any;
}

export const DATA_MIGRATIONS: DataMigration[] = [
  {
    version: '1.0.0',
    description: 'Initial data structure',
    migrate: (data: any) => data, // No migration needed for initial version
  },
  {
    version: '1.1.0',
    description: 'Add timeline milestones support',
    migrate: (data: any) => {
      if (Array.isArray(data)) {
        return data.map(project => ({
          ...project,
          timeline: {
            ...project.timeline,
            milestones: project.timeline?.milestones || [],
          },
        }));
      }
      return {
        ...data,
        timeline: {
          ...data.timeline,
          milestones: data.timeline?.milestones || [],
        },
      };
    },
  },
  {
    version: '1.2.0',
    description: 'Add KPI thresholds and weights',
    migrate: (data: any) => {
      const migrateMetrics = (metrics: any) => {
        if (!metrics) return metrics;
        
        return {
          ...metrics,
          kpis: metrics.kpis?.map((kpi: any) => ({
            ...kpi,
            weight: kpi.weight || 1,
            threshold: kpi.threshold || {
              excellent: kpi.value * 1.2,
              good: kpi.value * 1.1,
              acceptable: kpi.value,
            },
          })) || [],
        };
      };

      if (Array.isArray(data)) {
        return data.map(project => ({
          ...project,
          metrics: migrateMetrics(project.metrics),
        }));
      }
      
      return {
        ...data,
        metrics: migrateMetrics(data.metrics),
      };
    },
  },
];

export function migrateData(data: any, targetVersion: string = '1.2.0'): any {
  let migratedData = data;
  
  for (const migration of DATA_MIGRATIONS) {
    migratedData = migration.migrate(migratedData);
    if (migration.version === targetVersion) {
      break;
    }
  }
  
  return migratedData;
}