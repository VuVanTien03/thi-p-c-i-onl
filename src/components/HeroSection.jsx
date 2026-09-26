import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHeart, FaCalendarCheck, FaGift, FaPenFancy } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';
import TypewriterText from './TypewriterText';

export default function HeroSection({ onOpenGift }) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 180]);
  const opacityContent = useTransform(scrollY, [0, 450], [1, 0.2]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <motion.div className="hero-bg-wrapper" style={{ y: yBg }}>
        <img
          src="/images/hero.jpg"
          alt="Tuấn Anh & Thu Trang Wedding"
          className="hero-bg-img"
        />
        <div className="hero-overlay" />
      </motion.div>

      <motion.div className="hero-content" style={{ opacity: opacityContent }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-tag">
            <FaHeart style={{ color: 'var(--rose-600)', fontSize: '0.8rem' }} />
            <span>SAVE OUR SPECIAL DATE</span>
            <FaHeart style={{ color: 'var(--rose-600)', fontSize: '0.8rem' }} />
          </div>
        </motion.div>

        <motion.h1
          className="hero-names"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {weddingConfig.groom.shortName}
          <span className="hero-ampersand">&</span>
          {weddingConfig.bride.shortName}
        </motion.h1>

        <motion.div
          className="hero-quote-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="hero-quote">
            <TypewriterText text={weddingConfig.quote.text} speed={40} delay={900} />
          </p>
        </motion.div>

        <motion.div
          className="hero-date-badge"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <div className="hero-date-text">{weddingConfig.dateFormatted}</div>
          <div className="hero-lunar-text">{weddingConfig.lunarDateFormatted}</div>
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <button
            className="btn-primary"
            onClick={() => scrollTo('rsvp-section')}
            id="hero-rsvp-btn"
          >
            <FaCalendarCheck /> Xác Nhận Tham Dự
          </button>

          <button
            className="btn-secondary"
            onClick={() => scrollTo('wishes-section')}
            id="hero-wish-btn"
          >
            <FaPenFancy /> Gửi Lời Chúc
          </button>

          <button
            className="btn-secondary"
            onClick={onOpenGift}
            id="hero-gift-btn"
          >
            <FaGift /> Mừng Cưới
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
