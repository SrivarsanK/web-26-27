import { useState } from 'react';

const SCALE_FACTORS = [0.8, 0.9, 1.0, 1.2, 1.4, 1.6]; // Map to zoom indices 0 to 5
const DEFAULT_INDEX = 2; // Index of 1.0 (baseline)

export default function MapCard() {
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_INDEX);

  const handleZoomIn = () => {
    setZoomIndex(prev => Math.min(SCALE_FACTORS.length - 1, prev + 1));
  };

  const handleZoomOut = () => {
    setZoomIndex(prev => Math.max(0, prev - 1));
  };

  const scale = SCALE_FACTORS[zoomIndex];

  return (
    <div className="map-card">
      {/* Dark-themed iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.053672855942!2d80.17816267507753!3d13.032254087288711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266d11f9ca625%3A0xf77d1733be7b5b74!2sSRM%20Institute%20Of%20Science%20And%20Technology!5e0!3m2!1sen!2sin!4v1782686145388!5m2!1sen!2sin"
        title="SRM IST Ramapuram Campus Location Map"
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter: 'invert(0.9) hue-rotate(180deg) contrast(1.2) brightness(0.9)',
          opacity: 0.85,
          width:  'calc(100% + 300px)',
          height: 'calc(100% + 300px)',
          position: 'absolute',
          top: '-150px',
          left: '-150px',
          transform: `scale(${scale})`,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          transformOrigin: 'center center',
          pointerEvents: 'none', /* Prevent drag interception to let overlay link receive clicks */
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Clickable overlay link */}
      <a
        href="https://maps.app.goo.gl/7Yjs4TUaQt6CBKCk8"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5,
          cursor: 'pointer',
        }}
        aria-label="View on Google Maps"
      />

      {/* Zoom controls */}
      <div className="map-camera-controls" style={{ zIndex: 10 }}>
        <button
          className="map-control-btn"
          title="Zoom In"
          aria-label="Zoom In"
          onClick={handleZoomIn}
          disabled={zoomIndex === SCALE_FACTORS.length - 1}
          style={{ opacity: zoomIndex === SCALE_FACTORS.length - 1 ? 0.4 : 1 }}
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
          onClick={handleZoomOut}
          disabled={zoomIndex === 0}
          style={{ opacity: zoomIndex === 0 ? 0.4 : 1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
