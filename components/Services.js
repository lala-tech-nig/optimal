"use client";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 px-6 md:px-12 bg-black text-white relative"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gold text-center mb-16">
        Our Services
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl border border-gold/30"
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/services.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            At <span className="text-gold font-semibold">Optimal</span>, we
            deliver cutting-edge solutions across multiple industries, ensuring
            customer satisfaction at every step.  
          </p>
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-300">
            From consulting to full-scale implementation, our services are
            designed with excellence, innovation, and world-class standards in
            mind.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
