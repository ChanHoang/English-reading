#!/usr/bin/env node
/* English Improve — content checker.
   Usage:  node tools/check-content.js            (all readings, words, grammar)
           node tools/check-content.js a2-p1-03   (one reading, with detail)
   Reports for every reading: word count, target coverage (each target marked in its target sense,
   and how many times / in how many sentences), target density, share of above-level words.
   Exit code 1 when there is an ERROR. Warnings are things a writer should look at. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..'), only = process.argv[2];
const ctx = { window: {}, console }; ctx.window = ctx; vm.createContext(ctx);
const run = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
run('js/core.js'); run('data/manifest.js');
const EI = ctx.EI;
EI.files.forEach(run); EI.index();
const REF = JSON.parse(fs.readFileSync(path.join(__dirname, 'cefr-reference.json'), 'utf8'));
const RANK = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5 };
const low = w => { const o = REF[w]; return o ? Object.values(o).sort((a, b) => RANK[a] - RANK[b])[0] : null; };
const UNITS = new Set(['kilogram', 'kilograms', 'centimeter', 'centimeters', 'meter', 'meters', 'kilometer', 'kilometers', 'toward', 'ok']);
const LEN = { A2: [600, 800], B1: [800, 1000], B2: [1000, 1300], C1: [1300, 1600] };
const IRR = { was: 'be', were: 'be', is: 'be', are: 'be', am: 'be', been: 'be', had: 'have', has: 'have', did: 'do', does: 'do', done: 'do', went: 'go', gone: 'go', came: 'come', saw: 'see', seen: 'see', took: 'take', taken: 'take', made: 'make', gave: 'give', given: 'give', got: 'get', knew: 'know', known: 'know', found: 'find', left: 'leave', told: 'tell', said: 'say', put: 'put', kept: 'keep', sent: 'send', built: 'build', became: 'become', began: 'begin', begun: 'begin', wrote: 'write', written: 'write', thought: 'think', lost: 'lose', held: 'hold', met: 'meet', fell: 'fall', fallen: 'fall', grew: 'grow', grown: 'grow', led: 'lead', paid: 'pay', sold: 'sell', sat: 'sit', stood: 'stand', understood: 'understand', won: 'win', broke: 'break', chose: 'choose', drew: 'draw', ate: 'eat', flew: 'fly', flown: 'fly', heard: 'hear', bought: 'buy', brought: 'bring', taught: 'teach', slept: 'sleep', cut: 'cut', hurt: 'hurt', men: 'man', women: 'woman', children: 'child', people: 'person', feet: 'foot', lives: 'life', better: 'good', best: 'good', worse: 'bad', worst: 'bad', more: 'more', most: 'most', less: 'little', these: 'this', those: 'that', an: 'a', its: 'it', their: 'they', them: 'they', his: 'he', him: 'he', her: 'she', us: 'we', our: 'we', me: 'i', my: 'i', your: 'you', himself: 'he', themselves: 'they', itself: 'it', cannot: 'can', could: 'can', would: 'will', might: 'may', drove: 'drive', forgot: 'forget', forgotten: 'forget', fed: 'feed', woke: 'wake', spent: 'spend', felt: 'feel', meant: 'mean', read: 'read', shown: 'show', caught: 'catch', threw: 'throw', wore: 'wear', worn: 'wear', sang: 'sing', swam: 'swim', drank: 'drink', spoke: 'speak', stole: 'steal', froze: 'freeze', rode: 'ride', shook: 'shake', hung: 'hang', dug: 'dig', lay: 'lie', laid: 'lay', shot: 'shoot', struck: 'strike', bit: 'bite', blew: 'blow', burnt: 'burn', dealt: 'deal', forgave: 'forgive', leaves: 'leaf', knives: 'knife', teeth: 'tooth', geese: 'goose', ran: 'run', rose: 'rise', hid: 'hide', fought: 'fight', mice: 'mouse', anymore: 'any', nobody: 'nobody', centimeters: 'centimetre', meters: 'metre', kilometers: 'kilometre', kilometer: 'kilometre', kilograms: 'kilogram', meter: 'metre', centimeter: 'centimetre', color: 'colour', colors: 'colour', colorful: 'colourful', favorite: 'favourite', neighbor: 'neighbour', center: 'centre', meters: 'metre', liters: 'litre', gray: 'grey', traveled: 'travel', travelers: 'traveller', traveler: 'traveller', behavior: 'behaviour', toward: 'towards', percent: 'per cent', realize: 'realise', realized: 'realise', recognize: 'recognise' };
function levelOf(tok) {
  let s = tok.toLowerCase().replace(/’/g, "'").replace(/'s$|'$/, '');
  if (/^\d/.test(s) || UNITS.has(s) || s.length < 2 && s !== 'a' && s !== 'i') return 'A1';
  const c = [s, IRR[s]];
  if (/ies$|ied$/.test(s)) c.push(s.slice(0, -3) + 'y');
  if (/ier$/.test(s)) c.push(s.slice(0, -3) + 'y'); if (/iest$/.test(s)) c.push(s.slice(0, -4) + 'y');
  if (s.endsWith('es')) c.push(s.slice(0, -2));
  if (s.endsWith('s')) c.push(s.slice(0, -1));
  if (s.endsWith('ed')) c.push(s.slice(0, -2), s.slice(0, -1), s.slice(0, -3));
  if (s.endsWith('ing')) c.push(s.slice(0, -3), s.slice(0, -3) + 'e', s.slice(0, -4));
  if (s.endsWith('er')) c.push(s.slice(0, -2), s.slice(0, -1), s.slice(0, -3));
  if (s.endsWith('est')) c.push(s.slice(0, -3), s.slice(0, -2), s.slice(0, -4));
  if (s.endsWith('ly')) c.push(s.slice(0, -2), s.slice(0, -3) + 'le', s.slice(0, -3) + 'y');
  if (s.includes('-')) { const ps = s.split('-').map(levelOf); return ps.includes(null) ? null : ps.sort((a, b) => RANK[b] - RANK[a])[0]; }
  let best = null;
  for (const x of c) { const l = x && low(x); if (l && (!best || RANK[l] < RANK[best])) best = l; }
  return best;
}
let errors = 0, warns = 0;
const E = (w, m) => { errors++; console.log('  ERROR  ' + w + ': ' + m); };
const Wn = (w, m) => { warns++; console.log('  warn   ' + w + ': ' + m); };

/* ---------- words ---------- */
console.log('WORDS');
const W = EI.W, wl = Object.values(W);
for (const e of wl) {
  for (const k of ['pos', 'ipa', 'def', 'ex', 'vi']) if (!e[k]) E(e.w, 'missing field ' + k);
  if (!/^\/.+\/$/.test(e.ipa)) E(e.w, 'IPA must be written between slashes: ' + e.ipa);
  if (!/\{[^}]+\}/.test(e.ex)) E(e.w, 'example must mark the word with {…}');
  if (new RegExp('\\b' + e.w + '\\b', 'i').test(e.def)) Wn(e.w, 'definition uses the word itself');
  const ro = REF[e.w] || REF[IRR[e.w]], poss = e.pos.split(',').map(x => x.trim());
  if (!ro) Wn(e.w, 'not found in the CEFR reference list');
  else if (!poss.some(p => ro[p] === e.level)) Wn(e.w, 'level in data is ' + e.level + ' (' + e.pos + ') but the reference list says ' + JSON.stringify(ro));
  const hard = e.def.replace(/\b[A-Z][a-z]+/g, (m, i) => i ? '' : m).toLowerCase().match(/[a-z]+/g).filter(x => { const l = levelOf(x); return !l || RANK[l] > RANK[e.level]; });
  if (hard.length) Wn(e.w, 'definition has words above ' + e.level + ': ' + [...new Set(hard)].join(', '));
  if (!e.rids.length) Wn(e.w, 'is not a marked target in any reading');
}
console.log('  ' + wl.length + ' words checked');

/* ---------- grammar ---------- */
console.log('GRAMMAR');
for (const g of EI.G) {
  for (const k of ['title', 'vi', 'use', 'forms', 'ex', 'errors', 'q']) if (!g[k] || !g[k].length) E(g.id, 'missing ' + k);
  (g.ex || []).forEach(x => { if (x[2]) { const r = EI.rById(x[2]); if (!r) E(g.id, 'example points to unknown reading ' + x[2]); else if (!r.S.some(o => o.plain.toLowerCase().includes(x[0].toLowerCase().replace(/[.?!]$/, '')))) E(g.id, 'example is not from a sentence of ' + x[2] + ': ' + x[0]); } });
  (g.q || []).forEach((it, i) => checkItem(g.id + ' q' + (i + 1), it, null, true));
}
console.log('  ' + EI.G.length + ' lessons: ' + EI.G.map(g => g.q.length).join(', ') + ' practice items');

/* ---------- readings ---------- */
function checkItem(where, it, r, grammar) {
  if (!['mc', 'gap', 'order', 'error', 'match', 'dict', 'write'].includes(it.t)) return E(where, 'unknown type ' + it.t);
  if (it.t === 'mc') {
    if (!(it.a >= 0 && it.a < it.o.length)) E(where, 'answer index out of range');
    if (grammar && !it.o.every(o => Array.isArray(o) && o[1])) E(where, 'grammar options need an explanation for every option');
  }
  if (it.t === 'gap' && !/_{3,}/.test(it.q)) E(where, 'gap question has no blank');
  if (it.t === 'error') { const n = it.q.split(' ').filter(w => w.replace(/[^\p{L}']/gu, '').toLowerCase() === it.wrong.toLowerCase()).length; if (n !== 1 && !it.head2) E(where, 'wrong word "' + it.wrong + '" must appear exactly once (found ' + n + ')'); if (n < 1) E(where, 'wrong word not in sentence'); }
  if (it.t === 'match' && new Set(it.pairs.map(p => p[1])).size !== it.pairs.length) E(where, 'match meanings must be different');
  if (r) {
    if (!it.k) E(where, 'needs a point key k (c:… / w:… / g:…)');
    if (it.ref && !r.S.some(o => o.plain.includes(it.ref))) E(where, 'ref not found in the text: ' + it.ref);
    if (it.k && it.k.startsWith('g:') && !EI.gById(it.k.slice(2))) E(where, 'unknown grammar id ' + it.k);
    if (!it.why && it.t !== 'write') Wn(where, 'no explanation (why)');
    if (it.t === 'dict' && !r.S.some(o => o.plain.toLowerCase().includes(it.a.toLowerCase().replace(/[.?!]$/, '')))) E(where, 'dictation text is not taken from the story');
  }
}
console.log('READINGS');
const rows = [];
for (const r of EI.R) {
  if (only && r.id !== only) continue;
  console.log(' ' + r.id + '  ' + r.title);
  const [lo, hi] = LEN[r.level];
  if (r.wc < lo || r.wc > hi) Wn(r.id, 'length ' + r.wc + ' words, guide for ' + r.level + ' is ' + lo + '–' + hi);
  if (!r.sources || r.sources.length < 2) E(r.id, 'needs at least two sources');
  if (!r.verified) E(r.id, 'missing verified date');
  for (const k of ['predict', 'write', 'fact', 'practice', 'gloss', 'grammar', 'practiceNote']) if (!r[k]) E(r.id, 'missing ' + k);
  // coverage
  const occ = {}, sents = {};
  let tgTok = 0; const above = {}, unknown = {}; let aboveN = 0, wordsN = 0; const glossCount = {};
  r.S.forEach(o => {
    if (!o.vi) E(r.id, 'sentence without Vietnamese: ' + o.plain);
    o.tk.forEach((t, j) => {
      if (!t.w) return; wordsN++;
      if (t.tg) {
        if (!t.lem || !W[t.lem]) return E(r.id, 'marked word {' + t.t + '} has no entry in the word list');
        occ[t.lem] = (occ[t.lem] || 0) + 1; (sents[t.lem] = sents[t.lem] || new Set()).add(o.i);
        if (r.targets.includes(t.lem)) tgTok++;
        return;
      }
      const cap = /^\p{Lu}/u.test(t.t), first = !o.tk.slice(0, j).some(x => x.w);
      if (cap && !first) return;                                  // proper noun
      const key = t.t.toLowerCase();
      if (r.gloss[key] || r.gloss[key.replace(/(es|s|ed|d|ing)$/, '')]) { above[key] = 1; aboveN++; glossCount[key] = (glossCount[key] || 0) + 1; return; }   // above level, but glossed
      const l = levelOf(t.t);
      if (!l) { if (!(cap && first)) { unknown[key] = 1; aboveN++; } } else if (RANK[l] > RANK[r.level]) { above[key + ' (' + l + ', no gloss)'] = 1; aboveN++; }
      const lem = EI.lemma(t.t); if (lem && W[lem] && r.targets.includes(lem)) Wn(r.id, 'target "' + lem + '" appears unmarked in: ' + o.plain);
    });
  });
  for (const w of r.targets) {
    if (!W[w]) { E(r.id, 'target ' + w + ' is not in the word list'); continue; }
    if (!occ[w]) E(r.id, 'target "' + w + '" never appears (marked) in the text');
    else if (sents[w].size < 2) Wn(r.id, 'target "' + w + '" appears in only one sentence');
  }
  const dup = r.targets.filter((w, i) => r.targets.indexOf(w) !== i); if (dup.length) E(r.id, 'duplicate targets: ' + dup);
  EI.R.filter(x => x !== r && x.level === r.level && x.pass === r.pass).forEach(x => { const sh = x.targets.filter(w => r.targets.includes(w)); if (sh.length && x.id < r.id) E(r.id, 'targets also used in ' + x.id + ': ' + sh); });
  (r.grammar || []).forEach(([gid, ph]) => { if (!EI.gById(gid)) E(r.id, 'grammar id not found: ' + gid); if (!r.S.some(o => o.plain.toLowerCase().includes(ph.toLowerCase()))) E(r.id, 'grammar phrase not in text: ' + ph); });
  r.practice.forEach((it, i) => checkItem(r.id + ' practice ' + (i + 1), it, r));
  (r.extra || []).forEach((it, i) => checkItem(r.id + ' extra ' + (i + 1), it, r));
  const Q = EI.practiceQueue(r), secOf = x => x[0] === 'z' ? 'w' : x[0] === 'g' ? 'g' : EI.sec(x[0] === 'p' ? r.practice[+x.slice(1)] : r.extra[+x.slice(1)]);
  const parts = { c: 0, w: 0, g: 0 }; Q.forEach(x => parts[secOf(x)]++);
  if (parts.c < 6) Wn(r.id, 'only ' + parts.c + ' comprehension items (aim for 6 or more)');
  if (parts.g < 4) Wn(r.id, 'only ' + parts.g + ' grammar items (aim for 4 or more)');
  if (Object.keys(unknown).length) Wn(r.id, 'words not in the reference list and not glossed: ' + Object.keys(unknown).join(', '));
  const dens = tgTok / r.wc * 100, ab = aboveN / wordsN * 100;
  // topic words = glossed words that the story is about (used 3+ times); the rest are incidental
  const topicN = Object.values(glossCount).filter(n => n >= 3).reduce((a, b) => a + b, 0), inc = (aboveN - topicN) / wordsN * 100;
  if (inc > 5) Wn(r.id, 'incidental above-level words are ' + inc.toFixed(1) + '% of the text (guide: under 5%)');
  if (only) console.log('  topic words (glossed, 3+ uses): ' + Object.keys(glossCount).filter(k => glossCount[k] >= 3).map(k => k + '×' + glossCount[k]).join(', '));
  rows.push([r.id, r.wc, r.targets.length, (r.targets.length / r.wc * 100).toFixed(1) + '%', dens.toFixed(1) + '%', r.targets.filter(w => occ[w] && sents[w].size >= 2).length + '/' + r.targets.length, ab.toFixed(1) + '%', inc.toFixed(1) + '%', Q.length + ' (' + parts.c + '/' + parts.w + '/' + parts.g + ')', r.est + ' min']);
  if (only) console.log('  above level (glossed unless noted): ' + Object.keys(above).join(', '));
}
console.log('\n id          words  targets  new/words  target-tokens  in≥2 sent.  above-level  (incidental)  test items (c/w/g)  lesson');
rows.forEach(x => console.log(' ' + x[0].padEnd(11) + String(x[1]).padStart(6) + String(x[2]).padStart(9) + x[3].padStart(11) + x[4].padStart(15) + x[5].padStart(12) + x[6].padStart(13) + x[7].padStart(14) + String(x[8]).padStart(20) + x[9].padStart(9)));
console.log('\n' + errors + ' error(s), ' + warns + ' warning(s)');
process.exit(errors ? 1 : 0);
