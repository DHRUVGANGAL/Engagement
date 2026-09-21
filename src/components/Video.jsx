import React, { useRef, useState } from 'react';
import inviteVideo from '../assets/invite-open.mp4';
import placeholderImg from '../assets/placeholder.png';
import './Video.css';

export default function Video({ onComplete, onStartTransition, isExiting: propIsExiting }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localExiting, setLocalExiting] = useState(false);
  const isExiting = propIsExiting || localExiting;

  const handleTapScreen = () => {
    if (isPlaying) return; // Once video has started, do not pause
    if (videoRef.current) {
      videoRef.current.muted = false; // Always with sound on tap
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const triggerComplete = () => {
    if (isExiting) return;
    setLocalExiting(true);
    if (videoRef.current) {
      try {
        videoRef.current.pause(); // Freeze on final frame to prevent black/rewind flash
      } catch (err) {
        console.warn('Video pause error:', err);
      }
    }
    onStartTransition?.();
    setTimeout(() => {
      onComplete?.();
    }, 850); // Velvet smooth dissolve duration
  };

  return (
    <div className={`video-intro-container ${isExiting ? 'fade-out' : ''}`}>
      {/* Light Luxury Ambient Backdrop for Laptop / Desktop */}
      <div className="ambient-backdrop" />

      {/* Main Video Viewport - Tap anywhere to play */}
      <div
        className={`video-viewport ${isPlaying ? 'is-playing' : 'awaiting-tap'}`}
        onClick={handleTapScreen}
      >
        <video
          ref={videoRef}
          src={inviteVideo}
          poster={placeholderImg}
          preload="auto"
          className="intro-video"
          playsInline
          muted={false}
          onPlaying={() => setIsPlaying(true)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={triggerComplete}
        />

        {/* Seamless Placeholder Cover Overlay until video playback begins */}
        <img
          src={placeholderImg}
          alt="Tap to open invitation"
          className={`video-placeholder-cover ${isPlaying ? 'fade-out' : ''}`}
        />

        {/* Skip Intro Button - Bottom Right with Glass background */}
        <button
          type="button"
          className="skip-intro-glass-btn"
          onClick={(e) => {
            e.stopPropagation();
            triggerComplete();
          }}
          aria-label="Skip Intro"
        >
          <span>Skip</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M5 4l10 8-10 8V4zm11 0h3v16h-3V4z" />
          </svg>
        </button>

        {/* Subtle Bottom Progress Track */}
        {isPlaying && (
          <div className="video-progress-track">
            <div
              className="video-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
