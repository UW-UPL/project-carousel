const CACHE_NAME = "image-cache"

// Install event: activate asap
self.addEventListener('install', (event) => {
  console.log('Installing image cache service worker');
  self.skipWaiting();
});

// Activate event: take control
self.addEventListener('activate', (event) => {
  console.log('Activating image cache service worker');
  event.waitUntil(self.clients.claim());
});

// Fetch event: intercept network requests
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Only handle image requests
  if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
    console.log('Intercepting image request:', url);
    
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            console.log('SW: Serving from cache:', url);
            return response;
          }
          
          // Not in cache, fetch and store
          console.log('SW: Fetch and cache:', url);

          return fetch(event.request).then(fetchResponse => {
            
            // Only cache successful responses
            if (fetchResponse.status === 200) {
              cache.put(event.request, fetchResponse.clone());
            }
            return fetchResponse;
          
          }).catch(error => {
            console.log('SW: Fetch failed:', url, error);
            // Return a placeholder or cached version if available
            return cache.match(event.request);
          });
        });
      })
    );
  }
});