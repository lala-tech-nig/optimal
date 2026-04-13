'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, TrendingUp, BrainCircuit, Zap, Handshake, Target, BarChart, FileText, CheckCircle, Search, Award } from 'lucide-react';

const reasons = [
  { icon: <Globe size={28} />, title: 'International Experience', desc: 'Proven track record delivering ISO certification across both Nigeria and Qatar — understanding regional compliance nuances in both markets.' },
  { icon: <TrendingUp size={28} />, title: 'Practical Implementation', desc: 'We embed ISO into how you actually work — not just documentation exercises. Your team will live and breathe the standard.' },
  { icon: <BrainCircuit size={28} />, title: 'Expert Consultants', desc: 'Our team comprises seasoned ISO professionals with deep knowledge across multiple industries and international standards.' },
  { icon: <Zap size={28} />, title: 'Faster Timeline', desc: 'Our structured methodology is optimised for speed. We help clients achieve certification up to 40% faster than industry average.' },
  { icon: <Handshake size={28} />, title: 'End-to-End Support', desc: 'From first consultation to final certification and beyond — we stay with you throughout the entire journey and beyond.' },
  { icon: <Target size={28} />, title: 'Results-Focused', desc: "We don't just inform — we sell confidence. Our clients win contracts, pass audits, and grow their business as a result." },
];

const steps = [
  { num: '01', icon: <BarChart size={32} />, title: 'Gap Analysis', desc: 'We begin with a thorough assessment of your current processes vs. ISO requirements, identifying areas needing attention.' },
  { num: '02', icon: <FileText size={32} />, title: 'Documentation Development', desc: 'Our experts develop all required policies, procedures, and quality manuals tailored to your business.' },
  { num: '03', icon: <CheckCircle size={32} />, title: 'Implementation Support', desc: 'We provide hands-on guidance to embed ISO practices across your entire organisation — not just on paper.' },
  { num: '04', icon: <Search size={32} />, title: 'Internal Audit', desc: 'A rigorous internal audit to proactively identify and close any remaining gaps before the formal certification audit.' },
  { num: '05', icon: <Award size={32} />, title: 'Certification Readiness', desc: 'Full final readiness review, preparation and accompaniment through your certification audit to guarantee success.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* About Hero with Video */}
        <section style={{
          position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', padding: '8rem 1.5rem 4rem'
        }}>
          <video autoPlay loop muted playsInline style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0
          }}>
            <source src="/mission.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(to bottom, rgba(58, 10, 31, 0.8), rgba(58, 10, 31, 0.95))', zIndex: 1
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', animation: 'fadeUp 1s ease forwards' }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--white)', fontWeight: 700, marginBottom: '1rem' }}>
              About <span style={{ color: 'var(--gold)' }}>Optimal</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', maxWidth: 700, margin: '0 auto', lineHeight: 1.8 }}>
              We are a premier management consultancy dedicated to helping organizations across Nigeria and Qatar achieve global standards of excellence.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-pad" style={{ background: 'var(--grey-light)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center' }} className="responsive-grid">
              {/* Left Content */}
              <div style={{ animation: 'fadeUp 1.2s ease forwards' }}>
                <div className="gold-line" />
                <div className="badge-gold" style={{ background: 'rgba(107,29,59,0.08)', border: '1px solid rgba(107,29,59,0.2)', color: 'var(--wine)', marginBottom: '1rem' }}>
                  Why Choose Us
                </div>
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--wine-deep)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem' }}>
                  Strategic. Practical. <span style={{ color: 'var(--gold)' }}>Proven.</span>
                </h2>
                <p style={{ color: 'var(--grey-mid)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
                  Your clients and stakeholders are asking: <em>"Can we trust their processes? Are they compliant with global standards?"</em>
                  <br /><br />
                  We have spent years ensuring our clients can answer with a resounding "Yes", backed by solid results and successful ISO certifications.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {['Pass rigorous ISO audits on first attempt', 'Win lucrative international contracts', 'Significantly reduce operational risks', 'Build unwavering brand credibility'].map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: 24, height: 24, background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, color: 'var(--wine-deep)'
                      }}>
                        <CheckCircle size={14} fill="currentColor" />
                      </div>
                      <span style={{ color: 'var(--grey-dark)', fontWeight: 600, fontSize: '1rem' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Image */}
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', animation: 'fadeIn 1.5s ease forwards' }}>
                <Image src="/about-team.png" alt="Optimal Team" width={600} height={700} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '2rem', left: '-2rem', background: 'var(--white)', padding: '1.5rem', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)' }}>
                    <Globe size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--wine-deep)', fontSize: '1.2rem' }}>Global Reach</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--grey-mid)' }}>Nigeria & Qatar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Reasons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '6rem' }} className="reasons-grid">
              {reasons.map((r, i) => (
                <div key={r.title} style={{
                  background: 'var(--white)', borderRadius: 12, padding: '2rem',
                  border: '1px solid rgba(107,29,59,0.08)', position: 'relative', overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)', transition: 'all 0.4s', animation: `fadeUp 0.8s ease forwards ${i * 0.1}s`
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(107,29,59,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(107,29,59,0.08)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)'; }}
                >
                  <div style={{ color: 'var(--gold)', marginBottom: '1.2rem', background: 'rgba(201,168,76,0.1)', width: 'fit-content', padding: '0.8rem', borderRadius: 12 }}>
                    {r.icon}
                  </div>
                  <h4 style={{ color: 'var(--wine-deep)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.8rem' }}>{r.title}</h4>
                  <p style={{ color: 'var(--grey-mid)', fontSize: '0.9rem', lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Founder */}
        <section className="section-pad">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 0.8fr) 1.2fr', gap: '4rem', alignItems: 'flex-start' }} className="responsive-grid">
              
              {/* Image & Quick Info */}
              <div style={{ animation: 'fadeIn 1s ease forwards' }}>
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', marginBottom: '1.5rem' }}>
                  <Image src="/founder.jpeg" alt="Nasiru Mohammed Basheer Owolabi" width={500} height={600} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                </div>
                <div style={{ background: 'var(--grey-light)', padding: '1.5rem', borderRadius: 12, border: '1px solid rgba(107,29,59,0.08)' }}>
                  <h4 style={{ color: 'var(--wine-deep)', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>Profile Summary</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--grey-dark)', fontSize: '0.95rem' }}>
                    <li style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}><strong>Nationality:</strong> Nigerian</li>
                    <li style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}><strong>Languages:</strong> English, Arabic, French</li>
                    <li style={{ padding: '0.6rem 0' }}><strong>Designations:</strong> CQMSAI, LEEA, MMIM, Grad-IOSH, CPCSRM</li>
                  </ul>
                </div>
              </div>

              {/* Founder Details */}
              <div style={{ animation: 'fadeUp 1.2s ease forwards' }}>
                <div className="gold-line" />
                <div className="badge-gold" style={{ marginBottom: '1rem', background: 'rgba(201,168,76,0.1)', color: 'var(--gold-dark)' }}>Meet Our Founder</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--wine-deep)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.5rem' }}>
                  Nasiru Mohammed Basheer Owolabi
                </h2>
                <h3 style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '2rem' }}>Lead Consultant & Visionary</h3>

                <p style={{ color: 'var(--grey-mid)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
                  A seasoned expert with a prolific track record in occupational health, safety, and integrated management systems, Nasiru brings decades of cross-regional experience spanning Nigeria and the Middle East. He is dedicated to embedding sustainable quality models within organizations, fostering corporate resilience, and elevating standards across global industries.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  {/* Competencies */}
                  <div>
                    <h4 style={{ color: 'var(--wine-deep)', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <BrainCircuit size={20} color="var(--gold)" /> Core Competencies
                    </h4>
                    <ul style={{ color: 'var(--grey-mid)', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.2rem', margin: 0 }}>
                      <li style={{ marginBottom: '0.5rem' }}>Certified IRCA Lead Auditor (ISO 9001, OHSAS 18001)</li>
                      <li style={{ marginBottom: '0.5rem' }}>Certified IEMA Lead Auditor (ISO 14001)</li>
                      <li style={{ marginBottom: '0.5rem' }}>Expert in Corporate Social Responsibility (MIM-CPCSRM) & Strategic Planning</li>
                      <li style={{ marginBottom: '0.5rem' }}>Specialist in Process Mapping & System Integration (PAS 99)</li>
                      <li>Certified Lifting Equipments Inspector (LEEA) & Pro Risk Assessor</li>
                    </ul>
                  </div>

                  {/* Education & Memberships */}
                  <div>
                    <h4 style={{ color: 'var(--wine-deep)', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={20} color="var(--gold)" /> Education & Memberships
                    </h4>
                    <ul style={{ color: 'var(--grey-mid)', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.2rem', margin: 0 }}>
                      <li style={{ marginBottom: '0.5rem' }}>MSc. Occupational Health & Safety Management (American Gulf University)</li>
                      <li style={{ marginBottom: '0.5rem' }}>PGD Occupational Health & Safety (Loughborough University, UK)</li>
                      <li style={{ marginBottom: '0.5rem' }}>BSc. Animal Science (University of Ibadan)</li>
                      <li style={{ marginBottom: '0.5rem' }}>Graduate Member (GradIOSH), Associate Member (ASQ)</li>
                      <li>Project Management Professional (PMI Member)</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-pad" style={{
          background: 'linear-gradient(135deg, var(--wine-deep) 0%, var(--wine-dark) 100%)', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.06) 1px, transparent 0)',
            backgroundSize: '40px 40px', pointerEvents: 'none'
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem', animation: 'fadeUp 1s ease forwards' }}>
              <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
              <div className="badge-gold" style={{ marginBottom: '1rem' }}>Implementation Methodology</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', fontWeight: 700, marginBottom: '1.5rem' }}>
                Your ISO Certification Journey
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 640, margin: '0 auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
                A clear, proven 5-step roadmap designed to take you from a readiness assessment to becoming fully ISO certified — seamlessly and confidently.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1.5rem' }} className="steps-grid">
                {steps.map((step, i) => (
                  <div key={step.num} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                    padding: '2.5rem 1.5rem', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, transition: 'all 0.4s', position: 'relative',
                    animation: `fadeUp 0.8s ease forwards ${i * 0.15}s`
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-10px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div className="step-circle" style={{ marginBottom: '1.5rem', width: 64, height: 64, fontSize: '1.4rem' }}>{step.num}</div>
                    <div style={{ color: 'var(--gold-light)', marginBottom: '1.2rem' }}>{step.icon}</div>
                    <h4 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.8rem' }}>{step.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div style={{ textAlign: 'center', marginTop: '5rem', animation: 'fadeIn 2s ease forwards' }}>
              <p style={{ color: 'var(--gold-light)', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
                Ready to start your certification journey with Optimal?
              </p>
              <Link href="/contact" className="btn-gold" style={{ textDecoration: 'none', fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                Schedule Your Assessment
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){ 
          .responsive-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
          .reasons-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; } 
        }
        @media(max-width:600px){ 
          .reasons-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; } 
        }
      `}</style>
    </>
  );
}
