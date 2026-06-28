import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';

const BG_IMAGE_1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const SPOTLIGHT_R = 260;

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Domains', href: '/#domains' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Team', href: '/team' },
];

function RevealLayer({ image, cursorX, cursorY }: { image: string; cursorX: number; cursorY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maskUrl, setMaskUrl] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (cursorX === -999) return;

    const gradient = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    setMaskUrl(canvas.toDataURL());
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }} />
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          maskImage: maskUrl ? `url(${maskUrl})` : 'none',
          WebkitMaskImage: maskUrl ? `url(${maskUrl})` : 'none',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}
      />
    </>
  );
}

export default function Hero() {
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      if (smooth.current.x !== -999) {
        const dx = mouse.current.x - smooth.current.x;
        const dy = mouse.current.y - smooth.current.y;
        
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          smooth.current.x += dx * 0.1;
          smooth.current.y += dy * 0.1;
          setCursorPos({ x: smooth.current.x, y: smooth.current.y });
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div id="home" style={{ minHeight: '100vh', background: '#fff', letterSpacing: '-0.02em', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes dsc-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .dsc-marquee-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 40px;
          overflow: hidden;
          background: #111827;
          color: #fff;
          display: flex;
          align-items: center;
          white-space: nowrap;
          z-index: 150;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .dsc-marquee-content {
          display: flex;
          animation: dsc-marquee 45s linear infinite;
        }
        .dsc-marquee-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .dsc-marquee-star {
          color: #14a3a3;
          margin: 0 32px;
          font-size: 14px;
        }
      `}</style>

      <div className="dsc-marquee-container">
        <div className="dsc-marquee-content">
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="dsc-marquee-item">UPCOMING HACKATHON: CODEFEST 2026</div>
              <div className="dsc-marquee-star">★</div>
              <div className="dsc-marquee-item">NEW WORKSHOPS EVERY WEEK</div>
              <div className="dsc-marquee-star">★</div>
              <div className="dsc-marquee-item">JOIN THE OPEN SOURCE REVOLUTION</div>
              <div className="dsc-marquee-star">★</div>
              <div className="dsc-marquee-item">EMPOWERING STUDENT DEVELOPERS</div>
              <div className="dsc-marquee-star">★</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Absolute Header (Logo, Nav, CTA) ===== */}
      <header style={{
        position: 'absolute',
        top: '40px',
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        pointerEvents: 'none',
      }}>
        {/* Left — DSC Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none', pointerEvents: 'auto' }}>
          <img
            src="/creative-ai/club logo.png"
            alt="DSC Logo"
            style={{ height: '80px', objectFit: 'contain', transform: 'translateY(-10px)' }}
          />
        </a>

        {/* Center Nav Pill */}
        <nav style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '9999px',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          pointerEvents: 'auto',
        }} className="hidden md:flex">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: i === 0 ? '#fff' : 'rgba(255,255,255,0.8)',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                if (i !== 0) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (i !== 0) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right — Desktop CTA & Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', pointerEvents: 'auto' }}>
          <a
            href="#"
            className="hidden md:block"
            style={{
              background: '#fff',
              color: '#111827',
              fontSize: '14px',
              fontWeight: 600,
              padding: '10px 24px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
          >
            Join Us
          </a>
          <button className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '16px' }}>
            <Menu style={{ width: '24px', height: '24px', color: '#fff' }} />
          </button>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="relative w-full overflow-hidden h-screen" style={{ height: '100dvh', backgroundImage: "url('/creative-ai/1782459062237-ezremove.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Layer 1 — Base image with Ken Burns zoom */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom z-10"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Layer 2 — Cursor spotlight reveal */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* Layer 3 — Heading */}
        <div className="absolute top-[19%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <h1 style={{ color: '#fff', lineHeight: 0.95, fontWeight: 400 }}>
            <span
              className="hero-anim hero-reveal"
              style={{
                display: 'block',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '-0.05em',
                animationDelay: '0.25s',
              }}
            >
              Building the
            </span>
            <span
              className="hero-anim hero-reveal"
              style={{
                display: 'block',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '-0.08em',
                animationDelay: '0.42s',
                marginTop: '-4px',
              }}
            >
              developers of tomorrow
            </span>
          </h1>
        </div>

        {/* Layer 4 — Bottom-left paragraph */}
        <div
          className="hidden sm:block hero-anim hero-fade"
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '40px',
            maxWidth: '260px',
            zIndex: 50,
            animationDelay: '0.7s',
          }}
        >
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.625, fontFamily: "'Inter', sans-serif" }}>
            Developer Students Club at SRM IST Ramapuram — a community of passionate student developers building, innovating, and leading through technology.
          </p>
        </div>

        {/* Layer 5 — Bottom-right block + CTA */}
        <div
          className="hero-anim hero-fade"
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            maxWidth: '260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px',
            zIndex: 50,
            animationDelay: '0.85s',
          }}
        >
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.625, fontFamily: "'Inter', sans-serif" }}>
            From hands-on workshops and intense hackathons to open-source contributions and industry collaborations — bridging the gap between classroom learning and real-world development.
          </p>
        </div>
      </section>
    </div>
  );
}
