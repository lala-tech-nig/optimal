'use client';

const isoServices = [
  { code: 'ISO 9001', title: 'Quality Management', icon: '⭐', desc: 'Build a robust quality management system that drives customer satisfaction and operational excellence.' },
  { code: 'ISO 14001', title: 'Environmental Management', icon: '🌱', desc: 'Demonstrate your commitment to sustainability and environmental responsibility.' },
  { code: 'ISO 45001', title: 'Occupational Health & Safety', icon: '🦺', desc: 'Protect your workforce with internationally recognized OH&S standards.' },
  { code: 'ISO 27001', title: 'Information Security', icon: '🔒', desc: 'Safeguard sensitive information and build stakeholder trust with robust cybersecurity.' },
  { code: 'ISO 22000', title: 'Food Safety Management', icon: '🍽️', desc: 'Ensure food safety across your entire supply chain with globally recognized standards.' },
  { code: 'ISO 50001', title: 'Energy Management', icon: '⚡', desc: 'Optimize energy performance and reduce costs with systematic energy management.' },
];

const supportServices = [
  { title: 'Gap Analysis', icon: '📊', desc: 'Identify exactly where your organization stands vs. ISO requirements.' },
  { title: 'Documentation', icon: '📑', desc: 'Develop compliant policies, procedures and quality manuals.' },
  { title: 'Implementation', icon: '⚙️', desc: 'Hands-on support to implement ISO-compliant systems across your operations.' },
  { title: 'Internal Audit', icon: '🔍', desc: 'Rigorous audits to identify and close gaps before the certification body arrives.' },
  { title: 'Staff Training', icon: '🎓', desc: 'Practical training workshops to embed ISO culture in your team.' },
  { title: 'Certification Support', icon: '🏆', desc: 'Full readiness check and accompaniment through the certification audit.' },
];

export default function Services() {
  return (
    <section id="services" className="section-pad" style={{ background: 'var(--grey-light)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="gold-line" style={{ margin: '0 auto 1rem' }} />
          <div className="badge-gold" style={{ background: 'rgba(107,29,59,0.1)', border: '1px solid rgba(107,29,59,0.25)', color: 'var(--wine)', marginBottom: '1rem' }}>
            Our Services
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--wine-deep)', fontWeight: 700, marginBottom: '1rem' }}>
            ISO Certification & Consulting Services
          </h2>
          <p style={{ color: 'var(--grey-mid)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7, fontSize: '1rem' }}>
            We provide end-to-end ISO consulting services that guarantee your organisation achieves certification — practically, not theoretically.
          </p>
        </div>

        {/* ISO Standards */}
        <h3 style={{ color: 'var(--wine)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', paddingLeft: '0.25rem' }}>
          🏅 ISO Certification Consulting
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem', marginBottom: '4rem' }} className="services-grid">
          {isoServices.map(s => (
            <div key={s.code} style={{
              background: 'var(--white)', borderRadius: 12, padding: '1.75rem',
              border: '1px solid rgba(107,29,59,0.1)', transition: 'all 0.3s',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(107,29,59,0.15)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = 'rgba(107,29,59,0.1)'; }}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
              <div style={{
                display: 'inline-block', background: 'rgba(107,29,59,0.08)',
                color: 'var(--wine)', fontSize: '0.7rem', fontWeight: 700,
                padding: '0.2rem 0.7rem', borderRadius: 50, marginBottom: '0.6rem', letterSpacing: '0.05em'
              }}>{s.code}</div>
              <h4 style={{ color: 'var(--wine-deep)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{s.title}</h4>
              <p style={{ color: 'var(--grey-mid)', fontSize: '0.87rem', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Supporting Services */}
        <h3 style={{ color: 'var(--wine)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', paddingLeft: '0.25rem' }}>
          🔧 Supporting Services
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }} className="services-grid">
          {supportServices.map(s => (
            <div key={s.title} style={{
              background: 'var(--white)', borderRadius: 12, padding: '1.5rem',
              border: '1px solid rgba(201,168,76,0.2)', transition: 'all 0.3s',
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; }}
            >
              <div style={{
                fontSize: '1.5rem', width: 44, height: 44,
                background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>{s.icon}</div>
              <div>
                <h4 style={{ color: 'var(--wine-deep)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>{s.title}</h4>
                <p style={{ color: 'var(--grey-mid)', fontSize: '0.82rem', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .services-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:580px){ .services-grid{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  );
}
