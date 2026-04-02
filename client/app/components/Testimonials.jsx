'use client';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Optimal helped us achieve ISO 9001 certification in record time. Within months of certification, we secured two major government contracts we'd been chasing for years.",
    name: 'Chukwuma Adeyemi',
    title: 'CEO, Adeyemi Construction Ltd',
    industry: 'Construction • Nigeria',
    initials: 'CA',
  },
  {
    quote: "The team at Optimal made the entire ISO 14001 process seamless. Their practical approach to documentation and implementation set us apart from the competition.",
    name: 'Fatima Al-Mansouri',
    title: 'Operations Director, Al-Mansouri Group',
    industry: 'Oil & Gas • Qatar',
    initials: 'FA',
  },
  {
    quote: "We were worried about the complexity of ISO 45001, but Optimal broke it down for us step-by-step. Our incident rates dropped by 60% within the first year.",
    name: 'Emeka Okafor',
    title: 'HSE Manager, Lagos Manufacturing Co.',
    industry: 'Manufacturing • Nigeria',
    initials: 'EO',
  },
  {
    quote: "Professional, knowledgeable and result-oriented. The internal audit they conducted saved us from failing our external certification audit. Highly recommended.",
    name: 'Dr. Nkechi Eze',
    title: 'Quality Assurance Lead, HealthBridge Hospital',
    industry: 'Healthcare • Nigeria',
    initials: 'NE',
  },
  {
    quote: "Optimal's ISO 27001 consulting transformed our data security posture. We're now compliant and our clients trust us with their sensitive data without hesitation.",
    name: 'Ahmed Hassan',
    title: 'CTO, Doha TechVentures',
    industry: 'Technology • Qatar',
    initials: 'AH',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad" style={{
      background: 'linear-gradient(160deg, var(--wine-deep), var(--wine-dark))', position: 'relative', overflow: 'hidden'
    }}>
      {/* Premium Background Elements */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.06) 1px, transparent 0)',
        backgroundSize: '40px 40px', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 60%)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', right: '-15%', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 60%)', pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem', animation: 'fadeIn 1s ease forwards' }}>
          <div className="gold-line" style={{ margin: '0 auto 1.25rem' }} />
          <div className="badge-gold" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold-light)', marginBottom: '1.25rem' }}>
            Client Success Stories
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--white)', fontWeight: 800, marginBottom: '1.25rem' }}>
            What Our Clients Say
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
            Don't just take our word for it. Discover how we've helped organisations across Nigeria and Qatar streamline operations and achieve global standards.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testim-card" style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: '2.5rem 2rem',
              border: '1px solid rgba(201,168,76,0.15)', backdropFilter: 'blur(12px)',
              position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)', transition: 'all 0.4s',
              animation: `fadeUp 0.8s ease forwards ${i * 0.15}s`
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
            >
              {/* Background Quote Icon */}
              <div style={{ position: 'absolute', top: '10%', right: '5%', color: 'rgba(201,168,76,0.06)', zIndex: 0 }}>
                <Quote size={120} fill="currentColor" />
              </div>
              
              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Stars */}
                <div style={{ color: 'var(--gold)', marginBottom: '1.5rem', display: 'flex', gap: '0.2rem' }}>
                  {[1, 2, 3, 4, 5].map((_, index) => <Star key={index} size={18} fill="currentColor" />)}
                </div>
                
                {/* Quote Text */}
                <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem', fontStyle: 'italic', flex: 1 }}>
                  "{t.quote}"
                </p>
                
                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '1.25rem' }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: 'var(--wine-deep)', fontSize: '1rem',
                    boxShadow: '0 4px 10px rgba(201,168,76,0.3)'
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ color: 'var(--white)', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{t.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{t.title}</div>
                    <div style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.02em' }}>{t.industry}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){ .testimonials-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:640px){ .testimonials-grid{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  );
}
