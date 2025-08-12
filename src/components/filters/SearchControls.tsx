/**
 * Search Controls Component
 * Advanced search functionality for project achievement cards
 */

'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';

import { SearchOptions, SearchField } from '../../types/interaction';
import { cn } from '../../utils/cn';

// Search field configurations
const searchFieldConfigs: Record<SearchField, { label: string; icon: string; placeholder: string }> = {
  title: { label: 'Title', icon: '📝', placeholder: 'Search project titles...' },
  description: { label: 'Description', icon: '📄', placeholder: 'Search descriptions...' },
  tags: { label: 'Tags', icon: '🏷️', placeholder: 'Search tags...' },
  technologies: { label: 'Technologies', icon: '🔧', placeholder: 'Search technologies...' },
  teamMembers: { label: 'Team Members', icon: '👥', placeholder: 'Search team members...' },
  category: { label: 'Category', icon: '📁', placeholder: 'Search categories...' },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const suggestionVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.15,
    },
  },
};


export const SearchControls: React.FC<import('../../types/components').SearchProps> = ({
  query,
  placeholder = 'Search projects...',
  showFilters = true,
  showSuggestions: showSuggestionsProp = true,
  debounceDelay = 300,
  className,
  onChange,
  onClear,
}) => {
  const [localQuery, setLocalQuery] = useState(query);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFields, setSelectedFields] = useState<SearchField[]>(['title', 'description']);
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    query: '',
    fields: ['title', 'description'],
    fuzzy: true,
    caseSensitive: false,
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestionsState] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== query) {
        onChange(localQuery);
      }
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [localQuery, query, onChange, debounceDelay]);

  // Update local query when prop changes
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Mock suggestions (in real app, this would come from API or search index)
  const mockSuggestions = useMemo(() => [
    'React', 'TypeScript', 'Node.js', 'E-commerce', 'Mobile App',
    'API Gateway', 'Machine Learning', 'Web Development', 'Frontend',
    'Backend', 'Full Stack', 'Database', 'Authentication', 'Payment',
  ], []);

  // Filter suggestions based on query
  const filteredSuggestions = useMemo(() => {
    if (!localQuery || localQuery.length < 2) return [];
    
    return mockSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(localQuery.toLowerCase()) &&
        suggestion.toLowerCase() !== localQuery.toLowerCase()
      )
      .slice(0, 5);
  }, [localQuery, mockSuggestions]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    setShowSuggestionsState(value.length > 0 && showSuggestionsProp);
  }, [showSuggestionsProp]);

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    setShowSuggestionsState(localQuery.length > 0 && showSuggestionsProp);
  }, [localQuery, showSuggestionsProp]);

  // Handle input blur
  const handleInputBlur = useCallback(() => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestionsState(false), 200);
  }, []);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setLocalQuery(suggestion);
    onChange(suggestion);
    setShowSuggestionsState(false);
  }, [onChange]);

  // Handle clear
  const handleClear = useCallback(() => {
    setLocalQuery('');
    onChange('');
    onClear?.();
    setShowSuggestionsState(false);
  }, [onChange, onClear]);

  // Handle field toggle
  const handleFieldToggle = useCallback((field: SearchField) => {
    setSelectedFields(prev => {
      const newFields = prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field];
      
      setSearchOptions(prevOptions => ({
        ...prevOptions,
        fields: newFields,
      }));
      
      return newFields;
    });
  }, []);

  // Handle search options change
  const handleOptionsChange = useCallback((key: keyof SearchOptions, value: any) => {
    setSearchOptions(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Get current placeholder
  const getCurrentPlaceholder = () => {
    if (selectedFields.length === 0) return placeholder;
    if (selectedFields.length === 1) {
      return searchFieldConfigs[selectedFields[0]].placeholder;
    }
    return `Search in ${selectedFields.length} fields...`;
  };

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-4', className)}
    >
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Search</h3>
        {showFilters && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900',
              'border border-gray-300 rounded-lg hover:bg-gray-50',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
          >
            {isExpanded ? 'Simple' : 'Advanced'}
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            type="text"
            value={localQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={getCurrentPlaceholder()}
            className={cn(
              'w-full pl-10 pr-12 py-3 text-sm',
              'border border-gray-300 rounded-lg',
              'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'transition-all duration-200',
              localQuery && 'pr-20'
            )}
          />

          {/* Clear Button */}
          {localQuery && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {showSuggestionsProp && filteredSuggestions.length > 0 && (
            <m.div
              variants={suggestionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'absolute top-full left-0 right-0 mt-2 z-10',
                'bg-white border border-gray-200 rounded-lg shadow-lg',
                'max-h-48 overflow-y-auto'
              )}
            >
              <div className="py-2">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      'w-full px-4 py-2 text-left text-sm',
                      'hover:bg-gray-50 transition-colors duration-200',
                      'focus:outline-none focus:bg-blue-50 focus:text-blue-700'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Fields Selection */}
      {selectedFields.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFields.map(field => (
            <span
              key={field}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            >
              <span>{searchFieldConfigs[field].icon}</span>
              <span>{searchFieldConfigs[field].label}</span>
            </span>
          ))}
        </div>
      )}

      {/* Advanced Search Options */}
      <AnimatePresence>
        {isExpanded && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 p-4 bg-gray-50 rounded-lg"
          >
            {/* Search Fields */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Search In</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(searchFieldConfigs).map(([field, config]) => (
                  <label
                    key={field}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(field as SearchField)}
                      onChange={() => handleFieldToggle(field as SearchField)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {config.icon} {config.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Search Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchOptions.fuzzy}
                  onChange={(e) => handleOptionsChange('fuzzy', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Fuzzy Search</span>
                <span className="text-xs text-gray-500">(matches similar words)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchOptions.caseSensitive}
                  onChange={(e) => handleOptionsChange('caseSensitive', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Case Sensitive</span>
                <span className="text-xs text-gray-500">(exact case matching)</span>
              </label>
            </div>

            {/* Search Tips */}
              <div className="text-xs text-gray-500 space-y-1">
              <div className="font-medium">Search Tips:</div>
                <div>• Use quotes for exact phrases: &quot;machine learning&quot;</div>
              <div>• Use OR for alternatives: React OR Vue</div>
                <div>• Use - to exclude: JavaScript -jQuery</div>
                <div>• Use * for wildcards: develop*</div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Search Results Info */}
      {localQuery && (
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Searching for &quot;<strong>{localQuery}</strong>&quot; in{' '}
              {selectedFields.length === 1 
                ? searchFieldConfigs[selectedFields[0]].label.toLowerCase()
                : `${selectedFields.length} fields`
              }
              {searchOptions.fuzzy && ' (fuzzy)'}
              {searchOptions.caseSensitive && ' (case sensitive)'}
            </span>
          </div>
        </m.div>
      )}
    </m.div>
  );
};