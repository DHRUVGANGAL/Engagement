import React, { useState, useEffect } from 'react';
import mainBg from '../assets/main.jpg';
import bougainvilleaImg from '../assets/bougainvillea.png';
import ScratchCard from './ScratchCard';
import appleLogo from '../assets/apple-logo-svgrepo-com.svg';
import './WeddingHome.css';

export default function WeddingHome({ onReplayIntro }) {
  const [wishesSent, setWishesSent] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 25, hours: 14, minutes: 28, seconds: 12 });

  // Floating petals configuration
  const petals = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 5.2 + 3) % 96}%`,
    animationDelay: `${(i * 0.6) % 7}s`,
    animationDuration: `${7 + (i % 6) * 1.8}s`,
    size: 14 + (i % 4) * 4,
    drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 10),
  }));

  // Countdown timer to October 16, 2026
  useEffect(() => {
    const targetDate = new Date('2026-10-16T18:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendWish = (e) => {
    e.preventDefault();
    if (guestName.trim()) {
      setWishesSent(true);
      setTimeout(() => {
        setGuestName('');
        setGuestMessage('');
      }, 500);
    }
  };

  const scrollToItinerary = () => {
    const el = document.getElementById('itinerary-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const openGoogleCalendar = () => {
    const title = encodeURIComponent("Sakshi & Ikshit's Engagement Ceremony");
    const details = encodeURIComponent("Joyfully celebrating the auspicious engagement of Sakshi & Ikshit.");
    const location = encodeURIComponent("Kumar Mangalam Banquet Hall, Somna Road, Pahasu, Bulandshahr");
    const dates = "20261016T073000Z/20261016T113000Z";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
    setShowCalendarModal(false);
  };

  const downloadAppleCalendar = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'PRODID:-//Sakshi and Ikshit//Engagement//EN',
      'BEGIN:VEVENT',
      'UID:sakshi-ikshit-engagement-20261016@engagement.invite',
      'DTSTAMP:20260921T120000Z',
      'DTSTART:20261016T073000Z',
      'DTEND:20261016T113000Z',
      'SUMMARY:Sakshi & Ikshit Engagement Ceremony',
      'DESCRIPTION:Joyfully celebrating the auspicious engagement of Sakshi & Ikshit.',
      'LOCATION:Kumar Mangalam Banquet Hall, Somna Road, Pahasu, Bulandshahr',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Sakshi-Ikshit-Engagement.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarModal(false);
  };

  return (
    <div className="wedding-page">
      {/* SECTION 1: NAMING & INVITATION HERO */}
      <section
        className="section-naming"
        style={{ backgroundImage: `url(${mainBg})` }}
      >
        {/* Soft overlay for readability while keeping main.jpg vibrant */}
        <div className="naming-overlay" />

        {/* Bougainvillea Flower Decoration: Top-Left */}
        <img
          src={bougainvilleaImg}
          alt="Bougainvillea decoration"
          className="bougainvillea-corner bougainvillea-top-left"
        />

        {/* Bougainvillea Flower Decoration: Bottom-Right */}
        <img
          src={bougainvilleaImg}
          alt="Bougainvillea decoration"
          className="bougainvillea-corner bougainvillea-bottom-right"
        />

        {/* Floating Pink Flower Petals */}
        <div className="petals-container" aria-hidden="true">
          {petals.map((p) => (
            <div
              key={p.id}
              className="falling-petal"
              style={{
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size * 1.3}px`,
                animationDelay: p.animationDelay,
                animationDuration: p.animationDuration,
                '--drift': `${p.drift}px`,
              }}
            />
          ))}
        </div>

        {/* Section 1 Content */}
        <div className="naming-content">
          <p className="blessing-shloka">|| ॐ श्री शिवाय नमस्तुभ्यं ||</p>
          <div className="logo-centerpiece">
            <img src="/logo.png" alt="Sakshi & Ikshit Monogram" className="main-couple-logo" />
          </div>

          <p className="lead-families">TOGETHER WITH OUR FAMILIES</p>
          <h1 className="main-couple-names">Sakshi & Ikshit</h1>
          <p className="invite-desc">
            JOYFULLY INVITE YOU TO CELEBRATE THEIR ENGAGEMENT
          </p>

          {/* Down arrow at the bottom of the content (No text) */}
          <div
            className="bottom-scroll-arrow"
            onClick={scrollToItinerary}
            role="button"
            tabIndex={0}
            aria-label="Scroll to Itinerary"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION 2: SCRATCH CARD & THE WAITING COUNTDOWN */}
      <section className="section-waiting-scratch" id="itinerary-section">
        <div className="waiting-container">
          <p className="waiting-tag">THE WAITING</p>
          <h2 className="waiting-heading">Until the gates open</h2>

          {/* 4 Counter squircle cards matching the provided image */}
          <div className="waiting-counter-grid">
            <div className="counter-card-item">
              <span className="counter-number">{timeLeft.days}</span>
              <span className="counter-unit">DAYS</span>
            </div>
            <div className="counter-card-item">
              <span className="counter-number">{timeLeft.hours}</span>
              <span className="counter-unit">HOURS</span>
            </div>
            <div className="counter-card-item">
              <span className="counter-number">{timeLeft.minutes}</span>
              <span className="counter-unit">MINUTES</span>
            </div>
            <div className="counter-card-item">
              <span className="counter-number">{timeLeft.seconds}</span>
              <span className="counter-unit">SECONDS</span>
            </div>
          </div>

          {/* Interactive Scratch Card to reveal 16 Oct 2026 */}
          <ScratchCard />
        </div>
      </section>

      {/* SECTION 3: VENUE & CELEBRATION DETAILS (MATCHING CHAPTER TWO REFERENCE) */}
      <section className="section-venue-chapter">
        <div className="chapter-venue-container">
          <p className="chapter-tag">CHAPTER TWO</p>
          <h2 className="chapter-heading">Where the story gathers</h2>

          {/* Delicate Vintage Floral Flourish */}
          <div className="vintage-floral-flourish">
            <span className="flourish-stem">❦ ──────</span>
            <span className="flourish-bloom">🪷</span>
            <span className="flourish-stem">────── ❦</span>
          </div>

          {/* 4 Detail Cards in 2x2 Layout */}
          <div className="chapter-cards-grid">
            {/* 1. THE DAY */}
            <div className="chapter-card">
              <div className="chapter-card-header">
                <span className="chapter-card-icon">✦</span>
                <span className="chapter-card-label">THE DAY</span>
              </div>
              <p className="chapter-card-text">Friday, 16 October 2026</p>
            </div>

            {/* 2. THE HOUR */}
            <div className="chapter-card">
              <div className="chapter-card-header">
                <span className="chapter-card-icon">🕒</span>
                <span className="chapter-card-label">THE HOUR</span>
              </div>
              <p className="chapter-card-text">1:00 in the afternoon</p>
            </div>

            {/* 3. THE PLACE */}
            <div className="chapter-card">
              <div className="chapter-card-header">
                <span className="chapter-card-icon">📍</span>
                <span className="chapter-card-label">THE PLACE</span>
              </div>
              <p className="chapter-card-text">
                Kumar Mangalam Banquet Hall • Somna Road, Pahasu, Bulandshahr
              </p>
            </div>

            {/* 4. DRESS CODE */}
            <div className="chapter-card">
              <div className="chapter-card-header">
                <span className="chapter-card-icon">🥻</span>
                <span className="chapter-card-label">DRESS CODE</span>
              </div>
              <p className="chapter-card-text">Festive Indian — pastels, ivory & gold</p>
            </div>
          </div>

          {/* Action Buttons: Add to Calendar & Get Directions */}
          <div className="chapter-actions-wrap">
            <button
              type="button"
              className="add-calendar-btn"
              onClick={() => setShowCalendarModal(true)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
              </svg>
              <span>Add to Calendar</span>
            </button>

            <button
              type="button"
              className="get-directions-btn"
              onClick={() =>
                window.open(
                  'https://www.google.com/maps/search/?api=1&query=Kumar+Mangalam+Banquet+Hall+Somna+Road+Pahasu+Bulandshahr',
                  '_blank'
                )
              }
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              <span>Get Directions</span>
            </button>
          </div>
        </div>

        {/* Calendar Selection Modal / Sheet */}
        {showCalendarModal && (
          <div className="calendar-modal-backdrop" onClick={() => setShowCalendarModal(false)}>
            <div className="calendar-modal-card" onClick={(e) => e.stopPropagation()}>
              <h3 className="calendar-modal-title">Add to Calendar</h3>
              <p className="calendar-modal-sub">Choose your preferred calendar service</p>

              <div className="calendar-modal-options">
                <button
                  type="button"
                  className="calendar-option-btn google"
                  onClick={openGoogleCalendar}
                >
                  <span className="cal-opt-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </span>
                  <div className="cal-opt-text">
                    <strong>Google Calendar</strong>
                    <span>for Android & Browser</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="calendar-option-btn apple"
                  onClick={downloadAppleCalendar}
                >
                  <span className="cal-opt-icon">
                    <img src={appleLogo} alt="Apple Calendar" width="22" height="22" className="cal-svg-icon" />
                  </span>
                  <div className="cal-opt-text">
                    <strong>Apple Calendar</strong>
                    <span>for iPhone, iPad & Mac</span>
                  </div>
                </button>
              </div>

              <button
                type="button"
                className="calendar-modal-close"
                onClick={() => setShowCalendarModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Footer */}
        <footer className="wedding-footer">
          <img src="/logo.png" alt="Sakshi & Ikshit" className="footer-logo" />
          <p className="footer-text">With Best Compliments from</p>
          <p className="footer-family">The Gangal & Extended Families</p>
          <p className="footer-copyright">#SakshiWedsIkshit</p>
          <p className="footer-signature">Made with ❤️ by Dhruv Gangal</p>
        </footer>
      </section>
    </div>
  );
}
