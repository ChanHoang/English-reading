/* B2 grammar path, group 2 (v0.9). Same format as grammar-b2.js.
   Question types: mc (every option has its own explanation), gap, error, order, write (rewrite with a model). */
EI.grammar({ id: 'inversion', n: 9, level: 'B2', title: 'Inversion after negative words', vi: 'Đảo ngữ sau từ phủ định', mins: 10,
  use: ['Đặt một từ hay cụm từ mang nghĩa phủ định hoặc hạn chế (Never, Rarely, Seldom, Not only, No sooner, Hardly, Only then, Not until, Under no circumstances) ở ĐẦU câu để nhấn mạnh; sau đó đảo trợ động từ lên trước chủ ngữ, giống câu hỏi.', 'Dùng nhiều trong văn viết trang trọng, báo cáo, bài phát biểu: Never before had the company lost so much money.', 'Nếu không có trợ động từ (thì hiện tại đơn, quá khứ đơn), thêm do/does/did: Rarely does the machine stop.'],
  forms: [
    ['Never / Rarely / Seldom', 'Never + trợ động từ + S + V', 'Never had the engineers seen such a large crack.', 'Câu thường: The engineers had never seen…'],
    ['Not only … but also', 'Not only + trợ động từ + S + V, but S + also + V', 'Not only did the bridge move, but it also twisted.', 'Chỉ vế đầu đảo ngữ.'],
    ['No sooner … than / Hardly … when', 'No sooner had + S + V3 than…; Hardly had + S + V3 when…', 'No sooner had the test started than the alarm rang.', 'Hai việc xảy ra gần như cùng lúc.'],
    ['Only / Not until', 'Only then / Only after + N / Not until + mệnh đề + trợ động từ + S + V', 'Only after the accident did they change the rules.', 'Đảo ngữ ở mệnh đề CHÍNH, không ở cụm Only after…']
  ],
  ex: [['Rarely do we find a defect on this line.', 'Hiếm khi chúng tôi tìm thấy lỗi trên dây chuyền này.'], ['Not until the customer complained did the supplier check the mold.', 'Mãi đến khi khách hàng phàn nàn, nhà cung cấp mới kiểm tra khuôn.']],
  errors: [['Never I have seen such a mess.', 'Never have I seen such a mess.', 'Sau Never ở đầu câu phải đảo trợ động từ lên trước chủ ngữ.'], ['Rarely the machine stops.', 'Rarely does the machine stop.', 'Thì hiện tại đơn không có trợ động từ: thêm does, động từ về nguyên mẫu.'], ['Only after the test the engineers did agree.', 'Only after the test did the engineers agree.', 'Đảo ngữ ngay sau cụm Only after + danh từ: did + S + V.']],
  note: '6 câu: người Việt hay quên đảo ngữ hoặc quên thêm do/does/did; cũng hay đảo nhầm ở cụm Only after/Not until thay vì mệnh đề chính.',
  q: [
    { t: 'mc', q: 'Never ______ such a strong storm on this coast.', o: [['had people seen', 'Đúng: Never ở đầu câu → đảo trợ động từ had lên trước chủ ngữ people.'], ['people had seen', 'Sai: thiếu đảo ngữ; đây là thứ tự câu thường, chỉ đúng khi never đứng sau chủ ngữ (People had never seen…).'], ['had seen people', 'Sai: đảo cả động từ chính; chỉ trợ động từ đứng trước chủ ngữ.']], a: 0 },
    { t: 'mc', q: 'Not only ______ late, but it also arrived damaged.', o: [['did the shipment arrive', 'Đúng: quá khứ đơn không có trợ động từ → thêm did, động từ về nguyên mẫu (arrive).'], ['the shipment arrived', 'Sai: thiếu đảo ngữ sau Not only ở đầu câu.'], ['did the shipment arrived', 'Sai dạng: sau did dùng động từ nguyên mẫu, không dùng arrived.']], a: 0 },
    { t: 'gap', q: 'No sooner ______ (the test / start) than the power went off.', a: 'had the test started', why: 'No sooner + had + S + V3 + than…: hai việc xảy ra gần như cùng lúc trong quá khứ.' },
    { t: 'error', q: 'Rarely we see such clean parts from a new mold.', wrong: 'we', fix: 'do we', why: 'Rarely ở đầu câu → đảo ngữ; hiện tại đơn thêm do: Rarely do we see…' },
    { t: 'order', a: 'Never had the engineers seen such a crack.', why: 'Never + had + S + V3.' },
    { t: 'write', q: 'Rewrite starting with “Not until”: “They noticed the crack only when the bridge started to shake.”', model: 'Not until the bridge started to shake did they notice the crack.', why: 'Not until + mệnh đề thường, rồi mệnh đề chính đảo ngữ: did they notice.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'reporting-verbs', n: 10, level: 'B2', title: 'Reporting verbs and their patterns', vi: 'Động từ tường thuật và cấu trúc đi kèm', mins: 10,
  use: ['Thay vì chỉ dùng say/tell, tiếng Anh B2 dùng động từ cho biết CÁCH người ta nói: admit (thừa nhận), deny (phủ nhận), refuse (từ chối), warn (cảnh báo), suggest (đề nghị), insist (khăng khăng), accuse (buộc tội)…', 'Mỗi động từ có cấu trúc riêng: deny + V-ing, refuse + to V, warn somebody + (not) to V, accuse somebody of + V-ing, suggest + V-ing hoặc suggest that + S + (should) + V.', 'Học động từ cùng cấu trúc của nó, như học một cụm.'],
  forms: [
    ['+ to V', 'agree / refuse / promise / offer / threaten + to V', 'The supplier refused to replace the parts.', ''],
    ['+ somebody + to V', 'warn / advise / urge / ask / remind + O + (not) to V', 'The engineer warned us not to touch the mold.', 'not đứng trước to.'],
    ['+ V-ing', 'admit / deny / suggest / recommend + V-ing', 'He denied changing the settings.', 'Không dùng to V sau deny, suggest.'],
    ['+ preposition + V-ing', 'accuse O of / blame O for / apologize for / insist on + V-ing', 'The customer accused the factory of hiding the problem.', 'Sau giới từ là V-ing.']
  ],
  ex: [['The manager admitted making a mistake in the report.', 'Quản lý thừa nhận đã mắc lỗi trong báo cáo.'], ['She suggested measuring all five samples again.', 'Cô ấy đề nghị đo lại cả năm mẫu.']],
  errors: [['He denied to change the program.', 'He denied changing the program.', 'deny + V-ing, không dùng to V.'], ['She suggested me to check the drawing.', 'She suggested checking the drawing. / She suggested that I check the drawing.', 'suggest không đi với “O + to V”.'], ['They accused him for stealing data.', 'They accused him of stealing data.', 'accuse somebody OF + V-ing (blame somebody FOR).']],
  note: '6 câu: lỗi phổ biến nhất là dùng to V sau deny/suggest và sai giới từ sau accuse/blame.',
  q: [
    { t: 'mc', q: 'The operator admitted ______ the wrong program.', o: [['using', 'Đúng: admit + V-ing.'], ['to use', 'Sai dạng: admit không đi với to V.'], ['that use', 'Sai: sau that cần một mệnh đề đầy đủ (that he had used…).']], a: 0 },
    { t: 'mc', q: 'The supplier ______ to send new samples by Friday.', o: [['promised', 'Đúng: promise + to V.'], ['suggested', 'Sai: suggest không đi với to V (suggest sending…).'], ['denied', 'Sai: deny + V-ing, và nghĩa “phủ nhận” không hợp câu.']], a: 0 },
    { t: 'gap', q: 'The engineer warned us ______ (not / open) the machine while it was hot.', a: 'not to open', why: 'warn + O + not to V.' },
    { t: 'error', q: 'The customer blamed us of the delay.', wrong: 'of', fix: 'for', why: 'blame somebody FOR something; accuse somebody OF something.' },
    { t: 'order', a: 'She refused to sign the report.', why: 'refuse + to V.' },
    { t: 'write', q: 'Report with “deny”: “I didn’t change the settings,” the operator said.', model: 'The operator denied changing the settings.', why: 'deny + V-ing (hoặc deny having changed).', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'future-in-the-past', n: 11, level: 'B2', title: 'Future in the past', vi: 'Tương lai trong quá khứ', mins: 8,
  use: ['Nói về điều mà ở một thời điểm trong quá khứ người ta dự định, dự đoán hoặc sắp xảy ra: In 1905, nobody knew that the bridge would fall.', 'was/were going to + V: kế hoạch hoặc dự đoán trong quá khứ, thường KHÔNG thành: We were going to visit the factory, but the trip was cancelled.', 'would + V: dự đoán trong quá khứ (thường sau know, think, believe, hope); was about to + V: sắp xảy ra ngay lúc đó.'],
  forms: [
    ['would', 'S + thought/knew/hoped + (that) + S + would + V', 'Engineers believed that the new design would work.', 'Lùi thì của will.'],
    ['was going to', 'S + was/were going to + V', 'They were going to open the bridge in 1908.', 'Thường kèm “but…” khi kế hoạch không thành.'],
    ['was about to', 'S + was/were about to + V (+ when…)', 'The workers were about to leave when the bridge fell.', 'Ngay sắp xảy ra.'],
    ['was to (formal)', 'S + was/were to + V', 'It was to become the longest bridge in the world.', 'Điều đã được định sẵn, hoặc về sau đã xảy ra.']
  ],
  ex: [['I was going to call you, but I forgot.', 'Tôi đã định gọi cho anh, nhưng tôi quên.'], ['Nobody guessed that the small company would become so famous.', 'Không ai đoán rằng công ty nhỏ đó sẽ nổi tiếng đến vậy.']],
  errors: [['In 1900, he thought the plan will work.', 'In 1900, he thought the plan would work.', 'Dự đoán trong quá khứ: will lùi thành would.'], ['We are going to finish yesterday, but the machine broke.', 'We were going to finish yesterday, but the machine broke.', 'Kế hoạch trong quá khứ: was/were going to.'], ['She was about leaving when he called.', 'She was about to leave when he called.', 'be about TO + V.']],
  note: '5 câu: dễ nhầm will/would và quên lùi thì khi kể chuyện.',
  q: [
    { t: 'mc', q: 'At that time, nobody knew that the small crack ______ the whole bridge down.', o: [['would bring', 'Đúng: dự đoán nhìn từ quá khứ (nobody knew) → would + V.'], ['will bring', 'Sai thì: câu kể chuyện quá khứ, will phải lùi thành would.'], ['brings', 'Sai thì: hiện tại đơn không hợp với mốc quá khứ.']], a: 0 },
    { t: 'mc', q: 'We ______ the parts on Monday, but the truck did not come.', o: [['were going to ship', 'Đúng: kế hoạch trong quá khứ không thành → were going to + V.'], ['are going to ship', 'Sai thì: chuyện đã qua (Monday, did not come).'], ['would ship', 'Chưa đúng ở đây: would thường dùng sau think/know/hope; câu nói kế hoạch đã định → were going to.']], a: 0 },
    { t: 'gap', q: 'The workers ______ (about / go) home when the alarm sounded.', a: 'were about to go', why: 'be about to + V: sắp làm thì có việc khác xảy ra.' },
    { t: 'error', q: 'He promised that he will send the report the next day.', wrong: 'will', fix: 'would', why: 'Câu tường thuật quá khứ: will → would.' },
    { t: 'order', a: 'They were going to open the bridge in summer.', why: 'were going to + V: kế hoạch trong quá khứ.' }
  ] });

EI.grammar({ id: 'unreal-past', n: 12, level: 'B2', title: 'Unreal past: it’s time, would rather, as if', vi: 'Quá khứ giả định: it’s time, would rather, as if', mins: 8,
  use: ['Một số cụm dùng thì QUÁ KHỨ nhưng nói về HIỆN TẠI hoặc tương lai, vì điều đó không có thật hoặc chưa xảy ra.', 'It’s (high) time + S + V2: đã đến lúc phải làm (mà chưa làm): It’s time we changed the old machine.', 'would rather + S + V2: muốn người KHÁC làm gì; as if / as though + V2: như thể (không đúng sự thật). Với chính mình: would rather + V (I’d rather stay).'],
  forms: [
    ['It’s time', 'It’s (high/about) time + S + V2 / It’s time + to V', 'It’s high time the company replaced this mold.', 'high/about nhấn mạnh “đã muộn rồi”.'],
    ['would rather (other person)', 'S + would rather + S2 + V2', 'I’d rather you didn’t change the program.', 'Phủ định: didn’t + V.'],
    ['would rather (yourself)', 'S + would rather + V (+ than + V)', 'I’d rather check it again than send a wrong report.', 'Cùng chủ ngữ: không lùi thì.'],
    ['as if / as though', 'S + V + as if + S + V2 (were)', 'He talks as if he were the manager.', 'were dùng cho mọi ngôi trong văn trang trọng.']
  ],
  ex: [['It’s time we wrote a new MSOP for this part.', 'Đã đến lúc chúng ta viết MSOP mới cho chi tiết này.'], ['I’d rather the customer didn’t visit this week.', 'Tôi mong khách hàng đừng đến thăm tuần này.']],
  errors: [['It’s time we change the supplier.', 'It’s time we changed the supplier.', 'Sau It’s time + S dùng quá khứ (changed), dù nghĩa là hiện tại.'], ['I’d rather you don’t tell him.', 'I’d rather you didn’t tell him.', 'would rather + người khác + quá khứ (didn’t).'], ['I’d rather to stay here.', 'I’d rather stay here.', 'would rather + V nguyên mẫu, không có to.']],
  note: '5 câu: điểm khó là dùng quá khứ để nói hiện tại, ngược với cảm giác thông thường.',
  q: [
    { t: 'mc', q: 'It’s high time we ______ the old gauges.', o: [['replaced', 'Đúng: It’s high time + S + V2, nói về việc nên làm từ lâu.'], ['replace', 'Sai thì: sau It’s time + S dùng quá khứ.'], ['will replace', 'Sai: không dùng will sau It’s time.']], a: 0 },
    { t: 'mc', q: 'I’d rather you ______ the samples before lunch.', o: [['sent', 'Đúng: would rather + người khác + V2.'], ['send', 'Chưa đúng ở đây: would rather + V nguyên mẫu chỉ khi cùng chủ ngữ (I’d rather send…).'], ['to send', 'Sai dạng: không có to sau would rather.']], a: 0 },
    { t: 'gap', q: 'He looked at the drawing as if he ______ (never / see) it before.', a: 'had never seen', why: 'as if + quá khứ hoàn thành cho điều không có thật trong quá khứ.' },
    { t: 'error', q: 'It’s time we start the meeting.', wrong: 'start', fix: 'started', why: 'It’s time + S + V2: started.' },
    { t: 'order', a: 'I would rather stay late than make a mistake.', why: 'would rather + V + than + V (cùng chủ ngữ).' }
  ] });

EI.grammar({ id: 'relative-prepositions', n: 13, level: 'B2', title: 'Relative clauses with prepositions', vi: 'Mệnh đề quan hệ có giới từ', mins: 8,
  use: ['Khi động từ đi với giới từ (depend on, talk about, belong to…), giới từ có thể đứng ở CUỐI mệnh đề (thân mật) hoặc TRƯỚC which/whom (trang trọng): the man who I spoke to / the man to whom I spoke.', 'Sau giới từ chỉ dùng which (vật) và whom (người), không dùng that hay who.', 'Các cụm hay gặp trong văn viết: in which, by which, during which, some of whom, most of which, none of which.'],
  forms: [
    ['Informal', 'N + (that/which/who) + S + V + prep', 'This is the machine (that) I told you about.', 'Có thể bỏ that/which/who.'],
    ['Formal', 'N + prep + which/whom + S + V', 'This is the machine about which I told you.', 'Không bỏ which/whom.'],
    ['Quantity', 'N, some/most/all/none of + which/whom + V', 'We tested ten samples, two of which failed.', 'Có dấu phẩy.'],
    ['Place / time', 'N + in which / during which (= where / when)', 'the period during which the factory was closed', '']
  ],
  ex: [['The company for which she works makes car parts.', 'Công ty mà cô ấy làm việc sản xuất linh kiện ô tô.'], ['The inspectors, most of whom were young, worked all night.', 'Các nhân viên kiểm tra, phần lớn còn trẻ, làm việc suốt đêm.']],
  errors: [['the man to who I spoke', 'the man to whom I spoke', 'Sau giới từ dùng whom, không dùng who.'], ['the report in that we found the error', 'the report in which we found the error', 'Sau giới từ không dùng that.'], ['We have five suppliers, two of them are in Japan.', 'We have five suppliers, two of whom are in Japan.', 'Nối hai mệnh đề thành một câu: dùng of whom/of which.']],
  note: '5 câu: tập trung vào chọn which/whom sau giới từ và cụm “some of whom/which”.',
  q: [
    { t: 'mc', q: 'The engineer ______ we sent the report has left the company.', o: [['to whom', 'Đúng: send something TO somebody → giới từ to + whom (người).'], ['to who', 'Sai: sau giới từ dùng whom, không dùng who.'], ['to that', 'Sai: sau giới từ không dùng that.']], a: 0 },
    { t: 'mc', q: 'We checked twenty parts, three ______ had cracks.', o: [['of which', 'Đúng: some/three of + which (vật) nối hai mệnh đề.'], ['of them', 'Sai: “of them” tạo hai mệnh đề độc lập nối bằng dấu phẩy, sai ngữ pháp.'], ['of whom', 'Sai: whom dùng cho người; parts là vật.']], a: 0 },
    { t: 'gap', q: 'This is the period ______ which the factory was closed. (giới từ chỉ thời gian kéo dài)', a: 'during', why: 'during which = trong suốt khoảng thời gian mà.' },
    { t: 'error', q: 'The customer, all of who were satisfied, signed the PPAP.', wrong: 'who', fix: 'whom', why: 'all/some/most of + whom (người).' },
    { t: 'order', a: 'This is the fixture about which I told you.', why: 'Giới từ + which (trang trọng).' }
  ] });

EI.grammar({ id: 'purpose-clauses', n: 14, level: 'B2', title: 'Purpose: so that, in order to, in case', vi: 'Chỉ mục đích: so that, in order to, in case', mins: 8,
  use: ['in order to / so as to + V: mục đích (trang trọng hơn to V); phủ định là in order not to / so as not to + V.', 'so that + S + can/could/will/would + V: mục đích khi hai vế có chủ ngữ khác nhau hoặc cần động từ khuyết thiếu.', 'in case + S + V (hiện tại, không dùng will): phòng khi điều gì xảy ra. Khác với if: in case = chuẩn bị trước, dù việc có xảy ra hay không.'],
  forms: [
    ['in order to', 'S + V + in order (not) to + V', 'They closed the road in order to protect drivers.', ''],
    ['so as (not) to', 'S + V + so as (not) to + V', 'Hold the part gently so as not to scratch it.', ''],
    ['so that', 'S + V + so that + S2 + can/could/would + V', 'He wrote clear notes so that the night shift could follow them.', 'Quá khứ dùng could/would.'],
    ['in case', 'S + V + in case + S + V (present)', 'Take an extra probe in case the first one breaks.', 'Không dùng will sau in case.']
  ],
  ex: [['We measure five samples so that we can see the variation.', 'Chúng tôi đo năm mẫu để có thể thấy độ dao động.'], ['Keep the old fixture in case the new one does not fit.', 'Giữ lại đồ gá cũ phòng khi đồ gá mới không vừa.']],
  errors: [['Hold it carefully in order to not drop it.', 'Hold it carefully in order not to drop it.', 'not đứng trước to: in order not to.'], ['Take a jacket in case it will rain.', 'Take a jacket in case it rains.', 'Sau in case dùng hiện tại đơn, không dùng will.'], ['I came early so that to start the CMM.', 'I came early (in order) to start the CMM. / I came early so that I could start the CMM.', 'so that + mệnh đề; to V không đi sau so that.']],
  note: '5 câu: lỗi chính là vị trí của not, will sau in case, và trộn so that với to V.',
  q: [
    { t: 'mc', q: 'The engineers added steel beams ______ the bridge would not move in the wind.', o: [['so that', 'Đúng: so that + mệnh đề có chủ ngữ riêng (the bridge) + would + V.'], ['in order to', 'Sai: in order to + V, không đi với một mệnh đề có chủ ngữ.'], ['in case', 'Chưa đúng ở đây: in case = phòng khi; câu nói mục đích (để cầu không rung).']], a: 0 },
    { t: 'mc', q: 'Bring the old drawing ______ the customer asks about the change.', o: [['in case', 'Đúng: in case + hiện tại đơn = phòng khi.'], ['so that', 'Sai: so that chỉ mục đích; mang bản vẽ không làm cho khách hỏi.'], ['in order to', 'Sai: in order to + V, không đi với mệnh đề.']], a: 0 },
    { t: 'gap', q: 'Wear gloves so as ______ (not / leave) marks on the part.', a: 'not to leave', why: 'so as not to + V.' },
    { t: 'error', q: 'We keep spare parts in case the machine stop.', wrong: 'stop', fix: 'stops', why: 'Sau in case dùng hiện tại đơn, chủ ngữ số ít: in case the machine stops (không dùng will).' },
    { t: 'order', a: 'He left early so that he could catch the train.', why: 'so that + S + could + V (quá khứ).' }
  ] });

EI.grammar({ id: 'quantifiers-b2', n: 15, level: 'B2', title: 'Both, either, neither, none, each', vi: 'Both, either, neither, none, each', mins: 8,
  use: ['both (cả hai), either (một trong hai, cái nào cũng được), neither (không cái nào trong hai) dùng cho HAI người/vật; none (không cái nào) dùng cho ba trở lên hoặc số lượng không đếm.', 'both … and, either … or, neither … nor nối hai ý: Neither the drawing nor the sample was correct.', 'each (mỗi, từng cái riêng) + danh từ số ít, động từ số ít; each of + danh từ số nhiều + động từ số ít.'],
  forms: [
    ['both', 'both + N số nhiều / both of + the/our… + N / both A and B', 'Both machines failed the test.', 'Động từ số nhiều.'],
    ['either / neither', 'either/neither + N số ít; either/neither of + the + N số nhiều', 'Neither sample passed.', 'Thường động từ số ít.'],
    ['neither … nor / either … or', 'Neither A nor B + V (hợp với B)', 'Neither the manager nor the engineers were happy.', 'Động từ hợp với danh từ gần nhất.'],
    ['none / each', 'none of + the + N; each + N số ít; each of + the + N số nhiều + V số ít', 'Each of the cavities was measured.', '']
  ],
  ex: [['Both cavities have the same problem.', 'Cả hai lòng khuôn đều có cùng vấn đề.'], ['None of the five samples was out of tolerance.', 'Không mẫu nào trong năm mẫu nằm ngoài dung sai.']],
  errors: [['Neither of the samples were good.', 'Neither of the samples was good.', 'neither of + N số nhiều thường đi với động từ số ít trong văn viết.'], ['Each parts has a label.', 'Each part has a label.', 'each + danh từ số ít.'], ['Neither the drawing or the model was correct.', 'Neither the drawing nor the model was correct.', 'neither đi với nor; either đi với or.']],
  note: '5 câu: tập trung vào cặp neither/nor, either/or và động từ số ít sau each.',
  q: [
    { t: 'mc', q: 'We tested two gauges, but ______ of them was accurate.', o: [['neither', 'Đúng: hai cái, không cái nào → neither.'], ['none', 'Chưa đúng ở đây: none dùng cho ba trở lên; ở đây chỉ có hai gauge.'], ['either', 'Sai nghĩa: either = cái nào cũng được, mang nghĩa khẳng định.']], a: 0 },
    { t: 'mc', q: 'Each of the twelve cavities ______ measured twice.', o: [['was', 'Đúng: each of + N số nhiều + động từ số ít.'], ['were', 'Sai: chủ ngữ thật là each (mỗi cái), số ít.'], ['have been', 'Sai: số nhiều và sai thì.']], a: 0 },
    { t: 'gap', q: '______ the customer nor the supplier wanted to pay for the new mold.', a: 'Neither', why: 'Neither … nor = không ai trong hai.' },
    { t: 'error', q: 'Both of the sample failed the test.', wrong: 'sample', fix: 'samples', why: 'both of the + danh từ số nhiều.' },
    { t: 'order', a: 'Neither of the samples was accepted.', why: 'Neither of + the + N số nhiều + động từ số ít.' }
  ] });

EI.grammar({ id: 'passive-advanced', n: 16, level: 'B2', title: 'Passive infinitive and passive -ing', vi: 'Bị động với to V và V-ing', mins: 8,
  use: ['Sau động từ, tính từ hoặc giới từ cần to V hay V-ing, nếu chủ ngữ CHỊU tác động thì dùng dạng bị động: to be + V3 hoặc being + V3.', 'to be + V3: The parts need to be measured again. having been + V3: việc bị động đã xảy ra trước.', 'being + V3: He hates being interrupted. After being checked, the samples were sent.'],
  forms: [
    ['to be + V3', 'S + want/need/expect/hope + to be + V3', 'The report needs to be sent today.', ''],
    ['being + V3', 'S + enjoy/avoid/remember/hate + being + V3; prep + being + V3', 'Nobody likes being told what to do.', ''],
    ['to have been + V3', 'S + seem/appear/is said + to have been + V3', 'The mold seems to have been damaged during shipping.', 'Bị động, đã xảy ra trước.'],
    ['having been + V3', 'Having been + V3, S + V', 'Having been rejected twice, the design was changed.', 'Mệnh đề phân từ bị động hoàn thành.']
  ],
  ex: [['The samples are expected to be delivered on Monday.', 'Các mẫu dự kiến được giao vào thứ Hai.'], ['After being repaired, the machine worked perfectly.', 'Sau khi được sửa, cỗ máy chạy hoàn hảo.']],
  errors: [['The drawing needs to update.', 'The drawing needs to be updated.', 'Bản vẽ ĐƯỢC cập nhật: to be + V3.'], ['He was angry about being not invited.', 'He was angry about not being invited.', 'not đứng trước being.'], ['The bridge seems to have damaged.', 'The bridge seems to have been damaged.', 'Cây cầu bị hỏng: to have been + V3.']],
  note: '5 câu: điểm khó là nhận ra chủ ngữ chịu tác động khi động từ đứng sau need, want, avoid, after.',
  q: [
    { t: 'mc', q: 'All the gauges need ______ before the audit.', o: [['to be calibrated', 'Đúng: gauge ĐƯỢC hiệu chuẩn → need + to be + V3.'], ['to calibrate', 'Sai: chủ động nghĩa là gauge tự hiệu chuẩn.'], ['being calibrate', 'Sai dạng: cần V3 (calibrated) và need ở đây đi với to.']], a: 0 },
    { t: 'mc', q: 'The bridge appears ______ badly during the storm.', o: [['to have been damaged', 'Đúng: việc bị hỏng xảy ra trước, bị động → to have been + V3.'], ['to be damaging', 'Sai: chủ động tiếp diễn, cây cầu không tự gây hỏng.'], ['to damage', 'Sai: chủ động và sai thời điểm.']], a: 0 },
    { t: 'gap', q: 'Nobody likes ______ (tell) that their work is wrong.', a: 'being told', why: 'like + being + V3 (bị động).' },
    { t: 'error', q: 'The new design is expected to approve next week.', wrong: 'approve', fix: 'be approved', why: 'Thiết kế ĐƯỢC duyệt: to be + V3.' },
    { t: 'order', a: 'After being checked, the parts were packed.', why: 'After + being + V3.' }
  ] });
