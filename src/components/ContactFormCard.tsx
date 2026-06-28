import { useState, useCallback } from 'react';

// ─── Glassmorphic Toast ──────────────────────────────────────────────────────
interface ToastItem {
  id: number;
  title: string;
  message: string;
}

function Toast({ item, onDone }: { item: ToastItem; onDone: (id: number) => void }) {
  return (
    <div
      className="toast-message"
      style={{ animation: 'toastSlideIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both' }}
      onAnimationEnd={(e) => {
        if (e.animationName === 'toastFadeOut') onDone(item.id);
      }}
    >
      <div className="toast-content">
        <div className="toast-icon-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1dd1a1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="toast-text">
          <h4>{item.title}</h4>
          <p>{item.message}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Island ─────────────────────────────────────────────────────────────
export default function ContactFormCard() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toasts, setToasts]   = useState<ToastItem[]>([]);
  let toastId = 0;

  const showToast = useCallback((title: string, msg: string) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, title, message: msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitting(true);
    // Simulate 1.2s network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    showToast('Message sent!', 'Thank you for getting in touch. We will get back to you shortly.');
    setName('');
    setEmail('');
    setMessage('');
    setSubmitting(false);
  };

  return (
    <>
      {/* Toast Portal */}
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} item={t} onDone={(id) => setToasts(prev => prev.filter(x => x.id !== id))} />
        ))}
      </div>

      <div className="contact-form-card">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-input"
              rows={5}
              placeholder="Message"
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={submitting}>
            <span>{submitting ? 'Submitting...' : 'Submit'}</span>
            {!submitting && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </button>
        </form>
      </div>

      {/* Keyframe animations injected once via style tag */}
      <style>{`
        @keyframes toastSlideIn {
          from { transform: translateX(80px) scale(0.9); opacity: 0; }
          to   { transform: translateX(0)    scale(1);   opacity: 1; }
        }
        .toast-container {
          position: fixed;
          top: 100px;
          right: 24px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
