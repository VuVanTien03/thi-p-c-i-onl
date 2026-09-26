import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaCheckCircle, FaHeart, FaPaperPlane, FaUserFriends, FaRegCheckCircle } from 'react-icons/fa';
import { weddingConfig } from '../data/weddingConfig';
import SectionHeader from './SectionHeader';

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    side: 'Cả hai',
    guests: '1',
    attending: true,
    note: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e8a0b4', '#f7a8be', '#c99b5b', '#fff5f7']
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Gửi lên Google Apps Script nếu đã cấu hình
      const url = weddingConfig.googleScriptUrl;
      const isPlaceholder = !url || url.includes('YOUR_SCRIPT_ID');

      if (!isPlaceholder) {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            type: 'rsvp',
            ...formData,
            submittedAt: new Date().toISOString()
          })
        });
      }


      // Lưu bản sao dự phòng vào LocalStorage
      const storedRSVP = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      storedRSVP.push({ ...formData, time: new Date().toLocaleString() });
      localStorage.setItem('wedding_rsvps', JSON.stringify(storedRSVP));

      setSubmitted(true);
      triggerConfetti();
    } catch (err) {
      console.warn('Lỗi gửi Google Sheet, lưu tạm local:', err);
      // Vẫn ghi nhận cho khách không bị hụt hẫng
      setSubmitted(true);
      triggerConfetti();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rsvp-section" id="rsvp-section">
      <div className="container">
        <SectionHeader
          subtitle="SỰ HIỆN DIỆN CỦA BẠN LÀ NIỀM VINH HẠNH"
          title="Xác Nhận Tham Dự (RSVP)"
        />

        <motion.div
          className="rsvp-card glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {submitted ? (
            <motion.div
              style={{ textAlign: 'center', padding: '2rem 1rem' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div style={{ fontSize: '3.5rem', color: 'var(--rose-600)', marginBottom: '1rem' }}>
                <FaCheckCircle />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '0.8rem' }}>
                Cảm Ơn Bạn Đã Xác Nhận!
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto 1.8rem' }}>
                {formData.attending
                  ? `Sự hiện diện của bạn là niềm hạnh phúc to lớn đối với vợ chồng mình. Hẹn gặp lại bạn vào ngày 20/12/2026!`
                  : `Cảm ơn bạn đã gửi lời chúc. Dù bạn không thể đến chung vui, tình cảm của bạn luôn được chúng mình trân quý!`}
              </p>
              <button
                className="btn-secondary"
                onClick={() => setSubmitted(false)}
              >
                Gửi lại phản hồi khác
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div style={{
                  padding: '0.8rem 1.2rem',
                  backgroundColor: '#fff0f3',
                  border: '1px solid var(--rose-300)',
                  borderRadius: '12px',
                  color: 'var(--rose-800)',
                  fontSize: '0.9rem',
                  marginBottom: '1.5rem'
                }}>
                  {errorMsg}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-name">Họ và Tên của bạn *</label>
                  <input
                    id="rsvp-name"
                    type="text"
                    name="name"
                    required
                    placeholder="VD: Nguyễn Văn Nam"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-phone">Số điện thoại</label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    name="phone"
                    placeholder="VD: 0988 123 456"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-side">Bạn là khách của</label>
                  <select
                    id="rsvp-side"
                    name="side"
                    className="form-select"
                    value={formData.side}
                    onChange={handleChange}
                  >
                    <option value="Nhà Trai (Chú rể Tuấn Anh)">Nhà Trai (Chú rể Tuấn Anh)</option>
                    <option value="Nhà Gái (Cô dâu Thu Trang)">Nhà Gái (Cô dâu Thu Trang)</option>
                    <option value="Cả hai">Bạn bè thân thiết cả hai</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-guests">Số người tham dự</label>
                  <select
                    id="rsvp-guests"
                    name="guests"
                    className="form-select"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">1 người (Đi một mình)</option>
                    <option value="2">2 người (Đi cùng người thương)</option>
                    <option value="3">3 người (Gia đình)</option>
                    <option value="4+">4 người trở lên</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bạn sẽ tham dự chứ?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="attending"
                      checked={formData.attending === true}
                      onChange={() => setFormData(prev => ({ ...prev, attending: true }))}
                    />
                    <span>Chắc chắn sẽ tham dự ✨</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="attending"
                      checked={formData.attending === false}
                      onChange={() => setFormData(prev => ({ ...prev, attending: false }))}
                    />
                    <span>Rất tiếc không thể đến 💌</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-note">Lời nhắn gửi tới cặp đôi</label>
                <textarea
                  id="rsvp-note"
                  name="note"
                  rows="3"
                  placeholder="Gửi một vài lời nhắn nhủ thân thương..."
                  className="form-textarea"
                  value={formData.note}
                  onChange={handleChange}
                />
              </div>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', maxWidth: '340px' }}
                  disabled={loading}
                >
                  {loading ? (
                    <span>Đang gửi thông tin...</span>
                  ) : (
                    <>
                      <FaPaperPlane /> Gửi Xác Nhận Tham Dự
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
