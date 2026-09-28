import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaEnvelopeOpen } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';

export default function InvitationCover({ onOpen }) {
  // Sinh danh sách 10 cánh hoa hồng rơi mềm mại ở trang bìa (thưa và thoang thoảng)
  const coverPetals = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const left = Math.random() * 100;
      const duration = 11 + Math.random() * 9; // 11s - 20s
      const delay = Math.random() * 14;
      const width = 13 + Math.random() * 14;
      const height = width * (1.2 + Math.random() * 0.35);

      return {
        id: i,
        style: {
          position: 'absolute',
          left: `${left}%`,
          top: '-40px',
          width: `${width}px`,
          height: `${height}px`,
          background: 'radial-gradient(circle at 35% 30%, #ffd4df 0%, #f8a0b7 60%, #e57294 100%)',
          borderRadius: '80% 15% 80% 25%',
          boxShadow: '0 4px 12px rgba(214, 108, 136, 0.3)',
          animation: `fallPetal ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          zIndex: 1,
          pointerEvents: 'none'
        }
      };
    });
  }, []);


  const handleOpen = () => {
    // Bắn pháo hoa cánh hoa hồng rực rỡ
    confetti({
      particleCount: 95,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e8a0b4', '#fce8ed', '#d4a574', '#ffffff', '#ffd1dc']
    });

    onOpen();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(circle at 50% 40%, #fff7f9 0%, #fdeef3 50%, #fae1ea 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.2rem',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* 🌸 HIỆU ỨNG CÁNH HOA HỒNG RƠI BỒNG BỀNH */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
        {coverPetals.map(p => (
          <div key={p.id} style={p.style} />
        ))}
      </div>

      {/* 🌸 CHÙM HOA ANH ĐÀO / HỒNG PASTEL TRANG TRÍ GÓC TRÊN BÊN TRÁI (SVG) */}
      <svg
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          width: 'clamp(95px, 16vw, 160px)',
          height: 'clamp(120px, 20vw, 210px)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.95
        }}
        viewBox="0 0 100 130"
        fill="none"
      >
        <path d="M50 130 Q45 80 20 40 M50 130 Q60 85 75 50" stroke="#cf9ca8" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="32" cy="70" rx="8" ry="4" fill="#e8c2cc" transform="rotate(-30 32 70)" />
        <ellipse cx="62" cy="78" rx="8" ry="4" fill="#e8c2cc" transform="rotate(35 62 78)" />
        {/* Hoa hồng pastel lớn */}
        <g transform="translate(22, 36)">
          <circle cx="0" cy="-14" r="6" fill="#ffd9e2" />
          <circle cx="10" cy="-10" r="6" fill="#ffd9e2" />
          <circle cx="14" cy="0" r="6" fill="#ffd9e2" />
          <circle cx="10" cy="10" r="6" fill="#ffd9e2" />
          <circle cx="0" cy="14" r="6" fill="#ffd9e2" />
          <circle cx="-10" cy="10" r="6" fill="#ffd9e2" />
          <circle cx="-14" cy="0" r="6" fill="#ffd9e2" />
          <circle cx="-10" cy="-10" r="6" fill="#ffd9e2" />
          <circle cx="0" cy="0" r="7" fill="#f49fb5" />
          <circle cx="0" cy="0" r="3.5" fill="#e87693" />
        </g>
        {/* Hoa nhỏ */}
        <g transform="translate(60, 24) scale(0.75)">
          <circle cx="0" cy="-14" r="6" fill="#ffffff" />
          <circle cx="10" cy="-10" r="6" fill="#ffffff" />
          <circle cx="14" cy="0" r="6" fill="#ffffff" />
          <circle cx="10" cy="10" r="6" fill="#ffffff" />
          <circle cx="0" cy="14" r="6" fill="#ffffff" />
          <circle cx="-10" cy="10" r="6" fill="#ffffff" />
          <circle cx="-14" cy="0" r="6" fill="#ffffff" />
          <circle cx="-10" cy="-10" r="6" fill="#ffffff" />
          <circle cx="0" cy="0" r="6" fill="#f6b8c8" />
        </g>
      </svg>

      {/* 🌷 BÓ HOA PASTEL & DẢI NƠ LỤA TRANG TRÍ GÓC DƯỚI BÊN PHẢI (SVG) */}
      <svg
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '15px',
          width: 'clamp(95px, 15vw, 150px)',
          height: 'clamp(110px, 18vw, 170px)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.95
        }}
        viewBox="0 0 100 120"
        fill="none"
      >
        <path d="M45 70 L35 110 M50 70 L50 115 M55 70 L65 110" stroke="#cf9ca8" strokeWidth="2.5" strokeLinecap="round" />
        {/* Nơ lụa thắt hoa */}
        <ellipse cx="50" cy="98" rx="8" ry="4" fill="#eed1aa" />
        {/* Bông hoa hồng pastel & mẫu đơn */}
        <path d="M28 45 C28 30 40 30 40 45 C40 55 28 55 28 45 Z" fill="#f8b4c5" />
        <path d="M45 35 C45 20 60 20 60 35 C60 48 45 48 45 35 Z" fill="#ee8fa7" />
        <path d="M62 48 C62 34 74 34 74 48 C74 58 62 58 62 48 Z" fill="#ffd1dc" />
        <circle cx="36" cy="62" r="5" fill="#fce4ec" />
        <circle cx="58" cy="60" r="5" fill="#fce4ec" />
      </svg>

      {/* 1. DÒNG CHỮ TRÊN CÙNG: We got married */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(2.5rem, 6.5vw, 4rem)',
          color: '#ba4c69',
          marginBottom: '1rem',
          textAlign: 'center',
          letterSpacing: '0.04em',
          textShadow: '0 2px 8px rgba(186, 76, 105, 0.15)'
        }}
      >
        We got married
      </motion.div>

      {/* 2. CỤM PHONG BÌ HỒNG PASTEL VỚI 2 ẢNH POLAROID VÀ VÉ CƯỚI */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '450px',
          height: '425px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          margin: '0 auto 1.5rem',
          cursor: 'pointer'
        }}
        onClick={handleOpen}
      >
        {/* --- NẮP PHONG BÌ MỞ RA PHÍA SAU (HỒNG PASTEL) --- */}
        <div
          style={{
            position: 'absolute',
            bottom: '180px',
            width: '94%',
            height: '115px',
            background: 'linear-gradient(180deg, #e597ab 0%, #d68197 100%)',
            clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
            zIndex: 1,
            borderRadius: '4px'
          }}
        />

        {/* --- ẢNH POLAROID 1 (BÊN TRÁI - NGHIÊNG TRÁI) --- */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -5 }}
          style={{
            position: 'absolute',
            bottom: '90px',
            left: '14px',
            width: '175px',
            height: '225px',
            background: '#ffffff',
            padding: '8px 8px 24px',
            borderRadius: '8px',
            boxShadow: '0 14px 30px rgba(186, 76, 105, 0.22)',
            transform: 'rotate(-9deg)',
            transformOrigin: 'bottom center',
            zIndex: 2,
            transition: 'transform 0.3s ease'
          }}
        >
          <img
            src="/images/polaroid-left.jpg"
            alt="Ảnh cưới chú rể cô dâu"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        </motion.div>

        {/* --- ẢNH POLAROID 2 (BÊN PHẢI - NGHIÊNG PHẢI) --- */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          style={{
            position: 'absolute',
            bottom: '95px',
            right: '14px',
            width: '175px',
            height: '225px',
            background: '#ffffff',
            padding: '8px 8px 24px',
            borderRadius: '8px',
            boxShadow: '0 14px 30px rgba(186, 76, 105, 0.22)',
            transform: 'rotate(9deg)',
            transformOrigin: 'bottom center',
            zIndex: 2,
            transition: 'transform 0.3s ease'
          }}
        >
          <img
            src="/images/polaroid-right.jpg"
            alt="Ảnh cưới nụ cười hạnh phúc"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        </motion.div>

        {/* --- CHIẾC VÉ TICKET "NGÀY CHUNG ĐÔI" Ở GIỮA --- */}
        <motion.div
          whileHover={{ y: -8 }}
          style={{
            position: 'absolute',
            bottom: '100px',
            width: '195px',
            background: '#ffffff',
            border: '1px dashed #e8b0be',
            borderRadius: '14px',
            padding: '14px 12px',
            textAlign: 'center',
            boxShadow: '0 14px 32px rgba(186, 76, 105, 0.18)',
            zIndex: 3,
            transition: 'transform 0.3s ease'
          }}
        >
          {/* Cạnh khuyết vé trái & phải */}
          <div style={{ position: 'absolute', left: '-8px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', borderRadius: '50%', background: '#eb9ab0' }} />
          <div style={{ position: 'absolute', right: '-8px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', borderRadius: '50%', background: '#eb9ab0' }} />

          <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.45rem', color: '#ba4c69', lineHeight: 1.1 }}>
            Ngày Chung Đôi
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontWeight: 700, color: '#7a283e', letterSpacing: '0.08em', margin: '6px 0 2px' }}>
            20 . 12 . 2026
          </div>
          <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.1rem', color: '#c76e86' }}>
            We're getting married!
          </div>

        </motion.div>

        {/* --- THÂN TRƯỚC PHONG BÌ HỒNG PASTEL (ENVELOPE POCKET) --- */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '215px',
            background: 'linear-gradient(180deg, #efa4b8 0%, #dc8299 100%)',
            clipPath: 'polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)',
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 20px 45px rgba(186, 76, 105, 0.3)',
            zIndex: 4,
            overflow: 'hidden'
          }}
        >
          {/* Họa tiết vải canvas sọc nhẹ trên phong bì */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 4px)',
              pointerEvents: 'none'
            }}
          />
          {/* Viền sáng trên miệng phong bì */}
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

        {/* --- CON DẤU SÁP VÀNG HOÀNG GIA (GOLD WAX SEAL) --- */}
        <div
          style={{
            position: 'absolute',
            bottom: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #eed1aa 0%, #c99b5b 65%, #9b723a 100%)',
            boxShadow: '0 8px 18px rgba(201, 155, 91, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.6)',
            border: '2px dashed rgba(255, 255, 255, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontFamily: "'Great Vibes', cursive",
            fontSize: '1.65rem',
            fontWeight: 700,
            zIndex: 5,
            pointerEvents: 'none'
          }}
        >
          TL
        </div>
      </motion.div>

      {/* 3. TÊN CÔ DÂU & CHÚ RỂ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ textAlign: 'center', zIndex: 2 }}
      >
        <h1
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(2.8rem, 7.5vw, 4.4rem)',
            color: '#8e2f46',
            fontWeight: 400,
            margin: '0.2rem 0 0.4rem',
            lineHeight: 1.15,
            textShadow: '0 2px 10px rgba(186, 76, 105, 0.18)'
          }}
        >
          {weddingConfig.bride.shortName} & {weddingConfig.groom.shortName}
        </h1>

        {/* NGÀY CƯỚI DƯỚI TÊN */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
            letterSpacing: '0.12em',
            color: '#5c1d2c',
            fontWeight: 600,
            marginBottom: '1.8rem'
          }}
        >
          20.12.2026
        </div>


        {/* NÚT MỞ THIỆP HỒNG PASTEL TÔNG-XUYỆT-TÔNG */}
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          style={{
            background: 'linear-gradient(135deg, #e88fa7 0%, #c65373 100%)',
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.08rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.95rem 3rem',
            borderRadius: '999px',
            border: 'none',
            boxShadow: '0 12px 28px rgba(198, 83, 115, 0.45)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8rem',
            cursor: 'pointer'
          }}
          id="open-wedding-btn"
        >
          <FaEnvelopeOpen style={{ fontSize: '1.05rem' }} />
          <span>Mở Thiệp</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
