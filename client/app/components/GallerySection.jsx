'use client';
import { useState, useEffect, useRef } from 'react';
import { Loader2, X, Maximize2, Image as ImageIcon } from 'lucide-react';

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
              position: 'relative', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', height: 300,
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transition: 'all 0.4s ease',
              border: '1px solid rgba(201,168,76,0.12)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'; }}
            >
               <img src={g.coverImage} alt={g.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)', transform: 'scale(1)' }} 
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
               />
               <div style={{
                 position: 'absolute', inset: 0, 
                 background: 'linear-gradient(to top, rgba(15,3,8,0.9) 0%, rgba(15,3,8,0.4) 50%, transparent 100%)',
                 display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.75rem',
                 pointerEvents: 'none'
               }}>
                  <h3 style={{ color: 'var(--white)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    {g.name}
                  </h3>
                  {g.description && (
                    <div style={{
                      background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)',
                      borderRadius: 12, padding: '0.8rem 1rem', border: '1px solid rgba(255,255,255,0.1)',
                      marginBottom: '0.75rem'
                    }}>
                      <p style={{
                        color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', lineHeight: 1.5,
                        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>{g.description}</p>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    <ImageIcon size={14} /> {g.images?.length || 0} Professional Shots
                  </div>
               </div>
               <div style={{
                 position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%',
                 background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                 transition: 'all 0.3s'
               }}>
                 <Maximize2 size={18} />
               </div>
            </div>
          ))}
        </div>

        {/* "See Full Gallery" button — only shown on homepage (when limit is set) */}
        {limit && galleries.length > limit && (
          <div style={{ textAlign: 'center', marginTop: '4.5rem' }}>
            <a href="/gallery" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '1.1rem 3rem', borderRadius: 8,
              background: 'rgba(201,168,76,0.1)',
              border: '2px solid rgba(201,168,76,0.4)',
              color: 'var(--gold-light)', fontWeight: 800, fontSize: '1rem',
              textDecoration: 'none', letterSpacing: '0.05em', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--wine-deep)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(201,168,76,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.color = 'var(--gold-light)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <ImageIcon size={20} /> View All Collections
              <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>→</span>
            </a>
          </div>
        )}
      </div>

      {/* LIGHTBOX OVERLAY */}
      {activeGallery && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(8,2,4,0.98)', backdropFilter: 'blur(20px)',
          zIndex: 1000, display: 'flex', flexDirection: 'column', overflowY: 'auto',
          animation: 'fadeIn 0.4s ease'
        }}>
           {/* Close Button Top Right */}
           <button onClick={() => setActiveGallery(null)} style={{
             position: 'fixed', top: 30, right: 30, zIndex: 1100,
             background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
             width: 54, height: 54, borderRadius: '50%', color: 'white', cursor: 'pointer',
             display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
             boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
           }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--wine-deep)'; e.currentTarget.style.transform = 'rotate(90deg)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'rotate(0deg)'; }}>
             <X size={28} />
           </button>

           {/* Full Width Narration Header */}
           <div style={{ 
             padding: '8rem 2rem 4rem', textAlign: 'center',
             background: 'linear-gradient(to bottom, rgba(201,168,76,0.05) 0%, transparent 100%)',
             borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem'
           }}>
              <div className="container" style={{ maxWidth: 800 }}>
                <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
                <h2 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{activeGallery.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                   <div style={{ background: 'var(--gold)', color: 'var(--wine-deep)', padding: '0.3rem 0.8rem', borderRadius: 50, fontSize: '0.75rem', fontWeight: 800 }}>
                     {activeGallery.images?.length || 0} SELECTIONS
                   </div>
                   <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>• Professional Gallery Collection</div>
                </div>
                {activeGallery.description && (
                  <p style={{ 
                    color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: 1.7, 
                    fontWeight: 400, fontStyle: 'italic', position: 'relative'
                  }}>
                    <span style={{ fontSize: '2rem', color: 'var(--gold)', opacity: 0.3, position: 'absolute', left: '-1.5rem', top: '-0.5rem' }}>"</span>
                    {activeGallery.description}
                    <span style={{ fontSize: '2rem', color: 'var(--gold)', opacity: 0.3, position: 'absolute', right: '-1.5rem', bottom: '-1rem' }}>"</span>
                  </p>
                )}
              </div>
           </div>
           
           {/* Refined Image Mosaic Grid */}
           <div style={{ padding: '0 2rem 6rem', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
                {activeGallery.images?.map((img, idx) => (
                  <div key={idx} style={{ 
                    borderRadius: 16, overflow: 'hidden', 
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)', 
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)'
                  }}>
                    <img key={idx} src={img} alt={`${activeGallery.name} ${idx+1}`} style={{
                      width: '100%', height: 'auto', display: 'block', transition: 'transform 0.5s ease'
                    }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}
