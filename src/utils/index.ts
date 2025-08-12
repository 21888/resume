/**
 * Utilities Index
 * Central export file for all utility functions
 */

// Data validation utilities
export * from './validation';

// Data loading utilities
export * from './data-loader';

// Data transformation utilities
export * from './data-transformer';

// Utility functions
export { cn } from './cn';

// Re-export commonly used functions
export {
  validateProjectAchievement,
  validateProjectList,
  formatValidationResult,
} from './validation';

export {
  ProjectDataLoader,
  defaultDataLoader,
  loadProjectsFromFile,
  loadProjectsFromAPI,
  loadProjectsFromLocalStorage,
  saveProjectsToLocalStorage,
  migrateData,
  DATA_MIGRATIONS,
} from './data-loader';

export {
  transformToDisplayFormat,
  transformToSearchIndex,
  transformToExportFormat,
  transformFromApiResponse,
  transformProjectsToDisplayFormat,
  transformProjectsToSearchIndex,
  transformProjectsToExportFormat,
  projectTransformers,
} from './data-transformer';