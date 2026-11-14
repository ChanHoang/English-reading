#!/usr/bin/env node
// Lists every text that gets a recorded AI voice: each reading sentence, each word and its example.
// Output (stdout): JSON [{ text, voice: 'h'|'b', src }]. The text is exactly what the app passes to EI.audio.say().
// Voice: af_heart (h) for every new text (owner's decision 2026-11-14). Texts already recorded keep the voice they have
// (audio/manifest.json): the first 4,049 files were split Heart/Bella per reading and per word entry.
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..'), ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
const run = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
run('js/core.js'); run('data/manifest.js'); ctx.EI.files.filter(f => !f.startsWith('audio/')).forEach(run); ctx.EI.index();
const made = (() => { try { return JSON.parse(fs.readFileSync(path.join(root, 'audio', 'manifest.json'), 'utf8')); } catch (e) { return {}; } })();
const voiceOf = () => 'h';
const out = [], seen = new Set();
const add = (text, voice, src) => { text = String(text || '').trim(); if (!text || seen.has(text)) return; seen.add(text); const key = ctx.EI.audioKey(text); out.push({ key, text, voice: (made[key] && made[key].v) || voice, src }); };
ctx.EI.R.forEach(r => { const v = voiceOf('r:' + r.id); r.S.forEach(o => add(o.plain, v, r.id + ' ' + o.p + '-' + o.s)); });
Object.values(ctx.EI.W).forEach(e => { const v = voiceOf('w:' + e.w); add(e.w, v, 'word ' + e.w); add(e.exPlain, v, 'example ' + e.w); });
process.stdout.write(JSON.stringify(out));
