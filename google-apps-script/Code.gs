/**
 * ============================================================
 * GOOGLE APPS SCRIPT CHO WEB THIỆP CƯỚI (RSVP & LỜI CHÚC)
 * ============================================================
 * 
 * HƯỚNG DẪN 3 BƯỚC CÀI ĐẶT:
 * 1. Mở https://sheets.new tạo một Google Sheet mới (Đặt tên: "Danh Sách Khách Cưới")
 *    - Đổi tên Sheet1 thành "RSVP"
 *    - Thêm một Sheet mới đặt tên là "Wishes"
 * 2. Trên thanh menu Google Sheet: Chọn Extensions (Tiện ích mở rộng) > Apps Script
 *    - Xóa hết code cũ, dán toàn bộ nội dung file này vào
 * 3. Bấm "Deploy" (Triển khai) > "New deployment" (Triển khai mới)
 *    - Chọn loại: "Web app" (Ứng dụng web)
 *    - Description: "Wedding API v1"
 *    - Execute as: "Me" (Tôi)
 *    - Who has access: "Anyone" (Bất kỳ ai)  <--- RẤT QUAN TRỌNG!
 *    - Bấm Deploy và cấp quyền (Authorize)
 *    - Sao chép "Web app URL" (có dạng: https://script.google.com/macros/s/.../exec)
 *    - Dán URL đó vào file src/data/weddingConfig.js ở biến `googleScriptUrl`
 */

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Tạo sheet RSVP nếu chưa có
  var rsvpSheet = ss.getSheetByName("RSVP");
  if (!rsvpSheet) {
    rsvpSheet = ss.insertSheet("RSVP");
  }
  if (rsvpSheet.getLastRow() === 0) {
    rsvpSheet.appendRow([
      "Thời Gian", 
      "Họ Tên", 
      "Số Điện Thoại", 
      "Khách Của Ai", 
      "Số Người Đi Cùng", 
      "Tham Dự", 
      "Lời Nhắn / Chúc"
    ]);
    rsvpSheet.getRange("A1:G1").setBackground("#f8d7da").setFontWeight("bold");
  }

  // Tạo sheet Wishes nếu chưa có
  var wishSheet = ss.getSheetByName("Wishes");
  if (!wishSheet) {
    wishSheet = ss.insertSheet("Wishes");
  }
  if (wishSheet.getLastRow() === 0) {
    wishSheet.appendRow(["Thời Gian", "Họ Tên", "Lời Chúc"]);
    wishSheet.getRange("A1:C1").setBackground("#d1e7dd").setFontWeight("bold");
  }
}

// Xử lý gửi dữ liệu (POST request)
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    var now = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

    if (data.type === "rsvp") {
      var rsvpSheet = ss.getSheetByName("RSVP");
      if (!rsvpSheet) {
        setupSheets();
        rsvpSheet = ss.getSheetByName("RSVP");
      }
      rsvpSheet.appendRow([
        now,
        data.name || "",
        data.phone || "",
        data.side || "Cả hai",
        data.guests || 1,
        data.attending ? "Có tham dự" : "Rất tiếc không thể đến",
        data.note || ""
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Xác nhận tham dự thành công! Hẹn gặp bạn trong ngày vui."
      })).setMimeType(ContentService.MimeType.JSON);

    } else if (data.type === "wish") {
      var wishSheet = ss.getSheetByName("Wishes");
      if (!wishSheet) {
        setupSheets();
        wishSheet = ss.getSheetByName("Wishes");
      }
      wishSheet.appendRow([
        now,
        data.name || "Khách ẩn danh",
        data.message || ""
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Cảm ơn lời chúc thân thương của bạn!"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Yêu cầu không hợp lệ"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Xử lý lấy danh sách lời chúc (GET request)
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var wishSheet = ss.getSheetByName("Wishes");
    
    if (!wishSheet) {
      setupSheets();
      wishSheet = ss.getSheetByName("Wishes");
    }

    var values = wishSheet.getDataRange().getValues();
    var wishes = [];

    // Bỏ qua dòng tiêu đề đầu tiên
    for (var i = 1; i < values.length; i++) {
      if (values[i][1] && values[i][2]) {
        wishes.unshift({
          date: values[i][0],
          name: values[i][1],
          message: values[i][2]
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      data: wishes
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString(),
      data: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
