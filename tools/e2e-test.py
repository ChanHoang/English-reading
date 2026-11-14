#!/usr/bin/env python3
"""English Improve — end-to-end self test (Playwright + Chromium).
Run:  python3 -m http.server 8765 --directory .   (in another terminal, from the project folder)
      python3 tools/e2e-test.py [http://localhost:8765/] [folder-for-screenshots]
Walks the acceptance list and prints PASS/FAIL per check."""
import sys, re, datetime
from playwright.sync_api import sync_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8765/'
SHOTS = sys.argv[2] if len(sys.argv) > 2 else None
res = []
def ok(name, cond, extra=''):
    res.append(bool(cond)); print(('PASS  ' if cond else 'FAIL  ') + name + (('  — ' + str(extra)) if extra and not cond else ''))
def cur(p): return p.evaluate("""() => { const r = EIui.cur(); return r ? {sig: r.sig || '', t: r.it.t, a: r.it.a, o: r.it.o ? r.it.o.length : 0, wrong: r.it.wrong, q: r.it.q || '', n: r.words ? r.words.length : 0,
    pairs: r.it.pairs ? r.it.pairs.length : 0, k: r.it.k || '', fu: !!r.it.fu, sec: EI.sec(r.it), cz: r.it.chunk ? r.it.chunk.blanks.map(b => b.lem) : null, bank: r.bank || null} : null }""")
def answer(p, right=True):
    it = cur(p); t = it['t']; Q = '.qcard[data-q="' + it['sig'] + '"] '
    if t == 'mc':
        p.click(Q + f'.opt[data-i="{it["a"] if right else (it["a"] + 1) % it["o"]}"]')
    elif t == 'gap':
        a = it['a'][0] if isinstance(it['a'], list) else it['a']
        p.fill(Q + '[data-ans]', a if right else 'zzzz'); p.click(Q + '[data-a=check]')
    elif t == 'dict':
        p.fill(Q + '[data-ans]', it['a'] if right else 'completely different words here now'); p.click(Q + '[data-a=check]')
    elif t == 'order':
        for k in (range(it['n']) if right else reversed(range(it['n']))): p.click(Q + f'[data-a=sel][data-i="{k}"]')
        p.click(Q + '[data-a=check]')
    elif t == 'error':
        words = it['q'].split(' '); norm = lambda s: re.sub(r"[^a-z0-9' ]", '', s.lower())
        idx = [i for i, w in enumerate(words) if norm(w) == norm(it['wrong'])]
        p.click(Q + f'.etok[data-i="{idx[-1] if right else (idx[-1] + 1) % len(words)}"]')
    elif t == 'match':
        for i in range(it['pairs']): p.select_option(Q + f'select[data-m="{i}"]', str(i if right else (i + 1) % it['pairs']))
        p.click(Q + '[data-a=check]')
    elif t == 'cloze':
        picks = list(it['cz'])
        if not right: picks[0] = [w for w in it['bank'] if w not in it['cz']][0]     # one wrong gap
        for w in picks: p.click(Q + f'[data-a=czPick][data-w="{w}"]')
        p.click(Q + '[data-a=check]')
    elif t == 'write':
        p.fill(Q + '[data-ans]', 'This is my own sentence.'); p.click(Q + '[data-a=showModel]'); p.click(Q + ('[data-a=self][data-r="ok"]' if right else '[data-a=self]:not([data-r="ok"])'))
    return it
def nxt(p):   # single-question views have Continue; story practice shows a whole part and a Next part button when it is done
    if p.locator('[data-a=next]').count(): p.click('[data-a=next]')
    elif p.locator('[data-a=nextPart]').count(): p.click('[data-a=nextPart]')
def state(p): return p.evaluate("() => JSON.parse(localStorage.getItem('ei.v1'))")
def shot(p, name):
    if SHOTS: p.screenshot(path=f'{SHOTS}/{name}.png')
def finish_test(p, right=True):
    seen = []
    while p.locator('.qcard').count() and not p.locator('#wr').count() and len(seen) < 80:
        it = cur(p)
        if it is None:
            if p.locator('[data-a=nextPart]').count(): nxt(p); continue
            break
        seen.append(it); answer(p, right); nxt(p)
    return seen

with sync_playwright() as pw:
    b = pw.chromium.launch()
    T0 = datetime.datetime(2026, 11, 12, 20, 0, 0)
    ctx = b.new_context(viewport={'width': 1280, 'height': 860}); p = ctx.new_page()
    errs = []; p.on('console', lambda m: errs.append(m.text) if m.type == 'error' and 'Failed to load resource' not in m.text else None)  # web-font fetch may be blocked offline
    p.on('pageerror', lambda e: errs.append(str(e)))
    p.clock.install(time=T0); p.goto(URL); p.wait_for_selector('.shell')
    # ---- Today: Start goes straight into a story
    ok('Today shows the story of the day, without a time estimate', 'min' not in p.inner_text('.card h2') and p.locator('[data-a=start]').count() == 1)
    shot(p, '01-today-desktop')
    p.click('[data-a=start]'); p.wait_for_selector('[data-a=guess]')
    rid = p.evaluate("() => EI.S.cur.rid"); R = p.evaluate("id => { const r = EI.rById(id); return {targets: r.targets, n: EI.practiceQueue(r).length} }", rid)
    ok('Start opens a reading lesson directly (prediction question, not graded)', p.evaluate("() => EI.S.cur.v") == 'reading' and p.locator('[data-a=guess]').count() >= 2)
    p.click('[data-a=guess] >> nth=0'); p.wait_for_selector('.lw')
    ok('Learn words lists every target word', p.locator('.lw').count() == len(R['targets']), p.locator('.lw').count())
    ok('Vietnamese meaning is hidden until asked', p.locator('.lw .vibox').count() == 0)
    top = lambda: p.evaluate("() => document.querySelector('#main').scrollTop")
    p.locator('.lw [data-a=lVi] >> nth=-1').scroll_into_view_if_needed(); y0 = top()
    p.click('.lw [data-a=lVi] >> nth=-1'); ok('Show Vietnamese meaning works', p.locator('.lw .vibox').count() == 1)
    ok('Showing a meaning does not jump back to the top', y0 > 0 and abs(top() - y0) < 5, (y0, top()))
    p.click('.lw [data-a=lViHide]'); ok('Hide meaning button closes it again', p.locator('.lw .vibox').count() == 0)
    p.locator('.lw [data-a=lKnown] >> nth=3').scroll_into_view_if_needed(); y1 = top(); p.click('.lw [data-a=lKnown] >> nth=3')
    ok('Known keeps the scroll position', abs(top() - y1) < 5, (y1, top())); p.click('.lw.known [data-a=lKnown]')
    p.click('.stages [data-s=read]'); p.wait_for_selector('#reader')
    ok('Reader shows target words highlighted', p.locator('#reader.hl .tk.tg').count() >= len(R['targets']))
    ok('Compact player is present with an audio source label', p.locator('.player').count() == 1 and 'voice' in p.inner_text('.player .lab').lower())
    ok('Player shows a time bar: time heard / total, and can be moved', p.locator('#pseek').count() == 1 and re.match(r'^0:00 / ~?\d+:\d\d$', p.inner_text('#ptime')) and float(p.get_attribute('#pseek', 'max')) > 30, p.inner_text('#ptime'))
    p.evaluate("() => { const b = document.querySelector('#pseek'); b.value = b.max / 2; b.dispatchEvent(new Event('change', {bubbles: true})); }")
    ok('Moving the time bar goes to the sentence at that time', p.evaluate("() => document.querySelector('.sn.now') && +document.querySelector('.sn.now').dataset.si > 3"))
    ok('Version is shown next to Info', p.locator('.rail .ver').inner_text().startswith('v0.'))
    p.click('#reader .tk.tg >> nth=0'); p.wait_for_selector('.sheet')
    ok('Tapping a word opens meaning, IPA and a listen button', p.locator('.sheet .def').count() == 1 and p.locator('.sheet .ipa').count() == 1 and p.locator('.sheet [data-a=say]').count() == 1)
    p.click('[data-a=shSave]'); ok('Sentence saved to My sentences', len([s for s in state(p)['sentences'] if s['kind'] == 'saved']) == 1)
    p.click('[data-a=shVi]'); ok('Sentence translation shows in the sheet', p.locator('.sheet .viline').count() == 1)
    p.click('[data-a=closeSheet]')
    box = p.locator('#reader .sn >> nth=2').bounding_box(); p.mouse.move(box['x'] + 5, box['y'] + 5); p.mouse.down(); p.clock.run_for(600); p.mouse.up()
    ok('Press and hold a sentence shows its Vietnamese translation', p.locator('#reader .viline').count() == 1)
    p.clock.run_for(500)
    p.click('[data-a=tGr]'); ok('Grammar highlight toggles', p.locator('#reader.gr .tk.g').count() > 0)
    p.click('[data-a=tFocus]'); ok('Focus mode hides the menus', p.locator('.shell.focus').count() == 1); p.click('[data-a=tFocus]')
    # ---- step pills: go forward and back
    p.click('.stages [data-s=gram]'); p.wait_for_selector('.formula')
    ok('Grammar in this story: explains the story’s structures with its own sentences', p.locator('.card .formula').count() >= 2 and p.locator('.card .exl li b').count() >= 2 and p.locator('.stages .on').inner_text() == 'Grammar')
    shot(p, '02-grammar-in-story')
    p.click('.stages [data-s=learn]'); back1 = p.locator('.lw').count() > 0
    p.click('.stages [data-s=read]'); back2 = p.locator('#reader').count() == 1
    p.click('.stages [data-s=practice]'); p.wait_for_selector('.qcard')
    ok('Step buttons move back and forward between Learn words, Read, Grammar and Practice', back1 and back2 and p.locator('.stages .on').inner_text() == 'Practice')
    # ---- practice: scored test in three parts
    nq = p.locator('.qcard').count()
    ok('Practice shows a whole part at once (several questions), with the parts listed', nq >= 3 and p.locator('.parts .chip').count() >= 2 and 'Understanding the story' in p.inner_text('.parts'), nq)
    p.locator('.qcard >> nth=0').scroll_into_view_if_needed(); p.locator('.qcard >> nth=-1').scroll_into_view_if_needed(); p.locator('.qcard >> nth=0').scroll_into_view_if_needed(); y0 = p.evaluate("() => document.querySelector('#main').scrollTop")
    first = answer(p, right=False); y1 = p.evaluate("() => document.querySelector('#main').scrollTop")
    ok('A wrong answer shows the explanation', p.locator('.fb.bad').count() == 1)
    ok('Answering a question keeps the page where it was', abs(y1 - y0) < 5, (y0, y1))
    shot(p, '03-practice-feedback'); nxt(p); second = answer(p); nxt(p)
    pi = state(p)['lessons'][rid]['pi']; sig_q = cur(p)['q']
    p.close(); p = ctx.new_page(); p.on('pageerror', lambda e: errs.append(str(e))); p.clock.install(time=T0); p.goto(URL); p.wait_for_selector('.qcard')
    ok('After closing and reopening: same lesson, same step', state(p)['lessons'][rid]['pi'] == pi and cur(p)['q'] == sig_q and p.evaluate("() => EI.S.cur.rid") == rid)
    seen = [first, second]
    while cur(p)['t'] != 'cloze': seen.append(answer(p)); nxt(p)
    shot(p, '04-story-with-gaps')
    n0 = len(state(p)['lessons'][rid]['q']); cz = answer(p, right=False); shot(p, '05-gaps-feedback'); seen.append(cz)
    Ls = state(p)['lessons'][rid]
    ok('Story with gaps: a wrong word adds one unscored extra item for that word, in the same part', len(Ls['q']) == n0 + 1 and any(x.startswith('Fw:') for x in Ls['q'][Ls['pi']:]) and p.locator('.eyebrow.fu').count() == 1)
    nxt(p); seen += finish_test(p)
    secs = [x['sec'] for x in seen if not x['fu']]
    ok('Practice has three parts in order: understanding, vocabulary, grammar', ''.join(sorted(set(secs), key=secs.index)) == 'cwg' and secs == sorted(secs, key='cwg'.index), secs)
    ok('Practice mixes several item types', len({x['t'] for x in seen}) >= 5, {x['t'] for x in seen})
    tested = {w for x in seen if x['cz'] for w in x['cz']}
    ok('Every target word of the story is tested inside the story text', tested == set(R['targets']), set(R['targets']) - tested)
    p.wait_for_selector('#scorecard'); s = state(p); sc = s['scores'][rid]; L = s['lessons'][rid]
    got = sum(L['sc'][k][0] for k in 'cwg'); of = sum(L['sc'][k][1] for k in 'cwg')
    ok('Score is computed and shown after the practice', sc['last'] == round(got / of * 100) and 80 <= sc['last'] < 100 and f"{sc['last']}%" in p.inner_text('#scorecard'), sc)
    ok('Follow-up items are not scored', of == sum(1 if not x['cz'] else len(x['cz']) for x in seen if not x['fu']), (of, len(seen)))
    shot(p, '06-score')
    p.fill('#wr', 'He hid the stakes in the river.'); p.click('[data-a=wShow]')
    ok('Writing task shows a model to compare (not graded)', p.locator('.fb blockquote').count() == 1)
    p.click('[data-a=finishLesson]'); p.wait_for_selector('.fact'); s = state(p)
    ok('Lesson finished: fact card collected and extra true detail shown', rid in s['facts'] and p.locator('.fact').count() == 1)
    ok('All target words enter the review plan', all(w in s['words'] for w in R['targets']))
    ok('The score is shown next to the story title in the Reading list', p.locator('.li.on .chip.score').inner_text() == f"{sc['last']}%")
    shot(p, '07-lesson-done')
    # ---- end-of-lesson recall
    p.click('[data-a=recall]'); p.wait_for_selector('.qcard'); nrec = len(state(p)['cur']['q'])
    key = state(p)['cur']['q'][0]; answer(p, right=False); nxt(p)
    while p.locator('.qcard').count(): answer(p); nxt(p)
    s = state(p); w_bad = key[2:]
    ok('Quick recall at the end of the lesson is short', 1 <= nrec <= 15, nrec)
    ok('A wrong review answer sends the word back to the 1-day step', s['words'][w_bad]['step'] == 1 and s['words'][w_bad]['due'] == p.evaluate("() => EI.today()") + 1, s['words'][w_bad])
    # ---- retake the practice: all right -> 100%
    p.evaluate("id => EIui.go({v:'reading', level:'A2', rid:id})", rid); p.click('.stages [data-s=practice]'); p.click('[data-a=retake]'); p.wait_for_selector('.qcard'); finish_test(p)
    sc2 = state(p)['scores'][rid]
    ok('Practice can be taken again; last and best score are kept', sc2['last'] == 100 and sc2['best'] == 100 and sc2['n'] == 2 and state(p)['lessons'][rid].get('doneDay'), sc2)
    # ---- next day
    p.clock.set_fixed_time(T0 + datetime.timedelta(days=1)); p.goto(URL); p.wait_for_selector('.shell'); p.evaluate("() => EIui.go({v:'today'})")
    due1 = p.evaluate("() => EI.due()")
    ok('Next day: the words due after 1 day appear in Today', ('w|' + w_bad) in due1 and 'Review now' in p.inner_text('#main'), len(due1))
    shot(p, '08-today-next-day')
    p.click('[data-a=review]'); p.wait_for_selector('.qcard'); n = 0; insent = []
    while p.locator('.qcard').count() and n < 60:
        insent.append(len(p.evaluate("() => EIui.cur().it.q").split(' ')) >= 4); answer(p); nxt(p); n += 1
    ok('Review items are always a word inside a sentence (no bare word–meaning card)', all(insent) and n > 0, n)
    t1 = p.evaluate("() => EI.today()")
    ok('Words answered right on day 1 move on to the 3-day step or later', any(v['step'] >= 2 and v['due'] >= t1 + 3 for v in state(p)['words'].values()))
    p.evaluate("() => EIui.go({v:'today'})"); p.click('[data-a=start]'); p.wait_for_selector('[data-a=guess]')
    ok('Today’s Start opens the next story, not the finished one', p.evaluate("() => EI.S.cur.rid") != rid)
    p.clock.set_fixed_time(T0 + datetime.timedelta(days=2)); p.goto(URL); p.wait_for_selector('.shell')
    hist = [[h[1] for h in v['h'] if h[1] != 'seen'] for v in state(p)['words'].values()]
    ok('No review type is used twice in a row for the same word', all(all(a != c for a, c in zip(h, h[1:])) for h in hist))
    # ---- grammar lesson
    p.evaluate("() => EIui.go({v:'grammar', gid:'past-simple'})"); p.wait_for_selector('.gtable')
    ok('Grammar lesson shows the four sentence forms', all(x in p.inner_text('.gtable') for x in ['Affirmative', 'Negative', 'Yes/No question', 'Wh- question']))
    answer(p, right=False)
    ok('Grammar feedback explains every option', p.locator('.opt small').count() >= 2); nxt(p)
    while p.locator('.qcard').count(): answer(p); nxt(p)
    s3 = state(p)
    ok('A missed grammar item enters the spaced review queue', any(k.startswith('g|past-simple|') for k in s3['gq']))
    ok('Grammar lesson marked done', s3['gram']['past-simple'].get('done'))
    # ---- vocabulary
    p.evaluate("() => EIui.go({v:'vocab', lv:'A2', per:20, pg:1})"); p.wait_for_selector('#vq')
    p.fill('#vq', 'discover'); ok('Vocabulary search filters the list', p.locator('.wrow').count() == 2, p.locator('.wrow').count())
    p.select_option('#vsl', 'vi'); p.fill('#vq', 'ky su')
    ok('Search by Vietnamese meaning works, with or without accents', p.locator('.wrow').count() == 1 and 'engineer' in p.inner_text('.wrow') and 'kỹ sư' in p.inner_text('.wrow'), p.locator('.wrow').count())
    shot(p, '09-vocabulary-vi-search')
    p.select_option('#vsl', 'en'); p.fill('#vq', 'disc'); p.click('.wrow >> nth=0'); p.wait_for_selector('.word-h')
    ok('Word entry: definition, example, hidden Vietnamese, Cambridge link, audio label', p.locator('.def').count() == 1 and p.locator('[data-a=showVi]').count() == 1 and 'dictionary.cambridge.org' in p.locator('.audiolabel a').get_attribute('href'))
    p.click('[data-a=showVi]'); p.fill('#vq', ''); p.click('.wrow >> nth=1'); ok('Vietnamese meaning closes when the word changes', p.locator('.vibox').count() == 0)
    # ---- export, erase, import
    before = state(p); txt = p.evaluate("() => EI.exportText()")
    p.evaluate("() => EIui.go({v:'settings'})"); p.click('[data-a=resetAsk]'); p.click('[data-a=resetDo]')
    ok('Erase clears progress', len(state(p)['words']) == 0 and not state(p)['scores'])
    p.evaluate("() => EIui.go({v:'settings'})"); p.click('[data-a=importOpen]'); p.fill('#imt', txt); p.click('[data-a=importRead]'); p.wait_for_selector('[data-a=importDo]')
    ok('Import explains Merge and Replace before acting', 'Merge' in p.inner_text('.dialog') and 'Replace' in p.inner_text('.dialog') and 'Không hoàn tác' in p.inner_text('.dialog'))
    p.click('[data-a=importDo][data-m=replace]'); after = state(p)
    ok('Import restores everything, including the review schedule and scores', all(after[k] == before[k] for k in ['words', 'gq', 'lessons', 'facts', 'sentences', 'scores']) and after['days'].keys() == before['days'].keys())
    p.evaluate("() => { const w = Object.keys(EI.S.words)[0]; EI.S.words[w].h = []; EI.S.words[w].step = 0; EI.save(); }")
    p.evaluate("txt => { EI.importState(EI.parseBackup(txt), 'merge'); EI.save(); }", txt)
    ok('Merge keeps the copy with more history', state(p)['words'] == before['words'])
    p.evaluate("() => EIui.go({v:'progress'})"); p.wait_for_selector('#p-facts')
    ok('Progress shows scores, coverage, forecast, fact timeline and sentences', p.locator('#p-score tr').count() >= 2 and p.locator('#p-cover .meter').count() == 8 and p.locator('.bars div').count() == 7 and p.locator('.tl .fact').count() >= 1 and p.locator('.sent').count() >= 1)
    shot(p, '10-progress')
    p.evaluate("() => EIui.go({v:'info'})"); p.wait_for_selector('#i-src')
    ok('Info lists sources for every story', p.locator('#i-src details').count() == p.evaluate("() => EI.R.length") and p.locator('#i-src details a').count() >= 2 * p.evaluate("() => EI.R.length"))
    ok('Nothing is labelled verified that is not', 'CHƯA đối chiếu' in p.inner_text('#i-data') and 'không phải người thật' in p.inner_text('#i-audio'))
    src = ' '.join(p.evaluate("u => fetch(u).then(r => r.text())", f) for f in ['js/ui.js', 'js/core.js']).lower()
    ok('No flashcards, leaderboard or countdown in the app', not any(x in src for x in ['flashcard', 'leaderboard', 'countdown']))
    ok('No "Listen (US)", "Replay" or A–B loop labels', not any(x in src for x in ['listen (us)', '>replay<', 'a–b loop', 'a-b loop']))
    # ---- long break
    p.clock.set_fixed_time(T0 + datetime.timedelta(days=40)); p.goto(URL); p.wait_for_selector('.shell'); p.evaluate("() => EIui.go({v:'today'})")
    pl = p.evaluate("() => EI.plan()")
    ok('After a long break the review is capped and spread over several days', len(pl['rev']) <= p.evaluate("() => EI.S.settings.cap") and pl['dueAll'] >= len(pl['rev']), pl)
    ok('Streak is shown and nothing is taken away after a break', 'days in a row' in p.inner_text('.stats') and p.evaluate("() => Object.keys(EI.S.words).length") == len(before['words']))
    ok('Backup reminder appears when no export for a long time', 'Back up your progress' in p.inner_text('#main'))
    # ---- my words (any tapped word goes into review with its sentence) and voice retell
    p.evaluate("() => { EIui.go({v:'reading', level:'A2', rid:'a2-p1-03'}); }"); p.click('[data-a=stage][data-s=read]'); p.wait_for_selector('#reader')
    tk = p.locator('#reader .tk:not(.tg)', has_text='aquarium').first; tk.click(); p.wait_for_selector('.sheet [data-a=shAdd]'); p.click('[data-a=shAdd]')
    mine = state(p)['mine']
    ok('Any word in a story can be added to the review plan', 'aquarium' in mine and p.locator('.sheet [data-a=shRm]').count() == 1, list(mine))
    p.click('[data-a=closeSheet]')
    it = p.evaluate("() => { const i = EI.reviewItem('m|aquarium'); return {due: EI.due().includes('m|aquarium'), q: i.q, a: i.a, t: i.t, why: i.why} }")
    ok('A picked word is reviewed inside its own story sentence', it['due'] and it['t'] == 'gap' and '_____' in it['q'] and len(it['q'].split(' ')) > 6 and it['a'] in (['Aquarium'], ['aquarium']), it)
    p.evaluate("() => { EI.answer('m|aquarium', 'ok', 'A'); EI.save(); }")
    m2 = state(p)['mine']['aquarium']
    ok('A picked word follows the spaced schedule', m2['step'] == 1 and m2['due'] == p.evaluate("() => EI.today()") + 1, m2)
    p.evaluate("() => EIui.go({v:'progress'})"); ok('Progress lists My words', 'aquarium' in p.inner_text('#p-mine').lower())
    p.evaluate("() => { const L = EI.S.lessons['a2-p1-03']; L.stage = L.pst = 'write'; EI.save(); EIui.go({v:'reading', level:'A2', rid:'a2-p1-03'}); }"); p.wait_for_selector('#retell')
    ok('After practice: retell out loud (record, hear myself, hear the model), not graded', p.locator('#retell [data-a=recToggle]').count() == 1 and p.locator('#retell [data-a=rtModel]').count() == 1)
    p.click('#retell [data-a=rtModel]'); ok('Hear the model also shows the model text', p.locator('.fb blockquote').count() == 1)
    shot(p, '16-retell')
    ok('No JavaScript errors on desktop', not errs, errs[:3])
    ctx.close()

    # ---- phone + offline
    ph = b.new_context(**pw.devices['Pixel 7']); m = ph.new_page(); merr = []; m.on('pageerror', lambda e: merr.append(str(e)))
    m.goto(URL); m.wait_for_selector('.shell')
    ok('Phone: bottom tab bar with the five sections', m.locator('.tabs .tab').count() == 5 and m.locator('.tabs').is_visible() and not m.locator('.rail').is_visible())
    shot(m, '11-phone-today')
    ok('Phone: page does not scroll sideways', m.evaluate("() => document.documentElement.scrollWidth <= window.innerWidth + 1"))
    m.click('.tab[data-v=reading]'); m.click('[data-a=level][data-l=A2]'); m.wait_for_selector('.li')
    ok('Phone: choosing A2 lists Pass 1 stories with topic and era, no word count or time', m.locator('.li').count() == m.evaluate("() => EI.R.filter(r => r.level === 'A2' && r.pass === 1).length") and 'words' not in m.inner_text('.li >> nth=0') and 'min' not in m.inner_text('.li >> nth=0'))
    m.click('[data-a=pass][data-n="2"]'); ok('Phone: the Pass 2 chip shows only Pass 2 stories', m.locator('.li').count() == m.evaluate("() => EI.R.filter(r => r.level === 'A2' && r.pass === 2).length"))
    m.click('[data-a=pass][data-n="1"]')
    m.click('.li >> nth=0'); m.wait_for_selector('[data-a=guess]'); m.click('[data-a=guess] >> nth=1'); m.click('.stages [data-s=practice]'); m.wait_for_selector('.qcard')
    while cur(m)['t'] != 'cloze': answer(m); nxt(m)
    shot(m, '12-phone-gaps')
    ok('Phone: story with gaps fits the screen width', m.evaluate("() => document.querySelector('#main').scrollWidth <= window.innerWidth + 1"))
    m.click('.stages [data-s=read]'); m.wait_for_selector('#reader'); shot(m, '13-phone-reader')
    m.wait_for_function("() => navigator.serviceWorker && navigator.serviceWorker.controller || navigator.serviceWorker.getRegistration().then(r => !!(r && r.active))", timeout=10000)
    m.wait_for_timeout(2500); ph.set_offline(True); m.reload()
    try: m.wait_for_selector('#reader', timeout=8000); off = True
    except Exception: off = False
    ok('Offline: the app reopens on the same story after the first load', off and m.evaluate("() => EI.R.length") >= 8)
    ok('No JavaScript errors on phone', not merr, merr[:3])
    ph.close()

    # ---- recorded AI voice (audio/index.js + audio/<key>.mp3)
    cx = b.new_context(viewport={'width': 1280, 'height': 860}); au = cx.new_page(); aerr = []; au.on('pageerror', lambda x: aerr.append(str(x)))
    reqs = []; au.on('request', lambda r: reqs.append(r.url) if '.mp3' in r.url else None)
    au.goto(URL); au.wait_for_selector('.shell')
    n_idx = au.evaluate("() => Object.keys(EI.audioIndex || {}).length")
    ok('Audio: the list of recorded sentences is loaded', n_idx > 0, n_idx)
    txt = au.evaluate("() => { for (const r of EI.R) for (const o of r.S) if (EI.audio.fileFor(o.plain)) return o.plain; return null; }")
    ok('Audio: a reading sentence has a recorded file and an honest label', txt and au.evaluate("t => EI.audio.label(t)", txt).startswith('AI voice (Kokoro'), txt)
    au.evaluate("t => EI.audio.say(t)", txt); au.wait_for_timeout(800)
    ok('Audio: playing that sentence fetches its MP3 file', any('.mp3' in u for u in reqs), reqs[:3])
    ok('Audio: text without a file falls back to the browser voice', au.evaluate("() => EI.audio.fileFor('A sentence that nobody recorded, written just now.') === null"))
    au.evaluate("() => { EI.S.settings.vsrc = 'browser'; }")
    ok('Audio: choosing “Browser voice” in Settings turns the files off', au.evaluate("t => EI.audio.fileFor(t) === null && EI.audio.label(t).startsWith('Machine voice') || EI.audio.label(t).startsWith('No speech')", txt))
    au.evaluate("() => { EI.S.settings.vsrc = 'ai'; EIui.go({ v: 'settings' }); }"); au.wait_for_selector('#s-audio')
    ok('Audio: Settings offers the AI voice / browser voice choice', au.locator('#set-vsrc').count() == 1)
    # tapping another sentence while the story plays goes straight to it (it used to finish the sentence, then skip one)
    au.evaluate("() => EIui.go({v:'reading', level:'A2', rid:'a2-p2-01'})"); au.wait_for_selector('.stages'); au.click('.stages [data-s=read]'); au.wait_for_selector('#reader')
    au.evaluate("() => { window.__said = []; window.__say = EI.audio.say; EI.audio.say = (t, o) => window.__said.push([t, o]); }")   # record what is asked to play
    au.click('#pplay'); au.click('#reader .sn[data-si="5"]')
    jr = au.evaluate("() => { const r = EI.rById('a2-p2-01'), s = window.__said; const first = s[0]; first[1].onend(true); return [s[0][0] === r.S[0].plain, s[1] && s[1][0] === r.S[5].plain, s.length]; }")
    ok('Audio: tapping a sentence while playing plays that sentence at once, and the old sentence ending does not skip ahead', jr == [True, True, 2], jr)
    au.evaluate("() => { EI.audio.say = window.__say; EI.audio.stop(); }")
    ok('No JavaScript errors with recorded audio', not aerr, aerr[:3])
    cx.close()

    # ---- wide screen: word and sentence beside the story, back / forward arrows
    cx = b.new_context(viewport={'width': 1920, 'height': 1000}); wd = cx.new_page(); werr = []; wd.on('pageerror', lambda x: werr.append(str(x)))
    wd.goto(URL); wd.wait_for_selector('.shell')
    wd.evaluate("() => EIui.go({v:'reading', level:'A2', rid:'a2-p1-01'})"); wd.wait_for_selector('.stages'); wd.click('.stages [data-s=read]'); wd.wait_for_selector('#reader')
    ok('Wide screen: a panel beside the story is ready', wd.locator('#side').is_visible())
    wd.click('#reader .tk.tg >> nth=0'); wd.wait_for_timeout(200)
    ok('Wide screen: tapping a word fills the side panel (word, then sentence), no pop-up', wd.locator('#side .sidecard').count() == 2 and wd.locator('#side .def').count() == 1 and not wd.locator('#sheet').is_visible())
    wd.click('#side [data-a=shVi]'); ok('Wide screen: the sentence translation shows in the side panel', wd.locator('#side .viline').count() == 1)
    ok('Wide screen: the story column is 800 px and sits in the middle of the reading area', abs(wd.locator('#reader').bounding_box()['width'] - 800) < 2 and abs((wd.locator('#reader').bounding_box()['x'] + 400) - (wd.locator('#main').bounding_box()['x'] + wd.locator('#main').bounding_box()['width'] / 2)) < 12, [wd.locator('#reader').bounding_box(), wd.locator('#main').bounding_box()])
    ok('Cambridge link opens through the small-window action', wd.locator('#side [data-a=camPop]').count() == 1)
    shot(wd, '15-wide-reader-side')
    wd.click('#side [data-a=gram] >> nth=0') if wd.locator('#side [data-a=gram]').count() else wd.evaluate("() => EIui.go({v:'grammar', gid:'past-simple'})")
    wd.wait_for_selector('#gprac')
    wd.click('.rail [data-a=navBack]'); wd.wait_for_selector('#reader', timeout=5000)
    ok('Back arrow returns from a grammar lesson to the story being read', wd.evaluate("() => EI.S.cur.rid === 'a2-p1-01' && EI.S.lessons['a2-p1-01'].stage === 'read'"))
    wd.click('.rail [data-a=navFwd]'); wd.wait_for_selector('#gprac', timeout=5000)
    ok('Forward arrow goes to the grammar lesson again', wd.evaluate("() => EI.S.cur.v === 'grammar'"))
    # shortcuts chosen by the learner
    wd.evaluate("() => EIui.go({v:'settings'})"); wd.wait_for_selector('#s-audio')
    wd.click('[data-a=keySet][data-k=play]'); wd.keyboard.press('j')
    wd.click('[data-a=keySet][data-k=fwd]'); wd.keyboard.press('Shift+ArrowRight')
    ks = wd.evaluate("() => EI.S.settings.keys")
    ok('Settings: pressing a key sets the shortcut (with modifiers)', ks.get('play', {}).get('label') == 'J' and ks.get('fwd', {}).get('label') == 'Shift+→', ks)
    wd.click('[data-a=keySet][data-k=again]'); wd.keyboard.press('j')
    ks = wd.evaluate("() => EI.S.settings.keys")
    ok('Settings: a key used again moves to the new action', ks.get('again', {}).get('label') == 'J' and 'play' not in ks, ks)
    wd.click('[data-a=keySet][data-k=play]'); wd.keyboard.press('k')
    wd.evaluate("() => EIui.go({v:'reading', level:'A2', rid:'a2-p1-01'})"); wd.wait_for_selector('#reader')
    wd.evaluate("() => { window.__said = []; window.__say = EI.audio.say; EI.audio.say = (t, o) => window.__said.push(t); }")
    wd.keyboard.press('k'); ok('Reader: the chosen play key starts the story', wd.evaluate("() => window.__said.length") == 1)
    wd.select_option('#pstep', '30'); wd.keyboard.press('Shift+ArrowRight')
    ok('Reader: the forward key jumps ahead by the seconds chosen in the player', wd.evaluate("() => { const r = EI.rById('a2-p1-01'); const t = window.__said[window.__said.length - 1]; return r.S.findIndex(o => o.plain === t) > 0; }"))
    ok('Player: the back / forward buttons show the chosen seconds', wd.inner_text('[data-a=pFwd]') == '+30s')
    wd.evaluate("() => { EI.audio.say = window.__say; EI.audio.stop(); }")
    shot(wd, '16-wide-reader-centered')
    ok('No JavaScript errors on the wide screen', not werr, werr[:3])
    cx.close()

    # ---- sync between two devices (local copy of sync/worker.js on port 8787)
    import subprocess, os, time, urllib.request, urllib.error
    srv = subprocess.Popen(['node', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sync-dev-server.mjs'), '8787'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        for _ in range(60):
            try: urllib.request.urlopen('http://localhost:8787/'); break
            except urllib.error.HTTPError: break          # the server answers (403): it is up
            except Exception: time.sleep(0.1)
        devs = []
        for _ in range(2):
            cx = b.new_context(viewport={'width': 1280, 'height': 860}); cx.add_init_script("localStorage.setItem('ei.syncUrl', 'http://localhost:8787')")
            pg = cx.new_page(); er = []; pg.on('pageerror', lambda x, er=er: er.append(str(x))); pg.goto(URL); pg.wait_for_selector('.shell'); devs.append((cx, pg, er))
        (ca, A_, ea), (cb, B_, eb) = devs
        w0, w1, f0 = A_.evaluate("() => [Object.keys(EI.W)[0], Object.keys(EI.W)[1], EI.R[0].id]")
        A_.evaluate("([w, f]) => { EI.setKnown(w, true); EI.S.facts.push(f); EI.save(); }", [w0, f0])
        B_.evaluate("w => { EI.setKnown(w, true); EI.save(); }", w1)
        A_.evaluate("() => EIui.go({ v: 'settings' })"); A_.wait_for_selector('#s-sync')
        ok('Sync: Settings shows the sync card when a sync server is set', A_.locator('[data-a=syncCreate]').count() == 1)
        A_.click('[data-a=syncCreate]'); A_.wait_for_selector('#sycode', timeout=8000)
        code = A_.inner_text('#sycode').strip()
        ok('Sync: device A creates a 16-character code shown as XXXX-XXXX-XXXX-XXXX', re.fullmatch(r'[0-9A-HJKMNP-TV-Z]{4}(-[0-9A-HJKMNP-TV-Z]{4}){3}', code), code)
        B_.evaluate("() => EIui.go({ v: 'settings' })"); B_.wait_for_selector('#s-sync'); B_.click('[data-a=syncJoinOpen]')
        B_.fill('#sycin', 'abcd'); B_.click('[data-a=syncJoin]')
        ok('Sync: a malformed code is refused with a message', 'Mã gồm 16 ký tự' in B_.inner_text('#syce'))
        B_.fill('#sycin', code.replace('-', '').lower()); B_.click('[data-a=syncJoin]'); B_.wait_for_selector('#sycode', timeout=8000)
        got = B_.evaluate("([w0, w1, f]) => [EI.status(w0), EI.status(w1), EI.S.facts.includes(f)]", [w0, w1, f0])
        ok('Sync: device B joins with the code (lower case, no dashes) and gets A’s progress merged with its own', got == ['Known', 'Known', True], got)
        A_.click('[data-a=syncNow]'); A_.wait_for_function("() => !EI.sync.cfg().err && EI.S.words[%s] && EI.status(%s) === 'Known'" % (repr(w1), repr(w1)), timeout=8000)
        ok('Sync: device A receives B’s progress with Sync now', A_.evaluate("w => EI.status(w)", w1) == 'Known')
        same = A_.evaluate("() => EI.sync.canon(EI.sync.payload())") == B_.evaluate("() => EI.sync.canon(EI.sync.payload())")
        ok('Sync: both devices end with the same progress', same)
        ok('Sync: settings stay per device (not part of the synced data)', 'settings' not in A_.evaluate("() => Object.keys(EI.sync.payload())"))
        B_.click('[data-a=syncDelAsk]'); B_.click('[data-a=syncDelDo]'); B_.wait_for_selector('[data-a=syncCreate]', timeout=8000)
        A_.click('[data-a=syncNow]'); A_.wait_for_function("() => !EI.sync.cfg().code", timeout=8000)
        ok('Sync: after one device deletes the online copy, the other stops syncing and keeps its progress', A_.evaluate("w => EI.status(w)", w0) == 'Known' and A_.locator('[data-a=syncCreate]').count() == 1)
        ok('No JavaScript errors during sync', not ea and not eb, (ea + eb)[:3])
        ca.close(); cb.close()
    finally:
        srv.terminate()
    b.close()
print(f'\n{sum(res)}/{len(res)} checks passed')
sys.exit(0 if all(res) else 1)
