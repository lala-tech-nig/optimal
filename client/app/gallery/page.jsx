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
         {/* We reuse the Gallery Section but let it fetch all of them. */}
         <GallerySection />
      </main>
      <Footer />
    </>
  );
}
