import React, { useState, useEffect } from 'react';

export default function TypewriterText({ text, speed = 50, delay = 500 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, started, text, speed]);

  return (
    <span>
      "{displayedText}"
      {displayedText.length < text.length && (
        <span style={{ 
          display: 'inline-block',
          width: '2px', 
          height: '1.1em', 
          backgroundColor: 'var(--rose-600)', 
          marginLeft: '4px',
          verticalAlign: 'middle',
          animation: 'pulse-glow 0.8s infinite'
        }} />
      )}
    </span>
  );
}
