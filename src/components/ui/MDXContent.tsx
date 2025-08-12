'use client';

import React from 'react';
import { MDXContent as MDXContentType, TOCItem } from '@/lib/mdx';

interface MDXContentProps {
  content: MDXContentType;
  showTableOfContents?: boolean;
  className?: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

/**
 * Table of Contents component
 */
function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const renderTOCItems = (tocItems: TOCItem[]) => (
    <ul className="space-y-1">
      {tocItems.map((item) => (
        <li key={item.id} className={`ml-${(item.level - 2) * 4}`}>
          <a
            href={`#${item.id}`}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 block py-1"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(item.id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {item.title}
          </a>
          {item.children && item.children.length > 0 && (
            <div className="ml-4">
              {renderTOCItems(item.children)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <nav className={`toc ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Table of Contents
      </h3>
      {renderTOCItems(items)}
    </nav>
  );
}

/**
 * MDX Content wrapper component with styling
 */
export default function MDXContent({ 
  content, 
  showTableOfContents = false, 
  className = '' 
}: MDXContentProps) {
  return (
    <div className={`mdx-content ${className}`}>
      {showTableOfContents && content.tableOfContents.length > 0 && (
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <TableOfContents items={content.tableOfContents} />
        </div>
      )}
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {content.content}
      </div>

      <style jsx global>{`
        /* MDX Content Styling */
        .mdx-content {
          line-height: 1.7;
        }

        .mdx-content h1 {
          @apply text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8;
        }

        .mdx-content h2 {
          @apply text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2;
        }

        .mdx-content h3 {
          @apply text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6;
        }

        .mdx-content h4 {
          @apply text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 mt-4;
        }

        .mdx-content p {
          @apply text-gray-700 dark:text-gray-300 mb-4;
        }

        .mdx-content ul, .mdx-content ol {
          @apply mb-4 pl-6;
        }

        .mdx-content li {
          @apply text-gray-700 dark:text-gray-300 mb-2;
        }

        .mdx-content strong {
          @apply font-semibold text-gray-900 dark:text-gray-100;
        }

        .mdx-content em {
          @apply italic;
        }

        .mdx-content blockquote {
          @apply border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300;
        }

        .mdx-content code {
          @apply bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200;
        }

        .mdx-content pre {
          @apply bg-gray-900 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4;
        }

        .mdx-content pre code {
          @apply bg-transparent p-0 text-gray-100;
        }

        .mdx-content table {
          @apply w-full border-collapse border border-gray-300 dark:border-gray-600 mb-4;
        }

        .mdx-content th, .mdx-content td {
          @apply border border-gray-300 dark:border-gray-600 px-4 py-2 text-left;
        }

        .mdx-content th {
          @apply bg-gray-100 dark:bg-gray-800 font-semibold;
        }

        .mdx-content a {
          @apply text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200;
        }

        /* Code highlighting styles */
        .mdx-content .hljs {
          @apply bg-gray-900 text-gray-100;
        }

        .mdx-content .hljs-keyword {
          @apply text-purple-400;
        }

        .mdx-content .hljs-string {
          @apply text-green-400;
        }

        .mdx-content .hljs-number {
          @apply text-yellow-400;
        }

        .mdx-content .hljs-comment {
          @apply text-gray-500 italic;
        }

        .mdx-content .hljs-function {
          @apply text-blue-400;
        }

        .mdx-content .hljs-variable {
          @apply text-red-400;
        }

        /* Table of Contents styling */
        .toc a:hover {
          @apply no-underline;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .mdx-content h1 {
            @apply text-2xl;
          }
          
          .mdx-content h2 {
            @apply text-xl;
          }
          
          .mdx-content h3 {
            @apply text-lg;
          }
        }
      `}</style>
    </div>
  );
}