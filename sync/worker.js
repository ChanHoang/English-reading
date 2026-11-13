// English Improve — sync API: a Cloudflare Worker with one KV namespace bound as SYNC.
// No accounts and no personal data: a random 16-character code (80 bits) is the only key.
//   GET    /v1/s/<code>  -> 200 {rev, at, state} | 404 not found | 410 deleted
//   PUT    /v1/s/<code>  body {base, state}; accepted only if base equals the stored rev (else 409 + stored copy)
//   DELETE /v1/s/<code>  -> leaves a "deleted" marker so other devices stop syncing
//   GET    /health       -> {ok, kv}: kv is true when the KV namespace is bound as SYNC (setup check)
// Free plan: KV allows 1,000 writes a day for the whole account, so the app writes only when progress changed.
const CODE = /^[0-9A-HJKMNP-TV-Z]{16}$/;
const MAX = 1024 * 1024;              // 1 MB of progress per code
const TTL = 400 * 24 * 3600;          // a code with no write for ~13 months disappears
const GONE_TTL = 90 * 24 * 3600;      // the "deleted" marker is kept for 90 days
const ORIGINS = 'https://chanhoang.github.io';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || ORIGINS).split(',').map(s => s.trim()).filter(Boolean);
    const okOrigin = allowed.includes(origin);
    const cors = okOrigin ? { 'access-control-allow-origin': origin, 'access-control-allow-methods': 'GET, PUT, DELETE', 'access-control-allow-headers': 'content-type', 'access-control-max-age': '86400', vary: 'origin' } : { vary: 'origin' };
    const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...cors } });
    if (new URL(request.url).pathname === '/health') return json(200, { ok: true, kv: !!(env.SYNC && env.SYNC.get) });   // setup check, no data
    if (request.method === 'OPTIONS') return new Response(null, { status: okOrigin ? 204 : 403, headers: cors });
    if (!okOrigin) return json(403, { error: 'origin_not_allowed' });

    const m = new URL(request.url).pathname.match(/^\/v1\/s\/([^/]+)$/);
    if (!m || !CODE.test(m[1])) return json(404, { error: 'not_found' });
    const key = 's:' + m[1];
    const cur = await env.SYNC.get(key, 'json');

    if (request.method === 'GET') {
      if (!cur) return json(404, { error: 'not_found' });
      if (cur.gone) return json(410, { error: 'deleted' });
      return json(200, cur);
    }
    if (request.method === 'DELETE') {
      await env.SYNC.put(key, JSON.stringify({ gone: true, at: Date.now() }), { expirationTtl: GONE_TTL });
      return json(200, { ok: true });
    }
    if (request.method === 'PUT') {
      if (+(request.headers.get('content-length') || 0) > MAX) return json(413, { error: 'too_large' });
      const text = await request.text();
      if (text.length > MAX) return json(413, { error: 'too_large' });
      let body;
      try { body = JSON.parse(text); } catch (e) { return json(400, { error: 'bad_json' }); }
      if (!body || typeof body.base !== 'string' || !body.state || typeof body.state !== 'object' || Array.isArray(body.state)) return json(400, { error: 'bad_body' });
      if (cur && cur.gone) return json(410, { error: 'deleted' });
      if ((cur ? cur.rev : '') !== body.base) return json(409, cur || { rev: '', at: 0, state: null });
      const next = { rev: crypto.randomUUID(), at: Date.now(), state: body.state };
      try { await env.SYNC.put(key, JSON.stringify(next), { expirationTtl: TTL }); }
      catch (e) { return json(429, { error: 'try_later' }); }
      return json(200, { rev: next.rev, at: next.at });
    }
    return json(405, { error: 'method_not_allowed' });
  }
};
