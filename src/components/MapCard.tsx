import { useState, useEffect, useRef } from 'react';

const BASE_FACTOR = 3886.99342512166;
const BASE_ZOOM   = 0;

function buildSrc(zoom: number) {
  const factor = BASE_FACTOR / Math.pow(2, zoom);
  return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d${factor}!2d80.1807376!3d13.0322541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719598000000!5m2!1sen!2sin`;
}

export default function MapCard() {
  const [zoom, setZoom]           = useState(BASE_ZOOM);
  const [labelVisible, setLabel]  = useState(false);
  const pinRef  = useRef<HTMLAnchorElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // GSAP-style CSS transition handled purely in CSS; use state for show/hide
  const handlePinEnter = () => setLabel(true);
  const handlePinLeave = () => setLabel(false);

  return (
    <div className="map-card">
      {/* Dark-themed iframe */}
      <iframe
        src={buildSrc(zoom)}
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter: 'invert(0.9) hue-rotate(180deg) contrast(1.2) brightness(0.9)',
          opacity: 0.85,
          width:  'calc(100% + 140px)',
          height: 'calc(100% + 140px)',
          position: 'absolute',
          top: '-70px',
          left: '-70px',
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Glassmorphic pin */}
      <a
        ref={pinRef}
        href="https://maps.app.goo.gl/xPB6jjbdLTZZtb6Z8"
        target="_blank"
        rel="noopener noreferrer"
        className="custom-theme-pinpoint"
        id="custom-map-pin"
        onMouseEnter={handlePinEnter}
        onMouseLeave={handlePinLeave}
      >
        <div className="pinpoint-pulse" />
        <div className="pinpoint-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" className="glass-pin-svg">
            <defs>
              <filter id="pinNoise" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
                <feComposite operator="in" in2="SourceGraphic" />
                <feBlend mode="overlay" in2="SourceGraphic" />
              </filter>
            </defs>
            <path
              className="pin-path"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            />
          </svg>
        </div>

        {/* Hover label */}
        <div
          ref={labelRef}
          className="pinpoint-label"
          style={{
            display: 'block',
            opacity: labelVisible ? 1 : 0,
            transform: labelVisible ? 'translateY(-4px) scale(1)' : 'translateY(4px) scale(0.95)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            pointerEvents: 'none',
          }}
        >
          <h4>SRM IST</h4>
          <p>Ramapuram Campus</p>
        </div>
      </a>

      {/* Zoom controls */}
      <div className="map-camera-controls">
        <button
          className="map-control-btn"
          title="Zoom In"
          aria-label="Zoom In"
          onClick={() => setZoom(z => z + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          className="map-control-btn"
          title="Zoom Out"
          aria-label="Zoom Out"
          onClick={() => setZoom(z => Math.max(0, z - 1))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
