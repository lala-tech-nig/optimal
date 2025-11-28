"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="bg-[var(--wine)] text-white">
      {/* Fixed navbar */}
      {/* <Navbar /> */}

      {/* Main content */}
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>

      {/* Footer */}
      {/* <Footer /> */}

      {/* Floating WhatsApp button */}
      {/* <WhatsAppButton /> */}
    </div>
  );
}
