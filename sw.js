/* English Improve service worker: offline after the first load (stale-while-revalidate). */
const CACHE = 'english-improve-v25', AUDIO = 'ei-audio-v1';   // recorded voice files live in their own cache, kept across app updates
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== AUDIO).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
// The page sends the list of app and data files once it has started, so everything is stored for offline use.
// Only files that are not stored yet are downloaded (earlier versions downloaded every file again on each visit).
// Old content bundles (data/all.<hash>.js) that the page no longer uses are removed.
const BUNDLE = /\/data\/all\.[0-9a-f]+\.js$/;
self.addEventListener('message', e => {
  if (!(e.data && e.data.cache)) return;
  e.waitUntil(caches.open(CACHE).then(async c => {
    const want = new Set(e.data.cache.map(u => new URL(u, self.registration.scope).href));
    for (const r of await c.keys()) { const u = r.url.split('?')[0]; if (BUNDLE.test(u) && !want.has(u)) await c.delete(r); }
    await Promise.all([...want].map(async u => (await c.match(u, { ignoreSearch: true })) ? null : c.add(u).catch(() => null)));
  }));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !/^https?:/.test(req.url)) return;
  if (/\/v1\/s\//.test(req.url)) return;   // sync API: always live, never cached
  if (/\/audio\/[0-9a-z]+\.mp3/.test(req.url)) {   // cache-first: the file name and ?v= change when the audio changes
    e.respondWith(caches.open(AUDIO).then(async c => (await c.match(req)) || fetch(req).then(res => { if (res && res.ok && res.status === 200) c.put(req, res.clone()); return res; })));
    return;
  }
  if (BUNDLE.test(req.url.split('?')[0])) {   // the bundle's name changes with its content, so a stored copy never needs checking
    e.respondWith(caches.open(CACHE).then(async c => (await c.match(req)) || fetch(req).then(res => { if (res && res.ok) c.put(req, res.clone()); return res; })));
    return;
  }
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }).catch(() => hit || Response.error());
    return hit || net;
  }));
});
