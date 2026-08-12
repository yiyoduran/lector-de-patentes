const CACHE = 'lector-patentes-v1';
const ASSETS = ['./lector-patentes.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Tesseract/CDN and dynamic requests: try network first, fall back to cache.
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
