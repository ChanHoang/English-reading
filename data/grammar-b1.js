/* B1 grammar path, group 1 (v0.3). Same format as grammar-a2.js. Examples marked with a reading id come from that story.
   Question types: mc (every option has its own explanation), gap, error, order, write (rewrite with a model). */
EI.grammar({ id: 'past-perfect', n: 1, level: 'B1', title: 'Past perfect', vi: 'Thì quá khứ hoàn thành', mins: 9,
  use: ['Việc xảy ra TRƯỚC một việc khác (hoặc trước một thời điểm) trong quá khứ: when we arrived, the meeting had started.', 'Khi kể chuyện bằng quá khứ đơn mà cần “lùi lại” xa hơn: Gutenberg, who had worked with metal, had an idea.', 'Thường đi với before, after, when, already, by the time, never … before.'],
  forms: [
    ['Affirmative', 'S + had + V3', 'He had worked with metal before he started printing.', 'had dùng cho mọi chủ ngữ; viết tắt ’d: She’d left.'],
    ['Negative', 'S + had not (hadn’t) + V3', 'They had not seen a printed book before.', 'Phủ định: had not + V3.'],
    ['Yes/No question', 'Had + S + V3?', 'Had the meeting started when you arrived? — Yes, it had.', 'Đảo had lên đầu câu.'],
    ['Wh- question', 'Wh- + had + S + V3?', 'What had he done before he moved to Mainz?', 'Từ hỏi + had + chủ ngữ + V3.']
  ],
  ex: [['Gutenberg, who had worked with metal, had a different idea.', 'Gutenberg, người từng làm việc với kim loại, có một ý tưởng khác.', 'b1-p1-01'], ['Printers in China and Korea had done it much earlier.', 'Thợ in Trung Quốc và Hàn Quốc đã làm điều đó sớm hơn nhiều.', 'b1-p1-01'], ['When the inspector arrived, the operator had already measured ten parts.', 'Khi người kiểm tra đến, người vận hành đã đo xong mười chi tiết.']],
  errors: [['When I arrived, the train already left.', 'When I arrived, the train had already left.', 'Việc “tàu đi” xảy ra trước việc “tôi đến”: cần had + V3. Tiếng Việt chỉ dùng “đã” cho cả hai nên dễ quên.'], ['I had went there before.', 'I had gone there before.', 'Sau had là V3 (gone), không dùng V2 (went).'], ['Yesterday I had finished the report.', 'Yesterday I finished the report.', 'Chỉ một việc trong quá khứ, không có việc nào sau nó: dùng quá khứ đơn.']],
  note: '6 câu: phân biệt với quá khứ đơn là điểm khó nhất, thêm dạng V3 bất quy tắc.',
  q: [
    { t: 'mc', q: 'When the customer called, we ______ the parts.', o: [['had already sent', 'Đúng: việc gửi hàng xảy ra TRƯỚC cuộc gọi (mốc quá khứ) → had (already) + V3.'], ['have already sent', 'Sai: câu kể quá khứ (called); hiện tại hoàn thành nối với bây giờ, không nối với một mốc quá khứ.'], ['had already send', 'Sai: sau had cần V3 sent, không dùng động từ nguyên mẫu.']], a: 0 },
    { t: 'gap', q: 'Before 1450, most books in Europe ______ (be) copied by hand.', a: 'had been', why: 'Tình trạng trước một mốc quá khứ: had been (bị động: had been copied).' },
    { t: 'mc', q: 'She ______ a CMM before she joined our company.', o: [['had never used', 'Đúng: “chưa từng” tính đến một mốc quá khứ (trước khi vào công ty) → had never + V3.'], ['never had used', 'Sai trật tự: never đứng giữa had và V3 (had never used).'], ['had never use', 'Sai: sau had cần V3 used.']], a: 0 },
    { t: 'error', q: 'By the time the police came, the thieves had went.', wrong: 'went', fix: 'gone', why: 'had + V3: go – went – gone.' },
    { t: 'order', a: 'He had worked with metal before he started printing.', why: 'Việc làm kim loại (had worked) xảy ra trước việc in (started).' },
    { t: 'write', q: 'Join the two sentences with “after”: “The mold was repaired. We started production.”', model: 'After the mold had been repaired, we started production.', why: 'Việc sửa khuôn xảy ra trước: had been repaired.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'used-to', n: 2, level: 'B1', title: 'Used to and would', vi: 'used to / would: thói quen trong quá khứ', mins: 8,
  use: ['used to + V: thói quen hoặc tình trạng trong quá khứ mà NAY KHÔNG CÒN: I used to smoke (bây giờ không hút nữa).', 'would + V: chỉ cho HÀNH ĐỘNG lặp lại trong quá khứ (không dùng cho tình trạng): Every morning, he would check the machines.', 'Khác be used to + V-ing (quen với): I am used to working at night.'],
  forms: [
    ['Affirmative', 'S + used to + V', 'Books used to be very expensive.', 'Dùng cho mọi chủ ngữ, không thêm -s.'],
    ['Negative', 'S + did not use to + V', 'People did not use to travel so much.', 'Sau did not, viết use to (không có d).'],
    ['Yes/No question', 'Did + S + use to + V?', 'Did you use to live in Hanoi?', 'Câu hỏi cũng dùng use to.'],
    ['would', 'S + would + V (hành động lặp lại)', 'On Sundays, my grandfather would take us to the market.', 'Không dùng would cho tình trạng: KHÔNG nói I would live in Hue.']
  ],
  ex: [['Before Gutenberg, books in Europe used to be copied by hand.', 'Trước Gutenberg, sách ở châu Âu từng được chép tay.', 'b1-p1-01'], ['We used to measure every part with a caliper; now the CMM does most of the work.', 'Trước đây chúng tôi đo mọi chi tiết bằng thước cặp; giờ máy CMM làm phần lớn công việc.']],
  errors: [['I use to play football when I was young.', 'I used to play football when I was young.', 'Câu khẳng định viết used to (có d), dù đọc /juːstə/.'], ['Did you used to work there?', 'Did you use to work there?', 'Sau did, động từ về nguyên mẫu: use to.'], ['I would live in Da Nang.', 'I used to live in Da Nang.', 'would không dùng cho tình trạng (live, have, be).'], ['I used to working at night.', 'I am used to working at night.', 'Quen với = be used to + V-ing, khác used to + V.']],
  note: '6 câu: used to / use to, would chỉ cho hành động, và nhầm với be used to.',
  q: [
    { t: 'mc', q: 'This town ______ a big market, but it closed in 2010.', o: [['used to have', 'Đúng: tình trạng trong quá khứ, nay không còn (chợ đã đóng năm 2010) → used to + V.'], ['would have', 'Sai: would chỉ dùng cho hành động lặp lại trong quá khứ; với tình trạng, sở hữu (have, be, live) phải dùng used to.'], ['use to have', 'Sai: câu khẳng định viết used to (có -d); use to chỉ dùng sau did/didn’t.']], a: 0 },
    { t: 'mc', q: 'Did you ______ in a factory?', o: [['use to work', 'Đúng: sau did (câu hỏi, phủ định) viết use to, vì did đã mang dấu quá khứ.'], ['used to work', 'Sai: sau did không viết used — giống như không nói “did you worked”.'], ['used to working', 'Sai: used to (thói quen cũ) + V nguyên mẫu; be used to + V-ing là cấu trúc khác (quen với).']], a: 0 },
    { t: 'gap', q: 'Every evening, my father ______ (would / read) the newspaper after dinner.', a: 'would read', why: 'Hành động lặp lại trong quá khứ: would + V.' },
    { t: 'error', q: 'I am used to get up early for the morning shift.', wrong: 'get', fix: 'getting', why: 'be used to + V-ing = quen với việc gì.' },
    { t: 'order', a: 'Books used to be very expensive.', why: 'used to + be + tính từ.' },
    { t: 'write', q: 'Rewrite with “used to”: “In the past, I smoked. Now I don’t.”', model: 'I used to smoke.', why: 'used to + V cho thói quen đã bỏ.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'present-perfect-continuous', n: 3, level: 'B1', title: 'Present perfect continuous', vi: 'Thì hiện tại hoàn thành tiếp diễn', mins: 8,
  use: ['Việc bắt đầu trong quá khứ và VẪN đang tiếp tục, nhấn mạnh quá trình, thường với for / since / how long: I have been working here for five years.', 'Việc vừa diễn ra một thời gian và để lại dấu hiệu bây giờ: Your hands are black — have you been repairing the machine?', 'Động từ trạng thái (know, have, like…) không dùng dạng này: I have known him for years.'],
  forms: [
    ['Affirmative', 'S + have/has been + V-ing', 'She has been testing the new mold since Monday.', 'has với he/she/it.'],
    ['Negative', 'S + have/has not been + V-ing', 'We have not been sleeping well.', ''],
    ['Yes/No question', 'Have/Has + S + been + V-ing?', 'Have you been waiting long?', ''],
    ['Wh- question', 'How long + have/has + S + been + V-ing?', 'How long has it been raining?', 'Câu hỏi thường gặp nhất với thì này.']
  ],
  ex: [['I have been learning English for six months.', 'Tôi đã học tiếng Anh được sáu tháng (và vẫn đang học).'], ['The machine has been running since six o’clock.', 'Máy đã chạy từ sáu giờ (và vẫn đang chạy).']],
  errors: [['I am working here since 2020.', 'I have been working here since 2020.', 'Với since/for và việc vẫn tiếp diễn, tiếng Anh không dùng hiện tại tiếp diễn. Tiếng Việt “đang làm từ 2020” dễ gây nhầm.'], ['I have been knowing him for years.', 'I have known him for years.', 'know là động từ trạng thái: dùng hiện tại hoàn thành.'], ['How long you have been waiting?', 'How long have you been waiting?', 'Câu hỏi: đảo have lên trước chủ ngữ.']],
  note: '5 câu: for/since, động từ trạng thái, trật tự câu hỏi.',
  q: [
    { t: 'mc', q: 'We ______ for the parts since 8 a.m.', o: [['have been waiting', 'Đúng: bắt đầu từ 8 giờ và đến giờ vẫn đang chờ → hiện tại hoàn thành tiếp diễn.'], ['are waiting', 'Sai: since + mốc thời gian nói việc kéo dài đến nay → cần thì hoàn thành, không dùng hiện tại tiếp diễn.'], ['waited', 'Sai: quá khứ đơn nói việc đã xong; ở đây vẫn đang chờ, và since đi với thì hoàn thành.']], a: 0 },
    { t: 'mc', q: 'I ______ this customer for ten years.', o: [['have known', 'Đúng: know là động từ trạng thái nên không dùng tiếp diễn; kéo dài đến nay → have known.'], ['have been knowing', 'Sai: động từ trạng thái (know, like, own) không dùng dạng tiếp diễn, kể cả hoàn thành tiếp diễn.'], ['am knowing', 'Sai: know không dùng tiếp diễn, và “for ten years” cần thì hoàn thành.']], a: 0 },
    { t: 'gap', q: 'How long ______ you ______ (study) English?', a: 'have, been studying', why: 'How long + have + you + been + V-ing.' },
    { t: 'error', q: 'She has been work on this report all morning.', wrong: 'work', fix: 'working', why: 'have/has been + V-ing.' },
    { t: 'order', a: 'How long have you been waiting?', why: 'How long + have + S + been + V-ing?' }
  ] });

EI.grammar({ id: 'second-conditional', n: 4, level: 'B1', title: 'Second conditional', vi: 'Câu điều kiện loại 2', mins: 8,
  use: ['Điều không có thật hoặc khó xảy ra ở hiện tại/tương lai, và kết quả tưởng tượng: If I had more time, I would study more.', 'Lời khuyên: If I were you, I would check the gauge again.', 'Khác loại 1 (có thể xảy ra thật): If it rains, we will stay inside.'],
  forms: [
    ['Affirmative', 'If + S + V2 (were), S + would + V', 'If we had a bigger budget, we would buy a new CMM.', 'Mệnh đề if dùng quá khứ đơn nhưng nói về hiện tại.'],
    ['Negative', 'If + S + didn’t + V, S + wouldn’t + V', 'If he didn’t live so far away, he wouldn’t be late.', ''],
    ['Question', 'What would + S + V + if …?', 'What would you do if you lost your job?', ''],
    ['be', 'If I/he/she/it were …', 'If I were the manager, I would change the plan.', 'Văn chuẩn dùng were cho mọi chủ ngữ; was cũng gặp trong văn nói.']
  ],
  ex: [['If I lived closer to the factory, I would walk to work.', 'Nếu tôi sống gần nhà máy hơn, tôi sẽ đi bộ đi làm.'], ['If I were you, I would ask the customer first.', 'Nếu tôi là bạn, tôi sẽ hỏi khách hàng trước.']],
  errors: [['If I would have money, I would buy a car.', 'If I had money, I would buy a car.', 'Không dùng would trong mệnh đề if.'], ['If I am you, I would wait.', 'If I were you, I would wait.', 'Lời khuyên giả định: If I were you.'], ['If he worked harder, he will pass.', 'If he worked harder, he would pass.', 'Vế if quá khứ thì vế chính dùng would, không dùng will.']],
  note: '5 câu: would không đặt trong vế if, If I were you, và phân biệt với loại 1.',
  q: [
    { t: 'mc', q: 'If I ______ more money, I would travel around the world.', o: [['had', 'Đúng: điều kiện loại 2 (điều không có thật ở hiện tại) — vế If dùng quá khứ đơn.'], ['would have', 'Sai: không dùng would trong vế If; would chỉ ở vế chính.'], ['have', 'Sai: If + hiện tại là loại 1 (có thể xảy ra), không đi với would travel ở vế sau.']], a: 0 },
    { t: 'mc', q: 'If I were you, I ______ the drawing again.', o: [['would check', 'Đúng: lời khuyên “If I were you” là loại 2 → vế chính would + V.'], ['will check', 'Sai: vế If ở were (loại 2), nên vế chính dùng would, không dùng will.'], ['checked', 'Sai: vế chính của câu giả định cần would + V; checked là kể sự việc đã xảy ra.']], a: 0 },
    { t: 'gap', q: 'What ______ you do if you won a lot of money?', a: 'would', why: 'Câu hỏi giả định: What would you do if …?' },
    { t: 'error', q: 'If we would have a second machine, we could finish faster.', wrong: 'would', fix: 'had', why: 'Vế if: quá khứ đơn (had), không dùng would have.' },
    { t: 'write', q: 'Give advice with “If I were you”: your friend is always tired.', model: 'If I were you, I would go to bed earlier.', why: 'If I were you, I would + V.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'reported-speech', n: 5, level: 'B1', title: 'Reported speech', vi: 'Câu tường thuật', mins: 10,
  use: ['Kể lại lời người khác nói hoặc viết, thường sau said / told / wrote / asked.', 'Khi động từ tường thuật ở quá khứ, thì thường lùi một bậc: is → was, will → would, can → could, has done → had done.', 'say + (that) …; tell + người + (that) …; câu hỏi tường thuật: asked + if/wh- + S + V (không đảo trợ động từ).'],
  forms: [
    ['Statement', 'He said (that) + S + V (lùi thì)', '“I am tired.” → He said that he was tired.', 'that có thể bỏ.'],
    ['tell', 'S + told + người + (that) …', 'She told me that the parts were ready.', 'tell cần tân ngữ chỉ người; say thì không.'],
    ['Yes/No question', 'S + asked (+ người) + if/whether + S + V', '“Is it ready?” → He asked if it was ready.', 'Không đảo trật tự như câu hỏi.'],
    ['Wh- question', 'S + asked + wh- + S + V', '“Where do you work?” → She asked where I worked.', ''],
    ['Order / request', 'S + told/asked + người + to V', '“Please wait.” → He asked me to wait.', 'Mệnh lệnh: told/asked somebody (not) to do.']
  ],
  ex: [['A future pope saw some of them in 1454 and wrote that you could read them without glasses.', 'Một vị giáo hoàng tương lai thấy vài trang vào năm 1454 và viết rằng người ta có thể đọc chúng mà không cần kính.', 'b1-p1-01'], ['The customer said that the parts had arrived late.', 'Khách hàng nói rằng hàng đã đến muộn.']],
  errors: [['He said me that he was busy.', 'He told me that he was busy. / He said that he was busy.', 'say không có tân ngữ chỉ người ngay sau; dùng tell + người.'], ['She asked me where did I live.', 'She asked me where I lived.', 'Câu hỏi tường thuật không đảo trợ động từ.'], ['He told that the machine is broken.', 'He said that the machine was broken.', 'told cần người phía sau; và lùi thì is → was khi kể lại chuyện đã qua.']],
  note: '7 câu: lùi thì, say/tell, câu hỏi và mệnh lệnh tường thuật — chủ điểm rộng, dùng nhiều trong email công việc.',
  q: [
    { t: 'mc', q: '“The parts are ready.” → She said that the parts ______ ready.', o: [['were', 'Đúng: said ở quá khứ → are lùi thành were (the parts số nhiều).'], ['was', 'Sai: chủ ngữ the parts là số nhiều → were.'], ['are being', 'Sai: lùi thì là đổi are → were, không chuyển sang tiếp diễn; “are being ready” cũng không tự nhiên.']], a: 0 },
    { t: 'mc', q: 'He ______ me that the meeting was cancelled.', o: [['told', 'Đúng: tell + người + that … (told me that).'], ['said', 'Sai: say không đi thẳng với người; phải là said that … hoặc said to me that …'], ['asked', 'Sai: ask dùng để tường thuật câu hỏi hoặc lời nhờ (asked me if…, asked me to…), không đi với that + thông báo.']], a: 0 },
    { t: 'mc', q: '“Can you come tomorrow?” → She asked if I ______ come the next day.', o: [['could', 'Đúng: tường thuật câu hỏi: can lùi thành could (asked if I could come).'], ['will', 'Sai: câu gốc dùng can (khả năng, lời mời), không phải will; và sau asked ở quá khứ phải lùi thì.'], ['could to', 'Sai: sau could (động từ khuyết thiếu) dùng V nguyên mẫu, không có to.']], a: 0 },
    { t: 'error', q: 'The manager asked me where was the report.', wrong: 'was', fix: 'the report was', why: 'Câu hỏi tường thuật giữ trật tự câu kể: where the report was.' },
    { t: 'gap', q: '“Please send the FAI report today.” → The customer asked us ______ the FAI report that day.', a: 'to send', why: 'Lời đề nghị tường thuật: asked somebody to + V.' },
    { t: 'order', a: 'She told me that the parts were ready.', why: 'told + người + that + mệnh đề lùi thì.' },
    { t: 'write', q: 'Report it: Tom said, “I will finish the report tomorrow.”', model: 'Tom said that he would finish the report the next day.', why: 'will → would; tomorrow → the next day.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'gerund-infinitive', n: 6, level: 'B1', title: 'Verb + -ing or to + verb', vi: 'Động từ + V-ing hay to + V', mins: 9,
  use: ['Một số động từ đi với V-ing: enjoy, finish, avoid, keep, mind, suggest, consider, stop (thôi làm).', 'Một số động từ đi với to + V: want, decide, plan, hope, agree, refuse, need, try (cố gắng), learn.', 'Vài động từ đổi nghĩa: stop doing (thôi làm) / stop to do (dừng lại để làm); remember doing (nhớ đã làm) / remember to do (nhớ phải làm); try doing (thử làm) / try to do (cố làm).', 'Sau giới từ luôn dùng V-ing: interested in learning, before starting.'],
  forms: [
    ['verb + -ing', 'enjoy / finish / avoid / keep + V-ing', 'We finished measuring the parts at five.', ''],
    ['verb + to V', 'want / decide / plan / hope + to V', 'They decided to change the mold.', ''],
    ['stop', 'stop doing ≠ stop to do', 'He stopped printing red titles. / He stopped to drink some water.', 'Nghĩa khác nhau hoàn toàn.'],
    ['after a preposition', 'preposition + V-ing', 'Thank you for helping me. She is good at drawing.', '']
  ],
  ex: [['At first, Gutenberg printed the titles in red, but he stopped doing that because it took too long.', 'Lúc đầu, Gutenberg in tiêu đề bằng mực đỏ, nhưng ông thôi làm vậy vì quá mất thời gian.', 'b1-p1-01'], ['Please remember to send the report before Friday.', 'Nhớ gửi báo cáo trước thứ Sáu nhé.']],
  errors: [['I enjoy to work with numbers.', 'I enjoy working with numbers.', 'enjoy + V-ing.'], ['We decided changing the supplier.', 'We decided to change the supplier.', 'decide + to V.'], ['I am interested in learn English.', 'I am interested in learning English.', 'Sau giới từ (in) dùng V-ing.'], ['He stopped to smoke last year.', 'He stopped smoking last year.', 'Bỏ thuốc = stop smoking; stop to smoke = dừng lại để hút.']],
  note: '7 câu: hai nhóm động từ, động từ đổi nghĩa và V-ing sau giới từ.',
  q: [
    { t: 'mc', q: 'We finished ______ the parts at five o’clock.', o: [['measuring', 'Đúng: finish + V-ing (làm xong việc gì).'], ['to measure', 'Sai: finish không đi với to + V.'], ['measure', 'Sai: sau finish không dùng động từ nguyên mẫu; phải là V-ing.']], a: 0 },
    { t: 'mc', q: 'The company decided ______ a new CMM.', o: [['to buy', 'Đúng: decide + to V (quyết định làm gì).'], ['buying', 'Sai: decide không đi với V-ing.'], ['buy', 'Sai: thiếu to — decide to + V.']], a: 0 },
    { t: 'mc', q: 'He stopped ______ because the doctor told him to.', o: [['smoking', 'Đúng: stop + V-ing = thôi hẳn việc đó (bỏ hút thuốc).'], ['to smoke', 'Sai nghĩa: stop + to V = dừng việc khác lại ĐỂ hút — ngược với lời khuyên của bác sĩ.'], ['smoke', 'Sai: sau stop không dùng động từ nguyên mẫu.']], a: 0 },
    { t: 'gap', q: 'Please remember ______ (lock) the gauge cabinet.', a: 'to lock', why: 'remember to do = nhớ phải làm (việc chưa làm).' },
    { t: 'error', q: 'Thank you for send the drawing so quickly.', wrong: 'send', fix: 'sending', why: 'Sau giới từ for dùng V-ing.' },
    { t: 'order', a: 'They decided to change the mold.', why: 'decide + to + V.' },
    { t: 'write', q: 'Use “avoid”: Don’t touch the lens with your fingers.', model: 'Avoid touching the lens with your fingers.', why: 'avoid + V-ing.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'modals-deduction', n: 7, level: 'B1', title: 'Must, might, can’t (deduction)', vi: 'must / might / can’t để suy đoán', mins: 8,
  use: ['must + V: gần như chắc chắn là đúng (dựa trên bằng chứng): The lights are off — they must be at home asleep.', 'might / may / could + V: có thể đúng, không chắc: The part might be in the other box.', 'can’t + V: gần như chắc chắn là KHÔNG đúng: That can’t be the right drawing — it shows an old version.', 'Lưu ý: suy đoán ngược với must là can’t, không phải mustn’t (mustn’t = cấm).'],
  forms: [
    ['Sure (yes)', 'S + must + V', 'He has worked all night. He must be tired.', ''],
    ['Possible', 'S + might / may / could + V', 'This book could sell for 35 million dollars.', 'Ba từ gần nghĩa nhau khi suy đoán.'],
    ['Sure (no)', 'S + can’t + V', 'It can’t be 30 °C outside — it’s snowing.', ''],
    ['Continuous', 'S + must / might + be + V-ing', 'She isn’t answering. She might be driving.', 'Suy đoán việc đang xảy ra.'],
    ['Past', 'S + must / might / can’t + have + V3', 'The pieces might have belonged to a bishop.', 'Suy đoán về việc đã xảy ra trong quá khứ.']
  ],
  ex: [['Today, a complete copy of one book could sell for more than 35 million dollars.', 'Ngày nay, một bản trọn vẹn của một cuốn sách có thể bán được hơn 35 triệu đô la.', 'b1-p1-01'], ['The reading is 0.5 mm too big; the probe might be dirty.', 'Kết quả đo lớn hơn 0,5 mm; có thể đầu dò bị bẩn.'], ['They might have belonged to a trader, a local leader, a prince or a bishop.', 'Chúng có thể đã thuộc về một thương nhân, một thủ lĩnh địa phương, một hoàng tử hay một giám mục.', 'b1-p1-07']],
  errors: [['He mustn’t be at home — his car is not here.', 'He can’t be at home — his car is not here.', 'Suy đoán phủ định dùng can’t; mustn’t nghĩa là “không được phép”.'], ['She must to be tired.', 'She must be tired.', 'Sau must không có to.'], ['It might is broken.', 'It might be broken.', 'Sau might là V nguyên mẫu: be.']],
  note: '6 câu: ba mức chắc chắn và lỗi mustn’t / can’t.',
  q: [
    { t: 'mc', q: 'He has worked for 14 hours. He ______ be very tired.', o: [['must', 'Đúng: must + V = chắc hẳn (suy luận gần như chắc chắn từ bằng chứng: làm 14 tiếng).'], ['can’t', 'Sai nghĩa: can’t + V = chắc chắn không — ngược với bằng chứng.'], ['mustn’t', 'Sai: mustn’t là cấm (You mustn’t smoke here), không dùng để suy đoán.']], a: 0 },
    { t: 'mc', q: 'That ______ be our part — our parts are black, not white.', o: [['can’t', 'Đúng: can’t + V = chắc chắn không phải — bằng chứng rõ (hàng mình màu đen).'], ['mustn’t', 'Sai: mustn’t là cấm, không dùng để suy đoán; suy đoán phủ định chắc chắn là can’t.'], ['might', 'Sai nghĩa: might = có thể; ở đây có bằng chứng rõ nên người nói chắc chắn.']], a: 0 },
    { t: 'mc', q: 'I’m not sure where the gauge is. It ______ be in the cabinet.', o: [['might', 'Đúng: might + V = có thể (không chắc) — đúng với “I’m not sure”.'], ['must', 'Sai nghĩa: must = chắc hẳn; người nói đã nói rõ là không chắc.'], ['can’t', 'Sai nghĩa: can’t = chắc chắn không; người nói không có bằng chứng loại trừ.']], a: 0 },
    { t: 'error', q: 'The machine makes no sound. It must is off.', wrong: 'is', fix: 'be', why: 'must + V nguyên mẫu: must be.' },
    { t: 'gap', q: 'Nobody is answering the phone. They ______ (might / have) lunch now.', a: 'might be having', why: 'Suy đoán việc đang diễn ra: might be + V-ing.' },
    { t: 'order', a: 'He must be very tired.', why: 'must + be + tính từ.' }
  ] });

EI.grammar({ id: 'passive-tenses', n: 8, level: 'B1', title: 'Passive in different tenses', vi: 'Bị động ở các thì', mins: 9,
  use: ['Bị động = be + V3, và thì nằm ở động từ be: is made, was made, has been made, is being made, will be made, can be made.', 'Dùng khi người làm không quan trọng, không biết, hoặc khi nói về sản phẩm, quy trình (rất hay gặp trong báo cáo kỹ thuật).', 'Thêm by + người/vật khi cần nói ai làm.'],
  forms: [
    ['Present perfect', 'has/have been + V3', 'Forty-nine copies have been kept until today.', 'Kết quả đến nay.'],
    ['Present continuous', 'is/are being + V3', 'The mold is being repaired right now.', 'Đang được làm.'],
    ['Future', 'will be + V3', 'The report will be sent on Friday.', ''],
    ['Modal', 'can / must / should be + V3', 'The gauge must be checked every month.', 'Rất hay gặp trong quy trình (MSOP).'],
    ['Past continuous', 'was/were being + V3', 'When I arrived, the parts were being measured.', '']
  ],
  ex: [['Before Gutenberg, books in Europe used to be copied by hand.', 'Trước Gutenberg, sách ở châu Âu từng được chép tay.', 'b1-p1-01'], ['The samples must be measured at 23 °C.', 'Mẫu phải được đo ở 23 °C.'], ['Your order has been shipped.', 'Đơn hàng của bạn đã được gửi đi.']],
  errors: [['The parts have measured already.', 'The parts have been measured already.', 'Bị động hoàn thành cần been: have been + V3.'], ['The mold is repairing now.', 'The mold is being repaired now.', 'Khuôn không tự sửa: is being + V3.'], ['The gauge must checked every month.', 'The gauge must be checked every month.', 'Sau động từ khuyết thiếu: be + V3.']],
  note: '7 câu: bốn thì và động từ khuyết thiếu — dạng câu hay dùng trong báo cáo FAI và MSOP.',
  q: [
    { t: 'mc', q: 'The new mold ______ right now.', o: [['is being tested', 'Đúng: khuôn ĐƯỢC thử (bị động) và việc đang diễn ra lúc nói → is being + V3.'], ['is testing', 'Sai: chủ động nghĩa là khuôn đang thử (cái gì); khuôn là vật được thử.'], ['has tested', 'Sai: chủ động và thiếu been; “right now” cũng cần thì tiếp diễn.']], a: 0 },
    { t: 'mc', q: 'Your parts ______ yesterday, so they will arrive on Monday.', o: [['were shipped', 'Đúng: hàng ĐƯỢC gửi (bị động), có mốc “yesterday” → quá khứ đơn: were + V3.'], ['have been shipped', 'Sai: hiện tại hoàn thành không đi với mốc thời gian đã qua (yesterday).'], ['are shipping', 'Sai thì: hiện tại tiếp diễn không đi với yesterday; việc gửi đã xong.']], a: 0 },
    { t: 'mc', q: 'All gauges ______ every six months.', o: [['must be calibrated', 'Đúng: dụng cụ ĐƯỢC hiệu chuẩn (bị động), là quy định → must be + V3.'], ['must calibrate', 'Sai: chủ động nghĩa là dụng cụ tự hiệu chuẩn (cái gì); gauges là vật được hiệu chuẩn.'], ['must be calibrate', 'Sai: sau must be cần V3 calibrated.']], a: 0 },
    { t: 'gap', q: 'The FAI report ______ (send) to the customer tomorrow.', a: 'will be sent', why: 'Tương lai bị động: will be + V3.' },
    { t: 'error', q: 'Forty-nine copies have kept until today.', wrong: 'kept', fix: 'been kept', why: 'Bị động hoàn thành: have been + V3.' },
    { t: 'order', a: 'The report will be sent on Friday.', why: 'S + will be + V3 + thời gian.' },
    { t: 'write', q: 'Make it passive: “Someone has changed the drawing.”', model: 'The drawing has been changed.', why: 'has been + V3; người làm không quan trọng nên bỏ by someone.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

/* Group 2 (v0.4). */
EI.grammar({ id: 'third-conditional', n: 9, level: 'B1', title: 'Third conditional', vi: 'Câu điều kiện loại 3', mins: 9,
  use: ['Điều KHÔNG xảy ra trong quá khứ và kết quả tưởng tượng của nó: If we had checked the drawing, we would have found the mistake (thật ra chúng tôi đã không kiểm tra).', 'Hay dùng để nói tiếc nuối hoặc rút kinh nghiệm sau một sự cố.', 'could have / might have thay cho would have khi kết quả chỉ là có thể: If the pilot had turned back, the plane might have crashed.'],
  forms: [
    ['Affirmative', 'If + S + had + V3, S + would have + V3', 'If the operator had cleaned the probe, the results would have been correct.', 'Cả hai vế đều nói về quá khứ.'],
    ['Negative', 'If + S + hadn’t + V3, S + wouldn’t have + V3', 'If it hadn’t rained, the match wouldn’t have stopped.', 'Phủ định ở vế nào thì thêm not ở vế đó.'],
    ['Question', 'What would + S + have + V3 + if …?', 'What would you have done if the CMM had broken?', ''],
    ['Possible result', 'If + S + had + V3, S + could/might have + V3', 'If we had sent the parts earlier, they might have arrived on time.', 'could have = đã có thể; might have = có lẽ đã.']
  ],
  ex: [['If I had known about the meeting, I would have come.', 'Nếu tôi biết về cuộc họp thì tôi đã đến (nhưng tôi không biết).'], ['If the tank had been tested, the disaster might not have happened.', 'Nếu bồn chứa được kiểm tra, có lẽ thảm họa đã không xảy ra.'], ['If he had seen the drawing move, he would not have lost the game.', 'Nếu ông nhìn ra nước cầm hòa, ông đã không thua ván đó.', 'b1-p1-29']],
  errors: [['If I would have known, I would have helped.', 'If I had known, I would have helped.', 'Không dùng would trong vế if: If + had + V3.'], ['If he had came earlier, he would have seen it.', 'If he had come earlier, he would have seen it.', 'Sau had dùng V3: come – came – come.'], ['If we had left on time, we would catch the train.', 'If we had left on time, we would have caught the train.', 'Kết quả trong quá khứ: would have + V3.']],
  note: '6 câu: hai vế đều lùi về quá khứ; lỗi hay gặp là đặt would vào vế if.',
  q: [
    { t: 'mc', q: 'If we ______ the mold temperature, the parts would have been better.', o: [['had checked', 'Đúng: điều kiện loại 3 (giả định ngược với quá khứ) — vế If dùng had + V3.'], ['would have checked', 'Sai: không dùng would trong vế If, kể cả loại 3.'], ['checked', 'Sai: If + quá khứ đơn là loại 2; vế sau “would have been” cho thấy loại 3 → had checked.']], a: 0 },
    { t: 'mc', q: 'If she had studied, she ______ the exam.', o: [['would have passed', 'Đúng: kết quả giả định trong quá khứ (thật ra cô đã không học và đã trượt) → would have + V3.'], ['would pass', 'Sai: would + V là loại 2 (hiện tại); vế If ở had studied nói về quá khứ.'], ['had passed', 'Sai: had + V3 chỉ dùng ở vế If; vế chính cần would have + V3.']], a: 0 },
    { t: 'gap', q: 'If the driver ______ (see) the ice, he would have stopped.', a: 'had seen', why: 'Vế if: had + V3.' },
    { t: 'error', q: 'If they had took a taxi, they would have arrived earlier.', wrong: 'took', fix: 'taken', why: 'take – took – taken: sau had dùng V3.' },
    { t: 'order', a: 'If I had known, I would have told you.', why: 'If + had + V3, S + would have + V3.' },
    { t: 'write', q: 'Write a third conditional: “The gauge was not calibrated. The results were wrong.”', model: 'If the gauge had been calibrated, the results would not have been wrong.', why: 'Đảo nghĩa sự thật quá khứ: had been + V3, would not have + V3.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'relative-non-defining', n: 10, level: 'B1', title: 'Relative clauses with commas', vi: 'Mệnh đề quan hệ không xác định', mins: 9,
  use: ['Thêm thông tin phụ về một người hoặc vật ĐÃ rõ là ai, cái gì: My manager, who is from Japan, speaks good English. Bỏ mệnh đề đi câu vẫn đủ nghĩa.', 'Luôn có dấu phẩy và KHÔNG dùng that: Hanoi, which is the capital, … (không viết “Hanoi, that is …”).', 'whose = của người/vật đó; where = ở nơi đó; which ở cuối câu có thể chỉ cả ý trước: The parts passed, which made the customer happy.'],
  forms: [
    ['People', 'N, who + V …,', 'Mr. Lam, who checks every FAI report, is very careful.', 'who thay cho người.'],
    ['Things', 'N, which + V …,', 'The CMM, which cost 200,000 dollars, is in the clean room.', 'which thay cho vật; không dùng that.'],
    ['Possession', 'N, whose + N …,', 'Marie Curie, whose husband was also a scientist, won two Nobel Prizes.', 'whose + danh từ.'],
    ['Place', 'N, where + S + V …,', 'Da Nang, where my brother lives, has a beautiful beach.', 'where = in/at which.'],
    ['Whole idea', '…, which + V', 'The delivery was late, which made the customer angry.', 'which chỉ cả mệnh đề trước.']
  ],
  ex: [['Gustave Eiffel, who built the tower, also made the frame of the Statue of Liberty.', 'Gustave Eiffel, người xây ngọn tháp, cũng làm bộ khung của tượng Nữ thần Tự do.'], ['The report, which has twelve pages, is ready.', 'Bản báo cáo, dài mười hai trang, đã xong.'], ['Richard Seddon, who headed the government from April 1893, was a friend of the alcohol trade, and he tried to stop the law.', 'Richard Seddon, người đứng đầu chính phủ từ tháng 4 năm 1893, là bạn của ngành buôn bán rượu, và ông tìm cách chặn đạo luật.', 'b1-p1-24']],
  errors: [['Hanoi, that is the capital, is very old.', 'Hanoi, which is the capital, is very old.', 'Mệnh đề có dấu phẩy không dùng that.'], ['My sister who lives in Hue is a teacher.', 'My sister, who lives in Hue, is a teacher.', 'Nếu tôi chỉ có một chị gái, thông tin là phụ: cần dấu phẩy.'], ['The man, who his car was stolen, called the police.', 'The man, whose car was stolen, called the police.', 'Sở hữu: whose + danh từ, không dùng who his.']],
  note: '6 câu: dấu phẩy, không dùng that, phân biệt who/which/whose/where.',
  q: [
    { t: 'mc', q: 'Ho Chi Minh City, ______ is the biggest city in Vietnam, is very busy.', o: [['which', 'Đúng: thành phố là nơi chốn/vật, mệnh đề giữa hai dấu phẩy bổ sung thông tin → which.'], ['that', 'Sai: mệnh đề có dấu phẩy (bổ sung thông tin) không dùng that.'], ['who', 'Sai: who dùng cho người; Thành phố Hồ Chí Minh là một nơi chốn.']], a: 0 },
    { t: 'mc', q: 'Our supplier, ______ factory is in Thailand, sent the samples late.', o: [['whose', 'Đúng: whose + danh từ = (nhà máy) CỦA nhà cung cấp — nghĩa sở hữu.'], ['who', 'Sai: who làm chủ ngữ hoặc tân ngữ; “who factory” thiếu nghĩa “của”.'], ['which', 'Sai: “which factory” không mang nghĩa sở hữu; cần whose.']], a: 0 },
    { t: 'gap', q: 'Hoi An, ______ we spent our holiday, is beautiful at night.', a: 'where', why: 'Nơi chốn + mệnh đề có chủ ngữ riêng (we spent): where.' },
    { t: 'error', q: 'The mold, that was made in China, needs a repair.', wrong: 'that', fix: 'which', why: 'Mệnh đề có dấu phẩy: which, không dùng that.' },
    { t: 'mc', q: 'The parts passed the test, ______ made everyone happy.', o: [['which', 'Đúng: , which thay cho CẢ ý phía trước (việc hàng đạt kiểm tra) và làm chủ ngữ cho made.'], ['that', 'Sai: sau dấu phẩy không dùng that, nhất là khi thay cho cả một ý.'], ['what', 'Sai: what không dùng để nối, thay cho một ý đã nói phía trước; dùng , which.']], a: 0 },
    { t: 'write', q: 'Join with “who”: “Anna is our new engineer. She speaks three languages.”', model: 'Anna, who speaks three languages, is our new engineer.', why: 'Thông tin phụ về Anna nằm giữa hai dấu phẩy.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'wish', n: 11, level: 'B1', title: 'I wish …', vi: 'Câu ước với wish / if only', mins: 8,
  use: ['Ước điều KHÁC với hiện tại: wish + quá khứ đơn (were): I wish I had more time (thật ra tôi không có).', 'Tiếc về quá khứ: wish + quá khứ hoàn thành: I wish I had checked the drawing (thật ra tôi đã không kiểm tra).', 'Muốn người khác thay đổi hành động (thường là phàn nàn): wish + would: I wish the machine would stop making that noise. If only = I wish nhưng mạnh hơn.'],
  forms: [
    ['Present', 'S + wish + S + V2 (were)', 'I wish I lived closer to work.', 'Ước cho hiện tại: lùi một thì.'],
    ['Past', 'S + wish + S + had + V3', 'She wishes she had studied English earlier.', 'Tiếc điều đã (không) xảy ra.'],
    ['Complaint', 'S + wish + S + would + V', 'I wish the supplier would answer my emails.', 'Không dùng would khi nói về chính mình: không nói “I wish I would …”.'],
    ['If only', 'If only + S + V2 / had + V3', 'If only I had saved the file!', 'Mạnh hơn I wish.']
  ],
  ex: [['I wish I could speak English like a native speaker.', 'Ước gì tôi nói tiếng Anh như người bản xứ.'], ['He wishes he hadn’t sent that email.', 'Anh ấy ước mình đã không gửi email đó.']],
  errors: [['I wish I have a car.', 'I wish I had a car.', 'Ước cho hiện tại: lùi về quá khứ đơn.'], ['I wish I didn’t eat so much yesterday.', 'I wish I hadn’t eaten so much yesterday.', 'Tiếc về quá khứ: had + V3.'], ['I wish I would be taller.', 'I wish I were taller.', 'Không dùng would cho chính mình; dùng were.']],
  note: '5 câu: ba dạng wish theo thời gian, và wish + would khi phàn nàn.',
  q: [
    { t: 'mc', q: 'I don’t have enough time. I wish I ______ more time.', o: [['had', 'Đúng: ước cho hiện tại (điều không có thật bây giờ) → wish + quá khứ đơn.'], ['have', 'Sai: sau wish phải lùi thì — ước cho hiện tại dùng quá khứ đơn (had).'], ['will have', 'Sai: không dùng will sau wish; ước cho hiện tại dùng quá khứ đơn had.']], a: 0 },
    { t: 'mc', q: 'I didn’t check the report. I wish I ______ it.', o: [['had checked', 'Đúng: tiếc về việc đã không làm trong quá khứ → wish + had + V3.'], ['checked', 'Sai: wish + quá khứ đơn là ước cho HIỆN TẠI; việc kiểm tra báo cáo đã qua.'], ['would check', 'Sai: wish + would dùng để phàn nàn về người khác hoặc mong điều thay đổi, không dùng cho tiếc nuối về quá khứ.']], a: 0 },
    { t: 'gap', q: 'The music is so loud. I wish my neighbor ______ turn it down.', a: 'would', why: 'Muốn người khác thay đổi hành động: wish + would.' },
    { t: 'error', q: 'She wishes she can speak Japanese.', wrong: 'can', fix: 'could', why: 'Sau wish lùi thì: can → could.' },
    { t: 'write', q: 'Write a wish: you are not at the beach now.', model: 'I wish I were at the beach now.', why: 'Hiện tại trái sự thật: wish + were.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'future-continuous-perfect', n: 12, level: 'B1', title: 'Will be doing and will have done', vi: 'Tương lai tiếp diễn và tương lai hoàn thành', mins: 8,
  use: ['will be + V-ing: việc ĐANG diễn ra tại một thời điểm trong tương lai: At 10 a.m. tomorrow, I will be measuring the new parts.', 'will have + V3: việc sẽ XONG trước một thời điểm trong tương lai: By Friday, we will have finished the FAI report. Thường đi với by + thời điểm.', 'Không nhầm với will + V (quyết định, dự đoán chung) đã học ở A2.'],
  forms: [
    ['Continuous', 'S + will be + V-ing', 'This time next week, we will be flying to Japan.', 'Hành động đang diễn ra ở một mốc tương lai.'],
    ['Perfect', 'S + will have + V3', 'By the end of the year, I will have worked here for five years.', 'Xong trước mốc tương lai.'],
    ['Negative', 'S + won’t be + V-ing / won’t have + V3', 'He won’t have finished the report by 5 p.m.', ''],
    ['Question', 'Will + S + be + V-ing? / Will + S + have + V3?', 'Will you be using the CMM this afternoon?', 'Hỏi lịch sự về kế hoạch của người khác.']
  ],
  ex: [['Don’t call at nine; I will be driving to work.', 'Đừng gọi lúc chín giờ; khi đó tôi đang lái xe đi làm.'], ['By 2030, the company will have opened three new factories.', 'Đến năm 2030, công ty sẽ mở xong ba nhà máy mới.']],
  errors: [['At 8 p.m. tonight I will watch the match.', 'At 8 p.m. tonight I will be watching the match.', 'Việc đang diễn ra tại một mốc tương lai: will be + V-ing.'], ['By Friday I will finish the report.', 'By Friday I will have finished the report.', 'Xong trước mốc “by Friday”: will have + V3.'], ['I will have went home by then.', 'I will have gone home by then.', 'Sau will have dùng V3.']],
  note: '5 câu: phân biệt will be + V-ing (đang) và will have + V3 (đã xong) quanh một mốc tương lai.',
  q: [
    { t: 'mc', q: 'At 3 p.m. tomorrow, we ______ the customer’s parts.', o: [['will be measuring', 'Đúng: việc ĐANG diễn ra tại một mốc tương lai (3 giờ chiều mai) → will be + V-ing.'], ['will have measured', 'Sai nghĩa: will have + V3 = sẽ đã đo XONG trước lúc đó; câu nói lúc 3 giờ việc đang diễn ra.'], ['measure', 'Sai: hiện tại đơn không dùng cho một việc đang diễn ra vào một giờ cụ thể ngày mai.']], a: 0 },
    { t: 'mc', q: 'By next Monday, the toolmaker ______ the mold.', o: [['will have repaired', 'Đúng: by + mốc tương lai → việc sẽ XONG trước mốc đó: will have + V3.'], ['will be repairing', 'Sai nghĩa: will be + V-ing = lúc đó vẫn đang sửa; “by next Monday” đòi việc phải xong.'], ['has repaired', 'Sai: hiện tại hoàn thành nói đến bây giờ, không nói về một mốc tương lai.']], a: 0 },
    { t: 'gap', q: 'Don’t visit at noon; I ______ (have) lunch.', a: 'will be having', why: 'Đang làm tại một thời điểm tương lai: will be + V-ing.' },
    { t: 'error', q: 'By June, she will have pass all her exams.', wrong: 'pass', fix: 'passed', why: 'will have + V3 (passed).' },
    { t: 'write', q: 'Say what will be finished: you will send the report before 5 p.m.', model: 'By 5 p.m., I will have sent the report.', why: 'By + mốc tương lai, will have + V3.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'so-such', n: 13, level: 'B1', title: 'So and such', vi: 'so và such (… that)', mins: 7,
  use: ['so + tính từ / trạng từ: The test was so difficult. Thêm that để nói kết quả: It was so cold that the water froze.', 'such + (a/an) + (tính từ) + danh từ: It was such a long day. They are such good friends.', 'so much / so many + danh từ: There were so many people that we couldn’t move.'],
  forms: [
    ['so', 'so + adj/adv (+ that …)', 'The part was so small that we used a microscope.', 'Sau so không có danh từ.'],
    ['such', 'such a/an + adj + N (số ít)', 'It was such a strange noise that everyone stopped.', 'Danh từ số ít đếm được cần a/an.'],
    ['such (plural)', 'such + adj + N (số nhiều/không đếm được)', 'They make such good coffee.', 'Không có a/an.'],
    ['so many / much', 'so many + N số nhiều; so much + N không đếm được', 'We had so much work that we stayed late.', '']
  ],
  ex: [['The wave was so strong that it pushed a truck into a building.', 'Con sóng mạnh đến mức đẩy một chiếc xe tải vào một tòa nhà.'], ['It was such a small mistake, but it cost a lot of money.', 'Đó là một lỗi rất nhỏ, nhưng tốn rất nhiều tiền.'], ['The Great Hall was such a busy place that on many days more than 5,000 people walked through it.', 'Đại sảnh đông đúc đến mức nhiều ngày có hơn 5.000 người đi qua.', 'b1-p1-26']],
  errors: [['It was so a long meeting.', 'It was such a long meeting.', 'Có danh từ (meeting): dùng such a.'], ['She is such kind.', 'She is so kind.', 'Chỉ có tính từ: dùng so.'], ['There were such many people.', 'There were so many people.', 'so many + danh từ số nhiều.']],
  note: '5 câu: có danh từ thì dùng such, chỉ có tính từ thì dùng so.',
  q: [
    { t: 'mc', q: 'The CMM program was ______ complicated that it took two days to write.', o: [['so', 'Đúng: so + tính từ + that = … đến nỗi (complicated là tính từ đứng một mình).'], ['such', 'Sai: such cần danh từ đi sau (such a complicated program).'], ['such a', 'Sai: such a + tính từ + danh từ số ít; ở đây sau complicated không có danh từ.']], a: 0 },
    { t: 'mc', q: 'It was ______ good idea that the boss used it at once.', o: [['such a', 'Đúng: such a + tính từ + danh từ đếm được số ít (a good idea) + that.'], ['so', 'Sai: có danh từ idea sau tính từ, nên dùng such a; so chỉ đi với tính từ đứng một mình.'], ['so a', 'Sai: không có cấu trúc “so a + tính từ + danh từ” trong câu thường; dùng such a.']], a: 0 },
    { t: 'gap', q: 'There were ______ many mistakes that we sent the report back.', a: 'so', why: 'so many + danh từ số nhiều.' },
    { t: 'error', q: 'The weather was such bad that the flight was cancelled.', wrong: 'such', fix: 'so', why: 'Chỉ có tính từ (bad): dùng so.' },
    { t: 'write', q: 'Join with “so … that”: “The box was very heavy. I couldn’t lift it.”', model: 'The box was so heavy that I couldn’t lift it.', why: 'so + tính từ + that + kết quả.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'question-tags', n: 14, level: 'B1', title: 'Question tags', vi: 'Câu hỏi đuôi', mins: 7,
  use: ['Thêm “đuôi” ngắn vào cuối câu để hỏi lại hoặc mong người nghe đồng ý: You checked the drawing, didn’t you?', 'Câu khẳng định → đuôi phủ định; câu phủ định → đuôi khẳng định. Đuôi dùng trợ động từ của câu và đại từ.', 'Giọng xuống ở đuôi: chỉ mong đồng ý. Giọng lên: thật sự hỏi.'],
  forms: [
    ['be', 'S + be …, be + not + S?', 'The report is ready, isn’t it?', 'Dùng lại be.'],
    ['Simple', 'S + V …, don’t/doesn’t/didn’t + S?', 'She works on Saturdays, doesn’t she?', 'Không có trợ động từ thì mượn do/does/did.'],
    ['Negative sentence', 'S + aux + not …, aux + S?', 'You haven’t sent it yet, have you?', 'Câu phủ định → đuôi khẳng định.'],
    ['Special', 'I am …, aren’t I? / Let’s …, shall we?', 'Let’s start the meeting, shall we?', 'Hai trường hợp đặc biệt.']
  ],
  ex: [['You’re the new engineer, aren’t you?', 'Anh là kỹ sư mới phải không?'], ['The parts didn’t pass, did they?', 'Các chi tiết đã không đạt, đúng không?'], ['Still, it was a mad plan, wasn’t it?', 'Dù vậy, đó vẫn là một kế hoạch điên rồ, phải không?', 'b1-p1-30']],
  errors: [['You like coffee, isn’t it?', 'You like coffee, don’t you?', 'Đuôi phải hợp với động từ và chủ ngữ của câu, không dùng “isn’t it” cho mọi câu.'], ['He can swim, can he?', 'He can swim, can’t he?', 'Câu khẳng định → đuôi phủ định.'], ['Nobody called, didn’t they?', 'Nobody called, did they?', 'Nobody mang nghĩa phủ định → đuôi khẳng định.']],
  note: '5 câu: đổi khẳng định/phủ định và mượn do/does/did.',
  q: [
    { t: 'mc', q: 'The customer approved the samples, ______?', o: [['didn’t they', 'Đúng: câu khẳng định ở quá khứ đơn (approved) → đuôi phủ định didn’t + đại từ (they cho khách hàng là một công ty).'], ['did they', 'Sai: câu khẳng định cần đuôi phủ định.'], ['isn’t it', 'Sai: động từ chính là approved (quá khứ đơn), nên đuôi dùng did; chủ ngữ cũng không phải it.']], a: 0 },
    { t: 'mc', q: 'You haven’t seen my caliper, ______?', o: [['have you', 'Đúng: câu phủ định (haven’t) → đuôi khẳng định, dùng lại trợ động từ have.'], ['haven’t you', 'Sai: câu phủ định không đi với đuôi phủ định.'], ['did you', 'Sai: câu dùng have (hiện tại hoàn thành), nên đuôi dùng have, không dùng did.']], a: 0 },
    { t: 'gap', q: 'She is coming to the meeting, ______ she?', a: 'isn’t', why: 'be khẳng định → isn’t.' },
    { t: 'error', q: 'He works in the QC room, does he?', wrong: 'does', fix: 'doesn’t', why: 'Câu khẳng định với động từ thường (works): đuôi phủ định doesn’t he.' },
    { t: 'mc', q: 'I’m late again, ______?', o: [['aren’t I', 'Đúng: trường hợp đặc biệt — I am khẳng định có đuôi aren’t I.'], ['amn’t I', 'Sai: tiếng Anh chuẩn không có dạng amn’t.'], ['am I', 'Sai: câu khẳng định cần đuôi phủ định.']], a: 0 }
  ] });

EI.grammar({ id: 'too-enough', n: 15, level: 'B1', title: 'Too and enough', vi: 'too và enough', mins: 7,
  use: ['too + tính từ = quá mức (thường là xấu): The part is too long. Thêm to + V để nói việc không làm được: It is too heavy to lift.', 'tính từ + enough = đủ: The light isn’t bright enough. enough đứng SAU tính từ nhưng TRƯỚC danh từ: enough time, enough samples.', 'Thêm for + người: The text is too difficult for me.'],
  forms: [
    ['too', 'too + adj/adv (+ for sb) (+ to V)', 'The hole is too small for this pin.', 'Không nói “too much small”.'],
    ['enough + adj', 'adj/adv + enough (+ to V)', 'He is old enough to drive.', 'enough đứng sau tính từ.'],
    ['enough + noun', 'enough + N', 'We don’t have enough samples for the test.', 'enough đứng trước danh từ.'],
    ['too much/many', 'too much + N không đếm được; too many + N số nhiều', 'There are too many mistakes in this report.', '']
  ],
  ex: [['The wall was too thin to hold the weight.', 'Vách quá mỏng để chịu được sức nặng.'], ['Is the room warm enough for the measurement?', 'Phòng có đủ ấm để đo không?'], ['Herdwicks are strong enough to live on the high hills all year, and their grey wool is rough and hard-wearing.', 'Cừu Herdwick đủ khỏe để sống trên đồi cao quanh năm, và lông len màu xám của chúng thô ráp và rất bền.', 'b1-p1-31']],
  errors: [['The box is enough big.', 'The box is big enough.', 'enough đứng sau tính từ.'], ['It is too much hot today.', 'It is too hot today.', 'too + tính từ, không thêm much.'], ['We don’t have time enough.', 'We don’t have enough time.', 'enough đứng trước danh từ.']],
  note: '5 câu: vị trí của enough và nghĩa “quá … đến mức không” của too.',
  q: [
    { t: 'mc', q: 'This gauge is not ______ for such a small tolerance.', o: [['accurate enough', 'Đúng: tính từ + enough = đủ … (chưa đủ chính xác cho dung sai nhỏ như vậy).'], ['enough accurate', 'Sai vị trí: enough đứng SAU tính từ (accurate enough), đứng TRƯỚC danh từ (enough time).'], ['too accurate', 'Sai nghĩa: “not too accurate” = không quá chính xác — vô lý, vì độ chính xác cao chưa bao giờ là vấn đề.']], a: 0 },
    { t: 'mc', q: 'The coffee is ______ hot to drink.', o: [['too', 'Đúng: too + tính từ + to V = quá … nên không thể (quá nóng, không uống được).'], ['enough', 'Sai: enough đứng SAU tính từ (hot enough), và “đủ nóng để uống” lại ngược nghĩa.'], ['so', 'Sai: so + tính từ đi với that + mệnh đề (so hot that I can’t drink it), không đi với to V.']], a: 0 },
    { t: 'gap', q: 'We have ______ time to finish the report today.', a: 'enough', why: 'enough đứng trước danh từ time.' },
    { t: 'error', q: 'There are too much parts on the table.', wrong: 'much', fix: 'many', why: 'parts đếm được số nhiều: too many.' },
    { t: 'write', q: 'Rewrite with “too … to”: “The box is very heavy. I can’t carry it.”', model: 'The box is too heavy to carry.', why: 'too + tính từ + to V.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'causative-have', n: 16, level: 'B1', title: 'Have something done', vi: 'Nhờ / thuê người khác làm: have / get something done', mins: 7,
  use: ['Người khác làm việc đó cho mình (mình nhờ hoặc trả tiền): I had my car repaired (thợ sửa, không phải tôi).', 'Cấu trúc: have + vật + V3. Trong văn nói hay dùng get: We got the mold checked.', 'Cũng dùng cho việc xấu xảy ra với mình: She had her bag stolen.'],
  forms: [
    ['Present', 'S + have/has + O + V3', 'We have our gauges calibrated every year.', 'Một công ty ngoài hiệu chuẩn.'],
    ['Past', 'S + had + O + V3', 'He had his hair cut yesterday.', ''],
    ['Future', 'S + will have / is going to have + O + V3', 'I am going to have the drawing translated.', ''],
    ['get', 'S + get + O + V3', 'You should get your eyes tested.', 'Thân mật hơn have.']
  ],
  ex: [['The company had the tank painted brown.', 'Công ty cho sơn bồn chứa màu nâu.'], ['We need to get the CMM repaired before Monday.', 'Chúng ta cần cho sửa máy CMM trước thứ Hai.'], ['Many men had their boots repaired for free.', 'Nhiều người được sửa giày ống miễn phí.', 'b1-p1-25']],
  errors: [['I repaired my car at the garage.', 'I had my car repaired at the garage.', 'Nếu thợ sửa chứ không phải bạn: have + O + V3.'], ['She had cut her hair.', 'She had her hair cut.', 'Trật tự: have + tân ngữ + V3.'], ['We have the parts measure every week.', 'We have the parts measured every week.', 'Sau tân ngữ dùng V3 (measured).']],
  note: '5 câu: trật tự have + vật + V3, và nghĩa “người khác làm cho mình”.',
  q: [
    { t: 'mc', q: 'We don’t calibrate the gauges ourselves; we ______ by an outside lab.', o: [['have them calibrated', 'Đúng: have + vật + V3 = thuê, nhờ người khác làm (phòng thí nghiệm bên ngoài hiệu chuẩn).'], ['have calibrated them', 'Sai nghĩa: đây là hiện tại hoàn thành — chính chúng ta đã hiệu chuẩn; trái với vế đầu “we don’t calibrate … ourselves”.'], ['have them calibrate', 'Sai: have + vật + V3 (bị động); “them calibrate” nghĩa là dụng cụ tự đi hiệu chuẩn.']], a: 0 },
    { t: 'mc', q: 'She ______ her phone stolen on the bus.', o: [['had', 'Đúng: have + vật + V3 còn dùng cho chuyện xấu xảy ra với mình (bị mất trộm điện thoại).'], ['did', 'Sai: không có cấu trúc “do + vật + V3”; dùng have (hoặc get) something done.'], ['made', 'Sai: make + vật + V3 không dùng ở đây; “made her phone stolen” nghĩa là cô tự làm cho điện thoại bị trộm.']], a: 0 },
    { t: 'gap', q: 'I need to ______ my glasses repaired.', a: 'get', why: 'get + O + V3 (văn nói); have cũng đúng.' },
    { t: 'error', q: 'We had the report translate into Chinese.', wrong: 'translate', fix: 'translated', why: 'have + O + V3.' },
    { t: 'write', q: 'Say that a technician will repair your laptop tomorrow.', model: 'I am going to have my laptop repaired tomorrow.', why: 'be going to have + O + V3.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });
