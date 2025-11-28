"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [active, setActive] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);

  // ❗ Scroll Spy — only runs on the homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "contact"];

    const onScroll = () => {
      let current = "/";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) {
          current = `/#${id}`;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const handleNavClick = (href) => {
    setMenuOpen(false);

    // If linking to an anchor on the same page
    if (href.startsWith("/#") && pathname === "/") {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setActive(href);
      return;
    }

    setActive(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg shadow-sm border-b border-white/10"
      style={{ background: "#7B294E" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" onClick={() => handleNavClick("/")}>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-white p-1 rounded-lg">
              <img
                src="/logo.png"
                alt="OMC Logo"
                className="h-12 w-auto"
                style={{ filter: "drop-shadow(0 2px 8px gold)" }}
              />
            </div>
            <span className="hidden sm:block font-semibold text-white text-lg">
              OMC Qatar
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex">
          <ul className="flex gap-8 items-center text-lg font-semibold">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-2 py-1 transition 
                      ${isActive ? "text-white" : "text-[#FFD700]"}
                    `}
                  >
                    {link.label}

                    {/* underline animation */}
                    <span
                      className={`absolute left-0 right-0 -bottom-1 h-[2px] bg-[#FFD700] transition-all 
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                    ></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-gold"
        >
          <Menu size={28} color="#FFD700" />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-72 bg-[#7B294E] p-6 shadow-xl"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
            >
              {/* Close */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" className="h-8" />
                  <span className="font-semibold text-white">OMC</span>
                </div>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={26} color="#FFD700" />
                </button>
              </div>

              {/* Mobile nav */}
              <div className="flex flex-col gap-4 text-lg font-semibold">
                {navLinks.map((link) => {
                  const isActive = active === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`p-3 rounded-lg transition 
                        ${isActive ? "bg-white/10 text-white" : "text-[#FFD700] hover:bg-white/5"}
                      `}
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
    </header>
  );
}
