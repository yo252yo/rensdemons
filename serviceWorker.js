
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open('rd');
      const all = await cache.addAll([
        'index.html',
        'import_manager.js',
      ]);
    //  const index = await cache.add(new Request("index.html", {cache: 'reload'}));
    })()
  );
});


self.addEventListener('activate', (event) => {});

self.addEventListener('fetch', function(event) {
 event.respondWith(
   (async () => {
     try {
       const networkResponse = await fetch(event.request);
       await cache.add(networkResponse);
       return networkResponse;
     } catch (error) {
       const cache = await caches.open('rd');
       const cachedResponse = await cache.match(event.request);
       return cachedResponse;
     }
   })()
 );
});
