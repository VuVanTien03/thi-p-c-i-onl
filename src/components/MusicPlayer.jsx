import React, { useState, useEffect, useRef } from 'react';
import { FaMusic, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const timerRef = useRef(null);
  const audioElemRef = useRef(null);

  // Giai điệu Canon in D / Romantic Ballad ấm áp tạo bởi Web Audio API
  // Tần số nốt nhạc (Hz)
  const notes = {
    D4: 293.66, Fs4: 369.99, A4: 440.00,
    A3: 220.00, C4: 261.63, E4: 329.63,
    B3: 246.94, D3: 146.83, Fs3: 185.00,
    G3: 196.00, B4: 493.88, D5: 587.33,
    Fs5: 739.99, E5: 659.25, Cs5: 554.37
  };

  // Chuỗi hợp âm arpeggio du dương lãng mạn
  const melody = [
    // D major
    { note: notes.D4, dur: 0.6 }, { note: notes.Fs4, dur: 0.6 }, { note: notes.A4, dur: 0.6 }, { note: notes.D5, dur: 0.8 },
    // A major
    { note: notes.Cs5, dur: 0.6 }, { note: notes.A4, dur: 0.6 }, { note: notes.E4, dur: 0.6 }, { note: notes.A3, dur: 0.8 },
    // B minor
    { note: notes.B4, dur: 0.6 }, { note: notes.Fs4, dur: 0.6 }, { note: notes.D4, dur: 0.6 }, { note: notes.B3, dur: 0.8 },
    // F# minor
    { note: notes.A4, dur: 0.6 }, { note: notes.Fs4, dur: 0.6 }, { note: notes.Cs4, dur: 0.6 }, { note: notes.Fs3, dur: 0.8 },
    // G major
    { note: notes.G3, dur: 0.6 }, { note: notes.B3, dur: 0.6 }, { note: notes.D4, dur: 0.6 }, { note: notes.G4, dur: 0.8 },
    // D major
    { note: notes.Fs4, dur: 0.6 }, { note: notes.D4, dur: 0.6 }, { note: notes.A3, dur: 0.6 }, { note: notes.D4, dur: 0.8 },
    // G major
    { note: notes.G4, dur: 0.6 }, { note: notes.B4, dur: 0.6 }, { note: notes.D5, dur: 0.6 }, { note: notes.B4, dur: 0.8 },
    // A7
    { note: notes.E4, dur: 0.6 }, { note: notes.A4, dur: 0.6 }, { note: notes.Cs5, dur: 0.6 }, { note: notes.E5, dur: 0.8 }
  ];

  const playTone = (freq, duration, ctx) => {
    if (!ctx || ctx.state === 'closed') return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Âm thanh đàn harp / electric piano ấm
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignored
    }
  };

  const startSynth = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }

    const ctx = audioContextRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    let noteIdx = 0;
    const playNext = () => {
      if (!ctx || ctx.state !== 'running') return;
      const current = melody[noteIdx];
      if (current && current.note) {
        playTone(current.note, current.dur * 1.5, ctx);
      }
      noteIdx = (noteIdx + 1) % melody.length;
      timerRef.current = setTimeout(playNext, (current ? current.dur : 0.6) * 1000);
    };

    playNext();
  };

  const stopSynth = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      // Stop
      if (audioElemRef.current && !audioElemRef.current.paused) {
        audioElemRef.current.pause();
      }
      stopSynth();
      setIsPlaying(false);
    } else {
      // Start
      // Kiểm tra xem có file audio MP3 không
      if (audioElemRef.current && audioElemRef.current.src) {
        audioElemRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fallback sang Web Audio API synthesizer
          startSynth();
          setIsPlaying(true);
        });
      } else {
        startSynth();
        setIsPlaying(true);
      }
    }
  };

  // Thử tự động phát nhạc khi user click bất kỳ đâu lần đầu tiên trên trang
  useEffect(() => {
    const handleFirstClick = () => {
      if (!isPlaying) {
        togglePlay();
      }
      window.removeEventListener('click', handleFirstClick);
    };

    window.addEventListener('click', handleFirstClick, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstClick);
      stopSynth();
    };
  }, []);

  return (
    <>
      <audio
        ref={audioElemRef}
        src="/music/wedding-song.mp3"
        loop
        preload="auto"
      />

      <button
        className={`music-player-btn ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        title={isPlaying ? 'Đang phát nhạc lãng mạn (Bấm để tắt)' : 'Bấm để nghe nhạc cưới'}
        id="music-toggle-btn"
      >
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
    </>
  );
}
