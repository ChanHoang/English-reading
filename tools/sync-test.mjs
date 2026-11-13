#!/usr/bin/env node
// Unit test for sync/worker.js (no network). Run: node tools/sync-test.mjs
import { worker, memoryKV } from './sync-dev-server.mjs';

const env = { SYNC: memoryKV(), ALLOWED_ORIGINS: 'http://localhost:8765' };
const O = 'http://localhost:8765', code = '0123456789ABCDEF';
const call = async (method, p, body, origin = O) => {
  const r = await worker.fetch(new Request('http://w' + p, { method, headers: { origin, 'content-type': 'application/json' }, body: body == null ? undefined : JSON.stringify(body) }), env);
  let data = null; try { data = await r.json(); } catch (e) { /* empty body */ }
  return { s: r.status, d: data, h: r.headers };
};
let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if (cond) pass++; else fail++; console.log((cond ? 'PASS  ' : 'FAIL  ') + name + (cond || extra === undefined ? '' : '  — ' + JSON.stringify(extra))); };

let r = await call('GET', '/health', null, '');
ok('health check works without an origin and sees the KV binding', r.s === 200 && r.d.kv === true, r);
r = await worker.fetch(new Request('http://w/health'), {});
ok('health check reports a missing KV binding', (await r.json()).kv === false);
r = await call('GET', '/v1/s/' + code);
ok('unknown code -> 404', r.s === 404, r);
r = await call('GET', '/v1/s/0123456789ABCDEI');
ok('malformed code (letter I) -> 404', r.s === 404, r);
r = await call('GET', '/v1/s/' + code, null, 'https://evil.example');
ok('other website -> 403 and no CORS header', r.s === 403 && !r.h.get('access-control-allow-origin'), r);
r = await call('OPTIONS', '/v1/s/' + code);
ok('preflight from the app -> 204 with CORS', r.s === 204 && r.h.get('access-control-allow-origin') === O);
r = await call('PUT', '/v1/s/' + code, { base: '', state: { words: { a: 1 } } });
ok('create with base "" -> 200 + rev', r.s === 200 && typeof r.d.rev === 'string', r);
const rev1 = r.d.rev;
r = await call('GET', '/v1/s/' + code);
ok('read back -> same rev and state', r.s === 200 && r.d.rev === rev1 && r.d.state.words.a === 1, r);
r = await call('PUT', '/v1/s/' + code, { base: '', state: { words: { b: 2 } } });
ok('stale base -> 409 with the stored copy', r.s === 409 && r.d.rev === rev1 && r.d.state.words.a === 1, r);
r = await call('PUT', '/v1/s/' + code, { base: rev1, state: { words: { a: 1, b: 2 } } });
ok('correct base -> 200 + new rev', r.s === 200 && r.d.rev !== rev1, r);
r = await call('PUT', '/v1/s/' + code, { base: 'x', state: [1] });
ok('state must be an object -> 400', r.s === 400, r);
const big = 'x'.repeat(1024 * 1024 + 10);
r = await call('PUT', '/v1/s/' + code, { base: '', state: { big } });
ok('more than 1 MB -> 413', r.s === 413, r);
r = await call('DELETE', '/v1/s/' + code);
ok('delete -> 200', r.s === 200, r);
r = await call('GET', '/v1/s/' + code);
ok('after delete, read -> 410', r.s === 410, r);
r = await call('PUT', '/v1/s/' + code, { base: '', state: { words: {} } });
ok('after delete, write -> 410 (other devices stop)', r.s === 410, r);
console.log(`\n${pass}/${pass + fail} sync checks passed`);
process.exit(fail ? 1 : 0);
