"use client";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const linkVariants = {
  hidden: { y: -60, opacity: 0, scale: 0.7 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.7,
      duration: 0.7,
    },
  },
};

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
        {/* Logo on the top left */}
        <a href="#home" className="mr-10 flex-shrink-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto"
            style={{ filter: "drop-shadow(0 2px 8px gold)" }}
          />
        </a>
        <nav className="flex-1 flex justify-center">
          <motion.ul
            className="flex gap-10 items-center text-lg font-semibold"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.href}
                variants={linkVariants}
                whileHover={{ scale: 1.08, color: "#fffbe6" }}
                className="nav-link"
              >
                <a href={link.href}>{link.label}</a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
      <style jsx>{`
        .nav-link {
          position: relative;
          padding: 8px 6px;
          color: var(--gold, #FFD700);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s, transform 0.2s;
        }
        .nav-link a {
          color: inherit;
          text-decoration: none;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -4px;
          width: 0;
          height: 2px;
          background: var(--gold, #FFD700);
          transition: width 0.22s;
        }
        .nav-link:hover::after {
          width: 70%;
        }
      `}</style>
    </header>
  );
}
