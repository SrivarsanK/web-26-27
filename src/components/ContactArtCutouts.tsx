import { useEffect, useState } from 'react';
import img1 from '../public/i1.png';
import img2 from '../public/i2.png';
import img3 from '../public/i3.png';

export default function ContactArtCutouts() {
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

  // Resolve image source dynamically supporting both string URL and ESM import object
  const getSrc = (img: any) => {
    if (typeof img === 'string') return img;
    return img?.src || '';
  };

  return (
    <div className="contact-art-cutouts">
      {/* Cutout 1: Courbet - The Desperate Man (Bottom-Left peeking) */}
      <img
        src={getSrc(img1)}
        alt="Renaissance Art Cutout 1"
        className="art-cutout cutout-1"
        style={{
          transform: `translate3d(${mouse.x * -25}px, ${mouse.y * -15}px, 0) rotate(-8deg)`,
        }}
      />
      {/* Cutout 2: Shh (Right peeking) */}
      <img
        src={getSrc(img2)}
        alt="Renaissance Art Cutout 2"
        className="art-cutout cutout-2"
        style={{
          transform: `translate3d(${mouse.x * 20}px, ${mouse.y * 30}px, 0) rotate(5deg)`,
        }}
      />
      {/* Cutout 3: Surprised (Top-Right floating) */}
      <img
        src={getSrc(img3)}
        alt="Renaissance Art Cutout 3"
        className="art-cutout cutout-3"
        style={{
          transform: `translate3d(${mouse.x * -15}px, ${mouse.y * 20}px, 0) rotate(12deg)`,
        }}
      />
    </div>
  );
}
