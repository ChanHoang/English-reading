# English Improve

Website tự học tiếng Anh A2–C1 cho người Việt, học qua những câu chuyện có thật. Hiện có: toàn bộ ứng dụng, 17 bài đọc A2 · Pass 1, 395 từ A2, 16 bài ngữ pháp A2.

## Mở web

| Cách | Làm gì | Offline / cài lên màn hình chính |
|---|---|---|
| Nhanh nhất | Giải nén, bấm đúp `index.html` | Không (trình duyệt không cho cài từ `file://`), nhưng vẫn học và lưu tiến độ bình thường |
| Trên máy tính, đủ tính năng | Trong thư mục này chạy `python -m http.server 8765`, mở `http://localhost:8765` | Có, trên chính máy đó |
| Trên điện thoại | Đưa cả thư mục lên một dịch vụ lưu trữ web tĩnh có **https** (GitHub Pages, Netlify, Cloudflare Pages…), mở địa chỉ đó, chọn “Add to Home screen / Install app” | Có |

Tiến độ lưu trong trình duyệt của từng địa chỉ. Đổi cách mở (file → localhost → https) thì dùng **Settings → Export / Import** để mang tiến độ theo.

## Cấu trúc

```
index.html, css/app.css, js/core.js (dữ liệu, lưu trữ, ôn cách quãng, âm thanh), js/ui.js (giao diện)
sw.js, manifest.webmanifest, icons/      → chạy offline, cài lên màn hình chính
data/manifest.js                         → danh sách file nội dung
data/words-a2.js, data/grammar-a2.js, data/readings/*.js
tools/check-content.js                   → kiểm tra nội dung (độ phủ từ, số từ, tỷ lệ từ vượt cấp…)
tools/tag-targets.js                     → đánh dấu từ mục tiêu còn sót trong một bài
tools/e2e-test.py                        → kiểm thử tự động theo mục nghiệm thu
tools/build-single-file.js               → gộp thành một file html
DECISIONS.md, CONTENT_GUIDE.md
AGENTS.md (CLAUDE.md, GEMINI.md trỏ về đây)   → hướng dẫn cho AI làm việc trên repo
.github/                                 → kiểm tra tự động (CI), xuất bản GitHub Pages, mẫu issue/PR
```

## Làm việc qua GitHub

Mỗi việc là một issue; mỗi bài đọc là một nhánh và một PR. CI chạy `tools/check-content.js` và `tools/e2e-test.py` trên mọi PR; khi merge vào `main`, web được xuất bản lại lên GitHub Pages. AI làm việc đọc `AGENTS.md` trước.

## Kiểm tra

```
node tools/check-content.js              # phải ra 0 error
python3 -m http.server 8765 &            # rồi:
python3 tools/e2e-test.py                # cần Python Playwright + Chromium
```
