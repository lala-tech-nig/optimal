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
    <section className="py-20 px-10 bg-black/50">
      <h2 className="text-4xl font-bold text-gold text-center mb-10">Gallery</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >
            <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
