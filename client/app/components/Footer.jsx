'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const footerLinks = {
  Services: [
    { label: 'ISO 9001 Consulting', href: '/iso-programs' },
    { label: 'ISO 14001 Consulting', href: '/iso-programs' },
    { label: 'ISO 45001 Consulting', href: '/iso-programs' },
    { label: 'Gap Analysis', href: '/services' },
    { label: 'Internal Audit Training', href: '/services' }
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ],
};

const socials = [
  { name: 'LinkedIn', icon: <Linkedin size={18} /> },
  { name: 'Twitter', icon: <Twitter size={18} /> },
  { name: 'Facebook', icon: <Facebook size={18} /> },
];

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    // Stagger footer columns
    gsap.from('.footer-col', {
      scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    });
    // Bottom bar fade in
    gsap.from('.footer-bottom', {
      scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      opacity: 0, duration: 1, delay: 0.4, ease: 'power2.out'
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} style={{ background: 'linear-gradient(180deg, var(--wine-dark) 0%, var(--wine-deep) 100%)', borderTop: '1px solid rgba(201,168,76,0.15)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background premium glow */}
      <div style={{
        position: 'absolute', top: '-20%', left: '10%', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 60%)', pointerEvents: 'none'
      }} />

      <div className="container" style={{ padding: '5rem 1.5rem 2rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', marginBottom: '4rem' }} className="footer-grid">
          {/* Brand */}
          <div className="footer-col">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
              <div style={{ padding: '0.2rem', background: 'linear-gradient(135deg, var(--gold-light), var(--gold-dark))', borderRadius: '50%' }}>
                <Image src="/logo.png" alt="Optimal Logo" width={48} height={48} style={{ borderRadius: '50%', background: 'white' }} />
              </div>
              <div>
                <div style={{ color: 'var(--white)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.02em' }}>Optimal</div>
                <div style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Management Consultancy</div>
              </div>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 380, marginBottom: '2rem' }}>
              Expert ISO Certification Consulting in Nigeria &amp; Qatar. We help organisations achieve compliance faster, smarter, and completely stress-free.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
              <a href="mailto:info@optimalmc.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}>
                <div style={{ width: 28, height: 28, background: 'rgba(201,168,76,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mail size={14} color="var(--gold)" /></div> info@optimalmc.com
              </a>
              <a href="tel:+2348000000000" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}>
                <div style={{ width: 28, height: 28, background: 'rgba(201,168,76,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={14} color="var(--gold)" /></div> +234 800 000 0000
              </a>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: 500 }}>
                <div style={{ width: 28, height: 28, background: 'rgba(201,168,76,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MapPin size={14} color="var(--gold)" /></div> Lagos, Nigeria | Doha, Qatar
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socials.map(s => (
                <a key={s.name} href="#" style={{
                  width: 42, height: 42, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.15)', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', transition: 'all 0.3s', backdropFilter: 'blur(10px)'
                }}
                  aria-label={s.name}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(201,168,76,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer-col">
              <h4 style={{ color: 'var(--gold-light)', fontWeight: 800, fontSize: '0.95rem', marginBottom: '1.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.95rem', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-light)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    ><span style={{ color: 'var(--gold)', fontSize: '1.2rem', lineHeight: 0.8 }}>›</span> {l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(201,168,76,0.12)',
          paddingTop: '2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Optimal Management Consultancy. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){ .footer-grid{grid-template-columns:1fr!important; gap: 3rem !important; } }
      `}</style>
    </footer>
  );
}
