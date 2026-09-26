import React, { useMemo } from 'react';

export default function FallingPetals() {
  // Sinh danh sách 22 cánh hoa ngẫu nhiên
  const petals = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => {
      const left = Math.random() * 100; // 0 - 100%
      const duration = 9 + Math.random() * 8; // 9s - 17s
      const delay = Math.random() * 12; // 0s - 12s
      const width = 12 + Math.random() * 14; // 12px - 26px
      const height = width * (1.2 + Math.random() * 0.4);
      const blur = Math.random() > 0.7 ? 1 : 0;

      return {
        id: i,
        style: {
          left: `${left}%`,
          width: `${width}px`,
          height: `${height}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          filter: blur ? 'blur(1px)' : 'none',
        }
      };
    });
  }, []);

  return (
    <div className="petals-container" aria-hidden="true">
      {petals.map(p => (
        <div key={p.id} className="petal" style={p.style} />
      ))}
    </div>
  );
}
