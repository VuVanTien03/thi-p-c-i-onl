import React, { useEffect, useRef } from 'react';

export default function AutoScrollManager() {
  const animFrameRef = useRef(null);
  const isScrollingRef = useRef(false);
  const lastTimestampRef = useRef(null);
  const scrollAccumulatorRef = useRef(0);
  const resumeTimeoutRef = useRef(null);

  // Tốc độ cuộn chuẩn theo thời gian (pixels/giây)
  // ~42px/s: Êm đềm, lãng mạn, tương đương ~0.7px/frame ở màn hình 60Hz
  const PIXELS_PER_SECOND = 42;

  // Quản lý vuốt chạm trên mobile
  const touchStartYRef = useRef(null);
  const touchStartXRef = useRef(null);
  const canUserInterruptRef = useRef(false);

  const startAutoScroll = () => {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;
    lastTimestampRef.current = null;
    scrollAccumulatorRef.current = 0;

    // Tắt tạm thời scroll-behavior: smooth để tránh xung đột khung hình trên Safari / iOS / Android
    document.documentElement.style.scrollBehavior = 'auto';

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(step);
  };

  const stopAutoScroll = () => {
    isScrollingRef.current = false;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    lastTimestampRef.current = null;
    scrollAccumulatorRef.current = 0;

    // Khôi phục lại scroll-behavior ban đầu
    document.documentElement.style.scrollBehavior = '';
  };

  const pauseAndScheduleResume = () => {
    stopAutoScroll();
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    // Sau 2.5 giây người dùng ngừng lướt/chạm thì tự động trôi tiếp chầm chậm
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 2500);
  };

  const step = (timestamp) => {
    if (!isScrollingRef.current) return;

    // Tạm dừng cuộn nếu đang mở Hộp Mừng Cưới / Lightbox ảnh hoặc đang nhập phím trên form
    const isModalOpen = !!document.querySelector('.lightbox-modal');
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

    if (isModalOpen || isTyping) {
      lastTimestampRef.current = timestamp;
      animFrameRef.current = requestAnimationFrame(step);
      return;
    }

    if (lastTimestampRef.current === null) {
      lastTimestampRef.current = timestamp;
    }

    // Giới hạn delta time (max 100ms) để không bị giật nếu chuyển tab rồi quay lại
    const elapsed = Math.min(timestamp - lastTimestampRef.current, 100);
    lastTimestampRef.current = timestamp;

    // Tích lũy pixel float để đảm bảo cuộn được trên mobile không bị làm tròn về 0
    scrollAccumulatorRef.current += (PIXELS_PER_SECOND * elapsed) / 1000;

    if (scrollAccumulatorRef.current >= 1) {
      const pixelsToMove = Math.floor(scrollAccumulatorRef.current);
      scrollAccumulatorRef.current -= pixelsToMove;

      const docEl = document.documentElement;
      const body = document.body;
      const scrollHeight = Math.max(docEl.scrollHeight, body ? body.scrollHeight : 0);
      const maxScroll = scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset || docEl.scrollTop || (body ? body.scrollTop : 0) || 0;

      if (currentScroll >= maxScroll - 4) {
        // Đã cuộn đến đáy trang
        stopAutoScroll();
        return;
      }

      const nextScroll = currentScroll + pixelsToMove;

      // Hỗ trợ cuộn tương thích 100% trên cả Desktop lẫn Safari iOS và Chrome Android
      try {
        window.scrollTo({ top: nextScroll, left: 0, behavior: 'instant' });
      } catch (e) {
        window.scrollTo(0, nextScroll);
      }

      // Đảm bảo cập nhật đối với một số trình duyệt WebKit cũ
      const scrollingEl = document.scrollingElement || docEl || body;
      if (scrollingEl && scrollingEl.scrollTop < nextScroll) {
        scrollingEl.scrollTop = nextScroll;
      }
    }

    animFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    // Grace period: Không cho phép sự kiện chạm ngẫu nhiên tắt tự cuộn trong 1.5 giây đầu
    const graceTimer = setTimeout(() => {
      canUserInterruptRef.current = true;
    }, 1500);

    // Đợi 2.5 giây sau khi mở thiệp để khách ngắm trọn vẹn Hero Section rồi mới bắt đầu tự động cuộn
    const initialTimer = setTimeout(() => {
      startAutoScroll();
    }, 2500);

    // Xử lý vuốt trên điện thoại
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e) => {
      if (!canUserInterruptRef.current) return;

      if (e.touches && e.touches[0] && touchStartYRef.current !== null) {
        const diffY = Math.abs(e.touches[0].clientY - touchStartYRef.current);
        const diffX = Math.abs(e.touches[0].clientX - touchStartXRef.current);
        // Khi người dùng chủ động vuốt (> 18px), tạm dừng và hẹn giờ tự cuộn lại khi buông tay
        if (diffY > 18 && diffY > diffX) {
          pauseAndScheduleResume();
        }
      }
    };

    // Xử lý lăn chuột trên desktop
    const handleWheel = (e) => {
      if (!canUserInterruptRef.current) return;

      if (Math.abs(e.deltaY) > 6) {
        pauseAndScheduleResume();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      clearTimeout(graceTimer);
      clearTimeout(initialTimer);
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      stopAutoScroll();
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Không hiển thị nút nào trên giao diện (hoàn toàn chạy ngầm mượt mà)
  return null;
}
