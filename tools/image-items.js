#!/usr/bin/env node
// Lists the picture asked for by each reading (field `image` in the reading).
// Output (stdout): JSON [{ id, file, q, n }].
//   file: the chosen Wikimedia Commons file name (without "File:"), downloaded by tools/fetch-images.py.
//   q:    a search for candidates, used before a file is chosen (tools/fetch-images.py makes a review sheet).
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..'), ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
const run = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
run('js/core.js'); run('data/manifest.js'); ctx.EI.files.filter(f => !f.startsWith('audio/') && !f.startsWith('img/')).forEach(run);
const out = ctx.EI.R.filter(r => r.image).map(r => ({ id: r.id, file: r.image.file || '', q: r.image.q || '', n: r.image.n || 12 }));
process.stdout.write(JSON.stringify(out));
