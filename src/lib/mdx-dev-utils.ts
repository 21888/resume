/**
 * Development utilities for MDX content management
 * These utilities are only available in development mode
 */

import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export interface ContentTemplate {
  section: string;
  title: string;
  template: string;
}

/**
 * Default templates for different content sections
 */
export const CONTENT_TEMPLATES: Record<string, ContentTemplate> = {
  about: {
    section: 'about',
    title: 'About Me',
    template: `# About Me

## Contents

## Introduction

Write your introduction here...

## Core Values

### Value 1
Description of your first core value.

### Value 2
Description of your second core value.

### Value 3
Description of your third core value.

## Professional Philosophy

Your professional philosophy and approach to work...

## What Drives Me

What motivates you in your professional life...
`,
  },
  experience: {
    section: 'experience',
    title: 'Professional Experience',
    template: `# Professional Experience

## Contents

## Current Position | Company Name
**Duration**: Start Date - Present  
**Tech Stack**: Technology, Stack, Here

### Project Overview
Brief description of your current role and main project...

### Key Achievements
- Achievement 1
- Achievement 2
- Achievement 3

### Technical Responsibilities
- Responsibility 1
- Responsibility 2
- Responsibility 3

---

## Previous Position | Previous Company
**Duration**: Start Date - End Date  
**Tech Stack**: Technology, Stack, Here

### Project Overview
Brief description of your previous role...

### Key Achievements
- Achievement 1
- Achievement 2
- Achievement 3
`,
  },
  skills: {
    section: 'skills',
    title: 'Technical Skills & Expertise',
    template: `# Technical Skills & Expertise

## Contents

## Core Technical Competencies

Overview of your technical expertise...

## Programming Languages & Frameworks

### Frontend Development
**Proficiency Level: X/10** | **Experience: X years**

- **Technology 1**: Description and experience
- **Technology 2**: Description and experience
- **Technology 3**: Description and experience

### Backend Development
**Proficiency Level: X/10** | **Experience: X years**

- **Technology 1**: Description and experience
- **Technology 2**: Description and experience
- **Technology 3**: Description and experience

## Tools & Technologies

### Development Tools
List of tools you use regularly...

### Cloud & Infrastructure
Your cloud and infrastructure experience...

## Continuous Learning

How you stay current with technology...
`,
  },
};

/**
 * Create a new MDX content file from template
 */
export function createContentFromTemplate(section: string, customContent?: string): boolean {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Content creation is only available in development mode');
    return false;
  }

  try {
    const sectionDir = path.join(CONTENT_DIR, section);
    const filePath = path.join(sectionDir, 'index.mdx');

    // Create directory if it doesn't exist
    if (!fs.existsSync(sectionDir)) {
      fs.mkdirSync(sectionDir, { recursive: true });
    }

    // Don't overwrite existing files
    if (fs.existsSync(filePath)) {
      console.warn(`Content file already exists: ${filePath}`);
      return false;
    }

    // Use custom content or template
    const content = customContent || CONTENT_TEMPLATES[section]?.template || `# ${section}\n\nContent for ${section} section...`;

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created content file: ${filePath}`);
    return true;

  } catch (error) {
    console.error(`Error creating content file for section "${section}":`, error);
    return false;
  }
}

/**
 * Backup existing content files
 */
export function backupContent(): string | null {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Content backup is only available in development mode');
    return null;
  }

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), 'backups', `content-${timestamp}`);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Copy all content files
    const sections = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    sections.forEach(section => {
      const sourceFile = path.join(CONTENT_DIR, section, 'index.mdx');
      const targetFile = path.join(backupDir, `${section}.mdx`);

      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
      }
    });

    console.log(`Content backed up to: ${backupDir}`);
    return backupDir;

  } catch (error) {
    console.error('Error backing up content:', error);
    return null;
  }
}

/**
 * Validate MDX syntax in content files
 */
export async function validateMDXSyntax(): Promise<{ valid: boolean; errors: Record<string, string> }> {
  const errors: Record<string, string> = {};

  try {
    const sections = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const section of sections) {
      const filePath = path.join(CONTENT_DIR, section, 'index.mdx');
      
      if (!fs.existsSync(filePath)) {
        errors[section] = 'File does not exist';
        continue;
      }

      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Basic syntax validation
        if (content.trim().length === 0) {
          errors[section] = 'File is empty';
          continue;
        }

        // Check for common MDX issues
        if (content.includes('```') && !content.match(/```[\s\S]*?```/g)) {
          errors[section] = 'Unclosed code block detected';
          continue;
        }

        // Check for balanced JSX tags (basic check)
        const openTags = (content.match(/<[^/][^>]*>/g) || []).length;
        const closeTags = (content.match(/<\/[^>]*>/g) || []).length;
        const selfClosingTags = (content.match(/<[^>]*\/>/g) || []).length;
        
        if (openTags !== closeTags + selfClosingTags) {
          errors[section] = 'Potentially unbalanced JSX tags';
        }

      } catch (error) {
        errors[section] = error instanceof Error ? error.message : 'Unknown parsing error';
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };

  } catch (error) {
    return {
      valid: false,
      errors: { system: error instanceof Error ? error.message : 'System error' },
    };
  }
}

/**
 * Get content statistics for development dashboard
 */
export function getContentDevStats() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  try {
    const sections = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const stats = sections.map(section => {
      const filePath = path.join(CONTENT_DIR, section, 'index.mdx');
      const exists = fs.existsSync(filePath);
      
      let wordCount = 0;
      let lineCount = 0;
      let headingCount = 0;
      let size = 0;
      let lastModified = null;

      if (exists) {
        const stat = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        
        size = stat.size;
        lastModified = stat.mtime;
        wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
        lineCount = content.split('\n').length;
        headingCount = (content.match(/^#+\s/gm) || []).length;
      }

      return {
        section,
        exists,
        size,
        wordCount,
        lineCount,
        headingCount,
        lastModified,
        path: filePath,
      };
    });

    return {
      sections: stats,
      summary: {
        totalSections: stats.length,
        existingSections: stats.filter(s => s.exists).length,
        totalWords: stats.reduce((sum, s) => sum + s.wordCount, 0),
        totalSize: stats.reduce((sum, s) => sum + s.size, 0),
      },
    };

  } catch (error) {
    console.error('Error getting content dev stats:', error);
    return null;
  }
}