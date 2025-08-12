/**
 * Data Validation Utilities
 * Comprehensive validation functions for project achievement data
 */

import { ProjectAchievement, ProjectCategory, ProjectStatus, MetricType, TechnologyCategory } from '../types';
import { ValidationResult, ValidationError, ValidationWarning, ValidationRule } from '../types/utility';

// Validation error messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  INVALID_TYPE: (field: string, expected: string) => `${field} must be of type ${expected}`,
  INVALID_FORMAT: (field: string, format: string) => `${field} must be in ${format} format`,
  INVALID_LENGTH: (field: string, min?: number, max?: number) => {
    if (min && max) return `${field} must be between ${min} and ${max} characters`;
    if (min) return `${field} must be at least ${min} characters`;
    if (max) return `${field} must be no more than ${max} characters`;
    return `${field} has invalid length`;
  },
  INVALID_RANGE: (field: string, min?: number, max?: number) => {
    if (min && max) return `${field} must be between ${min} and ${max}`;
    if (min) return `${field} must be at least ${min}`;
    if (max) return `${field} must be no more than ${max}`;
    return `${field} is out of range`;
  },
  INVALID_ENUM: (field: string, values: string[]) => `${field} must be one of: ${values.join(', ')}`,
  INVALID_DATE: (field: string) => `${field} must be a valid date`,
  INVALID_URL: (field: string) => `${field} must be a valid URL`,
  INVALID_EMAIL: (field: string) => `${field} must be a valid email address`,
  MISSING_DEPENDENCY: (field: string, dependency: string) => `${field} requires ${dependency} to be present`,
  LOGICAL_ERROR: (message: string) => message,
};

// Validation rules for project achievement
const PROJECT_VALIDATION_RULES: ValidationRule<ProjectAchievement>[] = [
  {
    field: 'id',
    required: true,
    type: 'string',
    minLength: 1,
    pattern: /^[a-zA-Z0-9-_]+$/,
  },
  {
    field: 'title',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 100,
  },
  {
    field: 'description',
    required: true,
    type: 'string',
    minLength: 10,
    maxLength: 1000,
  },
  {
    field: 'category',
    required: true,
    type: 'string',
  },
  {
    field: 'status',
    required: true,
    type: 'string',
  },
  {
    field: 'tags',
    required: true,
    type: 'array',
  },
];

// Main validation function
export function validateProjectAchievement(project: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Basic structure validation
  if (!project || typeof project !== 'object') {
    errors.push({
      field: 'root',
      message: 'Project data must be an object',
      value: project,
      rule: 'type',
    });
    return { isValid: false, errors, warnings };
  }

  // Validate required fields
  validateRequiredFields(project, errors);
  
  // Validate field types and formats
  validateFieldTypes(project, errors, warnings);
  
  // Validate enums
  validateEnums(project, errors);
  
  // Validate dates
  validateDates(project, errors, warnings);
  
  // Validate arrays
  validateArrays(project, errors, warnings);
  
  // Validate nested objects
  validateNestedObjects(project, errors, warnings);
  
  // Validate logical consistency
  validateLogicalConsistency(project, errors, warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

function validateRequiredFields(project: any, errors: ValidationError[]): void {
  const requiredFields = ['id', 'title', 'description', 'category', 'status', 'timeline', 'metrics', 'team', 'technologies', 'tags', 'createdAt', 'updatedAt'];
  
  for (const field of requiredFields) {
    if (!(field in project) || project[field] === null || project[field] === undefined) {
      errors.push({
        field,
        message: VALIDATION_MESSAGES.REQUIRED_FIELD(field),
        value: project[field],
        rule: 'required',
      });
    }
  }
}

function validateFieldTypes(project: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
  // String fields
  const stringFields = ['id', 'title', 'description', 'category', 'status'];
  for (const field of stringFields) {
    if (project[field] !== undefined && typeof project[field] !== 'string') {
      errors.push({
        field,
        message: VALIDATION_MESSAGES.INVALID_TYPE(field, 'string'),
        value: project[field],
        rule: 'type',
      });
    }
  }

  // Array fields
  const arrayFields = ['team', 'technologies', 'tags'];
  for (const field of arrayFields) {
    if (project[field] !== undefined && !Array.isArray(project[field])) {
      errors.push({
        field,
        message: VALIDATION_MESSAGES.INVALID_TYPE(field, 'array'),
        value: project[field],
        rule: 'type',
      });
    }
  }

  // String length validation
  if (project.id && typeof project.id === 'string') {
    if (project.id.length === 0) {
      errors.push({
        field: 'id',
        message: VALIDATION_MESSAGES.INVALID_LENGTH('id', 1),
        value: project.id,
        rule: 'minLength',
      });
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(project.id)) {
      errors.push({
        field: 'id',
        message: 'id can only contain letters, numbers, hyphens, and underscores',
        value: project.id,
        rule: 'pattern',
      });
    }
  }

  if (project.title && typeof project.title === 'string') {
    if (project.title.length === 0) {
      errors.push({
        field: 'title',
        message: VALIDATION_MESSAGES.INVALID_LENGTH('title', 1),
        value: project.title,
        rule: 'minLength',
      });
    }
    if (project.title.length > 100) {
      errors.push({
        field: 'title',
        message: VALIDATION_MESSAGES.INVALID_LENGTH('title', undefined, 100),
        value: project.title,
        rule: 'maxLength',
      });
    }
  }

  if (project.description && typeof project.description === 'string') {
    if (project.description.length < 10) {
      errors.push({
        field: 'description',
        message: VALIDATION_MESSAGES.INVALID_LENGTH('description', 10),
        value: project.description,
        rule: 'minLength',
      });
    }
    if (project.description.length > 1000) {
      errors.push({
        field: 'description',
        message: VALIDATION_MESSAGES.INVALID_LENGTH('description', undefined, 1000),
        value: project.description,
        rule: 'maxLength',
      });
    }
  }
}

function validateEnums(project: any, errors: ValidationError[]): void {
  const validCategories: ProjectCategory[] = ['web', 'mobile', 'desktop', 'api', 'infrastructure', 'research'];
  const validStatuses: ProjectStatus[] = ['completed', 'ongoing', 'paused', 'cancelled'];

  if (project.category && !validCategories.includes(project.category)) {
    errors.push({
      field: 'category',
      message: VALIDATION_MESSAGES.INVALID_ENUM('category', validCategories),
      value: project.category,
      rule: 'enum',
    });
  }

  if (project.status && !validStatuses.includes(project.status)) {
    errors.push({
      field: 'status',
      message: VALIDATION_MESSAGES.INVALID_ENUM('status', validStatuses),
      value: project.status,
      rule: 'enum',
    });
  }
}

function validateDates(project: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
  const dateFields = ['createdAt', 'updatedAt'];
  
  for (const field of dateFields) {
    if (project[field]) {
      const date = new Date(project[field]);
      if (isNaN(date.getTime())) {
        errors.push({
          field,
          message: VALIDATION_MESSAGES.INVALID_DATE(field),
          value: project[field],
          rule: 'date',
        });
      }
    }
  }

  // Timeline date validation
  if (project.timeline) {
    if (project.timeline.startDate) {
      const startDate = new Date(project.timeline.startDate);
      if (isNaN(startDate.getTime())) {
        errors.push({
          field: 'timeline.startDate',
          message: VALIDATION_MESSAGES.INVALID_DATE('timeline.startDate'),
          value: project.timeline.startDate,
          rule: 'date',
        });
      }
    }

    if (project.timeline.endDate) {
      const endDate = new Date(project.timeline.endDate);
      if (isNaN(endDate.getTime())) {
        errors.push({
          field: 'timeline.endDate',
          message: VALIDATION_MESSAGES.INVALID_DATE('timeline.endDate'),
          value: project.timeline.endDate,
          rule: 'date',
        });
      } else if (project.timeline.startDate) {
        const startDate = new Date(project.timeline.startDate);
        if (!isNaN(startDate.getTime()) && endDate < startDate) {
          errors.push({
            field: 'timeline.endDate',
            message: VALIDATION_MESSAGES.LOGICAL_ERROR('End date cannot be before start date'),
            value: project.timeline.endDate,
            rule: 'logical',
          });
        }
      }
    }
  }

  // Check if updatedAt is after createdAt
  if (project.createdAt && project.updatedAt) {
    const createdAt = new Date(project.createdAt);
    const updatedAt = new Date(project.updatedAt);
    if (!isNaN(createdAt.getTime()) && !isNaN(updatedAt.getTime()) && updatedAt < createdAt) {
      warnings.push({
        field: 'updatedAt',
        message: 'Updated date is before created date',
        value: project.updatedAt,
        suggestion: 'Ensure updatedAt is after createdAt',
      });
    }
  }
}

function validateArrays(project: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
  // Team validation
  if (project.team && Array.isArray(project.team)) {
    if (project.team.length === 0) {
      errors.push({
        field: 'team',
        message: 'Team must have at least one member',
        value: project.team,
        rule: 'minItems',
      });
    }

    project.team.forEach((member: any, index: number) => {
      if (!member.id || !member.name || !member.role) {
        errors.push({
          field: `team[${index}]`,
          message: 'Team member must have id, name, and role',
          value: member,
          rule: 'required',
        });
      }
    });
  }

  // Technologies validation
  if (project.technologies && Array.isArray(project.technologies)) {
    if (project.technologies.length === 0) {
      errors.push({
        field: 'technologies',
        message: 'Technologies must have at least one item',
        value: project.technologies,
        rule: 'minItems',
      });
    }

    const validTechCategories: TechnologyCategory[] = ['frontend', 'backend', 'database', 'tool', 'platform'];
    project.technologies.forEach((tech: any, index: number) => {
      if (!tech.id || !tech.name || !tech.category) {
        errors.push({
          field: `technologies[${index}]`,
          message: 'Technology must have id, name, and category',
          value: tech,
          rule: 'required',
        });
      }
      if (tech.category && !validTechCategories.includes(tech.category)) {
        errors.push({
          field: `technologies[${index}].category`,
          message: VALIDATION_MESSAGES.INVALID_ENUM('category', validTechCategories),
          value: tech.category,
          rule: 'enum',
        });
      }
    });
  }

  // Tags validation
  if (project.tags && Array.isArray(project.tags)) {
    project.tags.forEach((tag: any, index: number) => {
      if (typeof tag !== 'string') {
        errors.push({
          field: `tags[${index}]`,
          message: 'Tag must be a string',
          value: tag,
          rule: 'type',
        });
      } else if (tag.length === 0 || tag.length > 30) {
        errors.push({
          field: `tags[${index}]`,
          message: VALIDATION_MESSAGES.INVALID_LENGTH('tag', 1, 30),
          value: tag,
          rule: 'length',
        });
      }
    });
  }
}

function validateNestedObjects(project: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
  // Timeline validation
  if (project.timeline) {
    const requiredTimelineFields = ['startDate', 'duration', 'isOngoing'];
    for (const field of requiredTimelineFields) {
      if (!(field in project.timeline)) {
        errors.push({
          field: `timeline.${field}`,
          message: VALIDATION_MESSAGES.REQUIRED_FIELD(`timeline.${field}`),
          value: project.timeline[field],
          rule: 'required',
        });
      }
    }

    if (typeof project.timeline.isOngoing !== 'boolean') {
      errors.push({
        field: 'timeline.isOngoing',
        message: VALIDATION_MESSAGES.INVALID_TYPE('timeline.isOngoing', 'boolean'),
        value: project.timeline.isOngoing,
        rule: 'type',
      });
    }
  }

  // Metrics validation
  if (project.metrics) {
    if (!project.metrics.primary || !Array.isArray(project.metrics.primary)) {
      errors.push({
        field: 'metrics.primary',
        message: 'Primary metrics must be an array',
        value: project.metrics.primary,
        rule: 'type',
      });
    } else if (project.metrics.primary.length === 0) {
      errors.push({
        field: 'metrics.primary',
        message: 'Must have at least one primary metric',
        value: project.metrics.primary,
        rule: 'minItems',
      });
    }

    if (!project.metrics.kpis || !Array.isArray(project.metrics.kpis)) {
      errors.push({
        field: 'metrics.kpis',
        message: 'KPIs must be an array',
        value: project.metrics.kpis,
        rule: 'type',
      });
    }

    // Validate individual metrics
    const validateMetric = (metric: any, path: string) => {
      const requiredFields = ['id', 'label', 'value', 'type'];
      for (const field of requiredFields) {
        if (!(field in metric)) {
          errors.push({
            field: `${path}.${field}`,
            message: VALIDATION_MESSAGES.REQUIRED_FIELD(field),
            value: metric[field],
            rule: 'required',
          });
        }
      }

      const validMetricTypes: MetricType[] = ['number', 'percentage', 'currency', 'text'];
      if (metric.type && !validMetricTypes.includes(metric.type)) {
        errors.push({
          field: `${path}.type`,
          message: VALIDATION_MESSAGES.INVALID_ENUM('type', validMetricTypes),
          value: metric.type,
          rule: 'enum',
        });
      }
    };

    if (project.metrics.primary) {
      project.metrics.primary.forEach((metric: any, index: number) => {
        validateMetric(metric, `metrics.primary[${index}]`);
      });
    }

    if (project.metrics.kpis) {
      project.metrics.kpis.forEach((kpi: any, index: number) => {
        validateMetric(kpi, `metrics.kpis[${index}]`);
        
        // KPI-specific validation
        if (!('weight' in kpi)) {
          errors.push({
            field: `metrics.kpis[${index}].weight`,
            message: VALIDATION_MESSAGES.REQUIRED_FIELD('weight'),
            value: kpi.weight,
            rule: 'required',
          });
        } else if (typeof kpi.weight !== 'number' || kpi.weight < 0 || kpi.weight > 1) {
          errors.push({
            field: `metrics.kpis[${index}].weight`,
            message: VALIDATION_MESSAGES.INVALID_RANGE('weight', 0, 1),
            value: kpi.weight,
            rule: 'range',
          });
        }
      });
    }
  }
}

function validateLogicalConsistency(project: any, errors: ValidationError[], warnings: ValidationWarning[]): void {
  // Status and timeline consistency
  if (project.status === 'completed' && project.timeline?.isOngoing === true) {
    errors.push({
      field: 'status',
      message: VALIDATION_MESSAGES.LOGICAL_ERROR('Completed projects cannot be ongoing'),
      value: project.status,
      rule: 'logical',
    });
  }

  if (project.status === 'ongoing' && project.timeline?.isOngoing === false) {
    warnings.push({
      field: 'status',
      message: 'Ongoing projects should have isOngoing set to true',
      value: project.status,
      suggestion: 'Set timeline.isOngoing to true for ongoing projects',
    });
  }

  // End date consistency
  if (project.timeline?.isOngoing === true && project.timeline?.endDate) {
    warnings.push({
      field: 'timeline.endDate',
      message: 'Ongoing projects should not have an end date',
      value: project.timeline.endDate,
      suggestion: 'Remove end date for ongoing projects or set isOngoing to false',
    });
  }

  if (project.status === 'completed' && !project.timeline?.endDate) {
    warnings.push({
      field: 'timeline.endDate',
      message: 'Completed projects should have an end date',
      value: project.timeline?.endDate,
      suggestion: 'Add an end date for completed projects',
    });
  }
}

// Utility function to validate multiple projects
export function validateProjectList(projects: any[]): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  if (!Array.isArray(projects)) {
    errors.push({
      field: 'root',
      message: 'Projects must be an array',
      value: projects,
      rule: 'type',
    });
    return { isValid: false, errors, warnings };
  }

  const ids = new Set<string>();
  
  projects.forEach((project, index) => {
    const result = validateProjectAchievement(project);
    
    // Add index to field names for context
    result.errors.forEach(error => {
      errors.push({
        ...error,
        field: `projects[${index}].${error.field}`,
      });
    });
    
    result.warnings.forEach(warning => {
      warnings.push({
        ...warning,
        field: `projects[${index}].${warning.field}`,
      });
    });

    // Check for duplicate IDs
    if (project?.id) {
      if (ids.has(project.id)) {
        errors.push({
          field: `projects[${index}].id`,
          message: `Duplicate project ID: ${project.id}`,
          value: project.id,
          rule: 'unique',
        });
      } else {
        ids.add(project.id);
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// Helper function to format validation results for display
export function formatValidationResult(result: ValidationResult): string {
  if (result.isValid) {
    return 'Validation passed successfully!';
  }

  let output = 'Validation failed:\n\n';
  
  if (result.errors.length > 0) {
    output += 'Errors:\n';
    result.errors.forEach((error, index) => {
      output += `${index + 1}. ${error.field}: ${error.message}\n`;
    });
  }

  if (result.warnings.length > 0) {
    output += '\nWarnings:\n';
    result.warnings.forEach((warning, index) => {
      output += `${index + 1}. ${warning.field}: ${warning.message}\n`;
      if (warning.suggestion) {
        output += `   Suggestion: ${warning.suggestion}\n`;
      }
    });
  }

  return output;
}