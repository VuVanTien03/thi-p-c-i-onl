import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function AutoScrollManager() {
  const [isScrolling, setIsScrolling] = useState(true);
  const [showControl, setShowControl] = useState(true);
  const animFrameRef = useRef(null);
  const isScrollingRef = useRef(true);

  // Tốc độ cuộn: 0.65 pixel/frame (chầm chậm, êm dịu, chuẩn phong cách lãng mạn)
  const SCROLL_SPEED = 0.65;

  const startAutoScroll = () => {
    isScrollingRef.current = true;
    setIsScrolling(true);

    const step = () => {
      if (!isScrollingRef.current) return;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 5) {
        // Đã cuộn đến đáy trang
        stopAutoScroll();
        return;
      }

      window.scrollBy(0, SCROLL_SPEED);
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const stopAutoScroll = () => {
    isScrollingRef.current = false;
    setIsScrolling(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  const toggleScroll = () => {
    if (isScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  useEffect(() => {
    // Đợi 2.5 giây sau khi mở trang để khách ngắm trọn vẹn Hero Section rồi mới bắt đầu tự động cuộn
    const initialTimer = setTimeout(() => {
      startAutoScroll();
    }, 2500);

    // Tự động tạm dừng cuộn nếu người dùng chủ động lướt màn hình bằng tay hoặc lăn chuột
    const handleUserInteraction = (e) => {
      // Chỉ tạm dừng nếu đang cuộn tự động và sự kiện không bắt nguồn từ nút điều khiển
      if (isScrollingRef.current) {
        if (e.target.closest && e.target.closest('#autoscroll-toggle-btn')) {
          return;
        }
        stopAutoScroll();
      }
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });

    return () => {
      clearTimeout(initialTimer);
      stopAutoScroll();
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
    };
  }, []);

  return (
    <AnimatePresence>
      {showControl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 998,
            pointerEvents: 'auto'
          }}
        >
          <button
            id="autoscroll-toggle-btn"
            onClick={toggleScroll}
            className="glass-card"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.25rem',
              borderRadius: '999px',
              border: '1px solid rgba(214, 108, 136, 0.4)',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 24px rgba(186, 76, 105, 0.22)',
              color: '#8e2f46',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            title={isScrolling ? "Bấm để tạm dừng cuộn tự động" : "Bấm để tiếp tục cuộn tự động"}
          >
            {isScrolling ? (
              <>
                <FaPause style={{ fontSize: '0.75rem', color: '#ba4c69' }} />
                <span>Đang cuộn tự động (Chạm để dừng)</span>
              </>
            ) : (
              <>
                <FaPlay style={{ fontSize: '0.75rem', color: '#ba4c69' }} />
                <span>Tiếp tục tự động cuộn</span>
              </>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
