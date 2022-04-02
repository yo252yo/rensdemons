
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open('rd');
      const all = await cache.addAll([
        'index.html',
        'import_manager.js',
      ]);
    })()
  );
});


self.addEventListener('activate', (event) => {});

self.addEventListener('fetch', event => {
  event.respondWith(async function() {
    const cache = await caches.open('rd');
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) return cachedResponse;

    var r = fetch(event.request);
    await cache.add(r);
    return r;
  }());
});
