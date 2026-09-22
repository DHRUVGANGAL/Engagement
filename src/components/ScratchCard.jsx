import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './ScratchCard.css';

export default function ScratchCard({ onRevealed }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.offsetWidth || 340;
    const height = canvas.offsetHeight || 190;
    canvas.width = width;
    canvas.height = height;

    // Draw luxury gold shimmering scratch surface
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#d4af37');
    gradient.addColorStop(0.25, '#faeec7');
    gradient.addColorStop(0.5, '#c59b27');
    gradient.addColorStop(0.75, '#f4dc94');
    gradient.addColorStop(1, '#b8860b');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative sparkling pattern lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.5;
    for (let i = -width; i < width * 2; i += 24) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }

    // Centered instruction text & icons on canvas
    ctx.fillStyle = '#4a382a';
    ctx.font = '600 13px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE ✨', width / 2, height / 2 - 12);

    ctx.font = '400 11px Montserrat, sans-serif';
    ctx.fillStyle = '#6b533d';
    ctx.fillText('Scratch to reveal the Engagement Date', width / 2, height / 2 + 14);

    // Subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 3;
    ctx.strokeRect(3, 3, width - 6, height - 6);
  }, []);

  const getPosition = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkPercentScratched();
  };

  const checkPercentScratched = () => {
    if (hasRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let transparentCount = 0;
    const totalPixels = data.length / 4;

    // Sample every 8th pixel for performance
    for (let i = 3; i < data.length; i += 32) {
      if (data[i] === 0) {
        transparentCount++;
      }
    }

    const scratchedRatio = transparentCount / (totalPixels / 8);
    if (scratchedRatio > 0.38) {
      revealFull();
    }
  };

  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    // Use local canvas renderer contained strictly inside this scratch card block
    const confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: false,
    });

    const celebrationColors = [
      '#d4af37', // Regal Gold
      '#ffd700', // Metallic Gold
      '#fff4cc', // Warm Champagne
      '#ff5e7e', // Rose Pink
      '#ff8da1', // Soft Blossom Pink
      '#ffffff', // Shimmering White
    ];

    // Left cannon inside block
    confettiInstance({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0.05, y: 0.85 },
      colors: celebrationColors,
      gravity: 0.9,
      scalar: 0.95,
      ticks: 180,
    });

    // Right cannon inside block
    confettiInstance({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 0.95, y: 0.85 },
      colors: celebrationColors,
      gravity: 0.9,
      scalar: 0.95,
      ticks: 180,
    });

    // Center sparkling burst
    confettiInstance({
      particleCount: 45,
      spread: 80,
      origin: { x: 0.5, y: 0.6 },
      colors: celebrationColors,
      gravity: 0.85,
      scalar: 1.05,
      ticks: 190,
    });

    // Gentle follow-up cascade
    setTimeout(() => {
      confettiInstance({
        particleCount: 30,
        spread: 90,
        origin: { x: 0.5, y: 0.3 },
        colors: celebrationColors,
        gravity: 0.8,
        scalar: 0.85,
        ticks: 160,
      });
    }, 280);
  };

  const revealFull = () => {
    if (hasRevealedRef.current) return;
    hasRevealedRef.current = true;
    setIsRevealed(true);
    triggerConfetti();
    onRevealed?.();
  };

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e) => {
    isDrawingRef.current = true;
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  const handleTouchMove = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault(); // Prevent page scrolling during scratch
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  return (
    <div className="scratch-component-wrap">
      <div className="scratch-card-box" ref={containerRef}>
        {/* Hidden Revealed Content Underneath */}
        <div className="revealed-content">
          <div className="revealed-ring-icon">💍</div>
          <span className="revealed-sub">SAVE OUR SPECIAL DATE</span>
          <h3 className="revealed-date">16 October 2026</h3>
          <p className="revealed-day">Friday • The Auspicious Engagement</p>
          <div className="revealed-sparkles">✦ SAKSHI & IKSHIT ✦</div>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className={`scratch-canvas ${isRevealed ? 'revealed-dissolve' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {/* Confetti Celebration Canvas strictly contained inside this block */}
        <canvas
          ref={confettiCanvasRef}
          className="scratch-confetti-canvas"
          aria-hidden="true"
        />
      </div>

      {!isRevealed && (
        <button
          type="button"
          className="auto-reveal-btn"
          onClick={revealFull}
        >
          ✨ Tap to Reveal Instantly
        </button>
      )}
    </div>
  );
}
