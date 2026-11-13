/* English Improve — interface. Labels in English, learning explanations in Vietnamese. */
(function () {
'use strict';
const EI = window.EI, A = {}, $ = s => document.querySelector(s);
let S, run = null, sh = null, viOpen = false, openVi = new Set(), toastT = 0, lp = { t: 0, fired: false };
const P = { on: false, i: 0, seq: 0, rid: null };                 // reading player
const rec = { mr: null, chunks: [], url: null, on: false, err: '' }; // speak-along recorder (memory only)
const LV = ['A2', 'B1', 'B2', 'C1'];
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ICON = {
  phones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  play: '<path d="M8 5l11 7-11 7z"/>', pause: '<path d="M8 5v14M16 5v14"/>',
  prev: '<path d="M18 6l-8 6 8 6zM7 6v12"/>', next: '<path d="M6 6l8 6-8 6zM17 6v12"/>',
  again: '<path d="M4 4v6h6"/><path d="M4.5 10a8 8 0 1 1-.5 4"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.9 6.6 19.8l1.1-6.1L3.2 9.4l6.1-.8z"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>', check: '<path d="M5 12l5 5 9-10"/>', back: '<path d="M15 5l-7 7 7 7"/>',
  gear: '<path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0"/><circle cx="15" cy="6" r="2.2"/><circle cx="9" cy="12" r="2.2"/><circle cx="17" cy="18" r="2.2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  today: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
  vocab: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  grammar: '<path d="M4 6h16M4 12h10M4 18h7"/><path d="M16 16l2 2 4-5"/>',
  reading: '<path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14"/>',
  progress: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
};
const ic = n => '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + ICON[n] + '</svg>';
const NAV = [['today', 'Today'], ['vocab', 'Vocabulary'], ['grammar', 'Grammar'], ['reading', 'Reading'], ['progress', 'Progress']];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const norm = s => String(s).toLowerCase().replace(/’/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const lev = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; };
const toast = m => { clearTimeout(toastT); let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); } t.textContent = m; toastT = setTimeout(() => t.remove(), 2600); };
const mark = (plain, surf) => { const i = plain.indexOf(surf); return i < 0 ? esc(plain) : esc(plain.slice(0, i)) + '<b>' + esc(surf) + '</b>' + esc(plain.slice(i + surf.length)); };
const camb = w => 'https://dictionary.cambridge.org/dictionary/english/' + encodeURIComponent(String(w).toLowerCase().replace(/ /g, '-'));

/* ================= shell ================= */
function applyTheme() {
  const st = S.settings, root = document.documentElement;
  if (st.theme === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', st.theme);
  root.style.setProperty('--fs', st.fs);
}
function go(cur) {
  EI.audio.stop(); P.on = false; closeSheet(); S.cur = cur; run = null; viOpen = false; openVi = new Set();
  EI.save(); render(); const m = $('#main'); if (m) m.scrollTop = 0;
}
function render() {
  const c = S.cur, v = c.v;
  applyTheme();
  const sec = { review: 'today', scan: 'vocab' }[v] || v;
  const noList = v === 'review' || v === 'scan';
  const detail = !((v === 'vocab' && !c.w) || (v === 'grammar' && !c.gid) || (v === 'reading' && !c.rid));
  const focus = v === 'reading' && c.rid && c.focus;
  const canBack = (v === 'vocab' && c.w) || (v === 'grammar' && c.gid) || (v === 'reading' && c.rid) || v === 'scan' || v === 'settings' || v === 'info';
  $('#app').innerHTML =
    '<div class="shell' + (noList ? ' no-list' : '') + (detail ? ' detail' : '') + (focus ? ' focus' : '') + '">' +
    '<header class="topbar">' + (canBack ? '<button class="btn icon ghost" data-a="back" aria-label="Back">' + ic('back') + '</button>' : '') +
      '<div class="brand">English <span>Improve</span></div>' +
      '<button class="btn icon ghost" data-a="go" data-v="settings" aria-label="Settings">' + ic('gear') + '</button>' +
      '<button class="btn icon ghost" data-a="go" data-v="info" aria-label="Info">' + ic('info') + '</button></header>' +
    '<nav class="rail" aria-label="Main menu"><div class="brand">English <span>Improve</span></div>' +
      NAV.map(([k, t]) => '<button class="nav' + (sec === k ? ' on' : '') + '" data-a="go" data-v="' + k + '">' + ic(k) + t + '</button>').join('') +
      '<div class="grow"></div>' +
      '<button class="nav' + (v === 'settings' ? ' on' : '') + '" data-a="go" data-v="settings">' + ic('gear') + 'Settings</button>' +
      '<button class="nav' + (v === 'info' ? ' on' : '') + '" data-a="go" data-v="info">' + ic('info') + 'Info</button></nav>' +
    '<aside class="list">' + (noList ? '' : listHTML()) + '</aside>' +
    '<main class="main" id="main">' + mainHTML() + '</main>' +
    '<nav class="tabs" aria-label="Main menu">' + NAV.map(([k, t]) => '<button class="tab' + (sec === k ? ' on' : '') + '" data-a="go" data-v="' + k + '">' + ic(k) + t + '</button>').join('') + '</nav></div>';
  const L = v === 'reading' && c.rid && S.lessons[c.rid];
  if (L && L.stage === 'read') { const m = $('#main'); if (L.scroll) m.scrollTop = L.scroll; m.onscroll = () => { L.scroll = m.scrollTop; }; paintPlayer(); }
  const inp = $('#ans'); if (inp && !inp.disabled && !matchMedia('(max-width:820px)').matches) inp.focus();
}
function listHTML() {
  const v = S.cur.v;
  if (v === 'vocab') return lVocab();
  if (v === 'grammar') return lGrammar();
  if (v === 'reading') return lReading();
  const jump = (id, t) => '<button class="li" data-a="jump" data-id="' + id + '"><span class="t">' + t + '</span></button>';
  if (v === 'today') { const st = EI.streak(), p = EI.plan();
    return '<h2>Today</h2><p class="m muted">' + new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + '</p>' +
      '<div class="stat"><b class="num">' + p.dueAll + '</b><span>words due for review</span></div><p class="eyebrow">Last three weeks</p>' + calHTML(21); }
  if (v === 'progress') return '<h2>Progress</h2>' + [['p-week', 'This week'], ['p-score', 'Practice scores'], ['p-cover', 'Coverage'], ['p-mem', 'Memory'], ['p-cal', 'Study days'], ['p-err', 'Mistakes'], ['p-facts', 'Fact collection'], ['p-mine', 'My words'], ['p-sent', 'My sentences']].map(x => jump(x[0], x[1])).join('');
  if (v === 'settings') return '<h2>Settings</h2>' + [['s-look', 'Display'], ['s-study', 'Study'], ['s-audio', 'Audio'], ['s-topics', 'Topic mix'], ...(EI.sync.available() ? [['s-sync', 'Sync']] : []), ['s-data', 'Backup']].map(x => jump(x[0], x[1])).join('');
  if (v === 'info') return '<h2>Info</h2>' + [['i-how', 'How to use'], ['i-srs', 'How review works'], ['i-data', 'Data sources'], ['i-src', 'Sources for each story'], ['i-audio', 'Audio'], ['i-missing', 'Not available yet']].map(x => jump(x[0], x[1])).join('');
  return '';
}
function mainHTML() {
  const c = S.cur;
  switch (c.v) {
    case 'today': return vToday();
    case 'review': return vReview();
    case 'vocab': return c.w && EI.W[c.w] ? vWord(EI.W[c.w]) : page('<div class="ph"><h1>Vocabulary</h1></div><p class="vi">Chọn một từ ở cột bên trái để xem chi tiết.</p>');
    case 'scan': return vScan();
    case 'grammar': return c.gid && EI.gById(c.gid) ? vGram(EI.gById(c.gid)) : page('<div class="ph"><h1>Grammar</h1></div><p class="vi">Chọn một chủ điểm ở cột bên trái. Mỗi bài xong trong một lần ngồi.</p>');
    case 'reading': return c.rid && EI.rById(c.rid) ? vLesson(EI.rById(c.rid)) : page('<div class="ph"><h1>Reading</h1></div><p class="vi">Chọn cấp độ, rồi chọn một câu chuyện. Không khóa thứ tự — đọc bài nào bạn thấy tò mò.</p>');
    case 'progress': return vProgress();
    case 'settings': return vSettings();
    case 'info': return vInfo();
  }
  return '';
}
const page = h => '<div class="page">' + h + '</div>';

/* ================= Today ================= */
function calHTML(n) {
  const t = EI.today(), D = S.days, first = t - n + 1, pad = (EI.dayDate(first).getDay() + 6) % 7; let h = '<div class="cal" aria-label="Study days">';
  for (let i = 0; i < pad; i++) h += '<span></span>';
  for (let d = first; d <= t; d++) { const a = D[d] && (D[d].r || D[d].l || D[d].t > 60); h += '<i class="' + (a ? 's' : '') + (d === t ? ' t' : '') + '">' + EI.dayDate(d).getDate() + '</i>'; }
  return h + '</div>';
}
function vToday() {
  const p = EI.plan(), st = EI.streak(), ls = p.lesson, t = EI.today();
  const inMem = Object.values(S.words).filter(r => r.s === 'srs').length;
  const lastX = S.lastExport == null ? S.created : S.lastExport, needBackup = Object.keys(S.lessons).length && t - lastX >= 14 && !(EI.sync.on() && Date.now() - (EI.sync.cfg().at || 0) < 7 * 864e5);
  const sc = Object.values(S.scores), avg = sc.length ? Math.round(sc.reduce((a, x) => a + x.last, 0) / sc.length) : null;
  let h = '<div class="ph"><p class="eyebrow">' + new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + '</p><h1>Today</h1></div>';
  h += '<section class="card"><h2>' + (ls ? (ls.kind === 'reading' ? (ls.again ? 'Read again' : ls.resume ? 'Continue your story' : 'Today’s story') : 'Today’s grammar') + ' · about ' + ls.mins + ' min' : 'Nothing new to study') + '</h2>';
  if (ls) h += '<p class="def">' + esc(ls.title) + '</p>' + (ls.kind === 'reading' ? '<p class="vi">Learn words → Read &amp; listen → Grammar in this story → Practice (có chấm điểm). ' + (ls.again ? 'Đây là bài có điểm thấp nhất của bạn; đọc lại và làm lại phần Practice.' : 'Thoát giữa chừng vẫn được lưu đúng bước.') + '</p>' : '');
  else h += '<p class="vi">Bạn đã học hết nội dung hiện có. Lô bài mới sẽ được thêm sau — xem Info.</p>';
  h += '<p class="vi">' + (p.dueAll ? '<b>' + p.dueAll + ' từ đến hạn ôn.</b> Chúng được hỏi ở cuối bài đọc (Quick recall), hoặc bấm Review now để ôn ngay (khoảng ' + Math.max(1, Math.round(p.rev.length * 0.3)) + ' phút cho ' + p.rev.length + ' mục).' : 'Hôm nay không có từ nào đến hạn ôn.') + '</p>';
  h += '<div class="rowg">' + (ls ? '<button class="btn primary" data-a="start">' + ic('play') + 'Start</button>' : '') + (p.rev.length ? '<button class="btn" data-a="review">Review now (' + p.rev.length + ')</button>' : '') +
    '<button class="btn" data-a="go" data-v="reading">Choose another story</button></div></section>';
  h += '<section class="stats"><div class="stat"><b>' + st.n + '</b><span>days in a row</span></div><div class="stat"><b>' + Object.keys(S.lessons).filter(EI.lessonDone).length + ' / ' + EI.R.length + '</b><span>stories finished</span></div><div class="stat"><b>' + (avg == null ? '–' : avg + '%') + '</b><span>average practice score</span></div><div class="stat"><b>' + inMem + '</b><span>words in your memory plan</span></div></section>';
  if (!st.today && st.total) h += '<p class="vi">Nghỉ một vài ngày không sao cả: không có gì bị trừ. Các từ đến hạn chỉ chờ bạn và được chia nhỏ ra mỗi ngày.</p>';
  if (needBackup) h += '<section class="card"><h3>Back up your progress</h3><p class="vi">Đã ' + (t - lastX) + ' ngày bạn chưa xuất file sao lưu. Tiến độ chỉ nằm trong trình duyệt này.</p><div class="rowg"><button class="btn" data-a="export">Export progress</button></div></section>';
  return page(h);
}
A.start = () => { const ls = EI.plan().lesson; if (ls) openLesson(ls); };
A.startLesson = A.start;
A.review = () => { const p = EI.plan(); if (p.rev.length) go({ v: 'review', q: p.rev, i: 0 }); };
function openLesson(ls) { if (ls.kind === 'reading') { const r = EI.rById(ls.id), L = S.lessons[r.id]; if (ls.again && L) { L.stage = 'read'; L.scroll = 0; } go({ v: 'reading', level: r.level, rid: r.id }); } else go({ v: 'grammar', gid: ls.id }); }

/* ================= item runner (shared by story practice, grammar, review) ================= */
function startItem(it, ctx, sig) {
  run = { it, ctx, sig, done: false, res: null, hint: 0, val: '' };
  if (it.t === 'mc') run.ord = it.fixed || it.o[0] === 'True' ? it.o.map((_, i) => i) : shuffle(it.o.map((_, i) => i));
  if (it.t === 'cloze') { const own = it.chunk.blanks.map(b => b.lem), other = shuffle(ctx.r.targets.filter(w => !own.includes(w))).slice(0, 2); run.fill = {}; run.act = 0; run.bank = shuffle([...own, ...other]); }
  if (it.t === 'order') { run.words = it.a.replace(/[.?!]$/, '').split(' '); run.end = (it.a.match(/[.?!]$/) || [''])[0]; do { run.pool = shuffle(run.words.map((_, i) => i)); } while (run.words.length > 2 && run.pool.every((x, i) => x === i)); run.sel = []; }
  if (it.t === 'match') { run.right = shuffle(it.pairs.map((_, i) => i)); run.pick = {}; }
}
function itemHTML() {
  const it = run.it, dis = run.done ? ' disabled' : '';
  let h = '<div class="qcard">' + (it.head ? '<p class="eyebrow">' + esc(it.head) + '</p>' : '');
  if (it.vi) h += '<p class="vi">' + esc(it.vi) + '</p>';
  const listen = it.audio || it.t === 'dict' ? '<div class="rowg"><button class="btn icon" data-a="hear" aria-label="Play the sentence">' + ic('phones') + '</button><span class="audiolabel">' + esc(EI.audio.label()) + '</span></div>' : '';
  if (it.t === 'mc') {
    h += '<p class="qtext">' + (it.mark ? mark(it.q, it.mark) : esc(it.q)) + '</p>' + (it.sub ? '<p>' + esc(it.sub) + '</p>' : '') + '<div class="opts">' +
      run.ord.map(i => { const o = it.o[i], txt = Array.isArray(o) ? o[0] : o, why = Array.isArray(o) ? o[1] : '';
        return '<button class="btn opt' + (run.done ? (i === it.a ? ' right' : i === run.pick ? ' wrong' : '') : '') + '" data-a="pick" data-i="' + i + '"><span>' + esc(txt) + (run.done && why ? '<small>' + esc(why) + '</small>' : '') + '</span></button>'; }).join('') + '</div>';
  } else if (it.t === 'gap') {
    h += listen + '<p class="qtext">' + esc(it.q) + '</p>' + (run.hint ? '<p class="small muted">Hint: ' + esc(hintOf(it)) + '</p>' : '') +
      '<div class="rowg"><input type="text" id="ans" style="flex:1;min-width:9rem" autocomplete="off" autocapitalize="off" spellcheck="false" value="' + esc(run.val) + '"' + dis + '>' +
      (run.done ? '' : '<button class="btn primary" data-a="check">Check</button>' + (run.hint ? '' : '<button class="btn" data-a="hint">Hint</button>')) + '</div>';
  } else if (it.t === 'dict') {
    h += (EI.audio.ok ? listen + '<p>Listen and type the sentence.</p><textarea id="ans"' + dis + '>' + esc(run.val) + '</textarea>' + (run.done ? '' : '<div class="rowg"><button class="btn primary" data-a="check">Check</button></div>')
      : '<p class="vi">Thiết bị này không có giọng đọc, nên câu nghe chép được bỏ qua.</p>' + (run.done ? '' : '<button class="btn" data-a="skipItem">Continue</button>'));
  } else if (it.t === 'order') {
    h += '<p>' + esc(it.q || 'Put the words in the right order.') + '</p><div class="chips ans">' + run.sel.map((i, k) => '<button class="wchip" data-a="unsel" data-k="' + k + '">' + esc(run.words[i]) + '</button>').join('') + '</div>' +
      '<div class="chips">' + run.pool.filter(i => !run.sel.includes(i)).map(i => '<button class="wchip" data-a="sel" data-i="' + i + '">' + esc(run.words[i]) + '</button>').join('') + '</div>' +
      (run.done ? '' : '<div class="rowg"><button class="btn primary" data-a="check">Check</button></div>');
  } else if (it.t === 'error') {
    h += '<p>' + esc(it.head2 || 'One word in this sentence is wrong. Tap it.') + '</p><p>' + it.q.split(' ').map((w, i) => {
      const hit = norm(w) === norm(it.wrong); return '<button class="etok' + (run.done ? (hit ? ' right' : i === run.pick ? ' wrong' : '') : '') + '" data-a="tapErr" data-i="' + i + '">' + esc(w) + '</button>'; }).join(' ') + '</p>';
  } else if (it.t === 'match') {
    h += '<p>' + esc(it.q || 'Match each word with its meaning.') + '</p>' + it.pairs.map((p, i) => '<div class="mrow"><b>' + esc(p[0]) + '</b><select data-m="' + i + '"' + dis + '><option value="">choose…</option>' +
      run.right.map(j => '<option value="' + j + '"' + (run.pick[i] === j ? ' selected' : '') + '>' + esc(it.pairs[j][1]) + '</option>').join('') + '</select></div>').join('') +
      (run.done ? '' : '<div class="rowg"><button class="btn primary" data-a="check">Check</button></div>');
  } else if (it.t === 'cloze') {
    const bl = it.chunk.blanks, used = Object.values(run.fill);
    h += '<p>Fill the gaps with words from the box. <span class="vi">Từ trong khung ở dạng gốc; không cần chia.</span></p><p class="qtext cz">' + it.chunk.sents.map(si => run.ctx.r.S[si].tk.map((t, j) => {
      const k = bl.findIndex(b => b.si === si && b.j === j); if (k < 0) return esc(t.t);
      if (run.done) { const ok = run.fill[k] === bl[k].lem; return '<span class="blank ' + (ok ? 'right' : 'wrong') + '">' + esc(bl[k].surf) + '</span>' + (ok ? '' : ' <s class="small">' + esc(run.fill[k] || '') + '</s>'); }
      return '<button class="blank' + (run.act === k ? ' act' : '') + (run.fill[k] ? ' full' : '') + '" data-a="czBlank" data-b="' + k + '">' + (run.fill[k] ? esc(run.fill[k]) : (k + 1)) + '</button>'; }).join('')).join(' ') + '</p>';
    if (!run.done) h += '<div class="chips">' + run.bank.filter(w => !used.includes(w)).map(w => '<button class="wchip" data-a="czPick" data-w="' + esc(w) + '">' + esc(w) + '</button>').join('') + '</div><div class="rowg"><button class="btn primary" data-a="check">Check</button></div>';
  } else if (it.t === 'write') {
    h += '<p class="qtext">' + esc(it.q) + '</p><textarea id="ans"' + (run.shown ? ' disabled' : '') + '>' + esc(run.val) + '</textarea>';
    if (!run.shown) h += '<div class="rowg"><button class="btn primary" data-a="showModel">Compare with a model</button></div>';
    else if (!run.done) h += '<div class="fb"><p class="small muted">Model</p><blockquote>' + esc(it.model) + '</blockquote>' + (it.why ? '<p class="vi">' + esc(it.why) + '</p>' : '') +
      '<p class="vi">Tự so với câu mẫu (không chấm điểm):</p><div class="rowg"><button class="btn primary" data-a="self" data-r="ok">' + esc(it.okLabel || 'I used it correctly') + '</button><button class="btn" data-a="self" data-r="' + (it.self ? 'hint' : 'bad') + '">' + esc(it.badLabel || 'I was not sure') + '</button></div></div>';
  }
  if (run.done) h += fbHTML();
  return h + '</div>';
}
const hintOf = it => { const a = [].concat(it.a)[0]; return a[0] + ' ' + '_ '.repeat(a.length - 1) + '(' + a.length + ' letters)'; };
function fbHTML() {
  const it = run.it, r = run.res, ctx = run.ctx;
  let h = '<div class="fb ' + (r || '') + '"><p class="ttl">' + ic(r === 'bad' ? 'x' : 'check') + (run.title || (r === 'ok' ? 'Correct' : r === 'hint' ? 'Correct, with a little help' : r === 'bad' ? 'Not this time' : 'Done')) + '</p>';
  if (run.ansText) h += '<p><b>' + esc(run.ansText) + '</b></p>';
  if (run.noteText) h += '<p class="small">' + esc(run.noteText) + '</p>';
  if (it.why) h += '<p class="vi">' + esc(it.why) + '</p>';
  if (it.ref && ctx.r) { const s = ctx.r.S.find(o => o.plain.includes(it.ref)); if (s) h += '<p class="small muted">In the story:</p><blockquote>' + esc(s.plain) + '</blockquote>'; }
  const w = it.rv && it.rv.w && EI.W[it.rv.w];
  if (w && (it.hard || r === 'bad')) h += '<div class="note"><b>' + esc(w.w) + '</b> ' + esc(w.ipa) + ' — ' + esc(w.def) + (w.col.length ? '<br><span class="muted">Often with:</span> ' + esc(w.col.join(' · ')) : '') + (w.note ? '<br><span class="vi">' + esc(w.note) + '</span>' : '') + (it.hard ? '<br><span class="vi">Từ khó: lần tới sẽ dùng cách hỏi khác và câu khác.</span>' : '') + '</div>';
  return h + '<button class="btn primary" data-a="next">Continue</button></div>';
}
function finish(res) {
  if (run.done) return;
  run.done = true; run.res = res;
  const it = run.it, ctx = run.ctx, t = EI.today();
  const logErr = (kind, id) => { S.errors.push({ d: t, kind, k: it.k || '', id, q: (it.q || it.a || '').toString().slice(0, 140) }); if (S.errors.length > 300) S.errors.shift(); };
  if (ctx.kind === 'lesson') {
    const L = S.lessons[ctx.r.id], addFu = ref => { if (ref && !L.added[ref]) { L.added[ref] = 1; L.q.splice(Math.min(L.q.length, L.pi + 2), 0, 'F' + ref); } };
    const wordFu = w => EI.W[w] && EI.sentsOf(w).some(x => x.kind === 'x') ? 'w:' + w : null;
    if (!it.fu && res) { const sc = L.sc[EI.sec(it)], pts = it.t === 'cloze' ? run.pts : [res === 'ok' ? 1 : res === 'hint' ? 0.5 : 0, 1]; sc[0] += pts[0]; sc[1] += pts[1]; }   // follow-up items are practice only, never scored
    if (it.t === 'cloze') {
      const wrong = it.chunk.blanks.filter((b, k) => run.fill[k] !== b.lem).map(b => b.lem);
      wrong.forEach(w => { L.miss[w] = 1; S.errors.push({ d: t, kind: 'reading', k: 'w:' + w, id: ctx.r.id, q: 'story with gaps' }); });
      wrong.slice(0, 2).forEach(w => addFu(wordFu(w)));
    } else if (res === 'bad') {
      logErr('reading', ctx.r.id);
      if (it.k && it.k.startsWith('w:') && EI.W[it.k.slice(2)]) { L.miss[it.k.slice(2)] = 1; addFu(wordFu(it.k.slice(2))); }
      if (it.k && it.k.startsWith('g:') && !it.fu) { const g = EI.gById(it.k.slice(2)); if (g) { const i = g.q.findIndex((x, i) => x.t !== 'write' && !L.q.includes('g|' + g.id + '|' + i) && !L.q.includes('Fg|' + g.id + '|' + i)); if (i >= 0) addFu('g|' + g.id + '|' + i); } }
    }
  } else if (ctx.kind === 'gram') {
    if (!S.gram[ctx.g.id]) S.gram[ctx.g.id] = { i: ctx.i };   // the lesson counts as started once a question is answered
    const key = 'g|' + ctx.g.id + '|' + ctx.i;
    if (res === 'bad') { logErr('grammar', ctx.g.id); if (!S.gq[key]) S.gq[key] = { step: 1, due: t + 1, m: 1, lap: 1, h: [[t, 'G', 'bad']] }; }
  } else if (ctx.kind === 'review' && it.rv) EI.answer(it.rv.key, res || 'hint', it.rv.ty, it.rv.si);
  EI.save(); render();
}
A.pick = d => { if (run.done) return; run.pick = +d.i; const ok = run.pick === run.it.a; const o = run.it.o[run.it.a]; if (!ok) run.ansText = 'Answer: ' + (Array.isArray(o) ? o[0] : o); finish(ok ? 'ok' : 'bad'); };
A.hint = () => { run.val = $('#ans').value; run.hint = 1; render(); };
A.hear = () => EI.audio.say(run.it.audio || run.it.a);
A.sel = d => { if (!run.done) { run.sel.push(+d.i); render(); } };
A.unsel = d => { if (!run.done) { run.sel.splice(+d.k, 1); render(); } };
A.tapErr = d => { if (run.done) return; run.pick = +d.i; const it = run.it, ok = norm(it.q.split(' ')[run.pick]) === norm(it.wrong); run.ansText = it.wrong + ' → ' + it.fix; finish(ok ? 'ok' : 'bad'); };
A.skipItem = () => finish(null);
A.czBlank = d => { if (run.done) return; const k = +d.b; if (run.fill[k]) delete run.fill[k]; run.act = k; render(); };
A.czPick = d => { if (run.done) return; const n = run.it.chunk.blanks.length; let k = run.fill[run.act] ? -1 : run.act; if (k < 0) k = [...Array(n).keys()].find(i => !run.fill[i]); if (k == null) return; run.fill[k] = d.w; const nx = [...Array(n).keys()].find(i => !run.fill[i]); run.act = nx == null ? -1 : nx; render(); };
A.showModel = () => { run.val = $('#ans').value; run.shown = true; if (run.val.trim()) S.sentences.push({ en: run.val.trim(), kind: 'written', d: EI.today(), src: run.it.rv ? run.it.rv.w : (run.ctx.g ? run.ctx.g.title : '') }); render(); };
A.self = d => finish(d.r);
A.check = () => {
  const it = run.it; if (run.done) return;
  if (it.t === 'cloze') {
    const bl = it.chunk.blanks; if (Object.keys(run.fill).length < bl.length) { toast('Fill every gap first.'); return; }
    const right = bl.filter((b, k) => run.fill[k] === b.lem).length;
    run.pts = [right, bl.length]; run.title = right + ' of ' + bl.length + ' correct'; finish(right === bl.length ? 'ok' : 'bad'); return;
  }
  if (it.t === 'gap') {
    const v = norm($('#ans').value); run.val = $('#ans').value; if (!v) return;
    const as = [].concat(it.a).map(norm), main = [].concat(it.a)[0];
    if (as.includes(v)) { if (v !== as[0]) run.noteText = 'In this sentence the form is “' + main + '”.'; finish(run.hint ? 'hint' : 'ok'); }
    else if (as.some(a => a.length >= 5 && lev(a, v) === 1)) { run.ansText = 'Spelling: ' + main; finish('hint'); }
    else { run.ansText = 'Answer: ' + main; finish('bad'); }
  } else if (it.t === 'dict') {
    run.val = $('#ans').value; const a = norm(it.a).split(' '), b = norm(run.val).split(' '); if (!norm(run.val)) return;
    const diff = Math.abs(a.length - b.length) + a.filter((w, i) => b[i] !== w).length;
    run.ansText = it.a; finish(diff === 0 ? 'ok' : diff <= 2 ? 'hint' : 'bad');
  } else if (it.t === 'order') {
    if (run.sel.length < run.words.length) { toast('Use all the words first.'); return; }
    const ok = norm(run.sel.map(i => run.words[i]).join(' ')) === norm(it.a); if (!ok) run.ansText = it.a; finish(ok ? 'ok' : 'bad');
  } else if (it.t === 'match') {
    if (Object.keys(run.pick).length < it.pairs.length) { toast('Choose a meaning for every word.'); return; }
    const ok = it.pairs.every((_, i) => run.pick[i] === i); if (!ok) run.ansText = it.pairs.map(p => p[0] + ' = ' + p[1]).join(' · '); finish(ok ? 'ok' : 'bad');
  }
};
A.next = () => {
  const ctx = run.ctx; run = null;
  if (ctx.kind === 'lesson') {
    const L = S.lessons[ctx.r.id]; L.pi++;
    if (L.pi >= L.q.length) {   // the test is finished: record the score
      const got = L.sc.c[0] + L.sc.w[0] + L.sc.g[0], of = L.sc.c[1] + L.sc.w[1] + L.sc.g[1], pct = of ? Math.round(got / of * 100) : 0, old = S.scores[ctx.r.id];
      S.scores[ctx.r.id] = { last: pct, best: Math.max(pct, old ? old.best : 0), n: (old ? old.n : 0) + 1, parts: JSON.parse(JSON.stringify(L.sc)), d: EI.today() };
      L.stage = L.pst = L.doneDay ? 'done' : 'write';
    }
  }
  else if (ctx.kind === 'gram') { const st = S.gram[ctx.g.id] || (S.gram[ctx.g.id] = { i: ctx.i }); st.i++; if (st.i >= ctx.g.q.length) { st.done = EI.today(); S.lastKind = 'grammar'; EI.log('l', 1); } }
  else if (ctx.kind === 'review') S.cur.i++;
  EI.save(); render(); const m = $('#main'); if (m && ctx.kind !== 'gram') m.scrollTop = 0;
};
const dots = (n, i) => '<div class="dots" aria-label="Question ' + (i + 1) + ' of ' + n + '">' + Array.from({ length: n }, (_, k) => '<i class="' + (k < i ? 'd' : k === i ? 'c' : '') + '"></i>').join('') + '</div>';

/* ================= Review ================= */
function vReview() {
  const c = S.cur; let it = null;
  while (c.i < c.q.length && !(it = EI.reviewItem(c.q[c.i]))) c.i++;
  const title = c.tag === 'end' ? 'Quick recall' : 'Review';
  if (!it) {
    const then = c.then;
    return page('<div class="ph"><p class="eyebrow">' + title + '</p><h1>Review complete</h1></div><p class="vi">Mỗi từ đã được xếp lịch ôn kế tiếp theo kết quả vừa rồi. Xem lịch từng từ trong Vocabulary.</p><div class="rowg">' +
      (then ? '<button class="btn primary" data-a="thenLesson">' + (then.kind === 'reading' ? 'Go on to the story' : then.kind === 'grammar' ? 'Go on to grammar' : 'Back to the lesson') + '</button>' : '') + '<button class="btn" data-a="go" data-v="today">Back to Today</button></div>');
  }
  const sig = 'rv|' + c.q[c.i] + '|' + c.i;
  if (!run || run.sig !== sig) startItem(it, { kind: 'review' }, sig);
  return page('<div class="ph"><p class="eyebrow">' + title + '</p>' + dots(c.q.length, c.i) + '</div>' + itemHTML() + '<div class="rowg"><button class="btn ghost" data-a="go" data-v="today">Stop for now</button></div>');
}
A.thenLesson = () => { const t = S.cur.then; if (t.kind === 'done') go({ v: 'reading', level: EI.rById(t.id).level, rid: t.id }); else openLesson(t); };

/* ================= Vocabulary ================= */
const fold = x => String(x).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').trim();
function vFilter() {
  const c = S.cur, q = fold(c.q || ''), lv = c.lv || 'A2', st = c.st || 'all', vi = c.sl === 'vi';
  return Object.values(EI.W).filter(e => e.level === lv && (!q || (vi ? fold(e.vi).includes(q) : e.w.includes(q))) && (st === 'all' || EI.status(e.w) === st)).sort((a, b) => a.w.localeCompare(b.w));
}
function lVocab() {
  const c = S.cur, vi = c.sl === 'vi';
  return '<h2>Vocabulary</h2><div class="rowg" style="flex-wrap:nowrap"><input type="search" id="vq" style="flex:1;min-width:0" placeholder="' + (vi ? 'Gõ nghĩa tiếng Việt, vd: ky su' : 'Search a word') + '" aria-label="Search" value="' + esc(c.q || '') + '">' +
    '<select id="vsl" style="width:auto" aria-label="Search language"><option value="en"' + (vi ? '' : ' selected') + '>English</option><option value="vi"' + (vi ? ' selected' : '') + '>Tiếng Việt</option></select></div>' +
    '<div class="rowg">' + LV.map(l => '<button class="chip' + ((c.lv || 'A2') === l ? ' on' : '') + '" data-a="vlevel" data-l="' + l + '">' + l + '</button>').join('') + '</div>' +
    '<select id="vst" aria-label="Filter by memory state">' + ['all', 'New', 'Learning', 'Familiar', 'Strong', 'Mastered', 'Known'].map(s => '<option value="' + s + '"' + ((c.st || 'all') === s ? ' selected' : '') + '>' + (s === 'all' ? 'All states' : s) + '</option>').join('') + '</select>' +
    '<button class="btn" data-a="go" data-v="scan">Quick scan: tick words you know</button><div id="vrows">' + vRows() + '</div>';
}
function vRows() {
  const c = S.cur, all = vFilter(), per = c.per || 20, pages = Math.max(1, Math.ceil(all.length / per)), pg = Math.min(pages, Math.max(1, c.pg || 1));
  if (!Object.values(EI.W).some(e => e.level === (c.lv || 'A2'))) return '<p class="vi">Chưa có bộ từ ' + (c.lv) + '. Xem Info → Not available yet.</p>';
  return '<p class="small muted">' + all.length + ' words</p>' + all.slice((pg - 1) * per, pg * per).map(e => '<button class="wrow' + (c.w === e.w ? ' on' : '') + '" data-a="word" data-w="' + esc(e.w) + '"><i class="st ' + EI.status(e.w) + '"></i><b>' + esc(e.w) + '</b><span class="pos">' + esc(c.sl === 'vi' && (c.q || '').trim() ? e.vi : e.pos) + '</span></button>').join('') +
    '<div class="pager">Page <input type="number" id="vpg" min="1" max="' + pages + '" value="' + pg + '" aria-label="Page number"> of ' + pages + ' · <select id="vper" aria-label="Words per page">' + [20, 50, 100].map(n => '<option' + (per === n ? ' selected' : '') + '>' + n + '</option>').join('') + '</select> per page</div>';
}
A.vlevel = d => { S.cur.lv = d.l; S.cur.pg = 1; EI.save(); render(); };
A.word = d => go(Object.assign({}, S.cur, { v: 'vocab', w: d.w }));
function vWord(e) {
  const r = S.words[e.w], st = EI.status(e.w);
  let h = '<div class="ph"><p class="eyebrow">' + e.level + ' · ' + esc(e.pos) + '</p><div class="word-h"><h1>' + esc(e.w) + '</h1><span class="ipa">' + esc(e.ipa) + '</span>' +
    '<button class="btn icon" data-a="say" data-t="' + esc(e.w) + '" aria-label="Hear the word">' + ic('phones') + '</button><span class="chip"><i class="st ' + st + '"></i>' + st + '</span></div>' +
    '<p class="audiolabel">' + esc(EI.audio.label()) + ' · <a href="' + camb(e.w) + '" target="_blank" rel="noopener">Open “' + esc(e.w) + '” in Cambridge Dictionary</a> (human US recording)</p></div>';
  h += '<p class="def">' + esc(e.def) + '</p><p class="exq">' + mark(e.exPlain, e.exSurf) + ' <button class="btn icon ghost" data-a="say" data-t="' + esc(e.exPlain) + '" aria-label="Hear the example">' + ic('phones') + '</button></p>';
  h += '<dl class="kv">' + (e.col.length ? '<dt>Often with</dt><dd>' + esc(e.col.join(' · ')) + '</dd>' : '') + (e.fam ? '<dt>Word family</dt><dd>' + esc(e.fam) + '</dd>' : '') +
    '<dt>Difficulty</dt><dd>' + ['', 'easier', 'medium', 'harder'][e.diff] + ' <span class="muted small">(estimate)</span></dd></dl>';
  h += viOpen ? '<div class="vibox"><b>' + esc(e.vi) + '</b></div>' : '<div><button class="btn" data-a="showVi">Show Vietnamese meaning</button></div>';
  if (e.note) h += '<p class="note vi">' + esc(e.note) + '</p>';
  h += '<div class="rowg"><button class="btn" data-a="wReview" data-w="' + esc(e.w) + '">Review</button><button class="btn' + (st === 'Known' ? ' on' : '') + '" data-a="wKnown" data-w="' + esc(e.w) + '">' + (st === 'Known' ? 'Known ✓ (tap to undo)' : 'Known') + '</button></div>' +
    '<p class="vi">Review: đưa từ vào hàng ôn ngay hôm nay. Known: bỏ từ khỏi hàng ôn.</p>';
  h += '<section class="card"><h3>In stories</h3>' + (e.rids.length ? e.rids.map(id => { const rd = EI.rById(id); return '<button class="li" data-a="openR" data-id="' + id + '"><span class="t">' + esc(rd.title) + '</span><span class="m">' + esc(e.sents.filter(s => s.rid === id).length + ' sentence(s) with this word') + '</span></button>'; }).join('') : '<p class="vi">Chưa có bài đọc nào dùng từ này.</p>') + '</section>';
  h += '<section class="card"><h3>Memory</h3>';
  if (r && r.s === 'srs') h += '<dl class="kv"><dt>State</dt><dd>' + st + (r.lap >= 3 ? ' · <b>hard word</b>' : '') + '</dd><dt>Next review</dt><dd>' + (r.due <= EI.today() ? 'due now' : EI.fmtDay(r.due) + ' (in ' + (r.due - EI.today()) + ' days)') + '</dd><dt>Misses</dt><dd>' + r.lap + '</dd><dt>Met again in other stories</dt><dd>' + (r.enc || 0) + '</dd></dl>' +
    (r.h.length ? '<p class="small muted">History</p>' + r.h.slice().reverse().map(x => '<p class="small num">' + EI.fmtDay(x[0]) + ' · ' + ({ A: 'story sentence', B: 'new sentence', C: 'listening', D: 'meaning in context', E: 'own sentence', seen: 'met in a story' }[x[1]] || x[1]) + ' · ' + ({ ok: 'remembered', hint: 'with help', bad: 'missed' }[x[2]]) + '</p>').join('') : '<p class="vi">Chưa ôn lần nào.</p>');
  else h += '<p class="vi">' + (st === 'Known' ? 'Bạn đã đánh dấu Known, từ này không nằm trong hàng ôn.' : 'Từ này chưa vào hàng ôn. Nó sẽ vào khi bạn học xong một bài đọc có nó, hoặc khi bạn bấm Review.') + '</p>';
  return page(h + '</section>');
}
A.showVi = () => { viOpen = true; render(); };
A.say = d => EI.audio.say(d.t);
A.wReview = d => { const r = EI.enroll(d.w); r.due = EI.today(); EI.save(); render(); toast('Added to today’s review.'); };
A.wKnown = d => { EI.setKnown(d.w, EI.status(d.w) !== 'Known'); EI.save(); render(); };
A.openR = d => { const r = EI.rById(d.id); go({ v: 'reading', level: r.level, rid: r.id }); };
function vScan() {
  const lv = S.cur.lv || 'A2', ws = Object.values(EI.W).filter(e => e.level === lv).sort((a, b) => a.w.localeCompare(b.w));
  return page('<div class="ph"><p class="eyebrow">Vocabulary · ' + lv + '</p><h1>Quick scan</h1></div><p class="vi">Đánh dấu những từ bạn đã biết chắc (hiểu nghĩa và dùng được). Chúng sẽ được lướt qua trong bài đọc và không vào hàng ôn. Có thể bỏ đánh dấu bất cứ lúc nào.</p>' +
    '<div class="scan">' + ws.map(e => '<label><input type="checkbox" data-scan="' + esc(e.w) + '"' + (EI.status(e.w) === 'Known' ? ' checked' : '') + '> ' + esc(e.w) + '</label>').join('') + '</div>' +
    '<div class="rowg"><button class="btn primary" data-a="go" data-v="vocab">Done</button></div>');
}

/* ================= Grammar ================= */
function lGrammar() {
  let h = '<h2>Grammar</h2>';
  for (const lv of LV) {
    const gs = EI.G.filter(g => g.level === lv);
    h += '<p class="eyebrow">' + lv + ' path</p>' + (gs.length ? gs.map(g => { const st = S.gram[g.id];
      return '<button class="li' + (S.cur.gid === g.id ? ' on' : '') + '" data-a="gram" data-id="' + g.id + '"><span class="t">' + esc(g.title) + '</span><span class="m"><span>' + esc(g.vi) + '</span><span>~' + (g.mins || 8) + ' min</span>' + (st ? '<span class="chip">' + (st.done ? 'done ✓' : 'in progress') + '</span>' : '') + '</span></button>'; }).join('') : '<p class="vi">Chưa có.</p>');
  }
  return h;
}
A.gram = d => go({ v: 'grammar', gid: d.id });
function vGram(g) {
  const st = S.gram[g.id] || { i: 0 };
  let h = '<div class="ph"><p class="eyebrow">Grammar · ' + g.level + '</p><h1>' + esc(g.title) + '</h1><p class="muted">' + esc(g.vi) + ' · about ' + (g.mins || 8) + ' min</p></div>';
  h += '<section class="plain"><h2>When to use it</h2><ul class="steps">' + g.use.map(u => '<li class="vi">' + esc(u) + '</li>').join('') + '</ul></section>';
  h += '<section class="plain"><h2>Form</h2><div class="scrollx"><table class="gtable">' + g.forms.map(f => '<tr><th>' + esc(f[0]) + '</th><td><span class="formula">' + esc(f[1]) + '</span><br>' + esc(f[2]) + '<br><span class="vi">' + esc(f[3]) + '</span></td></tr>').join('') + '</table></div></section>';
  h += '<section class="plain"><h2>Examples</h2><ul class="exl">' + g.ex.map(x => '<li>' + esc(x[0]) + '<span>' + esc(x[1]) + (x[2] && EI.rById(x[2]) ? ' · from “' + esc(EI.rById(x[2]).title) + '”' : '') + '</span></li>').join('') + '</ul></section>';
  h += '<section class="plain"><h2>Common mistakes</h2><p class="vi">Lỗi người Việt hay mắc:</p>' + g.errors.map(e => '<div class="err"><s>' + esc(e[0]) + '</s><b>' + esc(e[1]) + '</b><span class="vi">' + esc(e[2]) + '</span></div>').join('') + '</section>';
  h += '<section class="plain" id="gprac"><h2>Practice</h2>';
  if (st.i >= g.q.length) {
    const ng = EI.nextGrammar();
    h += '<div class="fb ok"><p class="ttl">' + ic('check') + 'Lesson complete</p><p class="vi">Những câu bạn làm sai sẽ quay lại trong phần Review theo lịch cách quãng.</p><div class="rowg"><button class="btn primary" data-a="go" data-v="today">Back to Today</button>' + (ng ? '<button class="btn" data-a="gram" data-id="' + ng.id + '">Next: ' + esc(ng.title) + '</button>' : '') + '<button class="btn ghost" data-a="gAgain" data-id="' + g.id + '">Practice again</button></div></div>';
  } else {
    const sig = 'g|' + g.id + '|' + st.i;
    if (!run || run.sig !== sig) startItem(g.q[st.i], { kind: 'gram', g, i: st.i }, sig);
    h += dots(g.q.length, st.i) + itemHTML();
  }
  return page(h + '</section>');
}
A.gAgain = d => { S.gram[d.id] = { i: 0 }; EI.save(); render(); };

/* ================= Reading ================= */
function lReading() {
  const c = S.cur;
  let h = '<h2>Reading</h2><div class="rowg">' + LV.map(l => '<button class="chip' + (c.level === l ? ' on' : '') + '" data-a="level" data-l="' + l + '">' + l + '</button>').join('') + '</div>';
  if (!c.level) return h + '<p class="vi">Chọn một cấp độ để xem các lượt (pass) và danh sách bài.</p>';
  for (const pass of [1, 2]) {
    const rs = EI.R.filter(r => r.level === c.level && r.pass === pass);
    h += '<p class="eyebrow">' + c.level + ' · Pass ' + pass + '</p>';
    h += rs.length ? rs.map(r => { const L = S.lessons[r.id];
      return '<button class="li' + (c.rid === r.id ? ' on' : '') + '" data-a="openR" data-id="' + r.id + '"><span class="t">' + esc(r.title) + '</span><span class="m"><span>' + EI.TOPICS[r.topic] + '</span><span>' + esc(r.era) + '</span><span class="num">' + r.wc + ' words</span><span class="num">~' + r.est + ' min</span>' + (S.scores[r.id] ? '<span class="chip score">' + S.scores[r.id].last + '%</span>' : '') + (L && (L.doneDay || L.stage !== 'predict') ? '<span class="chip">' + (L.doneDay ? 'done ✓' : 'in progress') + '</span>' : '') + '</span></button>'; }).join('')
      : '<p class="vi">Chưa có bài cho lượt này.</p>';
  }
  return h;
}
A.level = d => { S.cur = { v: 'reading', level: d.l }; EI.save(); render(); };
const STAGES = [['learn', 'Learn words'], ['read', 'Read & listen'], ['gram', 'Grammar'], ['practice', 'Practice']];
const SEC = { c: 'Understanding the story', w: 'Vocabulary of this story', g: 'Grammar of this story' };
const freshSc = () => ({ c: [0, 0], w: [0, 0], g: [0, 0] });
function newTest(r, L) { L.q = EI.practiceQueue(r); L.pi = 0; L.sc = freshSc(); L.added = {}; L.miss = {}; }
const markCI = (plain, ph) => { const i = plain.toLowerCase().indexOf(ph.toLowerCase()); return i < 0 ? esc(plain) : esc(plain.slice(0, i)) + '<b>' + esc(plain.slice(i, i + ph.length)) + '</b>' + esc(plain.slice(i + ph.length)); };
function scoreCard(r) {
  const sc = S.scores[r.id]; if (!sc) return '';
  const row = k => { const [a, b] = sc.parts[k]; return '<div><div class="rowg" style="justify-content:space-between"><span>' + SEC[k] + '</span><span class="num small muted">' + (Math.round(a * 10) / 10) + ' / ' + b + '</span></div><div class="meter"><i style="width:' + (b ? Math.round(a / b * 100) : 0) + '%"></i></div></div>'; };
  return '<section class="card" id="scorecard"><div class="rowg" style="justify-content:space-between"><h2>Practice score</h2><b class="bigscore num">' + sc.last + '%</b></div>' + row('c') + row('w') + row('g') +
    '<p class="small muted">' + (sc.n > 1 ? 'Attempt ' + sc.n + ' · best ' + sc.best + '%' : 'First attempt') + ' · a hint counts as half a point · extra practice items are not scored</p></section>';
}
function vLesson(r) {
  const L = S.lessons[r.id] || (S.lessons[r.id] = { stage: 'predict', pi: 0, q: null, added: {}, miss: {}, start: EI.today() });
  if (L.q && (!L.sc || L.q.some(x => typeof x === 'number'))) { newTest(r, L); if (L.stage === 'practice') L.pi = 0; }   // progress saved by an older version
  const sKey = { predict: 'learn', learn: 'learn', read: 'read', gram: 'gram', practice: 'practice', write: 'practice', done: 'practice' }[L.stage];
  let h = '<div class="ph"><p class="eyebrow">' + r.level + ' · Pass ' + r.pass + ' · ' + EI.TOPICS[r.topic] + ' · ' + esc(r.era) + '</p><h1>' + esc(r.title) + '</h1>' +
    '<div class="stages" role="tablist" aria-label="Lesson steps">' + STAGES.map(s => '<button role="tab" aria-selected="' + (s[0] === sKey) + '" class="' + (s[0] === sKey ? 'on' : '') + '" data-a="stage" data-s="' + s[0] + '">' + s[1] + '</button>').join('') + '</div></div>';
  if (L.stage === 'predict') {
    h += '<section class="card"><h2>Before you read</h2><p>' + esc(r.predict.q) + '</p><div class="opts">' + r.predict.o.map((o, i) => '<button class="btn opt" data-a="guess" data-i="' + i + '">' + esc(o) + '</button>').join('') + '</div><p class="vi">Đoán nhanh thôi, không tính đúng sai. Đoán trước giúp bạn đọc có mục đích. Cả bài học mất khoảng ' + r.est + ' phút; bạn có thể dừng ở bất kỳ bước nào và quay lại sau.</p></section>';
  } else if (L.stage === 'learn') {
    h += '<p class="vi">Xem lướt ' + r.targets.length + ' từ mục tiêu. Chưa cần thuộc: bạn sẽ gặp lại từng từ trong câu chuyện. Từ nào biết chắc rồi thì bấm Known.</p><section class="card">' + r.targets.map(w => {
      const e = EI.W[w]; if (!e) return '';
      if (EI.status(w) === 'Known') return '<div class="lw known"><div class="rowg"><b>' + esc(w) + '</b><span class="chip">Known</span><button class="btn ghost" data-a="lKnown" data-w="' + esc(w) + '">undo</button></div></div>';
      return '<div class="lw"><div class="rowg"><b class="def">' + esc(w) + '</b><span class="small muted">' + esc(e.pos) + '</span><span class="ipa">' + esc(e.ipa) + '</span><button class="btn icon ghost" data-a="say" data-t="' + esc(w) + '" aria-label="Hear the word">' + ic('phones') + '</button><button class="btn ghost" style="margin-left:auto" data-a="lKnown" data-w="' + esc(w) + '">Known</button></div>' +
        '<p>' + esc(e.def) + '</p><p class="exq">' + mark(e.exPlain, e.exSurf) + '</p>' + (openVi.has(w) ? '<p class="vibox">' + esc(e.vi) + '</p>' : '<div><button class="btn ghost" data-a="lVi" data-w="' + esc(w) + '">Show Vietnamese meaning</button></div>') + '</div>'; }).join('') + '</section>' +
      '<p class="audiolabel">' + esc(EI.audio.label()) + '</p><div class="rowg"><button class="btn primary" data-a="stage" data-s="read">Start reading</button></div>';
  } else if (L.stage === 'read') {
    const c = S.cur;
    h += '<div class="tools"><button class="chip' + (S.settings.hl ? ' on' : '') + '" data-a="tHl">Target words</button><button class="chip' + (c.gr ? ' on' : '') + '" data-a="tGr">Grammar</button><button class="chip' + (c.veil ? ' on' : '') + '" data-a="tVeil">' + ic('phones') + ' first, text after</button><button class="chip' + (c.focus ? ' on' : '') + '" data-a="tFocus">Focus</button></div>' +
      '<p class="vi">Bấm vào một từ để xem nghĩa và nghe. Bấm giữ một câu để xem bản dịch tiếng Việt.</p>' +
      '<article class="reader' + (S.settings.hl ? ' hl' : '') + (c.gr ? ' gr' : '') + (c.veil ? ' veil' : '') + '" id="reader">' + readerHTML(r) + '</article>' +
      '<div class="rowg"><button class="btn primary" data-a="stage" data-s="gram">Next: grammar in this story</button><button class="btn" data-a="stage" data-s="practice">Go to practice</button></div>';
    return page(h) + playerHTML();
  } else if (L.stage === 'gram') {
    const ids = [...new Set((r.grammar || []).map(x => x[0]))].filter(id => EI.gById(id));
    h += '<p class="vi">Các cấu trúc chính của bài, giải thích bằng chính câu trong bài. Phần Practice sẽ hỏi về những cấu trúc này.</p>' + ids.map(id => {
      const g = EI.gById(id), phs = r.grammar.filter(x => x[0] === id).map(x => x[1]), ss = [];
      r.S.forEach(o => { const ph = phs.find(p => o.plain.toLowerCase().includes(p.toLowerCase())); if (ph && ss.length < 3) ss.push([o, ph]); });
      return '<section class="card"><div class="rowg" style="justify-content:space-between"><h2>' + esc(g.title) + '</h2><span class="small muted">' + esc(g.vi) + '</span></div><p class="vi">' + esc(g.use[0]) + '</p>' +
        '<p>' + g.forms.slice(0, 2).map(f => '<span class="small muted">' + esc(f[0]) + ':</span> <span class="formula">' + esc(f[1]) + '</span>').join('<br>') + '</p>' +
        '<ul class="exl">' + ss.map(x => '<li>' + markCI(x[0].plain, x[1]) + '<span>' + esc(x[0].vi) + '</span></li>').join('') + '</ul>' +
        '<div><button class="btn ghost" data-a="gram" data-id="' + id + '">Open the full lesson: ' + esc(g.title) + '</button></div></section>'; }).join('') +
      '<div class="rowg"><button class="btn primary" data-a="stage" data-s="practice">Start practice</button></div>';
  } else if (L.stage === 'practice') {
    if (!L.q) newTest(r, L);
    const ref = L.q[L.pi], sig = 'L|' + r.id + '|' + L.pi + '|' + ref;
    if (!run || run.sig !== sig) startItem(resolveQ(r, ref), { kind: 'lesson', r }, sig);
    const sec = EI.sec(run.it), order = ['c', 'w', 'g'];
    h += '<p class="eyebrow">' + (run.it.fu ? 'Extra practice · not scored' : 'Part ' + (order.indexOf(sec) + 1) + ' of 3 · ' + SEC[sec]) + ' · ' + (L.pi + 1) + ' / ' + L.q.length + '</p><div class="meter"><i style="width:' + Math.round(L.pi / L.q.length * 100) + '%"></i></div>' + itemHTML();
  } else if (L.stage === 'write') {
    h += scoreCard(r) + '<section class="card"><h2>Tell it in your own words</h2><p class="vi">' + esc(r.write.vi) + ' Phần này không chấm điểm.</p><div class="rowg">' + r.write.use.map(w => '<span class="chip">' + esc(w) + '</span>').join('') + '</div>' +
      '<textarea id="wr" placeholder="Write 2–4 sentences in English">' + esc(L.text || '') + '</textarea>' +
      '<div class="note" id="retell"><b>Or tell it out loud</b><p class="vi">Kể lại câu chuyện bằng lời của bạn trong 30–60 giây, rồi nghe lại chính mình và so với bài mẫu. Bản thu chỉ nằm trong bộ nhớ của trang, không lưu và không gửi đi đâu. Không chấm điểm.</p>' + (rec.err && !sh ? '<p class="small" style="color:var(--bad)">' + esc(rec.err) + '</p>' : '') +
      '<div class="rowg"><button class="btn" data-a="recToggle">' + ic('mic') + (rec.on ? 'Stop recording' : rec.url && rec.owner === 'retell' ? 'Record again' : 'Record') + '</button>' + (rec.on ? '<span class="small muted">Recording… speak for 30–60 seconds, then stop.</span>' : '') + (rec.url && rec.owner === 'retell' && !rec.on ? '<button class="btn" data-a="rtPlay">' + ic('play') + 'Hear myself</button>' : '') + '<button class="btn" data-a="rtModel">' + ic('phones') + 'Hear the model</button></div></div>' +
      (L.shown ? '<div class="fb"><p class="small muted">A model answer, to compare with yours (not graded)</p><blockquote>' + esc(r.write.model) + '</blockquote></div><div class="rowg"><button class="btn primary" data-a="finishLesson">Finish the lesson</button></div>'
        : '<div class="rowg"><button class="btn primary" data-a="wShow">Compare with a model</button></div>') + '</section>';
  } else {
    const nr = EI.nextReading(), q = recallQ(r), miss = Object.keys(L.miss || {});
    h += scoreCard(r) + (miss.length ? '<section class="card"><h3>Words to look at again</h3><div class="rowg">' + miss.map(w => '<button class="chip" data-a="word" data-w="' + esc(w) + '">' + esc(w) + '</button>').join('') + '</div></section>' : '') +
      '<section class="fact"><p class="eyebrow">Added to your fact collection</p><p>' + esc(r.fact.card) + '</p></section>' +
      '<section class="card"><h2>One more true detail</h2><p class="reader" style="font-size:1.05em">' + esc(r.fact.bonus) + '</p></section>';
    if (q.length) h += '<section class="card"><h3>Quick recall before you go</h3><p class="vi">Ta quên nhanh nhất trong 24 giờ đầu. Lượt này gồm ' + q.length + ' mục (khoảng ' + Math.max(1, Math.round(q.length * 0.3)) + ' phút): các từ khó nhất của bài này và những từ của bài trước đã đến hạn ôn.</p><div class="rowg"><button class="btn primary" data-a="recall" data-id="' + r.id + '">Start quick recall</button></div></section>';
    h += '<div class="rowg">' + (nr ? '<button class="btn" data-a="openR" data-id="' + nr.id + '">Next story: ' + esc(nr.title) + '</button>' : '') + '<button class="btn" data-a="retake">Take the practice again</button><button class="btn ghost" data-a="go" data-v="today">Back to Today</button></div>';
  }
  return page(h);
}
function recallQ(r) {   // hardest new words of this story first, then words of earlier stories that are due
  const L = S.lessons[r.id] || {}, miss = L.miss || {};
  const mine = r.targets.filter(w => S.words[w] && S.words[w].s === 'srs' && S.words[w].step === 0).sort((a, b) => (miss[b] || 0) - (miss[a] || 0) || EI.W[b].diff - EI.W[a].diff).slice(0, 8).map(w => 'w|' + w);
  const old = EI.due().filter(k => !(k[0] === 'w' && r.targets.includes(k.slice(2)))).slice(0, Math.max(0, S.settings.cap - mine.length));
  return [...mine, ...old];
}
function resolveQ(r, ref) {
  if (ref[0] === 'F') return Object.assign({}, resolveQ(r, ref.slice(1)), { fu: 1 });   // follow-up after a mistake: practice only
  if (ref[0] === 'p') return r.practice[+ref.slice(1)];
  if (ref[0] === 'x') return r.extra[+ref.slice(1)];
  if (ref[0] === 'z') return { t: 'cloze', k: 'w:cloze', chunk: EI.cloze(r)[+ref.slice(1)], head: 'The story with gaps' };
  if (ref[0] === 'g') { const x = EI.gItem(ref); return Object.assign({}, x.it, { k: 'g:' + x.g.id, head: 'Grammar · ' + x.g.title }); }
  const w = ref.slice(2), e = EI.W[w], s = EI.sentsOf(w).filter(x => x.kind === 'x')[0]; // 'w:word' -> a new sentence with this word
  return { t: 'gap', k: ref, head: 'One more with this word', q: s.cloze, a: [s.surf, w], why: e.w + ' — ' + e.def };
}
function readerHTML(r) {
  let p = -1, h = '';
  r.S.forEach(o => {
    if (o.p !== p) { h += (p >= 0 ? '</p>' : '') + '<p>'; p = o.p; }
    h += '<span class="sn" data-si="' + o.i + '">' + o.tk.map((t, j) => t.w ? '<span class="tk' + (t.tg && r.targets.includes(t.lem) ? ' tg' : '') + (t.g ? ' g' : '') + '" data-j="' + j + '">' + esc(t.t) + '</span>' : esc(t.t)).join('') + '</span> ';
  });
  return h + '</p>';
}
A.guess = d => { const L = S.lessons[S.cur.rid]; L.guess = +d.i; L.stage = 'learn'; EI.save(); render(); $('#main').scrollTop = 0; };
A.lVi = d => { openVi.add(d.w); render(); };
A.lKnown = d => { EI.setKnown(d.w, EI.status(d.w) !== 'Known'); EI.save(); render(); };
A.stage = d => {
  const r = EI.rById(S.cur.rid), L = S.lessons[r.id]; let s = d.s;
  EI.audio.stop(); P.on = false; S.cur.focus = false; closeSheet();
  if (s === 'practice') { s = L.pst || 'practice'; if (s === 'practice' && !L.q) newTest(r, L); }
  L.stage = s; if (s === 'practice' || s === 'write' || s === 'done') L.pst = s;
  run = null; EI.save(); render(); if (!(s === 'read' && L.scroll)) $('#main').scrollTop = 0;
};
A.retake = () => { const r = EI.rById(S.cur.rid), L = S.lessons[r.id]; newTest(r, L); L.stage = L.pst = 'practice'; run = null; EI.save(); render(); $('#main').scrollTop = 0; };
A.tHl = (d, el) => { S.settings.hl = !S.settings.hl; EI.save(); $('#reader').classList.toggle('hl', S.settings.hl); el.classList.toggle('on', S.settings.hl); };
A.tGr = (d, el) => { S.cur.gr = !S.cur.gr; EI.save(); $('#reader').classList.toggle('gr', S.cur.gr); el.classList.toggle('on', S.cur.gr); if (S.cur.gr) toast('Blue underline = grammar of this story. Tap one to open the lesson.'); };
A.tVeil = (d, el) => { S.cur.veil = !S.cur.veil; EI.save(); $('#reader').classList.toggle('veil', S.cur.veil); el.classList.toggle('on', S.cur.veil); if (S.cur.veil) toast('Text is hidden until you hear each sentence.'); };
A.tFocus = () => { const m = $('#main').scrollTop; S.cur.focus = !S.cur.focus; EI.save(); render(); $('#main').scrollTop = m; };
A.wShow = () => { const L = S.lessons[S.cur.rid]; L.text = $('#wr').value; L.shown = true; EI.save(); render(); };
A.finishLesson = () => {
  const r = EI.rById(S.cur.rid), L = S.lessons[r.id], t = EI.today();
  if ((L.text || '').trim()) S.sentences.push({ en: L.text.trim(), kind: 'written', d: t, src: r.title });
  L.stage = L.pst = 'done'; L.doneDay = t; S.lastKind = 'reading';
  r.targets.forEach(w => { if (EI.status(w) === 'New') EI.enroll(w, t); });
  const seen = new Set(); // words from earlier stories met again here, in the right sense: a light re-meeting
  r.S.forEach(o => o.tk.forEach(x => { if (x.tg && x.lem && !r.targets.includes(x.lem)) seen.add(x.lem); }));
  seen.forEach(w => { const rc = S.words[w]; if (rc && rc.s === 'srs') { rc.enc = (rc.enc || 0) + 1; rc.m = Math.min(1.6, rc.m * 1.03); rc.h.push([t, 'seen', 'ok']); } });
  if (!S.facts.includes(r.id)) S.facts.push(r.id);
  EI.log('l', 1); EI.log('w', r.wc); EI.save(); render(); $('#main').scrollTop = 0;
};
A.recall = d => { const r = EI.rById(d.id), q = recallQ(r); if (q.length) go({ v: 'review', q, i: 0, tag: 'end', then: { kind: 'done', id: r.id } }); };

/* ----- player: one compact row fixed at the bottom of the story ----- */
function playerHTML() {
  return '<div class="player" role="group" aria-label="Audio player">' + ic('phones') +
    '<button class="btn icon" data-a="pPrev" aria-label="Previous sentence">' + ic('prev') + '</button>' +
    '<button class="btn icon" id="pplay" data-a="pPlay" aria-label="Play or pause">' + ic('play') + '</button>' +
    '<button class="btn icon" data-a="pNext" aria-label="Next sentence">' + ic('next') + '</button>' +
    '<button class="btn icon" data-a="pAgain" aria-label="Hear this sentence again">' + ic('again') + '</button>' +
    '<select id="prate" aria-label="Speed">' + [0.5, 0.75, 1, 1.25, 1.5, 2].map(x => '<option value="' + x + '"' + (S.settings.rate === x ? ' selected' : '') + '>' + x + '×</option>').join('') + '</select>' +
    '<span class="lab">' + esc(EI.audio.label()) + '</span></div>';
}
function paintPlayer() {
  const b = $('#pplay'); if (!b) return;
  b.innerHTML = ic(P.on ? 'pause' : 'play');
  document.querySelectorAll('.sn.now').forEach(e => e.classList.remove('now'));
  const el = document.querySelector('.sn[data-si="' + P.i + '"]');
  if (el && (P.on || P.touched)) { el.classList.add('now', 'heard'); if (P.on) el.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
}
function speakIdx(auto) {
  const r = EI.rById(S.cur.rid); if (!r) return;
  if (P.rid !== r.id) { P.rid = r.id; P.i = 0; }
  P.i = Math.max(0, Math.min(r.S.length - 1, P.i)); P.touched = true;
  const seq = ++P.seq; paintPlayer();
  EI.audio.say(r.S[P.i].plain, { onend: ok => { if (seq !== P.seq) return; if (ok && auto && P.on) { if (P.i + 1 < r.S.length) { P.i++; speakIdx(true); } else { P.on = false; paintPlayer(); } } else if (!ok) { P.on = false; paintPlayer(); } } });
}
A.pPlay = () => { if (!EI.audio.ok) { toast('This device has no speech voice.'); return; } const r = EI.rById(S.cur.rid); if (P.rid !== r.id) { P.rid = r.id; P.i = 0; } P.on = !P.on; if (P.on) speakIdx(true); else { P.seq++; EI.audio.stop(); paintPlayer(); EI.save(); } };
A.pPrev = () => { P.i--; speakIdx(P.on); };
A.pNext = () => { P.i++; speakIdx(P.on); };
A.pAgain = () => speakIdx(P.on);

/* ----- word / sentence sheet ----- */
function openSheet(si, j) {
  const r = EI.rById(S.cur.rid), o = r.S[si];
  sh = { r, o, j, t: j == null ? null : o.tk[j], vi: false, viW: false, shadow: false };
  if (rec.owner !== 'sheet') { rec.url = null; rec.owner = 'sheet'; }
  rec.err = ''; P.i = si; P.rid = r.id; P.touched = true; paintPlayer(); drawSheet();
}
function closeSheet() { sh = null; const s = $('#sheet'); if (s) { s.hidden = true; s.innerHTML = ''; } if (rec.on && rec.mr) rec.mr.stop(); }
function glossOf(r, t) { const g = r.gloss || {}, k = t.toLowerCase(); return g[k] || g[k.replace(/(es|s|ed|d|ing)$/, '')] || g[k.replace(/(s|d)$/, '')] || null; }
function drawSheet() {
  if (!sh) return;
  const { r, o, t } = sh; let h = '<div class="sheet" role="dialog" aria-label="Word and sentence">';
  h += '<div class="rowg"><span class="grow" style="flex:1"></span><button class="btn icon ghost" data-a="closeSheet" aria-label="Close">' + ic('x') + '</button></div>';
  if (t) {
    const lem = t.lem || EI.lemma(t.t), e = lem && EI.W[lem], g0 = !t.tg && glossOf(r, t.t), gl = !e && g0, ctx = e && g0;   // ctx: untagged word whose meaning in this story differs from the list entry (World’s Fair vs fair = công bằng)
    h += '<div class="rowg"><span class="sw">' + esc(t.t) + '</span>' + (e ? '<span class="ipa">' + esc(e.ipa) + '</span>' : '') + '<button class="btn icon" data-a="say" data-t="' + esc(e ? e.w : t.t) + '" aria-label="Hear the word">' + ic('phones') + '</button></div>';
    if (ctx) h += '<p class="small muted">Nghĩa trong câu này:</p><p class="vibox">' + esc(ctx) + '</p>';
    if (e) h += (e.w !== t.t.toLowerCase() ? '<p class="small muted">form of <b>' + esc(e.w) + '</b> · ' + esc(e.pos) + '</p>' : '<p class="small muted">' + esc(e.pos) + '</p>') + '<p class="def">' + esc(e.def) + '</p>' +
      (sh.viW ? '<p class="vibox">' + esc(e.vi) + '</p>' : '<div><button class="btn" data-a="shViW">Show Vietnamese meaning</button></div>') +
      (t.tg ? '' : '<p class="small muted">' + (ctx ? 'Trên đây là nghĩa thường gặp của <b>' + esc(e.w) + '</b>; trong câu này từ mang nghĩa khác (xem ô phía trên).' : 'Nghĩa trong từ điển của từ này; trong câu có thể khác đôi chút — xem bản dịch câu.') + '</p>');
    else h += gl ? '<p class="vibox">' + esc(gl) + '</p>' : '<p class="vi">Chưa có mục cho từ này. Xem bản dịch cả câu bên dưới, hoặc mở từ điển.</p>';
    h += '<p class="audiolabel">' + esc(EI.audio.label()) + ' · <a href="' + camb(e ? e.w : t.t) + '" target="_blank" rel="noopener">Cambridge Dictionary</a>' + (e ? ' · <a href="#" data-a="word" data-w="' + esc(e.w) + '">full entry</a>' : '') + '</p>';
    const mk = t.t.toLowerCase(), stt = e ? EI.status(e.w) : null;   // any word can go into the review plan, with this sentence as its context
    if (e) h += stt === 'New' ? '<div><button class="btn" data-a="shAdd">' + ic('star') + 'Add to my review</button></div>' : '<p class="small muted"><i class="st ' + stt + '"></i> ' + (stt === 'Known' ? 'Marked as Known' : 'In your review plan · ' + stt) + '</p>';
    else h += S.mine[mk] ? '<div class="rowg"><span class="chip">In your review plan ✓</span><button class="btn ghost" data-a="shRm">remove</button></div>' : '<div><button class="btn" data-a="shAdd">' + ic('star') + 'Add to my review</button></div>';
    if (t.g && EI.gById(t.g)) h += '<div><button class="btn" data-a="gram" data-id="' + t.g + '">Grammar here: ' + esc(EI.gById(t.g).title) + '</button></div>';
  }
  h += '<p class="exq">' + esc(o.plain) + '</p>' + (sh.vi ? '<p class="viline">' + esc(o.vi) + '</p>' : '');
  const saved = S.sentences.some(x => x.kind === 'saved' && x.en === o.plain);
  h += '<div class="rowg"><button class="btn icon" data-a="shSay" aria-label="Hear this sentence">' + ic('phones') + '</button><button class="btn' + (sh.vi ? ' on' : '') + '" data-a="shVi">Tiếng Việt</button>' +
    '<button class="btn' + (saved ? ' on' : '') + '" data-a="shSave">' + ic('star') + (saved ? 'Saved' : 'Save') + '</button><button class="btn' + (sh.shadow ? ' on' : '') + '" data-a="shShadow">' + ic('mic') + 'Speak along</button></div>';
  if (sh.shadow) h += '<div class="note"><p class="vi">Nghe câu, tự thu giọng mình, rồi nghe hai bản liền nhau để so. Bản thu chỉ nằm trong bộ nhớ của trang này, không lưu và không gửi đi đâu. Không chấm điểm.</p>' +
    (rec.err ? '<p class="small" style="color:var(--bad)">' + esc(rec.err) + '</p>' : '') +
    '<div class="rowg"><button class="btn" data-a="recToggle">' + ic('mic') + (rec.on ? 'Stop recording' : rec.url ? 'Record again' : 'Record') + '</button>' + (rec.url && !rec.on ? '<button class="btn primary" data-a="recCompare">' + ic('play') + 'Model, then me</button>' : '') + '</div></div>';
  const s = $('#sheet'); s.innerHTML = h + '</div>'; s.hidden = false;
}
A.closeSheet = closeSheet;
A.shAdd = () => { const lem = sh.t.lem || EI.lemma(sh.t.t), e = lem && EI.W[lem]; if (e) EI.enroll(e.w, EI.today()); else EI.addMine(sh.r, sh.o.i, sh.j); EI.save(); drawSheet(); toast('Added. You will meet this word again in your reviews, inside this sentence.'); };
A.shRm = () => { delete S.mine[sh.t.t.toLowerCase()]; EI.save(); drawSheet(); };
A.mineRm = d => { delete S.mine[d.k]; EI.save(); render(); };
const recRedraw = () => { if (sh) drawSheet(); else render(); };
A.rtPlay = () => { if (rec.url) new Audio(rec.url).play().catch(() => {}); };
A.rtModel = () => { const r = EI.rById(S.cur.rid), L = S.lessons[r.id], w = $('#wr'); if (w) L.text = w.value; L.shown = true; EI.save(); render(); EI.audio.say(r.write.model); };
A.shViW = () => { sh.viW = true; drawSheet(); };
A.shVi = () => { sh.vi = !sh.vi; drawSheet(); };
A.shSay = () => { P.seq++; P.on = false; paintPlayer(); EI.audio.say(sh.o.plain); };
A.shSave = () => { const en = sh.o.plain, i = S.sentences.findIndex(x => x.kind === 'saved' && x.en === en); if (i >= 0) S.sentences.splice(i, 1); else S.sentences.push({ en, vi: sh.o.vi, kind: 'saved', d: EI.today(), src: sh.r.title }); EI.save(); drawSheet(); };
A.shShadow = () => { sh.shadow = !sh.shadow; drawSheet(); };
A.recToggle = async () => {
  if (rec.on) { rec.mr.stop(); return; }
  const own = sh ? 'sheet' : 'retell'; if (rec.owner !== own) { rec.url = null; rec.owner = own; }
  try {
    if (!navigator.mediaDevices || typeof MediaRecorder === 'undefined') throw new Error('unsupported');
    const st = await navigator.mediaDevices.getUserMedia({ audio: true });
    rec.chunks = []; rec.mr = new MediaRecorder(st); rec.err = '';
    rec.mr.ondataavailable = e => rec.chunks.push(e.data);
    rec.mr.onstop = () => { st.getTracks().forEach(x => x.stop()); if (rec.url) URL.revokeObjectURL(rec.url); rec.url = URL.createObjectURL(new Blob(rec.chunks, { type: rec.mr.mimeType })); rec.on = false; if (rec.owner === 'retell' && S.lessons[S.cur.rid]) { S.lessons[S.cur.rid].spoke = 1; EI.save(); } recRedraw(); };
    rec.mr.start(); rec.on = true; recRedraw();
  } catch (e) { rec.err = 'Không dùng được micro ở đây (trình duyệt chặn hoặc trang chưa chạy qua https). Bạn vẫn có thể nghe và nói theo.'; recRedraw(); }
};
A.recCompare = () => { const play = () => { const a = new Audio(rec.url); a.play().catch(() => {}); }; if (EI.audio.ok) EI.audio.say(sh.o.plain, { onend: play }); else play(); };
function toggleVi(el) {
  const nx = el.nextElementSibling;
  if (nx && nx.classList.contains('viline')) { nx.remove(); return; }
  const o = EI.rById(S.cur.rid).S[+el.dataset.si], d = document.createElement('span'); d.className = 'viline'; d.textContent = o.vi; el.after(d);
}

/* ================= Progress ================= */
function vProgress() {
  const t = EI.today(), D = S.days, cov = EI.cover(), fc = EI.forecast(), cnt = { New: 0, Learning: 0, Familiar: 0, Strong: 0, Mastered: 0, Known: 0 };
  Object.keys(EI.W).forEach(w => cnt[EI.status(w)]++);
  const wk = { days: 0, t: 0, r: 0, l: 0, w: 0, a: 0 }, all = { w: 0, a: 0, t: 0 };
  for (const d in D) { all.w += D[d].w; all.a += D[d].a; all.t += D[d].t; if (d > t - 7) { if (D[d].r || D[d].l || D[d].t > 60) wk.days++; for (const k of ['t', 'r', 'l', 'w', 'a']) wk[k] += D[d][k]; } }
  const newWk = Object.values(S.words).filter(r => r.s === 'srs' && r.first > t - 7).length, mins = s => Math.round(s / 60);
  let h = '<div class="ph"><h1>Progress</h1></div>';
  h += '<section class="plain" id="p-week"><h2>This week</h2><div class="stats"><div class="stat"><b>' + wk.days + '</b><span>days studied (last 7)</span></div><div class="stat"><b>' + mins(wk.t) + '</b><span>minutes</span></div><div class="stat"><b>' + wk.l + '</b><span>lessons finished</span></div><div class="stat"><b>' + wk.r + '</b><span>review answers</span></div><div class="stat"><b>' + newWk + '</b><span>new words in memory plan</span></div><div class="stat"><b>' + wk.w + '</b><span>words read</span></div></div></section>';
  const scored = EI.R.filter(r => S.scores[r.id]);
  h += '<section class="plain" id="p-score"><h2>Practice scores</h2>' + (scored.length ? '<div class="scrollx"><table class="gtable"><tr><th>Story</th><td class="small muted">Last · best · attempts · understanding / vocabulary / grammar</td></tr>' + scored.map(r => { const x = S.scores[r.id], pc = k => x.parts[k][1] ? Math.round(x.parts[k][0] / x.parts[k][1] * 100) + '%' : '–';
    return '<tr><th><a href="#" data-a="openR" data-id="' + r.id + '">' + esc(r.title) + '</a></th><td class="num"><b>' + x.last + '%</b> · ' + x.best + '% · ' + x.n + ' · ' + pc('c') + ' / ' + pc('w') + ' / ' + pc('g') + '</td></tr>'; }).join('') + '</table></div>' : '<p class="vi">Điểm phần Practice của từng bài đọc sẽ hiện ở đây và cạnh tên bài trong danh sách Reading.</p>') + '</section>';
  h += '<section class="plain" id="p-cover"><h2>Coverage</h2><p class="vi">Mỗi cấp có hai lượt bài đọc (pass); mỗi lượt đi qua toàn bộ bộ từ của cấp đó. Số liệu tính trên bộ từ hiện có trong ứng dụng.</p>' +
    cov.map(c => '<div><div class="rowg" style="justify-content:space-between"><b>' + c.level + ' · Pass ' + c.pass + '</b><span class="small muted num">' + (c.total && c.readings ? c.covered + ' / ' + c.total + ' words · ' + c.done + ' / ' + c.readings + ' stories' : 'not available yet') + '</span></div><div class="meter"><i style="width:' + (c.total ? Math.round(c.covered / c.total * 100) : 0) + '%"></i></div></div>').join('') + '</section>';
  h += '<section class="plain" id="p-mem"><h2>Memory</h2><div class="stats">' + [...EI.STATES, 'Known'].map(s => '<div class="stat"><b>' + cnt[s] + '</b><span><i class="st ' + s + '"></i> ' + s + '</span></div>').join('') + '</div>' +
    '<h3>Reviews in the next 7 days</h3><div class="bars">' + fc.map((n, i) => '<div><span class="num">' + n + '</span><i style="height:' + Math.round(n / Math.max(1, ...fc) * 100) + '%"></i><span>' + (i === 0 ? 'today' : EI.dayDate(t + i).toLocaleDateString('en-US', { weekday: 'short' })) + '</span></div>').join('') + '</div><p class="vi">Mỗi ngày Today chỉ lấy tối đa ' + S.settings.cap + ' mục, ưu tiên từ sắp quên nhất; phần còn lại dời sang ngày sau.</p></section>';
  h += '<section class="plain" id="p-cal"><h2>Study days</h2>' + calHTML(35) + '<div class="stats"><div class="stat"><b>' + all.w + '</b><span>words read in total</span></div><div class="stat"><b>' + mins(all.a) + '</b><span>minutes of listening</span></div><div class="stat"><b>' + mins(all.t) + '</b><span>minutes in the app</span></div></div></section>';
  // mistakes by type
  const grp = {}; S.errors.forEach(e => { const k = e.kind === 'grammar' ? 'Grammar · ' + ((EI.gById(e.id) || {}).title || e.id) : e.k.startsWith('w:') ? 'Story · word in context' : e.k.startsWith('g:') ? 'Story · grammar · ' + ((EI.gById(e.k.slice(2)) || {}).title || e.k.slice(2)) : 'Story · understanding'; (grp[k] = grp[k] || []).push(e); });
  h += '<section class="plain" id="p-err"><h2>Mistakes</h2>' + (Object.keys(grp).length ? Object.keys(grp).sort((a, b) => grp[b].length - grp[a].length).map(k => '<details class="card"><summary><b>' + esc(k) + '</b> · ' + grp[k].length + '</summary>' + grp[k].slice(-8).reverse().map(e => '<p class="small">' + EI.fmtDay(e.d) + ' · ' + esc(e.k.startsWith('w:') ? e.k.slice(2) + ' — ' : '') + esc(e.q) + '</p>').join('') + '</details>').join('') : '<p class="vi">Chưa có lỗi nào được ghi. Lỗi được gom theo loại để bạn thấy mình hay sai ở đâu.</p>') + '</section>';
  // facts
  const facts = S.facts.map(id => EI.rById(id)).filter(Boolean), hist = facts.filter(r => r.year != null).sort((a, b) => a.year - b.year), rest = facts.filter(r => r.year == null);
  const fc2 = r => '<div class="fact">' + (r.year != null ? '<span class="y">' + esc(r.era) + ' · ' + esc(r.region) + '</span>' : '<span class="eyebrow">' + EI.TOPICS[r.topic] + '</span>') + '<p>' + esc(r.fact.card) + '</p><button class="btn ghost" style="align-self:flex-start" data-a="openR" data-id="' + r.id + '">' + esc(r.title) + '</button></div>';
  h += '<section class="plain" id="p-facts"><h2>Fact collection</h2>' + (facts.length ? (hist.length ? '<h3>Timeline</h3><div class="tl">' + hist.map(fc2).join('') + '</div>' : '') + (rest.length ? '<h3>Science, nature and more</h3>' + rest.map(fc2).join('') : '') : '<p class="vi">Mỗi bài học xong để lại một thẻ ghi sự thật chính. Các bài có mốc thời gian nằm trên một dòng thời gian.</p>') + '</section>';
  const mine = Object.keys(S.mine || {});
  h += '<section class="plain" id="p-mine"><h2>My words</h2>' + (mine.length ? mine.map(k => { const m = S.mine[k], x = EI.mineSent(m); return '<div class="sent"><b>' + esc(m.surf) + '</b>' + (m.vi ? ' — <span class="vi">' + esc(m.vi) + '</span>' : '') + (x ? '<small>' + esc(x.o.plain) + '</small>' : '') + '<small>from ' + esc(x ? x.r.title : m.rid) + ' · next review ' + (m.due <= t ? 'due now' : EI.fmtDay(m.due)) + ' · <a href="#" data-a="mineRm" data-k="' + esc(k) + '">remove</a></small></div>'; }).join('') : '<p class="vi">Khi đọc, bấm vào bất kỳ từ nào rồi chọn “Add to my review”. Từ đó sẽ được ôn cách quãng ngay trong chính câu của bài đọc.</p>') + '</section>';
  h += '<section class="plain" id="p-sent"><h2>My sentences</h2>' + (S.sentences.length ? S.sentences.slice().reverse().map((x, i) => '<div class="sent">' + esc(x.en) + (x.vi ? '<small>' + esc(x.vi) + '</small>' : '') + '<small>' + (x.kind === 'saved' ? 'saved from' : 'written for') + ' ' + esc(x.src || '') + ' · ' + EI.fmtDay(x.d) + ' · <a href="#" data-a="delSent" data-i="' + (S.sentences.length - 1 - i) + '">remove</a></small></div>').join('') : '<p class="vi">Câu bạn lưu khi đọc và câu bạn tự viết sẽ nằm ở đây.</p>') + '</section>';
  return page(h);
}
A.delSent = d => { S.sentences.splice(+d.i, 1); EI.save(); render(); };
A.jump = d => { const e = document.getElementById(d.id); if (e) e.scrollIntoView({ block: 'start', behavior: 'smooth' }); };

/* ================= Settings ================= */
function vSettings() {
  const st = S.settings, sel = (id, opts, cur) => '<select id="' + id + '">' + opts.map(o => '<option value="' + esc(o[0]) + '"' + (String(cur) === String(o[0]) ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>';
  let h = '<div class="ph"><h1>Settings</h1></div>';
  h += '<section class="card" id="s-look"><h2>Display</h2><label class="f">Theme' + sel('set-theme', [['system', 'Follow the device'], ['light', 'Light'], ['dark', 'Dark']], st.theme) + '</label><label class="f">Text size' + sel('set-fs', [[0.9, 'Small'], [1, 'Normal'], [1.15, 'Large'], [1.3, 'Extra large']], st.fs) + '</label><p class="vi">Chế độ đọc tập trung (Focus) bật ngay trong bài đọc.</p></section>';
  h += '<section class="card" id="s-study"><h2>Study</h2><label class="f">Reviews per day, at most' + sel('set-cap', [[8, '8 (about 2 min)'], [15, '15 (about 5 min)'], [25, '25 (about 8 min)'], [40, '40 (about 12 min)'], [9999, 'No limit']], st.cap) + '</label><p class="vi">Giới hạn này giữ cho lượt ôn không lấn bài học. Khi nghỉ lâu, lượng ôn dồn lại được chia ra nhiều ngày, ưu tiên từ sắp quên nhất.</p></section>';
  h += '<section class="card" id="s-audio"><h2>Audio</h2><p class="audiolabel">Current source: ' + esc(EI.audio.label()) + '</p>' + (EI.audioIndex && !EI.inlined ? '<label class="f">Voice source' + sel('set-vsrc', [['ai', 'AI voice: Kokoro Heart & Bella (recommended)'], ['browser', 'Browser voice of this device']], st.vsrc || 'ai') + '</label><p class="vi">Giọng AI là file âm thanh tạo sẵn bằng mô hình Kokoro-82M, giống nhau trên mọi máy và nghe được khi mất mạng sau lần nghe đầu. Đây là giọng máy, không phải người thật. Câu bạn tự viết vẫn dùng giọng của trình duyệt.</p>' : '') + '<label class="f">Browser voice (en-US voices on this device)' + sel('set-voice', [['', 'Automatic'], ...EI.audio.voices.map(v => [v.name, v.name])], st.voice) + '</label><label class="f">Key to hear the sentence again (while reading)' + sel('set-key', [['Alt+R', 'Alt+R'], ['R', 'R'], ['Space', 'Space'], ['Off', 'Off']], st.replayKey) + '</label><div class="rowg"><button class="btn" data-a="say" data-t="This is the voice you will hear in English Improve.">' + ic('phones') + 'Test the voice</button></div></section>';
  h += '<section class="card" id="s-topics"><h2>Topic mix</h2><p class="vi">Số càng lớn, chủ đề đó càng được gợi ý nhiều. Mặc định: lịch sử 2, mỗi chủ đề khác 1 (lịch sử nhỉnh hơn một chút). Đặt 0 để tạm không gợi ý một chủ đề.</p>' + Object.keys(EI.TOPICS).map(k => '<div class="mrow"><span>' + EI.TOPICS[k] + '</span><input type="number" min="0" max="10" data-topic="' + k + '" value="' + st.topics[k] + '" aria-label="' + EI.TOPICS[k] + ' weight"></div>').join('') + '</section>';
  if (EI.sync.available()) h += syncCard();
  h += '<section class="card" id="s-data"><h2>Backup</h2><p class="vi">Tiến độ chỉ lưu trong trình duyệt này. Hãy xuất file định kỳ, nhất là trước khi đổi máy hoặc xóa dữ liệu trình duyệt.' + (S.lastExport != null ? ' Lần xuất gần nhất: ' + EI.fmtDay(S.lastExport) + '.' : ' Bạn chưa xuất lần nào.') + '</p><div class="rowg"><button class="btn primary" data-a="export">Export progress</button><button class="btn" data-a="importOpen">Import progress</button><button class="btn" data-a="resetAsk">Erase all progress</button></div>' +
    '<p class="vi">Cài lên màn hình chính: mở web bằng Chrome/Edge/Safari qua địa chỉ https, chọn “Add to Home screen / Install app”. Sau lần tải đầu, web mở được khi mất mạng.</p></section>';
  return page(h);
}
function modal(h) { const m = $('#modal'); m.innerHTML = '<div class="dialog" role="dialog">' + h + '</div>'; m.hidden = false; }
A.closeModal = () => { const m = $('#modal'); m.hidden = true; m.innerHTML = ''; };

/* ---------- sync between devices ---------- */
const SYNC_ERR = { offline: 'Máy đang mất mạng. Sẽ đồng bộ khi có mạng lại.', network: 'Không kết nối được máy chủ đồng bộ. Sẽ thử lại sau.', not_found: 'Không tìm thấy mã này. Kiểm tra lại từng ký tự.', busy: 'Hai máy vừa đồng bộ cùng lúc. Bấm Sync now để thử lại.', error: 'Máy chủ đồng bộ báo lỗi.', deleted: 'Bản trực tuyến đã bị xóa từ một máy khác, nên máy này đã ngừng đồng bộ. Tiến độ trên máy này vẫn còn.' };
const syncWhen = ms => new Date(ms).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
function syncCard() {
  const c = EI.sync.cfg();
  let h = '<section class="card" id="s-sync"><h2>Sync between devices</h2>';
  if (!c.code) return h + '<p class="vi">Học trên nhiều máy (điện thoại, máy tính công ty, máy ở nhà) mà tiến độ vẫn là một. Không cần tài khoản hay email: máy đầu tiên tạo một <b>mã đồng bộ</b>, các máy khác nhập mã đó.</p><p class="vi">Ai có mã thì xem và sửa được tiến độ học của bạn, nên đừng gửi mã cho người khác. Mỗi người học dùng một mã riêng.</p><div class="rowg"><button class="btn primary" data-a="syncCreate">Create a sync code</button><button class="btn" data-a="syncJoinOpen">I have a code</button></div></section>';
  h += '<p>Sync code: <code class="num" id="sycode">' + esc(EI.sync.show(c.code)) + '</code> <button class="btn ghost" data-a="syncCopy">Copy</button></p>';
  h += '<p class="vi">' + (c.err ? '<span style="color:var(--bad)">' + esc(SYNC_ERR[c.err] || SYNC_ERR.error) + (c.errStatus ? ' (HTTP ' + c.errStatus + ')' : '') + '</span> ' : '') + (c.at ? 'Lần đồng bộ gần nhất: ' + syncWhen(c.at) + '.' : 'Chưa đồng bộ lần nào.') + ' Máy tự đồng bộ khi mở web, khi quay lại web và khoảng 5 phút một lần nếu có thay đổi. Nhập mã này ở máy khác để học tiếp ở đó.</p>';
  return h + '<div class="rowg"><button class="btn primary" data-a="syncNow">Sync now</button><button class="btn" data-a="syncStopAsk">Stop syncing on this device</button><button class="btn" data-a="syncDelAsk">Delete the online copy</button></div></section>';
}
const syncShow = (r, okMsg) => { if (S.cur.v === 'settings' || S.cur.v === 'today' || S.cur.v === 'progress') render(); if (r.ok) toast(okMsg); else if (r.why !== 'off') toast(r.why === 'deleted' ? 'The online copy was deleted.' : 'Sync failed — see Settings.'); };
A.syncCreate = d => { toast('Creating a sync code…'); EI.sync.create().then(r => syncShow(r, 'Sync code created. Enter it on your other devices.')); };
A.syncJoinOpen = () => modal('<h2>Use a sync code</h2><p class="vi">Nhập mã 16 ký tự đã tạo trên máy khác (không phân biệt hoa thường, có hay không có dấu gạch đều được). Tiến độ trên máy này sẽ được <b>gộp</b> với bản trực tuyến, không mất gì.</p><input id="sycin" autocomplete="off" spellcheck="false" placeholder="XXXX-XXXX-XXXX-XXXX" maxlength="24"><p id="syce" class="small" style="color:var(--bad)"></p><div class="rowg"><button class="btn primary" data-a="syncJoin">Connect</button><button class="btn" data-a="closeModal">Cancel</button></div>');
A.syncJoin = () => {
  const code = EI.sync.clean($('#sycin').value), e = $('#syce');
  if (!EI.sync.valid(code)) { e.textContent = 'Mã gồm 16 ký tự chữ và số (không có I, L, O, U). Kiểm tra lại.'; return; }
  e.textContent = 'Connecting…';
  EI.sync.join(code).then(r => { if (!r.ok) { e.textContent = SYNC_ERR[r.why] || SYNC_ERR.error; return; } A.closeModal(); syncShow(r, 'Connected. Progress from both devices is merged.'); });
};
A.syncNow = () => { toast('Syncing…'); EI.sync.run().then(r => syncShow(r, 'Synced.')); };
A.syncCopy = () => { const t = EI.sync.show(EI.sync.cfg().code); (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast('Code copied.'), () => toast('Select the code and copy it by hand.')); };
A.syncStopAsk = () => modal('<h2>Stop syncing on this device?</h2><p class="vi">Máy này giữ nguyên tiến độ hiện có nhưng không gửi và nhận thay đổi nữa. Bản trực tuyến và các máy khác không bị ảnh hưởng. Muốn đồng bộ lại thì nhập lại mã.</p><div class="rowg"><button class="btn" data-a="syncStopDo">Stop syncing</button><button class="btn primary" data-a="closeModal">Keep syncing</button></div>');
A.syncStopDo = () => { EI.sync.stop(); A.closeModal(); render(); toast('Sync stopped on this device.'); };
A.syncDelAsk = () => modal('<h2>Delete the online copy?</h2><p class="vi">Xóa tiến độ đang lưu trên máy chủ đồng bộ. Tiến độ trong trình duyệt của từng máy vẫn còn. Các máy khác đang dùng mã này sẽ tự ngừng đồng bộ ở lần kết nối sau. Không hoàn tác được.</p><div class="rowg"><button class="btn" data-a="syncDelDo">Delete online copy</button><button class="btn primary" data-a="closeModal">Cancel</button></div>');
A.syncDelDo = () => EI.sync.remove().then(r => { A.closeModal(); render(); toast(r.ok ? 'Online copy deleted. This device no longer syncs.' : 'Could not reach the sync server. Nothing was deleted.'); });
A.export = () => {
  const txt = EI.exportText(); S.lastExport = EI.today(); EI.save();
  const name = 'english-improve-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'application/json' })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); } catch (e) { /* fall back to the text below */ }
  modal('<h2>Backup created</h2><p class="vi">File <b>' + name + '</b> đã được tải về (thư mục Downloads). Nếu không thấy file (một số trình xem chặn tải xuống), hãy sao chép toàn bộ đoạn chữ dưới đây và lưu vào một ghi chú — khi cần, dán lại ở Import.</p><textarea id="bk" readonly>' + esc(txt) + '</textarea><div class="rowg"><button class="btn" data-a="copyBk">Copy the text</button><button class="btn primary" data-a="closeModal">Done</button></div>');
  if (S.cur.v === 'today' || S.cur.v === 'settings') render();
};
A.copyBk = () => { const t = $('#bk'); t.select(); (navigator.clipboard ? navigator.clipboard.writeText(t.value) : Promise.reject()).then(() => toast('Copied.'), () => toast('Select the text and copy it by hand.')); };
A.importOpen = () => modal('<h2>Import progress</h2><p class="vi">Chọn file sao lưu (.json) hoặc dán đoạn chữ sao lưu vào ô bên dưới.</p><input type="file" id="imf" accept=".json,application/json"><textarea id="imt" placeholder="…or paste the backup text here"></textarea><p id="ime" class="small" style="color:var(--bad)"></p><div class="rowg"><button class="btn primary" data-a="importRead">Read the backup</button><button class="btn" data-a="closeModal">Cancel</button></div>');
let pending = null;
A.importRead = async () => {
  try {
    const f = $('#imf').files[0], txt = f ? await f.text() : $('#imt').value; if (!txt.trim()) throw new Error('Choose a file or paste the text first.');
    pending = EI.parseBackup(txt); const st = pending.state, n = Object.keys(st.words).length, l = Object.values(st.lessons || {}).filter(x => x.doneDay).length;
    modal('<h2>Import this backup?</h2><p>Saved on <b>' + esc(new Date(pending.at).toLocaleString()) + '</b> · ' + n + ' words with memory data · ' + l + ' stories finished.</p>' +
      '<div class="note"><b>Merge</b><p class="vi">Gộp với tiến độ đang có trên máy này. Với mỗi từ, mỗi bài, giữ bản có nhiều lịch sử học hơn. Không có gì bị xóa. Nên chọn khi bạn học trên hai máy.</p><button class="btn primary" data-a="importDo" data-m="merge">Merge</button></div>' +
      '<div class="note"><b>Replace</b><p class="vi">Xóa toàn bộ tiến độ đang có trên máy này và thay bằng nội dung file, kể cả lịch ôn và cài đặt. Không hoàn tác được. Nên chọn khi khôi phục sau khi mất dữ liệu.</p><button class="btn" data-a="importDo" data-m="replace">Replace</button></div><button class="btn ghost" data-a="closeModal">Cancel</button>');
  } catch (e) { const el = $('#ime'); if (el) el.textContent = e.message || 'This file could not be read.'; }
};
A.importDo = d => { EI.importState(pending, d.m); S = EI.S; pending = null; EI.save(); A.closeModal(); go({ v: 'progress' }); toast(d.m === 'merge' ? 'Backup merged.' : 'Progress replaced from the backup.'); };
A.resetAsk = () => modal('<h2>Erase all progress?</h2><p class="vi">Xóa toàn bộ tiến độ, lịch ôn, câu đã lưu và cài đặt trên trình duyệt này. Không hoàn tác được. Hãy Export trước nếu bạn còn muốn giữ.' + (EI.sync.on() ? ' Máy này cũng ngừng đồng bộ; bản trực tuyến và các máy khác không bị xóa.' : '') + '</p><div class="rowg"><button class="btn" data-a="resetDo">Erase everything</button><button class="btn primary" data-a="closeModal">Keep my progress</button></div>');
A.resetDo = () => { try { localStorage.removeItem('ei.v1'); } catch (e) { /* ignore */ } EI.sync.stop(); EI.load(); S = EI.S; A.closeModal(); go({ v: 'today' }); toast('All progress erased.'); };

/* ================= Info ================= */
function vInfo() {
  const lv = Object.keys(EI.meta), nW = Object.keys(EI.W).length;
  let h = '<div class="ph"><h1>Info</h1></div>';
  h += '<section class="plain" id="i-how"><h2>How to use</h2><ul class="steps vi"><li>Mở <b>Today</b> và bấm Start: vào thẳng bài đọc của hôm nay. Thời gian ước tính hiện trước khi bắt đầu. Từ đến hạn ôn được hỏi ở cuối bài, hoặc bấm Review now.</li><li>Một bài đọc gồm bốn bước: <b>Learn words → Read &amp; listen → Grammar → Practice</b>. Bấm vào tên bước để lùi hoặc tiến. Thoát giữa chừng vẫn được lưu đúng bước.</li><li><b>Practice có chấm điểm</b>, gồm ba phần: hiểu bài đọc, từ vựng của bài (chính câu chuyện với các từ mục tiêu bị che — kiểm tra đủ mọi từ), và ngữ pháp của bài. Điểm hiện cạnh tên bài trong Reading và trong Progress. Dùng gợi ý được nửa điểm; câu luyện thêm sau khi sai không tính điểm; làm lại được bao nhiêu lần tùy ý.</li><li>Khi đọc: bấm vào từ để xem nghĩa và nghe; bấm giữ một câu để xem bản dịch; lưu câu hay vào My sentences; “Speak along” để nói theo và so giọng.</li><li>Không có bảng xếp hạng, đồng hồ đếm ngược hay thẻ lật từ–nghĩa. Mọi câu hỏi đều gắn với một câu chuyện hoặc một chủ điểm ngữ pháp, và mọi lần ôn từ đều nằm trong một câu.</li><li>Số câu luyện tập khác nhau giữa các bài. Khi bạn sai một từ hoặc một cấu trúc, sẽ có thêm một câu về đúng điểm đó.</li><li><b>Từ của riêng bạn:</b> khi đọc, bấm vào bất kỳ từ nào rồi chọn “Add to my review”; từ đó được ôn cách quãng ngay trong câu của bài đọc (xem Progress → My words).</li><li><b>Kể lại bằng giọng nói:</b> sau Practice, thu 30–60 giây kể lại câu chuyện, nghe lại mình và so với bài mẫu. Không chấm điểm.</li><li>Tiến độ lưu trong trình duyệt. Xuất file sao lưu trong Settings.</li></ul></section>';
  h += '<section class="plain" id="i-srs"><h2>How review works</h2><p class="vi">Lịch ôn dựa trên năm kết quả nghiên cứu về trí nhớ:</p><ul class="steps vi"><li><b>Đường cong quên lãng</b> (Ebbinghaus, 1885): ta quên nhanh nhất trong khoảng một ngày đầu, nên lần ôn đầu đến ngay cuối buổi học và lần hai sau 1 ngày.</li><li><b>Hiệu ứng giãn cách</b> (Cepeda và cộng sự, 2006): ôn rải ra nhiều ngày nhớ lâu hơn ôn dồn một lúc.</li><li><b>Luyện truy xuất</b> (Roediger &amp; Karpicke, 2006): tự nhớ lại rồi mới xem đáp án hiệu quả hơn đọc lại, nên mọi lần ôn đều bắt bạn tự điền/tự viết trước.</li><li><b>Khó vừa phải</b> (Bjork, “desirable difficulties”): ôn đúng lúc sắp quên; dạng ôn khó dần.</li><li><b>Gặp lại trong nhiều ngữ cảnh</b> (nghiên cứu từ vựng của Nation, Webb): một từ cần được gặp nhiều lần ở các câu khác nhau, nên mỗi lần ôn dùng một câu khác.</li></ul>' +
    '<p class="vi"><b>Lịch:</b> cuối buổi học → 1 → 3 → 7 → 14 → 30 → 60 → 120 ngày. Nhớ đúng, không cần gợi ý: sang mốc kế. Đúng nhưng cần gợi ý: lặp lại mốc. Sai: về mốc 1 ngày và lần sau dùng câu khác. Khoảng cách được nhân hệ số riêng cho từng từ (từ khó ngắn hơn, từ dễ dài hơn và bỏ bớt hai mốc; mỗi lần sai rút ngắn 15%).</p>' +
    '<p class="vi"><b>Dạng ôn, khó dần:</b> câu gốc trong bài với từ bị che → câu mới, gõ từ còn thiếu → nghe câu, gõ từ → chọn đúng nghĩa của từ trong câu → tự viết một câu. Không lặp một dạng hai lần liên tiếp cho cùng một từ. Từ sai từ 3 lần trở lên được đánh dấu <b>từ khó</b> và đổi cách hỏi, kèm cụm từ đi kèm và ghi chú.</p>' +
    '<p class="vi"><b>Năm trạng thái:</b> New → Learning (mốc 0–1 ngày) → Familiar (3–7 ngày) → Strong (14–30 ngày) → Mastered (60–120 ngày). Gặp lại một từ đúng nghĩa trong bài đọc khác được ghi là một lần gặp lại nhẹ.</p></section>';
  h += '<section class="plain" id="i-data"><h2>Data sources</h2>' + lv.map(l => '<p class="vi"><b>' + l + ':</b> ' + esc(EI.meta[l].note) + '</p>').join('') + '<p class="vi">Định nghĩa, ví dụ, cụm từ, nghĩa tiếng Việt, ghi chú và mức độ khó do Claude (AI của Anthropic) soạn mới cho ứng dụng này; không sao chép từ từ điển nào. <b>Mức độ khó là ước tính, chưa được kiểm chứng.</b> Bản dịch tiếng Việt của các câu trong bài đọc cũng do AI soạn và chưa qua người hiệu đính.</p></section>';
  h += '<section class="plain" id="i-src"><h2>Sources for each story</h2><p class="vi">Bài 1–26: chi tiết chính được đối chiếu với ít nhất hai nguồn. Từ bài 27: mỗi bài dựa trên ít nhất một nguồn đã đọc hoặc kiến thức phổ thông; phần ghi chú của từng bài nói rõ chi tiết nào lấy từ đâu. Bài có dòng “sources not opened yet” được viết khi chưa mở được nguồn và cần kiểm tra lại. Mọi bài đều được viết lại bằng lời mới.</p>' + EI.R.map(r => '<details class="card"><summary><b>' + esc(r.title) + '</b> · ' + (r.unchecked ? 'written ' + esc(r.verified) + ' · sources not opened yet' : 'checked ' + esc(r.verified)) + '</summary>' + r.sources.map(s => '<p class="small"><a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + '</a></p>').join('') + (r.note ? '<p class="vi">' + esc(r.note) + '</p>' : '') + (r.fact.bonusSrc ? '<p class="vi">Chi tiết thêm sau bài: ' + esc(r.fact.bonusSrc) + '</p>' : '') + (r.practiceNote ? '<p class="vi">Lượng luyện tập: ' + esc(r.practiceNote) + '</p>' : '') + '</details>').join('') + '</section>';
  h += '<section class="plain" id="i-audio"><h2>Audio</h2><p class="vi">Nguồn âm thanh đang dùng trên máy này: <b>' + esc(EI.audio.label()) + '</b>.</p><ul class="steps vi"><li><b>Bài đọc và từ vựng:</b> giọng AI tạo sẵn bằng Kokoro-82M (giấy phép Apache-2.0), hai giọng Mỹ Heart và Bella, mỗi bài và mỗi từ một giọng cố định. Đây là giọng máy, không phải người thật. Ngắt dài hơn ở dấu phẩy và cuối câu để dễ nghe. Đổi sang giọng trình duyệt trong Settings → Audio.</li><li><b>Phát âm người thật:</b> âm thanh của Cambridge Dictionary có bản quyền và điều khoản không cho lưu bản sao, nên ứng dụng chỉ kèm liên kết mở đúng mục từ trên Cambridge.</li><li><b>Câu bạn tự viết, câu không có file:</b> dùng giọng máy en-US của trình duyệt; chất lượng phụ thuộc thiết bị.</li><li><b>Speak along:</b> bản thu giọng bạn chỉ nằm trong bộ nhớ của trang, mất khi đóng bảng; cần trình duyệt cho phép micro (trang chạy qua https hoặc localhost).</li></ul></section>';
  const p2 = EI.R.filter(r => r.pass === 2).length;
  h += '<section class="plain" id="i-missing"><h2>Not available yet</h2><ul class="steps vi"><li>Bộ từ hiện có <b>' + nW + ' từ A2</b> — là các từ mục tiêu của ' + EI.R.length + ' bài đọc đầu. Phần còn lại của A2 sẽ đi kèm các lô bài đọc sau (mỗi bài mang theo nhóm từ của nó).</li><li>A2 · Pass 1 mới có ' + EI.R.filter(r => r.pass === 1).length + ' bài đầu; A2 · Pass 2: ' + (p2 || 'chưa có') + '.</li><li>B1, B2, C1: chưa có từ, bài đọc và ngữ pháp.</li><li>Từ không phải từ mục tiêu trong bài đọc: chỉ có nghĩa ngắn cho những từ khó được chú thích sẵn; các từ còn lại dùng bản dịch câu và liên kết Cambridge.</li><li>Âm thanh người thật: chưa có (xem mục Audio).</li><li>Dạng ôn “chọn câu diễn đạt lại đúng nghĩa” hiện được thay bằng “chọn đúng nghĩa của từ trong câu”.</li></ul><p class="vi">Chi tiết các quyết định nằm trong file DECISIONS.md của dự án.</p></section>';
  return page(h);
}

/* ================= events ================= */
A.go = d => go(d.v === 'vocab' ? { v: 'vocab', lv: 'A2', per: 20, pg: 1 } : d.v === 'reading' ? { v: 'reading', level: (S.cur.v === 'reading' && S.cur.level) || null } : { v: d.v });
A.back = () => { const c = S.cur; if (c.v === 'vocab') go(Object.assign({}, c, { w: null })); else if (c.v === 'grammar') go({ v: 'grammar' }); else if (c.v === 'reading') go({ v: 'reading', level: c.level }); else if (c.v === 'scan') go({ v: 'vocab' }); else go({ v: 'today' }); };
document.addEventListener('click', e => {
  if (lp.fired) { lp.fired = false; e.preventDefault(); return; }
  if (e.target.id === 'sheet') { closeSheet(); return; }
  if (e.target.id === 'modal') { A.closeModal(); return; }
  const el = e.target.closest('[data-a]');
  if (el) { if (el.tagName === 'A') e.preventDefault(); const f = A[el.dataset.a]; if (f) f(el.dataset, el); return; }
  const tk = e.target.closest('.tk'), sn = e.target.closest('.sn');
  if (sn && sn.closest('#reader')) openSheet(+sn.dataset.si, tk ? +tk.dataset.j : null);
});
// press and hold a sentence -> Vietnamese translation
document.addEventListener('pointerdown', e => { const sn = e.target.closest && e.target.closest('#reader .sn'); if (!sn) return; clearTimeout(lp.t); lp.x = e.clientX; lp.y = e.clientY; lp.t = setTimeout(() => { lp.fired = true; toggleVi(sn); }, 480); });
document.addEventListener('pointermove', e => { if (Math.abs(e.clientX - lp.x) + Math.abs(e.clientY - lp.y) > 12) clearTimeout(lp.t); });
['pointerup', 'pointercancel'].forEach(n => document.addEventListener(n, () => { clearTimeout(lp.t); setTimeout(() => { lp.fired = false; }, 350); }));
document.addEventListener('contextmenu', e => { if (e.target.closest && e.target.closest('#reader .sn')) e.preventDefault(); });
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'vq') { S.cur.q = t.value; S.cur.pg = 1; $('#vrows').innerHTML = vRows(); }
  else if (t.id === 'wr') { const L = S.lessons[S.cur.rid]; if (L) { L.text = t.value; EI.save(); } }
  else if (t.id === 'ans' && run) run.val = t.value;
});
document.addEventListener('change', e => {
  const t = e.target, st = S.settings;
  if (t.id === 'vpg') { S.cur.pg = +t.value || 1; $('#vrows').innerHTML = vRows(); }
  else if (t.id === 'vper') { S.cur.per = +t.value; S.cur.pg = 1; $('#vrows').innerHTML = vRows(); }
  else if (t.id === 'vst') { S.cur.st = t.value; S.cur.pg = 1; $('#vrows').innerHTML = vRows(); }
  else if (t.id === 'vsl') { S.cur.sl = t.value; S.cur.pg = 1; EI.save(); render(); return; }
  else if (t.dataset.scan) { EI.setKnown(t.dataset.scan, t.checked); S.scanned[S.cur.lv || 'A2'] = 1; }
  else if (t.dataset.m != null && run) { if (t.value === '') delete run.pick[+t.dataset.m]; else run.pick[+t.dataset.m] = +t.value; return; }
  else if (t.id === 'prate') { st.rate = +t.value; if (P.on) speakIdx(true); }
  else if (t.id === 'set-theme') { st.theme = t.value; applyTheme(); }
  else if (t.id === 'set-fs') { st.fs = +t.value; applyTheme(); }
  else if (t.id === 'set-cap') st.cap = +t.value;
  else if (t.id === 'set-voice') st.voice = t.value;
  else if (t.id === 'set-vsrc') { st.vsrc = t.value; EI.save(); render(); return; }
  else if (t.id === 'set-key') st.replayKey = t.value;
  else if (t.dataset.topic) st.topics[t.dataset.topic] = Math.max(0, Math.min(10, +t.value || 0));
  else return;
  EI.save();
});
document.addEventListener('keydown', e => {
  const tag = (e.target.tagName || '').toLowerCase(), typing = tag === 'input' || tag === 'textarea' || tag === 'select';
  if (e.key === 'Enter' && e.target.id === 'ans' && tag === 'input') { e.preventDefault(); if (run && run.done) A.next(); else A.check(); return; }
  if (e.key === 'Escape') { if (sh) closeSheet(); else A.closeModal(); return; }
  const L = S.cur.v === 'reading' && S.cur.rid && S.lessons[S.cur.rid];
  if (!L || L.stage !== 'read' || typing) return;
  const k = S.settings.replayKey, hit = (k === 'Alt+R' && e.altKey && e.code === 'KeyR') || (k === 'R' && !e.altKey && !e.ctrlKey && !e.metaKey && e.code === 'KeyR') || (k === 'Space' && e.code === 'Space');
  if (hit) { e.preventDefault(); speakIdx(P.on); }
});
setInterval(() => { if (document.visibilityState === 'visible' && S) { EI.log('t', 15); EI.save(); } }, 15000);

/* ================= boot ================= */
function loadScripts(files) { return files.reduce((p, f) => p.then(() => new Promise((res, rej) => { const s = document.createElement('script'); s.src = f; s.onload = res; s.onerror = () => f.startsWith('audio/') ? res() : rej(new Error('Could not load ' + f)); /* the voice list is optional */ document.head.appendChild(s); })), Promise.resolve()); }
function boot() {
  EI.index(); EI.load(); S = EI.S; EI.audio.init();
  const c = S.cur || {}; // reopen exactly where the learner left off
  if ((c.v === 'reading' && c.rid && !EI.rById(c.rid)) || (c.v === 'grammar' && c.gid && !EI.gById(c.gid)) || (c.v === 'vocab' && c.w && !EI.W[c.w]) || !c.v) S.cur = { v: 'today' };
  render();
  EI.sync.start(r => { if (r.ok && r.changed && ['today', 'progress'].includes(S.cur.v)) render(); else if (S.cur.v === 'settings') render(); },
    () => { const L = S.cur.v === 'reading' && S.cur.rid && S.lessons[S.cur.rid]; return !!(L && !L.doneDay) || !!run; });
  setTimeout(() => { if (EI.audio.ok && $('.audiolabel, .player .lab')) render(); }, 700); // voices load late in some browsers
  if (!EI.inlined && 'serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').then(() => navigator.serviceWorker.ready).then(reg => {
      const urls = ['./', 'index.html', 'css/app.css', 'js/core.js', 'js/ui.js', 'data/manifest.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', ...EI.files];
      if (reg.active) reg.active.postMessage({ cache: urls });
    }).catch(() => {});
  }
}
(EI.inlined ? Promise.resolve() : loadScripts(EI.files)).then(boot).catch(e => { $('#app').innerHTML = '<p class="boot">' + esc(e.message) + '. Reload the page while online.</p>'; });
window.EIui = { go, render, A, cur: () => run };
})();
