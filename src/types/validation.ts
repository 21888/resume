/**
 * Validation types for content and forms
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: ValidationRule;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  role?: 'hr' | 'boss';
}

export interface ContentValidation {
  validatePersonalInfo: (data: any) => ValidationResult;
  validateExperience: (data: any) => ValidationResult;
  validateSkills: (data: any) => ValidationResult;
  validateContact: (data: any) => ValidationResult;
}