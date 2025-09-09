"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 px-10 bg-black/50">
      <h2 className="text-4xl font-bold text-gold text-center mb-10">About Us</h2>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="aspect-video bg-gray-800 rounded-xl shadow-lg"
        >
          {/* Auto-playing video placeholder */}
          <video className="w-full h-full object-cover rounded-xl" autoPlay muted loop>
            <source src="/about.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl text-gold mb-4">Mission & Vision</h3>
          <p className="mb-4">
            Our mission is to provide premium services with an unmatched experience.
          </p>
          <p>
            Our vision is to become the gold standard for quality and innovation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
