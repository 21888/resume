/**
 * Complete Project Achievement Cards Example
 * Comprehensive example showcasing all features and components
 */

'use client';

import React, { useState, useCallback } from 'react';
import { ProjectAchievementCards } from '../components/ProjectAchievementCards';
import { FilterControls, SortControls, SearchControls } from '../components/filters';
import { DetailedProjectView } from '../components/expandable';
import { AnimationProvider } from '../contexts/AnimationContext';
import { ProjectAchievement } from '../types/project-achievement';
import { FilterOptions, SortOptions } from '../types/interaction';
import { useKeyboardNavigation } from '../hooks';
import { loadProjectsFromFile } from '../utils';

// Sample projects data
const sampleProjects: ProjectAchievement[] = [
  // This would typically be loaded from your data source
  // Using the sample data from sample-projects.json
];

export const CompleteExample: React.FC = () => {
  const [projects, setProjects] = useState<ProjectAchievement[]>(sampleProjects);
  const [filteredProjects, setFilteredProjects] = useState<ProjectAchievement[]>(sampleProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectAchievement | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);
  
  // Filter and sort state
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSortOptions] = useState<SortOptions>({
    field: 'updatedAt',
    direction: 'desc',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Accessibility placeholders for example (avoid missing hook types)
  const announce = (message: string, _priority?: 'polite' | 'assertive') => {
    console.log('[announce]', message);
  };
  const getAccessibilityClasses = () => '';

  useKeyboardNavigation({
    enabled: true,
    onEscape: () => {
      if (showDetailView) {
        setShowDetailView(false);
        announce('Detail view closed', 'polite');
      }
    },
  });

  // Get available filter options
  const availableCategories = [...new Set(projects.map(p => p.category))];
  const availableStatuses = [...new Set(projects.map(p => p.status))];
  const availableTechnologies = [...new Set(projects.flatMap(p => p.technologies.map(t => t.name)))];
  const availableTags = [...new Set(projects.flatMap(p => p.tags))];

  // Available sort fields
  const availableSortFields = [
    { key: 'title', label: 'Title', icon: '📝' },
    { key: 'startDate', label: 'Start Date', icon: '📅' },
    { key: 'endDate', label: 'End Date', icon: '🏁' },
    { key: 'duration', label: 'Duration', icon: '⏱️' },
    { key: 'teamSize', label: 'Team Size', icon: '👥' },
    { key: 'category', label: 'Category', icon: '📁' },
    { key: 'status', label: 'Status', icon: '📊' },
    { key: 'updatedAt', label: 'Last Updated', icon: '🔄' },
    { key: 'createdAt', label: 'Created', icon: '✨' },
  ];

  // Apply filters, search, and sort
  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...projects];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.technologies.some(tech => tech.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.category?.length) {
      filtered = filtered.filter(p => filters.category!.includes(p.category));
    }
    if (filters.status?.length) {
      filtered = filtered.filter(p => filters.status!.includes(p.status));
    }
    if (filters.technologies?.length) {
      filtered = filtered.filter(p =>
        p.technologies.some(tech => filters.technologies!.includes(tech.name))
      );
    }
    if (filters.tags?.length) {
      filtered = filtered.filter(p =>
        p.tags.some(tag => filters.tags!.includes(tag))
      );
    }
    if (filters.hasMetrics !== undefined) {
      filtered = filtered.filter(p => 
        filters.hasMetrics ? p.metrics.primary.length > 0 : p.metrics.primary.length === 0
      );
    }
    if (filters.hasTeam !== undefined) {
      filtered = filtered.filter(p => 
        filters.hasTeam ? p.team.length > 0 : p.team.length === 0
      );
    }
    if (filters.teamSize) {
      const [min, max] = filters.teamSize;
      filtered = filtered.filter(p => p.team.length >= min && p.team.length <= max);
    }

    // Apply sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sort.field) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'startDate':
          aValue = a.timeline.startDate.getTime();
          bValue = b.timeline.startDate.getTime();
          break;
        case 'endDate':
          aValue = a.timeline.endDate?.getTime() || 0;
          bValue = b.timeline.endDate?.getTime() || 0;
          break;
        case 'teamSize':
          aValue = a.team.length;
          bValue = b.team.length;
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'updatedAt':
          aValue = a.updatedAt.getTime();
          bValue = b.updatedAt.getTime();
          break;
        case 'createdAt':
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        default:
          aValue = a.updatedAt.getTime();
          bValue = b.updatedAt.getTime();
      }

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredProjects(filtered);
    
    // Announce results
    announce(`Showing ${filtered.length} of ${projects.length} projects`, 'polite');
  }, [projects, searchQuery, filters, sort, announce]);

  // Apply filters whenever dependencies change
  React.useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  // Handle project selection
  const handleProjectSelect = useCallback((project: ProjectAchievement) => {
    setSelectedProject(project);
    setShowDetailView(true);
    announce(`Opened details for ${project.title}`, 'assertive');
  }, [announce]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  // Handle filter reset
  const handleFilterReset = useCallback(() => {
    setFilters({});
    setSearchQuery('');
    announce('Filters cleared', 'polite');
  }, [announce]);

  // Handle sort changes
  const handleSortChange = useCallback((newSort: SortOptions) => {
    setSortOptions(newSort);
  }, []);

  // Handle search changes
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle search clear
  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
    announce('Search cleared', 'polite');
  }, [announce]);

  return (
    <AnimationProvider>
      <div 
        className={`min-h-screen bg-gray-50 ${getAccessibilityClasses()}`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Project Achievement Cards
                </h1>
                <p className="mt-2 text-gray-600">
                  Comprehensive showcase of project achievements with advanced filtering and interactions
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {filteredProjects.length}
                  </div>
                  <div>Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {filteredProjects.filter(p => p.status === 'completed').length}
                  </div>
                  <div>Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {filteredProjects.filter(p => p.status === 'ongoing').length}
                  </div>
                  <div>Ongoing</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showDetailView && selectedProject ? (
            /* Detail View */
            <DetailedProjectView
              project={selectedProject}
              onClose={() => {
                setShowDetailView(false);
                setSelectedProject(null);
              }}
            />
          ) : (
            /* List View */
            <div className="space-y-8">
              {/* Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Search */}
                <SearchControls
                  query={searchQuery}
                  onChange={handleSearchChange}
                  onClear={handleSearchClear}
                  showFilters={true}
                  showSuggestions={true}
                />

                {/* Filters */}
                <FilterControls
                  filters={filters}
                  availableCategories={availableCategories}
                  availableStatuses={availableStatuses}
                  availableTechnologies={availableTechnologies}
                  availableTags={availableTags}
                  onChange={handleFilterChange}
                  onReset={handleFilterReset}
                  showPresets={true}
                  showClearAll={true}
                />

                {/* Sort */}
                <SortControls
                  sort={sort}
                  availableFields={availableSortFields}
                  onChange={handleSortChange}
                  showDirection={true}
                  showPresets={true}
                />
              </div>

              {/* Project Cards */}
              <ProjectAchievementCards
                projects={filteredProjects}
                onProjectSelect={handleProjectSelect}
                showFilters={false} // We have separate filter controls
                showSort={false} // We have separate sort controls
                showSearch={false} // We have separate search controls
                gridColumns={{
                  mobile: 1,
                  tablet: 2,
                  desktop: 3,
                  wide: 4,
                  ultrawide: 5,
                }}
              />
            </div>
          )}
        </main>

        {/* Screen Reader Announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {/* Announcements will be inserted here by the accessibility hook */}
        </div>
      </div>
    </AnimationProvider>
  );
};