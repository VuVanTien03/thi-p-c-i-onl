import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaDirections, FaGlassCheers } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';
import { weddingConfig } from '../data/weddingConfig';
import SectionHeader from './SectionHeader';

export default function EventDetails({ onSelectMap }) {
  const addToGoogleCalendar = (event) => {
    // Generate Google Calendar Link
    const title = encodeURIComponent(`Lễ Cưới Tuấn Anh & Thu Trang - ${event.title}`);
    const details = encodeURIComponent(`Trân trọng kính mời quý khách tham dự ${event.title} của Tuấn Anh & Thu Trang.\nĐịa chỉ: ${event.address}`);
    const location = encodeURIComponent(event.address);
    // 2026-12-20
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261220T040000Z/20261220T080000Z`;
    window.open(url, '_blank');
  };

  return (
    <section className="events-section" id="events-section">
      <div className="container">
        <SectionHeader
          subtitle="THỜI GIAN & ĐỊA ĐIỂM"
          title="Thông Tin Hôn Lễ"
        />

        <div className="events-grid">
          {weddingConfig.events.map((event, index) => (
            <motion.div
              key={event.id}
              className="event-card glass-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <div className="event-icon-badge">
                {event.icon === 'rings' ? <GiDiamondRing /> : <FaGlassCheers />}
              </div>


              <h3 className="event-title">{event.title}</h3>
              <span className="event-subtitle">{event.subtitle}</span>

              <ul className="event-info-list">
                <li className="event-info-item">
                  <FaCalendarAlt className="event-info-icon" />
                  <span>{event.date}</span>
                </li>
                <li className="event-info-item">
                  <FaClock className="event-info-icon" />
                  <span>{event.time}</span>
                </li>
                <li className="event-info-item" style={{ alignItems: 'flex-start' }}>
                  <FaMapMarkerAlt className="event-info-icon" style={{ marginTop: '4px' }} />
                  <span className="event-address">{event.address}</span>
                </li>
              </ul>

              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'auto' }}>
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: '0.88rem', padding: '0.65rem 1.4rem' }}
                >
                  <FaDirections /> Chỉ Đường Google Maps
                </a>

                <button
                  className="btn-secondary"
                  style={{ fontSize: '0.88rem', padding: '0.65rem 1.4rem' }}
                  onClick={() => addToGoogleCalendar(event)}
                >
                  <FaCalendarAlt style={{ color: 'var(--rose-600)' }} /> Thêm Lịch Nhắc
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
