"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    image: "/collagesecond1.jpg",
    title: "Elite Management Consultancy",
    subtitle:
      "ISO Implementation • Certification Support • Business Process Optimization • Compliance Excellence",
  },
  {
    image: "/carousel2.jpg",
    title: "Professional & Accredited Training Programs",
    subtitle:
      "ISO Trainings • NEBOSH • IOSH • PMP • Corporate Capacity Building • Industry-Leading Skill Development",
  },
  {
    image: "/carousel3.jpg",
    title: "Transform Your Organization with Expert Management Systems",
    subtitle:
      "From Gap Assessment to Full Certification — We Build Systems That Make Businesses Future-Ready.",
  },
  {
    image: "/carousel4.jpg",
    title: "Train Your Team to Global Standards",
    subtitle:
      "World-Class Trainers • Practical Learning • Recognized Certifications • Powerful Career Advancement.",
  },
  {
    image: "/collagesecond2.jpg",
    title: "Strategic Consultancy & High-Impact Training",
    subtitle:
      "Your Partner for Business Excellence, Compliance, Growth, and Professional Mastery.",
  },
];


export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => setIndex(i);

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center"
    >
      {/* Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${SLIDES[index].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl px-6">
        <h1 className="text-[color:var(--gold)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg leading-tight">
          {SLIDES[index].title}
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white drop-shadow-lg">
          {SLIDES[index].subtitle}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex justify-center gap-5">
          <a
            href="#services"
            className="px-6 py-3 rounded-full font-semibold bg-[color:var(--gold)] text-[#7B294E] border-2 border-[color:var(--gold)] shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Our Services
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-full font-semibold border-2 border-[color:var(--gold)] text-[color:var(--gold)] bg-white/10 backdrop-blur-md shadow-lg hover:bg-[color:var(--gold)] hover:text-[#7B294E] hover:scale-105 transition-transform duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-4 h-4 rounded-full border-2 border-[color:var(--gold)] transition-all duration-250 ${
              i === index
                ? "bg-[color:var(--gold)] scale-110 shadow-lg"
                : "bg-white/40 hover:scale-110"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
