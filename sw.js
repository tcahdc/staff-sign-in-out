self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('signio-cache').then(cache => cache.addAll([
      './',
      './index.html',
      './manifest.webmanifest',
      './icon-192.png'
    ]))
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
