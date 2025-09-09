"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 px-6 md:px-10 bg-black/50">
      <h2 className="text-4xl font-bold text-gold text-center mb-12">
        About Us
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Video Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="aspect-video bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/about.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl text-gold mb-4">Mission & Vision</h3>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Our mission is to provide premium services with an unmatched
            experience.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our vision is to become the gold standard for quality and
            innovation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
