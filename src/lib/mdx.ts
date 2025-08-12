import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// Types for MDX content
export interface MDXContent {
  content: React.ReactElement;
  frontmatter: Record<string, any>;
  tableOfContents: TOCItem[];
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}


/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(source: string): { content: string; frontmatter: Record<string, any> } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = source.match(frontmatterRegex);
  
  if (!match) {
    return { content: source, frontmatter: {} };
  }
  
  const frontmatterText = match[1];
  const content = match[2];
  
  // Simple YAML-like parsing (basic key: value pairs)
  const frontmatter: Record<string, any> = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      frontmatter[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
    }
  });
  
  return { content, frontmatter };
}

/**
 * Process MDX content from source string
 */
export async function processMDXContent(source: string): Promise<{
  html: string;
  frontmatter: Record<string, any>;
  tableOfContents: TOCItem[];
}> {
  try {
    // Parse frontmatter manually
    const { content: markdownContent, frontmatter } = parseFrontmatter(source);
    
    // Process markdown with unified
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkToc, { heading: 'contents', maxDepth: 3, tight: true })
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeHighlight)
      .use(rehypeStringify);

    const processedContent = await processor.process(markdownContent);
    
    // Extract table of contents from the source
    const tableOfContents = extractTableOfContents(markdownContent);

    return {
      html: String(processedContent),
      frontmatter: frontmatter || {},
      tableOfContents,
    };
  } catch (error) {
    console.error(`Error processing MDX content:`, error);
    throw error;
  }
}

/**
 * Extract table of contents from MDX source
 */
function extractTableOfContents(source: string): TOCItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    
    // Skip the main title (h1) and contents heading
    if (level === 1 || title.toLowerCase() === 'contents') {
      continue;
    }

    const id = generateSlug(title);
    
    headings.push({
      id,
      title,
      level,
    });
  }

  return buildNestedTOC(headings);
}

/**
 * Generate URL-friendly slug from heading text
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Build nested table of contents structure
 */
function buildNestedTOC(headings: TOCItem[]): TOCItem[] {
  const result: TOCItem[] = [];
  const stack: TOCItem[] = [];

  for (const heading of headings) {
    // Remove items from stack that are at same or deeper level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // Top level heading
      result.push(heading);
    } else {
      // Nested heading
      const parent = stack[stack.length - 1];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(heading);
    }

    stack.push(heading);
  }

  return result;
}

