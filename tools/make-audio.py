#!/usr/bin/env python3
"""Make the recorded AI voice (Kokoro-82M, Apache-2.0) for every reading sentence, word and example.

  pip install kokoro-onnx soundfile numpy      (ffmpeg must be installed)
  python3 tools/make-audio.py                  # make what is missing or out of date
  python3 tools/make-audio.py --only a2-p1-51  # one reading (or a word: --only word:airline)
  python3 tools/make-audio.py --check          # make nothing; exit 1 if a file is missing or out of date
  python3 tools/make-audio.py --limit 20       # stop after 20 new files (for a quick test)

Output: audio/<key>.mp3 (key = EI.audioKey(text), the same function the app uses), audio/index.js (loaded by the
app: which texts have a file, and the voice), audio/manifest.json (build record: text and settings hash per file).
Voices: af_heart (h) and af_bella (b), fixed per reading and per word entry (tools/audio-items.js).
Pauses: Kokoro has no SSML, so each sentence is cut at , ; : — and the pieces are joined with silence.
"""
import argparse, hashlib, io, json, os, re, subprocess, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, 'audio')
MODEL_DIR = os.path.join(ROOT, 'tools', '.kokoro')
MODEL_URL = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/'
FILES = ['kokoro-v1.0.onnx', 'voices-v1.0.bin']
VOICES = {'h': 'af_heart', 'b': 'af_bella'}
SPEED = 1.0
PAUSE_COMMA = 0.45     # after ,
PAUSE_MID = 0.55       # after ; : —
PAUSE_STOP = 0.90      # after . ? ! (also at the end of a sentence)
PAUSE_WORD = 0.25      # after a single word or a phrase without end punctuation
LEAD = 0.05            # silence before the first sound
BITRATE = '48k'
CFG = f'v1.1|{SPEED}|{PAUSE_COMMA}|{PAUSE_MID}|{PAUSE_STOP}|{PAUSE_WORD}|{LEAD}|{BITRATE}'
ABBR = r'(?:St|Dr|Mr|Mrs|Ms|Jr|Sr|vs|etc|e\.g|i\.e|a\.m|p\.m|U\.S|[A-Z])\.'

def spoken(text, rules):
    s = text
    for pat, rep in rules:
        s = re.sub(pat, rep, s)
    s = re.sub(r'<spell>(.*?)</spell>', lambda m: ' '.join(m.group(1)), s)
    return re.sub(r'\s+', ' ', s).strip()

def pieces(s, original=None):
    """Cut a spoken sentence into (text, pause after) pieces. No cut inside numbers (3,000; 6.5) or after abbreviations."""
    out, buf = [], ''
    i = 0
    while i < len(s):
        ch = s[i]
        buf += ch
        nxt = s[i + 1] if i + 1 < len(s) else ''
        pause = None
        if ch == ',' and not (nxt.isdigit() and buf[-2:-1].isdigit()):
            pause = PAUSE_COMMA
        elif ch in ';:—':
            pause = PAUSE_MID
        elif ch in '.?!' and not nxt.isdigit():
            if not (ch == '.' and re.search(ABBR + r'$', buf)):
                pause = PAUSE_STOP
        if pause is not None:
            while i + 1 < len(s) and s[i + 1] in '”"’)':   # keep closing quotes with the piece
                i += 1; buf += s[i]
            if i + 1 >= len(s) or s[i + 1] == ' ':
                if buf.strip(' —'):
                    out.append((buf.strip(' —'), pause))
                buf = ''
        i += 1
    if buf.strip(' —'):
        out.append((buf.strip(' —'), PAUSE_WORD))
    if out and re.search(r'[.?!]["”’)]*$', original or s):   # e.g. "8 p.m." became "8 P M": still a full stop
        out[-1] = (out[-1][0], PAUSE_STOP)
    return out

def trim(a, sr, thr=0.008, keep=0.03):
    import numpy as np
    idx = np.where(np.abs(a) > thr)[0]
    if not len(idx):
        return a[:0]
    k = int(keep * sr)
    return a[max(0, idx[0] - k): idx[-1] + k]

def ensure_model():
    os.makedirs(MODEL_DIR, exist_ok=True)
    for f in FILES:
        p = os.path.join(MODEL_DIR, f)
        if not os.path.exists(p):
            print('downloading', f, '…', flush=True)
            urllib.request.urlretrieve(MODEL_URL + f, p + '.part'); os.replace(p + '.part', p)
    from kokoro_onnx import Kokoro
    return Kokoro(os.path.join(MODEL_DIR, FILES[0]), os.path.join(MODEL_DIR, FILES[1]))

def render(k, text, voice, original=None):
    import numpy as np
    parts, sr = [], 24000
    for t, pause in pieces(text, original):
        a, sr = k.create(t, voice=VOICES[voice], speed=SPEED, lang='en-us')
        a = trim(np.asarray(a, dtype=np.float32), sr)
        parts += [a, np.zeros(int(pause * sr), dtype=np.float32)]
    return np.concatenate([np.zeros(int(LEAD * sr), dtype=np.float32)] + parts), sr

def to_mp3(a, sr, path):
    import soundfile as sf
    buf = io.BytesIO(); sf.write(buf, a, sr, format='WAV', subtype='PCM_16')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'wav', '-i', 'pipe:0', '-ac', '1', '-ar', str(sr), '-b:a', BITRATE, path + '.part.mp3'], input=buf.getvalue(), check=True)
    os.replace(path + '.part.mp3', path)

def mp3_len(path):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True, check=True)
    return round(float(r.stdout.strip()), 2)

def write_index(man, shard=None):
    if shard is not None:   # parallel run: each process keeps its own part; a normal run merges them
        with open(os.path.join(AUDIO, f'manifest.part{shard}.json'), 'w') as f:
            json.dump(man, f, ensure_ascii=False)
        return
    for k, v in man.items():   # length in seconds, for the player's time bar (older records had none)
        if 'd' not in v and os.path.exists(os.path.join(AUDIO, k + '.mp3')):
            v['d'] = mp3_len(os.path.join(AUDIO, k + '.mp3'))
    idx = {k: v['v'] + ':' + v['h'][:4] + (':' + str(round(v['d'] * 10)) if 'd' in v else '') for k, v in sorted(man.items())}
    with open(os.path.join(AUDIO, 'index.js'), 'w') as f:
        f.write('// Made by tools/make-audio.py: texts with a recorded AI voice (Kokoro-82M). key = EI.audioKey(text); value = voice (h = af_heart, b = af_bella), version, length in tenths of a second, joined by colons.\n')
        f.write('EI.audioIndex = ' + json.dumps(idx, separators=(',', ':')) + ';\n')
    with open(os.path.join(AUDIO, 'manifest.json'), 'w') as f:
        json.dump(man, f, ensure_ascii=False, indent=0, sort_keys=True)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--only'); ap.add_argument('--check', action='store_true'); ap.add_argument('--limit', type=int, default=0); ap.add_argument('--index-only', action='store_true', help='only rebuild audio/index.js from what exists (keeps part files)'); ap.add_argument('--shard', help='k/n: make every n-th file, for running n processes at once')
    o = ap.parse_args()
    items = json.loads(subprocess.run(['node', os.path.join(ROOT, 'tools', 'audio-items.js')], capture_output=True, check=True, text=True).stdout)
    rules = json.load(open(os.path.join(ROOT, 'tools', 'audio-lexicon.json')))['rules']
    os.makedirs(AUDIO, exist_ok=True)
    mp = os.path.join(AUDIO, 'manifest.json')
    man = json.load(open(mp)) if os.path.exists(mp) else {}
    parts = [f for f in os.listdir(AUDIO) if f.startswith('manifest.part')]
    for f in parts:
        man.update(json.load(open(os.path.join(AUDIO, f))))
    want = {}
    for it in items:
        sp = spoken(it['text'], rules)
        want[it['key']] = dict(v=it['voice'], t=it['text'], s=sp, src=it['src'], h=hashlib.sha1((sp + '|' + it['voice'] + '|' + CFG).encode()).hexdigest()[:10])
    todo = [k for k, w in want.items() if man.get(k, {}).get('h') != w['h'] or not os.path.exists(os.path.join(AUDIO, k + '.mp3'))]
    stale = [k for k in man if k not in want]
    if o.only:
        todo = [k for k in todo if want[k]['src'].startswith(o.only.replace('word:', 'word ')) or (o.only.startswith('word:') and want[k]['src'] == 'example ' + o.only[5:])]
    print(f'{len(want)} texts · {len(todo)} to make · {len(stale)} no longer used', flush=True)
    if o.index_only:
        man = {k: v for k, v in man.items() if os.path.exists(os.path.join(AUDIO, k + '.mp3'))}
        write_index(man); print(f'index: {len(man)} files'); return
    if o.check:
        sys.exit(1 if todo or stale else 0)
    if not o.only and not o.shard:
        for k in stale:
            try: os.remove(os.path.join(AUDIO, k + '.mp3'))
            except FileNotFoundError: pass
            man.pop(k)
    shard = None
    if o.shard:
        i, n = map(int, o.shard.split('/')); shard = i; todo = todo[i::n]
        man = {}   # this process records only its own files
    if o.limit:
        todo = todo[:o.limit]
    k = ensure_model() if todo else None
    t0 = time.time()
    for n, key in enumerate(todo, 1):
        w = want[key]
        a, sr = render(k, w['s'], w['v'], w['t'])
        to_mp3(a, sr, os.path.join(AUDIO, key + '.mp3'))
        man[key] = {'v': w['v'], 'h': w['h'], 't': w['t'], 'd': round(len(a) / sr, 2)} | ({'s': w['s']} if w['s'] != w['t'] else {})
        if n % 25 == 0 or n == len(todo):
            write_index(man, shard)
            el = time.time() - t0
            print(f'{n}/{len(todo)}  {el/60:.1f} min  ~{el/n*(len(todo)-n)/60:.0f} min left', flush=True)
    write_index(man, shard)
    if shard is not None:
        print('part done'); return
    for f in parts:
        os.remove(os.path.join(AUDIO, f))
    size = sum(os.path.getsize(os.path.join(AUDIO, f)) for f in os.listdir(AUDIO) if f.endswith('.mp3'))
    vc = {v: sum(1 for m in man.values() if m['v'] == v) for v in VOICES}
    print(f'done: {len(man)} files, {size/1e6:.1f} MB, voices {vc}')

if __name__ == '__main__':
    main()
