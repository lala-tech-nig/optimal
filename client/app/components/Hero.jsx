'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Award, CheckCircle } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'all 0.9s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
      padding: '7rem 1.5rem 4rem'
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/management.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(135deg, rgba(58, 10, 31, 0.9) 0%, rgba(107, 29, 59, 0.8) 100%)',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          {/* Left Content */}
          <div ref={ref}>
            <div className="badge-gold" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content' }}>
              <Award size={16} /> ISO Certification Experts — Nigeria &amp; Qatar
            </div>
            <h1 className="font-display" style={{
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
            <p style={{
              color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', lineHeight: 1.8,
              marginBottom: '2.5rem', maxWidth: 540
            }}>
              We help organizations in Nigeria &amp; Qatar achieve ISO 9001, ISO 14001, ISO 45001 and more — guaranteed structured success from gap analysis to certification.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-gold" style={{ textDecoration: 'none', fontSize: '1rem' }}>
                Book Free Consultation
              </Link>
              <Link href="/services" className="btn-outline-gold" style={{ textDecoration: 'none', fontSize: '1rem' }}>
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
                <div key={s.label}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--gold-light)', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '0.4rem', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Visual Card */}
          <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeUp 1.2s ease forwards' }}>
            <div style={{
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20,
              padding: '2.5rem', maxWidth: 420, width: '100%', animation: 'float 5s ease-in-out infinite',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}>
              {/* ISO Badges */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', margin: '0 auto 1.2rem',
                  background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--wine-deep)', boxShadow: '0 8px 30px rgba(201,168,76,0.4)'
                }}>
                  <Award size={40} />
                </div>
                <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '1.2rem' }}>ISO Certification</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Excellence & Compliance</div>
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
                background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
                borderRadius: 10, border: '1px solid rgba(201,168,76,0.3)', textAlign: 'center'
              }}>
                <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.95rem' }}>Nigeria & Qatar</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginTop: '0.3rem' }}>International Consulting Experience</div>
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
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</div>
        <div style={{
          width: 2, height: 50, borderRadius: 2,
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
          animation: 'float 2s ease-in-out infinite'
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
