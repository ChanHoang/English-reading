#!/usr/bin/env node
/* Marks unmarked occurrences of a reading's own target words with {…}.
   Usage: node tools/tag-targets.js data/readings/a2-p1-01.js [--write]
   Without --write it only prints what it would change. ALWAYS read the result:
   a word must only be marked where it is used in its target sense. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..'), file = process.argv[2], write = process.argv.includes('--write');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
const run = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
run('js/core.js'); run('data/manifest.js'); ctx.EI.files.forEach(run);
const EI = ctx.EI, src = fs.readFileSync(path.join(root, file), 'utf8');
const id = (src.match(/id: '([^']+)'/) || [])[1], r = EI.rById(id);
let n = 0;
const out = src.replace(/\["((?:[^"\\]|\\.)*)", "/g, (all, en) => {
  const fixed = en.replace(/\{[^}]*\}[\p{L}']*|(\p{L}[\p{L}'’-]*)/gu, (m, word) => {
    if (!word) return m;
    const lem = EI.lemma(word);
    if (lem && r.targets.includes(lem)) { n++; console.log('  + ' + word + '  in: ' + en.slice(0, 70)); return '{' + word + '}'; }
    if (lem && EI.W[lem] && !r.targets.includes(lem)) console.log('  ? other-story word "' + word + '" (' + lem + ')  in: ' + en.slice(0, 80));
    return m;
  });
  return '["' + fixed + '", "';
});
console.log(id + ': ' + n + ' occurrence(s)' + (write ? ' marked' : ' would be marked'));
if (write && n) fs.writeFileSync(path.join(root, file), out);
