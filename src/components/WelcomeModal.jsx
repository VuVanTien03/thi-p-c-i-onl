import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaHeart, FaEnvelopeOpen } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';
import { weddingConfig } from '../data/weddingConfig';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [opening, setOpening] = useState(false);

  // Sinh danh sách cánh hoa hồng rơi mềm mại ngay trên màn chào
  const modalPetals = useMemo(() => {
    return Array.from({ length: 26 }, (_, i) => {
      const left = Math.random() * 100;
      const duration = 7 + Math.random() * 8; // 7s - 15s
      const delay = Math.random() * 8;
      const width = 14 + Math.random() * 18;
      const height = width * (1.2 + Math.random() * 0.35);

      return {
        id: i,
        style: {
          position: 'absolute',
          left: `${left}%`,
          top: '-40px',
          width: `${width}px`,
          height: `${height}px`,
          background: 'radial-gradient(circle at 35% 30%, #ffd4df 0%, #f69cb4 60%, #e26d91 100%)',
          borderRadius: '80% 15% 80% 25%',
          boxShadow: '0 4px 12px rgba(214, 108, 136, 0.3)',
          animation: `fallPetal ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          zIndex: Math.random() > 0.4 ? 2 : 5, // Một số cánh bay phía sau, một số cánh bay phía trước phong bì
          pointerEvents: 'none'
        }
      };
    });
  }, []);

  useEffect(() => {
    const hasOpened = sessionStorage.getItem('wedding_opened');
    if (hasOpened) {
      setIsOpen(false);
    }
  }, []);

  const handleOpenInvitation = () => {
    setOpening(true);
    // Kích hoạt phát nhạc cưới ngay khi khách chạm mở thiệp
    window.dispatchEvent(new Event('play-wedding-music'));

    // Bắn pháo hoa cánh hoa chào mừng
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#e8a0b4', '#fce8ed', '#d4a574', '#ffffff', '#ffd1dc']
    });

    setTimeout(() => {
      sessionStorage.setItem('wedding_opened', 'true');
      setIsOpen(false);
    }, 750);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="welcome-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: 'radial-gradient(circle at center, rgba(255, 246, 248, 0.98) 0%, rgba(246, 220, 229, 0.99) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.2rem',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden'
        }}
      >
        {/* HIỆU ỨNG CÁNH HOA RƠI TRÊN MÀN CHÀO */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
          {modalPetals.map(p => (
            <div key={p.id} style={p.style} />
          ))}
        </div>

        {/* CONTAINER PHONG BÌ 3D KÍCH THƯỚC LỚN HƠN */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '650px',
            height: '740px',
            maxHeight: '94vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1400px'
          }}
        >
          {/* 1. NẮP PHONG BÌ MỞ LẬT LÊN TRÊN (OPEN TOP FLAP) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '15px',
              left: '4%',
              width: '92%',
              height: '175px',
              background: 'linear-gradient(180deg, #f5c0ce 0%, #eaaebd 100%)',
              clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
              transformOrigin: 'bottom',
              zIndex: 1,
              filter: 'drop-shadow(0 -6px 14px rgba(186, 76, 105, 0.18))'
            }}
          >
            {/* Lớp lót hoa văn vàng bên trong nắp mở */}
            <div
              style={{
                position: 'absolute',
                inset: '5px',
                clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                background: 'linear-gradient(180deg, #fcecee 0%, #f7d4de 100%)',
                borderTop: '1.5px solid rgba(212, 165, 116, 0.5)'
              }}
            />
          </motion.div>

          {/* 2. THÂN ĐÁY PHONG BÌ (ENVELOPE BACK LINING) */}
          <div
            style={{
              position: 'absolute',
              bottom: '25px',
              left: '4%',
              width: '92%',
              height: '480px',
              borderRadius: '0 0 24px 24px',
              background: 'linear-gradient(180deg, #fce6ed 0%, #f7c3d2 100%)',
              boxShadow: '0 30px 70px -10px rgba(186, 76, 105, 0.35)',
              zIndex: 0
            }}
          />

          {/* 3. TẤM THIỆP CƯỚI NẰM Ở GIỮA ĐANG NHÔ LÊN (THE INVITATION CARD) */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.94 }}
            animate={opening ? { y: -200, opacity: 0, scale: 1.12 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              zIndex: 10,
              width: '88%',
              maxWidth: '540px',
              marginTop: '-30px',
              background: 'linear-gradient(145deg, #ffffff 0%, #fffcf9 100%)',
              borderRadius: '24px',
              padding: '16px',
              boxShadow: '0 25px 60px rgba(90, 34, 48, 0.25), 0 0 0 1px rgba(212, 165, 116, 0.45)',
              transformOrigin: 'bottom center'
            }}
          >
            {/* Khung viền chỉ vàng đôi bên trong thiệp */}
            <div
              style={{
                border: '1.5px solid rgba(212, 165, 116, 0.6)',
                borderRadius: '18px',
                padding: '2.5rem 1.8rem 2.8rem',
                textAlign: 'center',
                position: 'relative',
                background: 'radial-gradient(circle at center, #ffffff 50%, #fffbf8 100%)'
              }}
            >
              {/* 4 góc hoa văn L-frame mạ vàng */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', width: '24px', height: '24px', borderTop: '2.5px solid var(--gold-500)', borderLeft: '2.5px solid var(--gold-500)', opacity: 0.8 }} />
              <div style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', borderTop: '2.5px solid var(--gold-500)', borderRight: '2.5px solid var(--gold-500)', opacity: 0.8 }} />
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '24px', height: '24px', borderBottom: '2.5px solid var(--gold-500)', borderLeft: '2.5px solid var(--gold-500)', opacity: 0.8 }} />
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '24px', height: '24px', borderBottom: '2.5px solid var(--gold-500)', borderRight: '2.5px solid var(--gold-500)', opacity: 0.8 }} />

              {/* Con dấu sáp mạ vàng (Wax Seal) */}
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  margin: '0 auto 1.2rem',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #eed1aa 0%, #c99b5b 65%, #9b723a 100%)',
                  boxShadow: '0 8px 20px rgba(201, 155, 91, 0.4), inset 0 2px 4px rgba(255,255,255,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.9rem',
                  border: '2px dashed rgba(255, 255, 255, 0.65)'
                }}
              >
                <GiDiamondRing style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }} />
              </div>

              {/* Chữ WEDDING INVITATION */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-600)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                <span>WEDDING INVITATION</span>
              </div>

              {/* Tên cặp đôi Calligraphy lớn hơn, rõ nét */}
              <h2
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(2.8rem, 6vw, 4.4rem)',
                  color: 'var(--rose-800)',
                  lineHeight: 1.15,
                  margin: '0 0 0.5rem',
                  textShadow: '0 2px 10px rgba(232, 160, 180, 0.25)'
                }}
              >
                {weddingConfig.groom.shortName}
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.65em', color: 'var(--gold-500)', margin: '0 0.4rem' }}>
                  &
                </span>
                {weddingConfig.bride.shortName}
              </h2>

              {/* Lời trân trọng kính mời */}
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.25rem)',
                  color: 'var(--text-dark)',
                  fontStyle: 'italic',
                  maxWidth: '380px',
                  margin: '0.5rem auto 1.2rem',
                  lineHeight: 1.6
                }}
              >
                Trân trọng kính mời quý khách đến dự hôn lễ chung vui cùng chúng mình
              </p>

              {/* Dải phân cách mạ vàng */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', margin: '0 auto 1.4rem', maxWidth: '240px' }}>
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold-400))' }} />
                <FaHeart style={{ color: 'var(--rose-500)', fontSize: '0.85rem' }} />
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--gold-400), transparent)' }} />
              </div>

              {/* Ngày Cưới */}
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', marginBottom: '2.2rem' }}>
                {weddingConfig.dateFormatted}
              </div>

              {/* Nút duy nhất: MỞ THIỆP */}
              <motion.button
                className="btn-primary"
                onClick={handleOpenInvitation}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  padding: '1rem 3.4rem',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  boxShadow: '0 12px 30px rgba(214, 108, 136, 0.45)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 20
                }}
                id="open-invitation-btn"
              >
                <FaEnvelopeOpen style={{ fontSize: '1.1rem' }} />
                <span>Mở Thiệp</span>
              </motion.button>
            </div>
          </motion.div>

          {/* 4. TÚI TRƯỚC PHONG BÌ (ENVELOPE FRONT POCKET) */}
          <div
            style={{
              position: 'absolute',
              bottom: '25px',
              left: '4%',
              width: '92%',
              height: '140px',
              borderRadius: '0 0 24px 24px',
              background: 'linear-gradient(180deg, #f7b5c6 0%, #e699ac 100%)',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0, 100% 100%, 0 100%)',
              zIndex: 5,
              boxShadow: '0 -8px 24px rgba(186, 76, 105, 0.2)',
              pointerEvents: 'none'
            }}
          >
            {/* Đường viền chỉ vàng vát cổ áo phong bì */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                borderTop: '2px solid rgba(255, 255, 255, 0.65)'
              }}
            />
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
