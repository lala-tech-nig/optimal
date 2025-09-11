"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "backdrop-blur-md bg-black/50 border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center">
        <nav className="flex gap-8 items-center text-sm font-semibold text-[color:var(--gold)]">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
      <style jsx>{`
        .nav-link { position: relative; padding: 6px 2px; color: var(--gold); text-decoration: none; }
        .nav-link::after {
          content: ''; position: absolute; left: 50%; transform: translateX(-50%); bottom: -6px;
          width: 0; height: 2px; background: var(--gold); transition: width .22s;
        }
        .nav-link:hover::after { width: 60%; }
      `}</style>
    </header>
  );
}
