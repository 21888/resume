/**
 * Main types export file
 */

// Role system types
export type { 
  UserRole, 
  RoleState, 
  RoleSelectionModalProps, 
  RoleDetectionHookReturn,
  RoleAdaptiveContentProps,
  ContentVariant 
} from './role';

// Content types
export type {
  PersonalInfo,
  AboutContent,
  ExperienceItem,
  SkillCategory,
  ContactInfo,
  SalaryInfo,
  ResumeContent,
  HeroSectionProps,
  ExperienceTimelineProps,
  SkillsRadarProps
} from './content';

// Animation types
export type {
  AnimationVariants,
  ScrollAnimationConfig,
  ScrollAnimationProps,
  CustomCursorProps,
  StaggerAnimationProps,
  PageTransitionProps,
  MicroInteractionProps,
  CardAnimationConfig
} from './animation';

// Export animation variants
export { ANIMATION_VARIANTS } from './animation';

// Error types
export type {
  AppError,
  ErrorState,
  ErrorBoundaryProps,
  ErrorFallbackProps,
  ValidationError,
  ApiError,
  ErrorHandlerOptions
} from './error';

// Core project achievement/domain model types
export type {
  ProjectAchievement,
  ProjectCategory,
  ProjectStatus,
  MetricType,
  TechnologyCategory,
  MetricItem,
  TeamMember,
} from './project-achievement';

// Theme types
export type {
  ThemeMode,
  ThemeState,
  ThemeProviderProps,
  ThemeConfig
} from './theme';

// Store types
export type {
  AppState,
  StoreSlice,
  PersistConfig
} from './store';

// UI types
export type {
  BaseComponentProps,
  ButtonProps,
  CardProps,
  ModalProps,
  TooltipProps,
  LoadingSpinnerProps,
  ProgressBarProps,
  BadgeProps,
  IconProps
} from './ui';

// Responsive types used by config
export type {
  ResponsiveConfig,
  GridConfig,
  LayoutConfig,
  TypographyConfig,
  TouchConfig,
  ResponsiveAnimationConfig,
} from './responsive';

// Validation types
export type {
  ValidationRule,
  ValidationSchema,
  ValidationResult,
  FormField,
  ContactFormData,
  ContentValidation
} from './validation';

// Utility/transformer exported types for data processing
export type {
  DisplayProject,
  SearchIndexItem,
  ExportProject,
  ApiProjectResponse,
  ProjectTransformers,
} from './utility';

// Re-export component prop types commonly used by consumers
export type {
  AchievementCardProps,
  CardHeaderProps,
  CardContentProps,
  CardMetricsProps,
  CardTeamProps,
  CardTimelineProps,
  ExpandableSectionProps,
  FilterControlsProps,
  SortControlsProps,
  SearchProps,
  AvatarProps,
  AnimationWrapperProps,
} from './components';