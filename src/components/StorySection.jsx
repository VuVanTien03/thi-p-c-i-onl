import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../data/weddingConfig';
import SectionHeader from './SectionHeader';

export default function StorySection() {
  return (
    <section className="story-section" id="story-section">
      <div className="container">
        <SectionHeader
          subtitle="HÀNH TRÌNH YÊU THƯƠNG"
          title="Chuyện Tình Của Chúng Mình"
        />

        <div className="timeline">
          {weddingConfig.story.map((item, index) => {
            const isOdd = index % 2 === 0;
            return (
              <motion.div
                key={item.year}
                className="timeline-item"
                initial={{ opacity: 0, x: isOdd ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <div className="timeline-dot" />
                <div className="timeline-card glass-card">
                  <div className="timeline-year">{item.year}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
