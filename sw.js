/* English Improve service worker: offline after the first load (stale-while-revalidate). */
const CACHE = 'english-improve-v8';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
// The page sends the list of app and data files once it has started, so everything is stored for offline use.
self.addEventListener('message', e => {
  if (e.data && e.data.cache) e.waitUntil(caches.open(CACHE).then(c => Promise.all(e.data.cache.map(u => c.add(u).catch(() => null)))));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !/^https?:/.test(req.url)) return;
  if (/\/v1\/s\//.test(req.url)) return;   // sync API: always live, never cached
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }).catch(() => hit || Response.error());
    return hit || net;
  }));
});
