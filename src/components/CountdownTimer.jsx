import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';

export default function CountdownTimer() {
  const calculateTimeLeft = () => {
    const diff = new Date(weddingConfig.weddingDate) - new Date();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds }
  ];

  return (
    <section className="countdown-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <span style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '0.9rem', 
            color: 'var(--rose-700)', 
            fontWeight: 600,
            letterSpacing: '0.15em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            textTransform: 'uppercase'
          }}>
            <FaClock style={{ color: 'var(--gold-500)' }} />
            ĐẾM NGƯỢC NGÀY CHUNG ĐÔI
          </span>
        </motion.div>

        <div className="countdown-grid">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="countdown-box"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="countdown-number">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="countdown-label">{unit.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
