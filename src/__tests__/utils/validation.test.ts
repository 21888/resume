/**
 * Validation Utilities Tests
 * Test suite for data validation functions
 */

import { validateProjectAchievement, validateProjectList } from '../../utils/validation';
import { ProjectAchievement } from '../../types/project-achievement';

describe('validateProjectAchievement', () => {
  const validProject: ProjectAchievement = {
    id: 'test-project',
    title: 'Test Project',
    description: 'This is a valid test project with sufficient description length',
    category: 'web',
    status: 'completed',
    timeline: {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-06-01'),
      duration: '5 months',
      isOngoing: false,
      milestones: [],
    },
    metrics: {
      primary: [
        {
          id: 'test-metric',
          label: 'Test Metric',
          value: 100,
          type: 'number',
        },
      ],
      kpis: [],
    },
    team: [
      {
        id: 'test-member',
        name: 'Test Member',
        role: 'Developer',
      },
    ],
    technologies: [
      {
        id: 'react',
        name: 'React',
        category: 'frontend',
      },
    ],
    tags: ['test'],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-06-01'),
  };

  it('validates a correct project successfully', () => {
    const result = validateProjectAchievement(validProject);
    
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('fails validation for missing required fields', () => {
    const invalidProject = { ...validProject };
    delete (invalidProject as any).title;
    
    const result = validateProjectAchievement(invalidProject);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'title',
        rule: 'required',
      })
    );
  });

  it('validates string length constraints', () => {
    const invalidProject = {
      ...validProject,
      title: '', // Too short
      description: 'Short', // Too short
    };
    
    const result = validateProjectAchievement(invalidProject);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'title',
        rule: 'minLength',
      })
    );
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'description',
        rule: 'minLength',
      })
    );
  });

  it('validates enum values', () => {
    const invalidProject = {
      ...validProject,
      category: 'invalid-category',
      status: 'invalid-status',
    };
    
    const result = validateProjectAchievement(invalidProject);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'category',
        rule: 'enum',
      })
    );
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'status',
        rule: 'enum',
      })
    );
  });

  it('validates date consistency', () => {
    const invalidProject = {
      ...validProject,
      timeline: {
        ...validProject.timeline,
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-01-01'), // End before start
      },
    };
    
    const result = validateProjectAchievement(invalidProject);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'timeline.endDate',
        rule: 'logical',
      })
    );
  });

  it('validates array constraints', () => {
    const invalidProject = {
      ...validProject,
      team: [], // Empty team
      technologies: [], // Empty technologies
    };
    
    const result = validateProjectAchievement(invalidProject);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'team',
        rule: 'minItems',
      })
    );
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'technologies',
        rule: 'minItems',
      })
    );
  });

  it('generates warnings for logical inconsistencies', () => {
    const projectWithWarnings = {
      ...validProject,
      status: 'ongoing' as const,
      timeline: {
        ...validProject.timeline,
        isOngoing: false, // Inconsistent with status
      },
    };
    
    const result = validateProjectAchievement(projectWithWarnings);
    
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings).toContainEqual(
      expect.objectContaining({
        field: 'status',
        message: expect.stringContaining('ongoing'),
      })
    );
  });
});

describe('validateProjectList', () => {
  const validProjects = [
    {
      id: 'project-1',
      title: 'Project 1',
      description: 'First test project with sufficient description',
      category: 'web',
      status: 'completed',
      timeline: {
        startDate: new Date('2023-01-01'),
        duration: '5 months',
        isOngoing: false,
        milestones: [],
      },
      metrics: { primary: [], kpis: [] },
      team: [{ id: '1', name: 'Member 1', role: 'Developer' }],
      technologies: [{ id: 'react', name: 'React', category: 'frontend' }],
      tags: ['test'],
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-06-01'),
    },
    {
      id: 'project-2',
      title: 'Project 2',
      description: 'Second test project with sufficient description',
      category: 'mobile',
      status: 'ongoing',
      timeline: {
        startDate: new Date('2023-02-01'),
        duration: '3 months',
        isOngoing: true,
        milestones: [],
      },
      metrics: { primary: [], kpis: [] },
      team: [{ id: '2', name: 'Member 2', role: 'Designer' }],
      technologies: [{ id: 'react-native', name: 'React Native', category: 'frontend' }],
      tags: ['mobile'],
      createdAt: new Date('2023-02-01'),
      updatedAt: new Date('2023-06-01'),
    },
  ];

  it('validates a list of correct projects', () => {
    const result = validateProjectList(validProjects);
    
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('detects duplicate project IDs', () => {
    const duplicateProjects = [
      validProjects[0],
      { ...validProjects[1], id: 'project-1' }, // Duplicate ID
    ];
    
    const result = validateProjectList(duplicateProjects);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'projects[1].id',
        rule: 'unique',
      })
    );
  });

  it('validates individual projects in the list', () => {
    const invalidProjects = [
      validProjects[0],
      { ...validProjects[1], title: '' }, // Invalid title
    ];
    
    const result = validateProjectList(invalidProjects);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'projects[1].title',
        rule: 'minLength',
      })
    );
  });

  it('handles non-array input', () => {
    const result = validateProjectList('not-an-array' as any);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'root',
        rule: 'type',
      })
    );
  });
});