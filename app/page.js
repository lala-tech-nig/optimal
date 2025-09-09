"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Animate sections on scroll
    gsap.utils.toArray("section").forEach((section) => {
      gsap.from(section, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <main className="bg-wine text-gold">
      <section id="hero" className="min-h-screen flex items-center">
        <Hero />
      </section>

      <section id="about" className="py-20 border-t border-gold/30">
        <About />
      </section>

      <section id="services" className="py-20 border-t border-gold/30">
        <Services />
      </section>

      <section id="gallery" className="py-20 border-t border-gold/30">
        <Gallery />
      </section>

      <section id="contact" className="py-20 border-t border-gold/30">
        <Contact />
      </section>
    </main>
  );
}
