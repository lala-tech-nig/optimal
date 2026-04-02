'use client';
import Image from 'next/image';

const logos = [
  '/collagesecond1.jpg',
  '/collagesecond2.jpg',
  '/collagesecond3.jpg',
  '/collagesecond4.jpg',
  '/collagesecond5.jpg',
  '/collagesecond6.jpg',
  '/collagesecond7.jpg',
];

export default function ClientLogos() {
  // Duplicate arrays to create continuous infinite effect
  const marquee1 = [...logos, ...logos, ...logos];
  const marquee2 = [...logos.slice().reverse(), ...logos.slice().reverse(), ...logos.slice().reverse()];

  return (
    <section style={{ background: 'var(--white)', padding: '5rem 0', overflow: 'hidden' }}>
      <div className="container">
        <div className="logos-text" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--grey-mid)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            Trusted by Industry Leaders
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Row 1 - Moving Left */}
        <div className="logos-track" style={{ display: 'flex', width: '300%', animation: 'marquee-left 40s linear infinite' }}>
          {marquee1.map((src, i) => (
            <div key={i} style={{ padding: '0 2rem', filter: 'grayscale(0%)', transition: 'all 0.3s', flex: '0 0 auto', width: '250px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%) opacity(1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(0%) opacity(0.7)'; }}
            >
              <Image src={src} alt={`Client ${i}`} width={180} height={70} style={{ objectFit: 'contain' }} />
            </div>
          ))}
        </div>

        {/* Row 2 - Moving Right */}
        <div className="logos-track" style={{ display: 'flex', width: '300%', animation: 'marquee-right 40s linear infinite', marginLeft: '-150%' }}>
          {marquee2.map((src, i) => (
            <div key={i} style={{ padding: '0 2rem', filter: 'grayscale(0%)', transition: 'all 0.3s', flex: '0 0 auto', width: '250px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%) opacity(1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(0%) opacity(0.7)'; }}
            >
              <Image src={src} alt={`Client ${i}`} width={180} height={70} style={{ objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
