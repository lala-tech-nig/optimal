'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, MessageCircle, CheckCircle, Clock, PartyPopper } from 'lucide-react';

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

export default function ContactPage() {
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
    <>
      <Navbar />
      <main style={{ background: 'var(--wine-deep)' }}>
        <section style={{ display: 'flex', minHeight: '100vh', paddingTop: '5.5rem' }} className="split-layout">
          {/* Left Side: Video & Contact Info */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <video autoPlay loop muted playsInline style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0
            }}>
              <source src="/contact.mp4" type="video/mp4" />
            </video>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(135deg, rgba(58, 10, 31, 0.85) 0%, rgba(58, 10, 31, 0.95) 100%)', zIndex: 1
            }} />

            <div style={{ position: 'relative', zIndex: 2, animation: 'fadeUp 1s ease forwards' }}>
              <div className="badge-gold" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>Get In Touch</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--white)', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.1 }}>
                Let's Discuss Your <span style={{ color: 'var(--gold)' }}>ISO Certification</span> Journey
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: 480 }}>
                Whether you need a full implementation or just an internal audit, our experts are ready to assist you in Nigeria and Qatar.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Nigeria Office */}
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ color: 'var(--gold-light)', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} /> Nigeria Office
                  </h3>
                  <a href="tel:+2348000000000" style={{ display: 'block', color: 'var(--white)', textDecoration: 'none', marginBottom: '0.5rem', fontSize: '0.9rem' }}>+234 800 000 0000</a>
                  <a href="mailto:info@optimalmc.ng" style={{ display: 'block', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>info@optimalmc.ng</a>
                </div>

                {/* Qatar Office */}
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ color: 'var(--gold-light)', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} /> Qatar Office
                  </h3>
                  <a href="tel:+97400000000" style={{ display: 'block', color: 'var(--white)', textDecoration: 'none', marginBottom: '0.5rem', fontSize: '0.9rem' }}>+974 0000 0000</a>
                  <a href="mailto:info@optimalmc.qa" style={{ display: 'block', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>info@optimalmc.qa</a>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: '#25D366', color: 'white', textDecoration: 'none', padding: '0.8rem 1.5rem',
                  borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s'
                }}>
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div style={{ flex: 1, padding: '4rem', background: 'var(--white)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ maxWidth: 500, margin: '0 auto', width: '100%', animation: 'fadeIn 1.5s ease forwards' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ color: 'var(--wine-deep)', fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Request Free Consultation</h2>
                <p style={{ color: 'var(--grey-mid)', fontSize: '0.95rem', lineHeight: 1.6 }}>Fill out the form below and an ISO expert will get back to you within 24 hours.</p>
              </div>

              {status === 'success' ? (
                <div style={{
                  textAlign: 'center', padding: '4rem 2rem', background: 'rgba(201,168,76,0.05)',
                  borderRadius: 16, border: '1px solid rgba(201,168,76,0.2)'
                }}>
                  <div style={{ color: 'var(--gold)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <PartyPopper size={60} />
                  </div>
                  <h3 style={{ color: 'var(--wine-deep)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Request Received!</h3>
                  <p style={{ color: 'var(--grey-mid)', fontSize: '0.95rem' }}>Thank you. One of our consultants will contact you shortly to schedule your free consultation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div>
                      <label style={{ color: 'var(--grey-dark)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                      <input className="form-input" style={{ background: 'var(--grey-light)', color: 'var(--wine-deep)', borderColor: 'rgba(0,0,0,0.1)' }} name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                    </div>
                    <div>
                      <label style={{ color: 'var(--grey-dark)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Phone *</label>
                      <input className="form-input" style={{ background: 'var(--grey-light)', color: 'var(--wine-deep)', borderColor: 'rgba(0,0,0,0.1)' }} name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" required />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ color: 'var(--grey-dark)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Email Address *</label>
                    <input className="form-input" type="email" style={{ background: 'var(--grey-light)', color: 'var(--wine-deep)', borderColor: 'rgba(0,0,0,0.1)' }} name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div>
                      <label style={{ color: 'var(--grey-dark)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Company Name</label>
                      <input className="form-input" style={{ background: 'var(--grey-light)', color: 'var(--wine-deep)', borderColor: 'rgba(0,0,0,0.1)' }} name="company" value={form.company} onChange={handleChange} placeholder="Your Company" />
                    </div>
                    <div>
                      <label style={{ color: 'var(--grey-dark)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Industry</label>
                      <input className="form-input" style={{ background: 'var(--grey-light)', color: 'var(--wine-deep)', borderColor: 'rgba(0,0,0,0.1)' }} name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. Manufacturing" />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ color: 'var(--grey-dark)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Service Interested In</label>
                    <select className="form-input" style={{ background: 'var(--grey-light)', color: 'var(--wine-deep)', borderColor: 'rgba(0,0,0,0.1)', cursor: 'pointer' }} name="inquiryType" value={form.inquiryType} onChange={handleChange}>
                      <option value="">Select a service...</option>
                      {inquiryOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ color: 'var(--grey-dark)', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Brief Message</label>
                    <textarea className="form-input" style={{ background: 'var(--grey-light)', color: 'var(--wine-deep)', borderColor: 'rgba(0,0,0,0.1)', resize: 'vertical' }} name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell us about your organisation and goals..." rows={4} />
                  </div>
                  
                  <button type="submit" className="btn-gold" disabled={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center', fontSize: '1.05rem', padding: '1.1rem', marginTop: '1rem', boxShadow: '0 8px 25px rgba(201,168,76,0.3)' }}>
                    {status === 'loading' ? '⏳ Submitting...' : 'Send Request'}
                  </button>
                  
                  {status === 'error' && (
                    <p style={{ color: '#e74c3c', fontSize: '0.85rem', textAlign: 'center', fontWeight: 500 }}>Something went wrong. Please try again or WhatsApp us.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){ 
          .split-layout { flex-direction: column !important; }
        }
      `}</style>
    </>
  );
}
