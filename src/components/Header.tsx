import { useState } from 'react';

interface Props {
  active?: 'home' | 'about' | 'domains' | 'gallery' | 'team' | 'contact';
}

export default function Header({ active }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Navigation */}
      <header className="home-nav-header">
        <a href="/" className="home-nav-logo">
          <img src="/logo/club-logo.png" alt="DSC Logo" width="80" height="80" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
        </a>
        <nav className="home-nav-pill hidden md:flex">
          <a href="/" className={active === 'home' ? 'active' : ''}>Home</a>
          <a href="/about" className={active === 'about' ? 'active' : ''}>About</a>
          <a href="/#domains" className={active === 'domains' ? 'active' : ''}>Domains</a>
          <a href="/gallery" className={active === 'gallery' ? 'active' : ''}>Gallery</a>
          <a href="/team" className={active === 'team' ? 'active' : ''}>Team</a>
          <a href="/contact" className={active === 'contact' ? 'active' : ''}>Contact</a>
        </nav>
        <div className="home-nav-cta">
          <a href="#" className="home-join-btn hidden md:block">Join Us</a>
          <button className="mobile-menu-btn md:hidden" aria-label="Toggle Menu" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${menuOpen ? 'open' : ''}`} id="mobile-drawer">
        <button className="close-btn" aria-label="Close Menu" onClick={closeMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>
        <div className="mobile-menu-links">
          <a href="/" className={active === 'home' ? 'active' : ''} onClick={closeMenu}>Home</a>
          <a href="/about" className={active === 'about' ? 'active' : ''} onClick={closeMenu}>About</a>
          <a href="/#domains" className={active === 'domains' ? 'active' : ''} onClick={closeMenu}>Domains</a>
          <a href="/gallery" className={active === 'gallery' ? 'active' : ''} onClick={closeMenu}>Gallery</a>
          <a href="/team" className={active === 'team' ? 'active' : ''} onClick={closeMenu}>Team</a>
          <a href="/contact" className={active === 'contact' ? 'active' : ''} onClick={closeMenu}>Contact</a>
        </div>
      </div>
    </>
  );
}
