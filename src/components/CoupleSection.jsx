import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaPhoneAlt, FaGift } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';
import SectionHeader from './SectionHeader';

export default function CoupleSection({ onOpenGift }) {
  const { groom, bride } = weddingConfig;

  return (
    <section className="couple-section" id="couple-section">
      <div className="container">
        <SectionHeader
          subtitle="GẶP GỠ CẶP ĐÔI"
          title="Cô Dâu & Chú Rể"
        />

        <div className="couple-grid">
          {/* Chú Rể */}
          <motion.div
            className="couple-card glass-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="couple-avatar-wrap">
              <img
                src={groom.avatar}
                alt={groom.name}
                className="couple-avatar"
              />
            </div>
            <span className="couple-role">{groom.role} • {groom.title}</span>
            <h3 className="couple-name">{groom.name}</h3>

            <div className="couple-parents">
              <div>Thân phụ: <strong>{groom.father}</strong></div>
              <div>Thân mẫu: <strong>{groom.mother}</strong></div>
            </div>

            <p className="couple-bio">"{groom.bio}"</p>

            <div style={{ marginTop: '1.8rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href={`tel:${groom.phone.replace(/\s+/g, '')}`} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>
                <FaPhoneAlt style={{ fontSize: '0.8rem', color: 'var(--rose-600)' }} /> {groom.phone}
              </a>
              <button
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                onClick={() => onOpenGift('groom')}
              >
                <FaGift style={{ fontSize: '0.85rem', color: 'var(--gold-500)' }} /> Mừng Chú Rể
              </button>
            </div>
          </motion.div>

          {/* Cô Dâu */}
          <motion.div
            className="couple-card glass-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="couple-avatar-wrap">
              <img
                src={bride.avatar}
                alt={bride.name}
                className="couple-avatar"
              />
            </div>
            <span className="couple-role">{bride.role} • {bride.title}</span>
            <h3 className="couple-name">{bride.name}</h3>

            <div className="couple-parents">
              <div>Thân phụ: <strong>{bride.father}</strong></div>
              <div>Thân mẫu: <strong>{bride.mother}</strong></div>
            </div>

            <p className="couple-bio">"{bride.bio}"</p>

            <div style={{ marginTop: '1.8rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href={`tel:${bride.phone.replace(/\s+/g, '')}`} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>
                <FaPhoneAlt style={{ fontSize: '0.8rem', color: 'var(--rose-600)' }} /> {bride.phone}
              </a>
              <button
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                onClick={() => onOpenGift('bride')}
              >
                <FaGift style={{ fontSize: '0.85rem', color: 'var(--gold-500)' }} /> Mừng Cô Dâu
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
