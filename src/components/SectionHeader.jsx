import React from 'react';
import { motion } from 'framer-motion';
import { GiHeartWings } from 'react-icons/gi';

export default function SectionHeader({ subtitle, title, id }) {
  return (
    <motion.div 
      id={id}
      className="section-header"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      <h2 className="section-title">{title}</h2>
      <div className="section-ornament">
        <span className="section-ornament-line" />
        <GiHeartWings className="section-ornament-icon" />
        <span className="section-ornament-line" />
      </div>
    </motion.div>
  );
}
