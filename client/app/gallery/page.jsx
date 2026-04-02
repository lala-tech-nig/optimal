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
         </div>
         {/* We reuse the Gallery Section but let it fetch all of them. */}
         <GallerySection />
      </main>
      <Footer />
    </>
  );
}
