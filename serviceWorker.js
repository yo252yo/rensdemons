
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


self.addEventListener('fetch', event => {
  event.respondWith(async function() {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;
    return fetch(event.request);
  }());
});
