import React, { useMemo } from 'react';

export default function FallingPetals() {
  // Sinh danh sách 10 cánh hoa ngẫu nhiên nhẹ nhàng
  const petals = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const left = Math.random() * 100; // 0 - 100%
      const duration = 11 + Math.random() * 9; // 11s - 20s (rơi chậm, thoang thoảng)
      const delay = Math.random() * 14; // 0s - 14s (khoảng cách thưa)
      const width = 12 + Math.random() * 12; // 12px - 24px
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
