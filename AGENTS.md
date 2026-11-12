# AGENTS.md — hướng dẫn cho AI làm việc trên repo này

Đọc hết file này trước khi làm. Sau đó đọc `CONTENT_GUIDE.md` (bắt buộc với mọi việc nội dung) và mục mới nhất của `DECISIONS.md`.

## Dự án

English Improve: web tĩnh (HTML/CSS/JS thuần, không build, không thư viện) để người Việt tự học tiếng Anh A2–C1 qua **chuyện có thật**. Chủ dự án: Kai (trình độ A2, đi làm toàn thời gian). Giao diện tiếng Anh, giải thích học tập tiếng Việt.

```
index.html, css/app.css, js/core.js, js/ui.js     ứng dụng
data/manifest.js                                  danh sách file nội dung (thứ tự nạp)
data/words-*.js, data/grammar-*.js                bộ từ, bài ngữ pháp
data/readings/<level>-p<pass>-<nn>.js             mỗi bài đọc một file
tools/check-content.js                            kiểm tra nội dung — phải 0 error
tools/tag-targets.js                              tìm từ mục tiêu chưa đánh dấu
tools/e2e-test.py                                 kiểm thử giao diện (Playwright)
CONTENT_GUIDE.md, DECISIONS.md                    chuẩn nội dung, nhật ký quyết định
```

## Vai trò

- **Quản lý** (Claude, trong Project “English improve” của chủ dự án): chia việc thành issue, phân từ mục tiêu, duyệt PR, ghi `DECISIONS.md`, merge.
- **Người làm** (bạn): nhận **một issue**, làm trên **một nhánh**, mở **một PR**. Không tự mở việc ngoài issue.

## Ràng buộc cứng (vi phạm = PR bị trả lại)

1. Bài đọc là **sự thật đã xác minh**. Mỗi chi tiết chính có ít nhất **hai nguồn đáng tin** mà bạn **đã mở và đọc trong phiên này**. Không viết từ trí nhớ. Không bịa chi tiết, số liệu, lời thoại, cảm xúc nhân vật hay nguồn. Giai thoại phải nói rõ là giai thoại.
2. Không ghi “đã xác minh” cho thứ chưa xác minh. Chi tiết một nguồn hoặc kiến thức phổ thông ghi vào trường `note` của bài.
3. Không flashcard, không bài kiểm tra rời, không bảng xếp hạng, không đồng hồ đếm ngược. Mọi câu hỏi gắn với một bài đọc hoặc một chủ điểm ngữ pháp.
4. Mỗi bài học xong trong một lần ngồi: bài A2 ước tính 25–32 phút (cột `lesson` của công cụ kiểm tra).

**Nếu bạn không truy cập được web**, đừng viết bài đọc. Ghi vào PR/issue: “Không tra cứu được nguồn, dừng lại”. Việc mã và kiểm thử thì vẫn làm được.

## Quy trình một bài đọc

1. Đọc issue: mã bài (`a2-p1-18`…), chủ đề, chuyện gợi ý, **danh sách từ mục tiêu đã phân sẵn** (chỉ đổi từ khi bắt buộc, và nói rõ lý do trong PR).
2. Tra nguồn trước khi viết. Nếu chuyện không đủ hai nguồn cho các chi tiết chính thì báo trong issue, đề xuất chuyện khác, không viết.
3. Viết theo `CONTENT_GUIDE.md` mục 1–4: A2 600–800 từ, mỗi từ mục tiêu ở ít nhất hai câu, từ vượt cấp có trong `gloss`, chính tả Mỹ, dịch từng câu, số câu Practice theo độ khó của bài (không theo con số cố định).
4. Từ mục tiêu mới khai báo **ngay đầu file bài đọc** bằng ``EI.words('A2', `…`)``. Trong `data/manifest.js`, chỉ bỏ `//` ở dòng đã đặt sẵn cho bài của bạn.
5. Chạy và sửa đến khi đạt:
   ```sh
   node tools/check-content.js a2-p1-18     # 0 error, 0 warning mới
   node tools/tag-targets.js data/readings/a2-p1-18.js   # đọc lại từng gợi ý, chỉ đánh dấu khi đúng nghĩa
   node tools/check-content.js              # toàn bộ: 0 error
   ```
   Kiểm thử giao diện (CI cũng chạy): `python3 -m http.server 8765 &` rồi `python3 tools/e2e-test.py`.
6. Mở PR theo mẫu (`.github/pull_request_template.md`). Bắt buộc có **bảng chi tiết → nguồn**: mỗi chi tiết chính, nguồn nào nói, trích ngắn câu gốc. Đây là thứ quản lý dùng để duyệt.

## Không được làm (trừ khi issue yêu cầu rõ)

- Sửa `js/`, `css/`, `tools/`, `sw.js`, bài đọc hay từ đã merge.
- Sửa `DECISIONS.md` (quản lý ghi). Ghi quyết định của bạn trong mô tả PR, mục “Ghi chú cho quản lý”.
- Thêm thư viện, bước build, file nhị phân lớn, hoặc dữ liệu cá nhân.
- Push thẳng vào `main`.

## Nhánh và commit

- Nhánh: `reading/a2-p1-18`, `fix/<mô-tả-ngắn>`, `tool/<mô-tả-ngắn>`.
- Commit ngắn, tiếng Anh, thì hiện tại: `Add reading a2-p1-18 (Domesday Book)`.
