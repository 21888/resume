/**
 * Service Worker for offline caching and performance optimization
 */

const CACHE_NAME = 'resume-app-v1';
const RUNTIME_CACHE = 'runtime-cache';

// Critical resources to cache
const PRECACHE_RESOURCES = [
  '/',
  '/home',
  '/offline',
  '/api/content/about',
  '/api/content/skills',
  '/api/content/experience',
  '/_next/static/css/app-globals.css',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main-app.js',
];

// Cache strategies
const CACHE_STRATEGIES = {
  STATIC: 'cache-first',
  API: 'network-first',
  DYNAMIC: 'stale-while-revalidate',
};

// Install event - precache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_RESOURCES);
      })
      .then(() => {
        console.log('Precache completed');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Precache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
  } else if (request.destination === 'font') {
    event.respondWith(cacheFirst(request));
  } else if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// Cache-first strategy for static assets
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return cache.match('/offline');
  }
}

// Network-first strategy for API calls and dynamic content
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return cache.match('/offline');
    }
    
    throw error;
  }
}

// Stale-while-revalidate strategy for frequently updated content
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  });

  return cached || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(backgroundSync());
  }
});

async function backgroundSync() {
  // Implement background sync logic here
  console.log('Performing background sync...');
}

// Push notification support
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'View Update',
        icon: '/checkmark.png',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received:', event);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME);
    caches.delete(RUNTIME_CACHE);
  }
});

// Periodic cache cleanup
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cleanup-cache') {
    event.waitUntil(cleanupCache());
  }
});

async function cleanupCache() {
  const cache = await caches.open(RUNTIME_CACHE);
  const keys = await cache.keys();
  
  const expiredKeys = keys.filter(async (request) => {
    const response = await cache.match(request);
    if (!response) return true;
    
    const date = response.headers.get('date');
    if (!date) return true;
    
    const age = Date.now() - new Date(date).getTime();
    return age > 24 * 60 * 60 * 1000; // 24 hours
  });
  
  await Promise.all(
    expiredKeys.map((request) => cache.delete(request))
  );
}