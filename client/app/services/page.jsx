'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { BarChart, FileText, Settings, Search, GraduationCap, Award, ArrowRight } from 'lucide-react';

const supportServices = [
  { title: 'ISO Certification', slug: 'iso-certification', icon: <BarChart size={24} />, desc: 'Identify exactly where your organization stands vs. ISO requirements.' },
  { title: 'Management Systems', slug: 'management-systems', icon: <FileText size={24} />, desc: 'Develop compliant policies, procedures and quality manuals.' },
  { title: 'Professional Training', slug: 'professional-training', icon: <Settings size={24} />, desc: 'Hands-on support to implement ISO-compliant systems across your operations.' },
  { title: 'Fire Safety Training', slug: 'fire-safety-training', icon: <Search size={24} />, desc: 'Rigorous audits to identify and close gaps before the certification body arrives.' },
  { title: 'Staff Training', slug: 'staff-training', icon: <GraduationCap size={24} />, desc: 'Practical training workshops to embed ISO culture in your team.' },
  { title: 'Accident and Road Safety Training', slug: 'accident-and-road-safety-training', icon: <Award size={24} />, desc: 'Full readiness check and accompaniment through the certification audit.' },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Services Hero */}
        <section style={{
          position: 'relative', minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', padding: '8rem 1.5rem 4rem'
        }}>
          <video autoPlay loop muted playsInline style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0
          }}>
            <source src="/training.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(to bottom, rgba(58, 10, 31, 0.7), rgba(58, 10, 31, 0.95))', zIndex: 1
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', animation: 'fadeUp 1s ease forwards' }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', fontWeight: 700, marginBottom: '1rem' }}>
              Our <span style={{ color: 'var(--gold-light)' }}>Services</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
              Comprehensive consulting, training, and auditing services to completely transform your organizational operations.
            </p>
          </div>
        </section>

        {/* Consulting Support Services */}
        <section className="section-pad" style={{ background: 'var(--white)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeUp 1s ease forwards' }}>
              <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: 'var(--wine-deep)', fontWeight: 700, marginBottom: '1rem' }}>
                End-to-End Consulting Solutions
              </h2>
              <p style={{ color: 'var(--grey-mid)', maxWidth: 640, margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
                We don't just hand you a manual; we roll up our sleeves and work alongside your team to implement systems that drive real improvements.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="services-grid">
              {supportServices.map((s, i) => (
                <Link href={`/services/${s.slug}`} key={s.title} style={{
                  background: 'var(--grey-light)', borderRadius: 16, padding: '2rem',
                  border: '1px solid rgba(201,168,76,0.1)', transition: 'all 0.4s',
                  display: 'flex', flexDirection: 'column', gap: '1rem', textDecoration: 'none',
                  animation: `fadeUp 0.8s ease forwards ${i * 0.1}s`, cursor: 'pointer'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{
                    width: 54, height: 54, background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
                    borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wine-deep)'
                  }}>
                    {s.icon}
                  </div>
                  <h4 style={{ color: 'var(--wine-deep)', fontWeight: 800, fontSize: '1.2rem', marginTop: '0.5rem' }}>{s.title}</h4>
                  <p style={{ color: 'var(--grey-mid)', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-dark)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', marginTop: '1rem' }}>
                    Learn More <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery/Collage Section */}
        <section style={{ padding: '6rem 0', background: 'var(--wine-deep)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="hero-grid">
              <div style={{ paddingRight: '2rem' }}>
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: 'var(--white)', fontWeight: 700, marginBottom: '1.5rem' }}>
                  Training That <span style={{ color: 'var(--gold)' }}>Transforms</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Our staff training programs cover everything from introductory ISO awareness to lead auditor training. We empower your team with the skills and knowledge to independently manage and improve your management systems.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  <Image src="/trainingphoto1.jpg" alt="Training" width={300} height={200} style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
                  <Image src="/trainingphoto2.jpg" alt="Training" width={300} height={200} style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
                </div>
                <Link href="/contact" className="btn-gold" style={{ textDecoration: 'none' }}>
                  Book Corporate Training
                </Link>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Image src="/collagesecond1.jpg" alt="Consulting" width={300} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Image src="/collage2.jpg" alt="Consulting" width={300} height={190} style={{ width: '100%', height: '50%', objectFit: 'cover', borderRadius: 16 }} />
                  <Image src="/collage3.jpg" alt="Consulting" width={300} height={190} style={{ width: '100%', height: '50%', objectFit: 'cover', borderRadius: 16 }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){ 
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
        }
        @media(max-width:600px){ 
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
