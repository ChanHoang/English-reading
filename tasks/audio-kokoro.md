Status: done by Claude in the manager session (2026-11-14), not handed to Gemini. Differences from the plan below: files are named by a hash of the text (`audio/<EI.audioKey(text)>.mp3`), not by reading/paragraph/sentence, so every place that plays a text finds its file without code changes; the index is `audio/index.js` (key → voice + version) and the build record is `audio/manifest.json`.

# Việc: giọng đọc AI (Kokoro) cho bài đọc và từ vựng

**Giao cho:** Gemini · **Nhánh:** `tool/audio-kokoro` · **Một PR** · Quản lý duyệt: Claude.
Đọc `AGENTS.md` trước. Việc này là việc mã và công cụ, được phép sửa `js/`, `sw.js`, `tools/`, `.github/workflows/pages.yml` và thêm thư mục `audio/` (ngoại lệ cho quy tắc “không file nhị phân lớn”, quyết định ở `DECISIONS.md` mục 15).

## Mục tiêu

Thay giọng máy của trình duyệt (mỗi máy một giọng) bằng file MP3 tạo sẵn bằng **Kokoro-82M** (giấy phép Apache-2.0), cùng giọng trên mọi máy, nghe được offline. Giọng trình duyệt giữ làm dự phòng cho câu chưa có file (câu người học tự viết, câu đã lưu…).

## Quyết định của chủ dự án (không đổi)

1. **Hai giọng Mỹ: `af_heart` và `af_bella`**, chọn ngẫu nhiên **theo từng bài đọc** và **theo từng mục từ vựng**. Cả một bài đọc dùng một giọng; một mục từ (từ + câu ví dụ) dùng một giọng. “Ngẫu nhiên” phải **ổn định**: chọn theo băm của id (ví dụ `sha1(id)` chẵn → heart, lẻ → bella), để tạo lại thì không đổi giọng. Tỷ lệ hai giọng gần 50/50 (in ra số đếm).
2. **Ngắt lâu hơn ở dấu phẩy và dấu chấm.** Kokoro không có SSML, nên làm thế này:
   - Tách câu thành đoạn tại `,` `;` `:` (và `—` nếu có), tạo âm thanh từng đoạn, chèn khoảng lặng giữa các đoạn. Mặc định: sau `,` **0,45 s**; sau `;` `:` `—` **0,55 s**.
   - Cuối mỗi câu (dấu `.` `?` `!`) thêm **0,9 s** lặng vào cuối file, để khi app đọc liền nhiều câu thì giữa hai câu có khoảng dừng rõ.
   - **Không** tách ở dấu phẩy trong số (`3,000`, `1,205`), ở viết tắt (`St.`, `Dr.`, `Mr.`, `Mrs.`, `U.S.`, `a.m.`, `p.m.`, `e.g.`), ở số thập phân (`0.75`).
   - Các con số trên để ở đầu `tools/make-audio.py` thành hằng số, dễ chỉnh.

## Việc cần làm

1. **`tools/make-audio.py`** (Python 3, thư viện `kokoro-onnx`, `soundfile`, `numpy`; nén MP3 bằng `ffmpeg`):
   - Tải mô hình nếu chưa có (không commit mô hình; thêm vào `.gitignore`):
     `https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx` và `.../voices-v1.0.bin`.
   - Đọc nội dung bằng cách chạy `js/core.js` + `data/manifest.js` + các file dữ liệu trong Node (như `tools/check-content.js` đang làm) và xuất JSON ra stdin của Python, hoặc viết phần trích bằng một script Node nhỏ `tools/audio-items.js`.
   - Văn bản đọc = văn bản hiển thị, bỏ đánh dấu `{surface=lemma}` → `surface`, `{word}` → `word`.
   - **Bảng sửa cách đọc** `tools/audio-lexicon.json`: thay chuỗi chỉ trong văn bản đưa cho máy đọc, không đổi chữ trên web. Tối thiểu: `FAI` → `F A I`, `GD&T` → `G D and T`, `QC` → `Q C`, `St. Petersburg` → `Saint Petersburg`, `CMM` → `C M M`, `km` → `kilometers` khi đứng sau số. Thêm mục khi nghe thấy đọc sai.
   - Đầu ra MP3 đơn kênh **48 kbps**, 24 kHz:
     - Bài đọc: `audio/r/<id>/<p>-<s>.mp3` (p = số đoạn, s = số câu, đếm từ 0, khớp `r.text[p][s]`).
     - Từ vựng: `audio/w/<slug>.mp3` (đọc từ) và `audio/w/<slug>-ex.mp3` (đọc câu ví dụ). `slug` = lemma viết thường, ký tự ngoài `a-z0-9` thành `-`.
   - **Chỉ tạo lại khi cần:** ghi `audio/index.js` dạng `EI.audioIndex = { "r/a2-p1-01/0-0": { v: "heart", h: "<sha1 8 ký tự>" }, … }`, với `h` = băm của (văn bản đã sửa + giọng + các hằng số khoảng lặng + phiên bản mô hình). Chạy lại thì chỉ tạo các mục có `h` đổi; xóa file của mục không còn.
   - Tùy chọn dòng lệnh: `--only a2-p1-51` (một bài), `--words`, `--readings`, `--check` (không tạo, chỉ báo mục thiếu/lỗi thời, thoát mã 1 nếu có).
2. **App (`js/core.js`, `js/ui.js`):**
   - `EI.audio.say(text, opt)` nhận thêm `opt.file` (đường dẫn trong `audio/`). Có file trong `EI.audioIndex` thì phát bằng `new Audio()`, `playbackRate` = cài đặt tốc độ hiện có (giữ cao độ: `preservesPitch`), gọi `onend(true/false)` như cũ; lỗi tải file → dùng giọng trình duyệt.
   - Truyền `file` ở các chỗ gọi: đọc câu trong bài (`ui.js` quanh dòng 528, `r.S[P.i]` — cần biết p/s của câu), nút nghe từ (`A.say`), luyện nghe/chính tả (`A.hear`, `run.it.audio`), shadowing (`A.shSay`). Câu không thuộc bài đọc hay từ vựng thì giữ giọng trình duyệt.
   - Nhãn trung thực: `A.label()` hiện `AI voice (Kokoro · Heart)` hoặc `· Bella` khi đang phát file, `Machine voice (browser, en-US)` khi dùng dự phòng. Trang Info có một câu tiếng Việt: giọng đọc do AI tạo (Kokoro-82M, Apache-2.0), không phải giọng người thật.
   - Settings: thêm lựa chọn **Voice: AI voice (recommended) / Browser voice**. Mặc định AI voice.
   - `data/manifest.js` nạp `audio/index.js` (nếu chưa có file thì app vẫn chạy).
3. **`sw.js`:** không đưa `audio/` vào danh sách tải trước. Lưu file âm thanh vào cache **khi được phát lần đầu** (cache riêng, ví dụ `ei-audio-v1`), để nghe lại offline. Tăng số phiên bản cache app.
4. **`.github/workflows/pages.yml`:** thêm `audio` vào lệnh `cp -r … _site/`.
5. **Kiểm thử:**
   - `tools/e2e-test.py`: thêm kiểm tra (a) bài có file → phát bằng file (theo dõi `Audio`/`HTMLMediaElement.play` hoặc yêu cầu mạng tới `audio/r/...`), (b) xóa giả một mục khỏi `EI.audioIndex` → dùng giọng trình duyệt, (c) không lỗi JS. Tổng phải 100% đạt.
   - `node tools/check-content.js` vẫn 0 error.
   - CI không chạy Kokoro. Thêm bước `python3 tools/make-audio.py --check` vào CI **chỉ khi** nó chạy được mà không cần tải mô hình (chỉ so băm).

## Phạm vi lần đầu

Tạo đủ cho **54 bài A2 Pass 1** (khoảng 2.357 câu, khoảng 4 giờ) và **846 từ A2** (từ + câu ví dụ). Ước tính dung lượng 48 kbps: khoảng 100 MB. Nếu tổng vượt 200 MB thì dừng và báo trong PR.

## Kiểm tra chất lượng (bắt buộc trước khi mở PR)

- Nghe thử ít nhất **3 bài** (một bài mỗi giọng, một bài nhiều số và tên riêng: `a2-p1-51`) và **30 từ**. Ghi trong PR: câu nào đọc sai, đã sửa bằng `audio-lexicon.json` hay chưa.
- Kiểm tra khoảng dừng: ví dụ câu “On January 1, 1914, about 3,000 people came to the pier in St. Petersburg to watch the first flight.” phải ngắt sau “January 1” và “1914”, **không** ngắt trong “3,000” và sau “St.”.
- In và dán vào PR: số file, tổng dung lượng, tỷ lệ heart/bella, thời gian chạy.

## Không làm

- Không dùng âm thanh của Cambridge, Oxford hay từ điển nào khác (bản quyền).
- Không đổi văn bản bài đọc, từ vựng, bản dịch.
- Không commit file mô hình, file `.wav` trung gian.
- Không push thẳng vào `main`.

## Mẫu đã duyệt

Quản lý đã tạo thử 5 câu bằng `kokoro-onnx` + mô hình `v1.0` ở trên, giọng `af_heart` và `af_bella`, `speed=1.0`, `lang="en-us"`; chủ dự án đã nghe và chọn dùng cả hai giọng.
