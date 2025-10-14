"use client";
import { useEffect, useRef, useState } from "react";

// Random transition classes
const TRANSITIONS = [
  "fade",      // fade in/out
  "slide-left",// slide from left
  "slide-right",// slide from right
  "zoom-in",   // zoom in
  "fold",      // fold out
];

const SLIDES = [
  {
    title: "Management Systems Consultancy",
    subtitle: "Establishment, documentation, training, implementation and monitoring of management systems.",
    image: "https://i.postimg.cc/LXkg2mjq/Whats-App-Image-2025-09-08-at-2-40-18-PM.jpg"
  },
  // {
  //   title: "Fire & Life Safety Consultancy",
  //   subtitle: "Fire risk assessments, audits, design and Qatar Civil Defence approvals.",
  //   image: "https://api.imghippo.com/files/slf6951Mv.jpeg"
  // },
  {
    title: "Professional & Technical Trainings",
    subtitle: "ISO, NEBOSH, IOSH, PMP and tailored in-house programs.",
    image: "https://i.imghippo.com/files/rLg1482IVo.jpg"
  },
  {
    title: "Business Continuity & Info Security",
    subtitle: "ISO 22301 and ISO/IEC 27001 aligned services.",
    image: "https://i.imghippo.com/files/rUr4483gsY.jpg"
  },
  {
    title: "Tailored Implementation & Documentation",
    subtitle: "Arabic & English support for documentation and implementation.",
    image: "https://i.imghippo.com/files/wnI2283kdo.jpg"
  }
];

function getRandomTransition() {
  return TRANSITIONS[Math.floor(Math.random() * TRANSITIONS.length)];
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState("fade");
  const autoRef = useRef(null);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setTransition(getRandomTransition());
      setIndex(i => (i + 1) % SLIDES.length);
    }, 4800);
    return () => clearInterval(autoRef.current);
  }, []);

  const goTo = (i) => {
    setTransition(getRandomTransition());
    setIndex(i);
  };

  const prev = () => {
    setTransition(getRandomTransition());
    setIndex(i => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  const next = () => {
    setTransition(getRandomTransition());
    setIndex(i => (i + 1) % SLIDES.length);
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <style>{`
        .fade { transition: opacity 1s; }
        .slide-left { animation: slideLeft 1s; }
        .slide-right { animation: slideRight 1s; }
        .zoom-in { animation: zoomIn 1s; }
        .fold { animation: foldOut 1s; }
        @keyframes slideLeft {
          from { opacity:0; transform:translateX(-60vw);}
          to { opacity:1; transform:translateX(0);}
        }
        @keyframes slideRight {
          from { opacity:0; transform:translateX(60vw);}
          to { opacity:1; transform:translateX(0);}
        }
        @keyframes zoomIn {
          from { opacity:0; transform:scale(1.3);}
          to { opacity:1; transform:scale(1);}
        }
        @keyframes foldOut {
          0% { opacity:0; transform:scaleY(0.1) rotateX(60deg);}
          100% { opacity:1; transform:scaleY(1) rotateX(0);}
        }
      `}</style>
      {SLIDES.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={`absolute inset-0 ${i === index ? transition : "opacity-0"} ${i === index ? "z-10" : "z-0"}`}
          style={{ opacity: i === index ? 1 : 0, transition: "opacity 1s" }}
        >
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#7B294E]/80 via-black/60 to-transparent" />
        </div>
      ))}

      <div className="relative z-20 max-w-5xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-[color:var(--gold)] drop-shadow-lg mb-4" style={{textShadow:"0 2px 16px #7B294E"}}>
          {SLIDES[index].title}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white/95 max-w-2xl mx-auto font-semibold drop-shadow-lg" style={{textShadow:"0 2px 8px #7B294E"}}>
          {SLIDES[index].subtitle}
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#services"
            className="inline-block px-7 py-3 rounded-full font-semibold bg-[color:var(--gold)] text-[#7B294E] shadow-lg transition-all duration-300 hover:bg-[#7B294E] hover:text-[color:var(--gold)] hover:scale-105 hover:shadow-2xl"
            style={{ border: "2px solid #FFD700" }}
          >
            Our Services
          </a>
          <a
            href="#contact"
            className="inline-block px-6 py-3 rounded-full border-2 border-[color:var(--gold)] font-semibold text-[color:var(--gold)] bg-white/10 shadow-lg transition-all duration-300 hover:bg-[color:var(--gold)] hover:text-[#7B294E] hover:scale-105 hover:shadow-2xl"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Dots - moved lower */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-30">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-[color:var(--gold)] ${i === index ? "bg-[color:var(--gold)] scale-110 shadow-lg" : "bg-white/30"}`}
          />
        ))}
      </div>

      {/* nav arrows (desktop) */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 hidden md:block z-30">
        <button
          aria-label="previous"
          onClick={prev}
          className="p-3 rounded-full bg-[#7B294E]/70 border-2 border-[color:var(--gold)] text-[color:var(--gold)] shadow-lg hover:bg-[color:var(--gold)] hover:text-[#7B294E] transition-all"
        >
          ‹
        </button>
      </div>
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:block z-30">
        <button
          aria-label="next"
          onClick={next}
          className="p-3 rounded-full bg-[#7B294E]/70 border-2 border-[color:var(--gold)] text-[color:var(--gold)] shadow-lg hover:bg-[color:var(--gold)] hover:text-[#7B294E] transition-all"
        >
          ›
        </button>
      </div>
    </section>
  );
}
