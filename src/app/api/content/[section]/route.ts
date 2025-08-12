import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { processMDXContent } from '@/lib/mdx';
import * as fs from 'fs';
import * as path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;

    // Validate section parameter
    if (!section || typeof section !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid section parameter' },
        { status: 400 }
      );
    }

    // Sanitize section name to prevent path traversal
    const sanitizedSection = section.replace(/[^a-zA-Z0-9-_]/g, '');
    if (sanitizedSection !== section) {
      return NextResponse.json(
        { success: false, error: 'Invalid section name format' },
        { status: 400 }
      );
    }

    // Content directories - server-side
    const CONTENT_DIR = path.join(process.cwd(), 'src/content');
    const filePath = path.join(CONTENT_DIR, sanitizedSection, 'index.mdx');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Content not found for section: ${sanitizedSection}`,
          section: sanitizedSection
        },
        { status: 404 }
      );
    }

    const source = fs.readFileSync(filePath, 'utf8');
    const content = await processMDXContent(source);

    if (!content) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Content not found for section: ${sanitizedSection}`,
          section: sanitizedSection
        },
        { status: 404 }
      );
    }

    // Return successful response with processed HTML
    return NextResponse.json({
      success: true,
      content: {
        html: content.html,
        frontmatter: content.frontmatter,
        tableOfContents: content.tableOfContents,
      },
      section: sanitizedSection,
    });

  } catch (error) {
    console.error('Error in content API route:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error while loading content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint for content validation
export async function POST(request: NextRequest) {
  try {
    // Content directories - server-side
    const CONTENT_DIR = path.join(process.cwd(), 'src/content');
    const requiredSections = ['about', 'experience', 'skills'];
    
    const sections = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
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

    return NextResponse.json({
      success: true,
      validation,
      stats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in content validation:', error);
    
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