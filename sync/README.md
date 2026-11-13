# Đồng bộ giữa các máy (sync)

Học trên nhiều máy mà tiến độ vẫn là một, **không cần tài khoản hay email**. Máy đầu tiên tạo một mã đồng bộ 16 ký tự; các máy khác nhập mã đó trong Settings → Sync between devices.

## Cách hoạt động

- Tiến độ vẫn lưu trong trình duyệt trước, nên mất mạng vẫn học được.
- Một Cloudflare Worker (`worker.js`) giữ một bản trực tuyến cho mỗi mã, trong Workers KV. Mã là khóa duy nhất; máy chủ không biết tên hay email của ai.
- Máy tự đồng bộ khi mở web, khi quay lại tab, khi có mạng lại, và khoảng 5 phút một lần nếu có thay đổi. Có nút **Sync now**.
- Hai máy cùng học thì tiến độ được **gộp** theo đúng quy tắc của Import → Merge: mỗi từ, mỗi bài giữ bản có nhiều lịch sử học hơn, không xóa gì. Khi ghi, máy gửi kèm mã phiên bản nó đã đọc; nếu máy khác vừa ghi trước, máy chủ trả bản mới, máy gộp lại rồi ghi tiếp, nên không ghi đè mất dữ liệu của máy kia.
- Không đồng bộ: cài đặt (giao diện, cỡ chữ, giọng đọc, chủ đề), màn hình đang mở, ngày xuất file sao lưu.
- **Ai có mã thì xem và sửa được tiến độ.** Mỗi người học một mã riêng, không gửi mã cho người khác.
- Mã không ghi gì trong khoảng 13 tháng sẽ tự bị xóa trên máy chủ. Nút **Delete the online copy** xóa ngay; các máy khác dùng mã đó sẽ tự ngừng đồng bộ.

## Giới hạn gói miễn phí

Cloudflare Workers KV gói miễn phí cho phép 1.000 lần ghi mỗi ngày cho cả tài khoản, 100.000 lần đọc mỗi ngày, mỗi khóa tối đa một lần ghi mỗi giây. Mỗi người học đang mở web tốn khoảng 12 lần ghi mỗi giờ, nên dưới 5 người học thì dư.

## Cài đặt một lần (chủ dự án làm, khoảng 10 phút)

1. Tạo tài khoản miễn phí ở https://dash.cloudflare.com/sign-up và xác nhận email.
2. Tạo nơi lưu dữ liệu: mở **Workers KV** → **Create instance** → đặt tên `ei-sync` → **Create**.
3. Tạo Worker: **Workers & Pages** → **Create application** → **Start with Hello World!** → **Get started** → đặt tên `ei-sync` → **Deploy**.
4. Chọn Worker `ei-sync` → **Edit Code** → xóa hết mã mẫu, dán toàn bộ nội dung file `sync/worker.js` → bấm **Deploy**.
5. Nối Worker với nơi lưu: trong Worker `ei-sync` → tab **Bindings** → **Add binding** → **KV namespace** → **Add binding** → **Variable name** nhập đúng `SYNC` → chọn `ei-sync` → **Add binding**.
6. Kiểm tra: mở địa chỉ Worker (dạng `https://ei-sync.<tên-tài-khoản>.workers.dev`) và thêm `/v1/s/0000000000000000` vào cuối. Trang phải hiện `{"error":"origin_not_allowed"}`: Worker đang chạy và từ chối mọi trang không phải web học.
7. Gửi địa chỉ Worker cho người quản lý repo. Địa chỉ được ghi vào `EI.SYNC_URL` trong `js/core.js`. Khi `EI.SYNC_URL` còn trống, thẻ Sync không hiện.

Tên nút trên dashboard có thể khác một chút theo thời gian. Hướng dẫn gốc: https://developers.cloudflare.com/kv/get-started

## Đổi trang được phép dùng

Mặc định Worker chỉ nhận yêu cầu từ `https://chanhoang.github.io`. Muốn thêm địa chỉ khác (ví dụ một tên miền riêng), vào Worker → **Settings** → **Variables and Secrets** → thêm biến văn bản `ALLOWED_ORIGINS` với danh sách địa chỉ, cách nhau bằng dấu phẩy, ví dụ `https://chanhoang.github.io,https://hoc.example.com`.

## Kiểm thử

```sh
node tools/sync-test.mjs                 # kiểm tra worker.js với KV giả trong bộ nhớ
node tools/sync-dev-server.mjs 8787      # chạy worker.js trên máy, cho trang ở localhost:8765
```

`tools/e2e-test.py` tự bật máy chủ thử ở cổng 8787 và kiểm tra hai "máy" trình duyệt: tạo mã, nhập mã, gộp tiến độ, xóa bản trực tuyến. Trong trình duyệt, `localStorage['ei.syncUrl']` ghi đè `EI.SYNC_URL`, chỉ dùng khi thử.
