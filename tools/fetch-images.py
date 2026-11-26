#!/usr/bin/env python3
"""Pictures for readings, from Wikimedia Commons. Runs on GitHub Actions (.github/workflows/images.yml).

Each reading may have  image: { q: 'search words' }  or  image: { file: 'Commons file name.jpg', cap: '…', alt: '…' }.

  q only  -> a review sheet: tools/img-review/<id>.jpg (numbered thumbnails) and <id>.json (file names, licences).
             Only freely licensed files are listed: public domain, CC0, CC BY, CC BY-SA. NC and ND licences are skipped.
  file    -> img/<id>.webp (at most 960 px wide) and an entry in img/index.js with the author and licence that
             Commons reports for the file, so the app can credit it. The review sheet of that reading is removed.

  python3 tools/fetch-images.py           do what is missing
  python3 tools/fetch-images.py --check   exit 1 if anything is missing (nothing is downloaded)
Needs Pillow. The shell of a Claude session cannot reach Commons, so this only runs on GitHub.
"""
import hashlib, html, io, json, os, re, subprocess, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG, REV = os.path.join(ROOT, 'img'), os.path.join(ROOT, 'tools', 'img-review')
INDEX = os.path.join(IMG, 'index.js')
API = 'https://commons.wikimedia.org/w/api.php'
UA = 'EnglishImproveBot/1.0 (https://github.com/ChanHoang/English-reading; static learning site)'
WIDTH = 960


def items():
    return json.loads(subprocess.check_output(['node', os.path.join(ROOT, 'tools', 'image-items.js')]))


def read_index():
    try:
        s = open(INDEX, encoding='utf8').read()
        return json.loads(s[s.index('{'):s.rindex('}') + 1])
    except (OSError, ValueError):
        return {}


def write_index(ix):
    os.makedirs(IMG, exist_ok=True)
    body = json.dumps(dict(sorted(ix.items())), ensure_ascii=False, indent=0)
    open(INDEX, 'w', encoding='utf8').write('/* Pictures for readings, made by tools/fetch-images.py from Wikimedia Commons. Do not edit by hand. */\nEI.imgIndex = ' + body + ';\n')


def get(url, tries=4):
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=60) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001 - retry any network error, then give up
            if i == tries - 1:
                raise
            print('  retry', url[:90], e)
            time.sleep(3 * (i + 1))


def api(**p):
    p.update(format='json', formatversion='2')
    return json.loads(get(API + '?' + urllib.parse.urlencode(p)))


def text(v):
    v = re.sub(r'<[^>]+>', '', html.unescape(v or ''))
    return re.sub(r'\s+', ' ', v).strip()


def meta(page):
    ii = (page.get('imageinfo') or [{}])[0]
    em = ii.get('extmetadata') or {}
    g = lambda k: text((em.get(k) or {}).get('value', ''))
    return {'title': page.get('title', '')[5:], 'thumb': ii.get('thumburl'), 'w': ii.get('thumbwidth'), 'h': ii.get('thumbheight'),
            'by': g('Artist')[:160], 'lic': g('LicenseShortName'), 'lu': g('LicenseUrl'), 'desc': g('ImageDescription')[:300],
            'date': g('DateTimeOriginal')[:40], 'src': ii.get('descriptionurl', '')}


def free(lic):
    l = lic.lower()
    if re.search(r'\b(nc|nd)\b|non-?commercial|no ?deriv|fair use', l):
        return False
    return bool(re.search(r'public domain|^pd\b|cc0|cc[ -]by|no restrictions|attribution', l))


def review(it):
    from PIL import Image, ImageDraw, ImageFont
    r = api(action='query', generator='search', gsrsearch=it['q'] + ' filetype:bitmap', gsrnamespace=6, gsrlimit=it['n'] * 3,
            prop='imageinfo', iiprop='url|extmetadata|size|mime', iiurlwidth=320)
    pages = sorted((r.get('query') or {}).get('pages', []), key=lambda p: p.get('index', 0))
    cands = [m for m in map(meta, pages) if m['thumb'] and free(m['lic'])][:it['n']]
    os.makedirs(REV, exist_ok=True)
    T, cols = 320, 4
    rows = max(1, (len(cands) + cols - 1) // cols)
    sheet = Image.new('RGB', (cols * T, rows * T), 'white')
    d = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.load_default(size=30)
    except TypeError:
        font = ImageFont.load_default()
    for i, m in enumerate(cands):
        try:
            im = Image.open(io.BytesIO(get(m['thumb']))).convert('RGB')
        except Exception as e:  # noqa: BLE001
            print('  skip', m['title'], e)
            continue
        im.thumbnail((T - 8, T - 8))
        x, y = (i % cols) * T, (i // cols) * T
        sheet.paste(im, (x + (T - im.width) // 2, y + (T - im.height) // 2))
        d.rectangle([x, y, x + 46, y + 38], fill='black')
        d.text((x + 6, y + 2), str(i + 1), fill='yellow', font=font)
        time.sleep(0.3)
    sheet.save(os.path.join(REV, it['id'] + '.jpg'), quality=80)
    out = {'q': it['q'], 'cands': [{'n': i + 1, **{k: m[k] for k in ('title', 'by', 'lic', 'date', 'desc', 'src')}} for i, m in enumerate(cands)]}
    json.dump(out, open(os.path.join(REV, it['id'] + '.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    print('review', it['id'], len(cands), 'candidates')


def fetch(it, ix):
    from PIL import Image
    r = api(action='query', titles='File:' + it['file'], prop='imageinfo', iiprop='url|extmetadata|size|mime', iiurlwidth=WIDTH)
    page = r['query']['pages'][0]
    if page.get('missing') or not page.get('imageinfo'):
        print('MISSING on Commons:', it['id'], it['file'])
        return False
    m = meta(page)
    if not free(m['lic']):
        print('NOT FREE, skipped:', it['id'], it['file'], m['lic'])
        return False
    im = Image.open(io.BytesIO(get(m['thumb']))).convert('RGB')
    if im.width > WIDTH:
        im = im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=72, method=6)
    data = buf.getvalue()
    os.makedirs(IMG, exist_ok=True)
    open(os.path.join(IMG, it['id'] + '.webp'), 'wb').write(data)
    ix[it['id']] = {'f': it['id'] + '.webp', 'v': hashlib.sha1(data).hexdigest()[:8], 'w': im.width, 'h': im.height,
                    't': m['title'], 'by': m['by'], 'lic': m['lic'], 'lu': m['lu'], 'src': m['src']}
    for ext in ('.jpg', '.json'):
        p = os.path.join(REV, it['id'] + ext)
        if os.path.exists(p):
            os.remove(p)
    print('image', it['id'], m['title'], m['lic'], len(data) // 1024, 'KB')
    return True


def plan():
    its, ix = items(), read_index()
    want = {it['id'] for it in its if it['file']}
    todo_fetch = [it for it in its if it['file'] and (ix.get(it['id'], {}).get('t', '').replace('_', ' ') != it['file'].replace('_', ' ')
                                                       or not os.path.exists(os.path.join(IMG, it['id'] + '.webp')))]
    todo_rev = []
    for it in its:
        if it['file'] or not it['q']:
            continue
        try:
            if json.load(open(os.path.join(REV, it['id'] + '.json'), encoding='utf8')).get('q') == it['q']:
                continue
        except (OSError, ValueError):
            pass
        todo_rev.append(it)
    stale = [k for k in ix if k not in want]
    return its, ix, todo_fetch, todo_rev, stale


def main():
    its, ix, todo_fetch, todo_rev, stale = plan()
    if '--check' in sys.argv:
        for it in todo_fetch:
            print('to fetch:', it['id'], it['file'])
        for it in todo_rev:
            print('to review:', it['id'], it['q'])
        for k in stale:
            print('stale:', k)
        sys.exit(1 if (todo_fetch or todo_rev or stale) else 0)
    for k in stale:
        p = os.path.join(IMG, ix[k]['f'])
        if os.path.exists(p):
            os.remove(p)
        del ix[k]
        print('removed', k)
    for it in todo_fetch:
        try:
            fetch(it, ix)
        except Exception as e:  # noqa: BLE001 - one bad file must not stop the others
            print('FAILED', it['id'], it['file'], e)
        time.sleep(1)
    write_index(ix)
    for it in todo_rev:
        try:
            review(it)
        except Exception as e:  # noqa: BLE001
            print('FAILED review', it['id'], e)
        time.sleep(1)


if __name__ == '__main__':
    main()
