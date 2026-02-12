
import React, { useEffect, useState } from 'react';

const ConfettiEffect: React.FC = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const colors = ['#F58220', '#fbbf24', '#f87171', '#60a5fa', '#34d399'];
    const p = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: -20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 360,
      spin: Math.random() * 10 - 5
    }));
    setParticles(p);

    let animationFrame: number;
    const update = () => {
      setParticles(prev => prev.map(pt => ({
        ...pt,
        y: pt.y + pt.speed,
        angle: pt.angle + pt.spin,
        x: pt.x + Math.sin(pt.y / 30) * 2
      })).filter(pt => pt.y < window.innerHeight));
      animationFrame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((pt, i) => (
        <div 
          key={i}
          style={{
            position: 'absolute',
            left: pt.x,
            top: pt.y,
            width: pt.size,
            height: pt.size,
            backgroundColor: pt.color,
            transform: `rotate(${pt.angle}deg)`,
            opacity: 0.8
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
