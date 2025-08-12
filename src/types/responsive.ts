/**
 * Responsive Design Types
 * TypeScript interfaces for responsive configurations, breakpoints, and adaptive layouts
 */

// Breakpoint definitions
export interface Breakpoints {
  mobile: number;    // 640px
  tablet: number;    // 768px
  desktop: number;   // 1024px
  wide: number;      // 1280px
  ultrawide: number; // 1536px
}

export type BreakpointKey = keyof Breakpoints;

// Responsive configuration for different screen sizes
export interface ResponsiveConfig<T = any> {
  mobile: T;
  tablet: T;
  desktop: T;
  wide: T;
  ultrawide?: T;
}

// Grid and layout configurations
export interface GridConfig extends ResponsiveConfig<number> {
  // Number of columns for each breakpoint
  mobile: 1;
  tablet: 2;
  desktop: 3;
  wide: 4;
  ultrawide: 5;
}

export interface LayoutConfig {
  gridColumns: GridConfig;
  cardSizes: ResponsiveConfig<CardSize>;
  spacing: ResponsiveConfig<SpacingSize>;
  containerMaxWidth: ResponsiveConfig<string>;
  sidebarWidth: ResponsiveConfig<string>;
}

export type CardSize = 'compact' | 'default' | 'detailed' | 'expanded';
export type SpacingSize = 'tight' | 'normal' | 'relaxed' | 'loose';

// Typography responsive configurations
export interface TypographyConfig {
  fontSize: ResponsiveConfig<FontSizeScale>;
  lineHeight: ResponsiveConfig<LineHeightScale>;
  letterSpacing: ResponsiveConfig<LetterSpacingScale>;
}

export interface FontSizeScale {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface LineHeightScale {
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
}

export interface LetterSpacingScale {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

// Component-specific responsive configurations
export interface CardResponsiveConfig {
  variant: ResponsiveConfig<CardSize>;
  showMetrics: ResponsiveConfig<boolean>;
  showTeam: ResponsiveConfig<boolean>;
  showTimeline: ResponsiveConfig<boolean>;
  maxTeamMembers: ResponsiveConfig<number>;
  maxTechnologies: ResponsiveConfig<number>;
  descriptionLines: ResponsiveConfig<number>;
}

export interface NavigationResponsiveConfig {
  showSidebar: ResponsiveConfig<boolean>;
  sidebarCollapsed: ResponsiveConfig<boolean>;
  showBreadcrumbs: ResponsiveConfig<boolean>;
  navigationStyle: ResponsiveConfig<'tabs' | 'dropdown' | 'accordion'>;
}

// Media query utilities
export interface MediaQueryConfig {
  breakpoints: Breakpoints;
  queries: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
    ultrawide: string;
    mobileOnly: string;
    tabletOnly: string;
    desktopOnly: string;
    tabletAndUp: string;
    desktopAndUp: string;
    wideAndUp: string;
  };
}

// Responsive image configurations
export interface ResponsiveImageConfig {
  sizes: ResponsiveConfig<string>;
  quality: ResponsiveConfig<number>;
  format: ResponsiveConfig<'webp' | 'jpeg' | 'png' | 'avif'>;
  loading: ResponsiveConfig<'lazy' | 'eager'>;
  placeholder: ResponsiveConfig<'blur' | 'empty' | 'data'>;
}

// Touch and gesture configurations for mobile
export interface TouchConfig {
  enabled: ResponsiveConfig<boolean>;
  swipeThreshold: ResponsiveConfig<number>;
  tapTimeout: ResponsiveConfig<number>;
  longPressDelay: ResponsiveConfig<number>;
  pinchSensitivity: ResponsiveConfig<number>;
}

// Animation configurations for different screen sizes
export interface ResponsiveAnimationConfig {
  enabled: ResponsiveConfig<boolean>;
  duration: ResponsiveConfig<number>;
  easing: ResponsiveConfig<string>;
  staggerDelay: ResponsiveConfig<number>;
  reducedMotion: ResponsiveConfig<boolean>;
}

// Performance configurations
export interface ResponsivePerformanceConfig {
  lazyLoading: ResponsiveConfig<boolean>;
  imageOptimization: ResponsiveConfig<boolean>;
  bundleSplitting: ResponsiveConfig<boolean>;
  prefetching: ResponsiveConfig<boolean>;
  caching: ResponsiveConfig<boolean>;
}

// Accessibility configurations
export interface ResponsiveAccessibilityConfig {
  fontSize: ResponsiveConfig<'small' | 'medium' | 'large'>;
  contrast: ResponsiveConfig<'normal' | 'high'>;
  focusVisible: ResponsiveConfig<boolean>;
  keyboardNavigation: ResponsiveConfig<boolean>;
  screenReaderOptimized: ResponsiveConfig<boolean>;
}

// Device detection and capabilities
export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  hasHover: boolean;
  hasPointer: boolean;
  supportsWebP: boolean;
  supportsAvif: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  screenDensity: number;
}

// Responsive state management
export interface ResponsiveState {
  currentBreakpoint: BreakpointKey;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  deviceCapabilities: DeviceCapabilities;
  userPreferences: UserPreferences;
}

export interface UserPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  colorScheme: 'light' | 'dark' | 'auto';
  dataUsage: 'low' | 'normal' | 'high';
}

// Responsive utilities and hooks
export interface ResponsiveUtilities {
  getCurrentBreakpoint: () => BreakpointKey;
  isBreakpoint: (breakpoint: BreakpointKey) => boolean;
  isBreakpointAndUp: (breakpoint: BreakpointKey) => boolean;
  isBreakpointAndDown: (breakpoint: BreakpointKey) => boolean;
  getResponsiveValue: <T>(config: ResponsiveConfig<T>) => T;
  matchesMediaQuery: (query: string) => boolean;
}

// Container and wrapper configurations
export interface ContainerConfig {
  maxWidth: ResponsiveConfig<string>;
  padding: ResponsiveConfig<string>;
  margin: ResponsiveConfig<string>;
  centerContent: ResponsiveConfig<boolean>;
}

export interface WrapperConfig {
  showSidebar: ResponsiveConfig<boolean>;
  sidebarPosition: ResponsiveConfig<'left' | 'right' | 'top' | 'bottom'>;
  headerHeight: ResponsiveConfig<string>;
  footerHeight: ResponsiveConfig<string>;
  contentPadding: ResponsiveConfig<string>;
}