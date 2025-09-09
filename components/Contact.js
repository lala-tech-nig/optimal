"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="py-20 px-6 md:px-10">
      <h2 className="text-4xl font-bold text-gold text-center mb-12">
        Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
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
            <source src="/contact.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Contact Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()} // prevent refresh for now
        >
          <input
            type="text"
            className="p-3 rounded-lg border border-gold text-black focus:ring-2 focus:ring-gold outline-none"
            placeholder="Name"
            required
          />
          <input
            type="email"
            className="p-3 rounded-lg border border-gold text-black focus:ring-2 focus:ring-gold outline-none"
            placeholder="Email"
            required
          />
          <input
            type="tel"
            className="p-3 rounded-lg border border-gold text-black focus:ring-2 focus:ring-gold outline-none"
            placeholder="Phone No"
          />
          <textarea
            rows="4"
            className="p-3 rounded-lg border border-gold text-black focus:ring-2 focus:ring-gold outline-none"
            placeholder="Message"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold text-black font-semibold py-3 rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            Send
          </motion.button>
        </form>
      </div>
    </section>
  );
}
