import { useEffect, useRef, useState } from 'react';

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

interface Node {
  id: string;
  label: string;
  role: string;
  domain: 'presidency' | 'technical' | 'creatives' | 'operations';
  type: 'president' | 'lead' | 'subdomain' | 'member';
  parentId?: string;
  visible: boolean;
  expanded?: boolean;
  
  // Physics properties
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  
  // Member reference (only for president, leads, and members)
  memberRef?: Member;
}

interface Link {
  source: string;
  target: string;
  visible: boolean;
}

const MEMBERS_DATA: Member[] = [
  {
    name: 'Karthik Rajan',
    role: 'President',
    domain: 'presidency',
    image: '/team/karthik-rajan.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
  {
    name: 'Aditya Kumar',
    role: 'Technical Lead',
    domain: 'technical',
    image: '/team/aditya-kumar.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
  {
    name: 'Deepika Menon',
    role: 'Creatives Lead',
    domain: 'creatives',
    image: '/team/deepika-menon.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
  {
    name: 'Sneha Patel',
    role: 'Operations Lead',
    domain: 'operations',
    image: '/team/sneha-patel.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
  {
    name: 'Rahul Anand',
    role: 'Machine Learning',
    domain: 'technical',
    image: '/team/rahul-anand.png',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:dsc.srmrmp@gmail.com',
  },
];

interface GraphProps {
  onSelectMember: (member: Member | null) => void;
}

export default function TeamNetworkGraph({ onSelectMember }: GraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  
  // Persistent refs to preserve nodes and links state across component re-renders
  const nodesRef = useRef<Node[] | null>(null);
  const linksRef = useRef<Link[] | null>(null);

  // Pre-load images to draw on canvas
  const imagesCache = useRef<Record<string, HTMLImageElement>>({});

  useEffect(() => {
    MEMBERS_DATA.forEach(m => {
      if (m.image) {
        const img = new Image();
        img.src = m.image;
        img.onload = () => {
          imagesCache.current[m.name] = img;
        };
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = containerRef.current?.clientWidth || 800);
    let height = (canvas.height = 550);

    const colors = {
      presidency: '#1dd1a1', // Mint Green
      technical: '#eab308',   // Gold
      operations: '#00f2fe',  // Cyan
      creatives: '#c084fc',   // Purple
    };

    // Initialize nodes only once
    if (!nodesRef.current) {
      nodesRef.current = [
        // Root: President
        {
          id: 'president',
          label: 'Karthik Rajan',
          role: 'President',
          domain: 'presidency',
          type: 'president',
          visible: true,
          x: width / 2,
          y: height / 2 - 40,
          vx: 0,
          vy: 0,
          radius: 40,
          color: colors.presidency,
          memberRef: MEMBERS_DATA[0],
        },
        // Leads (Connected directly to president)
        {
          id: 'aditya',
          label: 'Aditya Kumar',
          role: 'Technical Lead',
          domain: 'technical',
          type: 'lead',
          parentId: 'president',
          visible: true,
          expanded: false,
          x: width / 2 - 180,
          y: height / 2 + 80,
          vx: 0,
          vy: 0,
          radius: 34,
          color: colors.technical,
          memberRef: MEMBERS_DATA[1],
        },
        {
          id: 'deepika',
          label: 'Deepika Menon',
          role: 'Creatives Lead',
          domain: 'creatives',
          type: 'lead',
          parentId: 'president',
          visible: true,
          expanded: false,
          x: width / 2,
          y: height / 2 - 170,
          vx: 0,
          vy: 0,
          radius: 34,
          color: colors.creatives,
          memberRef: MEMBERS_DATA[2],
        },
        {
          id: 'sneha',
          label: 'Sneha Patel',
          role: 'Operations Lead',
          domain: 'operations',
          type: 'lead',
          parentId: 'president',
          visible: true,
          expanded: false,
          x: width / 2 + 180,
          y: height / 2 + 80,
          vx: 0,
          vy: 0,
          radius: 34,
          color: colors.operations,
          memberRef: MEMBERS_DATA[3],
        },
        // Technical Subdomains (connect to aditya)
        {
          id: 'sub_ml',
          label: 'Machine Learning',
          role: 'Subdomain Hub',
          domain: 'technical',
          type: 'subdomain',
          parentId: 'aditya',
          visible: false,
          expanded: false,
          x: width / 2 - 250,
          y: height / 2 + 150,
          vx: 0,
          vy: 0,
          radius: 20,
          color: colors.technical,
        },
        {
          id: 'sub_web',
          label: 'Web Dev',
          role: 'Subdomain Hub',
          domain: 'technical',
          type: 'subdomain',
          parentId: 'aditya',
          visible: false,
          expanded: false,
          x: width / 2 - 120,
          y: height / 2 + 150,
          vx: 0,
          vy: 0,
          radius: 20,
          color: colors.technical,
        },
        {
          id: 'sub_app',
          label: 'App Dev',
          role: 'Subdomain Hub',
          domain: 'technical',
          type: 'subdomain',
          parentId: 'aditya',
          visible: false,
          expanded: false,
          x: width / 2 - 180,
          y: height / 2 + 200,
          vx: 0,
          vy: 0,
          radius: 20,
          color: colors.technical,
        },
        // Creatives Subdomains (connect to deepika)
        {
          id: 'sub_design',
          label: 'Design',
          role: 'Subdomain Hub',
          domain: 'creatives',
          type: 'subdomain',
          parentId: 'deepika',
          visible: false,
          expanded: false,
          x: width / 2 - 80,
          y: height / 2 - 230,
          vx: 0,
          vy: 0,
          radius: 20,
          color: colors.creatives,
        },
        {
          id: 'sub_content',
          label: 'Content',
          role: 'Subdomain Hub',
          domain: 'creatives',
          type: 'subdomain',
          parentId: 'deepika',
          visible: false,
          expanded: false,
          x: width / 2 + 80,
          y: height / 2 - 230,
          vx: 0,
          vy: 0,
          radius: 20,
          color: colors.creatives,
        },
        // Operations Subdomains (connect to sneha)
        {
          id: 'sub_mgmt',
          label: 'Management',
          role: 'Subdomain Hub',
          domain: 'operations',
          type: 'subdomain',
          parentId: 'sneha',
          visible: false,
          expanded: false,
          x: width / 2 + 120,
          y: height / 2 + 150,
          vx: 0,
          vy: 0,
          radius: 20,
          color: colors.operations,
        },
        {
          id: 'sub_mktg',
          label: 'Marketing',
          role: 'Subdomain Hub',
          domain: 'operations',
          type: 'subdomain',
          parentId: 'sneha',
          visible: false,
          expanded: false,
          x: width / 2 + 250,
          y: height / 2 + 150,
          vx: 0,
          vy: 0,
          radius: 20,
          color: colors.operations,
        },
        // Members (Visible only when respective Subdomain is expanded)
        {
          id: 'rahul',
          label: 'Rahul Anand',
          role: 'Machine Learning',
          domain: 'technical',
          type: 'member',
          parentId: 'sub_ml',
          visible: false,
          x: width / 2 - 320,
          y: height / 2 + 220,
          vx: 0,
          vy: 0,
          radius: 28,
          color: colors.technical,
          memberRef: MEMBERS_DATA[4],
        },
      ];
    }

    // Initialize links only once
    if (!linksRef.current) {
      linksRef.current = [
        // President to leads
        { source: 'president', target: 'aditya', visible: true },
        { source: 'president', target: 'deepika', visible: true },
        { source: 'president', target: 'sneha', visible: true },
        // Technical Lead to its subdomains
        { source: 'aditya', target: 'sub_ml', visible: false },
        { source: 'aditya', target: 'sub_web', visible: false },
        { source: 'aditya', target: 'sub_app', visible: false },
        // Creatives Lead to its subdomains
        { source: 'deepika', target: 'sub_design', visible: false },
        { source: 'deepika', target: 'sub_content', visible: false },
        // Operations Lead to its subdomains
        { source: 'sneha', target: 'sub_mgmt', visible: false },
        { source: 'sneha', target: 'sub_mktg', visible: false },
        // Subdomains to members
        { source: 'sub_ml', target: 'rahul', visible: false },
      ];
    }

    const nodes = nodesRef.current;
    const links = linksRef.current;

    let draggedNode: Node | null = null;
    let mouseOffset = { x: 0, y: 0 };
    let startDragX = 0;
    let startDragY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;

    let hoverNode: Node | null = null;
    let pulseProgress = 0;

    const resizeCanvas = () => {
      if (!containerRef.current) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = 550;
    };

    window.addEventListener('resize', resizeCanvas);

    // Expand/Collapse recursive hierarchy
    const toggleNode = (node: Node) => {
      if (node.type === 'lead') {
        const isExpanding = !node.expanded;
        node.expanded = isExpanding;

        nodes.forEach(n => {
          if (n.type === 'subdomain' && n.parentId === node.id) {
            n.visible = isExpanding;
            if (!isExpanding) {
              // Hide everything recursively
              n.expanded = false;
              nodes.forEach(m => {
                if (m.parentId === n.id) {
                  m.visible = false;
                }
              });
            } else {
              // Burst outward
              n.x = node.x + (Math.random() - 0.5) * 30;
              n.y = node.y + (Math.random() - 0.5) * 30;
              n.vx = (Math.random() - 0.5) * 6;
              n.vy = (Math.random() - 0.5) * 6;
            }
          }
        });
      } else if (node.type === 'subdomain') {
        const isExpanding = !node.expanded;
        node.expanded = isExpanding;

        nodes.forEach(n => {
          if (n.parentId === node.id) {
            n.visible = isExpanding;
            if (isExpanding) {
              n.x = node.x + (Math.random() - 0.5) * 30;
              n.y = node.y + (Math.random() - 0.5) * 30;
              n.vx = (Math.random() - 0.5) * 6;
              n.vy = (Math.random() - 0.5) * 6;
            }
          }
        });
      }

      // Sync links visibility
      links.forEach(l => {
        const srcNode = nodes.find(n => n.id === l.source);
        const tgtNode = nodes.find(n => n.id === l.target);
        if (srcNode && tgtNode) {
          l.visible = srcNode.visible && tgtNode.visible;
        }
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const clicked = nodes.find(n => {
        if (!n.visible) return false;
        const dx = mx - n.x;
        const dy = my - n.y;
        return Math.sqrt(dx * dx + dy * dy) < n.radius;
      });

      if (clicked) {
        draggedNode = clicked;
        mouseOffset = { x: clicked.x - mx, y: clicked.y - my };
        startDragX = mx;
        startDragY = my;
        prevMouseX = mx;
        prevMouseY = my;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (draggedNode) {
        draggedNode.x = mx + mouseOffset.x;
        draggedNode.y = my + mouseOffset.y;
        
        draggedNode.vx = mx - prevMouseX;
        draggedNode.vy = my - prevMouseY;
        
        prevMouseX = mx;
        prevMouseY = my;
      } else {
        const match = nodes.find(n => {
          if (!n.visible) return false;
          const dx = mx - n.x;
          const dy = my - n.y;
          return Math.sqrt(dx * dx + dy * dy) < n.radius;
        });

        if (match !== hoverNode) {
          hoverNode = match || null;
          setHoveredNode(hoverNode);
          canvas.style.cursor = match ? 'pointer' : 'default';
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (draggedNode) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        
        const dx = mx - startDragX;
        const dy = my - startDragY;
        const dragDist = Math.sqrt(dx * dx + dy * dy);

        if (dragDist < 5) {
          if (draggedNode.type === 'lead' || draggedNode.type === 'subdomain') {
            toggleNode(draggedNode);
          }
          if (draggedNode.memberRef) {
            onSelectMember(draggedNode.memberRef);
          } else {
            onSelectMember(null);
          }
        }
        draggedNode = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Spring constants (Adjusted for multi-level spacing layout)
    const restLengthMap: Record<string, number> = {
      president_lead: 120,
      lead_subdomain: 85,
      subdomain_member: 70,
    };
    const stiffness = 0.018;
    const repulsionStrength = 2200;
    const damping = 0.88;

    const updatePhysics = () => {
      const activeNodes = nodes.filter(n => n.visible);

      // Repulsion force
      for (let i = 0; i < activeNodes.length; i++) {
        const n1 = activeNodes[i];
        for (let j = i + 1; j < activeNodes.length; j++) {
          const n2 = activeNodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          const force = repulsionStrength / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (n1 !== draggedNode) { n1.vx += fx; n1.vy += fy; }
          if (n2 !== draggedNode) { n2.vx -= fx; n2.vy -= fy; }
        }
      }

      // Spring attraction force along visible links
      links.forEach(link => {
        if (!link.visible) return;
        const n1 = nodes.find(n => n.id === link.source)!;
        const n2 = nodes.find(n => n.id === link.target)!;

        // Custom resting spring length based on connection type
        let restLen = restLengthMap.lead_subdomain;
        if (n1.type === 'president' || n2.type === 'president') {
          restLen = restLengthMap.president_lead;
        } else if (n1.type === 'member' || n2.type === 'member') {
          restLen = restLengthMap.subdomain_member;
        }

        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const extension = dist - restLen;
        const force = extension * stiffness;

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (n1 !== draggedNode) { n1.vx -= fx; n1.vy -= fy; }
        if (n2 !== draggedNode) { n2.vx += fx; n2.vy += fy; }
      });

      // Gravity and bounds limits
      activeNodes.forEach(n => {
        if (n === draggedNode) return;

        const cx = width / 2;
        const cy = height / 2;
        const dx = cx - n.x;
        const dy = cy - n.y;
        
        n.vx += dx * 0.0007;
        n.vy += dy * 0.0007;

        n.vx *= damping;
        n.vy *= damping;
        n.x += n.vx;
        n.y += n.vy;

        const margin = n.radius + 15;
        if (n.x < margin) { n.x = margin; n.vx *= -0.2; }
        if (n.x > width - margin) { n.x = width - margin; n.vx *= -0.2; }
        if (n.y < margin) { n.y = margin; n.vy *= -0.2; }
        if (n.y > height - margin) { n.y = height - margin; n.vy *= -0.2; }
      });
    };

    const render = () => {
      updatePhysics();
      ctx.clearRect(0, 0, width, height);

      pulseProgress = (pulseProgress + 0.008) % 1;

      // 1. Draw Links
      links.forEach(l => {
        if (!l.visible) return;
        const n1 = nodes.find(n => n.id === l.source)!;
        const n2 = nodes.find(n => n.id === l.target)!;

        // Draw dotted lines for subdomain connection nodes
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        
        if (n2.type === 'subdomain') {
          ctx.strokeStyle = 'rgba(232, 237, 233, 0.04)';
          ctx.setLineDash([4, 4]);
        } else {
          ctx.strokeStyle = 'rgba(232, 237, 233, 0.06)';
          ctx.setLineDash([]);
        }
        ctx.lineWidth = n2.type === 'member' ? 1.5 : 2.5;
        ctx.stroke();
        ctx.setLineDash([]); // reset

        // Draw pulse signals along links
        const px = n1.x + (n2.x - n1.x) * pulseProgress;
        const py = n1.y + (n2.y - n1.y) * pulseProgress;

        ctx.beginPath();
        ctx.arc(px, py, n2.type === 'member' ? 3 : 4, 0, Math.PI * 2);
        ctx.fillStyle = n2.color;
        ctx.shadowColor = n2.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. Draw Nodes
      nodes.forEach(n => {
        if (!n.visible) return;

        ctx.save();

        const isHovered = hoverNode?.id === n.id;
        const scale = isHovered ? 1.08 : 1.0;
        const r = n.radius * scale;

        // Shadow circle glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + (n.type === 'subdomain' ? 2 : 4), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(8, 13, 11, 0.95)';
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isHovered ? 15 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer ring border outline
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = n.color;
        ctx.lineWidth = n.type === 'subdomain' ? 1.5 : 3;
        ctx.stroke();

        if (n.type === 'subdomain') {
          // Draw Subdomain Hub
          ctx.beginPath();
          ctx.arc(n.x, n.y, r - 1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(17, 23, 20, 0.9)';
          ctx.fill();

          // Subdomain abbreviation letters
          ctx.fillStyle = '#ffffff';
          ctx.font = '600 9px Inter';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          const words = n.label.split(' ');
          const abbr = words.length > 1 ? words.map(w => w[0]).join('') : words[0].substring(0, 3).toUpperCase();
          ctx.fillText(abbr, n.x, n.y);
        } else {
          // Clipped profile photo nodes
          const img = imagesCache.current[n.label];
          if (img) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, r - 1.5, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, n.x - r, n.y - r, r * 2, r * 2);
          } else {
            ctx.beginPath();
            ctx.arc(n.x, n.y, r - 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(232, 237, 233, 0.1)';
            ctx.fill();
          }
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, [onSelectMember]);

  return (
    <div ref={containerRef} className="network-graph-container">
      {/* Tooltip detail element */}
      {hoveredNode && (
        <div
          className="graph-node-tooltip"
          style={{
            position: 'absolute',
            left: `${hoveredNode.x}px`,
            top: `${hoveredNode.y - hoveredNode.radius - 40}px`,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          <div className="tooltip-inner" style={{ borderColor: hoveredNode.color }}>
            <div className="tooltip-name">{hoveredNode.label}</div>
            <div className="tooltip-role" style={{ color: hoveredNode.color }}>
              {hoveredNode.role}
              {hoveredNode.type === 'lead' && (hoveredNode.expanded ? ' (Click to Close)' : ' (Click to Open Subdomains)')}
              {hoveredNode.type === 'subdomain' && (hoveredNode.expanded ? ' (Click to Close Members)' : ' (Click to Show Members)')}
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="network-graph-canvas" />

      <style>{`
        .network-graph-container {
          position: relative;
          width: 100%;
          background: rgba(17, 23, 20, 0.45);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          margin-bottom: 40px;
          box-shadow: inset 0 4px 30px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(16px);
        }

        .network-graph-canvas {
          display: block;
          width: 100%;
          height: 550px;
          background: transparent;
        }

        /* Node Tooltips */
        .graph-node-tooltip {
          z-index: 100;
          animation: tooltipFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .tooltip-inner {
          background: rgba(8, 13, 11, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 8px 14px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          text-align: center;
          white-space: nowrap;
        }

        .tooltip-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #e8ede9;
          margin-bottom: 2px;
        }

        .tooltip-role {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @keyframes tooltipFadeIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(8px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
