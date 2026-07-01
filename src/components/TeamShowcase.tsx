import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import TeamNetworkGraph from './TeamNetworkGraph';

interface Member {
  name: string;
  role: string;
  domain: 'presidency' | 'technical' | 'creatives' | 'operations';
  image: string;
  github: string;
  linkedin: string;
  email: string;
  skills?: string[];
}

const MEMBERS: Member[] = [
  {
    name: 'Karthik Rajan',
    role: 'President',
    domain: 'presidency',
    image: '/team/karthik-rajan.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
    skills: ['Presidency', 'Club Strategy', 'Public Speaking', 'Team Coordination'],
  },
  {
    name: 'Aditya Kumar',
    role: 'Technical Lead',
    domain: 'technical',
    image: '/team/aditya-kumar.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
    skills: ['Web Dev', 'React', 'Node.js', 'Astro', 'Database Architecture'],
  },
  {
    name: 'Deepika Menon',
    role: 'Creatives Lead',
    domain: 'creatives',
    image: '/team/deepika-menon.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
    skills: ['UI/UX Design', 'Figma', 'Graphic Design', 'Video Editing'],
  },
  {
    name: 'Sneha Patel',
    role: 'Operations Lead',
    domain: 'operations',
    image: '/team/sneha-patel.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
    skills: ['Event Planning', 'Public Relations', 'Marketing', 'Sponsorships'],
  },
  {
    name: 'Rahul Anand',
    role: 'Machine Learning',
    domain: 'technical',
    image: '/team/rahul-anand.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Neural Networks'],
  },
];

export default function TeamShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'creatives' | 'operations'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'graph'>('grid');

  // Selected node profile display inside Graph view
  const [selectedGraphMember, setSelectedGraphMember] = useState<Member | null>(null);

  const handleSelectMember = useCallback((member: Member | null) => {
    setSelectedGraphMember(member);
  }, []);

  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const presidentCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewMode !== 'grid') return;

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

        const tiltX = (yc - y) / 20;
        const tiltY = (x - xc) / 20;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          scale: 1.025,
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
  }, [activeTab, viewMode]);

  useEffect(() => {
    if (viewMode !== 'grid') return;

    // Staggered 3D reveal entrance animation when tab changes
    if (containerRef.current) {
      const targets = [
        ...(containerRef.current.querySelectorAll('.team-card-wrapper') as any)
      ];
      if (presidentCardRef.current) {
        targets.unshift(presidentCardRef.current);
      }
      gsap.fromTo(
        targets,
        { opacity: 0, y: 40, rotateX: -20, scale: 0.95 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.65, stagger: 0.07, ease: 'power2.out' }
      );
    }
  }, [activeTab, viewMode]);

  const president = MEMBERS.find(m => m.domain === 'presidency')!;
  
  // Filter other members (excluding president from the category list display)
  const filteredNonPresidents = activeTab === 'all'
    ? MEMBERS.filter(m => m.domain !== 'presidency')
    : MEMBERS.filter(m => m.domain === activeTab);

  // Determine if president should be shown
  const showPresident = activeTab === 'all';

  return (
    <div className="team-component-wrapper">
      {/* Toolbar view selectors */}
      <div className="team-toolbar-controls">
        <div className="view-mode-toggles">
          <button
            className={`toolbar-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid Cards View
          </button>
          <button
            className={`toolbar-view-btn ${viewMode === 'graph' ? 'active' : ''}`}
            onClick={() => {
              setViewMode('graph');
              setSelectedGraphMember(null);
            }}
          >
            Graph View
          </button>
        </div>

        {/* Display Category Filter tabs only when in Grid View */}
        {viewMode === 'grid' && (
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
        )}
      </div>

      {/* Render selected View Mode content */}
      {viewMode === 'grid' ? (
        <div ref={containerRef} className="team-showcase-container">
          {/* Centered President Card (only on 'all') */}
          {showPresident && (
            <div className="president-row">
              <div
                ref={presidentCardRef}
                className="team-card-wrapper president-card-wrapper"
              >
                {/* Dynamic domain glow spotlight behind card */}
                <div className="card-hover-glow-spotlight spotlight-presidency" />
                
                <div className="team-member-card president-member-card">
                  <div className="team-image-container">
                    <img src={president.image} alt={president.name} className="team-member-image" />
                    <div className="team-image-overlay" />

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
                {/* Brighter dynamic domain glow spotlight behind card */}
                <div className={`card-hover-glow-spotlight spotlight-${m.domain}`} />

                {/* Card Body */}
                <div className="team-member-card">
                  {/* Image Container */}
                  <div className="team-image-container">
                    <img src={m.image} alt={m.name} className="team-member-image" />
                    <div className="team-image-overlay" />

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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Render Interactive Network Canvas Graph view */
        <div className="graph-view-wrapper">
          <TeamNetworkGraph onSelectMember={handleSelectMember} />

          {/* Highlight card detail panel when clicking graph node */}
          {selectedGraphMember ? (
            <div className="graph-detail-card-panel">
              <div className="panel-card-inner">
                <button className="panel-close-btn" onClick={() => setSelectedGraphMember(null)}>×</button>
                <div className="panel-header-row">
                  <img src={selectedGraphMember.image} alt={selectedGraphMember.name} className="panel-avatar" />
                  <div>
                    <h4>{selectedGraphMember.name}</h4>
                    <p className="panel-role">{selectedGraphMember.role}</p>
                  </div>
                </div>
                <div className="panel-skills-section">
                  <h5>Core Skills</h5>
                  <div className="panel-skills-list">
                    {selectedGraphMember.skills?.map(s => (
                      <span key={s} className="panel-skill-pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="panel-actions-row">
                  <a href={selectedGraphMember.github} target="_blank" rel="noopener noreferrer" className="panel-action-icon" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                  <a href={selectedGraphMember.linkedin} target="_blank" rel="noopener noreferrer" className="panel-action-icon" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href={selectedGraphMember.email} className="panel-action-icon" aria-label="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="graph-instructions-card">
              💡 **Interactive Network Tip:** Click and drag members to fling them! Click **Domain Hubs** (Technical, Creatives, Operations) to expand/collapse their branches, and click a member node to inspect their details.
            </div>
          )}
        </div>
      )}
      
      <style>{`
        .team-component-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        /* View Mode Controls Toolbar */
        .team-toolbar-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 32px;
          gap: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 24px;
        }

        .view-mode-toggles {
          display: flex;
          background: rgba(17, 23, 20, 0.4);
          padding: 5px;
          border-radius: 10px;
          border: 1px solid rgba(232, 237, 233, 0.05);
          backdrop-filter: blur(10px);
        }

        .toolbar-view-btn {
          padding: 8px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-muted);
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .toolbar-view-btn:hover {
          color: #e8ede9;
        }

        .toolbar-view-btn.active {
          color: #080d0b;
          background: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .team-toolbar-controls {
            flex-direction: column;
            align-items: center;
          }
        }

        /* 2. Interactive Graph Layout overlays */
        .graph-view-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        .graph-instructions-card {
          background: rgba(17, 23, 20, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 12px 18px;
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.5;
        }

        .graph-detail-card-panel {
          animation: panelSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          width: 100%;
        }

        .panel-card-inner {
          background: rgba(8, 13, 11, 0.95);
          border: 1px solid rgba(29, 209, 161, 0.2);
          border-radius: 16px;
          padding: 20px;
          position: relative;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          text-align: left;
        }

        .panel-close-btn {
          position: absolute;
          top: 12px;
          right: 16px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 24px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .panel-close-btn:hover {
          color: #e8ede9;
        }

        .panel-header-row {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 12px;
        }

        .panel-avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          background-color: #0b110f;
        }

        .panel-header-row h4 {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #e8ede9;
          margin-bottom: 3px;
        }

        .panel-role {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #1dd1a1;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .panel-skills-section h5 {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 8px;
        }

        .panel-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }

        .panel-skill-pill {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 4px 10px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #e8ede9;
        }

        .panel-actions-row {
          display: flex;
          gap: 12px;
        }

        .panel-action-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e8ede9;
          transition: all 0.25s;
        }

        .panel-action-icon:hover {
          border-color: #1dd1a1;
          color: #1dd1a1;
          background: rgba(29, 209, 161, 0.08);
          transform: scale(1.06);
        }

        @keyframes panelSlideIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* 3. Grid View elements */
        .team-filter-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          background: rgba(17, 23, 20, 0.4);
          padding: 5px;
          border-radius: 10px;
          border: 1px solid rgba(232, 237, 233, 0.05);
          backdrop-filter: blur(10px);
        }

        .team-tab-btn {
          padding: 8px 18px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-muted);
          background: transparent;
          border: none;
          border-radius: 6px;
          text-transform: capitalize;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-tab-btn:hover {
          color: #e8ede9;
        }

        .team-tab-btn.active {
          color: #080d0b;
          background: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
          position: relative;
          width: 25%;
          min-width: 230px;
          max-width: 270px;
        }

        @media (max-width: 640px) {
          .president-card-wrapper {
            width: 100%;
          }
        }

        /* Team Showcase Grid */
        .team-showcase-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          width: 100%;
          perspective: 1000px;
        }

        @media (max-width: 1200px) {
          .team-showcase-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 900px) {
          .team-showcase-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 600px) {
          .team-showcase-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .team-card-wrapper {
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        /* Dynamic Domain Glow Spotlights */
        .card-hover-glow-spotlight {
          position: absolute;
          inset: -30px;
          opacity: 0;
          filter: blur(40px);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
          pointer-events: none;
          border-radius: 40px;
          transform: scale(0.85);
        }

        .team-card-wrapper:hover .card-hover-glow-spotlight,
        .president-card-wrapper:hover .card-hover-glow-spotlight {
          opacity: 1.0;
          transform: scale(1.15) translateZ(-15px);
        }

        .spotlight-presidency {
          background: radial-gradient(circle, rgba(29, 209, 161, 0.4) 0%, rgba(29, 209, 161, 0) 70%);
        }
        .spotlight-technical {
          background: radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, rgba(234, 179, 8, 0) 70%);
        }
        .spotlight-creatives {
          background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0) 70%);
        }
        .spotlight-operations {
          background: radial-gradient(circle, rgba(0, 242, 254, 0.4) 0%, rgba(0, 242, 254, 0) 70%);
        }

        /* The Member Card */
        .team-member-card {
          background-image: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E"),
            linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
          background-color: var(--card-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
          position: relative;
          z-index: 2;
        }

        .team-member-card:hover {
          border-color: rgba(29, 209, 161, 0.2);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
        }

        /* 3D Parallax layers */
        .team-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.15;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
          transform: translateZ(28px);
          transform-style: preserve-3d;
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
          transform: translateZ(5px);
          
          /* Soft gradient mask for cutout look */
          mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12%);
          -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12%);
        }

        .team-member-card:hover .team-member-image {
          filter: grayscale(0%) brightness(0.85) contrast(1.05);
          transform: scale(1.04) translateZ(10px);
        }

        .team-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8, 13, 11, 0.8) 0%, rgba(8, 13, 11, 0) 40%);
          pointer-events: none;
          z-index: 1;
          transform: translateZ(1px);
        }

        .team-social-overlay-row {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%) translateY(12px) translateZ(18px);
          opacity: 0;
          display: flex;
          gap: 10px;
          z-index: 12;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-member-card:hover .team-social-overlay-row {
          opacity: 1;
          transform: translateX(-50%) translateY(0) translateZ(35px);
        }

        .team-social-circle-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(17, 23, 20, 0.9);
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
          transform: translateZ(36px);
          transform-style: preserve-3d;
          text-align: left;
          padding: 0 4px;
        }

        .team-member-info h3 {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 1.1rem;
          color: var(--text-color);
          margin-bottom: 4px;
          letter-spacing: -0.01em;
          transform: translateZ(8px);
        }

        .team-member-role {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 0.8rem;
          color: #1dd1a1; /* Neon mint-green */
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
          transform: translateZ(14px);
        }
      `}</style>
    </div>
  );
}
