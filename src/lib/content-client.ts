import { MDXContent, TOCItem } from './mdx';

/**
 * Client-side content fetching library
 * Uses the API routes to fetch content instead of direct file system access
 */

/**
 * Get MDX content for a specific section - client-side
 */
export async function getContentFromAPI(section: string): Promise<MDXContent | null> {
  try {
    const response = await fetch(`/api/content/${section}`);
    
    if (!response.ok) {
      console.warn(`Content not found for section: ${section}`);
      return getMockContent(section);
    }
    
    const data = await response.json();
    
    if (!data.success || !data.content) {
      console.warn(`Invalid response for section: ${section}`, data);
      return getMockContent(section);
    }
    
    // Import React dynamically for client-side
    const React = await import('react');
    
    // Create React element from the processed HTML (if provided)
    const content = React.createElement('div', {
      dangerouslySetInnerHTML: { 
        __html: data.content.html || '<p>Content loading...</p>' 
      }
    });

    return {
      content,
      frontmatter: data.content.frontmatter || {},
      tableOfContents: data.content.tableOfContents || [],
    };
  } catch (error) {
    console.error(`Error fetching content for section "${section}":`, error);
    return getMockContent(section);
  }
}

/**
 * Get mock content for development/testing
 */
async function getMockContent(section: string): Promise<MDXContent | null> {
  const mockContent = {
    about: {
      content: `# About Me\n\nI'm a passionate developer with expertise in modern web technologies. I specialize in creating scalable, user-focused applications that solve real-world problems.\n\n## My Approach\n\nI believe in clean code, continuous learning, and collaborative development. My goal is to build software that not only works well but also provides exceptional user experiences.`,
      frontmatter: { title: 'About', order: 1 },
      tableOfContents: [
        { id: 'my-approach', title: 'My Approach', level: 2 }
      ]
    },
    experience: {
      content: `# Experience\n\n## Senior Frontend Developer\n**Tech Corp** - 2022 to Present\n\nLeading frontend development for a SaaS platform serving 100K+ users. Architected scalable React applications, implemented comprehensive testing strategies, and mentored junior developers.\n\n### Key Achievements\n- Reduced page load times by 40% through optimization\n- Led migration from legacy jQuery to modern React stack\n- Established CI/CD pipeline reducing deployment time by 60%\n\n## Frontend Developer\n**StartupXYZ** - 2020 to 2022\n\nDeveloped responsive web applications using React, TypeScript, and Node.js. Collaborated with cross-functional teams to deliver features that increased user engagement by 35%.`,
      frontmatter: { title: 'Experience', order: 2 },
      tableOfContents: [
        { id: 'senior-frontend-developer', title: 'Senior Frontend Developer', level: 2 },
        { id: 'frontend-developer', title: 'Frontend Developer', level: 2 }
      ]
    },
    skills: {
      content: `# Skills\n\n## Technical Skills\n\n### Frontend\n- **React / Next.js** - Advanced\n- **TypeScript / JavaScript** - Expert\n- **HTML5 / CSS3 / Tailwind** - Expert\n- **State Management (Redux, Zustand)** - Advanced\n\n### Backend\n- **Node.js / Express** - Intermediate\n- **PostgreSQL / MongoDB** - Intermediate\n- **RESTful APIs / GraphQL** - Advanced\n\n### Tools & DevOps\n- **Git / GitHub / GitLab** - Expert\n- **Docker / CI-CD** - Intermediate\n- **AWS / Vercel / Netlify** - Intermediate`,
      frontmatter: { title: 'Skills', order: 3 },
      tableOfContents: [
        { id: 'technical-skills', title: 'Technical Skills', level: 2 },
        { id: 'frontend', title: 'Frontend', level: 3 },
        { id: 'backend', title: 'Backend', level: 3 },
        { id: 'tools-devops', title: 'Tools & DevOps', level: 3 }
      ]
    },
    education: {
      content: `# Education\n\n## Bachelor of Science in Computer Science\n**State University** - 2018\n\n- GPA: 3.8/4.0\n- Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems\n- Capstone Project: Built a full-stack marketplace application using React and Node.js`,
      frontmatter: { title: 'Education', order: 4 },
      tableOfContents: [
        { id: 'bachelor-of-science', title: 'Bachelor of Science in Computer Science', level: 2 }
      ]
    },
    projects: {
      content: `# Projects\n\n## E-commerce Platform\n**React, Node.js, PostgreSQL**\n\nBuilt a scalable e-commerce platform with features including:\n- User authentication and authorization\n- Real-time inventory management\n- Payment processing integration\n- Admin dashboard with analytics\n\n## Task Management App\n**Next.js, TypeScript, Tailwind**\n\nDeveloped a collaborative task management application:\n- Real-time updates using WebSockets\n- Drag-and-drop functionality\n- Team collaboration features\n- Mobile-responsive design`,
      frontmatter: { title: 'Projects', order: 5 },
      tableOfContents: [
        { id: 'e-commerce-platform', title: 'E-commerce Platform', level: 2 },
        { id: 'task-management-app', title: 'Task Management App', level: 2 }
      ]
    }
  };

  const sectionData = mockContent[section as keyof typeof mockContent];
  if (!sectionData) return null;

  const React = await import('react');
  const content = React.createElement('div', {
    dangerouslySetInnerHTML: { __html: sectionData.content.replace(/\n/g, '<br />') }
  });

  return {
    content,
    frontmatter: sectionData.frontmatter,
    tableOfContents: sectionData.tableOfContents,
  };
}

/**
 * Get all available content sections
 */
export function getClientContentSections(): string[] {
  return ['about', 'experience', 'skills', 'education', 'projects'];
}

/**
 * Check if content exists for a given section
 */
export function hasClientContent(section: string): boolean {
  return getClientContentSections().includes(section);
}