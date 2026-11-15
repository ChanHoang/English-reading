/* Publish step: join all content files from data/manifest.js into one file, data/all.<hash>.js, in the published folder.
   Usage: node tools/bundle.js <published folder>   (the folder must already contain index.html, js/, data/ …)
   The source files stay as they are; only the published copy of data/manifest.js gets one extra line, EI.bundle = '…'.
   The page then downloads one file instead of about 140 (see DECISIONS.md §28). Local use without this step still works. */
const fs = require('fs'), path = require('path'), crypto = require('crypto'), vm = require('vm');
const out = process.argv[2];
if (!out || !fs.existsSync(path.join(out, 'data/manifest.js'))) { console.error('usage: node tools/bundle.js <published folder>'); process.exit(1); }
const ctx = { EI: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(out, 'data/manifest.js'), 'utf8'), ctx);
const files = ctx.EI.files.filter(f => !f.startsWith('audio/'));
const body = files.map(f => '/* ' + f + ' */\n' + fs.readFileSync(path.join(out, f), 'utf8')).join('\n;\n') + '\n';
const hash = crypto.createHash('sha1').update(body).digest('hex').slice(0, 10), name = 'data/all.' + hash + '.js';
fs.writeFileSync(path.join(out, name), body);
fs.appendFileSync(path.join(out, 'data/manifest.js'), "\nEI.bundle = '" + name + "';   // added by tools/bundle.js when the site is published\n");
console.log('bundled', files.length, 'files into', name, Math.round(body.length / 1024) + ' KB');
