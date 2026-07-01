import { useEffect, useState } from 'react';

interface Props {
  text: string;
}

export default function Watermark({ text }: Props) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1 based on viewport center
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate 3D transformation values (reduced intensity)
  const shiftX = mouse.x * 8;    // Max horizontal shift of 8px
  const shiftY = mouse.y * 4;    // Max vertical shift of 4px
  const rotateY = mouse.x * 3;   // Max rotation of 3 degrees around Y axis
  const rotateX = -mouse.y * 3;  // Max rotation of 3 degrees around X axis

  return (
    <>
      <div
        className="contact-watermark-wrapper"
        style={{
          transform: `translate3d(${shiftX}px, ${shiftY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.1, 0.8, 0.2, 1)',
          transformStyle: 'preserve-3d',
          perspective: 800,
          willChange: 'transform',
          position: 'absolute',
          top: 'var(--watermark-offset)',
          left: 0,
          width: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* Glow Layer (Blurred backdrop) */}
        <div className="contact-watermark-glow">
          {text}
        </div>

        {/* Foreground Text Layer */}
        <div className="contact-watermark">
          {text}
        </div>
      </div>

      <style>{`
        .contact-watermark-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .contact-watermark-wrapper .contact-watermark {
          position: absolute;
          top: 0;
          left: 0;
          transform: none;
          width: 100%;
        }
        .contact-watermark-glow {
          position: absolute;
          top: 0;
          left: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: var(--watermark-size);
          line-height: 1;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-align: center;
          width: 100%;
          color: #1dd1a1;
          z-index: -1;
          mix-blend-mode: screen;
          animation: watermarkDreamyGlow 8s ease-in-out infinite;
        }
        @keyframes watermarkDreamyGlow {
          0% {
            opacity: 0.22;
            filter: blur(20px);
          }
          50% {
            opacity: 0.45;
            filter: blur(48px);
          }
          100% {
            opacity: 0.22;
            filter: blur(20px);
          }
        }
      `}</style>
    </>
  );
}
