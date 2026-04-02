'use client';
import { Star } from 'lucide-react';

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
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.05) 1px, transparent 0)',
        backgroundSize: '36px 36px', pointerEvents: 'none'
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="gold-line" style={{ margin: '0 auto 1rem' }} />
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>Client Success Stories</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--white)', fontWeight: 700 }}>
            What Our Clients Say
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="card-glass" style={{ padding: '2rem' }}>
              {/* Stars */}
              <div style={{ color: 'var(--gold)', marginBottom: '1rem', display: 'flex', gap: '0.2rem' }}>
                {[1, 2, 3, 4, 5].map((_, index) => <Star key={index} size={16} fill="currentColor" />)}
              </div>
              {/* Quote */}
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '1rem' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, color: 'var(--wine-deep)', fontSize: '0.85rem'
                }}>{t.initials}</div>
                <div>
                  <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>{t.title}</div>
                  <div style={{ color: 'var(--gold)', fontSize: '0.7rem', marginTop: '0.15rem' }}>{t.industry}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .testimonials-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:580px){ .testimonials-grid{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  );
}
