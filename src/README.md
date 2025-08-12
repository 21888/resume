# Project Achievement Cards

A comprehensive React component library for displaying project achievements with advanced filtering, sorting, and interactive features.

## Features

- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🔍 **Advanced Filtering**: Multi-criteria filtering with real-time search
- 📊 **Rich Data Display**: Metrics, timelines, team information, and more
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 📱 **Responsive**: Works seamlessly across all device sizes
- 🎭 **Animations**: Smooth Framer Motion animations with reduced motion support
- 🧪 **TypeScript**: 100% type coverage for better developer experience

## Quick Start

```tsx
import { ProjectAchievementCards, AnimationProvider } from './src';

function App() {
  return (
    <AnimationProvider>
      <ProjectAchievementCards
        projects={yourProjects}
        onProjectSelect={(project) => console.log(project)}
      />
    </AnimationProvider>
  );
}
```

## Components

### Core Components
- `AchievementCard` - Individual project card
- `ProjectAchievementCards` - Main container component
- `CardHeader` - Project title and status
- `CardContent` - Description and technologies
- `CardMetrics` - Performance metrics and KPIs
- `CardTeam` - Team member display
- `CardTimeline` - Project timeline and milestones

### Filter Components
- `FilterControls` - Advanced filtering interface
- `SortControls` - Sorting options
- `SearchControls` - Real-time search

### Expandable Components
- `ExpandableSection` - Collapsible content sections
- `DetailedProjectView` - Full project details

## Data Structure

Projects should follow the `ProjectAchievement` interface:

```typescript
interface ProjectAchievement {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'infrastructure' | 'research';
  status: 'completed' | 'ongoing' | 'paused' | 'cancelled';
  timeline: ProjectTimeline;
  metrics: ProjectMetrics;
  team: TeamMember[];
  technologies: Technology[];
  tags: string[];
  // ... more fields
}
```

## Customization

The library supports extensive customization through:
- CSS classes and Tailwind CSS
- Animation configurations
- Responsive breakpoints
- Theme variables
- Component variants

## Accessibility

- Full keyboard navigation
- Screen reader support
- ARIA labels and live regions
- High contrast mode support
- Reduced motion preferences

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - see LICENSE file for details.