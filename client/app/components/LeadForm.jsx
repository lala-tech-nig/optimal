'use client';
import { useState } from 'react';
import { CheckCircle, Clock, Save, PartyPopper } from 'lucide-react';

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
    <section id="consultation" style={{
      background: 'linear-gradient(135deg, var(--wine-deep) 0%, var(--wine) 100%)',
      padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', pointerEvents: 'none'
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="form-grid">

          {/* Left — Pitch */}
          <div>
            <div className="badge-gold" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content' }}><CheckCircle size={16} /> Free ISO Readiness Assessment</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--white)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Book Your Free 30-Minute Consultation
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '2rem' }}>
              In just 30 minutes, our experts will give you a clear picture of where you stand, what's needed, and a realistic timeline to get your ISO certification — at no cost.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { text: 'Understand your current ISO readiness level' },
                { text: 'Identify the gaps holding you back' },
                { text: 'Get a clear implementation roadmap' },
                { text: 'Receive your Free ISO Readiness Checklist' },
              ].map(i => (
                <div key={i.text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold-light)', fontSize: '1rem', flexShrink: 0 }}><CheckCircle size={18} /></span>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>{i.text}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '2.5rem', padding: '1.25rem 1.5rem',
              background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: 8
            }}>
              <div style={{ color: 'var(--gold-light)', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> Limited Monthly Slots</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                We only take a limited number of new clients each month to ensure quality delivery. Secure your slot today.
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div style={{
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,168,76,0.25)', borderRadius: 16, padding: '2.5rem'
          }}>
            <h3 style={{ color: 'var(--gold-light)', fontWeight: 700, marginBottom: '1.75rem', fontSize: '1.15rem' }}>
              Start Your ISO Journey — It's Free
            </h3>

            {status === 'success' ? (
              <div style={{
                textAlign: 'center', padding: '3rem 1.5rem',
                background: 'rgba(201,168,76,0.1)', borderRadius: 10, border: '1px solid rgba(201,168,76,0.3)'
              }}>
                <div style={{ color: 'var(--gold)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}><PartyPopper size={48} /></div>
                <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.5rem' }}>Consultation Requested!</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>We'll be in touch within 24 hours to confirm your free 30-minute session.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>Full Name *</label>
                    <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>Phone *</label>
                    <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" required />
                  </div>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>Email Address *</label>
                  <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>Company Name</label>
                    <input className="form-input" name="company" value={form.company} onChange={handleChange} placeholder="Your Company" />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>Industry</label>
                    <input className="form-input" name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. Manufacturing" />
                  </div>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>Service Interested In</label>
                  <select className="form-input" name="inquiryType" value={form.inquiryType} onChange={handleChange} style={{ cursor: 'pointer' }}>
                    <option value="" style={{ background: 'var(--wine-dark)' }}>Select a service...</option>
                    {inquiryOptions.map(o => <option key={o} value={o} style={{ background: 'var(--wine-dark)' }}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>Brief Message</label>
                  <textarea className="form-input" name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about your organisation and goals..." rows={3}
                    style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-gold" disabled={status === 'loading'}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', fontSize: '1rem', padding: '1rem', marginTop: '0.5rem' }}>
                  {status === 'loading' ? 'Submitting...' : <><Save size={18} /> Book My Free Consultation</>}
                </button>
                {status === 'error' && (
                  <p style={{ color: '#ff6b6b', fontSize: '0.82rem', textAlign: 'center' }}>Something went wrong. Please try again or WhatsApp us directly.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .form-grid{grid-template-columns:1fr!important;gap:2.5rem!important} }
      `}</style>
    </section>
  );
}
