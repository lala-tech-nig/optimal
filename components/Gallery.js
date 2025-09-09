"use client";
import { motion } from "framer-motion";

export default function Gallery() {
  const items = [
    { title: "LALA TECH ISO Training Ikeja", img: "/g1.jpg" },
    { title: "MS Solution ISO Training Dubai", img: "/g2.jpg" },
    { title: "Qatar Emirates ISO Training Doha", img: "/g3.jpg" },
    { title: "More Projects", img: "/g4.jpg" },
  ];

  return (
    <section className="py-20 px-10 bg-gradient-to-b from-black via-wine/90 to-black">
      <h2 className="text-4xl md:text-5xl font-bold text-gold text-center mb-14 tracking-wide drop-shadow-lg">
        Gallery
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="relative group rounded-2xl overflow-hidden shadow-xl border border-gold/30"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <p className="text-gold font-semibold text-sm md:text-base">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
