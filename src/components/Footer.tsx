import { useEffect, useRef } from 'react';

interface Props {
  active?: 'home' | 'about' | 'domains' | 'gallery' | 'team' | 'contact';
}

export default function Footer({ active }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.src = "https://framerusercontent.com/assets/hmg5dFU33RwVgzS4V0wrSxuKJ3E.mp4";
          video.play().catch((err) => console.log('Video autoplay prevented:', err));
          observer.unobserve(video);
        }
      });
    }, { rootMargin: '100px' });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="contra-footer" id="contact-footer">
      <div className="contra-content">
        <h2 className="contra-logo" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontSize: '2.5rem', letterSpacing: 'normal' }}>
          Developer Students Club
        </h2>
        <p className="contra-subtitle">SRM IST, Ramapuram</p>
        
        <div className="contra-socials">
          <a href="https://x.com/dscsrmrmp" target="_blank" rel="noopener noreferrer" aria-label="X">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a href="https://linkedin.com/company/dscsrmrmp" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="https://instagram.com/dscsrmrmp" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        <div className="contra-links">
          <a href="/" className={active === 'home' ? 'active' : ''}>Home</a>
          <a href="/about" className={active === 'about' ? 'active' : ''}>About</a>
          <a href="/#domains" className={active === 'domains' ? 'active' : ''}>Domains</a>
          <a href="/gallery" className={active === 'gallery' ? 'active' : ''}>Gallery</a>
          <a href="/team" className={active === 'team' ? 'active' : ''}>Team</a>
          <a href="/contact" className={active === 'contact' ? 'active' : ''}>Contact</a>
        </div>
      </div>

      <video ref={videoRef} className="contra-art" loop muted playsInline preload="none" />
    </footer>
  );
}
