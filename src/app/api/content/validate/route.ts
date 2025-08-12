import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import * as fs from 'fs';
import * as path from 'path';

export async function POST() {
  try {
    // Content directories - server-side
    const CONTENT_DIR = path.join(process.cwd(), 'src/content');
    const requiredSections = ['about', 'experience', 'skills'];
    
    // Get all sections
    const sections = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    // Check for missing sections
    const missing = requiredSections.filter(section => 
      !sections.includes(section) || !fs.existsSync(path.join(CONTENT_DIR, section, 'index.mdx'))
    );
    
    const validation = {
      valid: missing.length === 0,
      missing
    };
    
    const stats = sections.map(section => {
      const filePath = path.join(CONTENT_DIR, section, 'index.mdx');
      const exists = fs.existsSync(filePath);
      let size = 0;
      let lastModified = null;

      if (exists) {
        const stat = fs.statSync(filePath);
        size = stat.size;
        lastModified = stat.mtime;
      }

      return {
        section,
        exists,
        size,
        lastModified,
        path: filePath,
      };
    });

    // Additional validation checks
    const additionalChecks = {
      totalSections: stats.length,
      validSections: stats.filter(stat => stat.exists).length,
      totalSize: stats.reduce((sum, stat) => sum + stat.size, 0),
      lastModified: stats.reduce((latest, stat) => {
        if (!stat.lastModified) return latest;
        return !latest || stat.lastModified > latest ? stat.lastModified : latest;
      }, null as Date | null),
    };

    // Check for common issues
    const warnings: string[] = [];
    
    // Check for empty files
    stats.forEach(stat => {
      if (stat.exists && stat.size < 100) {
        warnings.push(`Section "${stat.section}" has very small content (${stat.size} bytes)`);
      }
    });

    // Check for old content
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    stats.forEach(stat => {
      if (stat.exists && stat.lastModified && stat.lastModified < oneWeekAgo) {
        warnings.push(`Section "${stat.section}" hasn't been updated in over a week`);
      }
    });

    return NextResponse.json({
      success: true,
      validation: {
        ...validation,
        warnings,
      },
      stats,
      summary: additionalChecks,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error validating content files:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to validate content files',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Redirect GET requests to POST for validation
  return POST();
}