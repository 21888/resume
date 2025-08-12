/**
 * Configuration Types and Constants
 * Default configurations, constants, and settings for project achievement cards
 */

import { CardAnimationConfig } from './animation';
import { FilterOptions } from './interaction';
import { SortOptions } from './interaction';
import { ResponsiveConfig, GridConfig, LayoutConfig, TypographyConfig, TouchConfig, ResponsiveAnimationConfig } from './responsive';
import { UtilityConfig } from './utility';

// Application configuration
export interface AppConfig {
  animation: AnimationConfig;
  layout: LayoutConfig;
  typography: TypographyConfig;
  touch: TouchConfig;
  performance: PerformanceConfig;
  accessibility: AccessibilityConfig;
  gracefulDegradation: GracefulDegradationConfig;
  utilities: UtilityConfig;
}

export interface GracefulDegradationConfig {
  missingData: {
    showPlaceholder: boolean;
    placeholderText: string;
    showLoadingState: boolean;
  };
  animationFailure: {
    fallbackToCss: boolean;
    disableAnimations: boolean;
    showStaticContent: boolean;
  };
  imageLoadFailure: {
    showDefaultIcon: boolean;
    showPlaceholder: boolean;
    retryCount: number;
  };
  metricCalculationError: {
    showRawValues: boolean;
    hideMetrics: boolean;
    showErrorMessage: boolean;
  };
  filterSortFailure: {
    resetToDefault: boolean;
    showAllItems: boolean;
    disableFeature: boolean;
  };
}

// Animation configuration
export interface AnimationConfig {
  enabled: boolean;
  respectReducedMotion: boolean;
  defaultDuration: number;
  defaultEasing: string;
  staggerDelay: number;
  hoverEffects: boolean;
  scrollAnimations: boolean;
  presets: {
    subtle: CardAnimationConfig;
    normal: CardAnimationConfig;
    dramatic: CardAnimationConfig;
  };
}

// Performance configuration
export interface PerformanceConfig {
  lazyLoading: boolean;
  virtualScrolling: boolean;
  imageOptimization: boolean;
  bundleSplitting: boolean;
  caching: {
    enabled: boolean;
    ttl: number;
    maxSize: number;
  };
  monitoring: {
    enabled: boolean;
    sampleRate: number;
    reportThreshold: number;
  };
}

// Accessibility configuration
export interface AccessibilityConfig {
  keyboardNavigation: boolean;
  screenReaderSupport: boolean;
  highContrastMode: boolean;
  focusVisible: boolean;
  announcements: boolean;
  skipLinks: boolean;
  ariaLabels: {
    card: string;
    expandButton: string;
    closeButton: string;
    filterButton: string;
    sortButton: string;
    searchInput: string;
  };
}

// Default configurations
export const DEFAULT_APP_CONFIG: AppConfig = {
  animation: {
    enabled: true,
    respectReducedMotion: true,
    defaultDuration: 0.6,
    defaultEasing: 'easeOut',
    staggerDelay: 0.1,
    hoverEffects: true,
    scrollAnimations: true,
    presets: {
      subtle: {
        variant: 'fadeIn',
        duration: 0.3,
        delay: 0,
        ease: 'easeOut',
        reducedMotion: false,
      },
      normal: {
        variant: 'slideUp',
        duration: 0.6,
        delay: 0,
        ease: 'easeOut',
        stagger: {
          delayChildren: 0.1,
          staggerChildren: 0.1,
          when: 'beforeChildren',
        },
        reducedMotion: false,
      },
      dramatic: {
        variant: 'scaleIn',
        duration: 0.8,
        delay: 0,
        ease: 'backOut',
        stagger: {
          delayChildren: 0.2,
          staggerChildren: 0.15,
          when: 'beforeChildren',
        },
        reducedMotion: false,
      },
    },
  },
  layout: {
    gridColumns: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      wide: 4,
      ultrawide: 5,
    },
    cardSizes: {
      mobile: 'compact',
      tablet: 'default',
      desktop: 'default',
      wide: 'detailed',
      ultrawide: 'detailed',
    },
    spacing: {
      mobile: 'normal',
      tablet: 'normal',
      desktop: 'relaxed',
      wide: 'relaxed',
      ultrawide: 'loose',
    },
    containerMaxWidth: {
      mobile: '100%',
      tablet: '768px',
      desktop: '1024px',
      wide: '1280px',
      ultrawide: '1536px',
    },
    sidebarWidth: {
      mobile: '0',
      tablet: '0',
      desktop: '256px',
      wide: '320px',
      ultrawide: '384px',
    },
  },
  typography: {
    fontSize: {
      mobile: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      tablet: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      desktop: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      wide: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      ultrawide: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
    },
    lineHeight: {
      mobile: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      tablet: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      desktop: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      wide: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      ultrawide: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
    },
    letterSpacing: {
      mobile: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      tablet: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      desktop: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      wide: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      ultrawide: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
    },
  },
  touch: {
    enabled: {
      mobile: true,
      tablet: true,
      desktop: false,
      wide: false,
      ultrawide: false,
    },
    swipeThreshold: {
      mobile: 50,
      tablet: 75,
      desktop: 100,
      wide: 100,
      ultrawide: 100,
    },
    tapTimeout: {
      mobile: 300,
      tablet: 300,
      desktop: 200,
      wide: 200,
      ultrawide: 200,
    },
    longPressDelay: {
      mobile: 500,
      tablet: 500,
      desktop: 750,
      wide: 750,
      ultrawide: 750,
    },
    pinchSensitivity: {
      mobile: 0.1,
      tablet: 0.1,
      desktop: 0.05,
      wide: 0.05,
      ultrawide: 0.05,
    },
  },
  performance: {
    lazyLoading: true,
    virtualScrolling: false,
    imageOptimization: true,
    bundleSplitting: true,
    caching: {
      enabled: true,
      ttl: 300000, // 5 minutes
      maxSize: 100,
    },
    monitoring: {
      enabled: true,
      sampleRate: 0.1,
      reportThreshold: 1000, // ms
    },
  },
  accessibility: {
    keyboardNavigation: true,
    screenReaderSupport: true,
    highContrastMode: true,
    focusVisible: true,
    announcements: true,
    skipLinks: true,
    ariaLabels: {
      card: 'Project achievement card',
      expandButton: 'Expand card details',
      closeButton: 'Close',
      filterButton: 'Filter projects',
      sortButton: 'Sort projects',
      searchInput: 'Search projects',
    },
  },
  gracefulDegradation: {
    missingData: {
      showPlaceholder: true,
      placeholderText: 'Information not available',
      showLoadingState: true,
    },
    animationFailure: {
      fallbackToCss: true,
      disableAnimations: false,
      showStaticContent: true,
    },
    imageLoadFailure: {
      showDefaultIcon: true,
      showPlaceholder: true,
      retryCount: 3,
    },
    metricCalculationError: {
      showRawValues: true,
      hideMetrics: false,
      showErrorMessage: false,
    },
    filterSortFailure: {
      resetToDefault: true,
      showAllItems: true,
      disableFeature: false,
    },
  },
  utilities: {
    filtering: {
      debounceDelay: 300,
      caseSensitive: false,
      fuzzySearch: true,
      maxResults: 100,
    },
    sorting: {
      stableSort: true,
      naturalSort: true,
      localeCompare: true,
    },
    caching: {
      ttl: 300000,
      maxSize: 100,
      strategy: 'lru',
    },
    performance: {
      enableMetrics: true,
      sampleRate: 0.1,
      maxBenchmarks: 1000,
    },
  },
};

// Theme constants
export const THEME_CONSTANTS = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      900: '#7f1d1d',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
} as const;

// Z-index constants
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// Animation constants
export const ANIMATION_CONSTANTS = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    backIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    backOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    backInOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;