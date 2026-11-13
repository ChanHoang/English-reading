#!/usr/bin/env node
/* Builds ONE html file with everything inside (no service worker, so no offline install).
   Usage: node tools/build-single-file.js            -> dist/english-improve-single.html
          node tools/build-single-file.js --fragment -> dist/english-improve-fragment.html (no <html>/<head>/<body>, for page hosts that add their own) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..'), rd = f => fs.readFileSync(path.join(root, f), 'utf8'), frag = process.argv.includes('--fragment');
const ctx = { EI: {} }; vm.createContext(ctx); vm.runInContext(rd('data/manifest.js'), ctx);
const js = [rd('js/core.js'), 'EI.inlined = true;', rd('data/manifest.js'), ...ctx.EI.files.filter(f => !f.startsWith('audio/')).map(rd), rd('js/ui.js')].join('\n;\n');
if (/<\/script/i.test(js)) throw new Error('a data file contains </script>');
const head = '<title>English Improve</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Literata:opsz,wght@7..72,400;7..72,600&display=swap">\n<style>\n' + rd('css/app.css') + '\n</style>';
const body = '<div id="app"><p class="boot">Loading English Improve…</p></div>\n<div id="sheet" hidden></div>\n<div id="modal" hidden></div>\n<script>\n' + js + '\n</script>';
const out = frag ? head + '\n' + body : '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' + head + '\n</head>\n<body>\n' + body + '\n</body>\n</html>';
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
const f = path.join(root, 'dist', frag ? 'english-improve-fragment.html' : 'english-improve-single.html');
fs.writeFileSync(f, out); console.log(f, (out.length / 1024).toFixed(0) + ' KB');
