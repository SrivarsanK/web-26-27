import { useEffect, useState } from 'react';

export default function ContactWatermark() {
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
        className="contact-watermark"
        style={{
          transform: `translateX(-50%) translate3d(${shiftX}px, ${shiftY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.1, 0.8, 0.2, 1)',
          transformStyle: 'preserve-3d',
          perspective: 800,
          willChange: 'transform',
          animation: 'watermarkDreamyGlow 8s ease-in-out infinite',
        }}
      >
        Contact
      </div>

      <style>{`
        @keyframes watermarkDreamyGlow {
          0% {
            filter: 
              drop-shadow(0 0 15px rgba(29, 209, 161, 0.55)) 
              drop-shadow(0 0 40px rgba(29, 209, 161, 0.35))
              drop-shadow(0 0 90px rgba(0, 242, 254, 0.22))
              drop-shadow(0 0 160px rgba(0, 242, 254, 0.12));
          }
          50% {
            filter: 
              drop-shadow(0 0 25px rgba(29, 209, 161, 0.85)) 
              drop-shadow(0 0 60px rgba(29, 209, 161, 0.60))
              drop-shadow(0 0 120px rgba(0, 242, 254, 0.45))
              drop-shadow(0 0 200px rgba(0, 242, 254, 0.25));
          }
          100% {
            filter: 
              drop-shadow(0 0 15px rgba(29, 209, 161, 0.55)) 
              drop-shadow(0 0 40px rgba(29, 209, 161, 0.35))
              drop-shadow(0 0 90px rgba(0, 242, 254, 0.22))
              drop-shadow(0 0 160px rgba(0, 242, 254, 0.12));
          }
        }
      `}</style>
    </>
  );
}
