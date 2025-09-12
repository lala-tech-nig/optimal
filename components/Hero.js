"use client";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    title: "Management Systems Consultancy",
    subtitle: "Establishment, documentation, training, implementation and monitoring of management systems.",
    image: "https://i.postimg.cc/LXkg2mjq/Whats-App-Image-2025-09-08-at-2-40-18-PM.jpg"
  },
  {
    title: "Fire & Life Safety Consultancy",
    subtitle: "Fire risk assessments, audits, design and Qatar Civil Defence approvals.",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1800&q=80"
  },
  {
    title: "Professional & Technical Trainings",
    subtitle: "ISO, NEBOSH, IOSH, PMP and tailored in-house programs.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80"
  },
  {
    title: "Business Continuity & Info Security",
    subtitle: "ISO 22301 and ISO/IEC 27001 aligned services.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80"
  },
  {
    title: "Tailored Implementation & Documentation",
    subtitle: "Arabic & English support for documentation and implementation.",
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=1800&q=80"
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const autoRef = useRef(null);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setIndex(i => (i + 1) % SLIDES.length);
    }, 4800);
    return () => clearInterval(autoRef.current);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {SLIDES.map((s, i) => (
        <div key={i} aria-hidden={i !== index} className={`absolute inset-0 transition-opacity duration-900 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-20 max-w-5xl px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[color:var(--gold)]">
          {SLIDES[index].title}
        </h1>
        <p className="mt-4 text-lg text-white/85 max-w-2xl mx-auto">{SLIDES[index].subtitle}</p>

        <div className="mt-6 flex justify-center gap-4">
          <a href="#services" className="inline-block px-6 py-3 rounded-full font-semibold" style={{background:'var(--gold)', color:'#111'}}>Our Services</a>
          <a href="#contact" className="inline-block px-5 py-3 rounded-full border border-[color:var(--gold)] font-semibold text-[color:var(--gold)]">Contact Us</a>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i+1}`}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-[color:var(--gold)]" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>

      {/* nav arrows (desktop) */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 hidden md:block z-30">
        <button aria-label="previous" onClick={() => setIndex(i => (i - 1 + SLIDES.length) % SLIDES.length)} className="p-3 rounded-full bg-black/40 border border-white/5">‹</button>
      </div>
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:block z-30">
        <button aria-label="next" onClick={() => setIndex(i => (i + 1) % SLIDES.length)} className="p-3 rounded-full bg-black/40 border border-white/5">›</button>
      </div>
    </section>
  );
}
