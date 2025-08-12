/**
 * Achievement Card Component Tests
 * Comprehensive test suite for the AchievementCard component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AchievementCard } from '../../components/AchievementCard';
import { ProjectAchievement } from '../../types/project-achievement';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock project data
const mockProject: ProjectAchievement = {
  id: 'test-project',
  title: 'Test Project',
  description: 'This is a test project description',
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
        unit: 'units',
      },
    ],
    kpis: [],
  },
  team: [
    {
      id: 'test-member',
      name: 'Test Member',
      role: 'Developer',
      isLead: true,
    },
  ],
  technologies: [
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
    },
  ],
  tags: ['test', 'project'],
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-06-01'),
};

describe('AchievementCard', () => {
  const defaultProps = {
    project: mockProject,
  };

  it('renders project title and description', () => {
    render(<AchievementCard {...defaultProps} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('displays project category and status badges', () => {
    render(<AchievementCard {...defaultProps} />);
    
    expect(screen.getByText('web')).toBeInTheDocument();
    expect(screen.getByText('completed')).toBeInTheDocument();
  });

  it('shows team members when showTeam is true', () => {
    render(<AchievementCard {...defaultProps} showTeam={true} />);
    
    expect(screen.getByText('Test Member')).toBeInTheDocument();
  });

  it('hides team members when showTeam is false', () => {
    render(<AchievementCard {...defaultProps} showTeam={false} />);
    
    expect(screen.queryByText('Test Member')).not.toBeInTheDocument();
  });

  it('displays technologies when showTechnologies is true', () => {
    render(<AchievementCard {...defaultProps} showTechnologies={true} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('calls onCardClick when card is clicked', () => {
    const mockOnCardClick = jest.fn();
    const actions = { onCardClick: mockOnCardClick };
    
    render(<AchievementCard {...defaultProps} actions={actions} />);
    
    fireEvent.click(screen.getByRole('article'));
    expect(mockOnCardClick).toHaveBeenCalledWith(mockProject);
  });

  it('handles expand/collapse functionality', () => {
    const mockOnExpand = jest.fn();
    
    render(<AchievementCard {...defaultProps} onExpand={mockOnExpand} />);
    
    const expandButton = screen.getByLabelText(/expand card/i);
    fireEvent.click(expandButton);
    
    expect(mockOnExpand).toHaveBeenCalledWith(true);
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(<AchievementCard {...defaultProps} variant="compact" />);
    
    let card = screen.getByRole('article');
    expect(card).toHaveClass('p-4'); // Compact padding
    
    rerender(<AchievementCard {...defaultProps} variant="detailed" />);
    card = screen.getByRole('article');
    expect(card).toHaveClass('p-8'); // Detailed padding
  });

  it('shows selected state when isSelected is true', () => {
    render(<AchievementCard {...defaultProps} isSelected={true} />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveClass('ring-2', 'ring-blue-500');
  });

  it('handles keyboard navigation', () => {
    const mockOnCardClick = jest.fn();
    const actions = { onCardClick: mockOnCardClick };
    
    render(<AchievementCard {...defaultProps} actions={actions} />);
    
    const card = screen.getByRole('article');
    fireEvent.keyDown(card, { key: 'Enter' });
    
    expect(mockOnCardClick).toHaveBeenCalledWith(mockProject);
  });

  it('displays metrics when showMetrics is true', () => {
    render(<AchievementCard {...defaultProps} showMetrics={true} />);
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('handles image loading errors gracefully', async () => {
    const projectWithImage = {
      ...mockProject,
      images: [
        {
          id: 'test-image',
          url: 'invalid-url',
          alt: 'Test image',
          type: 'screenshot' as const,
        },
      ],
    };
    
    render(<AchievementCard project={projectWithImage} />);
    
    const image = screen.getByAltText('Test image');
    fireEvent.error(image);
    
    // Image should be hidden after error
    await waitFor(() => {
      expect(image).not.toBeVisible();
    });
  });
});

describe('AchievementCard Accessibility', () => {
  it('has proper ARIA labels', () => {
    render(<AchievementCard project={mockProject} />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label', 'Project: Test Project');
  });

  it('supports keyboard navigation', () => {
    render(<AchievementCard project={mockProject} />);
    
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('has proper focus management', () => {
    render(<AchievementCard project={mockProject} />);
    
    const card = screen.getByRole('article');
    card.focus();
    
    expect(document.activeElement).toBe(card);
  });
});