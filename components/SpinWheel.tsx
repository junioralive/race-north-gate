
import React, { useState, useRef, useEffect } from 'react';
import { CAMPAIGN } from '../constants';
import ConfettiEffect from './ConfettiEffect';

interface SpinWheelProps {
  onComplete: (reward: string, coupon: string) => void;
  userEmail: string;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onComplete, userEmail }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const segments = CAMPAIGN.segments;
  const totalSegments = segments.length;
  
  const getRandomReward = () => {
    const totalWeight = segments.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;
    for (const segment of segments) {
      if (random < segment.weight) return segment;
      random -= segment.weight;
    }
    return segments[0];
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const anglePerSegment = (2 * Math.PI) / totalSegments;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    segments.forEach((seg, i) => {
      const angleStart = i * anglePerSegment;
      const angleEnd = (i + 1) * anglePerSegment;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angleStart, angleEnd);
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angleStart + anglePerSegment / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Inter';
      ctx.fillText(seg.label, radius - 20, 5);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#F58220';
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.font = 'bold 12px Inter';
    ctx.fillText('RACE', centerX, centerY + 5);
  };

  useEffect(() => {
    drawWheel();
    window.addEventListener('resize', drawWheel);
    return () => window.removeEventListener('resize', drawWheel);
  }, []);

  const spin = () => {
    if (isSpinning) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const targetReward = getRandomReward();
    const targetIdx = segments.indexOf(targetReward);
    
    setIsSpinning(true);
    setShowConfetti(false);

    const spins = 6 + Math.floor(Math.random() * 4);
    const anglePerSegment = 360 / totalSegments;
    const targetAngle = (spins * 360) + (360 - (targetIdx * anglePerSegment + anglePerSegment / 2));
    
    let currentAngle = 0;
    const startTime = performance.now();
    const duration = 4000; 

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 4); 
      currentAngle = targetAngle * easeOut(t);

      canvas.style.transform = `rotate(${currentAngle}deg)`;

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setShowConfetti(true);
        const code = `${CAMPAIGN.couponPrefix}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        
        // Removed the 300ms delay - call onComplete immediately
        onComplete(targetReward.label, code);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="relative flex flex-col items-center">
      {showConfetti && <ConfettiEffect />}
      
      <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-10">
        <div className="w-8 h-8 bg-gray-900 rotate-45 border-4 border-white shadow-lg"></div>
      </div>

      <div className="bg-white p-4 rounded-full shadow-2xl relative">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          className="rounded-full w-[320px] h-[320px] md:w-[400px] md:h-[400px] shadow-inner transition-transform"
        ></canvas>
      </div>

      <button 
        onClick={spin}
        disabled={isSpinning}
        className="mt-12 bg-gray-900 text-white px-16 py-4 rounded-full font-black text-xl hover:bg-black transition shadow-2xl active:scale-95 disabled:opacity-50"
      >
        {isSpinning ? "Spinning..." : "SPIN NOW!"}
      </button>
      
      <p className="mt-6 text-gray-500 text-xs italic">
        * Rewards are subject to verification. One spin per participant.
      </p>
    </div>
  );
};

export default SpinWheel;
