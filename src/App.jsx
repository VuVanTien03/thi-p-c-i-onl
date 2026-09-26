import React, { useState } from 'react';
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
import './styles/sections.css';

export default function App() {
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [giftDefaultTab, setGiftDefaultTab] = useState('groom');

  const handleOpenGift = (tab = 'groom') => {
    setGiftDefaultTab(tab);
    setGiftModalOpen(true);
  };

  const handleCloseGift = () => {
    setGiftModalOpen(false);
  };

  return (
    <div className="wedding-app-wrapper">
      {/* Cánh hoa rơi lãng mạn */}
      <FallingPetals />

      {/* Nút phát nhạc & cuộn trang */}
      <MusicPlayer />
      <ScrollToTop />

      {/* Main Sections */}
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
