"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-r from-wine via-black to-wine">
      {/* Background subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.08),transparent)]"></div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold text-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]"
      >
        Welcome to <span className="text-white">Optimal</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="mt-6 text-lg md:text-2xl max-w-3xl text-gray-200"
      >
        Experience <span className="text-gold font-semibold">luxury</span> with our
        world-class services and innovations.
      </motion.p>

      {/* Call to Action Button */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 25px rgba(255,215,0,0.7)",
        }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-8 py-4 rounded-full bg-gold text-black font-semibold tracking-wide uppercase shadow-lg transition-colors hover:bg-white"
      >
        Learn More
      </motion.a>
    </section>
  );
}
