'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Leaf, HardHat, Lock, Coffee, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const primaryIsos = [
  { 
    code: 'ISO 9001', 
    title: 'Quality Management Systems', 
    icon: <ShieldCheck size={28} />, 
    img: '/iso-quality.png',
    desc: 'The world\'s most recognized quality management standard. It provides a framework to consistently deliver products and services that meet customer and regulatory requirements.',
    features: ['Enhance customer satisfaction', 'Improve internal efficiency', 'Reduce waste and operational costs']
  },
  { 
    code: 'ISO 14001', 
    title: 'Environmental Management Systems', 
    icon: <Leaf size={28} />, 
    img: '/iso-environment.png',
    desc: 'Demonstrate your organization\'s commitment to environmental sustainability by managing your environmental responsibilities in a systematic manner that contributes to the environmental pillar of sustainability.',
    features: ['Reduce environmental footprint', 'Ensure regulatory compliance', 'Attract eco-conscious stakeholders']
  },
  { 
    code: 'ISO 45001', 
    title: 'Occupational Health & Safety', 
    icon: <HardHat size={28} />, 
    img: '/iso-safety.png',
    desc: 'The global standard for occupational health and safety management systems. Protect your workforce and visitors from work-related accidents and diseases through robust hazard identification.',
    features: ['Minimize workplace incidents', 'Improve employee morale', 'Demonstrate duty of care']
  }
];

const secondaryIsos = [
  { code: 'ISO 27001', title: 'Information Security', icon: <Lock size={24} />, desc: 'Safeguard sensitive information and build stakeholder trust with robust cybersecurity management.' },
  { code: 'ISO 22000', title: 'Food Safety', icon: <Coffee size={24} />, desc: 'Ensure food safety across your entire supply chain with globally recognized standards.' },
  { code: 'ISO 50001', title: 'Energy Management', icon: <Zap size={24} />, desc: 'Optimize energy performance and reduce costs with systematic energy management.' },
];

export default function IsoProgramsPage() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{
          position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', padding: '8rem 1.5rem 4rem'
        }}>
          <video autoPlay loop muted playsInline style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0
          }}>
            <source src="/iso.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(to bottom, rgba(58, 10, 31, 0.7), rgba(58, 10, 31, 0.95))', zIndex: 1
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <div className="badge-gold hero-badge" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>ISO Certifications</div>
            <h1 className="font-display hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', fontWeight: 700, marginBottom: '1rem' }}>
              International <span style={{ background: 'linear-gradient(135deg, var(--gold-light), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Standards</span>
            </h1>
            <p className="hero-desc" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: 650, margin: '0 auto', lineHeight: 1.8 }}>
              Explore our comprehensive suite of ISO certification programs designed to elevate your operational efficiency, safety, and global market positioning.
            </p>
          </div>
        </section>

        {/* Primary Standards */}
        <section className="section-pad" style={{ background: 'var(--white)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {primaryIsos.map((iso, idx) => (
              <div key={iso.code} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem', alignItems: 'center' }} className={`iso-row iso-anim-row ${idx % 2 !== 0 ? 'reverse' : ''}`}>
                <div style={{ order: idx % 2 !== 0 ? 2 : 1 }} className="img-col">
                  <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                    <Image src={iso.img} alt={iso.title} width={600} height={500} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                  </div>
                </div>
                <div style={{ order: idx % 2 !== 0 ? 1 : 2 }} className="text-col">
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'
                  }}>
                    <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine-deep)' }}>
                      {iso.icon}
                    </div>
                    <div>
                      <div className="badge-gold" style={{ padding: '0.2rem 0.8rem', fontSize: '0.7rem', marginBottom: '0.3rem' }}>{iso.code}</div>
                      <h2 className="font-display" style={{ color: 'var(--wine-deep)', fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1 }}>{iso.title}</h2>
                    </div>
                  </div>
                  <p style={{ color: 'var(--grey-mid)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                    {iso.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                    {iso.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <CheckCircle size={18} color="var(--gold)" />
                        <span style={{ color: 'var(--grey-dark)', fontWeight: 500 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="btn-gold" style={{ textDecoration: 'none' }}>
                    Start {iso.code} Certification <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary Standards Grid */}
        <section className="section-pad" style={{ background: 'var(--grey-light)' }}>
          <div className="container">
            <div className="secondary-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: 'var(--wine-deep)', fontWeight: 700, marginBottom: '1rem' }}>
                Additional Supported Standards
              </h2>
              <p style={{ color: 'var(--grey-mid)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                We hold expertise across a multitude of specialized industry frameworks to ensure your specific operational needs are met.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="secondary-grid">
              {secondaryIsos.map((s, i) => (
                <div key={s.code} className="secondary-card" style={{
                  background: 'var(--white)', borderRadius: 16, padding: '2rem',
                  border: '1px solid rgba(201,168,76,0.15)', transition: 'all 0.4s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ color: 'var(--gold-dark)', marginBottom: '1.5rem' }}>{s.icon}</div>
                  <div className="badge-gold" style={{ fontSize: '0.65rem', marginBottom: '0.5rem', background: 'rgba(201,168,76,0.05)' }}>{s.code}</div>
                  <h4 style={{ color: 'var(--wine-deep)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.8rem' }}>{s.title}</h4>
                  <p style={{ color: 'var(--grey-mid)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){ 
          .iso-row { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .img-col { order: 1 !important; }
          .iso-row > div:nth-child(2) { order: 2 !important; }
          .secondary-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media(max-width:600px){ 
          .secondary-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
