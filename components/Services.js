"use client";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section className="py-20 px-10">
      <h2 className="text-4xl font-bold text-gold text-center mb-10">Our Services</h2>
      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="aspect-video bg-gray-800 rounded-xl shadow-lg"
        >
          <video className="w-full h-full object-cover rounded-xl" autoPlay muted loop>
            <source src="/services.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div>
          <p className="text-lg leading-relaxed">
            We deliver cutting-edge solutions across multiple industries, ensuring
            customer satisfaction at every step. From consulting to implementation,
            our services are crafted with excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
