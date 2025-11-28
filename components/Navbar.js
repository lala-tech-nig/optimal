"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
      staggerChildren: 0.12,
    },
  },
};

const linkVariants = {
  hidden: { y: -12, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 160,
    },
  },
};

export default function Navbar() {
  const pathname = usePathname(); // e.g. "/"
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Helper: determine active from hash first, then scroll spy fallback
  useEffect(() => {
    // If a hash exists in the URL, prefer that as active
    const applyHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash) {
        setActive(hash);
        return true;
      }
      return false;
    };

    // call once on mount
    if (!applyHash()) {
      // fallback: basic scroll spy
      const onScroll = () => {
        for (const link of navLinks) {
          const section = document.querySelector(link.href);
          if (!section) continue;
          const rect = section.getBoundingClientRect();
          // heuristics: section top near top of viewport
          if (rect.top <= 120 && rect.bottom > 120) {
            setActive(link.href);
            return;
          }
        }
        // default to home if none matched
        setActive("#home");
      };

      // initial detect
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // also detect hash changes (user clicked a Link)
      window.addEventListener("hashchange", applyHash);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("hashchange", applyHash);
      };
    }

    // if we applied hash initially, still listen for hash changes
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // Close menu on route/path change (useful if you navigate to another page)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Called when a nav item is clicked (Link will update hash; we optimistically set active and close mobile)
  const handleNavClick = (href) => {
    setActive(href);
    setMenuOpen(false);
    // smooth scroll for same-page anchors
    if (href.startsWith("#") && typeof window !== "undefined") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg shadow-sm border-b border-white/10"
      style={{ background: "#7B294E" }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" onClick={() => handleNavClick("#home")} className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="OMC Logo"
            className="h-10 w-auto"
            style={{ filter: "drop-shadow(0 2px 8px gold)" }}
          />
          <span className="hidden sm:inline-block font-semibold text-white">OMC Qatar</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex" aria-label="Desktop navigation">
          <motion.ul
            className="flex gap-8 items-center text-lg font-semibold"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <motion.li
                  key={`nav-${link.href}`}
                  variants={linkVariants}
                  whileHover={{ scale: 1.04 }}
                  className={`nav-link ${isActive ? "active-link" : ""}`}
                >
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="px-2 py-1"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-gold"
          aria-label="Open menu"
        >
          <Menu size={28} color="#FFD700" />
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden={!menuOpen}
            role="dialog"
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-72 bg-[#7B294E] p-6 shadow-xl"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              {/* Close Button */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="OMC" className="h-8 w-auto" style={{ filter: "drop-shadow(0 2px 6px gold)" }} />
                  <span className="font-semibold text-white">OMC</span>
                </div>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={26} color="#FFD700" />
                </button>
              </div>

              <div className="flex flex-col gap-4 text-lg font-semibold">
                {navLinks.map((link) => {
                  const isActive = active === link.href;
                  return (
                    <Link
                      key={`mobile-${link.href}`}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`p-3 rounded-lg transition-colors ${
                        isActive ? "bg-white/10 text-white" : "text-[#FFD700] hover:bg-white/5"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline styles */}
      <style jsx>{`
        .nav-link {
          position: relative;
          padding: 6px;
          cursor: pointer;
          color: #ffd700;
          transition: all 0.28s ease;
        }

        .nav-link a {
          text-decoration: none;
          color: inherit;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #ffd700;
          transition: width 0.28s;
          border-radius: 2px;
        }

        .nav-link:hover::after {
          width: 64%;
        }

        .active-link {
          color: white !important;
        }

        .active-link::after {
          width: 64%;
        }

        /* small adjustments for mobile menu items */
        @media (max-width: 767px) {
          .nav-link {
            padding: 0;
          }
        }
      `}</style>
    </header>
  );
}
