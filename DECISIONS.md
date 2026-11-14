# DECISIONS — English Improve, giai đoạn 1

Ngày: 2026-11-12. Ghi các quyết định đáng kể và mọi chỗ làm khác tài liệu yêu cầu, kèm lý do.

## 1. Đã giao gì

- Ứng dụng tĩnh đầy đủ: Today, Vocabulary, Grammar, Reading, Progress, Settings, Info; ôn cách quãng; âm thanh; nói theo; sao lưu; chạy offline và cài lên màn hình chính (khi mở qua https hoặc localhost).
- 8 bài đọc A2 · Pass 1 (603–671 từ), mỗi bài có nguồn, bản dịch từng câu, luyện tập, bài viết ngắn, thẻ sự thật.
- 194 từ A2 (từ mục tiêu của 8 bài), mỗi từ đủ: từ loại, phiên âm Mỹ, định nghĩa English–English, ví dụ, cụm từ, họ từ, nghĩa tiếng Việt, ghi chú, độ khó.
- 16 bài ngữ pháp A2 (4–7 câu luyện mỗi bài).
- `tools/check-content.js` (0 error), `tools/e2e-test.py` (56/56 đạt), `CONTENT_GUIDE.md`, `README.md`.

## 2. Chỗ làm khác yêu cầu

| # | Yêu cầu | Đã làm | Vì sao |
|---|---|---|---|
| 1 | Giai đoạn 1 có “bộ từ A2” | 194 từ, không phải toàn bộ A2 (bản tham chiếu có 867 mục từ mang nghĩa cấp A2) | Mỗi mục từ cần định nghĩa, ví dụ, ghi chú viết tay. Yêu cầu cấm lấp chỗ trống bằng nội dung viết vội. Từ đi vào bộ từ cùng lúc với bài đọc mang nó; khoảng 28 bài nữa sẽ phủ hết A2 · Pass 1. Info ghi rõ phần chưa có. |
| 2 | “Lộ trình ngữ pháp A2” | 16 bài: các thì quá khứ, hiện tại hoàn thành, tương lai, bị động, mệnh đề quan hệ, so sánh, động từ khuyết thiếu, điều kiện loại 1, mạo từ, lượng từ, từ nối, to + V | Đủ để phủ mọi cấu trúc được tô trong 8 bài đọc. Chưa có: danh động từ/động từ nguyên mẫu, giới từ thời gian/nơi chốn, used to, câu hỏi đuôi, too/enough. Thêm ở lô sau. |
| 3 | Từ mới chiếm khoảng 4–5% văn bản | Số từ mục tiêu ÷ số từ của bài = 3,6–4,3% | Hiểu “4–5%” là tỷ lệ từ mới khác nhau trên tổng số từ. Tính theo lượt xuất hiện thì là 8–12%, vì mỗi từ phải lặp lại ít nhất hai lần. Muốn lượt xuất hiện cũng chỉ 4–5% thì bài phải dài trên 1.100 từ, vượt khung A2 và khó xong trong một lần ngồi. Công cụ in cả hai con số. |
| 4 | A2 600–800 từ | 603–671 từ | Nằm ở nửa dưới của khung để cả bài học giữ ở 18–21 phút. |
| 5 | Nhóm 25–30 từ | 23–26 từ | Không ép thêm từ khi câu chuyện không cần. |
| 6 | Dạng ôn thứ tư: “chọn câu diễn đạt lại đúng nghĩa” | Thay bằng “chọn đúng nghĩa của từ trong câu này” | Câu diễn đạt lại phải viết tay cho từng từ (194 × ít nhất 3 câu). Dạng thay thế vẫn nằm trong một câu có ngữ cảnh và vẫn khó hơn điền từ. Nên viết câu diễn đạt lại cho các từ độ khó 3 ở lô sau. |
| 7 | Bấm vào bất kỳ từ nào để hiện nghĩa ngắn | Từ trong bộ từ: đủ nghĩa, phiên âm, nghe. Từ vượt cấp đã chú thích: nghĩa tiếng Việt, nghe. Từ A1 còn lại: nghe, bản dịch cả câu, liên kết Cambridge | Không có từ điển A1 đã kiểm chứng; không bịa nghĩa hàng loạt. |
| 8 | Bấm giữ một câu để hiện bản dịch | Có (giữ khoảng nửa giây), và thêm nút “Tiếng Việt” trong bảng hiện ra khi bấm vào câu | Bấm giữ khó phát hiện và không dùng được bằng bàn phím. |
| 9 | Phát bản thu Cambridge nếu xác minh được quyền | Không tích hợp; phát giọng máy en-US của trình duyệt, kèm liên kết mở đúng mục từ trên Cambridge | Không xác minh được quyền nhúng âm thanh của Cambridge. Nhãn nguồn âm thanh luôn hiện. |
| 10 | Bản thu người thật cho bài đọc | Giọng máy en-US của trình duyệt, ghi rõ là giọng máy, tô sáng câu đang đọc | Chưa có bản thu có quyền sử dụng. |
| 11 | “Tua” trong trình nghe | Tua theo câu (câu trước / câu sau), không tua theo giây | Giọng máy của trình duyệt không cho tua trong một câu. |
| 12 | Xuất tiến độ bằng file | Tải file .json; đồng thời hiện nội dung sao lưu để sao chép | Một số trình xem (ví dụ trang nhúng) chặn tải file. Nhập nhận cả file lẫn đoạn chữ dán vào. |
| 13 | Rà nhanh khi bắt đầu một cấp | Có nút “Quick scan” trong Vocabulary; không tự bật khi mở web lần đầu | Mục tiêu số một là mở web học được ngay. Trong bước Learn words của mỗi bài cũng có nút Known. |
| 14 | Chỉnh tỷ lệ chủ đề | Trọng số 0–10 cho từng chủ đề trong Settings; mặc định lịch sử 6, sáu chủ đề còn lại mỗi chủ đề 1 | Bài kế tiếp được chọn sao cho tỷ lệ đã học tiến gần trọng số, và tránh ba bài liên tiếp cùng vùng. |

## 3. Quyết định thiết kế

**Kỹ thuật.** HTML, CSS và JavaScript thuần, không thư viện, không bước build. Lý do: mở được bằng cách bấm đúp `index.html`, sống lâu, phiên làm việc sau đọc được ngay. Nội dung nằm trong `data/`; thêm lô mới chỉ cần thêm file và một dòng trong `data/manifest.js`.

**Today.** Một phiên = lượt ôn (tối đa 15 mục, chỉnh được 8–40) rồi một bài học. Sau một bài đọc, phiên kế tiếp gợi ý một bài ngữ pháp ngắn (ưu tiên chủ điểm vừa gặp trong bài đọc) để từ mới không dồn quá nhanh; khi lượng ôn đến hạn vượt hai lần giới hạn cũng gợi ý ngữ pháp thay cho bài đọc mới. Bài đang dở luôn được ưu tiên.

**Thời gian ước tính của bài đọc** = 8 giây mỗi từ mục tiêu + thời gian đọc ở 85 từ/phút + 35 giây mỗi câu luyện + 2 phút viết. Kết quả 18–21 phút. Đây là ước tính, chưa đo trên người học thật.

**Ôn cách quãng.**
- Lịch: cuối buổi → 1 → 3 → 7 → 14 → 30 → 60 → 120 ngày, đúng như tài liệu.
- Mỗi từ có hệ số riêng nhân vào khoảng cách: từ độ khó 3 bắt đầu ở 0,8; độ khó 1 ở 1,25; mỗi lần sai nhân 0,85 (sàn 0,5); mỗi lần đúng nhân 1,03 (trần 1,6).
- Từ độ khó 1 trả lời đúng thì bỏ qua mốc 1 ngày và mốc 7 ngày.
- “Cuối buổi”: sau bài đọc có lượt Quick recall gồm tối đa 8 từ khó nhất (ưu tiên từ vừa làm sai trong Practice). Các từ còn lại đến hạn ngay hôm đó và xuất hiện trong Today. Giới hạn 8 để cuối buổi không kéo dài.
- Thứ tự ưu tiên khi lượng ôn dồn lại: mức quá hạn so với khoảng cách của từ (từ khoảng cách ngắn mà quá hạn lâu là từ sắp quên nhất), cộng thêm cho từ đã sai nhiều.
- Từ sai từ 3 lần trở lên là “từ khó”: lần ôn kế chuyển sang dạng chọn nghĩa trong câu, phần giải thích hiện thêm cụm từ đi kèm và ghi chú.
- Câu ngữ pháp làm sai vào hàng ôn với cùng lịch; đúng qua mốc 30 ngày thì ra khỏi hàng ôn.
- Trạng thái: Learning (mốc cuối buổi và 1 ngày), Familiar (3–7), Strong (14–30), Mastered (60–120).
- Từ của bài khác xuất hiện đúng nghĩa trong bài vừa học được ghi “met in a story” và tăng nhẹ hệ số.

**Không có điểm số.** Tiến độ trong bài chỉ là hàng chấm. Bài viết và bài nói theo tự so với mẫu.

**Luyện tập linh hoạt.** 9–14 câu mỗi bài đọc; lý do của từng bài ghi trong `practiceNote` và hiện trong Info. Sai một điểm thì chèn thêm đúng một câu về điểm đó.

**Chính tả Mỹ** (behavior, traveler, realize), vì phiên âm và giọng đọc là Mỹ.

**Nói theo.** Bản thu chỉ nằm trong bộ nhớ của trang, mất khi đóng bảng. Cần trình duyệt cho phép micro (https hoặc localhost).

**Phím nghe lại** mặc định Alt+R; chọn Alt+R, R, Space hoặc Off trong Settings.

## 4. Những gì CHƯA xác minh

1. **Cấp độ từ.** 194 từ được đối chiếu ngày 2026-11-12 với một bản sao Oxford 3000/5000 do bên thứ ba đăng trên GitHub (`tyypgzl/Oxford-5000-words`), theo đúng từ loại. Chưa đối chiếu với danh sách chính thức của Oxford University Press. Info ghi đúng như vậy. `tools/cefr-reference.json` rút từ cùng nguồn và chỉ dùng cho công cụ kiểm tra.
2. **Phiên âm** so với cùng nguồn trên, chưa so với từ điển chính thức.
3. **Độ khó của từ** là ước tính của người viết.
4. **Bản dịch tiếng Việt** (nghĩa từ, từng câu trong bài, giải thích) do AI soạn, chưa có người hiệu đính.
5. **Nguồn bài đọc.** Mỗi bài có ít nhất hai nguồn và đã được đối chiếu lại lần hai sau khi viết; lần đối chiếu đó sửa khoảng 30 chi tiết (ví dụ: bỏ “vài giờ sau”, “cọc đốn từ cây lớn”, “ăn bằng nĩa” ở Mỹ năm 1966, “còn giữ được căn nhà”). Tuy vậy vẫn có những chi tiết chỉ nằm ở một nguồn hoặc là kiến thức phổ thông; chúng được liệt kê trong `note` của từng bài và hiện trong Info. Hai bài dùng Wikipedia làm một trong các nguồn (Bạch Đằng) hoặc một trang tổng hợp phổ thông (History Hit cho Mansa Musa).
6. **Âm thanh.** Chưa thử với tai người: bộ kiểm thử chỉ xác nhận lệnh phát được gọi. Chất lượng giọng tùy thiết bị. Micro chưa thử.
7. **Thiết bị thật.** Kiểm thử chạy trên Chromium giả lập máy tính và Pixel 7. Chưa thử trên iPhone/Safari, chưa thử thao tác cài lên màn hình chính trên điện thoại thật.

## 5. Tự kiểm theo mục nghiệm thu

| Mục | Kết quả |
|---|---|
| Mở web là học được ngay từ Today, xong trong một lần ngồi | Đạt (ước tính 18–21 phút) |
| Mỗi bài có nguồn trong Info, mọi từ mục tiêu xuất hiện đúng nghĩa | Đạt: 194/194 từ có mặt ở ít nhất hai câu |
| Số câu luyện khác nhau giữa các bài | Đạt: 11, 12, 10, 14, 13, 11, 9, 11 |
| Không có thẻ lật hay bài kiểm tra rời | Đạt |
| Đổi ngày thì từ đến hạn đúng lịch; sai thì về mốc đầu | Đạt (thử +1, +2, +40 ngày) |
| Tắt giữa chừng, mở lại đúng bài đúng bước | Đạt |
| Xuất, xóa, nhập lại khôi phục đủ, kể cả lịch ôn | Đạt (Replace và Merge) |
| Dùng được trên điện thoại và khi mất mạng | Đạt trên giả lập; xem mục 4.7 |
| `DECISIONS.md` và `CONTENT_GUIDE.md` | Có |

Còn một cảnh báo của công cụ kiểm tra được giữ có chủ ý: “position” trong câu “Anyone would be nervous in that position” mang nghĩa “hoàn cảnh”, khác nghĩa mục tiêu “vị trí”, nên không đánh dấu.

## 6. Lô kế tiếp nên là gì

1. **A2 · Pass 1, bài 9–16** (khoảng 190 từ nữa). Chủ đề còn thiếu: đời sống, khoa học; lịch sử châu Á ngoài Việt Nam, châu Mỹ Latinh. Ứng viên cần xác minh trước khi nhận: lịch Gregory “mất” mười ngày năm 1582; con tàu Vasa chìm ngay chuyến đầu năm 1628; kênh đào Suez; vì sao bàn phím có thứ tự QWERTY; giấc ngủ của cá heo; đợt dịch nhảy múa năm 1518.
2. Bài ngữ pháp còn thiếu ở mục 2 và câu diễn đạt lại cho các từ độ khó 3.
3. Đối chiếu cấp độ từ với danh sách chính thức của Oxford.
4. Nhờ một người Việt giỏi tiếng Anh đọc lại bản dịch của 8 bài đầu.
5. Sau khi A2 · Pass 1 đủ bộ từ: Pass 2 (chia lại nhóm, chuyện mới), rồi B1.

## 7. Việc cần bạn

Để dùng trên điện thoại và cài lên màn hình chính, web phải nằm ở một địa chỉ https. Việc đó cần một tài khoản lưu trữ web tĩnh của bạn (GitHub Pages, Netlify, Cloudflare Pages đều có gói miễn phí). Đây là điểm dừng theo quy tắc “cần tài khoản”.

## 8. Cập nhật 2026-11-12 (theo phản hồi đầu tiên của bạn)

Các mục dưới đây **thay thế** những chỗ tương ứng ở mục 1–5.

| Yêu cầu của bạn | Đã làm |
|---|---|
| Bấm Start ở Today thì vào một bài đọc | Start mở thẳng bài đọc của hôm nay (bài đang dở, nếu không thì bài mới). Bài ngữ pháp không còn chen vào Today; chỉ khi đã học hết bài đọc mới gợi ý ngữ pháp hoặc đọc lại bài có điểm thấp nhất. |
| Các nút bước (Learn words / Read & listen / Practice) bấm được để lùi hoặc tiến | Bấm được, đi theo mọi hướng, vị trí trong từng bước được giữ. |
| Practice đầy đủ hơn: hiểu bài, từ vựng của bài, ngữ pháp | Practice là một bài kiểm tra ba phần: **Understanding the story** (6–10 câu), **Vocabulary of this story** (cả 23–26 từ mục tiêu được hỏi trong chính bài đọc, dạng “The story with gaps”, cộng các câu về từ dễ nhầm), **Grammar of this story** (4–7 câu). Tổng 25–34 mục mỗi bài. |
| Có chấm điểm, hiện điểm cạnh tên bài | Mỗi câu 1 điểm, cần gợi ý thì nửa điểm, mỗi chỗ trống 1 điểm. Điểm phần trăm hiện cạnh tên bài trong danh sách Reading, trong bài, ở Today (điểm trung bình) và trong Progress (lần gần nhất, cao nhất, số lần làm, điểm từng phần). Làm lại được. |
| Tìm từ vựng bằng tiếng Việt | Ô tìm kiếm có lựa chọn English / Tiếng Việt; gõ có dấu hay không dấu đều được (“ky su” ra “engineer”). |

**Thay đổi kéo theo, do tôi quyết định:**

1. **Ràng buộc cứng số 3 được nới theo lời bạn.** Bản yêu cầu gốc cấm điểm số; yêu cầu mới của bạn có chấm điểm, nên tôi làm theo yêu cầu mới. Chỉ Practice của bài đọc được chấm. Ôn cách quãng, bài ngữ pháp, bài viết và nói theo vẫn không có điểm. Vẫn không có thẻ lật, bảng xếp hạng, đồng hồ đếm ngược.
2. **Thêm bước “Grammar” giữa Read & listen và Practice.** Bước này tự dựng từ dữ liệu sẵn có: mỗi cấu trúc chính của bài có cách dùng, công thức và các câu lấy từ chính bài đọc. Lý do: Practice giờ hỏi ngữ pháp có tính điểm, nên cần chỗ xem lại trước khi làm. Bỏ qua được bằng nút “Go to practice”.
3. **Lượt ôn chuyển xuống cuối bài.** Vì Start phải vào thẳng bài đọc, các từ đến hạn được hỏi trong “Quick recall” ở cuối bài (từ khó nhất của bài vừa học cộng từ cũ đến hạn, trong giới hạn mỗi ngày). Today vẫn có nút “Review now” để ôn trước nếu muốn.
4. **Câu luyện thêm khi sai không tính điểm.** Sai một từ thì thêm một câu mới với từ đó; sai một cấu trúc thì thêm một câu khác của bài ngữ pháp tương ứng.
5. **Bài học dài hơn: ước tính 28–32 phút** (trước là 18–21 phút), vì Practice tăng từ 9–14 lên 25–34 mục. Con số này vẫn là ước tính. Nó chạm vào ràng buộc “xong trong một lần ngồi”; vị trí được lưu ở mọi bước, nhưng nếu bạn thấy quá dài thì cần chọn: rút bớt Practice, hoặc cho phép làm Practice vào hôm sau.

**Tự kiểm sau cập nhật:** `tools/e2e-test.py` 62/62 đạt, `tools/check-content.js` 0 lỗi. Số mục kiểm tra theo bài (hiểu bài / từ vựng / ngữ pháp): 27 (8/14/5), 29 (8/14/7), 27 (8/15/4), 34 (9/18/7), 32 (10/17/5), 29 (9/14/6), 25 (6/14/5), 30 (10/15/5).

## 9. Cập nhật 2026-11-12 (theo phản hồi thứ hai của bạn)

**Bạn quyết định:** làm đề xuất 1 và 3; không làm đề xuất 2 (nghe lại cách quãng) và 4 (câu hỏi dừng chân giữa bài); giữ nguyên độ dài bài học; bỏ yêu cầu về số phút học mỗi ngày.

| Việc | Đã làm |
|---|---|
| Thêm từ bất kỳ vào hàng ôn khi đọc | Bấm một từ trong bài, chọn “Add to my review”. Từ có trong bộ từ thì vào hàng ôn như từ mục tiêu. Từ ngoài bộ từ được lưu thành “từ của riêng bạn” kèm đúng câu trong bài, và được ôn theo cùng lịch 1 → 3 → 7 … ngày bằng ba dạng luân phiên: điền từ vào câu đó, nghe câu rồi gõ từ, tự viết một câu (không lặp một dạng hai lần liên tiếp). Xem và gỡ ở Progress → My words. |
| Kể lại bằng giọng nói | Ở bước cuối sau Practice có khối “Or tell it out loud”: thu âm, nghe lại mình, nghe bài mẫu. Không chấm điểm; bản thu chỉ nằm trong bộ nhớ của trang. |
| Bỏ yêu cầu về thời lượng | Ràng buộc cứng số 4 (“xong trong một lần ngồi”) bị bỏ khỏi `CONTENT_GUIDE.md`. Bài đọc giữ 28–32 phút. Thời gian ước tính vẫn hiện để biết trước, không còn là giới hạn. Giới hạn số mục ôn mỗi ngày vẫn mặc định 15 để lượng ôn dồn lại được chia nhỏ, và có thêm lựa chọn “No limit” trong Settings. |

**Giới hạn cần biết của “từ của riêng bạn”:**

- Từ ngoài bộ từ không có định nghĩa tiếng Anh hay phiên âm. Phần giải thích khi ôn là nghĩa tiếng Việt ngắn (nếu từ đó đã được chú thích trong bài) và bản dịch cả câu. Tôi không tự sinh nghĩa hàng loạt cho các từ này.
- Mỗi từ chỉ có một ngữ cảnh: câu mà bạn đã bấm. Dạng từ được giữ nguyên như trong câu (ví dụ “melting”, không quy về “melt”).
- Thu âm cần trình duyệt cho phép micro, tức là web chạy qua https hoặc localhost. Trang xuất bản trên claude.ai chặn micro, nên ở đó chỉ nghe được bài mẫu.

**Tự kiểm:** `tools/e2e-test.py` 68/68 đạt (thêm 6 phép kiểm cho hai tính năng mới), `tools/check-content.js` 0 lỗi. Việc thu âm thật qua micro chưa được thử; bộ kiểm thử chỉ xác nhận các nút có mặt và bài mẫu hiện ra.

## 10. Lô A2 · Pass 1, bài 9–17 (2026-11-12)

**Yêu cầu:** viết lô bài kế tiếp (8–10 bài) cho lượt đang dở, đúng `CONTENT_GUIDE.md`, tự động hoàn toàn. Đã viết 9 bài, mỗi bài chạy `node tools/check-content.js <id>` đến khi 0 lỗi, 0 cảnh báo.

| n | Bài | Chủ đề · vùng · thời kỳ | Từ | Từ mục tiêu | Practice (hiểu/từ/ngữ pháp) | Ước tính | Nguồn |
|---|---|---|---|---|---|---|---|
| 9 | The Warship That Sank on Its First Day | history · Thụy Điển · 1628 | 746 | 24 | 27 (8/12/7) | 31 phút | Bảo tàng Vasa (2 trang), Britannica, The World, Smithsonian |
| 10 | Half Asleep, Half Awake | nature · đại dương · hiện nay | 710 | 24 | 27 (9/12/6) | 30 phút | Scientific American, Live Science, National Geographic |
| 11 | The Farmers Who Dug for Water and Found an Army | history · Trung Quốc · 210 TCN / 1974 | 720 | 22 | 27 (9/11/7) | 30 phút | Britannica, National Geographic (2 bài), World History Encyclopedia |
| 12 | The Doctor Who Asked Doctors to Wash Their Hands | science · Áo · 1847 | 761 | 23 | 28 (9/12/7) | 31 phút | James Lind Library, Embryo Project (ASU), Wikipedia |
| 13 | The Olympic Race With a Car, a Dog and Some Apples | life · Mỹ · 1904 | 748 | 23 | 25 (8/11/6) | 29 phút | Smithsonian, HISTORY |
| 14 | The Year February Had 30 Days | history · châu Âu · 1582–1923 | 783 | 23 | 28 (9/13/6) | 31 phút | Britannica (2 trang), timeanddate (2 trang), Tøndering, Mental Floss (2 bài), Snopes, Historic UK, History of Parliament |
| 15 | The Doctor in the Hut (Yersin) | history · Việt Nam / Hồng Kông · 1894 | 738 | 21 | 27 (9/12/6) | 30 phút | Britannica, J. Military & Veterans’ Health, SCMP, Whonamedit, Victorian Web |
| 16 | The Dog Walk That Gave Us Velcro | engineering · Thụy Sĩ · 1941–1955 | 661 | 21 | 24 (7/12/5) | 28 phút | National Inventors Hall of Fame, Lemelson-MIT, Velcro Companies, HookandLoop |
| 17 | The Lost City That Was Never Lost | history · Peru · 1450 / 1911 | 624 | 20 | 26 (9/12/5) | 27 phút | UNESCO, Yale News, Andina, History Today, EBSCO, History Collection |

Từ mới của lô nằm ở `data/words-a2-02.js` (201 từ, mỗi bài một mục `# ---- <id>`).

**Quyết định mới:**

1. **Khôi phục ràng buộc cứng số 4 (“xong trong một lần ngồi”).** Ở mục 9, tôi đã bỏ cả ràng buộc này, trong khi bạn chỉ yêu cầu bỏ giới hạn số phút học mỗi ngày. Đó là tôi hiểu quá tay. `CONTENT_GUIDE.md` nay ghi lại: không giới hạn phút mỗi ngày, nhưng mỗi bài (Learn words → Read & listen → Grammar → Practice) phải làm xong trong một buổi, A2 ước tính 25–32 phút. Cả 17 bài A2 nằm trong khoảng 25–32 phút.
2. **Số câu Practice theo độ khó, không theo con số cố định.** Từ 24 đến 28 câu. Mỗi bài ghi lý do trong `practiceNote`. Ví dụ: bài lịch (14) có quy tắc năm nhuận và nhiều mốc năm nên có câu áp dụng quy tắc và câu nối năm với nước; bài Yersin (15) dồn câu từ vựng vào các từ chức năng khó (while, whose, among, against); bài Velcro (16) ngữ pháp đơn giản nên chỉ 5 câu ngữ pháp.
3. **Số từ mục tiêu thấp hơn chuẩn.** `CONTENT_GUIDE.md` yêu cầu 23–26 từ mỗi bài, tỷ lệ từ mới 3,5–5%. Lô này có 20–24 từ mỗi bài, tỷ lệ 2,8–3,4% (8 bài đầu: 3,6–4,3%). Lý do: các bài dài hơn (620–790 từ, để kể đủ sự thật), và với ba bài cuối (15–17) tôi không tìm được thêm từ A2 khớp tự nhiên với chuyện mà không phải thêm chi tiết thiếu nguồn. Kho A2 chưa dùng vẫn còn 474 mục (446 là từ nội dung), nên đây không phải do hết từ. Bù lại, các từ của bài trước xuất hiện lại đúng nghĩa đều được đánh dấu `{…}` (ôn nhẹ trong ngữ cảnh). Nếu bạn muốn giữ đúng 3,5%, lô sau cần bài ngắn hơn (600–650 từ) hoặc nhóm từ khác.
4. **Giai thoại ghi rõ là giai thoại.** “One report says…” (Yersin trả tiền cho hai lính canh — chỉ SCMP ghi; sách phổ thông kể là thủy thủ), “There is an old story…” (quần của Carvajal bị cắt — Smithsonian ghi “legend has it”), “People say…” (Carvajal thua xúc xắc — “reportedly”), bạo loạn “Give us our eleven days” (bốn nguồn nói có lẽ không có thật). Không đưa vào: câu “ngày 30/2 duy nhất trong lịch sử” (Mental Floss, có nguồn khác nhắc ngày 30/2 ở Liên Xô), nguyên văn lời đùa của Franklin (hai nguồn trích hai câu khác nhau), tên Jan Mashiani (chỉ trong chú thích ảnh), tuổi 11 của cậu bé ở Machu Picchu (một nguồn).
5. **Sửa nhỏ trong ứng dụng:** khi bấm một từ không đánh dấu mà bài có `gloss` cho nó, nghĩa trong câu hiện trước, mục từ điển hiện sau kèm lời nhắc. Lý do: “World’s Fair” (hội chợ) trước đây hiện nghĩa “fair = công bằng”; “waved” (vẫy tay) hiện nghĩa “wave = sóng”. Giới hạn: nút “Add to my review” trên từ đó vẫn thêm mục từ điển, không thêm nghĩa trong câu. Đã ghi cách dùng vào `CONTENT_GUIDE.md` mục 2.
6. **Công cụ kiểm tra:** thêm các dạng chính tả Mỹ còn thiếu (color, favorite, neighbor, center, meters, liters, kilometer…) vào bảng quy đổi về dạng Anh của bảng tham chiếu.
7. **Ghi chú cấp độ từ** ở `data/words-a2.js` không còn ghi “194 từ”, mà áp dụng cho mọi từ A2 ở cả hai file.
8. `sw.js`: tăng tên bộ nhớ đệm lên `english-improve-v4` để máy đã mở web tải dữ liệu mới.

**Chỗ các nguồn lệch nhau (chi tiết đầy đủ trong `note` của từng bài, hiện ở Info):** số người chết trên tàu Vasa (khoảng 30 hay 30–50); số tượng đất nung (khoảng 7.000 hay 8.000); tỷ lệ tử vong ở hai khoa sản của Semmelweis (ba nguồn ba con số — bài theo James Lind Library); quãng đường Lorz ngồi ô tô (10 hay 11 dặm), táo hỏng hay táo xanh, một hay nhiều con chó; năm bằng sáng chế Thụy Sĩ của Velcro được cấp (1954 hay 1955 — bài không nêu); chuyến đi của de Mestral (rừng hay dãy Alps — bài viết “mountains”); tên gia đình ở Machu Picchu (Recharte hay Richarte); ngày mất của Yersin trên Whonamedit tự mâu thuẫn (bài theo Britannica).

**Kiểm thử:** `tools/check-content.js` 0 lỗi; còn 9 cảnh báo cũ có chủ ý (“position” ở bài 7, danh từ “half” ở bài 10 — từ mục tiêu là trạng từ). `tools/e2e-test.py` 68/68 đạt. Thêm một phép thử riêng: bấm “Fair” trong bài 13 hiện “hội chợ (World’s Fair)” trước, không lỗi JavaScript.

**Độ phủ hiện tại của A2 · Pass 1:** 17 bài, 395 từ mục tiêu khác nhau, không từ nào lặp trong lượt. Bảng tham chiếu có 867 mục A2; đã phủ 393 mục (45%) cộng 2 từ viết kiểu Mỹ (behavior, traveler). Còn 474 mục chưa dùng, trong đó 28 chỉ là từ chức năng (his, may, shall…), thường được học qua ngữ pháp hơn là làm từ mục tiêu.

**Chưa xác minh (bổ sung cho mục 4):**

- Mỗi bài liệt kê trong `note` các chi tiết chỉ có một nguồn hoặc là kiến thức phổ thông. Đáng chú ý: Yersin lập trường y Hà Nội năm 1902, cây cao su và ký ninh (một nguồn mỗi chi tiết); Simond và bọ chét năm 1898 (một nguồn); Velcro dùng trên Apollo 11 và trên giày cuối thập niên 1960 (chỉ trang của công ty Velcro); độ cao 2.430 m và khoảng 200 công trình ở Machu Picchu (chỉ UNESCO); nhiều thành phố Việt Nam có đường Yersin (kiến thức phổ thông).
- Bài 13 chỉ có hai nguồn; nhiều chi tiết nhỏ (bảy ngọn đồi, bốn bác sĩ và một giờ, chuyện Garcia) chỉ có ở Smithsonian.
- Một số nguồn là trang phổ thông hoặc trang của bên liên quan: Wikipedia (bài 12), History Collection (bài 17), HookandLoop và Velcro Companies (bài 16, đều là bên bán hàng). Mỗi chi tiết chính vẫn có thêm ít nhất một nguồn khác.
- Bản dịch tiếng Việt, định nghĩa, ví dụ và ghi chú của 201 từ mới do AI soạn, chưa có người hiệu đính. Phiên âm lấy từ cùng nguồn với bảng tham chiếu, đổi /əʊ/ thành /oʊ/ theo giọng Mỹ, và sửa tay vài chỗ theo cách đọc Mỹ phổ biến (catch /kætʃ/, against /əˈɡenst/).
- Chưa đọc lại lô này bằng một người khác hoặc một tác tử độc lập.
- Giới hạn đã biết của bản xuất bản trên claude.ai: trình xem chặn việc tải tệp, nên nút xuất dữ liệu (tệp sao lưu) không hoạt động ở đó. Bản chạy từ thư mục `english-improve` (hoặc sau này trên GitHub Pages/Netlify) không bị giới hạn này.

**Lô kế tiếp đề xuất:** A2 · Pass 1, bài 18–26 (khoảng 200 từ nữa). Chủ đề còn ít: body, space, nature; châu Phi ngoài Mali, Trung Đông, Đông Nam Á ngoài Việt Nam. Ứng viên cần xác minh trước: kênh đào Suez; thứ tự QWERTY của bàn phím; đợt “dịch nhảy múa” năm 1518; con chó Laika bay vào vũ trụ năm 1957; trận lụt mật đường ở Boston năm 1919; vụ nổ Tunguska năm 1908. Khi Pass 1 đủ khoảng 860 từ thì sang Pass 2.

## 11. Cập nhật 2026-11-12 (theo phản hồi thứ ba của bạn)

**Bạn yêu cầu:** thích chuyện lịch sử châu Âu thời Trung cổ; lịch sử chỉ cần nhỉnh hơn các chủ đề khác một chút; áp dụng cho các bài sau, 17 bài hiện có giữ nguyên. Đưa dự án lên GitHub để AI khác làm, Claude đóng vai trò quản lý.

1. **Tỷ lệ chủ đề (từ bài 18).** `CONTENT_GUIDE.md` không còn ghi “khoảng một nửa là lịch sử”. Quy định mới: trong mỗi lô, số bài lịch sử nhiều hơn chủ đề đứng thứ hai tối đa 1 bài (lô 9 bài: 3 lịch sử, các chủ đề khác 1–2). Khoảng một nửa số bài lịch sử là châu Âu Trung cổ (thế kỷ 5–15). 17 bài đầu có 9 bài lịch sử; không sửa.
2. **Chuẩn bị cho làm việc song song.** Thêm `AGENTS.md` (luật cho AI làm việc; `CLAUDE.md` và `GEMINI.md` trỏ về đây), CI chạy công cụ kiểm tra và kiểm thử giao diện trên mọi PR (`.github/workflows/check.yml`), xuất bản GitHub Pages khi merge (`.github/workflows/pages.yml`), mẫu issue và PR. Để các PR không sửa chung một file: từ bài 18, từ mục tiêu mới khai báo ngay đầu file bài đọc; `data/manifest.js` có sẵn một dòng bị chú thích cho mỗi bài của lô, người viết chỉ bỏ `//`. Đã thử: chuyển phần từ của bài 17 vào file bài đọc thì công cụ kiểm tra vẫn 0 lỗi.
3. **Người làm không sửa `DECISIONS.md`.** Quyết định và chỗ lệch nguồn ghi trong mô tả PR; quản lý ghi vào đây khi merge. Mỗi PR bài đọc phải có bảng “chi tiết → nguồn” có trích câu gốc, để việc duyệt không phải tra lại từ đầu.
4. **Repo GitHub cũ.** `ChanHoang/English-Improve` đã có một dự án khác: bản trước, kiến trúc khác (một file `index.html` 31 MB, 5.943 từ, có flashcard và quiz), khoảng 280 MB, tự đồng bộ từ Google Drive, đang chạy ở chanhoang.github.io/English-Improve. Bản này không đẩy lên đó. Ngày 12/11/2026, bạn tạo repo mới `ChanHoang/English-reading`; mã nguồn đã đẩy lên nhánh `main`. Lần chạy CI đầu tiên trên GitHub: Content checker và End-to-end test đều đạt; Publish site lỗi vì Pages chưa bật (Settings → Pages → Source: GitHub Actions).

**Lô kế tiếp đề xuất (bài 18–26):** 3 lịch sử (2 châu Âu Trung cổ + 1 vùng khác), 2 khoa học hoặc cơ thể, và mỗi chủ đề thiên nhiên, vũ trụ, kỹ thuật, đời sống 1 bài. Ứng viên Trung cổ cần xác minh trước: người Viking ở Bắc Mỹ (L’Anse aux Meadows, vòng gỗ cho năm 1021); sách Domesday năm 1086; “tấm thảm” Bayeux thật ra là tranh thêu; mộ thuyền Sutton Hoo; các phiên tòa xử động vật thời Trung cổ (con lợn ở Falaise năm 1386). Ứng viên khác: kênh đào Suez, thứ tự QWERTY, con chó Laika năm 1957, trận lụt mật đường ở Boston năm 1919.

## 12. Lô A2 · Pass 1, bài 18–26 (2026-11-13)

**Yêu cầu:** Claude tự viết lô 18–26 như lô trước (không giao cho AI khác), theo quy định chủ đề mới.

| n | Bài | Chủ đề · vùng · thời kỳ | Từ | Từ mục tiêu | Practice (hiểu/từ/ngữ pháp) | Ước tính | Số nguồn |
|---|---|---|---|---|---|---|---|
| 18 | The Viking Village and the Storm on the Sun | history · Canada · 1021 | 613 | 19 | 25 (8/12/5) | 27 phút | 6 |
| 19 | The Slowest Drop in the World | science · Úc · 1927–nay | 604 | 13 | 23 (7/11/5) | 25 phút | 5 |
| 20 | The Elephants Who Call Each Other by Name | nature · Kenya · 2024 | 610 | 15 | 23 (7/11/5) | 25 phút | 2 |
| 21 | The Tapestry That Is Not a Tapestry | history · Anh / Pháp · 1066–nay | 606 | 11 | 23 (8/10/5) | 24 phút | 4 |
| 22 | The First Webcam Watched a Coffee Pot | engineering · Anh · 1991–2001 | 612 | 12 | 23 (8/11/4) | 25 phút | 3 |
| 23 | Two Peach Baskets and Thirteen Rules | life · Mỹ · 1891 | 600 | 10 | 24 (8/11/5) | 25 phút | 3 |
| 24 | One Twin in Space, One Twin on Earth | body · Mỹ / vũ trụ · 2015–2019 | 605 | 7 | 21 (7/10/4) | 23 phút | 2 |
| 25 | The King Who Gave His People an Alphabet | history · Hàn Quốc · 1443 | 604 | 9 | 22 (8/10/4) | 23 phút | 3 |
| 26 | A Hello in Vietnamese, Far Out in Space | space · vũ trụ · 1977–nay | 601 | 7 | 21 (7/10/4) | 23 phút | 4 |

Tỷ lệ chủ đề: lịch sử 3 (2 bài châu Âu Trung cổ: Viking, Bayeux), mỗi chủ đề khác 1. `CONTENT_GUIDE.md` sửa lại câu chữ cho khớp: lịch sử nhiều nhất nhưng không quá một phần ba lô. Câu cũ “hơn chủ đề đứng thứ hai tối đa 1 bài” mâu thuẫn với chính ví dụ của nó.

**Quyết định mới:**

1. **Đổi hai bài so với kế hoạch.** Kế hoạch đầu có hiệu ứng Mpemba và tháp nghiêng Pisa. Đã tra nguồn cho cả hai, nhưng bỏ vì mỗi bài chỉ dùng được 6–8 từ A2 còn lại. Thay bằng bài webcam đầu tiên (Cambridge 1991) và bài bóng rổ (Springfield 1891), vì hai chuyện này có nhiều từ đời sống hơn (screen, laptop, app, coach, score…).
2. **Số từ mục tiêu giảm mạnh và còn thấp hơn chuẩn.** Lô này có 7–19 từ mỗi bài (tổng 103), tỷ lệ từ mới 1,2–3,1%, trong khi chuẩn là 23–26 từ và 3,5–5%. Nguyên nhân: 348 từ nội dung A2 còn lại gần như chỉ thuộc đời sống hằng ngày (nhà cửa, đồ ăn, công việc, đi lại, giải trí, sức khỏe, công nghệ). Chúng không có chỗ tự nhiên trong chuyện lịch sử hay khoa học, và tôi không thêm chi tiết thiếu nguồn để nhét từ. Bù lại, từ của các bài trước được đánh dấu lại nhiều hơn ở đúng nghĩa. Mỗi bài vẫn 600–613 từ và 21–25 câu luyện, nên vẫn xong trong một lần ngồi (23–27 phút).
3. **Công cụ mới `tools/unused-words.js`:** liệt kê từ của một cấp chưa có trong bộ từ. `CONTENT_GUIDE.md` thêm bước 0: xem danh sách này trước khi chọn chuyện.
4. **Từ mới khai báo ngay đầu file bài đọc** (quy ước của mục 11), áp dụng cho cả 9 bài.
5. **Công cụ kiểm tra:** thêm `toward`, `percent`, `flown` vào bảng quy đổi.
6. **Chuyện có câu tiếng Việt (bài 26).** Câu chào tiếng Việt trên Đĩa Vàng chỉ đặt ở dòng dịch tiếng Việt. Trong câu tiếng Anh chỉ dùng bản dịch tiếng Anh của NASA, để công cụ kiểm tra không coi các chữ tiếng Việt là từ vượt cấp.

**Chưa xác minh hoặc chỉ một nguồn** (chi tiết trong `note` của từng bài):

- **Bài 20 (voi) và bài 24 (cặp song sinh) chỉ có hai nguồn.** Không mở được bài gốc trên nature.com và trang của NASA vì các trang này chặn truy cập tự động.
- **Một số nguồn là trang phổ thông.** Today I Found Out (bài 23) là nguồn duy nhất cho tỉ số 1–0, chuyện trèo thang và giá 4,3 triệu đô.
- **Chi tiết chỉ có một nguồn, tiêu biểu:**
  - Bài 21: 627 nhân vật và hơn 700 con vật; khoản bảo đảm 800 triệu bảng.
  - Bài 22: người mua là Spiegel Online.
  - Bài 25: lời Jeong In-ji về “một buổi sáng, mười ngày”.
  - Bài 26: tên người nói tiếng Việt (Trần Trọng Hải) và chi tiết giọng miền Nam.
- **Kiến thức phổ thông, không lấy từ nguồn đã đọc:**
  - Bài 26: Voyager 1 cách Trái Đất hơn 20 tỷ km; tín hiệu radio mất gần một ngày.
  - Bài 25: cách ghép khối chữ Hangul.
  - Bài 19: một số loại nhựa biến dạng chậm khi chịu tải lâu.
- **Bài 21 (Bayeux) có chi tiết hiện tại:** tấm thêu đang ở Bảo tàng Anh từ 10/9/2026 đến 11/7/2027. Sau tháng 7/2027, phần “Right now” của bài sẽ cần sửa.

**Độ phủ A2 · Pass 1 sau lô này:** 26 bài, 498 từ mục tiêu không lặp. Đã phủ 496 trên 867 mục A2 của bảng tham chiếu (57%). Còn 371 mục, trong đó 348 là từ nội dung.

**Đề xuất cho lô 27 trở đi:** chọn chuyện có thật thuộc đời sống hằng ngày để dùng hết các từ còn lại. Ứng viên cần xác minh trước:
- William Addis làm bàn chải đánh răng trong tù (khoảng năm 1780): prison, brush.
- Trận khói mù ở London năm 1952: pollution, smoke.
- Chuyến bay chở khách thương mại đầu tiên năm 1914: airline, passenger.
- Tàu điện ngầm London năm 1863: railway, platform, passenger.
- Chiếc xe đẩy siêu thị năm 1937: store.
- Bức ảnh “selfie” đầu tiên năm 1839: photograph.

Lịch sử Trung cổ châu Âu vẫn chiếm khoảng một nửa số bài lịch sử, nhưng nên chọn chuyện có nhiều từ đời sống (ăn uống, chợ, nghề nghiệp thời Trung cổ).


## 13. Lô A2 · Pass 1, bài 27–54: phủ hết từ A2 (2026-11-13)

**Yêu cầu (13/11/2026):** viết tiếp đến khi phủ hết từ A2; mở rộng thể loại bài đọc để dễ dùng từ mục tiêu; kiểm soát nguồn không cần quá chặt, nhưng không được bịa; không hỏi quyền truy cập web, trang nào không vào được thì bỏ qua.

| n | Bài | Chủ đề · vùng · thời kỳ | Từ | Từ mục tiêu | Practice (hiểu/từ/ngữ pháp) | Ước tính | Số nguồn |
|---|---|---|---|---|---|---|---|
| 27 | Is It a Lorry or a Truck? | language · Britain & USA · 1783 · nay | 795 | 28 | 27 (9/12/6) | 32 phút | 3 |
| 28 | Four Days of Work, Five Days of Pay | work · Britain · 2022–2024 | 726 | 28 | 27 (8/12/7) | 30 phút | 3 |
| 29 | The Day the Mona Lisa Disappeared | history · France & Italy · 1911–1914 | 778 | 25 | 24 (8/10/6) | 29 phút | 2 |
| 30 | Eleven Days Without Agatha Christie | culture · England · 1926 | 698 | 22 | 26 (8/12/6) | 29 phút | 2 |
| 31 | One Day, Two Concerts, the Whole World | culture · England & USA · 1985 | 682 | 18 | 25 (8/11/6) | 27 phút | 2 |
| 32 | The President and the Bear | history · USA & Germany · 1902–1906 | 613 | 12 | 24 (8/10/6) | 25 phút | 2 |
| 33 | A Hundred Years in a Bowl of Pho | food · Vietnam · 1900s · nay | 652 | 18 | 25 (8/11/6) | 27 phút | 2 |
| 34 | The King Who Built a Fairy-Tale Castle | travel · Germany · 1869–1892 | 622 | 15 | 23 (8/9/6) | 25 phút | 2 |
| 35 | What the Iceman’s Body Tells Us | body · Italy & Austria · khoảng 3300 TCN | 613 | 14 | 25 (8/11/6) | 26 phút | 1 |
| 36 | From a Penny Stamp to a Christmas Text | life · Britain · 1840 · 1992 | 605 | 13 | 23 (8/9/6) | 24 phút | 2 |
| 37 | Did Einstein Fail Math? | science · Germany & Switzerland · 1895–1935 | 625 | 14 | 24 (8/10/6) | 25 phút | 2 (chưa mở) |
| 38 | The First Train Under a City | engineering · England · 1863 · nay | 609 | 12 | 23 (8/9/6) | 24 phút | 1 |
| 39 | Marie Curie and Her Little Vans | science · Poland & France · 1867–1934 | 601 | 10 | 24 (8/10/6) | 25 phút | 2 |
| 40 | The First Space Travelers Were Not People | space · USA & Soviet Union · 1947–1998 | 606 | 9 | 24 (8/10/6) | 25 phút | 1 |
| 41 | A Park on Top of a Volcano | travel · USA · 1872 · nay | 600 | 11 | 24 (8/10/6) | 25 phút | 1 |
| 42 | The Town With 45 Kinds of Rubbish | life · Japan · 1997 · nay | 629 | 9 | 25 (8/11/6) | 25 phút | 4 |
| 43 | The Little Man Who Made the World Laugh | culture · England & USA · 1889–1977 | 614 | 10 | 25 (8/11/6) | 25 phút | 1 |
| 44 | A Hotel Room the Size of a Bed | travel · Japan · 1979 · nay | 604 | 9 | 23 (8/9/6) | 24 phút | 1 |
| 45 | How Do You Say Hello? | life · World · nay | 614 | 10 | 25 (8/11/6) | 25 phút | 1 |
| 46 | Cash, Cards and Tips | work · USA & World · 1950 · nay | 607 | 9 | 23 (8/9/6) | 24 phút | 2 |
| 47 | Eleven Days of Snow and Ice | sport · France · 1924 | 604 | 8 | 24 (8/10/6) | 24 phút | 1 |
| 48 | Sports Words at the Office | language · USA & Britain · nay | 616 | 6 | 21 (8/8/5) | 22 phút | 1 |
| 49 | A Diary in the Back House | history · Netherlands · 1942–1947 | 605 | 6 | 23 (8/9/6) | 23 phút | 1 |
| 50 | Old Stories Inside Everyday Words | language · England & USA · 1540 · nay | 627 | 7 | 25 (9/10/6) | 25 phút | 6 |
| 51 | The First Airline | travel · Florida, USA · 1914 | 618 | 4 | 26 (11/8/7) | 24 phút | 3 |
| 52 | The Red Carpet | culture · Greece & USA · 458 BC · nay | 619 | 5 | 25 (10/9/6) | 24 phút | 2 |
| 53 | Two Wheels, Three Wheels | engineering · Germany · 1885–1888 | 613 | 4 | 24 (9/9/6) | 23 phút | 5 |
| 54 | Home Words at Work | language · English at work · nay | 624 | 12 | 27 (9/12/6) | 26 phút | 2 |

**Quyết định mới:**

1. **Nới quy tắc nguồn từ bài 27.** Mỗi bài dựa trên ít nhất **một** nguồn đáng tin đã mở và đọc trong phiên; kiến thức phổ thông dùng được nhưng phải ghi trong `note`. Bài 1–26 vẫn theo chuẩn cũ (hai nguồn). Đã sửa `CONTENT_GUIDE.md` (quy tắc 1, bước 2), `AGENTS.md` (ràng buộc 1) và công cụ kiểm tra (`needs at least one source`). Trang Info trong app nói rõ hai mức này.
2. **Thêm chủ đề.** `EI.TOPICS` thêm work, travel, food, culture, sport, language. Mặc định: lịch sử 2, mỗi chủ đề khác 1. Có thêm thể loại **bài giải thích có thật**: nghĩa và nguồn gốc từ (27, 48, 50, 54), phong tục (45), cách trả tiền (46), địa điểm (34, 41, 44). Bài giải thích không có cốt truyện, nên phần hiểu bài là chọn nghĩa đúng trong ngữ cảnh.
3. **Cờ `unchecked`.** Bài 37 (Einstein) viết khi công cụ đọc web bị giới hạn. Nội dung là các sự kiện được ghi chép rộng rãi, chưa mở nguồn trong phiên. Bài có `unchecked: true`, và app hiện dòng “sources not opened yet” thay cho ngày kiểm tra.
4. **Số từ mục tiêu giảm dần.** Bài 27–28 có 28 từ; bài 47–53 chỉ còn 4–8 từ. Đây là các từ khó đặt vào chuyện. Không nhét từ bằng chi tiết thiếu nguồn: bài vẫn 600–800 từ, các từ của bài trước được đánh dấu lại ở đúng nghĩa.
5. **Mười bài ước tính 22–24 phút**, dưới chuẩn 25–32: 36, 38, 44, 46–49, 51–53. Công cụ không cảnh báo mức này. Vẫn xong trong một lần ngồi, nhưng nếu muốn đúng chuẩn thì cần thêm 1–2 câu luyện mỗi bài.
6. **Sửa bài 42 (Kamikatsu).** Bản cũ có ba câu không nguồn nào nói: lò đốt lớn mới quá đắt, không có xe chở rác, phân loại vất vả với người già. Đã đọc thêm World Economic Forum và zwtk.jp, rồi sửa: chính phủ coi khí thải dioxin là không an toàn; người không có xe nhờ thị trấn đến lấy rác; tình nguyện viên giúp người già không có xe. WEF còn nói người dân thấy phân loại “không khó đến thế”.
7. **Công cụ:**
   - `check-content.js` thêm `jewelry`, `math`, `organisation`, `anymore` vào bảng quy đổi.
   - `e2e-test.py` đổi từ khóa tìm `disc` thành `discover`. Bài 37 thêm từ `discussion`, nên từ khóa cũ trả về 3 dòng thay vì 2.
   - `sw.js` lên `english-improve-v6`.

**Tỷ lệ chủ đề.** Lô này: language 4, culture 4, travel 4, history 3, life 3, work 2, science 2, engineering 2, còn lại mỗi chủ đề 1. Trong lô, lịch sử không còn đứng đầu, vì phải chọn chuyện theo từ còn lại. Tính cả 54 bài, lịch sử vẫn nhiều nhất: 15 bài, các chủ đề đứng sau có 4–5 bài. Ba bài lịch sử của lô (Mona Lisa 1911, gấu Teddy 1902, Anne Frank 1942) không có bài nào thuộc châu Âu Trung cổ, trái với ưu tiên trong `CONTENT_GUIDE.md` (khoảng một nửa số bài lịch sử). Lý do: các từ còn lại là từ đời sống hiện đại. Lô tiếp theo nên bù lại.

**Chưa xác minh hoặc chỉ một nguồn** (chi tiết trong `note` của từng bài):

- **Bài 37:** chưa mở nguồn nào trong phiên (cờ `unchecked`).
- **Mười bài chỉ dựa trên một nguồn:** 35, 38, 40, 41, 43, 44, 45, 47, 48, 49. Ở các bài khác, nhiều chi tiết cũng chỉ có một nguồn; `note` ghi rõ nguồn nào nói gì.
- **Chi tiết mà các nguồn nói khác nhau** đã được viết chung chung:
  - Bài 51: ngày chuyến bay cuối cùng (27/4 hay 5/5/1914); người mua vé đầu tiên là cựu thị trưởng St. Petersburg theo IATA và Space.com (Vintage Aviation News ghi Tampa).
  - Bài 52: năm phát sóng màu.
  - Bài 53: dung tích và công suất động cơ.
- **Kiến thức phổ thông, không lấy từ nguồn đã đọc** (tiêu biểu):
  - Bài 27: các cặp từ Anh/Mỹ.
  - Bài 50: nguồn gốc từ lemon.
  - Bài 51: chuyến bay Hà Nội – TP.HCM khoảng hai giờ.
  - Bài 52: diễn viên trao giải; thảm đỏ đón tổng thống.
  - Bài 53: cách gọi “mô tô chạy xăng đầu tiên”.
  - Bài 54: phần lớn các nghĩa thông dụng (paper jam, a real headache, Lovely!, for good…).

**Độ phủ A2 · Pass 1 sau lô này:** 54 bài, 846 từ mục tiêu không lặp. `node tools/unused-words.js A2 --content` báo 0 mục còn lại: toàn bộ 867 mục A2 của bảng tham chiếu đã được phủ hoặc là từ chức năng được lọc ra.

**Đề xuất tiếp theo:**
- Pass 2 của A2: ôn lại từ đã học trong chuyện mới, ưu tiên các từ chỉ xuất hiện ở bài có mật độ từ thấp.
- Hoặc bắt đầu B1.
- Bổ sung câu luyện cho mười bài dưới 25 phút.
- Mở nguồn cho bài 37 khi có dịp.


## 14. Đồng bộ giữa các máy bằng mã, không có tài khoản (2026-11-13)

**Yêu cầu:** đồng bộ tiến độ khi học trên nhiều thiết bị. Bản dùng chính là GitHub Pages, dưới 5 người học.

**Quyết định:**

1. **Không làm hệ thống tài khoản.** Với dưới 5 người, tài khoản (email + mật khẩu, Supabase hay Firebase) buộc phải lưu dữ liệu cá nhân và thêm SDK, trái hai ràng buộc gốc. Thay vào đó dùng **mã đồng bộ** 16 ký tự ngẫu nhiên (80 bit, bảng chữ Crockford base32, không có I, L, O, U). Mã là khóa duy nhất trên máy chủ.
2. **Máy chủ:** một Cloudflare Worker (`sync/worker.js`) không phụ thuộc thư viện, lưu trong Workers KV. Ba lệnh GET/PUT/DELETE trên `/v1/s/<mã>`.
   - **Ghi kèm phiên bản:** máy gửi `base` là phiên bản nó đã đọc; nếu bản lưu đã khác thì máy chủ trả 409 kèm bản mới.
   - **Xóa để lại dấu:** xóa thì để lại dấu “deleted” (410) trong 90 ngày, để các máy khác tự ngừng.
   - **Giới hạn:** tối đa 1 MB mỗi mã; mã không ghi gì trong khoảng 13 tháng sẽ tự hết hạn.
   - **Trang được phép:** chỉ nhận yêu cầu từ `https://chanhoang.github.io`; đổi bằng biến `ALLOWED_ORIGINS`.
3. **Trình duyệt vẫn là bản chính** (học offline như cũ). Đồng bộ = đọc bản trực tuyến → gộp bằng đúng quy tắc Import → Merge → ghi lại nếu khác.
   - So sánh bằng “dấu vân tay” không phụ thuộc thứ tự, nên hai máy đã giống nhau thì không ghi thêm.
   - Đồng bộ khi mở web, khi quay lại tab, khi có mạng lại, 5 phút một lần nếu có thay đổi, và bằng nút Sync now. Khi đóng tab, máy gửi nhanh thay đổi nếu dữ liệu dưới 60 KB.
   - Không đồng bộ khi đang làm dở một bài học, để không đổi dữ liệu giữa chừng.
4. **Không đồng bộ** cài đặt, màn hình đang mở, ngày xuất file. Erase all progress cũng ngừng đồng bộ trên máy đó (bản trực tuyến không bị xóa).
5. **Ẩn khi chưa cài:** thẻ Sync chỉ hiện khi `EI.SYNC_URL` (trong `js/core.js`) có địa chỉ Worker. Bản một file trên claude.ai không có đồng bộ, vì trang ở đó không được gọi máy chủ ngoài.
6. **Service worker** không lưu cache các yêu cầu `/v1/s/`. Cache lên `english-improve-v7`.
7. **Kiểm thử:**
   - `tools/sync-test.mjs`: 13 kiểm tra cho Worker, với KV giả.
   - `tools/e2e-test.py`: thêm 9 kiểm tra hai “máy” trình duyệt, chạy Worker thật trên máy qua `tools/sync-dev-server.mjs` (tạo mã, nhập mã sai và đúng, gộp tiến độ hai chiều, cài đặt không bị đồng bộ, xóa bản trực tuyến).
   - CI chạy cả hai.

**Đánh đổi đã chấp nhận:**
- Ai có mã thì đọc và sửa được tiến độ của người đó. Đây là dữ liệu học, không nhạy cảm.
- Workers KV có độ trễ lan truyền giữa các vùng. Nhờ ghi kèm phiên bản và luôn gộp (không xóa), độ trễ đó chỉ làm chậm một lượt đồng bộ, không làm mất dữ liệu.
- Gói miễn phí giới hạn 1.000 lần ghi/ngày cho cả tài khoản. Khoảng 12 lần ghi mỗi giờ cho mỗi người đang học, nên đủ cho dưới 5 người.

**Trạng thái (13/11/2026, 13:30):** Worker đã cài ở `https://ei-sync.chanhoang226.workers.dev`; `/health` trả `{"ok":true,"kv":true}`. `EI.SYNC_URL` đã điền, thẻ Sync đã hiện trên GitHub Pages. Từ môi trường của quản lý không gọi được tới workers.dev (mạng bị chặn), nên lần thử tạo mã và nhập mã với máy chủ thật do chủ dự án làm trên hai máy.

## 15. Giọng đọc AI tạo sẵn (Kokoro) (2026-11-14)

- **Không dùng âm thanh của Cambridge** hay từ điển khác: điều khoản API của Cambridge cấm lưu bản sao, và muốn dùng trong ứng dụng phải ký thỏa thuận riêng.
- **Dùng Kokoro-82M** (Apache-2.0), tạo sẵn MP3 cho bài đọc và từ vựng; giọng trình duyệt chỉ còn làm dự phòng. Lý do: cùng giọng trên mọi máy, nghe được offline, không tốn phí theo lượt nghe, không cần khóa API.
- **Giọng:** `af_heart` (điểm A, cao nhất trong bảng chấm của tác giả Kokoro) và `af_bella` (A-). Chọn ngẫu nhiên nhưng ổn định theo từng bài đọc và từng mục từ. Giọng nam tốt nhất chỉ đạt C+, nên không dùng. Chủ dự án đã nghe mẫu và chọn cả hai giọng.
- **Ngắt dài hơn:** 0,45 s sau dấu phẩy, 0,55 s sau `;` `:` `—`, 0,9 s cuối câu. Không ngắt trong số (`3,000`) hay sau viết tắt (`St.`).
- **Ngoại lệ quy tắc “không file nhị phân lớn”:** cho phép thư mục `audio/`, MP3 đơn kênh 48 kbps, dự kiến khoảng 100 MB. Phải dừng lại báo nếu vượt 200 MB.
- **Nhãn trung thực:** web ghi rõ là “AI voice (Kokoro)”, không để người học nghĩ là giọng người thật.
- **Người làm:** chủ dự án đổi ý, giao cho Claude làm luôn trong phiên quản lý (không dùng Gemini). File việc `tasks/audio-kokoro.md` vẫn giữ làm đặc tả.
- **Cách đặt tên file:** theo băm của chính câu chữ (`audio/<EI.audioKey(text)>.mp3`, hàm cyrb53 dùng chung cho app và công cụ), nên mọi chỗ phát âm thanh (bài đọc, từ, câu ví dụ, luyện nghe, chính tả, shadowing) tự tìm được file mà không phải sửa từng chỗ. Câu trùng nhau chỉ có một file.
- **Phát:** một thẻ `<audio>` dùng chung, mở khóa bằng âm lặng ngay trong lần chạm đầu (điện thoại chặn phát tự động), tải file thành blob để tránh yêu cầu Range qua service worker; tốc độ phát theo cài đặt, giữ cao độ. Lỗi tải → giọng trình duyệt.
- **Service worker:** file âm thanh nằm trong cache riêng `ei-audio-v1`, không bị xóa khi app cập nhật; tải khi nghe lần đầu, không tải trước.
- **Công cụ:** `tools/audio-items.js` (danh sách câu và giọng), `tools/make-audio.py` (tạo, chỉ làm lại phần thay đổi, `--check`, `--shard k/n` để chạy song song), `tools/audio-lexicon.json` (sửa cách đọc: viết tắt, số La Mã, °C, £/$, p.m.). Mô hình tải về `tools/.kokoro/`, không commit.
- **Kết quả (2026-11-14):** 4.049 file (câu bài đọc, từ, câu ví dụ; câu trùng chỉ một file), 106 MB; Heart 1.974, Bella 2.075. Tạo bằng hai tiến trình song song, khoảng 2 giờ. Đo trên file: ngắt sau dấu phẩy khoảng 0,5 s, cuối câu khoảng 0,93 s. Kiểm thử 84/84, `make-audio.py --check` sạch. Chưa có người nghe hết: chủ dự án nghe và báo chỗ đọc sai để thêm vào `tools/audio-lexicon.json`, rồi chạy lại `make-audio.py` (chỉ tạo lại câu bị đổi).

## 16. Sửa giao diện v0.1.1 và cách đánh số phiên bản (2026-11-14)

- **Số phiên bản:** `v0.<giai đoạn>.<lần sửa>`, theo `ROADMAP.md`. Giai đoạn = một lô bài đọc và từ mới; lần sửa = thay đổi không thêm từ hay bài. Hiện cạnh nút Info (`EI.VERSION`). A2 · Pass 1 là v0.1; bản sửa này là v0.1.1.
- **Lộ trình:** v0.2 A2 Pass 2, v0.3–v0.4 B1, v0.5 B1 Pass 2, v0.6–v0.8 B2, v0.9–v1.0 C1. Số bài, số từ là ước tính từ danh sách Oxford.
- **Giữ chỗ đang xem:** Show meaning, Hide meaning, Known (Learn words, trang từ) và trả lời câu hỏi trong Practice không còn cuộn về đầu trang.
- **Trình phát:** thanh thời lượng của cả bài (tổng độ dài các câu; độ dài file lấy từ `audio/index.js`, giọng trình duyệt thì ước tính và ghi “~”), kéo để nhảy tới câu và đúng giây trong câu. Đổi tốc độ khi đang phát file thì đọc tiếp; giọng trình duyệt không đổi tốc độ giữa chừng được nên đọc lại câu đó. Pause rồi Play đọc tiếp từ chỗ dừng.
- **Practice chia phần:** mỗi phần (Understanding the story, Vocabulary, Grammar) hiện hết câu hỏi một lúc, trả lời theo thứ tự nào cũng được; câu thêm sau khi sai (không chấm điểm) nằm cuối phần đang làm. Phải trả lời hết một phần mới sang phần sau. Tiến độ làm dở của phiên bản cũ (mỗi câu một trang) được làm lại từ đầu bài luyện.
- **Sao lưu:** không bỏ. Đồng bộ không thay được file sao lưu: lỗi hoặc thao tác xóa trên một máy sẽ được chép sang mọi máy, và bản trên mạng hết hạn sau 400 ngày không dùng. Khi đã bật đồng bộ thì không còn nhắc sao lưu; nút Export/Import vẫn ở Settings.

## 17. v0.2 (A2 · Pass 2) giao cho ChatGPT (2026-11-14)

- Chủ dự án đã nối ChatGPT với GitHub và giao v0.2 cho ChatGPT. Quản lý (Claude) chia việc, duyệt và merge PR, tạo giọng đọc.
- **24 bài** (`a2-p2-01` … `24`), không thêm từ. Từ được phân: 594 từ A2 chỉ mới gặp ở một bài Pass 1, mỗi từ thuộc đúng một bài, 23–26 từ một bài, nhóm theo chủ đề của chuyện gợi ý. 65 từ còn lại (từ chức năng, chính tả Anh) ở `tasks/a2-p2-spare.md`. Lộ trình cũ ghi “khoảng 20 bài”; tăng lên 24 để phủ gần hết số từ mới gặp một lần.
- Chuyện gợi ý đã đối chiếu với tiêu đề 54 bài Pass 1 để không trùng (bỏ Semmelweis, bóng rổ, Mona Lisa, tin nhắn đầu tiên, tàu điện ngầm London, Bertha Benz, Diners Club vì Pass 1 đã kể). Chưa tra nguồn cho chuyện gợi ý; người làm phải tra.
- Chủ đề: lịch sử 2 bài (cả hai thời Trung cổ châu Âu: chiếc nĩa, Magna Carta), còn lại xen sport, body, food, work, travel, engineering, nature, science, culture, language, space, life. Châu Á 5 bài (có Việt Nam: chữ Quốc ngữ), châu Phi 2.
- 4 đợt × 6 bài. Một bài = một nhánh = một PR. `data/manifest.js` có dòng đặt sẵn cho từng bài, xen dòng chú thích để các PR song song merge không xung đột (đã thử bằng git).
- Quy định Pass 2: `CONTENT_GUIDE.md` mục 1b. App đã chạy được bài Pass 2 (thử bằng một bài giả): danh sách, Learn words, Practice chia phần, Coverage.
- v0.1.2: bước Learn words của bài Pass 2 ghi “Ôn lại … từ đã gặp ở Pass 1”.

## 18. Giọng Heart cho mọi nội dung mới; GitHub tự tạo giọng đọc (2026-11-14)

- **Chủ dự án:** “từ nay về sau hãy lấy giọng heart”. Mọi câu, từ và câu ví dụ **mới** dùng `af_heart`. 4.049 file đã có giữ nguyên giọng (Heart 1.974, Bella 2.075); chủ dự án đã quyết định không tạo lại (09:29 cùng ngày). `tools/audio-items.js` lấy giọng của file đã có trong `audio/manifest.json`, còn lại là Heart. Hệ quả: nếu sửa một câu của bài Pass 1 đang đọc bằng Bella, câu đó sẽ đọc bằng Heart.
- **Không giao việc tạo âm thanh cho ChatGPT.** Lý do: mỗi PR sẽ sửa cùng `audio/index.js` (một dòng dài) và `audio/manifest.json`, nên các PR làm song song chắc chắn xung đột; mỗi phiên phải tải mô hình 350 MB. Thay vào đó, workflow `.github/workflows/audio.yml` chạy trên GitHub sau mỗi lần nội dung vào `main`: kiểm tra (`make-audio.py --check`), nếu thiếu thì cài Kokoro (mô hình được cache), tạo file, kiểm tra lại, commit vào `main` bằng `github-actions[bot]`, rồi chạy lại “Publish site” (commit bằng GITHUB_TOKEN không tự kích hoạt workflow khác). Không ai phải làm tay.

## 19. Bỏ ChatGPT, Claude làm v0.2 (2026-11-14)

- Thử giao bài `a2-p2-01` cho Codex: lần đầu Codex bị chặn Internet nên dừng đúng quy định; lần sau viết được bài (theo Codex: 603 từ, 23 từ mục tiêu, kiểm tra đạt) nhưng không đẩy được lên GitHub (403) và giao diện Codex của chủ dự án không có nút tạo PR. Bài đó chưa lên repo và không dùng.
- Chủ dự án: “Hãy bỏ qua việc này. Sau này bạn sẽ làm những việc này.” Claude viết 24 bài v0.2 theo `tasks/a2-p2-*.md` khi chủ dự án yêu cầu. Các file việc, danh sách từ và quy định Pass 2 giữ nguyên.

## 20. Bài a2-p2-01 (Abebe Bikila), v0.1.3 (2026-11-14)

- Bài Pass 2 đầu tiên, Claude viết để chủ dự án xem thử trước khi làm tiếp. 679 từ, 23 từ mục tiêu (bỏ `track` vì mục từ là “vết, dấu vết”, không phải đường chạy; bỏ `goal`, `crowded` vì không có nguồn cho câu tự nhiên), ước tính 30 phút, 28 câu luyện.
- Nguồn: World Athletics (chính), Wikipedia (Abebe Bikila; Obelisk of Axum), Britannica. Bỏ câu “trước cuộc đua hầu như không ai biết tên anh” vì không nguồn nào đã đọc nói vậy. Không dùng cụm “người châu Phi da đen đầu tiên giành vàng” (nguồn đã đọc chỉ nói “người Ethiopia đầu tiên”).
- Số phiên bản: bài Pass 2 không thêm từ mới, nên theo quy tắc của chủ dự án là tăng số thứ ba (v0.1.3). Đủ 24 bài thì lên v0.2.

## 21. v0.2: đủ 24 bài A2 · Pass 2 (2026-11-14)

- Chủ dự án: “Hãy hoàn thành v0.2”. Claude viết `a2-p2-02` … `a2-p2-24` theo file việc, mỗi bài một commit trên `main`, kiểm tra `check-content` 0 error, 0 warning cho từng bài. Không có số phiên bản trung gian: v0.1.3 lên thẳng v0.2.
- Mỗi bài có ít nhất hai nguồn đã mở trong phiên (trừ khi một nguồn chính thức đủ chi tiết), ghi ở `sources`; chi tiết một nguồn, kiến thức phổ thông và chỗ các nguồn lệch nhau ghi ở `note`. Khi nguồn lệch (ví dụ ngày Amundsen khởi hành 19 hay 20/10/1911, ngày về 25 hay 26/1/1912), bài viết mức chung (“tháng 10”, “cuối tháng 1”). Giai thoại ghi rõ là giai thoại (“The story says…”, “Montessori wrote…”). Đoạn lời khuyên ở cuối một số bài (Hubble, Montessori, Glennie) ghi trong `note` là lời của bài, không phải của nhân vật.
- Từ mục tiêu: 563 từ ôn lại (534 từ đã phân, 29 từ lấy từ `a2-p2-spare.md`). 60 từ đã phân bị bỏ vì không có câu đúng nghĩa mục từ và có nguồn; danh sách ở cuối `tasks/v0.2.md`. Các từ này vẫn chỉ gặp ở Pass 1 và có thể dùng cho B1 · Pass 2 hoặc bài sau.
- Quy tắc nghĩa được áp chặt: chỉ đánh dấu một từ (mục tiêu hay “ôn kèm”) khi nghĩa **và** từ loại khớp mục từ. Ví dụ đã bỏ: `tip` (mục từ là tiền boa, không phải lời khuyên), `dark` (mục từ là danh từ “bóng tối”, không dùng cho “trời tối”), `goal` (mục từ là mục tiêu, không phải bàn thắng), `degree` (bằng đại học, không phải độ), `farm`, `text`, `copy`, `fish` (mục từ là động từ). Lượt rà cuối bỏ đánh dấu 29 chỗ “ôn kèm” sai nghĩa trong 11 bài.
- Bài Glennie là người đang sống: chỉ dùng chi tiết từ bài viết của chính bà (Hearing Essay, trang tiểu sử) và Polar Music Prize; câu nói của bà được diễn ý thay vì trích dài.

## 22. Sửa giao diện v0.2.1 (2026-11-14)

Yêu cầu của chủ dự án và cách làm:
1. **Pass 1 / Pass 2 trong Reading:** thêm hai nút chọn lượt dưới nút cấp độ; danh sách chỉ hiện bài của lượt đang chọn (mặc định là lượt của bài đang mở, nếu không thì Pass 1).
2. **Bấm câu khi đang phát:** lỗi có thật. Bấm vào câu chỉ đổi số câu hiện tại mà không dừng câu đang đọc, nên khi câu cũ đọc xong, trình phát tăng số câu thêm một (nhảy qua câu đã chọn). Nay bấm vào câu nào thì đọc ngay câu đó; bấm lại đúng câu đang đọc (ví dụ để tra từ) thì không đọc lại. Khi đang dừng, bấm câu chỉ chọn câu đó để Play đọc từ đấy.
   **Khung bên trái:** khi vùng bài đọc rộng từ khoảng 66rem (màn hình máy tính rộng, hoặc bật Focus), nghĩa từ (khung trên) và câu + bản dịch + nghe (khung dưới) hiện ở cột trống bên trái bài, không che bài. Màn hình hẹp và điện thoại vẫn dùng cửa sổ nổi. Lựa chọn “Tiếng Việt” được giữ khi bấm sang câu khác.
   **Cambridge:** trang Cambridge không cho nhúng vào trang khác (máy chủ của họ chặn), và file âm thanh của họ cũng không lấy trực tiếp được từ trình duyệt. Vì vậy liên kết mở một cửa sổ nhỏ riêng cạnh trang (trên điện thoại là tab mới). Thêm liên kết này ở bước Learn words.
3. **Cột bài đọc:** bỏ giới hạn 38rem của đoạn văn; trang đọc rộng tối đa 50rem (khoảng 48rem khi có khung bên trái).
4. **Lùi / tiến:** mỗi lần chuyển trang hoặc chuyển bước của bài được ghi vào lịch sử trình duyệt. Mũi tên ở đầu thanh menu (máy tính) và thanh trên cùng (điện thoại), nút Back/Forward của trình duyệt, cử chỉ vuốt lùi trên điện thoại đều quay lại đúng trang và đúng bước (ví dụ từ bài ngữ pháp về lại bài đang đọc, giữ chỗ đang đọc). Nút lên danh sách trên điện thoại đổi thành chữ “List” để khỏi nhầm với mũi tên lùi.
5. **Giải thích các lựa chọn sai:** giao diện đã hiện lý do dưới từng lựa chọn khi có dữ liệu. Hiện chỉ câu ngữ pháp có lý do cho từng lựa chọn (263 câu); 1.460 lựa chọn sai trong câu hiểu bài và từ vựng của 78 bài chưa có. Viết thêm là việc nội dung lớn, chờ chủ dự án quyết định.
6. **Bỏ ước tính:** bỏ số từ và số phút ở danh sách bài, phút ở Today, ở danh sách và trang ngữ pháp, ở Review và Quick recall. Vẫn giữ các số thống kê trong Progress (số từ đã đọc, thời gian học), vì đó là việc đã làm, không phải ước tính.
