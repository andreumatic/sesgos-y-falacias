/* Sesgos y Falacias · service worker mínimo
   - Navegaciones: red primero, caché como respaldo (así nunca se queda una versión vieja).
   - Estáticos (css, fuentes, imágenes): caché primero con revalidación en segundo plano. */
const VERSION = 'sf-v1';
const STATIC = [
  '/css/estilos.css?v=6',
  '/assets/icono-firma.png',
  '/assets/favicon.svg',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/og-sesgos.png',
  '/assets/fonts/SpaceMono-400-latin.woff2',
  '/assets/fonts/SpaceMono-700-latin.woff2',
  '/assets/fonts/WorkSans-400-latin.woff2',
  '/assets/fonts/WorkSans-600-latin.woff2',
  '/mas-alla-de-los-sesgos.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(STATIC)).catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/index.html')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
