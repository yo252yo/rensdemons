
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open('rd');
    await cache.addAll([
      '/index.html',
    ]);
  })());
});

self.addEventListener('activate', (event) => {});

self.addEventListener('fetch', function(event) {
 event.respondWith((async () => {
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   });
 });
});
