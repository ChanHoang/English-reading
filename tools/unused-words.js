#!/usr/bin/env node
/* Lists reference entries of a level whose part of speech at that level is not yet taught (candidates for new targets).
   Usage: node tools/unused-words.js [A2] [--content] [--pos]   (--content hides pronouns, prepositions, modals…) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const level = (process.argv.find(a => /^[ABC][12]$/.test(a)) || 'A2');
const contentOnly = process.argv.includes('--content');
const ctx = { window: {}, console }; ctx.window = ctx; vm.createContext(ctx);
const run = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
run('js/core.js'); run('data/manifest.js'); const EI = ctx.EI; EI.files.forEach(run); EI.index();
const REF = JSON.parse(fs.readFileSync(path.join(root, 'tools/cefr-reference.json'), 'utf8'));
const FN = new Set(['pronoun', 'determiner', 'modal verb', 'auxiliary verb', 'conjunction', 'preposition', 'exclamation', 'number', 'indefinite article']);
// US spellings used in the app for words the reference list has in British spelling
const UK = { analyze: 'analyse', center: 'centre', colored: 'coloured', favor: 'favour', neighborhood: 'neighbourhood', tire: 'tyre' };
// A reference word counts as taught when the word list has an entry of this level for it (“award~v” is a B1 entry for “award”).
// --pos also lists words whose other parts of speech at this level have no entry yet (e.g. damage (v) when only damage (n) is taught).
const byPos = process.argv.includes('--pos'), norm = p => ({ prep: 'preposition', conj: 'conjunction' }[p] || p);
const taught = {};
for (const e of Object.values(EI.W)) if (e.level === level) { const h = UK[e.hw] || e.hw; (taught[h] = taught[h] || new Set()); e.pos.split(',').forEach(p => taught[h].add(norm(p.trim()))); }
let total = 0, done = 0, hidden = 0; const out = [];
for (const [w, o] of Object.entries(REF)) {
  const pos = Object.entries(o).filter(([, l]) => l === level).map(([p]) => p);
  if (!pos.length) continue; total++;
  const miss = !taught[w] ? pos : byPos ? pos.filter(p => !taught[w].has(p)) : [];
  if (!miss.length) { done++; continue; }
  if (contentOnly && miss.every(p => FN.has(p))) { hidden++; continue; }
  out.push(w + ' (' + miss.join(', ') + ')' + (taught[w] ? ' — word taught, this part of speech not yet' : ''));
}
console.log(`${level}: ${total} reference entries, ${done} taught at ${level}${byPos ? ' (every part of speech)' : ''}, ${out.length} listed` + (contentOnly ? `, ${hidden} function-word entries hidden` : ''));
console.log(out.join('\n'));
