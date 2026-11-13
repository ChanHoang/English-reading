#!/usr/bin/env node
// Runs sync/worker.js locally with an in-memory KV, for tests and offline development.
// Usage: node tools/sync-dev-server.mjs [port]      (default 8787; allows http://localhost:8765 and 127.0.0.1:8765)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(root, 'sync', 'worker.js'), 'utf8');
const worker = (await import('data:text/javascript,' + encodeURIComponent(src))).default;

export function memoryKV() {
  const m = new Map();
  return {
    m,
    async get(k, type) { const v = m.get(k); return v == null ? null : type === 'json' ? JSON.parse(v) : v; },
    async put(k, v) { m.set(k, String(v)); }
  };
}
export const env = { SYNC: memoryKV(), ALLOWED_ORIGINS: 'http://localhost:8765,http://127.0.0.1:8765' };
export { worker };

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = +(process.argv[2] || 8787);
  http.createServer(async (req, res) => {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = chunks.length ? Buffer.concat(chunks) : undefined;
    const r = await worker.fetch(new Request('http://localhost:' + port + req.url, { method: req.method, headers: req.headers, body: req.method === 'GET' || req.method === 'HEAD' ? undefined : body }), env);
    res.writeHead(r.status, Object.fromEntries(r.headers));
    res.end(Buffer.from(await r.arrayBuffer()));
  }).listen(port, () => console.log('sync dev server on http://localhost:' + port));
}
