# CONTENT_GUIDE — viết lô nội dung mới cho English Improve

Tài liệu này đủ để một phiên làm việc khác viết lô sau đúng chuẩn mà không cần đọc mã nguồn. Thêm nội dung **không phải sửa mã**: tạo file dữ liệu, thêm đường dẫn vào `data/manifest.js`, chạy `node tools/check-content.js` cho đến khi 0 error.

## 0. Ràng buộc cứng

1. Nội dung bài đọc là sự thật đã xác minh. Không bịa chi tiết, số liệu, lời thoại, cảm xúc của nhân vật, hay nguồn.
2. Không ghi “đã xác minh” cho thứ chưa xác minh (cấp độ từ, quyền âm thanh, nguồn).
3. Không flashcard, không bài kiểm tra rời, không bảng xếp hạng, không đồng hồ đếm ngược. Mọi câu hỏi gắn với một bài đọc hoặc một chủ điểm ngữ pháp; mọi lần ôn từ nằm trong một câu. **Từ 12/11/2026, theo yêu cầu của chủ dự án, phần Practice của bài đọc có chấm điểm** và điểm hiện cạnh tên bài; ôn cách quãng, ngữ pháp, bài viết và nói theo vẫn không chấm điểm.
4. Mỗi bài học xong trong một lần ngồi. Không có giới hạn số phút học mỗi ngày (bỏ ngày 12/11/2026 theo yêu cầu của chủ dự án), nhưng một bài đọc — Learn words → Read & listen → Grammar → Practice — phải làm hết được trong một buổi: bài A2 ước tính 25–32 phút kể cả Practice đầy đủ (cột `lesson` của công cụ kiểm tra). Vượt khoảng đó thì rút bớt bài hoặc bớt câu luyện, không chia bài thành nhiều buổi. Vị trí vẫn được lưu ở mọi bước phòng khi bị gián đoạn.

## 1. Quy trình cho một bài đọc

1. **Chọn chuyện.** Tự hỏi: một người không học tiếng Anh có muốn đọc chuyện này không? Nếu không, đổi chuyện. Lịch sử (`topic: 'history'`) là chủ đề nhiều nhất nhưng chỉ **nhỉnh hơn** các chủ đề khác một chút: trong mỗi lô, số bài lịch sử nhiều hơn chủ đề đứng thứ hai tối đa 1 bài (ví dụ lô 9 bài: 3 lịch sử, các chủ đề khác 1–2 bài). Còn lại xen `science`, `engineering`, `nature`, `body`, `space`, `life`. Khi chọn chuyện lịch sử, **ưu tiên châu Âu thời Trung cổ** (khoảng thế kỷ 5–15) — chủ dự án thích mảng này; khoảng một nửa số bài lịch sử của mỗi lô, phần còn lại cho các vùng và thời kỳ khác. (Quy định từ 12/11/2026, áp dụng từ bài 18; 17 bài đầu giữ nguyên.) Phủ nhiều thời kỳ và vùng, có châu Á và Việt Nam. Không để ba bài liên tiếp (theo `n`) cùng thời kỳ hoặc cùng `region`.
2. **Xác minh trước khi viết.** Mỗi chi tiết chính cần ít nhất hai nguồn đáng tin (bảo tàng, cơ quan khoa học, tạp chí có biên tập, nguồn sơ cấp). Ghi lại nguồn nào nói gì. Chỗ các nguồn lệch nhau: nói rõ trong bài hoặc tránh con số. Giai thoại nổi tiếng: nói rõ là giai thoại. Chi tiết chỉ có một nguồn hoặc là kiến thức phổ thông: ghi trong `note`.
3. **Gom từ.** 23–26 từ mục tiêu chưa dùng trong lượt (pass) đó, lấy từ danh sách Oxford 3000/5000 đúng cấp và **đúng từ loại**. Chọn từ theo chuyện, không ép chuyện theo từ; nếu một nhóm khó viết tự nhiên thì đổi cách gom.
4. **Viết.** A2 600–800 từ (B1 800–1.000, B2 1.000–1.300, C1 1.300–1.600). Mở bằng câu hỏi, kết quả khó đoán hoặc chi tiết cụ thể. Mỗi từ mục tiêu xuất hiện ở ít nhất hai câu khác nhau. Ngoài từ mục tiêu, từ vựng và cấu trúc ở đúng cấp hoặc thấp hơn; từ chủ đề vượt cấp (octopus, penicillin…) phải có trong `gloss`. Chính tả Mỹ.
5. **Đánh dấu.** Bọc từ mục tiêu bằng `{…}` **chỉ khi dùng đúng nghĩa mục tiêu**. Từ của bài khác xuất hiện lại đúng nghĩa cũng bọc `{…}` (được tính là một lần gặp lại nhẹ và cho phần ôn thêm ngữ cảnh). `node tools/tag-targets.js data/readings/<file>.js` liệt kê chỗ còn sót; thêm `--write` để tự bọc, rồi **đọc lại từng chỗ**.
6. **Dịch từng câu** sang tiếng Việt tự nhiên.
7. **Viết luyện tập** (mục 4), `predict`, `write`, `fact`, `sources`, `note`, `practiceNote`.
8. **Chạy** `node tools/check-content.js <id>`; sửa đến khi 0 error và đã xem hết warning.
9. **Cập nhật** `data/manifest.js` (bỏ `//` ở dòng đã đặt sẵn cho bài, xem mục 2), mục “Not available yet” tự cập nhật theo dữ liệu.
10. **Làm việc qua GitHub:** một bài = một nhánh = một PR, theo `AGENTS.md`. Không sửa `DECISIONS.md` (quản lý ghi khi merge); quyết định và chỗ lệch nguồn ghi trong mô tả PR.

## 2. File từ vựng — `data/words-<level>.js`

```js
EI.words('A2', `
word | pos | /IPA Mỹ/ | định nghĩa English–English | ví dụ có {word} | cụm từ; cách nhau; bằng ; | nghĩa tiếng Việt | độ khó 1–3 | ghi chú (vi) | họ từ
`, { note: 'ghi rõ cấp độ đã đối chiếu với nguồn nào, ngày nào, và CHƯA đối chiếu với gì' });
```

Một cấp có thể có nhiều file từ (`data/words-a2.js` cho bài 1–8, `data/words-a2-02.js` cho bài 9–17). **Từ bài 18 trở đi**, từ mục tiêu mới của một bài được khai báo **ngay đầu file bài đọc của bài đó** bằng một lệnh ``EI.words('A2', `…`)`` (cùng định dạng), để nhiều người/AI viết song song không sửa chung một file. Không tạo lại mục cho từ đã có ở file khác — từ đó dùng lại bằng `{…}`.

`data/manifest.js`: khi mở một lô, quản lý thêm sẵn mỗi bài một dòng bị chú thích (`// 'data/readings/a2-p1-18.js',`), cách nhau một dòng trống. Người viết bài nào chỉ bỏ dấu `//` ở dòng của bài đó, nên các PR song song không xung đột.

- Một từ một dòng, 10 trường cách nhau bằng `|` (không dùng `|` trong nội dung). Dòng bắt đầu bằng `#` là ghi chú.
- **Định nghĩa** viết bằng từ dễ hơn chính từ đó, không dùng lại từ đó (công cụ cảnh báo cả hai).
- **Ví dụ** tự nhiên, khác câu trong bài đọc, ưu tiên ngữ cảnh đời sống và nhà máy/đo lường; bọc từ bằng `{…}` (dạng biến đổi được: `{discovered}`).
- **Độ khó** (ước tính, không ghi là đã kiểm chứng): 1 = cụ thể, dễ đoán; 2 = trung bình; 3 = trừu tượng, nhiều nghĩa, dễ nhầm với người Việt. Độ khó quyết định khoảng cách ôn và lượng luyện tập.
- **Ghi chú**: chỉ khi từ dễ nhầm (discover/invent, raise/rise), không đếm được (evidence, equipment, research), hoặc người Việt hay đọc sai (recipe, purpose, height).
- `pos` nhiều loại viết `n, v`. Dạng bất quy tắc trong bài viết `{rose=rise}`, `{discoveries=discovery}`.

## 3. File bài đọc — `data/readings/<level>-p<pass>-<nn>.js`

```js
EI.reading({
  id: 'a2-p1-09', level: 'A2', pass: 1, n: 9,
  title: 'Tiêu đề gây tò mò',
  topic: 'history',            // history | science | engineering | nature | body | space | life
  era: '1869',                 // chữ hiển thị
  year: 1869,                  // số, để xếp dòng thời gian; null nếu không phải sự kiện lịch sử
  region: 'Egypt',
  predict: { q: 'Câu đoán nhanh (tiếng Việt), không tính đúng sai', o: ['…', '…', '…'] },
  targets: ['word1', 'word2'],
  text: [                      // mảng đoạn; mỗi đoạn là mảng [câu tiếng Anh, bản dịch tiếng Việt]
    [ ["An {engineer} named …", "Một kỹ sư tên …"], ["…", "…"] ],
  ],
  gloss: { octopus: 'con bạch tuộc' },   // từ vượt cấp không phải từ mục tiêu: chữ thường → nghĩa ngắn tiếng Việt
                                          // cũng dùng cho từ CÓ trong bộ từ nhưng ở nghĩa khác (World’s Fair ≠ fair “công bằng”; he waved ≠ wave “sóng”): khi bấm, nghĩa trong gloss hiện trước, mục từ điển hiện sau kèm lời nhắc
  grammar: [['past-continuous', 'was testing']],   // [id bài ngữ pháp, cụm từ đúng như trong bài]
  practiceNote: 'Vì sao bài này có N câu (hiện trong Info)',
  practice: [ … ],             // mục 4
  extra: [ … ],                // thêm câu hỏi; được hỏi cùng với practice
  write: { vi: 'Yêu cầu viết ngắn', use: ['5 từ nên dùng'], model: 'Câu mẫu để tự so' },
  fact: { card: 'Sự thật chính (tiếng Việt) cho bộ sưu tập', bonus: 'Một chi tiết có thật CHƯA nói trong bài (tiếng Anh, đúng cấp)', bonusSrc: 'nguồn của chi tiết đó' },
  sources: [{ t: 'Tên nguồn', u: 'https://…' }, { t: '…', u: '…' }],
  note: 'Chỗ các nguồn lệch nhau; giai thoại; chi tiết chỉ có một nguồn; kiến thức phổ thông không lấy từ nguồn',
  verified: 'YYYY-MM-DD'
});
```

## 4. Practice: bài kiểm tra ba phần, có chấm điểm

Ứng dụng tự ghép bài kiểm tra của mỗi bài đọc từ `practice` **và** `extra` (cả hai đều được hỏi), theo ba phần:

1. **Understanding the story** — mọi câu có `k: 'c:…'`; câu nghe chép (`dict`) đứng cuối phần. Nên có từ 6 câu: ý chính, chi tiết, trình tự, suy luận, đúng/sai.
2. **Vocabulary of this story** — trước tiên là “The story with gaps”: ứng dụng **tự tạo** từ chính bài đọc, che mỗi từ mục tiêu đúng một lần, chia theo đoạn, kèm khung từ. Người viết không phải làm gì, miễn là mọi từ mục tiêu đã được đánh dấu `{…}`. Sau đó là các câu `k: 'w:…'` do người viết soạn cho từ dễ nhầm.
3. **Grammar of this story** — các câu `k: 'g:<id>'`; nếu cấu trúc được tô nhiều nhất trong `grammar` chưa có câu nào, ứng dụng mượn thêm tối đa 2 câu từ bài ngữ pháp tương ứng. Nên có từ 4 câu.

Chấm điểm: mỗi câu 1 điểm (cần gợi ý: nửa điểm), mỗi chỗ trống trong “story with gaps” 1 điểm. Khi sai một từ hoặc một cấu trúc, ứng dụng chèn một câu luyện thêm **không tính điểm** (từ: một câu mới lấy từ ví dụ của mục từ; ngữ pháp: một câu khác của bài ngữ pháp đó). Bước **Grammar** trước Practice tự dựng từ `grammar` của bài (cách dùng, công thức, câu trong bài) — cũng không cần viết thêm.

Số câu vẫn không cố định:

Quyết định riêng cho từng bài và ghi lý do vào `practiceNote`:

- Từ **trừu tượng, nhiều nghĩa, dễ nhầm, khó phát âm** → một câu riêng (thường là `mc` phân biệt cặp dễ nhầm hoặc `gap`). Từ **cụ thể, dễ đoán** → gộp 4–5 từ vào một câu `match`, hoặc để phần ôn cách quãng lo.
- Cấu trúc ngữ pháp **mới hoặc người Việt hay sai** → 2 câu; cấu trúc đã luyện ở bài trước → 1 câu hoặc không.
- Bài giải thích, nhiều suy luận → nhiều câu hiểu nội dung hơn bài kể chuyện.
- Mỗi câu có một mục đích. Không thêm cho đủ số, không bỏ khi kiến thức chưa được luyện. Trong lô đầu: 25–34 mục mỗi bài (gồm 7–8 đoạn “story with gaps”).

Mỗi câu có `k` (điểm kiến thức), và chữ đầu của `k` quyết định câu thuộc phần nào: `c:<tên>` hiểu nội dung, `w:<từ>` từ vựng (`w:set…` cho câu nối), `g:<id ngữ pháp>`. `extra` chỉ còn là nơi để thêm câu; không còn vai trò “câu dự phòng”.

| `t` | Trường | Ghi chú |
|---|---|---|
| `mc` | `q`, `o` (mảng chữ, hoặc `[chữ, giải thích]`), `a` (chỉ số đáp án) | Câu ngữ pháp **bắt buộc** giải thích từng phương án |
| `gap` | `q` có `______`, `a` (chữ hoặc mảng; phần tử đầu là dạng đúng trong câu) | gõ từ còn thiếu |
| `match` | `q`, `pairs: [[từ, nghĩa], …]` | 4–5 cặp |
| `order` | `a` (câu đúng) | sắp xếp câu; ≤ 12 từ |
| `error` | `q`, `wrong` (từ sai, xuất hiện đúng một lần), `fix` | tìm lỗi |
| `dict` | `a` (một câu hoặc một vế **lấy từ bài**) | nghe chép; tự bỏ qua nếu máy không có giọng đọc |
| `write` | `q`, `model` | viết lại/viết câu, tự so với mẫu |

Thêm `why` (giải thích tiếng Việt) và `ref` (một đoạn chữ có trong bài; ứng dụng hiện nguyên câu đó) cho mọi câu.

## 5. File ngữ pháp — `data/grammar-<level>.js`

```js
EI.grammar({ id: 'past-simple', n: 1, level: 'A2', title: 'Past simple', vi: 'Thì quá khứ đơn', mins: 9,
  use: ['cách dùng 1 (tiếng Việt)', '…'],
  forms: [['Affirmative', 'công thức', 'ví dụ', 'ghi chú tiếng Việt'], ['Negative', …], ['Yes/No question', …], ['Wh- question', …]],
  ex: [['Câu ví dụ', 'bản dịch', 'a2-p1-01']],     // phần tử thứ ba: id bài đọc nếu câu lấy từ bài đó (phải là một câu hoặc một vế có thật trong bài)
  errors: [['câu sai', 'câu đúng', 'vì sao người Việt hay sai']],
  note: 'Vì sao bài này có N câu',
  q: [ … ]                                          // cùng dạng với mục 4; mc phải giải thích TỪNG phương án
});
```

- Các thì: luôn tách **khẳng định, phủ định, Yes/No, Wh-**. Cấu trúc dễ nhầm có bài so sánh riêng (`…-vs-…`).
- Chủ điểm lớn thì tách thành nhiều bài nhỏ độc lập.
- Số câu theo độ rộng chủ điểm và mức người Việt hay sai (lô đầu: 4–7 câu). Câu làm sai tự vào hàng ôn cách quãng.

## 6. Công cụ kiểm tra báo gì

`node tools/check-content.js` in bảng cho từng bài:

- **words**: số từ của bài (cảnh báo nếu ngoài khung của cấp).
- **new/words**: số từ mục tiêu ÷ số từ — đây là chỉ số “từ mới chiếm 4–5% văn bản” (giữ 3,5–5%).
- **target-tokens**: tỷ lệ lượt xuất hiện của từ mục tiêu (cao hơn, vì mỗi từ lặp lại ≥ 2 lần).
- **in≥2 sent.**: số từ mục tiêu có mặt ở ít nhất hai câu.
- **test items (c/w/g)**: tổng số mục của bài kiểm tra và số mục từng phần (hiểu bài / từ vựng / ngữ pháp).
- **above-level / incidental**: tỷ lệ lượt từ vượt cấp; cột sau đã trừ “từ chủ đề” (từ có trong `gloss` và dùng ≥ 3 lần). Giữ cột sau dưới 5%.
- **ERROR**: từ mục tiêu không xuất hiện (đã đánh dấu), từ dùng lại trong cùng lượt, thiếu nguồn, `ref`/`grammar`/`dict` không khớp bài, câu thiếu bản dịch, ví dụ ngữ pháp không có trong bài…
- **warn**: từ mục tiêu xuất hiện mà chưa đánh dấu (kiểm tra nghĩa!), từ chỉ ở một câu, từ lạ chưa chú thích, định nghĩa dùng từ vượt cấp, cấp độ lệch với bảng tham chiếu.

`tools/cefr-reference.json` là bảng tham chiếu cấp độ lấy từ một bản sao bên thứ ba của Oxford 3000/5000. Nó phục vụ công cụ kiểm tra, **không** phải bằng chứng xác minh chính thức.

## 7. Giọng văn

- Câu ngắn, một ý một câu. Thì quá khứ đơn làm nền cho chuyện kể; hiện tại đơn cho sự thật khoa học.
- Không kể cảm xúc hay lời nói mà nguồn không ghi. Muốn bình luận thì viết rõ là nhận xét chung (“Anyone would be nervous…”).
- Kết bài bằng một ý đáng nhớ, không tóm tắt lại.
- Tiêu đề gợi tò mò nhưng không nói sai sự thật.
