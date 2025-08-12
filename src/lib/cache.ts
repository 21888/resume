/**
 * Intelligent caching strategies for MDX content and API responses
 */

import { unstable_cache } from 'next/cache';

// Cache tags for different types of content
export const CACHE_TAGS = {
  MDX_CONTENT: 'mdx-content',
  RESUME_DATA: 'resume-data',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  ABOUT: 'about',
  NAVIGATION: 'navigation',
} as const;

// Cache durations in seconds
export const CACHE_DURATIONS = {
  STATIC: 3600, // 1 hour
  DYNAMIC: 300, // 5 minutes
  API: 180, // 3 minutes
  LONG_TERM: 86400, // 24 hours
} as const;

// Memory cache for runtime caching
class MemoryCache {
  private cache = new Map<string, { value: any; expiry: number }>();

  set(key: string, value: any, ttl: number) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl * 1000,
    });
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    return this.cache.delete(key);
  }

  size() {
    return this.cache.size;
  }

  // Clean expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

export const memoryCache = new MemoryCache();

// Server-side caching for MDX content
export const getCachedMDXContent = unstable_cache(
  async (section: string) => {
    // Server-side content is now handled by API routes, not direct MDX processing
    return null;
  },
  ['mdx-content'],
  {
    revalidate: CACHE_DURATIONS.STATIC,
    tags: [CACHE_TAGS.MDX_CONTENT],
  }
);

// Cache for resume data
export const getCachedResumeData = unstable_cache(
  async () => {
    const { resumeContent } = await import('@/data/resume-content');
    return resumeContent;
  },
  ['resume-data'],
  {
    revalidate: CACHE_DURATIONS.LONG_TERM,
    tags: [CACHE_TAGS.RESUME_DATA],
  }
);

// Cache for API responses
export const getCachedAPIResponse = unstable_cache(
  async (endpoint: string, params?: Record<string, any>) => {
    const searchParams = new URLSearchParams(params);
    const url = `/api/${endpoint}${searchParams.toString() ? `?${searchParams}` : ''}`;
    
    const response = await fetch(url, {
      next: { revalidate: CACHE_DURATIONS.API },
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return response.json();
  },
  ['api-response'],
  {
    revalidate: CACHE_DURATIONS.API,
    tags: ['api'],
  }
);

// Client-side caching with IndexedDB fallback
class ClientCache {
  private dbName = 'resume-cache';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init() {
    if (typeof window === 'undefined') return;
    
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('mdx-content')) {
          db.createObjectStore('mdx-content', { keyPath: 'key' });
        }
        
        if (!db.objectStoreNames.contains('api-responses')) {
          db.createObjectStore('api-responses', { keyPath: 'key' });
        }
        
        if (!db.objectStoreNames.contains('assets')) {
          db.createObjectStore('assets', { keyPath: 'key' });
        }
      };
    });
  }

  async set(key: string, value: any, ttl: number) {
    if (!this.db) await this.init();
    
    const data = {
      key,
      value,
      expiry: Date.now() + ttl * 1000,
    };

    const transaction = this.db!.transaction(['mdx-content'], 'readwrite');
    const store = transaction.objectStore('mdx-content');
    
    return new Promise<void>((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async get(key: string) {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction(['mdx-content'], 'readonly');
    const store = transaction.objectStore('mdx-content');
    
    return new Promise<any>((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => {
        const data = request.result;
        
        if (!data || Date.now() > data.expiry) {
          resolve(null);
          return;
        }
        
        resolve(data.value);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async delete(key: string) {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction(['mdx-content'], 'readwrite');
    const store = transaction.objectStore('mdx-content');
    
    return new Promise<void>((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear() {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction(['mdx-content'], 'readwrite');
    const store = transaction.objectStore('mdx-content');
    
    return new Promise<void>((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const clientCache = new ClientCache();


// Smart cache warming
export const warmCache = async () => {
  try {
    // Preload critical content
    await Promise.all([
      getCachedMDXContent('about'),
      getCachedMDXContent('skills'),
      getCachedMDXContent('experience'),
      getCachedResumeData(),
    ]);

    console.log('Cache warming completed');
  } catch (error) {
    console.warn('Cache warming failed:', error);
  }
};

// Cache monitoring
export const monitorCache = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Memory cache size:', memoryCache.size());
    
    // Cleanup expired entries every 5 minutes
    setInterval(() => {
      memoryCache.cleanup();
    }, 5 * 60 * 1000);
  }
};

// Service Worker registration for offline caching
export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);

    // Update service worker when available
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New service worker available');
            // Show update notification to user
          }
        });
      }
    });
  } catch (error) {
    console.warn('Service Worker registration failed:', error);
  }
};

// Cache strategy factory
export const createCacheStrategy = (type: 'static' | 'dynamic' | 'api') => {
  const durations = {
    static: CACHE_DURATIONS.STATIC,
    dynamic: CACHE_DURATIONS.DYNAMIC,
    api: CACHE_DURATIONS.API,
  };

  return {
    duration: durations[type],
    tag: `cache-${type}`,
    revalidate: (_tags?: string[]) => {
      // no-op in this build; Next's revalidation is handled via route handlers
    },
  };
};