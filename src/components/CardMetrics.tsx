/**
 * Card Metrics Component
 * Metrics section for achievement cards with visual indicators and charts
 */

'use client';

import React, { useState, useCallback } from 'react';
import { m as motion } from 'framer-motion';
import { CardMetricsProps } from '../types/components';
import { MetricItem, KPIItem } from '../types/project-achievement';
import { cn } from '../utils/cn';

// Metric color mappings
const metricColors = {
  success: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    border: 'border-green-200',
    icon: 'text-green-600',
    progress: 'bg-green-500',
  },
  warning: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    icon: 'text-yellow-600',
    progress: 'bg-yellow-500',
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    border: 'border-red-200',
    icon: 'text-red-600',
    progress: 'bg-red-500',
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    progress: 'bg-blue-500',
  },
};

// Trend icons
const trendIcons = {
  up: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
    </svg>
  ),
  down: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
    </svg>
  ),
  neutral: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
    </svg>
  ),
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const metricVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.2,
    },
  },
};

const progressVariants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
    transition: {
      duration: 1,
      delay: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const CardMetrics: React.FC<CardMetricsProps> = ({
  metrics,
  layout = 'grid',
  showTrends = true,
  showTooltips = true,
  maxVisible = 4,
  variant = 'default',
  className,
  onMetricClick,
}) => {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  // Combine primary and secondary metrics
  const allMetrics = [...metrics.primary, ...(metrics.secondary || [])];
  const visibleMetrics = showAllMetrics ? allMetrics : allMetrics.slice(0, maxVisible);
  const hiddenCount = Math.max(0, allMetrics.length - maxVisible);

  // Format metric value
  const formatMetricValue = useCallback((metric: MetricItem): string => {
    if (typeof metric.value === 'string') {
      return metric.value;
    }

    switch (metric.type) {
      case 'percentage':
        return `${metric.value}%`;
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(metric.value);
      case 'number':
        const formatted = new Intl.NumberFormat('en-US').format(metric.value);
        return metric.unit ? `${formatted} ${metric.unit}` : formatted;
      default:
        return metric.unit ? `${metric.value} ${metric.unit}` : String(metric.value);
    }
  }, []);

  // Calculate progress percentage for KPIs
  const calculateProgress = useCallback((kpi: KPIItem): number => {
    if (typeof kpi.value !== 'number') return 0;
    
    const { excellent, good, acceptable } = kpi.threshold;
    const maxThreshold = Math.max(excellent, good, acceptable);
    
    return Math.min((kpi.value / maxThreshold) * 100, 100);
  }, []);

  // Get metric color scheme
  const getMetricColorScheme = useCallback((metric: MetricItem) => {
    return metricColors[metric.color || 'info'];
  }, []);

  // Handle metric click
  const handleMetricClick = useCallback((metric: MetricItem) => {
    onMetricClick?.(metric);
  }, [onMetricClick]);

  // Handle metric hover
  const handleMetricHover = useCallback((metricId: string | null) => {
    if (showTooltips) {
      setHoveredMetric(metricId);
    }
  }, [showTooltips]);

  // Get layout classes
  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap gap-4';
      case 'vertical':
        return 'flex flex-col gap-4';
      case 'grid':
      default:
        return variant === 'compact' 
          ? 'grid grid-cols-2 gap-3'
          : 'grid grid-cols-1 sm:grid-cols-2 gap-4';
    }
  };

  // Render individual metric
  const renderMetric = (metric: MetricItem, index: number) => {
    const colorScheme = getMetricColorScheme(metric);
    const isHovered = hoveredMetric === metric.id;

    return (
      <motion.div
        key={metric.id}
        variants={metricVariants}
        whileHover="hover"
        className={cn(
          'relative p-4 rounded-lg border cursor-pointer',
          'transition-all duration-200',
          colorScheme.bg,
          colorScheme.border,
          variant === 'compact' && 'p-3',
          variant === 'detailed' && 'p-5'
        )}
        onClick={() => handleMetricClick(metric)}
        onMouseEnter={() => handleMetricHover(metric.id)}
        onMouseLeave={() => handleMetricHover(null)}
        role="button"
        tabIndex={0}
        aria-label={`Metric: ${metric.label} - ${formatMetricValue(metric)}`}
      >
        {/* Metric Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h4 className={cn(
              'font-medium truncate',
              colorScheme.text,
              variant === 'compact' ? 'text-sm' : 'text-base'
            )}>
              {metric.label}
            </h4>
            {metric.description && variant !== 'compact' && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {metric.description}
              </p>
            )}
          </div>

          {/* Trend Indicator */}
          {showTrends && metric.trend && (
            <div className={cn(
              'ml-2 p-1 rounded',
              metric.trend === 'up' && 'text-green-600 bg-green-100',
              metric.trend === 'down' && 'text-red-600 bg-red-100',
              metric.trend === 'neutral' && 'text-gray-600 bg-gray-100'
            )}>
              {trendIcons[metric.trend]}
            </div>
          )}
        </div>

        {/* Metric Value */}
        <div className="mb-3">
          <div className={cn(
            'font-bold',
            colorScheme.text,
            variant === 'compact' ? 'text-lg' : 'text-2xl'
          )}>
            {formatMetricValue(metric)}
          </div>

          {/* Previous Value Comparison */}
          {metric.previousValue && typeof metric.value === 'number' && typeof metric.previousValue === 'number' && (
            <div className="text-xs text-gray-500 mt-1">
              {metric.value > metric.previousValue ? '+' : ''}
              {((metric.value - metric.previousValue) / metric.previousValue * 100).toFixed(1)}%
              {' from previous'}
            </div>
          )}
        </div>

        {/* Progress Bar (for KPIs) */}
        {'threshold' in metric && (
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{calculateProgress(metric as KPIItem).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                className={cn(
                  'h-2 rounded-full',
                  colorScheme.progress
                )}
                style={{ width: `${calculateProgress(metric as KPIItem)}%` }}
              />
            </div>
          </div>
        )}

        {/* Target Indicator */}
        {metric.target && typeof metric.value === 'number' && typeof metric.target === 'number' && (
          <div className="text-xs text-gray-500">
            Target: {formatMetricValue({ ...metric, value: metric.target })}
            {metric.value >= metric.target && (
              <span className="ml-1 text-green-600">✓ Achieved</span>
            )}
          </div>
        )}

        {/* Tooltip */}
        {showTooltips && isHovered && metric.description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              'absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2',
              'px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg',
              'max-w-xs whitespace-normal pointer-events-none'
            )}
          >
            {metric.description}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </motion.div>
    );
  };

  // Render KPI summary
  const renderKPISummary = () => {
    if (!metrics.kpis || metrics.kpis.length === 0) return null;

    const totalWeight = metrics.kpis.reduce((sum, kpi) => sum + kpi.weight, 0);
    const weightedScore = metrics.kpis.reduce((sum, kpi) => {
      if (typeof kpi.value !== 'number') return sum;
      const progress = calculateProgress(kpi);
      return sum + (progress * kpi.weight);
    }, 0);
    const overallScore = totalWeight > 0 ? weightedScore / totalWeight : 0;

    return (
      <motion.div
        variants={metricVariants}
        className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-blue-900">Overall Performance</h4>
          <div className="text-2xl font-bold text-blue-800">
            {overallScore.toFixed(0)}%
          </div>
        </div>
        
        <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
          <motion.div
            variants={progressVariants}
            initial="hidden"
            animate="visible"
            className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            style={{ width: `${overallScore}%` }}
          />
        </div>
        
        <div className="text-xs text-blue-700">
          Based on {metrics.kpis.length} key performance indicators
        </div>
      </motion.div>
    );
  };

  if (allMetrics.length === 0) {
    return (
      <div className={cn('text-center py-8 text-gray-500', className)}>
        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-sm">No metrics available</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-4', className)}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Metrics</h3>
        <span className="text-sm text-gray-500">
          {allMetrics.length} {allMetrics.length === 1 ? 'metric' : 'metrics'}
        </span>
      </div>

      {/* KPI Summary */}
      {variant === 'detailed' && renderKPISummary()}

      {/* Metrics Grid */}
      <div className={getLayoutClasses()}>
        {visibleMetrics.map((metric, index) => renderMetric(metric, index))}
      </div>

      {/* Show More/Less Button */}
      {hiddenCount > 0 && (
        <motion.div
          variants={metricVariants}
          className="text-center"
        >
          <button
            onClick={() => setShowAllMetrics(!showAllMetrics)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium',
              'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
              'rounded-lg transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
          >
            {showAllMetrics ? (
              <>
                <span>Show Less</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>Show {hiddenCount} More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};