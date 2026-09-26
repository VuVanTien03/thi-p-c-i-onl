import React, { useState } from 'react';
import InvitationCover from './components/InvitationCover';
import FallingPetals from './components/FallingPetals';
import MusicPlayer from './components/MusicPlayer';
import ScrollToTop from './components/ScrollToTop';
import HeroSection from './components/HeroSection';
import CountdownTimer from './components/CountdownTimer';
import CoupleSection from './components/CoupleSection';
import StorySection from './components/StorySection';
import EventDetails from './components/EventDetails';
import PhotoGallery from './components/PhotoGallery';
import RSVPForm from './components/RSVPForm';
import WishesSection from './components/WishesSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import GiftModal from './components/GiftModal';
import AutoScrollManager from './components/AutoScrollManager';
import { FaEnvelope } from 'react-icons/fa';

import './styles/sections.css';

export default function App() {
  // Trang 1: 'cover' (Bìa thiệp phong bì xanh rêu như ảnh mẫu)
  // Trang 2: 'main' (Toàn bộ nội dung chi tiết thiệp cưới)
  const [currentPage, setCurrentPage] = useState('cover');
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [giftDefaultTab, setGiftDefaultTab] = useState('groom');

  const handleOpenInvitation = () => {
    // Kích hoạt phát nhạc bài hát cưới
    window.dispatchEvent(new Event('play-wedding-music'));
    // Chuyển sang Trang 2
    setCurrentPage('main');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenGift = (tab = 'groom') => {
    setGiftDefaultTab(tab);
    setGiftModalOpen(true);
  };

  const handleCloseGift = () => {
    setGiftModalOpen(false);
  };

  // NẾU LÀ TRANG 1: CHỈ HIỂN THỊ PHONG BÌ THIỆP (HOÀN TOÀN KHÔNG PHÁT NHẠC)
  if (currentPage === 'cover') {
    return (
      <div className="wedding-cover-container">
        <InvitationCover onOpen={handleOpenInvitation} />
      </div>
    );
  }

  // NẾU LÀ TRANG 2: HIỂN THỊ TOÀN BỘ NỘI DUNG & BẮT ĐẦU PHÁT NHẠC
  return (
    <div className="wedding-app-wrapper">
      {/* Cánh hoa rơi lãng mạn */}
      <FallingPetals />

      {/* Nút phát nhạc - Tự động phát khi vừa từ Trang 1 bấm Mở Thiệp sang */}
      <MusicPlayer autoPlay={true} />
      <ScrollToTop />
      {/* Tự động cuộn trang chầm chậm lãng mạn */}
      <AutoScrollManager />



      {/* Nút quay lại bìa phong bì (tùy chọn) */}
      <button
        onClick={() => {
          setCurrentPage('cover');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        style={{
          position: 'fixed',
          top: '1.2rem',
          left: '1.2rem',
          zIndex: 999,
          background: 'rgba(255, 255, 255, 0.88)',
          border: '1px solid rgba(70, 96, 72, 0.3)',
          color: '#344b36',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.85rem',
          fontWeight: 600,
          padding: '0.5rem 1rem',
          borderRadius: '999px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          cursor: 'pointer',
          backdropFilter: 'blur(6px)'
        }}
        title="Bấm để xem lại bìa thiệp phong bì"
      >
        <FaEnvelope style={{ color: '#466048' }} />
        <span>Bìa Thiệp</span>
      </button>

      {/* Các Section Chính Trang 2 */}
      <main>
        <HeroSection onOpenGift={() => handleOpenGift('groom')} />
        <CountdownTimer />
        <CoupleSection onOpenGift={handleOpenGift} />
        <StorySection />
        <EventDetails />
        <PhotoGallery />
        <RSVPForm />
        <WishesSection />
        <MapSection />
      </main>

      <Footer />

      {/* Hộp mừng cưới Modal */}
      <GiftModal
        isOpen={giftModalOpen}
        onClose={handleCloseGift}
        defaultTab={giftDefaultTab}
      />
    </div>
  );
}
