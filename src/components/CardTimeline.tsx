/**
 * Card Timeline Component
 * Timeline section for achievement cards with duration and milestone display
 */

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardTimelineProps } from '../types/components';
import { Milestone } from '../types/project-achievement';
import { cn } from '../utils/cn';

// Milestone importance colors
const importanceColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-300',
  medium: 'bg-blue-100 text-blue-800 border-blue-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  critical: 'bg-red-100 text-red-800 border-red-300',
};

// Status colors
const statusColors = {
  completed: 'bg-green-500',
  ongoing: 'bg-blue-500',
  paused: 'bg-yellow-500',
  cancelled: 'bg-red-500',
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

const timelineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const milestoneVariants = {
  hidden: { opacity: 0, scale: 0.8, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.02,
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
      duration: 1.5,
      delay: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const CardTimeline: React.FC<CardTimelineProps> = ({
  timeline,
  showProgress = true,
  showMilestones = true,
  format = 'short',
  className,
  onMilestoneClick,
}) => {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);

  // Calculate timeline progress
  const progress = useMemo(() => {
    if (!timeline.isOngoing && timeline.endDate) {
      return 100; // Completed project
    }

    if (!timeline.isOngoing || !timeline.estimatedCompletion) {
      return 0; // No progress info available
    }

    const now = new Date();
    const start = timeline.startDate;
    const estimated = timeline.estimatedCompletion;

    const totalDuration = estimated.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();

    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  }, [timeline]);

  // Format date based on format prop
  const formatDate = useCallback((date: Date): string => {
    switch (format) {
      case 'long':
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(date);
      case 'relative':
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (Math.abs(diffDays) < 1) {
          return 'Today';
        } else if (diffDays === 1) {
          return 'Tomorrow';
        } else if (diffDays === -1) {
          return 'Yesterday';
        } else if (diffDays > 0) {
          return `In ${diffDays} days`;
        } else {
          return `${Math.abs(diffDays)} days ago`;
        }
      case 'short':
      default:
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(date);
    }
  }, [format]);

  // Calculate duration text
  const getDurationText = useCallback((): string => {
    if (timeline.isOngoing) {
      const now = new Date();
      const monthsDiff = (now.getFullYear() - timeline.startDate.getFullYear()) * 12 + 
                        (now.getMonth() - timeline.startDate.getMonth());
      
      if (monthsDiff < 1) {
        const daysDiff = Math.floor((now.getTime() - timeline.startDate.getTime()) / (1000 * 60 * 60 * 24));
        return `${daysDiff} days (ongoing)`;
      } else if (monthsDiff < 12) {
        return `${monthsDiff} months (ongoing)`;
      } else {
        const yearsDiff = Math.floor(monthsDiff / 12);
        const remainingMonths = monthsDiff % 12;
        return remainingMonths > 0 
          ? `${yearsDiff}y ${remainingMonths}m (ongoing)`
          : `${yearsDiff} years (ongoing)`;
      }
    }
    
    return timeline.duration;
  }, [timeline]);

  // Handle milestone click
  const handleMilestoneClick = useCallback((milestone: Milestone) => {
    if (milestone.id === expandedMilestone) {
      setExpandedMilestone(null);
    } else {
      setExpandedMilestone(milestone.id);
    }
    onMilestoneClick?.(milestone);
  }, [expandedMilestone, onMilestoneClick]);

  // Get milestone status
  const getMilestoneStatus = useCallback((milestone: Milestone): string => {
    if (milestone.completed) {
      return 'completed';
    }
    
    const now = new Date();
    const milestoneDate = milestone.date;
    
    if (milestoneDate < now) {
      return 'overdue';
    } else if (milestoneDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return 'upcoming';
    }
    
    return 'planned';
  }, []);

  // Render milestone
  const renderMilestone = (milestone: Milestone, index: number) => {
    const status = getMilestoneStatus(milestone);
    const isExpanded = expandedMilestone === milestone.id;

    return (
      <motion.div
        key={milestone.id}
        variants={milestoneVariants}
        whileHover="hover"
        className={cn(
          'relative pl-8 pb-4 cursor-pointer',
          index !== (timeline.milestones?.length || 0) - 1 && 'border-l-2 border-gray-200 ml-3'
        )}
        onClick={() => handleMilestoneClick(milestone)}
      >
        {/* Milestone Dot */}
        <div className={cn(
          'absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-white shadow-sm',
          'flex items-center justify-center transform -translate-x-3',
          milestone.completed && 'bg-green-500',
          !milestone.completed && status === 'overdue' && 'bg-red-500',
          !milestone.completed && status === 'upcoming' && 'bg-yellow-500',
          !milestone.completed && status === 'planned' && 'bg-gray-300'
        )}>
          {milestone.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {!milestone.completed && milestone.importance === 'critical' && (
            <div className="w-2 h-2 bg-white rounded-full" />
          )}
        </div>

        {/* Milestone Content */}
        <div className={cn(
          'p-3 rounded-lg border transition-all duration-200',
          'hover:border-gray-300 hover:shadow-sm',
          milestone.completed && 'bg-green-50 border-green-200',
          !milestone.completed && status === 'overdue' && 'bg-red-50 border-red-200',
          !milestone.completed && status === 'upcoming' && 'bg-yellow-50 border-yellow-200',
          !milestone.completed && status === 'planned' && 'bg-gray-50 border-gray-200'
        )}>
          {/* Milestone Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                'font-medium text-sm',
                milestone.completed && 'text-green-900',
                !milestone.completed && status === 'overdue' && 'text-red-900',
                !milestone.completed && status === 'upcoming' && 'text-yellow-900',
                !milestone.completed && status === 'planned' && 'text-gray-900'
              )}>
                {milestone.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  {formatDate(milestone.date)}
                </span>
                <span className={cn(
                  'inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium',
                  importanceColors[milestone.importance]
                )}>
                  {milestone.importance}
                </span>
              </div>
            </div>

            {/* Expand Icon */}
            {milestone.description && (
              <svg
                className={cn(
                  'w-4 h-4 text-gray-400 transition-transform duration-200 ml-2',
                  isExpanded && 'rotate-180'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>

          {/* Milestone Description */}
          <AnimatePresence>
            {isExpanded && milestone.description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200"
              >
                {milestone.description}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-4', className)}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Timeline</h3>
        <span className="text-sm text-gray-500">
          {getDurationText()}
        </span>
      </div>

      {/* Main Timeline Info */}
      <motion.div
        variants={timelineVariants}
        className="p-4 bg-gray-50 rounded-lg"
      >
        {/* Date Range */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">
              {formatDate(timeline.startDate)}
            </span>
          </div>

          {timeline.endDate && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">→</span>
              <span className="text-gray-700">
                {formatDate(timeline.endDate)}
              </span>
            </div>
          )}

          {timeline.isOngoing && timeline.estimatedCompletion && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Est:</span>
              <span className="text-blue-700">
                {formatDate(timeline.estimatedCompletion)}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && timeline.isOngoing && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                className={cn(
                  'h-2 rounded-full',
                  statusColors[timeline.isOngoing ? 'ongoing' : 'completed']
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-2 h-2 rounded-full',
            timeline.isOngoing && 'bg-blue-500',
            !timeline.isOngoing && timeline.endDate && 'bg-green-500',
            !timeline.isOngoing && !timeline.endDate && 'bg-gray-400'
          )} />
          <span className="text-sm font-medium text-gray-700">
            {timeline.isOngoing ? 'In Progress' : 'Completed'}
          </span>
          {timeline.isOngoing && timeline.estimatedCompletion && (
            <span className="text-xs text-gray-500">
              • {Math.ceil((timeline.estimatedCompletion.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
            </span>
          )}
        </div>
      </motion.div>

      {/* Milestones */}
      {showMilestones && timeline.milestones && timeline.milestones.length > 0 && (
        <motion.div
          variants={timelineVariants}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-900">Milestones</h4>
            <span className="text-sm text-gray-500">
              {timeline.milestones.filter(m => m.completed).length} of {timeline.milestones.length} completed
            </span>
          </div>

          <div className="relative">
            {timeline.milestones.map((milestone, index) => renderMilestone(milestone, index))}
          </div>

          {/* Milestone Summary */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-blue-600 font-medium">Completed:</span>
                <span className="ml-2 text-blue-800">
                  {timeline.milestones.filter(m => m.completed).length}
                </span>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Remaining:</span>
                <span className="ml-2 text-blue-800">
                  {timeline.milestones.filter(m => !m.completed).length}
                </span>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Critical:</span>
                <span className="ml-2 text-blue-800">
                  {timeline.milestones.filter(m => m.importance === 'critical').length}
                </span>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Overdue:</span>
                <span className="ml-2 text-blue-800">
                  {timeline.milestones.filter(m => !m.completed && m.date < new Date()).length}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* No Milestones Message */}
      {showMilestones && (!timeline.milestones || timeline.milestones.length === 0) && (
        <motion.div
          variants={timelineVariants}
          className="text-center py-6 text-gray-500"
        >
          <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm">No milestones defined</p>
        </motion.div>
      )}
    </motion.div>
  );
};