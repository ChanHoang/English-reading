/* A2 grammar path. Each lesson is finished in one sitting. Examples marked with a reading id come from that story.
   Question types: mc (every option has its own explanation), gap, error, order, write (rewrite with a model). */
EI.grammar({ id: 'past-simple', n: 1, level: 'A2', title: 'Past simple', vi: 'Thì quá khứ đơn', mins: 9,
  use: ['Việc đã xảy ra và đã kết thúc ở một thời điểm trong quá khứ (in 1945, yesterday, two years ago).', 'Chuỗi hành động nối tiếp nhau khi kể chuyện.', 'Tiếng Việt dùng “đã” hoặc không dùng gì; tiếng Anh bắt buộc phải đổi dạng động từ.'],
  forms: [
    ['Affirmative', 'S + V-ed / V2', 'Spencer noticed something strange. He left school at twelve.', 'Khẳng định: động từ có quy tắc thêm -ed; bất quy tắc phải học thuộc (leave → left).'],
    ['Negative', 'S + did not (didn’t) + V', 'He did not plan this discovery.', 'Phủ định: did not + động từ nguyên mẫu. Chỉ “did” mang dấu quá khứ.'],
    ['Yes/No question', 'Did + S + V?', 'Did the plan succeed? — Yes, it did. / No, it didn’t.', 'Câu hỏi Yes/No: Did đứng đầu, động từ về nguyên mẫu.'],
    ['Wh- question', 'Wh- + did + S + V?', 'Why did the ships follow the small boats?', 'Câu hỏi Wh-: từ hỏi + did + chủ ngữ + V. Hỏi về chủ ngữ thì không dùng did: Who discovered penicillin?'],
    ['be', 'was / were (not)', 'The first oven was enormous. The stakes were under the water.', 'Động từ be không dùng did: was not, were not; Was it…? Were they…?']
  ],
  ex: [['He left school when he was only twelve years old.', 'Ông nghỉ học khi mới mười hai tuổi.', 'a2-p1-01'], ['They did not know that the river in front of them was hiding something.', 'Họ không biết rằng con sông trước mặt đang giấu một thứ.', 'a2-p1-02'], ['Aldrin pushed the pen into the small hole.', 'Aldrin ấn cây bút vào cái lỗ nhỏ.', 'a2-p1-07'], ['Why did it take so long?', 'Vì sao lại lâu đến thế?', 'a2-p1-04']],
  errors: [['He did not went home.', 'He did not go home.', 'Sau did not / Did…? luôn là động từ nguyên mẫu.'], ['Yesterday I go to the factory.', 'Yesterday I went to the factory.', 'Có mốc thời gian quá khứ thì động từ phải ở dạng quá khứ; tiếng Việt không đổi động từ nên rất dễ quên.'], ['Did he was at work?', 'Was he at work?', 'Với be, đảo was/were lên đầu; không dùng did.']],
  note: '7 câu: bốn dạng câu, động từ bất quy tắc và động từ be — chủ điểm rộng và là thì dùng nhiều nhất trong các bài đọc.',
  q: [
    { t: 'mc', q: 'The soldiers ______ about the stakes.', o: [['did not know', 'Đúng: did not + V nguyên mẫu.'], ['did not knew', 'Sai: sau did not không dùng V2.'], ['not knew', 'Sai: thiếu trợ động từ did.']], a: 0 },
    { t: 'gap', q: 'Fleming ______ (leave) the plate on a table in the lab.', a: 'left', why: 'leave – left – left (bất quy tắc).' },
    { t: 'mc', q: '______ the experiment work?', o: [['Did', 'Đúng: Did + S + V?'], ['Was', 'Sai: work là động từ thường, không đi với was ở đây.'], ['Does', 'Sai thì: chuyện ở quá khứ.']], a: 0 },
    { t: 'error', q: 'When did Ando invented instant noodles?', wrong: 'invented', fix: 'invent', why: 'Trong câu hỏi đã có did, động từ chính về nguyên mẫu: When did Ando invent…?' },
    { t: 'order', a: 'Why did the big ships follow the small boats?', why: 'Wh- + did + S + V + tân ngữ.' },
    { t: 'mc', q: 'Who ______ penicillin?', o: [['discovered', 'Đúng: hỏi về chủ ngữ (Who) thì dùng thẳng V2, không cần did.'], ['did discover', 'Chưa đúng: chỉ dùng did khi Who là tân ngữ hoặc khi cần nhấn mạnh.'], ['did discovered', 'Sai: không dùng did cùng V2.']], a: 0 },
    { t: 'write', q: 'Make it negative: “The first oven was small.”', model: 'The first oven was not small.', why: 'Với be: was/were + not. Không dùng did.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'past-continuous', n: 2, level: 'A2', title: 'Past continuous', vi: 'Thì quá khứ tiếp diễn', mins: 7,
  use: ['Việc đang diễn ra tại một thời điểm trong quá khứ.', 'Việc đang diễn ra (nền) thì có một việc ngắn xen vào (quá khứ đơn), thường nối bằng when hoặc while.'],
  forms: [
    ['Affirmative', 'S + was / were + V-ing', 'Spencer was testing a magnetron.', 'I/he/she/it + was; you/we/they + were.'],
    ['Negative', 'S + was / were + not + V-ing', 'The men were not sleeping well.', 'Phủ định: thêm not sau was/were.'],
    ['Yes/No question', 'Was / Were + S + V-ing?', 'Was Collins waiting for them? — Yes, he was.', 'Đảo was/were lên đầu câu.'],
    ['Wh- question', 'Wh- + was / were + S + V-ing?', 'What was Spencer doing when the chocolate melted?', 'Từ hỏi + was/were + chủ ngữ + V-ing.']
  ],
  ex: [['He was standing next to the equipment when he noticed something strange.', 'Ông đang đứng cạnh thiết bị thì nhận thấy một điều lạ.', 'a2-p1-01'], ['They were all waiting for one hot bowl of noodles.', 'Tất cả họ đang chờ một bát mì nóng.', 'a2-p1-08'], ['The men were wearing big suits with large packs on their backs.', 'Hai ông đang mặc bộ đồ to với ba lô lớn sau lưng.', 'a2-p1-07']],
  errors: [['He standing next to the machine.', 'He was standing next to the machine.', 'Không được bỏ was/were. Tiếng Việt chỉ cần “đang” nên hay quên.'], ['I was knowing the answer.', 'I knew the answer.', 'Động từ chỉ trạng thái (know, want, like, own, exist) không dùng thì tiếp diễn.']],
  note: '5 câu: bốn dạng câu và một câu về động từ trạng thái.',
  q: [
    { t: 'mc', q: 'A third man ______ for them above the Moon.', o: [['was waiting', 'Đúng: he + was + V-ing.'], ['were waiting', 'Sai: chủ ngữ số ít (a third man) dùng was.'], ['was wait', 'Sai: sau was phải là V-ing.']], a: 0 },
    { t: 'gap', q: 'The enemy thought they ______ (win).', a: 'were winning', why: 'they + were + V-ing; win → winning (gấp đôi n).' },
    { t: 'order', a: 'What was Spencer doing when the chocolate melted?', why: 'Wh- + was + S + V-ing + when + quá khứ đơn.' },
    { t: 'error', q: 'The king was owning a lot of gold.', wrong: 'owning', fix: 'owned (The king owned…)', why: 'own là động từ trạng thái, không dùng thì tiếp diễn.', head2: 'One word makes this sentence wrong. Tap it.' },
    { t: 'mc', q: '______ the soldiers expecting an easy war?', o: [['Were', 'Đúng: soldiers là số nhiều → Were.'], ['Was', 'Sai: chủ ngữ số nhiều.'], ['Did', 'Sai: thì tiếp diễn dùng was/were, không dùng did.']], a: 0 }
  ] });

EI.grammar({ id: 'past-simple-vs-continuous', n: 3, level: 'A2', title: 'Past simple or past continuous?', vi: 'So sánh: quá khứ đơn và quá khứ tiếp diễn', mins: 6,
  use: ['Quá khứ tiếp diễn = việc dài, đang dở, làm nền. Quá khứ đơn = việc ngắn, trọn vẹn, xen vào hoặc nối tiếp.', 'when + quá khứ đơn (việc ngắn); while + quá khứ tiếp diễn (việc dài).', 'Hai việc quá khứ đơn liền nhau = việc này xong rồi mới đến việc kia.'],
  forms: [
    ['Background + event', 'was/were + V-ing … when + V2', 'He was standing next to the equipment when he noticed something strange.', 'Đang đứng (nền) thì nhận thấy (sự kiện).'],
    ['Event during', 'while + was/were + V-ing, … V2', 'While the men were sleeping, the engineers looked for a solution.', 'Trong lúc hai ông ngủ, các kỹ sư tìm giải pháp.'],
    ['One after another', 'V2 … and (then) V2', 'He put popcorn near the magnetron and waited.', 'Đặt bắp xuống, rồi chờ: hai việc nối tiếp.']
  ],
  ex: [['When he came back, some mold was growing on that plate.', 'Khi ông trở về, có nấm mốc đang mọc trên chiếc đĩa đó.', 'a2-p1-04'], ['The Southern Han ruler was coming with more ships.', 'Vua Nam Hán đang kéo thêm tàu tới (thì nghe tin và quay đầu).', 'a2-p1-02']],
  errors: [['When I was arriving, he cooked.', 'When I arrived, he was cooking.', 'Việc ngắn (arrive) ở quá khứ đơn; việc đang dở (cook) ở quá khứ tiếp diễn.'], ['While he walked, he was finding a pen.', 'While he was walking, he found a pen.', 'Sau while thường là việc dài (tiếp diễn).']],
  note: '4 câu: bài so sánh, mỗi câu buộc phải chọn giữa hai thì trong cùng một tình huống.',
  q: [
    { t: 'mc', q: 'When Fleming came back, some mold ______ on the plate.', o: [['was growing', 'Đúng: lúc ông về, nấm mốc đang mọc dở.'], ['grew', 'Chưa đúng: “grew” sẽ nghĩa là ông về rồi nấm mới mọc.']], a: 0 },
    { t: 'mc', q: 'Aldrin looked down and ______ a small broken thing on the floor.', o: [['saw', 'Đúng: hai việc ngắn nối tiếp nhau → cả hai ở quá khứ đơn.'], ['was seeing', 'Sai: see ở đây là việc xảy ra tức thì, và hiếm khi dùng tiếp diễn.']], a: 0 },
    { t: 'gap', q: 'While Ando ______ (watch) his wife, he got an idea.', a: 'was watching', why: 'while + was/were + V-ing cho việc dài làm nền.' },
    { t: 'write', q: 'Join the two sentences with “when”: “Spencer was testing a magnetron. The chocolate melted.”', model: 'Spencer was testing a magnetron when the chocolate melted.', why: 'Nền (was testing) + when + sự kiện (melted).', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'comparatives', n: 4, level: 'A2', title: 'Comparatives and superlatives', vi: 'So sánh hơn và so sánh nhất', mins: 7,
  use: ['So sánh hơn: so hai người/vật — adj-er + than, hoặc more + adj + than.', 'So sánh nhất: một trong cả nhóm — the + adj-est, hoặc the most + adj.', 'Tính từ một âm tiết (và hai âm tiết kết thúc bằng -y): -er/-est. Tính từ dài: more/most.'],
  forms: [
    ['Short adjective', 'adj-er + than / the adj-est', 'taller than a fridge · the biggest army', 'big → bigger → the biggest (gấp đôi phụ âm); large → larger (chỉ thêm r); easy → easier.'],
    ['Long adjective', 'more + adj + than / the most + adj', 'more expensive than fresh noodles · the most dangerous thing', 'Hai âm tiết trở lên (không kết thúc bằng -y).'],
    ['Irregular', 'good → better → the best; bad → worse → the worst', 'He understood the river better than the enemy.', 'Phải học thuộc. far → farther/further.'],
    ['Adverb', 'more + adverb + than', 'New hair grew more slowly.', 'Trạng từ đuôi -ly dùng more/most.']
  ],
  ex: [['It was enormous: almost two meters in height, taller than a fridge.', 'Nó khổng lồ: cao gần hai mét, cao hơn một chiếc tủ lạnh.', 'a2-p1-01'], ['No enemy expected that the most dangerous thing on this coast was the water.', 'Không kẻ địch nào ngờ rằng thứ nguy hiểm nhất ở vùng bờ biển này lại là nước.', 'a2-p1-02'], ['The inside of an octopus is even stranger than the outside.', 'Bên trong con bạch tuộc còn lạ hơn cả bên ngoài.', 'a2-p1-03']],
  errors: [['more bigger than', 'bigger than', 'Không dùng more cùng với -er.'], ['He is taller that me.', 'He is taller than me.', 'So sánh hơn đi với than, không phải that.'], ['the most big city', 'the biggest city', 'Tính từ ngắn dùng -est.']],
  note: '5 câu: ngắn/dài, bất quy tắc, và lỗi “more + -er”.',
  q: [
    { t: 'mc', q: 'The first microwave oven was ______ a fridge.', o: [['taller than', 'Đúng: tall → taller + than.'], ['more tall than', 'Sai: tính từ một âm tiết không dùng more.'], ['tallest than', 'Sai: -est không đi với than.']], a: 0 },
    { t: 'gap', q: 'Chicken Ramen was ______ (expensive) than fresh noodles.', a: 'more expensive', why: 'Tính từ dài: more + adj + than.' },
    { t: 'mc', q: 'Mali was perhaps ______ producer of gold in the world.', o: [['the biggest', 'Đúng: the + adj-est; big → biggest.'], ['the bigger', 'Sai: so sánh nhất trong cả thế giới.'], ['most big', 'Sai: thiếu the và dùng sai dạng.']], a: 0 },
    { t: 'error', q: 'He understood the river more better than the enemy.', wrong: 'more', fix: '(bỏ more) better than', why: 'better đã là so sánh hơn của well/good; không thêm more.' },
    { t: 'write', q: 'Compare them with “heavy”: “The 1947 oven: 340 kg. The 1967 oven: much less.”', model: 'The 1947 oven was heavier than the 1967 oven.', why: 'heavy → heavier (y → i + er) + than.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'modals-obligation', n: 5, level: 'A2', title: 'have to, had to, could', vi: 'Bắt buộc và khả năng: have to, must, had to, could', mins: 7,
  use: ['have to / must + V: bắt buộc ở hiện tại. Quá khứ của cả hai là had to.', 'do not have to = không cần phải (không bắt buộc). must not = cấm, không được phép. Hai nghĩa khác hẳn nhau.', 'can → could: khả năng trong quá khứ. Sau các từ này luôn là động từ nguyên mẫu, không có to (trừ have to).'],
  forms: [
    ['Obligation now', 'S + have to / has to / must + V', 'An octopus has to be clever.', 'he/she/it + has to.'],
    ['Obligation in the past', 'S + had to + V', 'Aldrin had to fix it himself.', 'had to dùng cho mọi ngôi.'],
    ['Not necessary', 'S + do/does/did not have to + V', 'A small cut did not have to mean death anymore.', 'Không cần phải, không nhất thiết.'],
    ['Ability in the past', 'S + could / could not + V', 'The ships could not move.', 'Câu hỏi: Could they see the stakes?']
  ],
  ex: [['He had to cross the Sahara.', 'Ông phải băng qua Sahara.', 'a2-p1-06'], ['He could not come down to help them.', 'Ông không thể xuống giúp họ.', 'a2-p1-07'], ['The enemy had to enter it to get into the country.', 'Quân địch phải đi vào con sông ấy mới vào được trong nước.', 'a2-p1-02']],
  errors: [['He must to go.', 'He must go.', 'Sau must, can, could không có to.'], ['Yesterday I must work late.', 'Yesterday I had to work late.', 'must không có dạng quá khứ; dùng had to.'], ['You don’t have to smoke here. (ý: cấm)', 'You must not smoke here.', 'don’t have to = không cần; must not = cấm.']],
  note: '5 câu: had to, could not, và cặp dễ nhầm don’t have to / must not.',
  q: [
    { t: 'mc', q: 'There was no tool, so Aldrin ______ fix the switch himself.', o: [['had to', 'Đúng: bắt buộc trong quá khứ.'], ['must', 'Sai thì: must chỉ dùng cho hiện tại/tương lai.'], ['had', 'Sai: thiếu to — had to + V.']], a: 0 },
    { t: 'mc', q: 'The sign says “No entry”. You ______ go in.', o: [['must not', 'Đúng: cấm.'], ['do not have to', 'Sai nghĩa: “không cần vào” chứ không phải “cấm vào”.']], a: 0 },
    { t: 'gap', q: 'The big ships ______ (not / can) turn back to the sea.', a: ['could not', "couldn't", 'couldn’t'], why: 'Quá khứ của cannot là could not.' },
    { t: 'error', q: 'Nobody on a ship could to see the stakes.', wrong: 'to', fix: '(bỏ to) could see', why: 'could + động từ nguyên mẫu không to.' },
    { t: 'write', q: 'Put it in the past: “He has to work every day.”', model: 'He had to work every day.', why: 'has to → had to.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'passive', n: 6, level: 'A2', title: 'Passive: is made, was built', vi: 'Câu bị động (hiện tại và quá khứ đơn)', mins: 8,
  use: ['Dùng khi điều quan trọng là việc gì xảy ra với sự vật, không phải ai làm; hoặc khi không biết/không cần nói ai làm.', 'Rất thường gặp trong báo cáo kỹ thuật: The part was measured three times.', 'Muốn nêu người làm thì thêm by: It was invented by Percy Spencer.'],
  forms: [
    ['Present', 'S + am / is / are + V3', 'Every hair is connected to a small muscle.', 'Hiện tại: is/are + quá khứ phân từ.'],
    ['Past', 'S + was / were + V3', 'It was sold to restaurants.', 'Quá khứ: was/were + V3.'],
    ['Negative', 'S + be + not + V3', 'The stakes were not seen by the enemy.', 'Thêm not sau be.'],
    ['Question', 'Be + S + V3? / Wh- + be + S + V3?', 'When was the microwave oven invented?', 'Đảo be lên trước chủ ngữ.']
  ],
  ex: [['It was called the Radarange.', 'Nó được gọi là Radarange.', 'a2-p1-01'], ['Long ago, the animals that we come from were covered in thick hair.', 'Ngày xưa, tổ tiên của chúng ta được bao phủ bởi lớp lông dày.', 'a2-p1-05'], ['He was hurt when bombs fell on the city of Southampton.', 'Ông bị thương khi bom rơi xuống thành phố Southampton.', 'a2-p1-04']],
  errors: [['The oven was invent in 1945.', 'The oven was invented in 1945.', 'Sau be phải là V3 (thường có -ed). Tiếng Việt không đổi động từ nên hay quên.'], ['The accident was happened yesterday.', 'The accident happened yesterday.', 'happen, die, arrive, appear không có bị động.'], ['It made in Vietnam.', 'It is made in Vietnam.', 'Không được bỏ be.']],
  note: '6 câu: bị động khác hẳn tiếng Việt (“bị/được”) và là cấu trúc người Việt sai nhiều nhất trong báo cáo, nên luyện đủ hiện tại, quá khứ, câu hỏi và động từ không có bị động.',
  q: [
    { t: 'mc', q: 'The first microwave oven ______ the Radarange.', o: [['was called', 'Đúng: was + V3.'], ['called', 'Sai: như vậy nghĩa là cái lò tự gọi ai đó.'], ['was call', 'Sai: sau was phải là V3.']], a: 0 },
    { t: 'gap', q: 'Cup Noodles ______ (make) in about 80 countries today.', a: 'are made', why: 'Hiện tại, chủ ngữ số nhiều: are + made.' },
    { t: 'error', q: 'The patient was die when the drug ran out.', wrong: 'was', fix: '(bỏ was) The patient died', why: 'die không có bị động.' },
    { t: 'order', a: 'When was the microwave oven invented?', why: 'Wh- + was + S + V3?' },
    { t: 'mc', q: 'Penicillin ______ by Alexander Fleming in 1928.', o: [['was discovered', 'Đúng: bị động quá khứ + by + người làm.'], ['discovered', 'Sai: penicillin không tự khám phá.'], ['is discover', 'Sai thì và sai dạng.']], a: 0 },
    { t: 'write', q: 'Make it passive: “Ngô Quyền’s men destroyed most of the ships.”', model: 'Most of the ships were destroyed by Ngô Quyền’s men.', why: 'Tân ngữ lên làm chủ ngữ + were + V3 + by…', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'relative-clauses', n: 7, level: 'A2', title: 'who, which, that', vi: 'Mệnh đề quan hệ', mins: 7,
  use: ['Dùng để nói rõ người hay vật nào: ghép hai câu thành một.', 'who cho người; which cho vật; that dùng được cho cả hai trong mệnh đề xác định.', 'Từ quan hệ thay cho chủ ngữ/tân ngữ, nên không lặp lại he/she/it/them.'],
  forms: [
    ['People', 'noun + who / that + verb', 'patients who were very ill', 'bệnh nhân (những người) ốm rất nặng'],
    ['Things', 'noun + that / which + verb', 'a pipe that goes to the ocean', 'đường ống (mà) dẫn ra đại dương'],
    ['As object', 'noun + (that) + S + V', 'the hair that we still have', 'Khi that là tân ngữ, có thể bỏ: the hair we still have.']
  ],
  ex: [['His research was about bacteria, the very small living things that cause many diseases.', 'Nghiên cứu của ông là về vi khuẩn, những sinh vật rất nhỏ gây ra nhiều bệnh.', 'a2-p1-04'], ['It was the only engine that could lift them off the Moon.', 'Đó là động cơ duy nhất có thể nâng họ rời khỏi Mặt Trăng.', 'a2-p1-07'], ['People who had gold before his visit became a little poorer.', 'Những người có vàng từ trước chuyến thăm nghèo đi một chút.', 'a2-p1-06']],
  errors: [['The man who he invented it was an engineer.', 'The man who invented it was an engineer.', 'who đã là chủ ngữ; không thêm he.'], ['The machine who makes the parts…', 'The machine that makes the parts…', 'who chỉ dùng cho người.'], ['This is the report that I wrote it.', 'This is the report that I wrote.', 'that đã thay cho it; không lặp lại.']],
  note: '5 câu: who/that, bỏ đại từ lặp, và ghép câu.',
  q: [
    { t: 'mc', q: 'An octopus is an animal ______ has three hearts.', o: [['that', 'Đúng: that thay cho vật/con vật.'], ['who', 'Sai: who dùng cho người.'], ['it', 'Sai: it không nối được hai mệnh đề.']], a: 0 },
    { t: 'mc', q: 'The researchers ______ developed penicillin worked at Oxford.', o: [['who', 'Đúng: researchers là người.'], ['which', 'Sai: which dùng cho vật.']], a: 0 },
    { t: 'error', q: 'Aldrin used the pen that he kept it in his pocket.', wrong: 'it', fix: '(bỏ it)', why: 'that đã thay cho the pen.' },
    { t: 'order', a: 'Ando watched the people who were waiting for noodles.', why: 'danh từ chỉ người + who + động từ.' },
    { t: 'write', q: 'Join with “that”: “This is the switch. It sent power to the engine.”', model: 'This is the switch that sent power to the engine.', why: 'that thay cho It.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'purpose-and-patterns', n: 8, level: 'A2', title: 'to + verb: why you do something', vi: 'to + động từ chỉ mục đích', mins: 5,
  use: ['Trả lời câu hỏi “để làm gì?”: to + động từ nguyên mẫu.', 'for + danh từ cũng chỉ mục đích (for lunch, for a meeting), nhưng KHÔNG dùng for + động từ nguyên mẫu.', 'Phủ định trang trọng: in order not to + V.'],
  forms: [
    ['Purpose', 'S + V … + to + V', 'He traveled to the United States to sell his noodles.', 'Ông sang Mỹ để bán mì.'],
    ['After a noun', 'noun + to + V', 'a method to remove the water', 'một phương pháp để loại bỏ nước'],
    ['With for', 'for + noun', 'He went to the shed for his work.', 'for + danh từ; không nói “for work on it” với nghĩa động từ.']
  ],
  ex: [['Nobody used penicillin to save a life for more than ten years.', 'Suốt hơn mười năm không ai dùng penicillin để cứu một mạng người.', 'a2-p1-04'], ['Aldrin looked at the wall of switches to find the empty place.', 'Aldrin nhìn lên bảng công tắc để tìm chỗ bị trống.', 'a2-p1-07'], ['To find the explanation, we have to look at animals with thick hair.', 'Để tìm lời giải thích, ta phải nhìn vào những loài vật có lông dày.', 'a2-p1-05']],
  errors: [['I use a caliper for measure the part.', 'I use a caliper to measure the part.', '“để” + động từ = to + V, không phải for + V.'], ['He went there for to sell noodles.', 'He went there to sell noodles.', 'Không ghép for với to.']],
  note: '4 câu: chủ điểm hẹp, một quy tắc chính và một lỗi rất phổ biến (for + V).',
  q: [
    { t: 'mc', q: 'We use a height gauge ______ the part.', o: [['to measure', 'Đúng: to + V chỉ mục đích.'], ['for measure', 'Sai: không dùng for + V nguyên mẫu.'], ['for to measure', 'Sai: không ghép for với to.']], a: 0 },
    { t: 'gap', q: 'Ngô Quyền sent small boats ______ (attack) the enemy.', a: 'to attack', why: 'to + V: để tấn công.' },
    { t: 'error', q: 'He built a shed for work on his idea.', wrong: 'for', fix: 'to', why: 'work ở đây là động từ → to work on his idea.' },
    { t: 'write', q: 'Answer with “to + verb”: “Why did Spencer put popcorn near the magnetron?” (He wanted to test his idea.)', model: 'He put popcorn near the magnetron to test his idea.', why: 'to + V trả lời câu hỏi Why… (để làm gì).', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'linking', n: 9, level: 'A2', title: 'because, so, but, although', vi: 'Từ nối: nguyên nhân, kết quả, đối lập', mins: 6,
  use: ['because + nguyên nhân; so + kết quả. Chỉ dùng một trong hai trong cùng một câu.', 'but nối hai ý trái ngược. although đứng trước mệnh đề “mặc dù”; không dùng although cùng với but.', 'Tiếng Việt nói “vì… nên…”, “tuy… nhưng…”; tiếng Anh chỉ dùng một vế.'],
  forms: [
    ['Reason', 'result + because + reason', 'His plan succeeded because he understood the river.', 'Kế hoạch thành công vì ông hiểu con sông.'],
    ['Result', 'reason, so + result', 'Its body is soft, so it can change its shape.', 'Thân nó mềm, nên nó đổi được hình dạng.'],
    ['Contrast', 'A, but B', 'The price was not low, but it was successful.', 'Giá không thấp, nhưng nó vẫn thành công.'],
    ['Contrast', 'Although A, B', 'Although the price was high, people bought it.', 'Mặc dù giá cao, người ta vẫn mua.']
  ],
  ex: [['This blood is blue, because it contains copper.', 'Máu này màu xanh lam vì nó chứa đồng.', 'a2-p1-03'], ['The enemy thought they were winning, so the huge ships followed.', 'Quân địch tưởng mình đang thắng, nên những con tàu lớn đuổi theo.', 'a2-p1-02'], ['Fresh noodles are soft and wet, so they go bad quickly.', 'Mì tươi mềm và ướt, nên rất nhanh hỏng.', 'a2-p1-08']],
  errors: [['Because it was late, so I went home.', 'Because it was late, I went home. / It was late, so I went home.', 'Không dùng because và so trong cùng một câu.'], ['Although it was expensive, but people bought it.', 'Although it was expensive, people bought it.', 'Không dùng although cùng với but.']],
  note: '4 câu, tập trung vào hai lỗi “vì… nên” và “tuy… nhưng”.',
  q: [
    { t: 'mc', q: 'An octopus has no bones, ______ it can go through a small gap.', o: [['so', 'Đúng: vế sau là kết quả.'], ['because', 'Sai: vế sau không phải nguyên nhân.'], ['although', 'Sai nghĩa: không có sự đối lập.']], a: 0 },
    { t: 'error', q: 'Because the drug ran out, so the patient died.', wrong: 'so', fix: '(bỏ so)', why: 'Đã có because thì không dùng so.' },
    { t: 'mc', q: '______ Fleming discovered penicillin, he could not make it into a medicine.', o: [['Although', 'Đúng: hai ý đối lập, although đứng đầu câu.'], ['Because', 'Sai nghĩa.'], ['But', 'Sai: but không đứng đầu để nối kiểu này.']], a: 0 },
    { t: 'write', q: 'Join with “because”: “Aldrin used a pen. A finger was not safe.”', model: 'Aldrin used a pen because a finger was not safe.', why: 'kết quả + because + nguyên nhân.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'present-perfect', n: 10, level: 'A2', title: 'Present perfect', vi: 'Thì hiện tại hoàn thành', mins: 9,
  use: ['Việc đã xảy ra, không nói rõ lúc nào, và còn liên quan đến hiện tại (kinh nghiệm, kết quả).', 'Với ever / never (kinh nghiệm), just / already / yet (vừa mới, rồi, chưa).', 'Việc bắt đầu trong quá khứ và còn tiếp tục: for + khoảng thời gian, since + mốc thời gian.'],
  forms: [
    ['Affirmative', 'S + have / has + V3', 'Many travelers have crossed the Sahara.', 'he/she/it + has. Viết tắt: I’ve, she’s.'],
    ['Negative', 'S + have / has + not + V3', 'I have not finished the report yet.', 'haven’t / hasn’t + V3.'],
    ['Yes/No question', 'Have / Has + S + V3?', 'Have you ever seen an octopus? — Yes, I have. / No, I haven’t.', 'Đảo have/has lên đầu.'],
    ['Wh- question', 'Wh- + have / has + S + V3?', 'How long have you worked here?', 'Từ hỏi + have/has + S + V3.']
  ],
  ex: [['Many travelers have crossed the Sahara.', 'Nhiều lữ khách đã băng qua Sahara.', 'a2-p1-06'], ['I have worked at this factory for three years.', 'Tôi đã làm ở nhà máy này được ba năm.'], ['She has already sent the FAI report.', 'Cô ấy đã gửi báo cáo FAI rồi.']],
  errors: [['I have seen him yesterday.', 'I saw him yesterday.', 'Có mốc thời gian quá khứ cụ thể (yesterday, in 2020) thì dùng quá khứ đơn.'], ['I work here since 2022.', 'I have worked here since 2022.', 'Việc kéo dài từ quá khứ đến nay: hiện tại hoàn thành, không dùng hiện tại đơn.'], ['He have finished.', 'He has finished.', 'he/she/it + has.']],
  note: '7 câu: bốn dạng câu, for/since, V3 bất quy tắc và ever/never/yet.',
  q: [
    { t: 'mc', q: 'People ______ 50 billion cups of these noodles.', o: [['have bought', 'Đúng: tính đến nay, không nêu thời điểm.'], ['has bought', 'Sai: people là số nhiều.'], ['have buy', 'Sai: cần V3 (bought).']], a: 0 },
    { t: 'gap', q: 'I ______ (never / see) an octopus in the wild.', a: 'have never seen', why: 'have + never + V3; see – saw – seen.' },
    { t: 'mc', q: 'I have worked here ______ three years.', o: [['for', 'Đúng: for + khoảng thời gian.'], ['since', 'Sai: since + mốc thời gian (since 2023).'], ['in', 'Sai giới từ.']], a: 0 },
    { t: 'order', a: 'Have you finished the report yet?', why: 'Have + S + V3 … yet? (yet đứng cuối câu hỏi và câu phủ định).' },
    { t: 'error', q: 'She has send the samples already.', wrong: 'send', fix: 'sent', why: 'send – sent – sent.' },
    { t: 'mc', q: '______ you ever visited Japan?', o: [['Have', 'Đúng: Have + you + V3.'], ['Did', 'Sai: Did + V nguyên mẫu (Did you ever visit…).'], ['Are', 'Sai trợ động từ.']], a: 0 },
    { t: 'write', q: 'Say it in English: “Tôi đã học tiếng Anh được hai năm.” (and you still study it)', model: 'I have studied English for two years.', why: 'Việc còn tiếp tục đến nay: have + V3 + for.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'present-perfect-vs-past-simple', n: 11, level: 'A2', title: 'Present perfect or past simple?', vi: 'So sánh: hiện tại hoàn thành và quá khứ đơn', mins: 6,
  use: ['Quá khứ đơn: biết (hoặc hỏi) LÚC NÀO — yesterday, in 1958, last week, when…?', 'Hiện tại hoàn thành: không nói lúc nào; điều quan trọng là kết quả hay kinh nghiệm đến bây giờ.', 'Người hoặc việc đã thuộc về quá khứ hẳn (người đã mất, thời kỳ đã qua) thì dùng quá khứ đơn.'],
  forms: [
    ['Finished time', 'V2 + time word', 'Ando invented instant noodles in 1958.', 'Có mốc 1958 → quá khứ đơn.'],
    ['No time given', 'have/has + V3', 'People have eaten instant noodles in many countries.', 'Không nêu lúc nào → hiện tại hoàn thành.'],
    ['Asking when', 'When did + S + V?', 'When did Fleming publish his report?', 'Hỏi When thì dùng quá khứ đơn, không dùng hiện tại hoàn thành.']
  ],
  ex: [['In October 1945, the company asked for a patent.', 'Tháng 10 năm 1945, công ty nộp đơn xin bằng sáng chế.', 'a2-p1-01'], ['Many travelers have crossed the Sahara.', 'Nhiều lữ khách đã băng qua Sahara.', 'a2-p1-06'], ['I have finished the report. I sent it at nine o’clock.', 'Tôi đã làm xong báo cáo. Tôi gửi nó lúc chín giờ.']],
  errors: [['When have you arrived?', 'When did you arrive?', 'Hỏi When → quá khứ đơn.'], ['Fleming has discovered penicillin in 1928.', 'Fleming discovered penicillin in 1928.', 'Có năm cụ thể → quá khứ đơn.']],
  note: '4 câu: bài so sánh, mỗi câu là một lựa chọn giữa hai thì.',
  q: [
    { t: 'mc', q: 'Inky ______ from the aquarium in 2016.', o: [['escaped', 'Đúng: có mốc 2016 → quá khứ đơn.'], ['has escaped', 'Sai: không dùng hiện tại hoàn thành với năm cụ thể.']], a: 0 },
    { t: 'mc', q: 'I ______ this story before. I know how it ends.', o: [['have read', 'Đúng: kinh nghiệm, không nói lúc nào, liên quan đến hiện tại.'], ['read it yesterday before', 'Sai: câu gốc không có mốc thời gian.']], a: 0 },
    { t: 'error', q: 'When has Mansa Musa visited Cairo?', wrong: 'has', fix: 'did (When did Mansa Musa visit Cairo?)', why: 'Hỏi When → did + V.' },
    { t: 'gap', q: 'She ______ (work) here since 2022, and she still does.', a: 'has worked', why: 'Còn tiếp tục đến nay + since → hiện tại hoàn thành.' }
  ] });

EI.grammar({ id: 'will-vs-going-to', n: 12, level: 'A2', title: 'will or be going to?', vi: 'Tương lai: will và be going to', mins: 7,
  use: ['be going to: kế hoạch đã có từ trước; hoặc dự đoán dựa trên dấu hiệu nhìn thấy ngay bây giờ.', 'will: quyết định ngay lúc nói; lời hứa, đề nghị giúp; dự đoán chung (I think… will).', 'Lịch đã hẹn chắc chắn có thể dùng hiện tại tiếp diễn: I am meeting the customer at 3.'],
  forms: [
    ['will', 'S + will (’ll) / will not (won’t) + V', 'I will send the report today.', 'Câu hỏi: Will you help me? — Yes, I will.'],
    ['be going to', 'S + am / is / are (not) + going to + V', 'We are going to test the new mold next week.', 'Câu hỏi: Are you going to join? What are you going to do?'],
    ['Wh- question', 'Wh- + will + S + V? / Wh- + be + S + going to + V?', 'When will the samples arrive?', 'Từ hỏi + will/be + chủ ngữ.']
  ],
  ex: [['So the next time those bumps suddenly cover your arms, you will know the explanation.', 'Lần tới khi những nốt ấy phủ kín cánh tay bạn, bạn sẽ biết lời giải thích.', 'a2-p1-05'], ['Look at those clouds. It is going to rain.', 'Nhìn mây kìa. Trời sắp mưa.'], ['The phone is ringing. — I will get it.', 'Điện thoại reo kìa. — Để tôi nghe.']],
  errors: [['I will to call you.', 'I will call you.', 'Sau will không có to.'], ['I going to buy it.', 'I am going to buy it.', 'Không được bỏ am/is/are.'], ['(đã lên kế hoạch) I will visit my parents this weekend.', 'I am going to visit my parents this weekend.', 'Kế hoạch có sẵn → be going to.']],
  note: '5 câu: phân biệt kế hoạch / quyết định tức thì / dự đoán, và hai lỗi hình thức.',
  q: [
    { t: 'mc', q: 'A: This box is heavy. B: Wait, I ______ you.', o: [['will help', 'Đúng: quyết định ngay lúc nói, đề nghị giúp.'], ['am going to help', 'Chưa tự nhiên: B không có kế hoạch từ trước.']], a: 0 },
    { t: 'mc', q: 'We already have the tickets. We ______ to Đà Nẵng in July.', o: [['are going to fly', 'Đúng: kế hoạch đã có.'], ['will fly', 'Chưa đúng: không phải quyết định tức thì.']], a: 0 },
    { t: 'error', q: 'She going to start a new job next month.', wrong: 'going', fix: 'is going', why: 'Thiếu be: She is going to start…' },
    { t: 'gap', q: 'I think the new mold ______ (work) well.', a: ['will work', "'ll work", '’ll work'], why: 'Dự đoán chung với I think → will.' },
    { t: 'order', a: 'What are you going to do after work?', why: 'Wh- + are + you + going to + V?' }
  ] });

EI.grammar({ id: 'first-conditional', n: 13, level: 'A2', title: 'if / when + present, will', vi: 'Câu điều kiện loại 1 và mệnh đề thời gian', mins: 6,
  use: ['Điều có thể xảy ra trong tương lai và kết quả của nó: If + hiện tại đơn, will + V.', 'Sau if, when, before, after, as soon as, the next time: dùng hiện tại đơn dù nói về tương lai — không dùng will.', 'if = nếu (không chắc). when = khi (chắc chắn sẽ xảy ra).'],
  forms: [
    ['Condition', 'If + S + V (present), S + will + V', 'If the engine does not start, they will not leave the Moon.', 'Mệnh đề if ở hiện tại đơn; mệnh đề chính dùng will.'],
    ['Time', 'When / The next time + S + V (present), S + will + V', 'The next time you see goosebumps, you will know the reason.', 'Sau when/the next time cũng dùng hiện tại đơn.'],
    ['Reversed', 'S + will + V + if + S + V (present)', 'I will call you if the samples arrive.', 'Đảo vế thì không cần dấu phẩy.']
  ],
  ex: [['If you practice every day, you will succeed.', 'Nếu bạn luyện tập mỗi ngày, bạn sẽ thành công.'], ['When the water rises, it will hide the stakes.', 'Khi nước lên, nó sẽ che các cây cọc.'], ['I will send the report as soon as I finish it.', 'Tôi sẽ gửi báo cáo ngay khi làm xong.']],
  errors: [['If it will rain, I will stay home.', 'If it rains, I will stay home.', 'Không dùng will trong mệnh đề if.'], ['When I will arrive, I will call you.', 'When I arrive, I will call you.', 'Sau when (tương lai) dùng hiện tại đơn.']],
  note: '4 câu: một quy tắc chính (không dùng will sau if/when) và phân biệt if / when.',
  q: [
    { t: 'mc', q: 'If the part ______ the test, we will check the mold.', o: [['fails', 'Đúng: mệnh đề if dùng hiện tại đơn.'], ['will fail', 'Sai: không dùng will sau if.'], ['failed', 'Sai thì: đang nói về tương lai.']], a: 0 },
    { t: 'error', q: 'I will tell you when the customer will reply.', wrong: 'will', fix: '(bỏ will thứ hai) when the customer replies', why: 'Sau when dùng hiện tại đơn. (Chạm vào “will” thứ hai.)', head2: 'One “will” is wrong. Tap the wrong one.' },
    { t: 'mc', q: 'I am sure he is coming. ______ he arrives, we will start.', o: [['When', 'Đúng: chắc chắn sẽ xảy ra → when.'], ['If', 'Chưa đúng: if dùng khi không chắc.']], a: 0 },
    { t: 'write', q: 'Finish it in your own way: “If I study English every day, …”', model: 'If I study English every day, I will understand my customers better.', why: 'Mệnh đề chính: will + V.', okLabel: 'I used will + verb', badLabel: 'I was not sure' }
  ] });

EI.grammar({ id: 'articles', n: 14, level: 'A2', title: 'a / an, the, or nothing', vi: 'Mạo từ', mins: 8,
  use: ['a / an: nhắc đến lần đầu, một cái bất kỳ, hoặc nói nghề nghiệp (He is an engineer). an trước ÂM nguyên âm: an hour, an FAI report; a university.', 'the: người nghe biết rõ cái nào — đã nhắc ở trước, chỉ có một (the Moon, the sun), hoặc có phần xác định theo sau (the height of the part).', 'Không mạo từ: danh từ số nhiều và không đếm được khi nói chung (Gold is expensive. Octopuses are intelligent).', 'Tiếng Việt không có mạo từ, nên đây là lỗi phổ biến nhất của người Việt. Danh từ đếm được số ít gần như luôn cần a/an/the/my/this…'],
  forms: [
    ['First mention → later', 'a / an … → the …', 'He saw a small hole in the floor. The hole was the top of a pipe.', 'Lần đầu: a hole. Lần sau: the hole.'],
    ['Only one', 'the + noun', 'the Moon · the sky · the ocean · the first step', 'Duy nhất, hoặc có first / only / same / so sánh nhất.'],
    ['General', '(no article) + plural / uncountable', 'Bacteria cause many diseases. Gold gave him power.', 'Nói chung thì không dùng the.'],
    ['Job', 'a / an + job', 'Spencer was an engineer. Ando was a businessman.', 'Nghề nghiệp số ít luôn có a/an.']
  ],
  ex: [['An octopus named Inky was missing.', 'Một con bạch tuộc tên Inky đã mất tích.', 'a2-p1-03'], ['The first microwave oven went on sale in 1947.', 'Chiếc lò vi sóng đầu tiên được bán ra năm 1947.', 'a2-p1-01'], ['The solution came from a pen.', 'Giải pháp đến từ một cây bút.', 'a2-p1-07']],
  errors: [['He is engineer.', 'He is an engineer.', 'Nghề nghiệp số ít cần a/an.'], ['I measured part with caliper.', 'I measured the part with a caliper.', 'Danh từ đếm được số ít không đứng một mình.'], ['The gold is expensive.', 'Gold is expensive.', 'Nói chung về một chất → không dùng the.'], ['a hour / an university', 'an hour / a university', 'Chọn theo âm đầu: hour bắt đầu bằng âm /aʊ/, university bằng âm /j/.']],
  note: '7 câu — nhiều hơn các bài khác, vì đây là điểm người Việt sai nhiều nhất và có nhiều trường hợp dùng khác nhau.',
  q: [
    { t: 'mc', q: 'Percy Spencer was ______ engineer.', o: [['an', 'Đúng: nghề nghiệp + âm nguyên âm đầu.'], ['a', 'Sai: engineer bắt đầu bằng âm /e/.'], ['(nothing)', 'Sai: danh từ đếm được số ít cần mạo từ.']], a: 0 },
    { t: 'mc', q: 'Two men landed on ______ Moon in 1969.', o: [['the', 'Đúng: chỉ có một.'], ['a', 'Sai: không phải “một mặt trăng nào đó”.'], ['(nothing)', 'Sai: the Moon luôn có the.']], a: 0 },
    { t: 'mc', q: '______ octopuses are very intelligent.', o: [['(nothing)', 'Đúng: nói chung về cả loài, danh từ số nhiều.'], ['The', 'Sai: “the octopuses” là những con cụ thể đã nhắc.'], ['An', 'Sai: an không đi với số nhiều.']], a: 0 },
    { t: 'gap', q: 'Aldrin saw ___ small broken thing on the floor. ___ thing was the end of a switch. (two words, with a space)', a: ['a the', 'a, the', 'a The'], why: 'Lần đầu: a. Nhắc lại: the.' },
    { t: 'error', q: 'I checked height of the part with a gauge.', wrong: 'height', fix: 'the height', why: 'Có “of the part” xác định → the height of the part. (Chạm vào từ thiếu mạo từ phía trước.)', head2: 'One noun is missing its article. Tap that noun.' },
    { t: 'mc', q: 'We will send ______ FAI report tomorrow. (the customer does not know which one yet)', o: [['an', 'Đúng: F đọc là /ef/, bắt đầu bằng âm nguyên âm.'], ['a', 'Sai: chọn theo âm, không theo chữ cái.'], ['the', 'Chưa đúng: người nghe chưa biết báo cáo nào.']], a: 0 },
    { t: 'write', q: 'Say it in English: “Vàng là một kim loại.”', model: 'Gold is a metal.', why: 'Gold nói chung: không mạo từ. a metal: một loại kim loại.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'quantifiers', n: 15, level: 'A2', title: 'much, many, a few, a little', vi: 'Từ chỉ số lượng; danh từ đếm được và không đếm được', mins: 7,
  use: ['Đếm được (parts, people): many, a few, few, a number of, How many…?', 'Không đếm được (water, gold, equipment, research, evidence, information, advice): much, a little, little, an amount of, How much…?', 'a lot of / lots of / some / any dùng cho cả hai loại. much và many chủ yếu dùng trong câu phủ định và câu hỏi.', 'a few / a little = một ít (đủ dùng). few / little = rất ít (gần như không có).'],
  forms: [
    ['Countable', 'many / a few / a number of + plural', 'He failed many times. A few hours later…', 'Danh từ số nhiều.'],
    ['Uncountable', 'much / a little / an amount of + noun', 'a very small amount of the drug · not much evidence', 'Danh từ không thêm s, động từ số ít.'],
    ['Both', 'a lot of / some / any + noun', 'a lot of hope · a lot of people', 'Dùng được cho cả hai.'],
    ['One piece', 'a piece of + uncountable', 'a piece of equipment · a piece of evidence', 'Muốn đếm danh từ không đếm được thì dùng a piece of.']
  ],
  ex: [['The mold made only a very small amount of the drug.', 'Nấm mốc chỉ tạo ra một lượng thuốc rất nhỏ.', 'a2-p1-04'], ['He tried one method after another, and he failed many times.', 'Ông thử hết phương pháp này đến phương pháp khác, và thất bại nhiều lần.', 'a2-p1-08'], ['The skin around each hair goes up a little.', 'Vùng da quanh mỗi sợi lông nhô lên một chút.', 'a2-p1-05']],
  errors: [['many equipments', 'a lot of equipment', 'equipment không đếm được: không thêm s, không dùng many.'], ['How much parts did you measure?', 'How many parts did you measure?', 'parts đếm được → How many.'], ['I have few time.', 'I have little time.', 'time (thời gian) không đếm được → little.'], ['a large amount of people', 'a large number of people', 'amount cho không đếm được; number cho đếm được.']],
  note: '6 câu: phải nắm cả quy tắc lẫn danh sách danh từ không đếm được hay gặp trong công việc (equipment, information, evidence, research).',
  q: [
    { t: 'mc', q: 'How ______ samples do we need for the FAI report?', o: [['many', 'Đúng: samples đếm được.'], ['much', 'Sai: much dùng cho không đếm được.']], a: 0 },
    { t: 'mc', q: 'There is not ______ evidence from people.', o: [['much', 'Đúng: evidence không đếm được.'], ['many', 'Sai: many cần danh từ số nhiều.'], ['a few', 'Sai: a few đi với danh từ đếm được.']], a: 0 },
    { t: 'error', q: 'The lab bought two new equipments last month.', wrong: 'equipments', fix: 'pieces of equipment', why: 'equipment không đếm được → two new pieces of equipment.' },
    { t: 'gap', q: 'A large ______ of people traveled with Mansa Musa. (amount / number)', a: 'number', why: 'people đếm được → a number of.' },
    { t: 'mc', q: 'I have ______ time before the meeting, so we can talk for ten minutes.', o: [['a little', 'Đúng: một ít, đủ để làm gì đó.'], ['little', 'Sai nghĩa: little = gần như không có.'], ['a few', 'Sai: time không đếm được.']], a: 0 },
    { t: 'write', q: 'Correct it: “She gave me many informations.”', model: 'She gave me a lot of information.', why: 'information không đếm được: không thêm s, không dùng many.', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });

EI.grammar({ id: 'present-simple-vs-continuous', n: 0, level: 'A2', title: 'Present simple or present continuous?', vi: 'So sánh: hiện tại đơn và hiện tại tiếp diễn', mins: 7,
  use: ['Hiện tại đơn: sự thật, thói quen, việc lặp lại (every day, usually, always).', 'Hiện tại tiếp diễn: việc đang diễn ra ngay lúc nói hoặc tạm thời trong giai đoạn này (now, at the moment, this week).', 'Động từ chỉ trạng thái (know, want, need, like, own, exist, understand) không dùng thì tiếp diễn.'],
  forms: [
    ['Present simple +', 'S + V / V-s', 'The water rises and falls every day.', 'he/she/it thêm -s hoặc -es.'],
    ['Present simple −', 'S + do not / does not + V', 'An octopus does not have bones.', 'does not + động từ nguyên mẫu (không thêm s).'],
    ['Present simple ?', 'Do / Does + S + V? · Wh- + do / does + S + V?', 'Does it live alone? Where does an octopus live?', 'Câu hỏi Yes/No và Wh- đều cần do/does.'],
    ['Present continuous +', 'S + am / is / are + V-ing', 'Your body is trying to raise a coat.', 'Việc đang diễn ra.'],
    ['Present continuous − / ?', 'S + be + not + V-ing · Be + S + V-ing? · Wh- + be + S + V-ing?', 'The machine is not working. Is it raining? What are you doing?', 'Phủ định thêm not; câu hỏi đảo be lên đầu.']
  ],
  ex: [['Near the sea, the water in this river rises and falls every day.', 'Ở gần biển, nước của con sông này lên và xuống mỗi ngày.', 'a2-p1-02'], ['Your body is trying to raise a coat that you lost a very long time ago.', 'Cơ thể bạn đang cố dựng lên một bộ lông mà bạn đã mất từ rất lâu.', 'a2-p1-05'], ['Today, factories produce microwave ovens in many sizes.', 'Ngày nay, các nhà máy sản xuất lò vi sóng với nhiều kích cỡ.', 'a2-p1-01']],
  errors: [['He work in a factory.', 'He works in a factory.', 'Ngôi thứ ba số ít phải thêm -s. Tiếng Việt không chia động từ nên đây là lỗi rất phổ biến.'], ['I am knowing the answer.', 'I know the answer.', 'know là động từ trạng thái.'], ['She is work now.', 'She is working now.', 'Sau be phải là V-ing.'], ['Does he works here?', 'Does he work here?', 'Sau does, động từ về nguyên mẫu.']],
  note: '6 câu: hai thì, ngôi thứ ba số ít, câu hỏi với does và động từ trạng thái.',
  q: [
    { t: 'mc', q: 'An octopus ______ three hearts.', o: [['has', 'Đúng: sự thật, hiện tại đơn; have → has với it.'], ['is having', 'Sai: have (sở hữu) là động từ trạng thái.'], ['have', 'Sai: an octopus là ngôi thứ ba số ít.']], a: 0 },
    { t: 'mc', q: 'Be quiet, please. I ______ the part right now.', o: [['am measuring', 'Đúng: việc đang diễn ra lúc nói.'], ['measure', 'Chưa đúng: “right now” cần thì tiếp diễn.']], a: 0 },
    { t: 'gap', q: 'The line ______ (produce) two thousand parts every day.', a: 'produces', why: 'Việc lặp lại + chủ ngữ số ít → thêm -s.' },
    { t: 'error', q: 'Does the water rises every day?', wrong: 'rises', fix: 'rise', why: 'Sau does, động từ về nguyên mẫu.' },
    { t: 'order', a: 'What are you doing at the moment?', why: 'Wh- + are + you + V-ing?' },
    { t: 'write', q: 'Make it negative: “The machine works on Sundays.”', model: 'The machine does not work on Sundays.', why: 'does not + work (bỏ s).', okLabel: 'Mine matches', badLabel: 'Mine was different' }
  ] });
