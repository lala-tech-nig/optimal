'use client';
import Link from 'next/link';
import { Award, CheckCircle, GraduationCap } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
      padding: '7rem 1.5rem 4rem'
    }}>
      {/* Parallax Video Container */}
      <div className="hero-video" style={{
        position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%', zIndex: 0
      }}>
        <video
          autoPlay loop muted playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/management.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Much lighter overlay to allow video visibility */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(135deg, rgba(58, 10, 31, 0.45) 0%, rgba(30, 5, 15, 0.6) 100%)',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          {/* Left Content */}
          <div>
            <div className="badge-gold hero-badge" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content' }}>
              <Award size={16} /> ISO Certification Experts — Nigeria &amp; Qatar
            </div>
            <h1 className="font-display hero-title" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--white)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem'
            }}>
              Get ISO Certified{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>Faster, Smarter</span>{' '}
              &amp; Without Stress
            </h1>
            <p className="hero-desc" style={{
              color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem', lineHeight: 1.8,
              marginBottom: '2.5rem', maxWidth: 540, textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              We help organizations in Nigeria &amp; Qatar achieve ISO 9001, ISO 14001, ISO 45001 and more — guaranteed structured success from gap analysis to certification.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-gold hero-btn" style={{ textDecoration: 'none', fontSize: '1rem', boxShadow: '0 4px 15px rgba(201,168,76,0.3)' }}>
                Book Free Consultation
              </Link>
              <Link href="/services" className="btn-outline-gold hero-btn" style={{ textDecoration: 'none', fontSize: '1rem', backdropFilter: 'blur(5px)' }}>
                Explore Services
              </Link>
            </div>

            {/* Mini stats */}
            <div style={{ display: 'flex', gap: '3rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
              {[
                { num: '50+', label: 'Organizations Certified' },
                { num: '10+', label: 'Industries Covered' },
                { num: '2', label: 'Countries — NG & QA' },
              ].map(s => (
                <div key={s.label} className="hero-stat">
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--gold-light)', lineHeight: 1, textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>{s.num}</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', marginTop: '0.4rem', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Visual Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-card" style={{
              background: 'rgba(25, 0, 10, 0.25)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(201,168,76,0.5)', borderRadius: 20,
              padding: '2.5rem', maxWidth: 420, width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              {/* ISO Badges */}
              {/* Logo / Icons Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ color: 'var(--gold-light)', filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.3))' }}>
                  <GraduationCap size={24} />
                </div>
                <div style={{
                  width: '180px', height: '180px', borderRadius: '50%', background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.2)', border: '1px solid rgba(201,168,76,0.2)',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <img 
                    src="/logo.png" 
                    alt="Optimal Logo" 
                    style={{ maxHeight: '150%', maxWidth: '150%', objectFit: 'contain', filter: 'brightness(1)' }} 
                  />
                </div>
                <div style={{ color: 'var(--gold-light)', filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.3))' }}>
                  <Award size={24} />
                </div>
              </div>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '1.2rem' }}>ISO Certification</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Excellence & Compliance</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                {['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'ISO 22000', 'ISO 50001'].map(iso => (
                  <div key={iso} style={{
                    background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.25)',
                    borderRadius: 8, padding: '0.7rem 0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
                    color: 'var(--gold-light)', fontSize: '0.85rem', fontWeight: 600
                  }}>
                    <CheckCircle size={14} /> {iso}
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: '1.75rem', padding: '1.2rem',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.05))',
                borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', textAlign: 'center'
              }}>
                <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.95rem' }}>Nigeria & Qatar</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', marginTop: '0.3rem' }}>International Consulting Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 2
      }}>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</div>
        <div style={{
          width: 2, height: 50, borderRadius: 2,
          background: 'linear-gradient(to bottom, var(--gold), transparent)'
        }} />
      </div>

      <style>{`
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr!important;gap:3rem!important}
        }
      `}</style>
    </section>
  );
}
