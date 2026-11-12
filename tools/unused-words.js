#!/usr/bin/env node
/* Lists reference words of a level that are not yet in the word list (candidates for new targets).
   Usage: node tools/unused-words.js [A2] [--content]   (--content hides pronouns, prepositions, modals…) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const level = (process.argv.find(a => /^[ABC][12]$/.test(a)) || 'A2');
const contentOnly = process.argv.includes('--content');
const ctx = { window: {}, console }; ctx.window = ctx; vm.createContext(ctx);
const run = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
run('js/core.js'); run('data/manifest.js'); const EI = ctx.EI; EI.files.forEach(run); EI.index();
const REF = JSON.parse(fs.readFileSync(path.join(root, 'tools/cefr-reference.json'), 'utf8'));
const FN = new Set(['pronoun', 'determiner', 'modal verb', 'auxiliary verb', 'conjunction', 'preposition', 'exclamation', 'number', 'indefinite article']);
let total = 0; const out = [];
for (const [w, o] of Object.entries(REF)) {
  const pos = Object.entries(o).filter(([, l]) => l === level).map(([p]) => p);
  if (!pos.length) continue; total++;
  if (EI.W[w]) continue;
  if (contentOnly && pos.every(p => FN.has(p))) continue;
  out.push(w + ' (' + pos.join(', ') + ')');
}
console.log(`${level}: ${total} reference entries, ${total - out.length} covered or filtered, ${out.length} listed`);
console.log(out.join('\n'));
