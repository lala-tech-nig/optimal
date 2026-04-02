'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '/services' },
    { label: 'ISO Programs', href: '/iso-programs' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ padding: '1rem 1.5rem', background: scrolled ? 'rgba(58, 10, 31, 0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <Image src="/logo.png" alt="Optimal Logo" width={44} height={44} style={{ borderRadius: '50%', background: 'white' }} />
          <div>
            <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.1 }}>Optimal</div>
            <div style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Management Consultancy</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{
                color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem',
                transition: 'color 0.3s', letterSpacing: '0.02em'
              }}
                onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
              >{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="btn-gold" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem', borderRadius: '4px', textDecoration: 'none' }}>
              Book Free Consultation
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 4,
          padding: '0.4rem', cursor: 'pointer', display: 'none', color: 'var(--gold)'
        }} className="hamburger" aria-label="Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--wine-deep)', padding: '1.5rem', borderTop: '1px solid rgba(201,168,76,0.2)',
          position: 'absolute', top: '100%', left: 0, right: 0
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)', fontWeight: 500
            }}>{l.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn-gold"
            style={{ display: 'block', textAlign: 'center', marginTop: '1rem', textDecoration: 'none' }}>
            Book Free Consultation
          </Link>
        </div>
      )}
      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important}
          .hamburger{display:flex!important; align-items: center; justify-content: center;}
        }
      `}</style>
    </nav>
  );
}
