/* B2 grammar path, group 1 (v0.7). Same format as grammar-b1.js. Examples marked with a reading id come from that story.
   Question types: mc (every option has its own explanation), gap, error, order, write (rewrite with a model). */
EI.grammar({ id: 'mixed-conditionals', n: 1, level: 'B2', title: 'Mixed conditionals', vi: 'Câu điều kiện hỗn hợp', mins: 10,
  use: ['Điều kiện ở QUÁ KHỨ, kết quả ở HIỆN TẠI: If we had checked the drawing (hôm qua, đã không kiểm), we would not have this problem now (bây giờ).', 'Điều kiện là sự thật HIỆN TẠI (hay luôn đúng), kết quả ở QUÁ KHỨ: If I were more careful (tính tôi vốn không cẩn thận), I would have seen the mistake (hôm đó).', 'Hai vế khác mốc thời gian, nên mỗi vế dùng đúng dạng của mốc của nó; dấu hiệu là now, today, still hoặc yesterday, last week.'],
  forms: [
    ['Past → present', 'If + S + had + V3, S + would + V', 'If the mirror had been tested properly, the telescope would work perfectly today.', 'Vế if là loại 3, vế chính là loại 2.'],
    ['Present → past', 'If + S + V2 (were), S + would have + V3', 'If he spoke English, he would have understood the customer yesterday.', 'Vế if là loại 2, vế chính là loại 3.'],
    ['Negative', 'If + S + had not + V3, S + would not / might + V', 'If they had not changed the supplier, we would not have these defects now.', 'might/could thay would khi chưa chắc.'],
    ['Question', 'What would + S + V + if + S + had + V3?', 'Where would you be now if you had not taken that job?', 'Câu hỏi dùng thứ tự của vế chính.']
  ],
  ex: [['If I had studied English at school, I would not need to learn it now.', 'Nếu hồi đi học tôi học tiếng Anh thì giờ tôi không phải học nữa.'], ['If the operator were more experienced, he would have noticed the flash on the part.', 'Nếu người vận hành có kinh nghiệm hơn thì anh ấy đã nhận ra bavia trên chi tiết.']],
  errors: [['If we had checked the mold, we would not have this problem yesterday.', 'If we had checked the mold, we would not have had this problem yesterday.', '“yesterday” là quá khứ: vế chính cần would have + V3. Chỉ dùng would + V khi kết quả ở hiện tại (now, today).'], ['If I would have known, I would tell you.', 'If I had known, I would have told you.', 'Không dùng would trong vế if; vế if quá khứ là had + V3.'], ['If he was here now, he would have fixed it already.', 'If he were here now, he would fix it.', 'Hai vế cùng nói về bây giờ: dùng loại 2 cho cả hai, không phải câu hỗn hợp.']],
  note: '6 câu: chọn đúng mốc thời gian cho từng vế là điểm khó nhất, vì tiếng Việt không đổi dạng động từ.',
  q: [
    { t: 'mc', q: 'If they had fixed the gate last month, the parts ______ short shots now.', o: [['would not have', 'Đúng: điều kiện ở quá khứ (last month), kết quả ở hiện tại (now) → would + V.'], ['would not have had', 'Sai: would have + V3 nói về kết quả trong quá khứ; câu có “now” nên kết quả ở hiện tại.'], ['will not have', 'Sai: will dùng cho tình huống có thật ở tương lai; đây là giả định trái với sự thật (họ đã không sửa).']], a: 0 },
    { t: 'mc', q: 'If I ______ more patient, I would have waited for the second test.', o: [['were', 'Đúng: tính cách hiện tại (không kiên nhẫn) → vế if loại 2 (were); kết quả quá khứ → would have waited.'], ['had been', 'Chưa đúng ở đây: had been nói về một lần trong quá khứ; câu này nói tính cách vốn có của tôi, nên dùng were. (Với một tình huống chỉ xảy ra hôm đó thì had been đúng.)'], ['would be', 'Sai: không dùng would trong vế if.']], a: 0 },
    { t: 'gap', q: 'If she ______ (not / leave) the company in 2020, she would be our manager now.', a: 'had not left', why: 'Việc rời công ty ở quá khứ (2020) → had not + V3; kết quả bây giờ → would be.' },
    { t: 'error', q: 'If we had checked the mold last week, we would not have this problem yesterday.', wrong: 'have', fix: 'have had', why: '“yesterday” là quá khứ, nên vế chính cũng ở quá khứ: would not have had (loại 3). Chỉ dùng would + V khi kết quả ở bây giờ (now, today).' },
    { t: 'order', a: 'If we had ordered more steel, we would not be waiting now.', why: 'had ordered (quá khứ) → would not be waiting (đang chờ bây giờ).' },
    { t: 'write', q: 'Rewrite as one sentence: “I didn’t learn to drive. Now I can’t get to the new factory easily.”', model: 'If I had learned to drive, I could get to the new factory easily now.', why: 'Quá khứ → hiện tại: If + had V3, could/would + V.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'past-perfect-continuous', n: 2, level: 'B2', title: 'Past perfect continuous', vi: 'Thì quá khứ hoàn thành tiếp diễn', mins: 8,
  use: ['Việc đã kéo dài một thời gian TRƯỚC một mốc trong quá khứ, nhấn mạnh quá trình: When the inspector arrived, we had been waiting for two hours.', 'Giải thích nguyên nhân của một tình trạng trong quá khứ: His hands were black because he had been repairing the machine.', 'Động từ trạng thái (know, believe, own…) dùng quá khứ hoàn thành thường: They had known each other for years.'],
  forms: [
    ['Affirmative', 'S + had been + V-ing', 'Scientists had been arguing about the cause for decades.', 'had been dùng cho mọi chủ ngữ.'],
    ['Negative', 'S + had not been + V-ing', 'The machine had not been working well for weeks.', ''],
    ['Question', 'Had + S + been + V-ing?', 'Had they been testing the parts before the problem started?', ''],
    ['How long', 'How long had + S + been + V-ing?', 'How long had he been working there when he was promoted?', 'Câu hỏi thường gặp nhất với thì này.']
  ],
  ex: [['By 1990, NASA had been planning the telescope for more than twenty years.', 'Đến năm 1990, NASA đã lên kế hoạch cho kính thiên văn suốt hơn hai mươi năm.'], ['The operator was tired because he had been working since five o’clock.', 'Người vận hành mệt vì anh ấy đã làm việc từ năm giờ.']],
  errors: [['When I arrived, they were waiting for two hours.', 'When I arrived, they had been waiting for two hours.', 'Có khoảng thời gian (for two hours) kéo dài đến một mốc quá khứ: dùng had been + V-ing.'], ['She had been knowing him for years.', 'She had known him for years.', 'know là động từ trạng thái: dùng had + V3.'], ['He had been finished the report.', 'He had finished the report.', 'Việc đã xong (kết quả) dùng had + V3; had been + V-ing là quá trình.']],
  note: '5 câu: phân biệt với quá khứ hoàn thành (kết quả) và quá khứ tiếp diễn (đang làm ở một thời điểm).',
  q: [
    { t: 'mc', q: 'By the time the customer called, we ______ the samples for three days.', o: [['had been measuring', 'Đúng: quá trình kéo dài ba ngày tính đến một mốc quá khứ (khi khách gọi) → had been + V-ing.'], ['were measuring', 'Sai: quá khứ tiếp diễn chỉ nói việc đang diễn ra lúc đó, không đi với “for three days” tính đến mốc.'], ['have been measuring', 'Sai: hiện tại hoàn thành tiếp diễn tính đến BÂY GIỜ; câu này tính đến lúc khách gọi (quá khứ).']], a: 0 },
    { t: 'mc', q: 'They ______ each other for ten years before they started the company.', o: [['had known', 'Đúng: know là động từ trạng thái, không dùng tiếp diễn → had known.'], ['had been knowing', 'Sai: động từ trạng thái (know, own, believe) không dùng dạng tiếp diễn.'], ['knew', 'Chưa đúng ở đây: quá khứ đơn không thể hiện “đã quen trước đó suốt mười năm” tính đến mốc lập công ty.']], a: 0 },
    { t: 'gap', q: 'The floor was wet because it ______ (rain) all night.', a: 'had been raining', why: 'Nguyên nhân của một tình trạng trong quá khứ: had been + V-ing.' },
    { t: 'error', q: 'How long had you been work there when you met her?', wrong: 'work', fix: 'working', why: 'had been + V-ing.' },
    { t: 'order', a: 'He had been working there for six years.', why: 'had been + V-ing + for + khoảng thời gian.' }
  ] });

EI.grammar({ id: 'past-modals', n: 3, level: 'B2', title: 'Modal verbs about the past', vi: 'Động từ khuyết thiếu nói về quá khứ: should have, could have, needn’t have', mins: 10,
  use: ['should have + V3: lẽ ra nên làm (nhưng đã không làm) — dùng để trách hoặc tiếc: We should have checked the units.', 'could have + V3: đã có thể xảy ra / đã có thể làm (nhưng không xảy ra): The plane could have crashed.', 'needn’t have + V3: đã làm nhưng hóa ra không cần; khác didn’t need to (không cần nên không làm). must have / can’t have + V3 để suy đoán đã học ở B1 (modals-deduction).'],
  forms: [
    ['should have', 'S + should (not) have + V3', 'The engineers should have tested the mirror as a whole.', 'Viết tắt nói: should’ve /ˈʃʊdəv/ — không viết “should of”.'],
    ['could have', 'S + could have + V3', 'The mistake could have been found before launch.', 'Bị động: could have been + V3.'],
    ['needn’t have', 'S + needn’t have + V3', 'We needn’t have brought the gauges — the customer had their own.', 'Đã mang theo, nhưng không cần.'],
    ['didn’t need to', 'S + didn’t need to + V', 'We didn’t need to bring the gauges, so we left them in the lab.', 'Không cần, nên đã không mang.']
  ],
  ex: [['Someone should have noticed that the numbers did not agree.', 'Lẽ ra phải có ai đó nhận ra các con số không khớp nhau.'], ['You needn’t have measured all thirty parts; the customer only asked for five.', 'Bạn không cần đo hết ba mươi chi tiết đâu; khách chỉ yêu cầu năm cái.']],
  errors: [['We should checked the drawing.', 'We should have checked the drawing.', 'Nói về quá khứ: should + have + V3.'], ['You should of told me.', 'You should have told me.', '“should’ve” nghe giống “should of”, nhưng viết là should have.'], ['I needn’t have go there.', 'I needn’t have gone there.', 'Sau have là V3 (gone).']],
  note: '6 câu: should have / could have, và cặp dễ nhầm needn’t have ↔ didn’t need to.',
  q: [
    { t: 'mc', q: 'The parts failed at the customer. We ______ the material certificate.', o: [['should have checked', 'Đúng: lẽ ra nên kiểm (nhưng đã không kiểm) → should have + V3, dùng để tự trách.'], ['must have checked', 'Sai nghĩa: must have + V3 là suy đoán “chắc hẳn đã kiểm”, ngược với ý câu.'], ['should check', 'Sai: should + V nói lời khuyên cho hiện tại hoặc tương lai; câu nói về việc đã xảy ra.']], a: 0 },
    { t: 'mc', q: 'I took a taxi to the airport, but the flight was late. I ______ so fast.', o: [['needn’t have hurried', 'Đúng: đã vội, nhưng hóa ra không cần → needn’t have + V3.'], ['didn’t need to hurry', 'Chưa đúng ở đây: didn’t need to thường nghĩa là “không cần nên đã không vội”; người nói thực tế đã vội.'], ['mustn’t have hurried', 'Sai: mustn’t là “cấm”; không có dạng mustn’t have để nói việc đã làm thừa.']], a: 0 },
    { t: 'mc', q: 'The driver was lucky. The accident ______ much worse.', o: [['could have been', 'Đúng: điều đã có thể xảy ra nhưng không xảy ra → could have been.'], ['should have been', 'Sai nghĩa: should have been nghĩa là “lẽ ra phải tệ hơn” — như thể người nói mong vậy.'], ['can have been', 'Sai: “can have + V3” hầu như không dùng ở câu khẳng định; dùng could have.']], a: 0 },
    { t: 'gap', q: 'You ______ (not / should / leave) the CMM door open. Dust got inside.', a: 'should not have left', why: 'Trách một việc đã làm: should not have + V3.' },
    { t: 'error', q: 'They should of tested the mold before sending it.', wrong: 'of', fix: 'have', why: 'should have, không viết “should of”.' },
    { t: 'write', q: 'Rewrite with “needn’t have”: “I bought a new caliper, but there was a spare one in the drawer.”', model: 'I needn’t have bought a new caliper.', why: 'Đã mua nhưng hóa ra không cần: needn’t have + V3.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'passive-reporting', n: 4, level: 'B2', title: 'Passive reporting verbs', vi: 'Bị động với động từ tường thuật: It is said that… / He is thought to…', mins: 10,
  use: ['Nói điều “người ta nói / tin / cho rằng” mà không nêu ai nói — rất hay gặp trong tin tức và báo cáo.', 'Hai cách: It + is said / believed / thought / reported + that + mệnh đề; hoặc S + is said / believed + to V.', 'Việc xảy ra TRƯỚC lúc người ta nói: S + is believed + to have + V3: The ship is thought to have sunk in 1628.'],
  forms: [
    ['It … that', 'It + is/was + V3 (said, believed…) + that + clause', 'It is believed that the stone was made in 196 BC.', 'Dùng it làm chủ ngữ giả.'],
    ['Subject + to V', 'S + is/are + V3 + to + V', 'The lake is known to contain a lot of gas.', 'Việc cùng lúc hoặc luôn đúng.'],
    ['Subject + to have V3', 'S + is/was + V3 + to have + V3', 'He is said to have drunk the bacteria himself.', 'Việc xảy ra trước lúc nói.'],
    ['Continuous', 'S + is + V3 + to be + V-ing', 'The company is reported to be planning a new factory.', 'Việc đang diễn ra.']
  ],
  ex: [['It is often said that the queen was the first to wear the dress.', 'Người ta thường nói nữ hoàng là người đầu tiên mặc chiếc váy đó.'], ['The fault is thought to have started in the cooling line.', 'Người ta cho rằng lỗi bắt đầu từ đường nước làm mát.']],
  errors: [['He is said that he is very rich.', 'He is said to be very rich. / It is said that he is very rich.', 'Không trộn hai cấu trúc: hoặc It is said that…, hoặc He is said to…'], ['She is believed to leave the country last year.', 'She is believed to have left the country last year.', 'Việc ở quá khứ (last year) so với lúc nói: to have + V3.'], ['It is believed the stone to be very old.', 'The stone is believed to be very old.', 'Sau It is believed dùng that + mệnh đề, không dùng tân ngữ + to V.']],
  note: '6 câu: hai cách viết, và to V ↔ to have V3 theo mốc thời gian.',
  q: [
    { t: 'mc', q: 'The tomb ______ about 1,300 years old.', o: [['is believed to be', 'Đúng: S + is believed + to V cho điều người ta tin là đúng bây giờ.'], ['is believed that it is', 'Sai: không trộn hai cấu trúc; nói “It is believed that the tomb is…” hoặc “The tomb is believed to be…”.'], ['believes to be', 'Sai: cần bị động (is believed); “the tomb believes” nghĩa là ngôi mộ tự tin.']], a: 0 },
    { t: 'mc', q: 'The ship ______ in a storm in 1880.', o: [['is thought to have sunk', 'Đúng: việc chìm tàu (1880) xảy ra trước lúc người ta nghĩ (bây giờ) → to have + V3.'], ['is thought to sink', 'Sai: to + V nói việc cùng thời điểm hoặc luôn đúng; năm 1880 cần to have sunk.'], ['is thought that it sank', 'Sai: dùng it làm chủ ngữ mới nối với that: It is thought that the ship sank…']], a: 0 },
    { t: 'gap', q: 'It ______ (report) that the factory will close next year.', a: 'is reported', why: 'It + is + V3 + that + mệnh đề.' },
    { t: 'error', q: 'She is believed to leave the country last year.', wrong: 'leave', fix: 'have left', why: 'Việc ở quá khứ (last year) so với lúc người ta tin (bây giờ): is believed to have + V3.' },
    { t: 'order', a: 'He is said to have worked there for twenty years.', why: 'S + is said + to have + V3.' },
    { t: 'write', q: 'Rewrite starting with “The machine”: “People think that the machine broke because of the heat.”', model: 'The machine is thought to have broken because of the heat.', why: 'Việc hỏng xảy ra trước lúc người ta nghĩ: is thought to have + V3.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'participle-clauses', n: 5, level: 'B2', title: 'Participle clauses', vi: 'Mệnh đề phân từ: Having finished…, Built in…, …, using…', mins: 10,
  use: ['Rút gọn mệnh đề khi hai vế CÙNG chủ ngữ, làm câu gọn hơn trong văn viết và báo cáo.', 'V-ing: hai việc cùng lúc hoặc việc gây ra kết quả: Using a new fixture, we reduced the cycle time. Having + V3: việc xảy ra TRƯỚC: Having checked the drawing, she started the measurement.', 'V3 (nghĩa bị động): Built in 1173, the tower began to lean five years later. Lỗi lớn nhất: chủ ngữ của mệnh đề phân từ phải là chủ ngữ của câu chính.'],
  forms: [
    ['Active, same time', 'V-ing …, S + V', 'Walking into the room, he saw the broken window.', '= When he walked into the room…'],
    ['Active, before', 'Having + V3 …, S + V', 'Having finished the report, she sent it to the customer.', '= After she had finished…'],
    ['Passive', 'V3 …, S + V', 'Made of glass, the mirror weighed almost a ton.', '= The mirror, which was made of glass,…'],
    ['Result', 'S + V …, V-ing', 'The tower leaned further each year, making the engineers nervous.', 'V-ing ở cuối câu nói kết quả.']
  ],
  ex: [['Having found the error, the team corrected the program.', 'Sau khi tìm ra lỗi, nhóm sửa lại chương trình.'], ['Measured on the CMM, the hole was 0.02 mm too small.', 'Khi đo trên máy CMM, lỗ nhỏ hơn 0,02 mm.']],
  errors: [['Walking to the lab, the CMM was already on.', 'Walking to the lab, I saw that the CMM was already on.', 'Chủ ngữ của “walking” phải là người đi bộ, không phải máy CMM.'], ['Finished the test, he went home.', 'Having finished the test, he went home.', 'Việc trước (chủ động): Having + V3, không dùng V3 một mình.'], ['Building in 1173, the tower is famous.', 'Built in 1173, the tower is famous.', 'Tháp được xây (bị động): dùng V3.']],
  note: '6 câu: chọn V-ing / Having V3 / V3, và lỗi chủ ngữ không khớp.',
  q: [
    { t: 'mc', q: '______ the drawing, she noticed that the tolerance was missing.', o: [['Reading', 'Đúng: chủ động, cùng lúc (khi đang đọc thì nhận ra) → V-ing; chủ ngữ là she.'], ['Read', 'Sai: V3 mang nghĩa bị động (“được đọc”), nhưng cô ấy là người đọc.'], ['Having been read', 'Sai: bị động hoàn thành nghĩa là “cô ấy đã bị đọc”.']], a: 0 },
    { t: 'mc', q: '______ in 1990, the telescope sent back blurred pictures.', o: [['Launched', 'Đúng: kính thiên văn ĐƯỢC phóng (bị động) → V3.'], ['Launching', 'Sai: V-ing chủ động nghĩa là kính thiên văn tự phóng một cái gì đó.'], ['Having launched', 'Sai: Having + V3 chủ động: kính thiên văn đã phóng cái gì đó.']], a: 0 },
    { t: 'mc', q: '______ all the parts, the inspector wrote the report.', o: [['Having measured', 'Đúng: việc đo xong TRƯỚC việc viết báo cáo, chủ động → Having + V3.'], ['Measured', 'Sai: V3 một mình mang nghĩa bị động (“được đo”), không hợp với người kiểm tra.'], ['To measure', 'Chưa đúng ở đây: to + V ở đầu câu nghĩa là “để đo”; câu muốn nói “sau khi đo xong”.']], a: 0 },
    { t: 'error', q: 'Opening the box, the parts were all damaged.', wrong: 'parts', fix: 'I found that the parts', why: 'Chủ ngữ của “opening” phải là người mở hộp: Opening the box, I found that the parts were all damaged.' },
    { t: 'order', a: 'Having checked the drawing, she started the measurement.', why: 'Having + V3 cho việc xảy ra trước.' },
    { t: 'write', q: 'Rewrite with a participle clause: “The mold was made in Taiwan. It arrived two weeks late.”', model: 'Made in Taiwan, the mold arrived two weeks late.', why: 'Khuôn được làm (bị động): V3 ở đầu câu, chủ ngữ the mold.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'cleft-sentences', n: 6, level: 'B2', title: 'Cleft sentences', vi: 'Câu chẻ để nhấn mạnh: It was … that…, What … is…', mins: 8,
  use: ['Nhấn mạnh MỘT phần của câu (người, vật, thời gian, lý do): It was the units, not the program, that caused the problem.', 'What + mệnh đề + is/was + …: đưa thông tin mới, quan trọng ra cuối câu: What surprised everyone was the size of the error.', 'Hay dùng để sửa một hiểu lầm: It wasn’t Smith who found the tomb — it was Mrs. Pretty’s worker.'],
  forms: [
    ['It … that', 'It + is/was + phần nhấn mạnh + that/who + phần còn lại', 'It was in 1990 that the problem was found.', 'who cho người, that cho mọi trường hợp.'],
    ['What … be', 'What + S + V + is/was + phần nhấn mạnh', 'What we need is a better fixture.', 'Động từ be chia theo thì của câu.'],
    ['All … be', 'All + S + V + is/was + …', 'All he wanted was a fair test.', '= Điều duy nhất…'],
    ['The reason … be', 'The reason (why) + clause + is/was + that…', 'The reason the part failed was that the wall was too thin.', 'Không nói “the reason is because” trong văn viết trang trọng.']
  ],
  ex: [['It was a tiny mistake in the test tool that made the mirror the wrong shape.', 'Chính một sai sót nhỏ ở dụng cụ kiểm tra đã làm tấm gương sai hình dạng.'], ['What the customer wants is a report by Friday.', 'Điều khách hàng muốn là một bản báo cáo trước thứ Sáu.']],
  errors: [['It was in 1990 when the telescope was launched.', 'It was in 1990 that the telescope was launched.', 'Câu chẻ dùng that (không dùng when) sau phần nhấn mạnh chỉ thời gian.'], ['What I need it is more time.', 'What I need is more time.', 'Không thêm “it” sau mệnh đề What.'], ['It were the operators who found the defect.', 'It was the operators who found the defect.', 'Luôn dùng It is / It was, kể cả khi phần nhấn mạnh là số nhiều.']],
  note: '5 câu: It … that / What … is, và các lỗi hay gặp.',
  q: [
    { t: 'mc', q: '______ the gate size, not the material, that caused the short shot.', o: [['It was', 'Đúng: câu chẻ luôn bắt đầu bằng It is / It was, dù phần nhấn mạnh là gì.'], ['That was', 'Sai: “That was the gate size…” chỉ là câu thường; muốn nối với “that caused…” phải dùng It was.'], ['There was', 'Sai: There was nói sự tồn tại (“có một…”), không dùng để nhấn mạnh.']], a: 0 },
    { t: 'mc', q: '______ is a clear drawing with all the tolerances.', o: [['What we need', 'Đúng: What + S + V làm chủ ngữ, rồi is + phần nhấn mạnh.'], ['That we need', 'Sai: không dùng That để mở câu chẻ kiểu này.'], ['What do we need', 'Sai: trong câu chẻ, What + S + V theo trật tự câu kể, không đảo như câu hỏi.']], a: 0 },
    { t: 'gap', q: 'It was in 1977 ______ Elvis died.', a: 'that', why: 'It was + thời gian + that…' },
    { t: 'error', q: 'What surprised me it was the price.', wrong: 'it', fix: '(bỏ it)', why: 'What surprised me was the price — không thêm it.' },
    { t: 'write', q: 'Emphasize “the customer”: “The customer found the crack.”', model: 'It was the customer who found the crack.', why: 'It was + người + who…', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'contrast-linkers', n: 7, level: 'B2', title: 'Linkers of contrast', vi: 'Từ nối chỉ sự tương phản: although, despite, whereas, however', mins: 9,
  use: ['although / even though + MỆNH ĐỀ (có chủ ngữ và động từ): Although the test passed, the customer rejected the parts. even though nhấn mạnh hơn.', 'despite / in spite of + DANH TỪ hoặc V-ing (không có mệnh đề): Despite the delay, we finished on time. Muốn dùng mệnh đề: despite the fact that…', 'whereas / while: so sánh hai sự việc khác nhau. however: nối hai CÂU, đứng đầu câu sau và có dấu phẩy.'],
  forms: [
    ['although / even though', 'Although + S + V, S + V', 'Although the mold was new, it had a crack.', 'Không dùng “but” cùng although trong một câu.'],
    ['despite / in spite of', 'Despite / In spite of + N / V-ing, S + V', 'Despite being new, the mold had a crack.', 'despite không có “of”; in spite of có “of”.'],
    ['whereas / while', 'S + V, whereas + S + V', 'Cavity 1 was OK, whereas cavity 2 was out of tolerance.', 'So sánh hai thứ khác nhau.'],
    ['however', 'S + V. However, S + V.', 'The price is low. However, the quality is poor.', 'Đứng đầu câu, sau dấu chấm hoặc chấm phẩy.']
  ],
  ex: [['Even though he had no proof, he refused to give up.', 'Dù không có bằng chứng, ông ấy vẫn không bỏ cuộc.'], ['In spite of the cold, the team kept working outside.', 'Bất chấp trời lạnh, cả đội vẫn làm việc ngoài trời.']],
  errors: [['Although it was late, but we continued.', 'Although it was late, we continued.', 'Tiếng Việt nói “Mặc dù… nhưng…”, tiếng Anh chỉ dùng một trong hai từ.'], ['Despite of the rain, we went out.', 'Despite the rain, we went out.', 'despite không đi với of.'], ['Despite it was raining, we went out.', 'Although it was raining, we went out. / Despite the rain, we went out.', 'despite + danh từ/V-ing, không + mệnh đề.']],
  note: '6 câu: phân biệt từ đi với mệnh đề (although) và từ đi với danh từ (despite), lỗi “mặc dù… nhưng”.',
  q: [
    { t: 'mc', q: '______ the parts looked fine, three of them were out of tolerance.', o: [['Although', 'Đúng: sau chỗ trống là một mệnh đề (the parts looked fine) → although.'], ['Despite', 'Sai: despite + danh từ hoặc V-ing, không + mệnh đề có chủ ngữ và động từ.'], ['However', 'Sai: however nối hai câu riêng (đứng đầu câu sau), không mở một mệnh đề phụ.']], a: 0 },
    { t: 'mc', q: '______ the high price, the customer ordered two more molds.', o: [['In spite of', 'Đúng: sau chỗ trống là cụm danh từ (the high price) → in spite of / despite.'], ['Even though', 'Sai: even though + mệnh đề; “the high price” không có động từ.'], ['Whereas', 'Sai nghĩa: whereas so sánh hai sự việc khác nhau, không phải “bất chấp”.']], a: 0 },
    { t: 'mc', q: 'The old CMM takes 20 minutes, ______ the new one takes only 8.', o: [['whereas', 'Đúng: so sánh hai máy khác nhau → whereas.'], ['despite', 'Sai: despite cần danh từ, và không dùng để so sánh hai vật.'], ['however', 'Chưa đúng ở đây: however phải đứng đầu câu mới (… 20 minutes. However, the new one…), không nối sau dấu phẩy như vậy.']], a: 0 },
    { t: 'error', q: 'Although we worked all night, but the report was not ready.', wrong: 'but', fix: '(bỏ but)', why: 'Đã có although thì không dùng but.' },
    { t: 'gap', q: '______ being tired, he finished the measurement. (one word)', a: 'Despite', why: 'Despite + V-ing.' },
    { t: 'write', q: 'Join with “despite”: “The machine was old. It worked perfectly.”', model: 'Despite being old, the machine worked perfectly.', why: 'Despite + V-ing (cùng chủ ngữ) hoặc Despite its age.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'verb-patterns-meaning', n: 8, level: 'B2', title: 'Verbs that change meaning', vi: 'Động từ đổi nghĩa theo V-ing hay to V: remember, forget, stop, try, regret', mins: 9,
  use: ['remember / forget + V-ing: nhớ / quên việc ĐÃ làm. remember / forget + to V: nhớ / quên việc CẦN làm: Remember to save the program.', 'stop + V-ing: ngừng làm việc đó. stop + to V: dừng lại (việc khác) để làm việc đó: He stopped to answer the phone.', 'try + V-ing: thử một cách xem có hiệu quả không. try + to V: cố gắng làm việc khó. regret + V-ing: tiếc việc đã làm; regret + to V: lấy làm tiếc phải báo (trang trọng): We regret to inform you…'],
  forms: [
    ['remember / forget', '+ V-ing (việc đã qua) / + to V (việc phải làm)', 'I remember measuring that part. / Don’t forget to calibrate the gauge.', ''],
    ['stop', '+ V-ing (thôi làm) / + to V (dừng để làm)', 'He stopped smoking. / He stopped to smoke.', 'Hai câu nghĩa ngược nhau.'],
    ['try', '+ V-ing (thử cách) / + to V (cố gắng)', 'Try cleaning the probe. / I tried to fix it, but I couldn’t.', ''],
    ['regret', '+ V-ing (tiếc đã làm) / + to V (tiếc phải nói)', 'I regret leaving early. / We regret to say that the order is late.', 'regret to V thường gặp trong thư trang trọng.']
  ],
  ex: [['I don’t remember signing that report.', 'Tôi không nhớ đã ký bản báo cáo đó.'], ['If the CMM gives strange numbers, try restarting the software.', 'Nếu máy CMM cho số lạ, hãy thử khởi động lại phần mềm.']],
  errors: [['Please remember sending me the report tomorrow.', 'Please remember to send me the report tomorrow.', 'Việc cần làm (tomorrow): remember + to V.'], ['He stopped to smoke last year and feels better now.', 'He stopped smoking last year and feels better now.', 'Bỏ thuốc là stop + V-ing; stop to smoke là dừng lại để hút.'], ['I regret to tell her the truth yesterday.', 'I regret telling her the truth yesterday.', 'Tiếc việc đã làm (yesterday): regret + V-ing.']],
  note: '6 câu: mỗi động từ một cặp nghĩa; dấu hiệu là việc đã xảy ra hay chưa.',
  q: [
    { t: 'mc', q: 'Did you remember ______ the gauge before the measurement?', o: [['to calibrate', 'Đúng: việc phải làm (trước khi đo) → remember + to V.'], ['calibrating', 'Chưa đúng ở đây: remember calibrating = nhớ là đã hiệu chuẩn (ký ức); câu hỏi kiểm tra xem bạn có nhớ làm việc cần làm không.'], ['calibrate', 'Sai: sau remember không dùng động từ nguyên mẫu không to.']], a: 0 },
    { t: 'mc', q: 'The program kept stopping, so I tried ______ the computer, and it worked.', o: [['restarting', 'Đúng: thử một cách để xem có hiệu quả không → try + V-ing.'], ['to restart', 'Chưa đúng ở đây: try to restart = cố gắng khởi động lại (việc khó); câu nói thử một giải pháp.'], ['restart', 'Sai: sau try cần to V hoặc V-ing.']], a: 0 },
    { t: 'mc', q: 'On the way to the factory, we stopped ______ some coffee.', o: [['to buy', 'Đúng: dừng lại (việc lái xe) để mua → stop + to V.'], ['buying', 'Sai nghĩa: stopped buying = thôi không mua cà phê nữa.'], ['buy', 'Sai: sau stop cần to V hoặc V-ing.']], a: 0 },
    { t: 'gap', q: 'I will never forget ______ (see) the first part come out of the new mold.', a: 'seeing', why: 'Ký ức về việc đã xảy ra: forget + V-ing.' },
    { t: 'error', q: 'We regret informing you that your order will be late.', wrong: 'informing', fix: 'to inform', why: 'Lấy làm tiếc phải báo (thư trang trọng): regret + to V.' },
    { t: 'write', q: 'Use “stop”: “He doesn’t drink coffee any more.”', model: 'He has stopped drinking coffee.', why: 'Thôi làm việc gì: stop + V-ing.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });
