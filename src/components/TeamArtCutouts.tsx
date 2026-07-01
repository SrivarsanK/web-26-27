import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const img1 = '/i1.webp';
const img2 = '/i2.webp';
const img3 = '/i3.webp';

export default function TeamArtCutouts() {
  const cutout1Ref = useRef<HTMLDivElement>(null);
  const cutout2Ref = useRef<HTMLDivElement>(null);
  const cutout3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial static rotations and positions using GSAP
    if (cutout1Ref.current) gsap.set(cutout1Ref.current, { rotation: -8, x: 0, y: 0 });
    if (cutout2Ref.current) gsap.set(cutout2Ref.current, { rotation: 5, x: 0, y: 0 });
    if (cutout3Ref.current) gsap.set(cutout3Ref.current, { rotation: -12, x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1 based on viewport center
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      // Low-intensity subtle animations interpolated smoothly via GSAP
      if (cutout1Ref.current) {
        gsap.to(cutout1Ref.current, {
          x: x * -12,
          y: y * -8,
          duration: 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      if (cutout2Ref.current) {
        gsap.to(cutout2Ref.current, {
          x: x * 10,
          y: y * 14,
          duration: 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      if (cutout3Ref.current) {
        gsap.to(cutout3Ref.current, {
          x: x * -6,
          y: y * 8,
          duration: 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="contact-art-cutouts">
      {/* Cutout 1 (Bottom-Left peeking) */}
      <div ref={cutout1Ref} className="art-cutout-wrap cutout-1">
        <img src={img1} alt="Renaissance Art Cutout 1" className="art-cutout" />
      </div>

      {/* Cutout 2 (Right peeking) */}
      <div ref={cutout2Ref} className="art-cutout-wrap cutout-2">
        <img src={img2} alt="Renaissance Art Cutout 2" className="art-cutout" />
      </div>

      {/* Cutout 3 (Left middle peeking) */}
      <div ref={cutout3Ref} className="art-cutout-wrap cutout-3">
        <img src={img3} alt="Renaissance Art Cutout 3" className="art-cutout" />
      </div>
    </div>
  );
}
