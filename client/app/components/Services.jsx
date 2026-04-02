'use client';
import { useRef } from 'react';
import { ShieldCheck, Leaf, HardHat, Lock, Coffee, Zap, BarChart, FileText, Settings, Search, GraduationCap, Award } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const isoServices = [
  { code: 'ISO 9001', title: 'Quality Management', icon: <ShieldCheck size={28} />, desc: 'Build a robust quality management system that drives customer satisfaction and operational excellence.' },
  { code: 'ISO 14001', title: 'Environmental Management', icon: <Leaf size={28} />, desc: 'Demonstrate your commitment to sustainability and environmental responsibility.' },
  { code: 'ISO 45001', title: 'Occupational Health & Safety', icon: <HardHat size={28} />, desc: 'Protect your workforce with internationally recognized OH&S standards.' },
  { code: 'ISO 27001', title: 'Information Security', icon: <Lock size={28} />, desc: 'Safeguard sensitive information and build stakeholder trust with robust cybersecurity.' },
  { code: 'ISO 22000', title: 'Food Safety Management', icon: <Coffee size={28} />, desc: 'Ensure food safety across your supply chain with globally recognized standards.' },
  { code: 'ISO 50001', title: 'Energy Management', icon: <Zap size={28} />, desc: 'Optimize energy performance and reduce costs with systematic energy management.' },
];

const supportServices = [
  { title: 'Gap Analysis', icon: <BarChart size={24} />, desc: 'Identify exactly where your organization stands vs. ISO requirements.' },
  { title: 'Documentation', icon: <FileText size={24} />, desc: 'Develop compliant policies, procedures and quality manuals.' },
  { title: 'Implementation', icon: <Settings size={24} />, desc: 'Hands-on support to implement ISO-compliant systems across your operations.' },
  { title: 'Internal Audit', icon: <Search size={24} />, desc: 'Rigorous audits to identify and close gaps before certification.' },
  { title: 'Staff Training', icon: <GraduationCap size={24} />, desc: 'Practical training workshops to embed ISO culture in your team.' },
  { title: 'Certification Support', icon: <Award size={24} />, desc: 'Full readiness check and accompaniment through the certification.' },
];

export default function Services() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Section header reveal
    gsap.from('.services-header', {
      scrollTrigger: { trigger: '.services-header', start: 'top 85%' },
      y: 50, opacity: 0, duration: 1, ease: 'power3.out'
    });

    // ISO cards stagger
    gsap.from('.iso-card', {
      scrollTrigger: { trigger: '.iso-cards-grid', start: 'top 80%' },
      y: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
    });

    // Support cards stagger from a different angle
    gsap.from('.support-card', {
      scrollTrigger: { trigger: '.support-cards-grid', start: 'top 80%' },
      x: -40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out'
    });

    // Section header parallax decorative blobs
    gsap.to('.services-blob-1', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: -80, ease: 'none'
    });
    gsap.to('.services-blob-2', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      y: -120, ease: 'none'
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="section-pad" style={{ background: 'linear-gradient(180deg, var(--white) 0%, var(--grey-light) 100%)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Parallax Background blobs */}
      <div className="services-blob-1" style={{
        position: 'absolute', top: '10%', right: '-5%', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none'
      }} />
      <div className="services-blob-2" style={{
        position: 'absolute', bottom: '10%', left: '-5%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(107,29,59,0.05) 0%, transparent 70%)', pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div className="services-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="gold-line" style={{ margin: '0 auto 1.25rem' }} />
          <div className="badge-gold" style={{ background: 'rgba(107,29,59,0.06)', border: '1px solid rgba(107,29,59,0.15)', color: 'var(--wine)', marginBottom: '1.25rem' }}>
            Our Services
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--wine-deep)', fontWeight: 800, marginBottom: '1.25rem' }}>
            ISO Certification &amp; Consulting
          </h2>
          <p style={{ color: 'var(--grey-mid)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
            We provide end-to-end consulting services that guarantee your organisation achieves certification — practically, not theoretically.
          </p>
        </div>

        {/* ISO Standards */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, color: 'var(--wine-deep)' }}>
            <Award size={20} />
          </div>
          <h3 style={{ color: 'var(--wine-deep)', fontWeight: 800, fontSize: '1.4rem' }}>
            International Standards
          </h3>
        </div>

        <div className="iso-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '5rem' }}>
          {isoServices.map((s, i) => (
            <div key={s.code} className="iso-card" style={{
              background: 'var(--white)', borderRadius: 16, padding: '2rem',
              border: '1px solid rgba(201,168,76,0.15)', transition: 'all 0.4s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(107,29,59,0.08)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; }}
            >
              <div style={{
                position: 'absolute', top: '-10%', right: '-10%', width: 100, height: 100, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.1), transparent)', pointerEvents: 'none'
              }} />
              <div style={{ color: 'var(--gold)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: 50, height: 50, background: 'rgba(201,168,76,0.1)', borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {s.icon}
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(107,29,59,0.05), rgba(107,29,59,0.1))', color: 'var(--wine)',
                  fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.8rem', borderRadius: 50, letterSpacing: '0.05em'
                }}>
                  {s.code}
                </div>
              </div>
              <h4 style={{ color: 'var(--wine-deep)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.8rem' }}>{s.title}</h4>
              <p style={{ color: 'var(--grey-mid)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{s.desc}</p>
              <Link href="/iso-programs" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-dark)', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none'
              }}>
                Learn More <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Supporting Services */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
          <div style={{ width: 40, height: 40, background: 'var(--wine-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, color: 'var(--white)' }}>
            <Settings size={20} />
          </div>
          <h3 style={{ color: 'var(--wine-deep)', fontWeight: 800, fontSize: '1.4rem' }}>
            Implementation &amp; Support
          </h3>
        </div>
        
        <div className="support-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {supportServices.map((s, i) => (
            <div key={s.title} className="support-card" style={{
              background: 'var(--white)', borderRadius: 14, padding: '1.75rem',
              border: '1px solid rgba(107,29,59,0.08)', transition: 'all 0.3s',
              display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--gold-light)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(107,29,59,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(107,29,59,0.08)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)'; }}
            >
              <div style={{
                width: 48, height: 48, background: 'linear-gradient(135deg, rgba(107,29,59,0.05), rgba(107,29,59,0.02))',
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--wine)'
              }}>
                {s.icon}
              </div>
              <div>
                <h4 style={{ color: 'var(--wine-deep)', fontWeight: 800, fontSize: '1rem', marginBottom: '0.4rem' }}>{s.title}</h4>
                <p style={{ color: 'var(--grey-mid)', fontSize: '0.85rem', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/services" className="btn-outline-gold" style={{ textDecoration: 'none' }}>
            View Full Service Catalog
          </Link>
        </div>

      </div>
      <style>{`
        @media(max-width:1024px){ .iso-cards-grid,.support-cards-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:640px){ .iso-cards-grid,.support-cards-grid{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  );
}
