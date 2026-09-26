import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaDirections } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';
import SectionHeader from './SectionHeader';

export default function MapSection() {
  const [activeEventIndex, setActiveEventIndex] = useState(1); // Default to Reception (Tiệc Cưới)
  const activeEvent = weddingConfig.events[activeEventIndex];

  return (
    <section className="map-section" id="map-section">
      <div className="container">
        <SectionHeader
          subtitle="CHỈ ĐƯỜNG ĐẾN ĐỊA ĐIỂM"
          title="Bản Đồ Đến Hôn Lễ"
        />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {weddingConfig.events.map((evt, idx) => (
            <button
              key={evt.id}
              className={activeEventIndex === idx ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.6rem' }}
              onClick={() => setActiveEventIndex(idx)}
            >
              <FaMapMarkedAlt /> {evt.title}
            </button>
          ))}
        </div>

        <motion.div
          className="map-wrapper"
          key={activeEvent.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ padding: '1.2rem 1.8rem', background: 'var(--rose-50)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-dark)' }}>
                {activeEvent.subtitle}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {activeEvent.address}
              </p>
            </div>
            <a
              href={activeEvent.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}
            >
              <FaDirections /> Mở Ứng Dụng Google Maps
            </a>
          </div>

          <iframe
            src={activeEvent.mapEmbed}
            title={`Bản đồ ${activeEvent.title}`}
            className="map-iframe"
            loading="lazy"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
