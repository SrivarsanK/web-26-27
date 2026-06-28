import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

type SocialType = 'email' | 'instagram' | 'linkedin' | 'twitter';

interface Props {
  type: SocialType;
  href: string;
  value: string;
  label: string;
}

const TARGET_WIDTHS: Record<SocialType, number> = {
  email:     215,
  instagram: 140,
  linkedin:  205,
  twitter:   140,
};

function Icon({ type }: { type: SocialType }) {
  if (type === 'email') return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
  if (type === 'instagram') return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
  if (type === 'linkedin') return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
  // twitter / X
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function SocialIconBtn({ type, href, value, label }: Props) {
  const btnRef  = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn  = btnRef.current;
    const text = textRef.current;
    if (!btn || !text) return;

    const targetWidth = TARGET_WIDTHS[type];

    function onEnter() {
      gsap.killTweensOf([btn, text]);
      gsap.to(btn, {
        width: targetWidth,
        borderColor: 'var(--accent-glow)',
        color: 'var(--accent-glow)',
        duration: 0.55,
        ease: 'power3.out',
      });
      gsap.fromTo(
        text,
        { opacity: 0, x: -6, display: 'inline-block' },
        { opacity: 1, x: 0, duration: 0.4, delay: 0.05, ease: 'power3.out' }
      );
    }

    function onLeave() {
      gsap.killTweensOf([btn, text]);
      gsap.to(text, {
        opacity: 0,
        x: -6,
        duration: 0.25,
        ease: 'power3.out',
        onComplete: () => { if (text) text.style.display = 'none'; },
      });
      gsap.to(btn, {
        width: 46,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        color: 'var(--text-color)',
        duration: 0.5,
        ease: 'power3.out',
      });
    }

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, [type]);

  return (
    <a
      ref={btnRef}
      href={href}
      aria-label={label}
      className="social-icon-btn"
      data-type={type}
      target={type !== 'email' ? '_blank' : undefined}
      rel={type !== 'email' ? 'noopener noreferrer' : undefined}
    >
      <span className="btn-icon-wrap">
        <Icon type={type} />
      </span>
      <span ref={textRef} className="btn-text">{value}</span>
    </a>
  );
}
