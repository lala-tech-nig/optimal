'use client';
import { useState, useRef } from 'react';
import { CheckCircle, Clock, Save, PartyPopper, CheckSquare } from 'lucide-react';

const inquiryOptions = [
  'ISO 9001 – Quality Management',
  'ISO 14001 – Environmental',
  'ISO 45001 – Occupational Health & Safety',
  'ISO 27001 – Information Security',
  'ISO 22000 – Food Safety',
  'ISO 50001 – Energy Management',
  'Gap Analysis',
  'Internal Audit',
  'Staff Training',
  'General Consultation',
];

export default function LeadForm() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', industry: '', inquiryType: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'


  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', company: '', industry: '', inquiryType: '', message: '' });
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} id="consultation" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 1.5rem' }}>
      
      {/* Parallax Video */}
      <div className="leadform-video" style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%', zIndex: 0 }}>
        <video autoPlay loop muted playsInline style={{
          width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8
        }}>
          <source src="/management.mp4" type="video/mp4" />
        </video>
      </div>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(58, 10, 31, 0.9) 0%, rgba(107, 29, 59, 0.95) 100%)'
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50vw', height: '100%', pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(circle at center, rgba(201,168,76,0.1) 0%, transparent 70%)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="form-grid">

          {/* Left — Pitch */}
          <div className="leadform-pitch">
            <div className="badge-gold" style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content', background: 'rgba(201,168,76,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold-light)' }}>
              <CheckCircle size={16} /> Free ISO Readiness Assessment
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--white)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem' }}>
              Book Your Free 30-Minute Consultation
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1.05rem', maxWidth: 500 }}>
              In just 30 minutes, our experts will give you a clear picture of where you stand, what's needed, and a realistic timeline to get your ISO certification — at no cost.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { text: 'Understand your current ISO readiness level' },
                { text: 'Identify the exact gaps holding you back' },
                { text: 'Get a clear, custom implementation roadmap' },
                { text: 'Receive your Free ISO Readiness Checklist' },
              ].map((i, idx) => (
                <div key={idx} className="leadform-check" style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--gold)' }}>
                    <CheckSquare size={14} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.98rem', paddingTop: '0.1rem' }}>{i.text}</span>
                </div>
              ))}
            </div>
            
            <div style={{
              marginTop: '3rem', padding: '1.5rem',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: 12, backdropFilter: 'blur(10px)', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center'
            }}>
              <div style={{ width: 44, height: 44, background: 'rgba(201,168,76,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-light)' }}>
                <Clock size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ color: 'var(--gold-light)', fontWeight: 800, marginBottom: '0.25rem', fontSize: '1.05rem' }}>Limited Monthly Slots</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  We only take a limited number of new clients each month to ensure quality. Secure your slot today.
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="leadform-card" style={{
            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '3rem 2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden',
            animation: 'fadeIn 1.2s ease forwards'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))' }} />
            
            <h3 style={{ color: 'var(--white)', fontWeight: 800, marginBottom: '2rem', fontSize: '1.3rem', textAlign: 'center' }}>
              Start Your ISO Journey
            </h3>

            {status === 'success' ? (
              <div style={{
                textAlign: 'center', padding: '4rem 1.5rem',
                background: 'rgba(201,168,76,0.1)', borderRadius: 16, border: '1px dashed rgba(201,168,76,0.4)',
                animation: 'fadeUp 0.5s ease forwards'
              }}>
                <div style={{ color: 'var(--gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <PartyPopper size={64} strokeWidth={1} />
                </div>
                <div style={{ color: 'var(--gold-light)', fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.75rem' }}>Consultation Requested!</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6 }}>We've received your details. One of our lead consultants will contact you within 24 hours to confirm your session.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                    <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', height: 46 }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone *</label>
                    <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" required style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', height: 46 }} />
                  </div>
                </div>
                
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
                  <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', height: 46 }} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company Name</label>
                    <input className="form-input" name="company" value={form.company} onChange={handleChange} placeholder="Your Company" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', height: 46 }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Industry</label>
                    <input className="form-input" name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. Manufacturing" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', height: 46 }} />
                  </div>
                </div>
                
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Interested In</label>
                  <select className="form-input" name="inquiryType" value={form.inquiryType} onChange={handleChange} style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', height: 46 }}>
                    <option value="" style={{ background: 'var(--wine-dark)' }}>Select a service...</option>
                    {inquiryOptions.map(o => <option key={o} value={o} style={{ background: 'var(--wine-dark)' }}>{o}</option>)}
                  </select>
                </div>
                
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brief Message</label>
                  <textarea className="form-input" name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about your organisation and goals..." rows={4}
                    style={{ resize: 'vertical', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', paddingTop: '0.75rem' }} />
                </div>
                
                <button type="submit" className="btn-gold" disabled={status === 'loading'}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', fontSize: '1.05rem', padding: '1.25rem', marginTop: '1rem', boxShadow: '0 8px 25px rgba(201,168,76,0.3)' }}>
                  {status === 'loading' ? 'Submitting...' : <><Save size={18} /> Book My Free Consultation</>}
                </button>
                
                {status === 'error' && (
                  <p style={{ color: '#ff6b6b', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600, marginTop: '0.5rem' }}>Something went wrong. Please try again or contact us via WhatsApp.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .form-grid{grid-template-columns:1fr!important;gap:3.5rem!important} }
      `}</style>
    </section>
  );
}
