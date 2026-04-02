'use client';
import Link from 'next/link';
import Image from 'next/image';

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

export default function Footer() {
  return (
    <footer style={{ background: 'var(--wine-deep)', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="container" style={{ padding: '4rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', textDecoration: 'none' }}>
              <Image src="/logo.png" alt="Optimal Logo" width={44} height={44} style={{ borderRadius: '50%', background: 'white' }} />
              <div>
                <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.05rem' }}>Optimal</div>
                <div style={{ color: 'var(--gold)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Management Consultancy</div>
              </div>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.87rem', lineHeight: 1.75, maxWidth: 300, marginBottom: '1.5rem' }}>
              Expert ISO Certification Consulting in Nigeria & Qatar. We help organisations achieve compliance faster, smarter, and stress-free.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['LinkedIn', 'Twitter', 'Facebook'].map(s => (
                <a key={s} href="#" style={{
                  width: 36, height: 36, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(201,168,76,0.2)', borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.3s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >{s[0]}</a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.2rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-light)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                    >{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(201,168,76,0.12)',
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Optimal Management Consultancy. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){ .footer-grid{grid-template-columns:1fr!important; gap: 2rem !important; } }
      `}</style>
    </footer>
  );
}
