export const weddingConfig = {
  // Cặp đôi
  groom: {
    name: "Phạm Mạnh Thắng",
    shortName: "Mạnh Thắng",
    role: "Chú Rể",
    title: "Trưởng nam",
    father: "Phạm Văn Hùng",
    mother: "Trần Thị Mai",
    bio: "Một chàng trai luôn yêu thương, nhường nhịn và dành trọn sự ấm áp cho người con gái của đời mình.",
    avatar: "/images/polaroid-left.jpg",
    phone: "0901 234 567",
    bank: {
      bankName: "MB Bank",
      accountNumber: "999988886666",
      accountName: "PHAM MANH THANG",
      qrCode: "https://api.vietqr.io/image/970422-999988886666-compact2.jpg?amount=0&addInfo=Mung%20cuoi%20Manh%20Thang"
    }
  },
  bride: {
    name: "Nguyễn Hương Ly",
    shortName: "Hương Ly",
    role: "Cô Dâu",
    title: "Ái nữ",
    father: "Nguyễn Hoàng Long",
    mother: "Phạm Thị Lan",
    bio: "Cô gái dịu dàng, nụ cười toả nắng, luôn tin rằng tình yêu đích thực là khi tìm thấy một tâm hồn đồng điệu để cùng sẻ chia.",
    avatar: "/images/polaroid-right.jpg",
    phone: "0912 345 678",
    bank: {
      bankName: "Techcombank",
      accountNumber: "190366889922",
      accountName: "NGUYEN HUONG LY",
      qrCode: "https://api.vietqr.io/image/970407-190366889922-compact2.jpg?amount=0&addInfo=Mung%20cuoi%20Huong%20Ly"
    }
  },

  // Ngày cưới & Countdown target
  weddingDate: "2026-12-20T11:00:00+07:00",
  dateFormatted: "Chủ Nhật, 20 Tháng 12, 2026",
  lunarDateFormatted: "12 Tháng 11 Năm Bính Ngọ (Âm Lịch)",

  // Câu trích dẫn tình yêu
  quote: {
    text: "Hai con người, hai trái tim, cùng chung một nhịp đập. Từ khoảnh khắc này cho đến mãi mãi về sau.",
    author: "Mạnh Thắng & Hương Ly"
  },


  // Sự kiện
  events: [
    {
      id: "ceremony",
      title: "Lễ Thành Hôn (Lễ Gia Tiên)",
      subtitle: "Tại Tư Gia Nhà Trai",
      time: "08:30",
      date: "20 Tháng 12, 2026",
      address: "128 Đường Hoa Sữa, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=10.8038,106.7380",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.141872855734!2d106.73542517596041!3d10.800445658747447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752617300c3b87%3A0x7d0259e88b488730!2zVGjhuqNvIMSQaeG7gW4sIFF14bqtbiAyLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s",
      icon: "rings"
    },
    {
      id: "reception",
      title: "Tiệc Cưới & Dạ Tiệc Mừng",
      subtitle: "Trung Tâm Hội Nghị Tiệc Cưới White Palace",
      time: "11:00 Đón Khách - 11:45 Khai Tiệc",
      date: "20 Tháng 12, 2026",
      address: "Sảnh Grand Ballroom - 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=194+Hoang+Van+Thu+Phu+Nhuan",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1997426806584!2d106.67104997596035!3d10.795999358828945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d7a1270273%3A0xbb88dca80775d0b9!2zV2hpdGUgUGFsYWNlIEhvw6BuZyBWxINuIFRo4bul!5e0!3m2!1svi!2s!4v1710000000001!5m2!1svi!2s",
      icon: "champagne"
    }
  ],

  // Album ảnh cưới
  gallery: [
    {
      id: 1,
      title: "Khoảnh khắc hẹn thề",
      description: "Được nắm tay em đi qua từng mùa hoa",
      src: "/images/hero.jpg",
      span: "col-span-2"
    },
    {
      id: 2,
      title: "Nhẫn cưới vĩnh cửu",
      description: "Tượng trưng cho sự gắn kết vẹn tròn suốt đời",
      src: "/images/gallery-1.jpg",
      span: "col-span-1"
    },
    {
      id: 3,
      title: "Dưới vòm hồng rực rỡ",
      description: "Em là điều dịu dàng nhất bước vào cuộc đời anh",
      src: "/images/gallery-2.jpg",
      span: "col-span-1"
    },
    {
      id: 4,
      title: "Nụ cười rạng rỡ",
      description: "Bên nhau hạnh phúc trong tiếng reo vui của người thân",
      src: "/images/gallery-3.jpg",
      span: "col-span-1"
    },
    {
      id: 5,
      title: "Đêm tiệc ánh sao",
      description: "Vũ điệu đầu tiên trong ánh sáng lung linh nhiệm màu",
      src: "/images/gallery-4.jpg",
      span: "col-span-2"
    }
  ],

  // Câu chuyện tình yêu (Love Story)
  story: [
    {
      year: "2021",
      title: "Lần đầu gặp gỡ",
      description: "Một chiều thu cà phê góc phố quen, cái chạm mắt vô tình khởi đầu cho câu chuyện diệu kỳ."
    },
    {
      year: "2023",
      title: "Lời ngỏ lời yêu",
      description: "Tại đỉnh núi Đà Lạt sương mờ, anh đã can đảm trao em đóa hồng cùng lời hẹn ước chân thành."
    },
    {
      year: "2025",
      title: "Khoảnh khắc 'Đồng Ý!'",
      description: "Dưới ánh hoàng hôn Phú Quốc lãng mạn, chiếc nhẫn lấp lánh trao tay cùng giọt nước mắt hạnh phúc."
    },
    {
      year: "2026",
      title: "Về chung một nhà",
      description: "Hôm nay, chúng mình chính thức nắm tay nhau bước vào chương mới đong đầy yêu thương."
    }
  ],

  // Nhạc nền (Đặt file mp3 vào public/music/wedding-song.mp3 hoặc dán link mp3 online vào đây)
  musicUrl: "/music/THẾ GIỚI CỦA ANH.mp3",

  // Google Sheets Apps Script API URL
  // Bạn chỉ cần paste Web App URL từ Google Apps Script vào đây!
  googleScriptUrl: "https://script.google.com/macros/s/AKfycbzTf1oVWXr6DItBHUpXXDwMldILiFstSFqRg7n0tWZf33Nhc5aHCyEM-fWXs66EEiVf/exec",


  // Lời chúc mẫu ban đầu (khi chưa có kết nối Google Sheet hoặc đang tải)
  initialWishes: [
    {
      name: "Gia đình Bác Thành",
      message: "Chúc hai cháu trăm năm hạnh phúc, tình nghĩa vuông tròn, sớm sinh quý tử nhé!",
      date: "2026-09-20T10:00:00.000Z"
    },
    {
      name: "Minh Trang (Hội bạn thân cô dâu)",
      message: "Chúc người bạn tuyệt vời nhất của tao có một đời an yên, hạnh phúc viên mãn bên chàng rể xuất sắc!",
      date: "2026-09-22T14:30:00.000Z"
    },
    {
      name: "Quốc Bảo (Đồng nghiệp chú rể)",
      message: "Chúc mừng người anh em đã chính thức 'chốt đơn'! Chúc hai vợ chồng luôn ngọt ngào như thuở mới yêu!",
      date: "2026-09-24T09:15:00.000Z"
    }
  ]
};
