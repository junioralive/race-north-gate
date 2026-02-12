
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

  const ellipsizeText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
    const ellipsis = '…';
    if (ctx.measureText(text).width <= maxWidth) return text;
    if (ctx.measureText(ellipsis).width > maxWidth) return '';

    let trimmed = text;
    while (trimmed.length > 0 && ctx.measureText(trimmed + ellipsis).width > maxWidth) {
      trimmed = trimmed.slice(0, -1);
    }
    return trimmed.length ? trimmed + ellipsis : '';
  };

  const wrapTextLines = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    maxLines: number
  ) => {
    const cleaned = (text || '').trim().replace(/\s+/g, ' ');
    if (!cleaned) return [''];

    const words = cleaned.split(' ');
    const lines: string[] = [];
    let current = '';

    const pushCurrent = () => {
      if (current) lines.push(current);
      current = '';
    };

    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth) {
        current = candidate;
        continue;
      }

      if (current) pushCurrent();

      // If a single "word" is too long, ellipsize it to fit.
      if (ctx.measureText(word).width > maxWidth) {
        lines.push(ellipsizeText(ctx, word, maxWidth));
      } else {
        current = word;
      }

      if (lines.length >= maxLines) break;
    }

    if (lines.length < maxLines && current) pushCurrent();

    // If we exceeded line limit, merge and ellipsize last line.
    if (lines.length > maxLines) lines.length = maxLines;
    if (lines.length === maxLines) {
      const usedWords = lines.join(' ').split(' ').length;
      const remainingWords = words.slice(usedWords);
      if (remainingWords.length) {
        const last = `${lines[maxLines - 1]} ${remainingWords.join(' ')}`;
        lines[maxLines - 1] = ellipsizeText(ctx, last, maxWidth);
      }
    }

    return lines;
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
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';

      const outerTextX = radius - 20;
      const innerClearRadius = 30;
      const innerPadding = 22;
      const maxTextWidth = Math.max(40, outerTextX - (innerClearRadius + innerPadding));

      let fontSize = 16;
      let lines: string[] = [];
      while (fontSize >= 11) {
        ctx.font = `bold ${fontSize}px Inter`;
        lines = wrapTextLines(ctx, seg.label, maxTextWidth, 2);
        const fits = lines.every(line => ctx.measureText(line).width <= maxTextWidth);
        if (fits) break;
        fontSize -= 1;
      }

      const lineHeight = fontSize + 3;
      const yCenter = 5;
      const startY = yCenter - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, idx) => {
        ctx.fillText(line, outerTextX, startY + idx * lineHeight);
      });
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
    const targetIdx = segments.findIndex(s => s.label === targetReward.label);
    
    setIsSpinning(true);
    setShowConfetti(false);

    const spins = 6 + Math.floor(Math.random() * 4);
    const anglePerSegment = 360 / totalSegments;
    const segmentCenterAngle = (Math.max(0, targetIdx) * anglePerSegment) + anglePerSegment / 2;
    // Pointer is visually at the top of the wheel.
    // Wheel is drawn with 0° at the right (canvas default) and increases clockwise.
    // So to land the chosen segment under the top pointer (270°), rotate by:
    // rotation = 270° - segmentCenterAngle (mod 360)
    const pointerAngle = 270;
    const baseRotation = (pointerAngle - segmentCenterAngle + 360) % 360;
    const targetAngle = (spins * 360) + baseRotation;
    
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
        const isGoodiesReward = /\bhamper(s)?\b|\bgoodies\b|\bgifts?\b/i.test(targetReward.label);
        const code = isGoodiesReward
          ? ''
          : `${CAMPAIGN.couponPrefix}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        
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

      <div
        className={`bg-white p-4 rounded-full shadow-2xl relative select-none ${
          isSpinning ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'
        }`}
        role="button"
        tabIndex={0}
        aria-disabled={isSpinning}
        onClick={() => {
          if (!isSpinning) spin();
        }}
        onKeyDown={(e) => {
          if (isSpinning) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            spin();
          }
        }}
      >
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          className="rounded-full w-[320px] h-[320px] md:w-[400px] md:h-[400px] shadow-inner transition-transform"
        ></canvas>
      </div>
      
      <p className="mt-6 text-gray-500 text-xs italic">
        * Rewards are subject to verification. One spin per participant.
      </p>
    </div>
  );
};

export default SpinWheel;
