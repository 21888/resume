/**
 * Sort Controls Component
 * Sorting controls for project achievement cards
 */

'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SortControlsProps } from '../../types/components';
import { SortOptions, SortField, SortDirection } from '../../types/interaction';
import { cn } from '../../utils/cn';

// Sort field configurations
const sortFieldConfigs = {
  title: { label: 'Title', icon: '📝' },
  startDate: { label: 'Start Date', icon: '📅' },
  endDate: { label: 'End Date', icon: '🏁' },
  duration: { label: 'Duration', icon: '⏱️' },
  teamSize: { label: 'Team Size', icon: '👥' },
  category: { label: 'Category', icon: '📁' },
  status: { label: 'Status', icon: '📊' },
  updatedAt: { label: 'Last Updated', icon: '🔄' },
  createdAt: { label: 'Created', icon: '✨' },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

export const SortControls: React.FC<SortControlsProps> = ({
  sort,
  availableFields,
  showDirection = true,
  showPresets = true,
  className,
  onChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle sort field change
  const handleFieldChange = useCallback((field: SortField) => {
    onChange({
      ...sort,
      field,
    });
    setIsDropdownOpen(false);
  }, [sort, onChange]);

  // Handle sort direction change
  const handleDirectionChange = useCallback((direction: SortDirection) => {
    onChange({
      ...sort,
      direction,
    });
  }, [sort, onChange]);

  // Handle preset sort
  const handlePresetSort = useCallback((field: SortField, direction: SortDirection) => {
    onChange({ field, direction });
  }, [onChange]);

  // Get current field config
  const currentFieldConfig = sortFieldConfigs[sort.field] || availableFields.find(f => f.key === sort.field);
  const currentFieldLabel = currentFieldConfig?.label || sort.field;
  const currentFieldIcon = currentFieldConfig?.icon || '📋';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-4', className)}
    >
      {/* Sort Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Sort</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Sorted by</span>
          <span className="font-medium text-gray-700">
            {currentFieldIcon} {currentFieldLabel}
          </span>
          <span className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium',
            sort.direction === 'asc' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          )}>
            {sort.direction === 'asc' ? '↑ A-Z' : '↓ Z-A'}
          </span>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-3">
        {/* Sort Field Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium',
              'border border-gray-300 rounded-lg',
              'hover:bg-gray-50 transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              isDropdownOpen && 'bg-blue-50 border-blue-300 text-blue-700'
            )}
          >
            <span>{currentFieldIcon}</span>
            <span>{currentFieldLabel}</span>
            <svg
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                isDropdownOpen && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={cn(
                  'absolute top-full left-0 mt-2 w-56 max-h-64 overflow-y-auto',
                  'bg-white border border-gray-200 rounded-lg shadow-lg z-10',
                  'py-2'
                )}
              >
                {availableFields.map((field) => (
                  <button
                    key={field.key}
                    onClick={() => handleFieldChange(field.key as SortField)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2 text-left',
                      'hover:bg-gray-50 transition-colors duration-200',
                      sort.field === field.key && 'bg-blue-50 text-blue-700'
                    )}
                  >
                    <span>{field.icon || '📋'}</span>
                    <span className="text-sm">{field.label}</span>
                    {sort.field === field.key && (
                      <svg className="w-4 h-4 ml-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sort Direction Toggle */}
        {showDirection && (
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => handleDirectionChange('asc')}
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
                sort.direction === 'asc'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              )}
              title="Ascending (A-Z, 1-9, oldest first)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </button>
            <button
              onClick={() => handleDirectionChange('desc')}
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
                sort.direction === 'desc'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              )}
              title="Descending (Z-A, 9-1, newest first)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </button>
          </div>
        )}

        {/* Secondary Sort */}
        {sort.secondary && (
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <span className="text-xs text-gray-500">Then by:</span>
            <span className="text-sm font-medium text-gray-700">
              {sortFieldConfigs[sort.secondary.field]?.label || sort.secondary.field}
            </span>
            <span className={cn(
              'px-1.5 py-0.5 rounded text-xs font-medium',
              sort.secondary.direction === 'asc' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            )}>
              {sort.secondary.direction === 'asc' ? '↑' : '↓'}
            </span>
            <button
              onClick={() => onChange({ ...sort, secondary: undefined })}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              title="Remove secondary sort"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Sort Presets */}
      {showPresets && (
        <motion.div
          variants={containerVariants}
          className="space-y-2"
        >
          <h4 className="text-sm font-medium text-gray-700">Quick Sort</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePresetSort('updatedAt', 'desc')}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors duration-200',
                sort.field === 'updatedAt' && sort.direction === 'desc'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              )}
            >
              🔄 Recently Updated
            </button>
            <button
              onClick={() => handlePresetSort('createdAt', 'desc')}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors duration-200',
                sort.field === 'createdAt' && sort.direction === 'desc'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              )}
            >
              ✨ Recently Created
            </button>
            <button
              onClick={() => handlePresetSort('title', 'asc')}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors duration-200',
                sort.field === 'title' && sort.direction === 'asc'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              )}
            >
              📝 Alphabetical
            </button>
            <button
              onClick={() => handlePresetSort('startDate', 'desc')}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors duration-200',
                sort.field === 'startDate' && sort.direction === 'desc'
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              )}
            >
              📅 Newest First
            </button>
            <button
              onClick={() => handlePresetSort('teamSize', 'desc')}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg transition-colors duration-200',
                sort.field === 'teamSize' && sort.direction === 'desc'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
              )}
            >
              👥 Largest Team
            </button>
          </div>
        </motion.div>
      )}

      {/* Sort Info */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Sort Information</span>
        </div>
        <p>
          Currently sorting by <strong>{currentFieldLabel}</strong> in{' '}
          <strong>{sort.direction === 'asc' ? 'ascending' : 'descending'}</strong> order.
          {sort.secondary && (
            <span>
              {' '}Secondary sort by <strong>{sortFieldConfigs[sort.secondary.field]?.label || sort.secondary.field}</strong>.
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
};