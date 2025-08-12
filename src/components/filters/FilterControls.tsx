/**
 * Filter Controls Component
 * Advanced filtering controls for project achievement cards
 */

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterControlsProps } from '../../types/components';
import { FilterOptions } from '../../types/interaction';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

// Filter category configurations
const filterCategories = {
  category: {
    label: 'Category',
    icon: '📁',
    colors: {
      web: 'bg-purple-100 text-purple-800',
      mobile: 'bg-indigo-100 text-indigo-800',
      desktop: 'bg-cyan-100 text-cyan-800',
      api: 'bg-orange-100 text-orange-800',
      infrastructure: 'bg-gray-100 text-gray-800',
      research: 'bg-pink-100 text-pink-800',
    },
  },
  status: {
    label: 'Status',
    icon: '📊',
    colors: {
      completed: 'bg-green-100 text-green-800',
      ongoing: 'bg-blue-100 text-blue-800',
      paused: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
    },
  },
  technologies: {
    label: 'Technologies',
    icon: '🔧',
    colors: {
      default: 'bg-blue-100 text-blue-800',
    },
  },
  tags: {
    label: 'Tags',
    icon: '🏷️',
    colors: {
      default: 'bg-indigo-100 text-indigo-800',
    },
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const filterGroupVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  availableCategories,
  availableStatuses,
  availableTechnologies,
  availableTags,
  showPresets = true,
  showClearAll = true,
  className,
  onChange,
  onReset,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilterGroup, setActiveFilterGroup] = useState<string | null>(null);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category?.length) count += filters.category.length;
    if (filters.status?.length) count += filters.status.length;
    if (filters.technologies?.length) count += filters.technologies.length;
    if (filters.tags?.length) count += filters.tags.length;
    if (filters.hasMetrics !== undefined) count += 1;
    if (filters.hasTeam !== undefined) count += 1;
    if (filters.dateRange) count += 1;
    if (filters.teamSize) count += 1;
    return count;
  }, [filters]);

  // Handle filter change
  const handleFilterChange = useCallback((
    filterType: keyof FilterOptions,
    value: string | boolean | [number, number] | [Date, Date],
    action: 'add' | 'remove' | 'set' = 'set'
  ) => {
    const newFilters = { ...filters };

    switch (filterType) {
      case 'category':
      case 'status':
      case 'technologies':
      case 'tags':
        const currentArray = newFilters[filterType] || [];
        if (action === 'add' && !currentArray.includes(value as string)) {
          newFilters[filterType] = [...currentArray, value as string];
        } else if (action === 'remove') {
          newFilters[filterType] = currentArray.filter(item => item !== value);
        } else if (action === 'set') {
          newFilters[filterType] = [value as string];
        }
        break;
      default:
        newFilters[filterType] = value as any;
    }

    onChange(newFilters);
  }, [filters, onChange]);

  // Handle clear all filters
  const handleClearAll = useCallback(() => {
    onReset?.();
  }, [onReset]);

  // Toggle filter group
  const toggleFilterGroup = useCallback((group: string) => {
    setActiveFilterGroup(activeFilterGroup === group ? null : group);
  }, [activeFilterGroup]);

  // Render filter badges
  const renderFilterBadges = (
    items: string[],
    type: keyof typeof filterCategories,
    onRemove: (item: string) => void
  ) => {
    const config = filterCategories[type];
    
    return (
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item}
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <Badge
              size="medium"
              className={cn(
                'cursor-pointer transition-all duration-200',
                (config.colors as any)[item] || (config.colors as any).default || 'bg-gray-100 text-gray-800',
                'hover:shadow-sm'
              )}
              onClick={() => onRemove(item)}
            >
              <span className="mr-1.5">{config.icon}</span>
              {item}
              <span className="ml-1.5 text-xs opacity-75">×</span>
            </Badge>
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  // Render filter dropdown
  const renderFilterDropdown = (
    type: keyof FilterOptions,
    label: string,
    options: string[],
    selectedValues: string[]
  ) => {
    return (
      <motion.div
        variants={filterGroupVariants}
        className="relative"
      >
        <button
          onClick={() => toggleFilterGroup(type)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 text-sm font-medium',
            'border border-gray-300 rounded-lg',
            'hover:bg-gray-50 transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            activeFilterGroup === type && 'bg-blue-50 border-blue-300 text-blue-700'
          )}
        >
          <span>{filterCategories[type as keyof typeof filterCategories]?.icon}</span>
          <span>{label}</span>
          {selectedValues.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
              {selectedValues.length}
            </span>
          )}
          <svg
            className={cn(
              'w-4 h-4 transition-transform duration-200',
              activeFilterGroup === type && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {activeFilterGroup === type && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'absolute top-full left-0 mt-2 w-64 max-h-64 overflow-y-auto',
                'bg-white border border-gray-200 rounded-lg shadow-lg z-10',
                'p-2'
              )}
            >
              <div className="space-y-1">
                {options.map((option) => (
                  <label
                    key={option}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer',
                      'hover:bg-gray-50 transition-colors duration-200',
                      selectedValues.includes(option) && 'bg-blue-50 text-blue-700'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange(type, option, 'add');
                        } else {
                          handleFilterChange(type, option, 'remove');
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900',
              'border border-gray-300 rounded-lg hover:bg-gray-50',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>

          {showClearAll && activeFilterCount > 0 && (
            <button
              onClick={handleClearAll}
              className={cn(
                'px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700',
                'border border-red-300 rounded-lg hover:bg-red-50',
                'transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              )}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <motion.div
          variants={filterGroupVariants}
          className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg"
        >
          {filters.category && renderFilterBadges(
            filters.category,
            'category',
            (item) => handleFilterChange('category', item, 'remove')
          )}
          {filters.status && renderFilterBadges(
            filters.status,
            'status',
            (item) => handleFilterChange('status', item, 'remove')
          )}
          {filters.technologies && renderFilterBadges(
            filters.technologies,
            'technologies',
            (item) => handleFilterChange('technologies', item, 'remove')
          )}
          {filters.tags && renderFilterBadges(
            filters.tags,
            'tags',
            (item) => handleFilterChange('tags', item, 'remove')
          )}
        </motion.div>
      )}

      {/* Filter Controls */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Main Filter Dropdowns */}
            <div className="flex flex-wrap gap-3">
              {renderFilterDropdown('category', 'Category', availableCategories, filters.category || [])}
              {renderFilterDropdown('status', 'Status', availableStatuses, filters.status || [])}
              {renderFilterDropdown('technologies', 'Technologies', availableTechnologies, filters.technologies || [])}
              {renderFilterDropdown('tags', 'Tags', availableTags, filters.tags || [])}
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              {/* Has Metrics Filter */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasMetrics === true}
                  onChange={(e) => handleFilterChange('hasMetrics', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Has Metrics</span>
              </label>

              {/* Has Team Filter */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasTeam === true}
                  onChange={(e) => handleFilterChange('hasTeam', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Has Team</span>
              </label>

              {/* Team Size Range */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Team Size</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    placeholder="Min"
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => {
                      const min = parseInt(e.target.value) || 1;
                      const max = filters.teamSize?.[1] || 50;
                      handleFilterChange('teamSize', [min, max]);
                    }}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    placeholder="Max"
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => {
                      const min = filters.teamSize?.[0] || 1;
                      const max = parseInt(e.target.value) || 50;
                      handleFilterChange('teamSize', [min, max]);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Filter Presets */}
            {showPresets && (
              <motion.div
                variants={filterGroupVariants}
                className="space-y-2"
              >
                <h4 className="text-sm font-medium text-gray-700">Quick Filters</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onChange({ status: ['completed'] })}
                    className="px-3 py-1.5 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors duration-200"
                  >
                    ✅ Completed Projects
                  </button>
                  <button
                    onClick={() => onChange({ status: ['ongoing'] })}
                    className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                  >
                    🔄 Ongoing Projects
                  </button>
                  <button
                    onClick={() => onChange({ category: ['web'] })}
                    className="px-3 py-1.5 text-sm bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                  >
                    🌐 Web Projects
                  </button>
                  <button
                    onClick={() => onChange({ hasMetrics: true })}
                    className="px-3 py-1.5 text-sm bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors duration-200"
                  >
                    📊 With Metrics
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};