'use client';

import { useState, useEffect } from 'react';
import { MDXContent } from '@/lib/mdx';

interface UseMDXContentResult {
  content: MDXContent | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * Hook for loading MDX content with error handling and loading states
 */
export function useMDXContent(section: string): UseMDXContentResult {
  const [content, setContent] = useState<MDXContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // Since we're in client-side, we need to fetch the content via API
      const response = await fetch(`/api/content/${section}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to load content');
      }

      setContent(data.content);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error(`Error loading MDX content for section "${section}":`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (section) {
      loadContent();
    }
  }, [section]);

  const reload = () => {
    loadContent();
  };

  return {
    content,
    loading,
    error,
    reload,
  };
}

/**
 * Hook for loading multiple MDX sections
 */
export function useMultipleMDXContent(sections: string[]) {
  const [contents, setContents] = useState<Record<string, MDXContent | null>>({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadAllContent = async () => {
      setLoading(true);
      const newContents: Record<string, MDXContent | null> = {};
      const newErrors: Record<string, string> = {};

      await Promise.all(
        sections.map(async (section) => {
          try {
            const response = await fetch(`/api/content/${section}`);
            
            if (!response.ok) {
              throw new Error(`Failed to load content: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.success) {
              throw new Error(data.error || 'Failed to load content');
            }

            newContents[section] = data.content;
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            newErrors[section] = errorMessage;
            newContents[section] = null;
            console.error(`Error loading MDX content for section "${section}":`, err);
          }
        })
      );

      setContents(newContents);
      setErrors(newErrors);
      setLoading(false);
    };

    if (sections.length > 0) {
      loadAllContent();
    }
  }, [sections]);

  return {
    contents,
    loading,
    errors,
  };
}