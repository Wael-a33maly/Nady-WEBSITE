import React, { useEffect, useState } from 'react';

export const MouseSpotlight: React.FC = () => {
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Radial Torch Spotlight effect revealing grid and glow underneath */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(650px circle at ${position.x}px ${position.y}px, rgba(var(--brand-primary-rgb, 201, 169, 97), 0.12), transparent 75%)`,
        }}
      />
      
      {/* Dynamic Grid illuminate beam */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay"
        style={{
          maskImage: `radial-gradient(400px circle at ${position.x}px ${position.y}px, black, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${position.x}px ${position.y}px, black, transparent 80%)`,
        }}
      />
    </div>
  );
};
