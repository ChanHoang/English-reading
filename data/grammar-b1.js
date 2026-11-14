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
    { t: 'mc', q: 'When the customer called, we ______ the parts.', o: [['had already sent', 'Đúng: việc gửi hàng xảy ra trước cuộc gọi.'], ['already sent had', 'Sai trật tự từ.'], ['have already sent', 'Sai: câu kể quá khứ, không dùng hiện tại hoàn thành.']], a: 0 },
    { t: 'gap', q: 'Before 1450, most books in Europe ______ (be) copied by hand.', a: 'had been', why: 'Tình trạng trước một mốc quá khứ: had been (bị động: had been copied).' },
    { t: 'mc', q: 'She ______ a CMM before she joined our company.', o: [['had never used', 'Đúng: “chưa từng” tính đến một mốc quá khứ.'], ['never had used', 'Sai: never đứng sau had.'], ['had never use', 'Sai: cần V3 used.']], a: 0 },
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
    { t: 'mc', q: 'This town ______ a big market, but it closed in 2010.', o: [['used to have', 'Đúng: tình trạng trong quá khứ, nay không còn.'], ['would have', 'Sai: have (sở hữu) là tình trạng, không dùng would.'], ['use to have', 'Sai: câu khẳng định viết used to.']], a: 0 },
    { t: 'mc', q: 'Did you ______ in a factory?', o: [['use to work', 'Đúng: sau did dùng use to.'], ['used to work', 'Sai: sau did không viết used.'], ['used to working', 'Sai: sau used to là V nguyên mẫu.']], a: 0 },
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
    { t: 'mc', q: 'We ______ for the parts since 8 a.m.', o: [['have been waiting', 'Đúng: bắt đầu từ 8 giờ và vẫn đang chờ.'], ['are waiting', 'Sai: since + việc tiếp diễn đến nay cần thì hoàn thành.'], ['waited', 'Sai: việc chưa kết thúc.']], a: 0 },
    { t: 'mc', q: 'I ______ this customer for ten years.', o: [['have known', 'Đúng: know là động từ trạng thái.'], ['have been knowing', 'Sai: không dùng know ở dạng tiếp diễn.'], ['am knowing', 'Sai: động từ trạng thái, và cần thì hoàn thành.']], a: 0 },
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
    { t: 'mc', q: 'If I ______ more money, I would travel around the world.', o: [['had', 'Đúng: vế if dùng quá khứ đơn.'], ['would have', 'Sai: không dùng would trong vế if.'], ['have', 'Sai: đây là điều không có thật, không phải loại 1.']], a: 0 },
    { t: 'mc', q: 'If I were you, I ______ the drawing again.', o: [['would check', 'Đúng: lời khuyên, vế chính would + V.'], ['will check', 'Sai: loại 2 dùng would.'], ['checked', 'Sai: vế chính cần would.']], a: 0 },
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
    { t: 'mc', q: '“The parts are ready.” → She said that the parts ______ ready.', o: [['were', 'Đúng: lùi thì are → were.'], ['are being', 'Sai: không đổi sang tiếp diễn.'], ['have', 'Sai nghĩa.']], a: 0 },
    { t: 'mc', q: 'He ______ me that the meeting was cancelled.', o: [['told', 'Đúng: tell + người + that.'], ['said', 'Sai: say không đi trực tiếp với me.'], ['asked', 'Sai: ask dùng cho câu hỏi hoặc lời đề nghị.']], a: 0 },
    { t: 'mc', q: '“Can you come tomorrow?” → She asked if I ______ come the next day.', o: [['could', 'Đúng: can → could.'], ['can will', 'Sai: không ghép hai trợ động từ.'], ['could to', 'Sai: sau could không có to.']], a: 0 },
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
    { t: 'mc', q: 'We finished ______ the parts at five o’clock.', o: [['measuring', 'Đúng: finish + V-ing.'], ['to measure', 'Sai: finish không đi với to + V.'], ['measure', 'Sai: thiếu -ing.']], a: 0 },
    { t: 'mc', q: 'The company decided ______ a new CMM.', o: [['to buy', 'Đúng: decide + to V.'], ['buying', 'Sai: decide không đi với V-ing.'], ['buy', 'Sai: thiếu to.']], a: 0 },
    { t: 'mc', q: 'He stopped ______ because the doctor told him to.', o: [['smoking', 'Đúng: thôi hút thuốc.'], ['to smoke', 'Sai nghĩa: dừng lại để hút.'], ['smoke', 'Sai: thiếu -ing.']], a: 0 },
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
    ['Continuous', 'S + must / might + be + V-ing', 'She isn’t answering. She might be driving.', 'Suy đoán việc đang xảy ra.']
  ],
  ex: [['Today, a complete copy of one book could sell for more than 35 million dollars.', 'Ngày nay, một bản trọn vẹn của một cuốn sách có thể bán được hơn 35 triệu đô la.', 'b1-p1-01'], ['The reading is 0.5 mm too big; the probe might be dirty.', 'Kết quả đo lớn hơn 0,5 mm; có thể đầu dò bị bẩn.']],
  errors: [['He mustn’t be at home — his car is not here.', 'He can’t be at home — his car is not here.', 'Suy đoán phủ định dùng can’t; mustn’t nghĩa là “không được phép”.'], ['She must to be tired.', 'She must be tired.', 'Sau must không có to.'], ['It might is broken.', 'It might be broken.', 'Sau might là V nguyên mẫu: be.']],
  note: '6 câu: ba mức chắc chắn và lỗi mustn’t / can’t.',
  q: [
    { t: 'mc', q: 'He has worked for 14 hours. He ______ be very tired.', o: [['must', 'Đúng: gần như chắc chắn, có bằng chứng.'], ['can’t', 'Sai nghĩa: ngược lại.'], ['mustn’t', 'Sai: mustn’t là cấm, không phải suy đoán.']], a: 0 },
    { t: 'mc', q: 'That ______ be our part — our parts are black, not white.', o: [['can’t', 'Đúng: chắc chắn không phải.'], ['mustn’t', 'Sai: mustn’t là cấm.'], ['might', 'Sai: có bằng chứng rõ, không phải “có thể”.']], a: 0 },
    { t: 'mc', q: 'I’m not sure where the gauge is. It ______ be in the cabinet.', o: [['might', 'Đúng: không chắc.'], ['must', 'Sai: người nói không chắc.'], ['can’t', 'Sai nghĩa.']], a: 0 },
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
    { t: 'mc', q: 'The new mold ______ right now.', o: [['is being tested', 'Đúng: đang được thử, bị động tiếp diễn.'], ['is testing', 'Sai: khuôn không tự thử.'], ['has tested', 'Sai: thiếu been và sai nghĩa.']], a: 0 },
    { t: 'mc', q: 'Your parts ______ yesterday, so they will arrive on Monday.', o: [['were shipped', 'Đúng: quá khứ, có “yesterday”.'], ['have been shipped', 'Sai: có mốc quá khứ cụ thể.'], ['are shipping', 'Sai: hàng không tự gửi.']], a: 0 },
    { t: 'mc', q: 'All gauges ______ every six months.', o: [['must be calibrated', 'Đúng: quy định, modal + be + V3.'], ['must calibrate', 'Sai: thiếu be (dụng cụ không tự hiệu chuẩn).'], ['must be calibrate', 'Sai: cần V3.']], a: 0 },
    { t: 'gap', q: 'The FAI report ______ (send) to the customer tomorrow.', a: 'will be sent', why: 'Tương lai bị động: will be + V3.' },
    { t: 'error', q: 'Forty-nine copies have kept until today.', wrong: 'kept', fix: 'been kept', why: 'Bị động hoàn thành: have been + V3.' },
    { t: 'order', a: 'The report will be sent on Friday.', why: 'S + will be + V3 + thời gian.' },
    { t: 'write', q: 'Make it passive: “Someone has changed the drawing.”', model: 'The drawing has been changed.', why: 'has been + V3; người làm không quan trọng nên bỏ by someone.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });
