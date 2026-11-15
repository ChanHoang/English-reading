/* Review tool for multiple-choice explanations in reading files.
   node tools/mc-review.js status                 how many mc questions in each reading still lack an explanation for every option
   node tools/mc-review.js dump <id> [--text]     the reading's practice and extra items, numbered (p0, p1… / x0…), with the story sentence of each ref;
                                                  --text also prints the English text of the story
   node tools/mc-review.js apply <id> <patch.json>
       patch: { "p3": { "q": "…", "o": [["option", "explanation"], …], "a": 0, "why": "…", "ref": "…" }, "x0": {…} }
       Only the fields given are replaced; the practice and extra arrays are written back, one item per line.
   Rules for the explanations: CONTENT_GUIDE.md §4 and DECISIONS.md §29. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const fileOf = id => path.join(ROOT, 'data/readings', id + '.js');

function load(id) {
  const src = fs.readFileSync(fileOf(id), 'utf8');
  let r = null; const W = {};
  const ctx = { EI: { reading: x => { r = x; }, words: (lv, s) => s.split('\n').forEach(l => { const f = l.split('|'); if (f.length > 6 && !l.startsWith('#')) W[f[0].trim()] = { pos: f[1], def: f[3], vi: f[6] }; }) } };
  vm.createContext(ctx); vm.runInContext(src, ctx);
  return { src, r, W };
}
const plain = s => String(s).replace(/\{([^}=]+)(=[^}]+)?\}/g, '$1');
const full = it => it.t === 'mc' && it.o.every(o => Array.isArray(o) && o[1] && String(o[1]).trim());

// ---- write JS values back in the house style: single quotes, keys without quotes when possible
function str(s) { return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'"; }
function ser(v) {
  if (Array.isArray(v)) return '[' + v.map(ser).join(', ') + ']';
  if (v && typeof v === 'object') return '{ ' + Object.keys(v).map(k => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : str(k)) + ': ' + ser(v[k])).join(', ') + ' }';
  if (typeof v === 'string') return str(v);
  return JSON.stringify(v);
}
const block = (name, arr) => '  ' + name + ': [' + (arr.length ? '\n' + arr.map(it => '    ' + ser(it)).join(',\n') + '\n  ' : '') + '],\n';

function status() {
  const rows = fs.readdirSync(path.join(ROOT, 'data/readings')).filter(f => f.endsWith('.js')).sort().map(f => {
    const { r } = load(f.slice(0, -3)), mc = [...r.practice, ...(r.extra || [])].filter(it => it.t === 'mc');
    return [r.id, mc.length, mc.filter(full).length];
  });
  const left = rows.filter(x => x[2] < x[1]);
  rows.forEach(x => console.log(x[0].padEnd(10), String(x[2]).padStart(3) + '/' + String(x[1]).padEnd(3), x[2] < x[1] ? '' : 'done'));
  console.log('\n' + (rows.length - left.length) + '/' + rows.length + ' readings done; ' + rows.reduce((a, x) => a + x[1] - x[2], 0) + ' mc questions left');
}

function dump(id, withText) {
  const { r, W } = load(id), S = [].concat(...r.text).map(p => plain(p[0]));
  console.log('# ' + r.id + ' — ' + r.title + '   targets: ' + r.targets.map(t => t + (W[t] ? ' (' + W[t].pos + ': ' + W[t].vi + ')' : '')).join('; '));
  if (withText) r.text.forEach((p, i) => console.log('¶' + (i + 1) + ' ' + p.map(s => plain(s[0])).join(' ')));
  const show = (it, key) => {
    let h = '[' + key + '] ' + it.t + ' ' + (it.k || '') + (it.t === 'mc' ? ' a=' + it.a : '') + ' | ' + (it.q || it.a || '');
    if (it.t === 'mc') it.o.forEach((o, i) => { h += '\n   ' + i + (i === it.a ? '*' : ' ') + ' ' + (Array.isArray(o) ? o[0] + (o[1] ? '  || ' + o[1] : '') : o); });
    if (it.t === 'error') h += '\n   wrong: ' + it.wrong + ' → ' + it.fix;
    if (it.t === 'match') h += '\n   ' + it.pairs.map(p => p[0] + ' = ' + p[1]).join(' · ');
    if (it.why) h += '\n   why: ' + it.why;
    if (it.ref) { const s = S.find(x => x.includes(plain(it.ref))); h += '\n   ref: ' + (s || '!! NOT FOUND: ' + it.ref); }
    console.log(h);
  };
  r.practice.forEach((it, i) => show(it, 'p' + i));
  (r.extra || []).forEach((it, i) => show(it, 'x' + i));
}

function apply(id, patchFile) {
  const { src, r } = load(id), patch = JSON.parse(fs.readFileSync(patchFile, 'utf8'));
  const prac = r.practice.map(x => Object.assign({}, x)), extra = (r.extra || []).map(x => Object.assign({}, x));
  const errs = [];
  for (const key of Object.keys(patch)) {
    const arr = key[0] === 'p' ? prac : key[0] === 'x' ? extra : null, i = +key.slice(1);
    if (!arr || !arr[i]) { errs.push(key + ': no such item'); continue; }
    const it = arr[i], p = patch[key];
    for (const f of ['q', 'o', 'a', 'why', 'ref', 'k']) if (p[f] !== undefined) it[f] = p[f];
    if (it.t === 'mc') {
      if (!full(it)) errs.push(key + ': every option needs [text, explanation]');
      if (!(it.a >= 0 && it.a < it.o.length)) errs.push(key + ': answer index out of range');
      else if (!/^Đúng/.test(it.o[it.a][1])) errs.push(key + ': the right option’s explanation should start with “Đúng”');
      it.o.forEach((o, j) => { if (j !== it.a && /^Đúng/.test(o[1])) errs.push(key + ': option ' + j + ' is wrong but its explanation starts with “Đúng”'); });
    }
  }
  if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
  const a = src.indexOf('\n  practice: ['), b = src.indexOf('\n  extra: ', a), c = src.indexOf('\n  write: ', b);
  if (a < 0 || b < 0 || c < 0) { console.error('could not find practice / extra / write in ' + id); process.exit(1); }
  const out = src.slice(0, a + 1) + block('practice', prac) + block('extra', extra) + src.slice(c + 1);
  // the rewritten file must still load and keep everything outside the two arrays
  const ctx = { EI: { reading: x => { ctx.r = x; }, words: () => {} } }; vm.createContext(ctx); vm.runInContext(out, ctx);
  if (JSON.stringify(Object.assign({}, ctx.r, { practice: 0, extra: 0 })) !== JSON.stringify(Object.assign({}, r, { practice: 0, extra: 0 }))) { console.error('other fields changed — not written'); process.exit(1); }
  fs.writeFileSync(fileOf(id), out);
  const mc = [...prac, ...extra].filter(it => it.t === 'mc');
  console.log(id + ': ' + Object.keys(patch).length + ' items patched; ' + mc.filter(full).length + '/' + mc.length + ' mc questions explained');
}

const [cmd, id, x] = process.argv.slice(2);
if (cmd === 'status') status();
else if (cmd === 'dump' && id) dump(id, process.argv.includes('--text'));
else if (cmd === 'apply' && id && x) apply(id, x);
else console.log('usage: node tools/mc-review.js status | dump <id> [--text] | apply <id> <patch.json>');
