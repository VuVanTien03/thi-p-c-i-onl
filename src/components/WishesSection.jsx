import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaHeart, FaPaperPlane, FaCommentDots } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';
import SectionHeader from './SectionHeader';

export default function WishesSection() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Tải danh sách lời chúc ban đầu (kết hợp Config + LocalStorage + Google Sheet)
  useEffect(() => {
    const loadWishes = async () => {
      setLoading(true);
      const local = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
      let combined = [...local, ...weddingConfig.initialWishes];

      try {
        const url = weddingConfig.googleScriptUrl;
        if (url && !url.includes('YOUR_SCRIPT_ID')) {
          const res = await fetch(url);
          const data = await res.json();
          if (data && data.status === 'success' && Array.isArray(data.data)) {
            combined = [...data.data, ...combined];
          }
        }
      } catch (err) {
        console.warn('Lấy lời chúc từ sheet thất bại, dùng local:', err);
      }

      // Xóa trùng lặp theo tên + message
      const seen = new Set();
      const unique = combined.filter(w => {
        const key = `${w.name}-${w.message}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setWishes(unique);
      setLoading(false);
    };

    loadWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSending(true);
    setStatusMsg('');

    const newWish = {
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString()
    };

    try {
      const url = weddingConfig.googleScriptUrl;
      if (url && !url.includes('YOUR_SCRIPT_ID')) {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            type: 'wish',
            name: newWish.name,
            message: newWish.message
          })
        });

      }

      // Lưu LocalStorage
      const local = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
      local.unshift(newWish);
      localStorage.setItem('wedding_wishes', JSON.stringify(local));

      // Cập nhật state hiển thị ngay lập tức
      setWishes(prev => [newWish, ...prev]);

      setName('');
      setMessage('');
      setStatusMsg('Cảm ơn bạn đã gửi lời chúc thật ngọt ngào! 💕');

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e8a0b4', '#d4a574', '#ffffff']
      });
    } catch (err) {
      console.warn('Lỗi gửi wish:', err);
      setWishes(prev => [newWish, ...prev]);
      setName('');
      setMessage('');
      setStatusMsg('Đã lưu lời chúc của bạn thành công!');
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr || 'Mới đây';
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Mới đây';
    }
  };

  return (
    <section className="wishes-section" id="wishes-section">
      <div className="container">
        <SectionHeader
          subtitle="SỔ LƯU BÚT YÊU THƯƠNG"
          title="Gửi Lời Chúc Mừng"
        />

        <div className="wishes-wrapper">
          {/* Cột gửi lời chúc */}
          <motion.div
            className="glass-card"
            style={{ padding: '2.5rem' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
              Để lại lời nhắn yêu thương
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>
              Mỗi lời chúc chân thành từ bạn là một món quà vô giá cho khởi đầu mới của vợ chồng mình.
            </p>

            {statusMsg && (
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#edf7ed',
                border: '1px solid #c8e6c9',
                borderRadius: '12px',
                color: '#2e7d32',
                fontSize: '0.9rem',
                marginBottom: '1.2rem'
              }}>
                {statusMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="wish-name">Họ và tên của bạn</label>
                <input
                  id="wish-name"
                  type="text"
                  required
                  placeholder="Tên hoặc biệt danh thân mật"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="wish-message">Lời chúc</label>
                <textarea
                  id="wish-message"
                  required
                  rows="4"
                  placeholder="Gửi gắm những điều tốt đẹp nhất đến Tuấn Anh & Thu Trang..."
                  className="form-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                disabled={sending}
              >
                {sending ? 'Đang gửi...' : <><FaPaperPlane /> Gửi Lời Chúc</>}
              </button>
            </form>
          </motion.div>

          {/* Cột hiển thị danh sách lời chúc */}
          <motion.div
            className="glass-card"
            style={{ padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid var(--rose-200)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-dark)' }}>
                Lời Chúc Đã Nhận ({wishes.length})
              </h4>
              <FaCommentDots style={{ color: 'var(--rose-500)', fontSize: '1.2rem' }} />
            </div>

            <div className="wishes-list">
              <AnimatePresence>
                {wishes.map((w, idx) => (
                  <motion.div
                    key={`${w.name}-${idx}`}
                    className="wish-item"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="wish-header">
                      <div className="wish-avatar">
                        {w.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="wish-name">{w.name}</span>
                      <span className="wish-date">{formatDate(w.date)}</span>
                    </div>
                    <p className="wish-text">{w.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
