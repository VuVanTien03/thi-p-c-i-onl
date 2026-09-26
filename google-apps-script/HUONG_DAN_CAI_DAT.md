# 📖 Hướng Dẫn Kết Nối Google Sheets Với Web Thiệp Cưới

Website thiệp cưới của bạn sử dụng **Google Apps Script** làm backend miễn phí 100%, không cần thuê server hay database, tự động lưu mọi thông tin khách tham dự và lời chúc trực tiếp vào Google Sheet của bạn.

---

## ⚡ Các bước thực hiện (chỉ mất 2 phút)

### Bước 1: Tạo Google Sheet mới
1. Mở trình duyệt, truy cập: [https://sheets.new](https://sheets.new)
2. Đặt tên trang tính là: **"Danh Sách Khách Cưới - Tuấn Anh & Thu Trang"**
3. Ở góc dưới bên trái:
   - Đổi tên sheet mặc định `Trang tính1` thành **`RSVP`**
   - Bấm dấu `+` để thêm một sheet mới, đặt tên là **`Wishes`**

---

### Bước 2: Dán mã Google Apps Script
1. Trên thanh công cụ của Google Sheet, bấm **Tiện ích mở rộng** (Extensions) > **Apps Script**
2. Xóa sạch đoạn code mẫu mặc định `function myFunction() { ... }`
3. Mở file [Code.gs](file:///d:/wedding/google-apps-script/Code.gs) trong dự án này, copy toàn bộ nội dung và dán vào cửa sổ Apps Script
4. Bấm biểu tượng 💾 **Lưu** (Ctrl + S)

---

### Bước 3: Triển khai (Deploy Web App)
1. Ở góc trên bên phải màn hình Apps Script, bấm nút màu xanh: **Triển khai (Deploy)** > **Triển khai mới (New deployment)**
2. Ở mục "Chọn loại" (bánh răng bên trái), chọn **Ứng dụng web (Web app)**
3. Điền các trường:
   - **Mô tả (Description):** `Wedding Web API`
   - **Thực thi dưới dạng (Execute as):** `Tôi (email của bạn)`
   - **Ai có quyền truy cập (Who has access):** **`Bất kỳ ai (Anyone)`** *(⚠️ Rất quan trọng! Nếu chọn khác thì khách mời không thể gửi form được)*
4. Bấm **Triển khai (Deploy)**
5. Google sẽ hỏi cấp quyền: Bấm **Ủy quyền truy cập (Authorize access)** > Chọn tài khoản Google của bạn > Bấm **Nâng cao (Advanced)** > Bấm **Đi tới Dự án không an toàn (Go to project unsafe)** > Bấm **Cho phép (Allow)**.
6. Sau khi cấp quyền, màn hình sẽ hiển thị **URL ứng dụng web (Web app URL)** có dạng:
   ```text
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
7. Bấm **Sao chép (Copy)** URL này!

---

### Bước 4: Dán URL vào Web Thiệp Cưới
1. Mở file [weddingConfig.js](file:///d:/wedding/src/data/weddingConfig.js)
2. Tìm dòng:
   ```javascript
   googleScriptUrl: "https://script.google.com/macros/s/AKfycbxYOUR_SCRIPT_ID_HERE/exec",
   ```
3. Thay thế bằng URL bạn vừa copy từ bước 3!
4. Lưu file lại. Website của bạn giờ đây đã kết nối trực tiếp với Google Sheets! 🎉

---

## 💡 Chế độ chạy thử nghiệm (Simulation Mode)
Nếu bạn chưa kịp cấu hình Google Apps Script ngay, **website vẫn hoạt động bình thường!**
Form RSVP và Lời chúc sẽ tự động lưu tạm vào `localStorage` của trình duyệt và hiển thị thông báo chúc mừng thành công với hiệu ứng pháo hoa rực rỡ, giúp bạn thoải mái xem trước trải nghiệm của khách mời.
