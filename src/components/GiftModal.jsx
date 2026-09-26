import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGift, FaCopy, FaCheck } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';

export default function GiftModal({ isOpen, onClose, defaultTab = 'groom' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentPerson = activeTab === 'groom' ? weddingConfig.groom : weddingConfig.bride;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card gift-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{ width: '100%', maxWidth: '440px', background: '#fff' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <FaGift style={{ color: 'var(--gold-500)', fontSize: '1.4rem' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-dark)' }}>
                Hộp Mừng Cưới
              </h3>
            </div>
            <button
              onClick={onClose}
              style={{ fontSize: '1.2rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              aria-label="Đóng"
            >
              <FaTimes />
            </button>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Cảm ơn tình cảm chân thành và lời chúc phúc quý báu của quý khách dành cho chúng mình.
          </p>

          {/* Tab Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem', background: 'var(--rose-50)', padding: '4px', borderRadius: '999px' }}>
            <button
              style={{
                padding: '0.6rem 0',
                borderRadius: '999px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: activeTab === 'groom' ? '#fff' : 'var(--text-muted)',
                background: activeTab === 'groom' ? 'var(--rose-600)' : 'transparent',
                transition: 'all 0.3s'
              }}
              onClick={() => setActiveTab('groom')}
            >
              Chú Rể Tuấn Anh
            </button>
            <button
              style={{
                padding: '0.6rem 0',
                borderRadius: '999px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: activeTab === 'bride' ? '#fff' : 'var(--text-muted)',
                background: activeTab === 'bride' ? 'var(--rose-600)' : 'transparent',
                transition: 'all 0.3s'
              }}
              onClick={() => setActiveTab('bride')}
            >
              Cô Dâu Thu Trang
            </button>
          </div>

          {/* QR Code */}
          <img
            src={currentPerson.bank.qrCode}
            alt={`QR Mừng cưới ${currentPerson.name}`}
            className="qr-code-img"
          />

          {/* Bank Info */}
          <div className="bank-info-box">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Ngân hàng: <strong>{currentPerson.bank.bankName}</strong>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Chủ tài khoản: <strong>{currentPerson.bank.accountName}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: 'var(--rose-800)' }}>
                {currentPerson.bank.accountNumber}
              </span>
              <button
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                onClick={() => handleCopy(currentPerson.bank.accountNumber)}
              >
                {copied ? <><FaCheck style={{ color: '#2e7d32' }} /> Đã chép</> : <><FaCopy /> Sao chép</>}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
