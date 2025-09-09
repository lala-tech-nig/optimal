"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="py-20 px-10">
      <h2 className="text-4xl font-bold text-gold text-center mb-10">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="aspect-video bg-gray-800 rounded-xl shadow-lg"
        >
          <video className="w-full h-full object-cover rounded-xl" autoPlay muted loop>
            <source src="/contact.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <form className="flex flex-col gap-4">
          <input className="p-3 rounded-lg border border-gold text-black" placeholder="Name" />
          <input className="p-3 rounded-lg border border-gold text-black" placeholder="Email" />
          <input className="p-3 rounded-lg border border-gold text-black" placeholder="Phone No" />
          <textarea className="p-3 rounded-lg border border-gold text-black" placeholder="Message" />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Send
          </motion.button>
        </form>
      </div>
    </section>
  );
}
