"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-between items-center px-10 py-6 bg-wine border-b border-gold sticky top-0 z-50 shadow-lg"
    >
      <h1 className="text-gold text-2xl font-bold">LOGO</h1>
      <ul className="flex gap-8 text-lg">
        {["Home", "About Us", "Gallery", "Services", "Contact"].map((item, i) => (
          <motion.li
            key={i}
            whileHover={{ scale: 1.1, color: "#FFD700" }}
            className="cursor-pointer"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
