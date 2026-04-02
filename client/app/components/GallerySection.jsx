'use client';
import { useState, useEffect, useRef } from 'react';
import { Loader2, X, Maximize2, Image as ImageIcon } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function GallerySection({ limit }) {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGallery, setActiveGallery] = useState(null);
  
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        if(data.success) setGalleries(data.galleries);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useGSAP(() => {
    if (loading || galleries.length === 0) return;
    
    gsap.from('.gallery-card', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, [loading, galleries]);

  // Prevent background scroll when lightbox open
  useEffect(() => {
    if (activeGallery) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [activeGallery]);

  if(loading) return null;
  if(galleries.length === 0) return null;

  return (
    <section ref={sectionRef} style={{ padding: '6rem 1.5rem', background: 'var(--wine-dark)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="gold-line" style={{ margin: '0 auto 1.25rem' }} />
          <div className="badge-gold" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold-light)', marginBottom: '1.25rem' }}>
            Media &amp; Moments
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', fontWeight: 700, marginBottom: '1rem' }}>
            Our Gallery
          </h2>
          <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))', margin: '0 auto 1.5rem', borderRadius: 2 }} />
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Explore moments from our professional ISO training sessions, audits, and corporate events across Nigeria and Qatar.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {(limit ? galleries.slice(0, limit) : galleries).map(g => (
            <div key={g._id} className="gallery-card" onClick={() => setActiveGallery(g)} style={{
              position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', height: 280,
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '1px solid rgba(201,168,76,0.1)'
            }}>
               <img src={g.coverImage} alt={g.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} 
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
               />
               <div style={{
                 position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(58,10,31,0.9) 0%, transparent 60%)',
                 display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem',
                 pointerEvents: 'none' // allow image hover
               }}>
                  <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.4rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    {g.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-light)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <ImageIcon size={14} /> {g.images?.length || 0} Images
                  </div>
               </div>
               <div style={{
                 position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%',
                 background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.2)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
               }}>
                 <Maximize2 size={18} />
               </div>
            </div>
          ))}
        </div>

        {/* "See Full Gallery" button — only shown on homepage (when limit is set) */}
        {limit && galleries.length > limit && (
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <a href="/gallery" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '1rem 2.5rem', borderRadius: 6,
              background: 'transparent',
              border: '2px solid rgba(201,168,76,0.5)',
              color: 'var(--gold-light)', fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', letterSpacing: '0.02em', transition: 'all 0.3s',
              backdropFilter: 'blur(5px)'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--wine-deep)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(201,168,76,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold-light)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <ImageIcon size={18} /> View Full Gallery
              <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>→</span>
            </a>
          </div>
        )}
      </div>

      {/* LIGHTBOX OVERLAY */}
      {activeGallery && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,3,8,0.95)', backdropFilter: 'blur(15px)',
          zIndex: 1000, display: 'flex', flexDirection: 'column', overflowY: 'auto'
        }}>
           <div style={{ 
             position: 'sticky', top: 0, padding: '1.5rem 2rem', background: 'linear-gradient(to bottom, rgba(15,3,8,0.9) 0%, transparent 100%)',
             display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1001
           }}>
              <div>
                <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1.5rem' }}>{activeGallery.name}</h2>
                <p style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>{activeGallery.images?.length || 0} Images</p>
              </div>
              <button onClick={() => setActiveGallery(null)} style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                width: 44, height: 44, borderRadius: '50%', color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s'
              }} onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                <X size={24} />
              </button>
           </div>
           
           <div style={{ padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '1.5rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
              {activeGallery.images?.map((img, idx) => (
                 <img key={idx} src={img} alt={`${activeGallery.name} ${idx+1}`} style={{
                   width: '100%', height: 'auto', borderRadius: 12, boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                   border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s'
                 }}
                   onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                   onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                 />
              ))}
           </div>
        </div>
      )}
    </section>
  );
}
