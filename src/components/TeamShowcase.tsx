import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Member {
  name: string;
  role: string;
  domain: 'presidency' | 'technical' | 'creatives' | 'operations';
  subdomain: string;
  image: string;
  github: string;
  linkedin: string;
  email: string;
}

const MEMBERS: Member[] = [
  {
    name: 'Karthik Rajan',
    role: 'Club President',
    domain: 'presidency',
    subdomain: 'Presidency',
    image: '/team/karthik-rajan.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
  {
    name: 'Aditya Kumar',
    role: 'Technical Domain Lead',
    domain: 'technical',
    subdomain: 'Web Dev',
    image: '/team/aditya-kumar.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
  {
    name: 'Deepika Menon',
    role: 'Creatives Domain Lead',
    domain: 'creatives',
    subdomain: 'Design',
    image: '/team/deepika-menon.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
  {
    name: 'Sneha Patel',
    role: 'Operations Domain Lead',
    domain: 'operations',
    subdomain: 'Management',
    image: '/team/sneha-patel.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
  {
    name: 'Rahul Anand',
    role: 'AI / ML Lead',
    domain: 'technical',
    subdomain: 'Machine Learning',
    image: '/team/rahul-anand.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
];

export default function TeamShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'creatives' | 'operations'>('all');
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const presidentCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax card tilt on mouse move
    const cards = [...cardsRefs.current, presidentCardRef.current];
    
    cards.forEach((card) => {
      if (!card) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const tiltX = (yc - y) / 14;
        const tiltY = (x - xc) / 14;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          scale: 1.02,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [activeTab]);

  useEffect(() => {
    // Fade elements in on tab filter switch
    if (containerRef.current) {
      const targets = [
        ...(containerRef.current.querySelectorAll('.team-card-wrapper') as any)
      ];
      if (presidentCardRef.current) {
        targets.unshift(presidentCardRef.current);
      }
      gsap.fromTo(
        targets,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const president = MEMBERS.find(m => m.domain === 'presidency')!;
  
  // Filter other members (excluding president from the category list display)
  const filteredNonPresidents = activeTab === 'all'
    ? MEMBERS.filter(m => m.domain !== 'presidency')
    : MEMBERS.filter(m => m.domain === activeTab);

  // Determine if president should be shown
  const showPresident = activeTab === 'all';

  return (
    <div className="team-component-wrapper">
      {/* Category Navigation Tabs */}
      <div className="team-filter-tabs">
        {(['all', 'technical', 'creatives', 'operations'] as const).map(tab => (
          <button
            key={tab}
            className={`team-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="team-showcase-container">
        {/* Centered President Card (only on 'all') */}
        {showPresident && (
          <div className="president-row">
            <div
              ref={presidentCardRef}
              className="team-card-wrapper president-card-wrapper"
            >
              <div className="team-member-card president-member-card">
                <div className="team-image-container">
                  <img src={president.image} alt={president.name} className="team-member-image" />
                  <div className="team-image-overlay" />
                  
                  <div className="team-card-domain-badge badge-leadership">
                    PRESIDENT
                  </div>

                  <div className="team-social-overlay-row">
                    <a href={president.github} target="_blank" rel="noopener noreferrer" className="team-social-circle-btn" aria-label="GitHub">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                    <a href={president.linkedin} target="_blank" rel="noopener noreferrer" className="team-social-circle-btn" aria-label="LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a href={president.email} className="team-social-circle-btn" aria-label="Email">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="team-member-info">
                  <h3>{president.name}</h3>
                  <p className="team-member-role">{president.role}</p>
                  <div className="team-member-subdomains">
                    <span className="team-subdomain-pill">{president.subdomain}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Other Team Members */}
        <div className="team-showcase-grid">
          {filteredNonPresidents.map((m, idx) => (
            <div
              key={m.name}
              ref={(el) => { cardsRefs.current[idx] = el; }}
              className="team-card-wrapper"
            >
              {/* Card Body */}
              <div className="team-member-card">
                {/* Image Container */}
                <div className="team-image-container">
                  <img src={m.image} alt={m.name} className="team-member-image" />
                  <div className="team-image-overlay" />
                  
                  {/* Domain Tag */}
                  <div className={`team-card-domain-badge badge-${m.domain}`}>
                    {m.domain}
                  </div>

                  {/* Overlay Social Icons Row */}
                  <div className="team-social-overlay-row">
                    <a href={m.github} target="_blank" rel="noopener noreferrer" className="team-social-circle-btn" aria-label="GitHub">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="team-social-circle-btn" aria-label="LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a href={m.email} className="team-social-circle-btn" aria-label="Email">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Info Section */}
                <div className="team-member-info">
                  <h3>{m.name}</h3>
                  <p className="team-member-role">{m.role}</p>
                  <div className="team-member-subdomains">
                    <span className="team-subdomain-pill">{m.subdomain}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .team-component-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Filter Tabs */
        .team-filter-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
          background: rgba(17, 23, 20, 0.4);
          padding: 6px;
          border-radius: 12px;
          border: 1px solid rgba(232, 237, 233, 0.05);
          width: fit-content;
          backdrop-filter: blur(10px);
        }

        .team-tab-btn {
          padding: 8px 18px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-muted);
          background: transparent;
          border-radius: 8px;
          text-transform: capitalize;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-tab-btn:hover {
          color: #e8ede9;
        }

        .team-tab-btn.active {
          color: #080d0b;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Team Showcase Layouts */
        .team-showcase-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
        }

        .president-row {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 48px;
        }

        .president-card-wrapper {
          width: 32%;
          min-width: 280px;
          max-width: 360px;
        }

        @media (max-width: 640px) {
          .president-card-wrapper {
            width: 100%;
          }
        }

        /* Team Showcase Grid */
        .team-showcase-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          width: 100%;
          perspective: 1000px;
        }

        @media (max-width: 1024px) {
          .team-showcase-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 640px) {
          .team-showcase-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .team-filter-tabs {
            flex-wrap: wrap;
            max-width: 90%;
          }
        }

        .team-card-wrapper {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .team-member-card {
          background-image: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E"),
            linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
          background-color: var(--card-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
        }

        .team-member-card:hover {
          border-color: rgba(29, 209, 161, 0.35);
          box-shadow: 0 12px 40px rgba(29, 209, 161, 0.15);
        }

        .team-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.15;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
          transform: translateZ(20px);
          background-color: #0b110f;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .team-member-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) brightness(0.7) contrast(1.15);
          transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center center;
          
          /* Soft gradient mask for cutout look */
          mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12%);
          -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12%);
        }

        .team-member-card:hover .team-member-image {
          filter: grayscale(0%) brightness(0.85) contrast(1.05);
          transform: scale(1.04);
        }

        /* Domain Tag Badge */
        .team-card-domain-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          z-index: 5;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .badge-leadership { background: rgba(29, 209, 161, 0.12); border-color: rgba(29, 209, 161, 0.2); color: #1dd1a1; }
        .badge-technical { background: rgba(0, 242, 254, 0.12); border-color: rgba(0, 242, 254, 0.2); color: #00f2fe; }
        .badge-creatives { background: rgba(29, 209, 161, 0.12); border-color: rgba(29, 209, 161, 0.2); color: #1dd1a1; }
        .badge-operations { background: rgba(234, 179, 8, 0.12); border-color: rgba(234, 179, 8, 0.2); color: #eab308; }

        .team-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8, 13, 11, 0.8) 0%, rgba(8, 13, 11, 0) 40%);
          pointer-events: none;
          z-index: 1;
        }

        .team-social-overlay-row {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%) translateY(12px);
          opacity: 0;
          display: flex;
          gap: 12px;
          z-index: 10;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-member-card:hover .team-social-overlay-row {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .team-social-circle-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(17, 23, 20, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e8ede9;
          transition: border-color 0.25s, color 0.25s, background-color 0.25s, transform 0.2s;
        }

        .team-social-circle-btn:hover {
          border-color: #1dd1a1;
          color: #1dd1a1;
          background-color: rgba(29, 209, 161, 0.12);
          transform: scale(1.1);
        }

        .team-member-info {
          transform: translateZ(10px);
          text-align: left;
          padding: 0 4px;
        }

        .team-member-info h3 {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 1.2rem;
          color: var(--text-color);
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }

        .team-member-role {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 0.85rem;
          color: #1dd1a1;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }

        .team-member-subdomains {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .team-subdomain-pill {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: var(--text-muted);
          background: rgba(232, 237, 233, 0.03);
          border: 1px solid rgba(232, 237, 233, 0.06);
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}
