"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Globe, Shield, Zap, ArrowRight } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 3.5s sequence
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {loading ? (
          <IntroSequence key="intro" />
        ) : (
          <HeroSection key="hero" />
        )}
      </AnimatePresence>
    </main>
  );
}

function IntroSequence() {
  const brandName = "OMC";
  const letters = Array.from(brandName);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex items-center justify-center">
        {/* Glow Effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.15 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-48 w-48 rounded-full bg-brand-gold blur-3xl"
        />

        <div className="flex overflow-hidden text-7xl font-black tracking-tighter sm:text-9xl">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.1,
                ease: [0.6, 0.01, -0.05, 0.95],
              }}
              className="inline-block text-brand-gold"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-8 flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-[0.5em] text-foreground/40">
          Optimal Management Consultancy
        </span>
        <div className="mt-4 h-[2px] w-12 bg-brand-gold/30">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
            className="h-full w-full origin-left bg-brand-gold"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-brand-wine/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-brand-gold/5 blur-[120px]" />
      </div>

      {/* Navigation Dummy */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-8">
        <div className="text-xl font-black tracking-tighter text-brand-gold">OMC</div>
        <div className="flex gap-8 text-xs font-semibold uppercase tracking-widest text-foreground/60">
          <a href="#" className="hover:text-brand-gold transition-colors">Strategic</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Global</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Authority</a>
        </div>
      </nav>

      <div className="z-10 flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-md"
        >
          <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/80">
            Consulting Reimagined for 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mb-8 text-5xl font-black leading-[1.1] tracking-tight sm:text-8xl"
        >
          Define Your <span className="text-brand-gold">Authority</span>. <br />
          Execute with <span className="italic">Precision</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12 max-w-2xl text-lg leading-relaxed text-foreground/50 sm:text-xl"
        >
          Optimal Management Consultancy bridges the gap between vision and operational excellence. 
          We empower global leaders with data-driven strategies and executive precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <button className="flex h-14 items-center gap-3 rounded-full bg-brand-gold px-8 font-bold text-background transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(176,141,38,0.4)]">
            Explore Strategic Programs <ArrowRight className="h-5 w-5" />
          </button>
          <button className="flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 font-bold backdrop-blur-md transition-all hover:bg-white/10">
            View Case Studies
          </button>
        </motion.div>
      </div>

      {/* Feature Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3"
      >
        <div className="glass-panel group rounded-radius-xl p-8 transition-all hover:-translate-y-2">
          <Globe className="mb-6 h-10 w-10 text-brand-gold transition-transform group-hover:rotate-12" />
          <h3 className="mb-4 text-xl font-bold">Global Strategy</h3>
          <p className="text-sm text-foreground/40 leading-relaxed">
            Market entry, international compliance, and cross-border operational scaling.
          </p>
        </div>
        <div className="glass-panel group rounded-radius-xl p-8 transition-all hover:-translate-y-2">
          <Shield className="mb-6 h-10 w-10 text-brand-gold transition-transform group-hover:rotate-12" />
          <h3 className="mb-4 text-xl font-bold">Risk Management</h3>
          <p className="text-sm text-foreground/40 leading-relaxed">
            Advanced diagnostic audits and preemptive crisis mitigation for large enterprises.
          </p>
        </div>
        <div className="glass-panel group rounded-radius-xl p-8 transition-all hover:-translate-y-2">
          <Zap className="mb-6 h-10 w-10 text-brand-gold transition-transform group-hover:rotate-12" />
          <h3 className="mb-4 text-xl font-bold">Rapid Execution</h3>
          <p className="text-sm text-foreground/40 leading-relaxed">
            Proprietary frameworks designed to accelerate growth cycles by up to 40%.
          </p>
        </div>
      </motion.div>
      
      <footer className="mt-32 w-full border-t border-white/5 py-12 text-center text-[10px] uppercase tracking-[0.3em] text-foreground/20">
        &copy; 2026 Optimal Management Consultancy. All Rights Reserved.
      </footer>
    </motion.section>
  );
}
