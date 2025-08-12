/**
 * Accessibility Hook
 * Custom hook for accessibility features and ARIA management
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { AccessibilityState, AriaLabels } from '../types/interaction';

interface UseAccessibilityOptions {
  announcements?: boolean;
  reducedMotion?: boolean;
  highContrast?: boolean;
  screenReaderOptimized?: boolean;
}

export function useAccessibility(options: UseAccessibilityOptions = {}) {
  const {
    announcements = true,
    reducedMotion = false,
    highContrast = false,
    screenReaderOptimized = true,
  } = options;

  const [state, setState] = useState<AccessibilityState>({
    announcements: [],
    focusVisible: false,
    reducedMotion: false,
    highContrast: false,
    screenReaderMode: false,
    keyboardNavigation: false,
  });

  // Detect user preferences
  useEffect(() => {
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
      focusVisible: window.matchMedia('(prefers-reduced-motion: no-preference)'),
    };

    const updatePreferences = () => {
      setState(prev => ({
        ...prev,
        reducedMotion: mediaQueries.reducedMotion.matches || reducedMotion,
        highContrast: mediaQueries.highContrast.matches || highContrast,
        focusVisible: true, // Always enable focus visible for accessibility
      }));
    };

    // Initial check
    updatePreferences();

    // Listen for changes
    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updatePreferences);
    });

    return () => {
      Object.values(mediaQueries).forEach(mq => {
        mq.removeEventListener('change', updatePreferences);
      });
    };
  }, [reducedMotion, highContrast]);

  // Detect keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setState(prev => ({ ...prev, keyboardNavigation: true }));
      }
    };

    const handleMouseDown = () => {
      setState(prev => ({ ...prev, keyboardNavigation: false }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Screen reader detection
  useEffect(() => {
    const detectScreenReader = () => {
      // Simple heuristic for screen reader detection
      const hasScreenReader = 
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver') ||
        window.speechSynthesis?.getVoices().length > 0;

      setState(prev => ({ ...prev, screenReaderMode: hasScreenReader }));
    };

    detectScreenReader();
    
    // Check again after voices are loaded
    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', detectScreenReader);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', detectScreenReader);
    }
  }, []);

  // Announce to screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!announcements || !screenReaderOptimized) return;

    setState(prev => ({
      ...prev,
      announcements: [...prev.announcements.slice(-4), message], // Keep last 5 announcements
    }));

    // Create live region for announcement
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = message;
    
    document.body.appendChild(liveRegion);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  }, [announcements, screenReaderOptimized]);

  // ARIA label generators
  const ariaLabels: AriaLabels = {
    card: (project) => `Project card: ${project.title}. Status: ${project.status}. Category: ${project.category}. Team size: ${project.team.length} members.`,
    metric: (metric) => `Metric: ${metric.label}. Value: ${metric.value}${metric.unit || ''}. ${metric.trend ? `Trend: ${metric.trend}` : ''}`,
    teamMember: (member) => `Team member: ${member.name}. Role: ${member.role}. ${member.isLead ? 'Team lead.' : ''}`,
    expandButton: (isExpanded) => `${isExpanded ? 'Collapse' : 'Expand'} card details`,
    closeButton: 'Close dialog',
    filterButton: 'Open filter options',
    sortButton: 'Open sort options',
    searchInput: 'Search projects by title, description, or tags',
  };

  // Get accessibility classes
  const getAccessibilityClasses = useCallback(() => {
    const classes = [];
    
    if (state.reducedMotion) classes.push('reduce-motion');
    if (state.highContrast) classes.push('high-contrast');
    if (state.focusVisible) classes.push('focus-visible');
    if (state.keyboardNavigation) classes.push('keyboard-navigation');
    if (state.screenReaderMode) classes.push('screen-reader');
    
    return classes.join(' ');
  }, [state]);

  return {
    state,
    announce,
    ariaLabels,
    getAccessibilityClasses,
  };
}