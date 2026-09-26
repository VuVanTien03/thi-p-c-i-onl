import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';
import SectionHeader from './SectionHeader';

export default function PhotoGallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openLightbox = (index) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const showNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev + 1) % weddingConfig.gallery.length);
  }, [selectedIdx]);

  const showPrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev - 1 + weddingConfig.gallery.length) % weddingConfig.gallery.length);
  }, [selectedIdx]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, showNext, showPrev]);

  return (
    <section className="gallery-section" id="gallery-section">
      <div className="container">
        <SectionHeader
          subtitle="KHOẢNH KHẮC NGỌT NGÀO"
          title="Album Ảnh Cưới"
        />

        <div className="gallery-grid">
          {weddingConfig.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              className={`gallery-item ${item.span}`}
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <img
                src={item.src}
                alt={item.title}
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 className="gallery-caption-title">{item.title}</h4>
                  <FaExpand style={{ fontSize: '1.1rem', opacity: 0.8 }} />
                </div>
                <p className="gallery-caption-desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            className="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox} aria-label="Đóng">
                <FaTimes />
              </button>

              <button className="lightbox-nav-btn prev" onClick={showPrev} aria-label="Ảnh trước">
                <FaChevronLeft />
              </button>

              <motion.img
                key={weddingConfig.gallery[selectedIdx].id}
                src={weddingConfig.gallery[selectedIdx].src}
                alt={weddingConfig.gallery[selectedIdx].title}
                className="lightbox-img"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />

              <button className="lightbox-nav-btn next" onClick={showNext} aria-label="Ảnh kế tiếp">
                <FaChevronRight />
              </button>

              <div className="lightbox-caption">
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600 }}>
                  {weddingConfig.gallery[selectedIdx].title}
                </h4>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', opacity: 0.85, marginTop: '4px' }}>
                  {weddingConfig.gallery[selectedIdx].description}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-400)', marginTop: '8px' }}>
                  {selectedIdx + 1} / {weddingConfig.gallery.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
