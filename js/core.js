/* English Improve — core: data registry, storage, spaced repetition, audio. No UI here. */
(function () {
'use strict';
const EI = window.EI = { W: {}, R: [], G: [], files: [], meta: {} };
// version: v0.<roadmap stage>.<small fix> — see ROADMAP.md (stage 1 = A2 Pass 1)
EI.VERSION = 'v0.2.1';

/* ---------- data registry (data files call these) ---------- */
// Word table: one word per line, fields separated by "|":
// word | pos | ipa (US) | English definition | example with {word} marked | collocations; separated; by ; | Vietnamese | difficulty 1-3 | note (vi) | family
EI.words = (level, table, meta) => {
  table.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line[0] === '#') return;
    const [w, pos, ipa, def, ex, col, vi, diff, note, fam] = line.split('|').map(x => x.trim());
    EI.W[w] = { w, pos, ipa, def, ex, vi, level, diff: +diff || 2, note: note || '', fam: fam || '',
      col: col ? col.split(';').map(x => x.trim()).filter(Boolean) : [], sents: [], rids: [] };
  });
  if (meta) EI.meta[level] = meta;
};
EI.reading = r => EI.R.push(r);
EI.grammar = g => EI.G.push(g);
EI.rById = id => EI.R.find(r => r.id === id);
EI.gById = id => EI.G.find(g => g.id === id);

/* ---------- text parsing ---------- */
EI.lemma = s => {
  s = String(s).toLowerCase().replace(/’/g, "'");
  const W = EI.W;
  if (W[s]) return s;
  const c = [];
  if (/ies$|ied$/.test(s)) c.push(s.slice(0, -3) + 'y');
  if (s.endsWith('es')) c.push(s.slice(0, -2));
  if (s.endsWith('s')) c.push(s.slice(0, -1));
  if (s.endsWith('ed')) c.push(s.slice(0, -2), s.slice(0, -1), s.slice(0, -3));
  if (s.endsWith('ing')) c.push(s.slice(0, -3), s.slice(0, -3) + 'e', s.slice(0, -4));
  return c.find(x => W[x]) || null;
};
// {word} marks a target word used in its target sense; {surface=lemma} for irregular forms.
EI.toks = raw => {
  const out = [], re = /\{([^}=]+)(?:=([^}]+))?\}([\p{L}']*)|(\p{L}[\p{L}'’-]*)|(\d[\d,.]*\d|\d)|([^\p{L}\d{]+)/gu;
  let m;
  while ((m = re.exec(raw))) {
    if (m[1]) out.push({ t: m[1] + (m[3] || ''), w: 1, tg: 1, lem: m[2] || EI.lemma(m[1]) });
    else if (m[4]) out.push({ t: m[4], w: 1 });
    else if (m[5]) out.push({ t: m[5], w: 0, n: 1 });
    else out.push({ t: m[6], w: 0 });
  }
  return out;
};
EI.unbrace = s => String(s).replace(/\{([^}=]+)(?:=[^}]+)?\}/g, '$1');
const clozeOf = (tk, w) => { let done = false; return tk.map(t => (!done && t.tg && (!w || t.lem === w)) ? (done = true, '_____') : t.t).join(''); };

EI.index = () => {
  EI.R.sort((a, b) => a.level.localeCompare(b.level) || a.pass - b.pass || a.n - b.n);
  EI.G.sort((a, b) => a.level.localeCompare(b.level) || a.n - b.n);
  for (const e of Object.values(EI.W)) {
    const tk = EI.toks(e.ex || '');
    e.exPlain = tk.map(t => t.t).join('');
    e.exSurf = (tk.find(t => t.tg) || { t: e.w }).t;
    e.exCloze = clozeOf(tk);
  }
  for (const r of EI.R) {
    r.S = []; r.wc = 0;
    r.text.forEach((para, p) => para.forEach(([en, vi], s) => {
      const tk = EI.toks(en), o = { i: r.S.length, p, s, vi, tk, plain: tk.map(t => t.t).join('') };
      r.S.push(o);
      r.wc += tk.reduce((n, t) => n + (t.w || t.n ? 1 : 0), 0);
      tk.forEach(t => {
        const e = t.tg && t.lem && EI.W[t.lem];
        if (!e) return;
        e.sents.push({ rid: r.id, si: o.i, surf: t.t });
        if (!e.rids.includes(r.id)) e.rids.push(r.id);
      });
    }));
    // grammar phrases -> mark tokens
    (r.grammar || []).forEach(([gid, phrase]) => {
      const want = phrase.toLowerCase().split(' ');
      r.S.forEach(o => {
        const ws = o.tk.filter(t => t.w);
        for (let i = 0; i + want.length <= ws.length; i++)
          if (want.every((x, j) => ws[i + j].t.toLowerCase() === x)) want.forEach((x, j) => { ws[i + j].g = gid; });
      });
    });
    [...(r.practice || []), ...(r.extra || [])].forEach(it => { if (it.ref) it.ref = EI.unbrace(it.ref); });
    const q = EI.practiceQueue(r), nz = q.filter(x => x[0] === 'z').length;
    r.est = Math.round((r.targets.length * 8 + r.wc / 85 * 60 + 60 + nz * 50 + (q.length - nz) * 28 + 120) / 60);
  }
};

/* ---------- time ---------- */
EI.today = () => { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 6e4) / 864e5); };
EI.dayDate = n => new Date(n * 864e5 + new Date().getTimezoneOffset() * 6e4 + 432e5);
EI.fmtDay = n => EI.dayDate(n).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

/* ---------- storage ---------- */
const KEY = 'ei.v1';
EI.TOPICS = { history: 'History', science: 'Science', engineering: 'Engineering & making', nature: 'Nature', body: 'Human body & health', space: 'Space', life: 'Everyday life', work: 'Work & money', travel: 'Places & travel', food: 'Food & cooking', culture: 'Arts & media', sport: 'Sport', language: 'Words & language' };
EI.blank = () => ({
  v: 1, created: EI.today(), lastExport: null, lastKind: null,
  settings: { theme: 'system', fs: 1, cap: 15, replayKey: 'Alt+R', voice: '', vsrc: 'ai', rate: 1, hl: true,
    topics: { history: 2, science: 1, engineering: 1, nature: 1, body: 1, space: 1, life: 1, work: 1, travel: 1, food: 1, culture: 1, sport: 1, language: 1 } },
  words: {}, gq: {}, lessons: {}, gram: {}, days: {}, errors: [], facts: [], sentences: [], scanned: {}, scores: {}, mine: {},
  cur: { v: 'today' }
});
EI.load = () => {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { s = null; }
  const b = EI.blank();
  EI.S = Object.assign(b, s || {});
  EI.S.settings = Object.assign(EI.blank().settings, (s && s.settings) || {});
  EI.S.settings.topics = Object.assign(EI.blank().settings.topics, (s && s.settings && s.settings.topics) || {});
};
EI.save = () => { try { localStorage.setItem(KEY, JSON.stringify(EI.S)); return true; } catch (e) { return false; } };
EI.day = () => { const t = EI.today(), D = EI.S.days; return D[t] || (D[t] = { t: 0, r: 0, l: 0, w: 0, a: 0 }); };
EI.log = (k, n) => { EI.day()[k] += n; };
EI.streak = () => {
  const D = EI.S.days, act = d => D[d] && (D[d].r || D[d].l || D[d].t > 60);
  let t = EI.today(), n = 0;
  if (!act(t)) t--;
  while (act(t)) { n++; t--; }
  return { n, total: Object.keys(D).filter(d => act(d)).length, today: !!act(EI.today()) };
};

/* ---------- spaced repetition ---------- */
// Reference schedule (days): end of session, 1, 3, 7, 14, 30, 60, 120.
EI.IV = [0, 1, 3, 7, 14, 30, 60, 120];
EI.status = w => {
  const r = EI.S.words[w];
  if (!r) return 'New';
  if (r.s === 'known') return 'Known';
  return r.step <= 1 ? 'Learning' : r.step <= 3 ? 'Familiar' : r.step <= 5 ? 'Strong' : 'Mastered';
};
EI.STATES = ['New', 'Learning', 'Familiar', 'Strong', 'Mastered'];
const newRec = (w, due) => {
  const e = EI.W[w] || { diff: 2 };
  return { s: 'srs', step: 0, due, m: e.diff === 1 ? 1.25 : e.diff === 3 ? 0.8 : 1, lap: 0, lt: '', ls: -1, h: [], enc: 0, first: EI.today() };
};
EI.enroll = (w, due) => { const S = EI.S; if (!S.words[w] || S.words[w].s !== 'srs') S.words[w] = newRec(w, due == null ? EI.today() : due); return S.words[w]; };
EI.setKnown = (w, on) => { if (on) EI.S.words[w] = Object.assign(EI.S.words[w] || newRec(w, 0), { s: 'known' }); else if (EI.S.words[w]) { EI.S.words[w].s = 'srs'; EI.S.words[w].due = EI.today(); } };
// res: 'ok' (recalled, no hint) | 'hint' (needed a hint) | 'bad'
EI.schedule = (r, res, easy) => {
  const t = EI.today();
  if (res === 'ok') {
    r.step = Math.min(7, r.step + (easy && (r.step === 0 || r.step === 2) ? 2 : 1));
    r.m = Math.min(1.6, r.m * 1.03);
    r.due = t + Math.max(1, Math.round(EI.IV[r.step] * r.m));
  } else if (res === 'hint') {
    r.step = Math.max(1, r.step);
    r.due = t + Math.max(1, Math.round(EI.IV[r.step] * r.m));
  } else {
    r.lap++; r.m = Math.max(0.5, r.m * 0.85); r.step = 1; r.due = t + 1;
  }
};
EI.answer = (key, res, ty, si) => {
  const S = EI.S, t = EI.today();
  if (key[0] === 'm') {
    const r = S.mine[key.slice(2)]; if (!r) return;
    EI.schedule(r, res, false); r.lt = ty; r.h.push([t, ty, res]); if (r.h.length > 40) r.h.shift();
  } else if (key[0] === 'w') {
    const w = key.slice(2), r = S.words[w]; if (!r || r.s !== 'srs') return;
    EI.schedule(r, res, EI.W[w] && EI.W[w].diff === 1);
    r.lt = ty; if (si != null) r.ls = si;
    r.h.push([t, ty, res]); if (r.h.length > 40) r.h.shift();
  } else {
    const r = S.gq[key]; if (!r) return;
    EI.schedule(r, res, false);
    r.h.push([t, 'G', res]); if (r.h.length > 20) r.h.shift();
    if (r.step >= 5) delete S.gq[key]; // a grammar question answered right over a month apart is retired
  }
  EI.log('r', 1);
};
EI.due = () => {
  const S = EI.S, t = EI.today(), out = [];
  const pri = r => (t - r.due + 1) / (EI.IV[r.step] || 0.5) * (1 + 0.15 * r.lap);
  for (const w in S.words) { const r = S.words[w]; if (r.s === 'srs' && r.due <= t && EI.W[w]) out.push({ k: 'w|' + w, p: pri(r) }); }
  for (const k in S.gq) { const r = S.gq[k]; if (r.due <= t && EI.gItem(k)) out.push({ k, p: pri(r) }); }
  for (const k in S.mine) { const r = S.mine[k]; if (r.due <= t && EI.mineSent(r)) out.push({ k: 'm|' + k, p: pri(r) }); }
  return out.sort((a, b) => b.p - a.p).map(x => x.k);
};
EI.forecast = () => {
  const S = EI.S, t = EI.today(), out = [0, 0, 0, 0, 0, 0, 0];
  const add = r => { const d = Math.max(0, r.due - t); if (d < 7) out[d]++; };
  for (const w in S.words) if (S.words[w].s === 'srs') add(S.words[w]);
  for (const k in S.gq) add(S.gq[k]);
  for (const k in S.mine) add(S.mine[k]);
  return out;
};
EI.gItem = key => { const [, gid, i] = key.split('|'), g = EI.gById(gid); return g && g.q[+i] ? { g, it: g.q[+i] } : null; };

EI.sentsOf = w => {
  const e = EI.W[w];
  const out = e.sents.map(s => { const r = EI.rById(s.rid), o = r.S[s.si]; return { kind: 'r', rid: s.rid, si: s.si, surf: s.surf, plain: o.plain, cloze: clozeOf(o.tk, w), title: r.title }; });
  if (e.ex) out.push({ kind: 'x', surf: e.exSurf, plain: e.exPlain, cloze: e.exCloze });
  return out;
};
// Build one review item. Types get harder: A story sentence · B new sentence · C listening · D meaning in context · E write.
/* ---------- my words: any word the learner picked while reading, reviewed inside the story sentence it came from ---------- */
EI.mineSent = m => { const r = EI.rById(m.rid), o = r && r.S[m.si]; return o && o.tk[m.j] && o.tk[m.j].t.toLowerCase() === m.surf.toLowerCase() ? { r, o } : null; };
EI.addMine = (r, si, j) => {
  const o = r.S[si], t = o.tk[j], key = t.t.toLowerCase(), S = EI.S;
  if (!S.mine[key]) { const g = r.gloss || {}; S.mine[key] = { surf: t.t, rid: r.id, si, j, vi: g[key] || g[key.replace(/(es|s|ed|d|ing)$/, '')] || '', step: 0, due: EI.today(), m: 1, lap: 0, lt: '', h: [], first: EI.today() }; }
  return key;
};
EI.mineItem = key => {
  const m = EI.S.mine[key.slice(2)], x = m && EI.mineSent(m); if (!x) return null;
  const order = ['A', 'C', 'E'].filter(ty => ty !== 'C' || EI.audio.ok); let ty = order[m.h.length % order.length]; if (ty === m.lt) ty = order[(order.indexOf(ty) + 1) % order.length];
  const cloze = x.o.tk.map((t, i) => i === m.j ? '_____' : t.t).join(''), rv = { key, ty };
  const why = (m.vi ? m.surf + ': ' + m.vi + '. ' : '') + 'Cả câu: ' + x.o.vi;
  if (ty === 'E') return { t: 'write', q: 'Write your own sentence with “' + m.surf.toLowerCase() + '”.', model: x.o.plain, why, self: true, rv, head: 'Your word · use it' };
  return { t: 'gap', q: cloze, a: [m.surf], why, rv, audio: ty === 'C' ? x.o.plain : null, head: ty === 'A' ? 'Your word · from “' + x.r.title + '” · type the missing word' : 'Your word · listen, then type the missing word' };
};
EI.reviewItem = key => {
  if (key[0] === 'm') return EI.mineItem(key);
  if (key[0] === 'g') { const x = EI.gItem(key); return x ? Object.assign({}, x.it, { rv: { key, ty: 'G' }, head: 'Grammar · ' + x.g.title }) : null; }
  const w = key.slice(2), e = EI.W[w], rec = EI.S.words[w]; if (!e || !rec) return null;
  const ss = EI.sentsOf(w), order = ['A', 'B', 'C', 'D', 'E'];
  const avail = ty => ty === 'A' ? ss.some(s => s.kind === 'r') : ty === 'C' ? EI.audio.ok : ty === 'D' ? Object.keys(EI.W).length > 3 : true;
  let ty = rec.lap >= 3 ? 'D' : rec.step >= 5 ? order[1 + rec.h.length % 4] : order[Math.min(4, rec.step)];
  for (let i = 0; i < 5 && (ty === rec.lt || !avail(ty)); i++) ty = order[(order.indexOf(ty) + 1) % 5];
  const read = i => ss[i].kind === 'r' && EI.lessonDone(ss[i].rid);   // prefer sentences from stories the learner has read
  let pool = ss.map((s, i) => i).filter(i => ty === 'A' ? read(i) : ty === 'B' ? (ss[i].kind === 'x' || ss.length === 1) : (ss[i].kind === 'x' || read(i)));
  if (!pool.length && ty === 'A') pool = ss.map((s, i) => i).filter(i => ss[i].kind === 'r');
  const cands = pool.length ? pool : ss.map((s, i) => i);
  const fresh = cands.filter(i => i !== rec.ls), from = fresh.length ? fresh : cands; // after a miss, never the same sentence again
  const s = ss[from[rec.h.length % from.length]], rv = { key, ty, si: ss.indexOf(s), w };
  const hard = rec.lap >= 3;
  if (ty === 'A' || ty === 'B' || ty === 'C')
    return { t: 'gap', q: s.cloze, a: [s.surf, w], why: e.w + ' — ' + e.def, rv, hard, audio: ty === 'C' ? s.plain : null,
      head: ty === 'A' ? 'From “' + s.title + '” · type the missing word' : ty === 'B' ? 'A new sentence · type the missing word' : 'Listen, then type the missing word' };
  if (ty === 'D') {
    const others = Object.values(EI.W).filter(x => x.w !== w).sort((a, b) => (b.pos === e.pos) - (a.pos === e.pos) || hash(a.w + w) - hash(b.w + w)).slice(0, 2);
    const o = [e.def, ...others.map(x => x.def)], ord = [0, 1, 2].sort((a, b) => hash(o[a] + rec.h.length) - hash(o[b] + rec.h.length));
    return { t: 'mc', q: s.plain, mark: s.surf, sub: 'In this sentence, “' + s.surf + '” means…', o: ord.map(i => o[i]), a: ord.indexOf(0), why: e.w + ' — ' + e.def, rv, hard, head: 'Meaning in context', fixed: true };
  }
  return { t: 'write', q: 'Write your own sentence with “' + w + '”.', model: e.exPlain, self: true, rv, hard, head: 'Use the word' };
};
function hash(s) { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
EI.hash = hash;

/* ---------- what to study next ---------- */
EI.lessonDone = id => !!(EI.S.lessons[id] || {}).doneDay;

/* ---------- practice: a scored test in three parts ---------- */
// Vocabulary part = "the story with gaps": every target word is blanked once, spread over the paragraphs.
EI.cloze = r => {
  if (r._cz) return r._cz;
  const occ = {}, perP = {}, perS = {}, pick = [];
  r.S.forEach(o => o.tk.forEach((t, j) => { if (t.tg && r.targets.includes(t.lem)) (occ[t.lem] = occ[t.lem] || []).push({ si: o.i, j, p: o.p, surf: t.t, lem: t.lem }); }));
  Object.keys(occ).sort((a, b) => occ[a].length - occ[b].length || a.localeCompare(b)).forEach(lem => {
    const best = occ[lem].slice().sort((a, b) => (perS[a.si] || 0) - (perS[b.si] || 0) || (perP[a.p] || 0) - (perP[b.p] || 0) || a.si - b.si)[0];
    perP[best.p] = (perP[best.p] || 0) + 1; perS[best.si] = (perS[best.si] || 0) + 1; pick.push(best);
  });
  const chunks = [];
  [...new Set(r.S.map(o => o.p))].forEach(p => {
    const sents = r.S.filter(o => o.p === p), bl = pick.filter(b => b.p === p).sort((a, b) => a.si - b.si || a.j - b.j);
    if (!bl.length) return;
    if (bl.length <= 5) { chunks.push({ sents: sents.map(o => o.i), blanks: bl }); return; }
    const cut = bl[Math.ceil(bl.length / 2) - 1].si, a = bl.filter(b => b.si <= cut), b2 = bl.filter(b => b.si > cut);
    chunks.push({ sents: sents.filter(o => o.i <= cut).map(o => o.i), blanks: a });
    if (b2.length) chunks.push({ sents: sents.filter(o => o.i > cut).map(o => o.i), blanks: b2 });
  });
  return (r._cz = chunks);
};
EI.sec = it => (it.k && it.k[0] === 'g') ? 'g' : (it.k && it.k[0] === 'w') ? 'w' : 'c';
// Queue of item references: p<i> practice, x<i> extra, z<i> story-with-gaps chunk, g|<lesson>|<i> question from a linked grammar lesson.
EI.practiceQueue = r => {
  const all = [...(r.practice || []).map((it, i) => ['p' + i, it]), ...(r.extra || []).map((it, i) => ['x' + i, it])];
  const of = s => all.filter(x => EI.sec(x[1]) === s);
  const C = of('c').sort((a, b) => (a[1].t === 'dict') - (b[1].t === 'dict')).map(x => x[0]);
  const gl = [], cnt = {};
  (r.grammar || []).forEach(x => { cnt[x[0]] = (cnt[x[0]] || 0) + 1; });
  Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a] || a.localeCompare(b)).forEach(gid => {
    const g = EI.gById(gid); if (!g || gl.length >= 2 || all.some(x => x[1].k === 'g:' + gid)) return;
    const cand = g.q.map((it, i) => i).filter(i => g.q[i].t !== 'write'); if (cand.length) gl.push('g|' + gid + '|' + cand[EI.hash(r.id + gid) % cand.length]);
  });
  return [...C, ...EI.cloze(r).map((_, i) => 'z' + i), ...of('w').map(x => x[0]), ...of('g').map(x => x[0]), ...gl];
};
EI.nextReading = () => {
  const S = EI.S, left = EI.R.filter(r => !EI.lessonDone(r.id));
  if (!left.length) return null;
  const first = left[0], pool = left.filter(r => r.level === first.level && r.pass === first.pass);
  const done = EI.R.filter(r => EI.lessonDone(r.id)), cnt = {}, W = S.settings.topics;
  done.forEach(r => { cnt[r.topic] = (cnt[r.topic] || 0) + 1; });
  const sum = Object.values(W).reduce((a, b) => a + b, 0) || 1;
  const order = done.slice().sort((a, b) => S.lessons[a.id].doneDay - S.lessons[b.id].doneDay), last2 = order.slice(-2);
  const score = r => (W[r.topic] || 0) / sum - (cnt[r.topic] || 0) / Math.max(1, done.length)
    - (last2.length === 2 && last2.every(x => x.region === r.region) ? 1 : 0) - ((W[r.topic] || 0) === 0 ? 5 : 0);
  return pool.slice().sort((a, b) => score(b) - score(a) || a.n - b.n)[0];
};
EI.nextGrammar = () => {
  const S = EI.S, left = EI.G.filter(g => !(S.gram[g.id] && S.gram[g.id].done));
  if (!left.length) return null;
  const seen = new Set();
  EI.R.filter(r => EI.lessonDone(r.id)).forEach(r => (r.grammar || []).forEach(([gid]) => seen.add(gid)));
  return left.find(g => seen.has(g.id)) || left[0];
};
EI.plan = () => {
  const S = EI.S, due = EI.due(), cap = S.settings.cap, rev = due.slice(0, cap);
  const started = L => L && !L.doneDay && L.stage !== 'predict';
  const R = r => ({ kind: 'reading', id: r.id, title: r.title, mins: r.est });
  const G = g => ({ kind: 'grammar', id: g.id, title: g.title, mins: g.mins || 8 });
  const openR = EI.R.find(r => started(S.lessons[r.id])), nr = EI.nextReading();
  let lesson = null;
  if (openR) lesson = Object.assign(R(openR), { resume: true });
  else if (nr) lesson = R(nr);
  else {
    const openG = EI.G.find(g => S.gram[g.id] && !S.gram[g.id].done), ng = EI.nextGrammar();
    const low = EI.R.filter(r => S.scores[r.id]).sort((x, y) => S.scores[x.id].last - S.scores[y.id].last)[0];
    lesson = openG ? Object.assign(G(openG), { resume: true }) : ng ? G(ng) : low ? Object.assign(R(low), { again: true }) : null;
  }
  return { rev, dueAll: due.length, lesson, mins: lesson ? lesson.mins : 0 };
};
EI.cover = () => {
  const out = [];
  for (const level of ['A2', 'B1', 'B2', 'C1']) {
    const total = Object.values(EI.W).filter(e => e.level === level).length;
    for (const pass of [1, 2]) {
      const rs = EI.R.filter(r => r.level === level && r.pass === pass), set = new Set();
      rs.filter(r => EI.lessonDone(r.id)).forEach(r => r.targets.forEach(w => set.add(w)));
      out.push({ level, pass, total, covered: set.size, readings: rs.length, done: rs.filter(r => EI.lessonDone(r.id)).length });
    }
  }
  return out;
};

/* ---------- backup ---------- */
EI.exportText = () => JSON.stringify({ app: 'english-improve', v: 1, at: new Date().toISOString(), state: EI.S });
EI.parseBackup = txt => { const o = JSON.parse(txt); if (!o || o.app !== 'english-improve' || !o.state || !o.state.words) throw new Error('Not an English Improve backup file.'); return o; };
EI.importState = (o, mode) => {
  const inc = o.state, S = EI.S;
  if (mode === 'replace') { EI.S = Object.assign(EI.blank(), inc); EI.S.settings = Object.assign(EI.blank().settings, inc.settings || {}); EI.S.cur = { v: 'today' }; return; }
  // merge: for every item keep the copy with more study history; nothing is deleted
  for (const w in inc.words) { const a = S.words[w], b = inc.words[w]; if (!a || (b.h || []).length > (a.h || []).length || (a.s !== 'known' && b.s === 'known' && !(a.h || []).length)) S.words[w] = b; }
  for (const k in inc.gq || {}) { const a = S.gq[k], b = inc.gq[k]; if (!a || b.h.length > a.h.length) S.gq[k] = b; }
  for (const id in inc.lessons || {}) { const a = S.lessons[id], b = inc.lessons[id]; if (!a || (b.doneDay && !a.doneDay)) S.lessons[id] = b; }
  for (const id in inc.scores || {}) { const a = S.scores[id], b = inc.scores[id]; if (!a || b.n > a.n) S.scores[id] = b; else a.best = Math.max(a.best, b.best); }
  for (const id in inc.gram || {}) { const a = S.gram[id], b = inc.gram[id]; if (!a || (b.done && !a.done)) S.gram[id] = b; }
  for (const d in inc.days || {}) { const a = S.days[d], b = inc.days[d]; S.days[d] = a ? { t: Math.max(a.t, b.t), r: Math.max(a.r, b.r), l: Math.max(a.l, b.l), w: Math.max(a.w, b.w), a: Math.max(a.a, b.a) } : b; }
  const uniq = (xs, f) => { const seen = new Set(); return xs.filter(x => { const k = f(x); if (seen.has(k)) return false; seen.add(k); return true; }); };
  S.facts = uniq([...S.facts, ...(inc.facts || [])], x => x);
  S.sentences = uniq([...S.sentences, ...(inc.sentences || [])], x => x.en + '|' + x.kind);
  S.errors = uniq([...S.errors, ...(inc.errors || [])], x => x.d + '|' + x.k + '|' + x.q).slice(-300);
  Object.assign(S.scanned, inc.scanned || {});
  S.mine = S.mine || {}; for (const k in inc.mine || {}) { const a = S.mine[k], b = inc.mine[k]; if (!a || b.h.length > a.h.length) S.mine[k] = b; }
  S.created = Math.min(S.created, inc.created || S.created);
};

/* ---------- sync between devices (optional) ----------
   No accounts: a random 16-character code is the key on a small Cloudflare Worker (sync/worker.js).
   Progress stays in this browser first; the online copy is merged with the same rules as Import → Merge.
   Settings, the open screen and backup dates stay per device. */
EI.SYNC_URL = 'https://ei-sync.chanhoang226.workers.dev';   // the deployed Worker (empty = sync hidden)
(function () {
  const Y = EI.sync = {}, CK = 'ei.sync', AL = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  const FIELDS = ['created', 'words', 'gq', 'lessons', 'scores', 'gram', 'days', 'facts', 'sentences', 'errors', 'scanned', 'mine'];
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } return null; };
  Y.url = () => (ls('ei.syncUrl') || EI.SYNC_URL || '').replace(/\/+$/, '');   // ei.syncUrl: override for tests
  Y.available = () => !EI.inlined && !!Y.url() && typeof fetch === 'function' && !!(window.crypto && crypto.getRandomValues);
  Y.cfg = () => { try { return JSON.parse(ls(CK)) || {}; } catch (e) { return {}; } };
  Y.setCfg = c => ls(CK, c ? JSON.stringify(c) : null);
  Y.on = () => Y.available() && !!Y.cfg().code;
  Y.newCode = () => { const b = new Uint8Array(16); crypto.getRandomValues(b); return Array.from(b, x => AL[x & 31]).join(''); };
  Y.clean = s => String(s || '').toUpperCase().replace(/[\s-]/g, '').replace(/[IL]/g, '1').replace(/O/g, '0');
  Y.valid = c => /^[0-9A-HJKMNP-TV-Z]{16}$/.test(c);
  Y.show = c => String(c || '').replace(/(.{4})(?=.)/g, '$1-');
  Y.payload = () => { const o = {}; FIELDS.forEach(k => { o[k] = EI.S[k]; }); return o; };
  // order-free fingerprint: the same progress gives the same text on every device, so nothing is written twice
  const canon = v => v === null || typeof v !== 'object' ? JSON.stringify(v === undefined ? null : v)
    : Array.isArray(v) ? '[' + v.map(canon).sort().join(',') + ']'
    : '{' + Object.keys(v).filter(k => v[k] !== undefined).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  Y.canon = canon;
  const req = async (method, code, body, keepalive) => {
    const res = await fetch(Y.url() + '/v1/s/' + code, { method, cache: 'no-store', keepalive: !!keepalive, headers: body ? { 'content-type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
    let data = null; try { data = await res.json(); } catch (e) { /* no body */ }
    return { status: res.status, data };
  };
  const note = (c, err, status) => { c.err = err; c.errStatus = status || null; Y.setCfg(c); return { ok: false, why: err }; };
  const gone = () => { Y.setCfg(null); return { ok: false, why: 'deleted' }; };
  let busy = null;
  // opt.create: an unknown code is created (new code); otherwise an unknown code is an error (joining)
  Y.run = opt => busy || (busy = runOnce(opt || {}).finally(() => { busy = null; }));
  async function runOnce(opt) {
    const c = Y.cfg();
    if (!c.code || !Y.available()) return { ok: false, why: 'off' };
    if (navigator.onLine === false) return note(c, 'offline');
    try {
      let r = await req('GET', c.code);
      if (r.status === 410) return gone();
      if (r.status === 404 && opt.create) r = { status: 200, data: { rev: '', state: null } };
      if (r.status === 404) return note(c, 'not_found');
      if (r.status !== 200 || !r.data) return note(c, 'error', r.status);
      for (let i = 0; i < 3; i++) {
        const remote = r.data, had = canon(Y.payload());
        if (remote.state && remote.state.words) EI.importState({ state: remote.state }, 'merge');
        const mine = Y.payload(), h = canon(mine);
        let rev = remote.rev || '';
        if (!remote.state || h !== canon(remote.state)) {
          const p = await req('PUT', c.code, { base: rev, state: mine });
          if (p.status === 409 && p.data) { r = p; continue; }
          if (p.status === 410) return gone();
          if (p.status !== 200 || !p.data) return note(c, 'error', p.status);
          rev = p.data.rev;
        }
        EI.save();
        Object.assign(c, { rev, hash: h, at: Date.now(), err: null, errStatus: null }); Y.setCfg(c);
        return { ok: true, changed: had !== h };
      }
      return note(c, 'busy');
    } catch (e) { return note(c, 'network'); }
  }
  Y.create = () => { Y.setCfg({ code: Y.newCode() }); return Y.run({ create: true }); };
  Y.join = async code => {
    const prev = Y.cfg(); Y.setCfg({ code });
    const r = await Y.run({});
    if (!r.ok && r.why !== 'deleted') Y.setCfg(prev.code ? prev : null);
    return r;
  };
  Y.stop = () => Y.setCfg(null);
  Y.remove = async () => {
    const c = Y.cfg(); if (!c.code) return { ok: true };
    try { const r = await req('DELETE', c.code); if (r.status !== 200) return { ok: false, why: 'error' }; } catch (e) { return { ok: false, why: 'network' }; }
    Y.setCfg(null); return { ok: true };
  };
  Y.dirty = () => { const c = Y.cfg(); return !!c.code && canon(Y.payload()) !== c.hash; };
  // when the tab is hidden or closed: send the changes without waiting (keepalive allows about 64 KB)
  Y.flush = () => {
    const c = Y.cfg(); if (!c.code || !Y.available() || busy) return;
    const mine = Y.payload(), h = canon(mine); if (h === c.hash) return;
    const body = { base: c.rev || '', state: mine }; if (JSON.stringify(body).length > 60000) return;
    req('PUT', c.code, body, true).then(p => { if (p.status === 200 && p.data) { const n = Y.cfg(); if (n.code === c.code) { Object.assign(n, { rev: p.data.rev, hash: h, at: Date.now(), err: null }); Y.setCfg(n); } } }).catch(() => {});
  };
  // automatic sync: on open, when the tab comes back, when the network returns, and every 5 minutes if something changed
  Y.start = (onDone, paused) => {
    if (!Y.available()) return;
    const go = force => { if (!Y.cfg().code || (paused && paused()) || (!force && !Y.dirty())) return; Y.run().then(r => onDone && onDone(r)); };
    go(true);
    window.addEventListener('online', () => go(true));
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') Y.flush(); else if (Date.now() - (Y.cfg().at || 0) > 60000) go(true); });
    setInterval(() => { if (document.visibilityState === 'visible') go(false); }, 5 * 60 * 1000);
  };
})();

/* ---------- recorded AI voice: file name for a text (same function in tools/audio-items.js) ---------- */
EI.audioKey = str => {   // cyrb53 hash, base 36
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
};

/* ---------- audio (browser speech; label it honestly) ---------- */
const A = EI.audio = { tts: typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined', voices: [] };
// Recorded AI voice: audio/<EI.audioKey(text)>.mp3 made by tools/make-audio.py; audio/index.js lists them (key -> 'h:xxxx').
const VNAME = { h: 'Heart', b: 'Bella' };
A.rec = () => !EI.inlined && EI.S.settings.vsrc !== 'browser' && typeof fetch === 'function' && typeof Audio !== 'undefined' && !!EI.audioIndex && Object.keys(EI.audioIndex).length > 0;
A.fileFor = text => { if (!A.rec()) return null; const k = EI.audioKey(String(text || '').trim()), v = EI.audioIndex[k]; if (!v) return null; const p = v.split(':'); return { url: 'audio/' + k + '.mp3?v=' + p[1], voice: p[0], dur: p[2] ? +p[2] / 10 : null }; };
// length in seconds at 1×: from the file list when there is a file, otherwise a guess for the browser voice (about 2.6 words a second)
A.dur = text => { const f = A.fileFor(text); if (f && f.dur) return { s: f.dur, est: false }; const n = String(text || '').split(/\s+/).filter(Boolean).length; return { s: 0.5 + n / 2.6, est: true }; };
Object.defineProperty(A, 'ok', { get: () => A.tts || A.rec() });
A.init = () => {
  if (!A.tts) return;
  const f = () => { A.voices = speechSynthesis.getVoices().filter(v => /^en[-_]US/i.test(v.lang)); };
  f(); try { speechSynthesis.addEventListener('voiceschanged', f); } catch (e) { /* older browsers */ }
};
A.voice = () => A.voices.find(v => v.name === EI.S.settings.voice) || A.voices.find(v => /Google US|Samantha|Aria|Jenny|Ava|Zira/i.test(v.name)) || A.voices[0] || null;
A.label = text => {
  const f = text ? A.fileFor(text) : null;
  if (f) return 'AI voice (Kokoro · ' + VNAME[f.voice] + ')';
  if (!text && A.rec()) return 'AI voice (Kokoro: Heart, Bella)' + (A.tts ? ' · browser voice for other text' : '');
  return !A.tts ? 'No speech voice on this device' : 'Machine voice (browser, en-US)' + (A.voice() ? ' · ' + A.voice().name : '');
};
let el = null, seq = 0, blobUrl = null;
const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
const speak = (text, opt, done) => {
  if (!A.tts) { done(false); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text), v = A.voice();
  u.lang = 'en-US'; if (v) u.voice = v; u.rate = opt.rate || EI.S.settings.rate || 1;
  u.onend = () => done(true); u.onerror = () => done(false);
  A.cur = u; // keep a reference so the browser does not drop the utterance early
  speechSynthesis.speak(u);
};
A.say = (text, opt) => {
  opt = opt || {};
  const my = ++seq, t0 = Date.now();
  let fin = false;
  const done = ok => { if (fin || my !== seq) return; fin = true; EI.log('a', Math.min(120, (Date.now() - t0) / 1000)); opt.onend && opt.onend(ok); };
  if (A.tts) speechSynthesis.cancel();
  const f = A.fileFor(text);
  A.playing = null;
  if (!f) { speak(text, opt, done); return; }
  // one media element, started inside the tap so phones allow later plays; the file comes as a blob (no range requests)
  if (!el) el = new Audio();
  try { el.pause(); } catch (e) { /* ignore */ }
  if (!el.dataset || !el.dataset.unlocked) { el.src = SILENT; el.play().then(() => { el.dataset.unlocked = '1'; }).catch(() => {}); }
  fetch(f.url).then(r => { if (!r.ok) throw new Error('audio ' + r.status); return r.blob(); }).then(b => {
    if (my !== seq) return;
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    blobUrl = URL.createObjectURL(b);
    el.onended = () => done(true);
    el.onerror = () => { if (my === seq) speak(text, opt, done); };
    el.src = blobUrl; el.playbackRate = opt.rate || EI.S.settings.rate || 1;
    if (opt.start > 0) el.addEventListener('loadedmetadata', () => { if (my === seq) try { el.currentTime = Math.min(opt.start, (el.duration || opt.start + 1) - 0.05); } catch (e) { /* ignore */ } }, { once: true });
    try { el.preservesPitch = true; el.webkitPreservesPitch = true; } catch (e) { /* ignore */ }
    A.playing = f;
    return el.play();
  }).catch(() => { if (my === seq) speak(text, opt, done); });
};
// change speed while a file plays, without starting again (the browser voice cannot do this: returns false)
A.setRate = r => { if (el && A.playing && !el.paused && !el.ended) { el.playbackRate = r; return true; } return false; };
// seconds already heard in the current file (null for the browser voice)
A.pos = () => (el && A.playing && !el.paused && isFinite(el.currentTime) ? el.currentTime : null);
A.stop = () => { seq++; if (el) try { el.pause(); } catch (e) { /* ignore */ } if (A.tts) speechSynthesis.cancel(); };
})();
