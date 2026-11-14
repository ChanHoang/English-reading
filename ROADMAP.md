# ROADMAP — lộ trình hoàn thiện bộ từ vựng và bài đọc

Số phiên bản: **v0.<giai đoạn>.<lần sửa>**
- Số thứ hai tăng khi xong một **giai đoạn nội dung** (thêm bài đọc và từ mới) trong bảng dưới.
- Số thứ ba tăng với mỗi lần sửa hoặc thêm tính năng **không thêm từ vựng hay bài đọc** (ví dụ v0.1.1, v0.1.2…). Sang giai đoạn mới thì số thứ ba về 0 (v0.2 = v0.2.0).
- Phiên bản hiện ở cạnh nút Info trên web (`EI.VERSION` trong `js/core.js`).

Số bài và số từ của các giai đoạn chưa làm là **ước tính** từ danh sách Oxford 3000/5000 theo cấp (B1 khoảng 740 từ, B2 khoảng 1.370, C1 khoảng 1.310), khoảng 24 từ mục tiêu mỗi bài. Mỗi giai đoạn gồm cả giọng đọc AI cho bài và từ mới.

| Phiên bản | Giai đoạn | Nội dung | Trạng thái |
|---|---|---|---|
| v0.1 | A2 · Pass 1 | 54 bài đọc, 846 từ A2, 16 bài ngữ pháp A2, đồng bộ bằng mã, giọng AI Kokoro | Xong |
| v0.2 | A2 · Pass 2 | 29 chuyện mới **không thêm từ mới** (24 bài ở v0.2, 5 bài ở v0.2.3): các từ A2 mới gặp một lần được gặp lại trong ngữ cảnh khác (`tasks/v0.2.md`) | Xong |
| v0.3 | B1 · Pass 1, phần 1 | Khoảng 16 bài (800–1.000 từ/bài), khoảng 370 từ B1, ngữ pháp B1 nhóm 1 | Chưa làm |
| v0.4 | B1 · Pass 1, phần 2 | Khoảng 15 bài, khoảng 370 từ B1 còn lại: đủ bộ từ B1; ngữ pháp B1 nhóm 2 | Chưa làm |
| v0.5 | B1 · Pass 2 | Khoảng 15 chuyện mới ôn từ B1, không thêm từ | Chưa làm |
| v0.6 | B2 · Pass 1, phần 1 | Khoảng 19 bài (1.000–1.300 từ/bài), khoảng 460 từ B2, ngữ pháp B2 nhóm 1 | Chưa làm |
| v0.7 | B2 · Pass 1, phần 2 | Khoảng 19 bài, khoảng 460 từ B2 | Chưa làm |
| v0.8 | B2 · Pass 1, phần 3 | Khoảng 19 bài, khoảng 450 từ B2 còn lại: đủ bộ từ B2; ngữ pháp B2 nhóm 2 | Chưa làm |
| v0.9 | C1 · Pass 1, phần 1 | Khoảng 18 bài (1.300–1.600 từ/bài), khoảng 440 từ C1 | Chưa làm |
| v0.10 | C1 · Pass 1, phần 2 | Khoảng 18 bài, khoảng 440 từ C1 | Chưa làm |
| v1.0 | C1 · Pass 1, phần 3 | Khoảng 18 bài, khoảng 430 từ C1 còn lại: **đủ bộ từ A2–C1** | Chưa làm |

Sau v1.0 (tùy chọn): Pass 2 cho B2 và C1, theo cùng cách đánh số (v1.1, v1.2…).

## Nhật ký phiên bản

- **v0.1** (2026-11-14): A2 · Pass 1 đủ bộ từ; đồng bộ giữa các máy; giọng AI Kokoro (Heart, Bella).
- **v0.1.1** (2026-11-14): Learn words và trang từ giữ nguyên chỗ đang xem khi bấm Show meaning hoặc Known, thêm nút Hide meaning; trình phát có thanh thời lượng kéo được, đổi tốc độ không đọc lại từ đầu câu, Pause rồi Play đọc tiếp từ chỗ dừng; Practice chia theo phần (Understanding, Vocabulary, Grammar), mỗi phần hiện hết câu hỏi; nhắc sao lưu không còn hiện khi đã bật đồng bộ; hiện số phiên bản cạnh Info.
- **v0.1.2** (2026-11-14): chuẩn bị v0.2: 24 file việc A2 · Pass 2 cho ChatGPT (`tasks/`), quy định Pass 2 trong `CONTENT_GUIDE.md` mục 1b; bước Learn words của bài Pass 2 ghi “Ôn lại … từ đã gặp ở Pass 1”.
- **v0.1.3** (2026-11-14): bài Pass 2 đầu tiên, a2-p2-01 “The Man Who Won Without Shoes” (Abebe Bikila), 23 từ ôn lại. Bài Pass 2 không thêm từ mới nên tăng số thứ ba; đủ 24 bài thì lên v0.2.
- **v0.2** (2026-11-14): A2 · Pass 2 đủ 24 bài (a2-p2-01 … a2-p2-24; các bài 02–24 được thêm thẳng vào bản này, không có số phiên bản trung gian). Tổng 563 từ A2 được ôn lại trong chuyện mới: 534 từ đã phân sẵn và 29 từ lấy từ danh sách dự phòng; 60 từ đã phân không đưa vào được vì không có câu đúng nghĩa và có nguồn. Rà lại nghĩa các từ “ôn kèm” (từ A2 khác được đánh dấu trong bài): bỏ đánh dấu những chỗ dùng khác nghĩa hoặc khác từ loại so với mục từ. Giọng đọc mới đều là Heart, tạo tự động bằng GitHub Actions. Xem `DECISIONS.md` §21.
- **v0.2.1** (2026-11-14): Reading chọn được Pass 1 / Pass 2; bỏ ước tính thời gian và số từ của bài; khi đang phát, bấm vào câu nào thì đọc ngay câu đó (trước đây đọc hết câu cũ rồi nhảy qua một câu); màn hình rộng: nghĩa từ, câu, bản dịch và nút nghe hiện ở khung bên trái bài đọc thay vì cửa sổ nổi; cột bài đọc rộng hơn; mũi tên lùi/tiến (cũng dùng được nút Back của trình duyệt và cử chỉ vuốt lùi trên điện thoại); liên kết Cambridge mở trong một cửa sổ nhỏ riêng (Cambridge không cho nhúng vào trang khác), có cả ở bước Learn words. Xem `DECISIONS.md` §22.
- **v0.2.2** (2026-11-14): phím tắt do người học tự chọn (Settings → Audio: bấm “Set key” rồi nhấn phím) cho Play/pause, lùi, tiến, nghe lại câu; nút −Ns / +Ns và ô chọn số giây (2–30 s) trên thanh phát; cột bài đọc rộng 800 px và nằm giữa vùng đọc, khung nghĩa từ nằm ở khoảng trống bên trái. Xem `DECISIONS.md` §23.
- **v0.2.3** (2026-11-15): thêm 5 bài A2 · Pass 2 (a2-p2-25 … 29: Jackie Robinson, buổi chiếu phim đầu tiên của anh em Lumière, tìm ra virus cúm năm 1933, đánh golf trên Mặt Trăng, trẻ em được gửi qua bưu điện). Số từ A2 mới chỉ gặp ở một bài giảm từ 103 xuống 47. Không thêm từ mới. Xem `DECISIONS.md` §24.
