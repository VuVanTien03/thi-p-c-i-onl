import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';

export default function Footer() {
  return (
    <footer className="wedding-footer">
      <div className="container">
        <div className="footer-names">
          {weddingConfig.groom.shortName} & {weddingConfig.bride.shortName}
        </div>
        <p className="footer-text" style={{ maxWidth: '600px', margin: '0.5rem auto 1.5rem' }}>
          "Cảm ơn bạn đã luôn là một phần ý nghĩa trong hành trình yêu thương và trưởng thành của chúng mình."
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--rose-700)', fontSize: '0.9rem' }}>
          <span>Forever & Always</span>
          <FaHeart style={{ color: 'var(--rose-600)', fontSize: '0.75rem' }} />
          <span>20.12.2026</span>
        </div>

        <div style={{ marginTop: '2.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
          Thiệp cưới online thiết kế với trọn vẹn yêu thương ❤️
        </div>
      </div>
    </footer>
  );
}
