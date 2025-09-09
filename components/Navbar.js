"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-between items-center px-6 md:px-12 py-5 bg-wine/95 backdrop-blur-md border-b border-gold sticky top-0 z-50 shadow-lg"
    >
      {/* Logo */}
      <h1 className="text-gold text-2xl md:text-3xl font-extrabold tracking-wider cursor-pointer">
        OPTIMAL
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-10 text-lg font-medium text-white">
        {["Home", "About Us", "Gallery", "Services", "Contact"].map((item, i) => (
          <motion.li
            key={i}
            whileHover={{
              scale: 1.1,
              color: "#FFD700",
              textShadow: "0px 0px 8px rgba(255,215,0,0.7)",
            }}
            className="cursor-pointer transition-colors"
          >
            <a href={`#${item.toLowerCase().replace(" ", "")}`}>{item}</a>
          </motion.li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <div
        className="md:hidden flex flex-col gap-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-7 h-1 bg-gold rounded"></span>
        <span className="w-7 h-1 bg-gold rounded"></span>
        <span className="w-7 h-1 bg-gold rounded"></span>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-0 right-0 w-2/3 h-screen bg-wine/95 backdrop-blur-md shadow-xl flex flex-col items-center justify-center gap-8 text-xl text-gold"
        >
          {["Home", "About Us", "Gallery", "Services", "Contact"].map((item, i) => (
            <motion.a
              key={i}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              whileHover={{ scale: 1.2, color: "#fff" }}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
