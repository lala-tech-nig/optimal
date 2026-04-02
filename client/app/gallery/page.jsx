'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GallerySection from '../components/GallerySection';

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--wine-deep)', paddingTop: '100px' }}>
         <div style={{ textAlign: 'center', padding: '4rem 1.5rem 2rem' }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', fontWeight: 700, marginBottom: '1rem' }}>
              Media <span style={{ color: 'var(--gold)' }}>Gallery</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto', fontSize: '1.1rem' }}>
              Browse through our extensive catalog of training sessions, international certifications, and successful audits.
            </p>
         </div>
         {/* We reuse the Gallery Section but let it fetch all of them. */}
         <GallerySection />
      </main>
      <Footer />
    </>
  );
}
