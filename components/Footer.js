export default function Footer() {
  return (
    <footer className="py-8 text-white" style={{ background: "linear-gradient(90deg, #7B294E 0%, #4B183B 100%)" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
          <img
            src="/logo.png"
            alt="Optimal Logo"
            className="h-[200px] w-auto rounded-xl bg-white/80 p-2 shadow-lg"
          />
          <span className="font-extrabold text-4xl text-[color:var(--gold)] tracking-wide">
            Optimal Management Consultancy
          </span>
        </div>

        {/* Center: Contact Info */}
        <div className="text-center md:text-left flex-1">
          <div className="mb-2 text-[color:var(--gold)] font-semibold">Office Address:</div>
          <div className="mb-1 text-white/90">West Bay, Doha, Qatar</div>
          <div className="mb-1">
            <span className="text-[color:var(--gold)] font-semibold">Phone:</span>{" "}
            <a href="tel:+97400000000" className="text-white/90 hover:text-[color:var(--gold)] transition">+974 0000 0000</a>
          </div>
          <div>
            <span className="text-[color:var(--gold)] font-semibold">Email:</span>{" "}
            <a href="mailto:info@optimalqatar.com" className="text-white/90 hover:text-[color:var(--gold)] transition">info@optimalqatar.com</a>
          </div>
        </div>

        {/* Right: Socials & Credits */}
        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
          <div className="flex gap-4 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="14" fill="#FFD700" />
                <path d="M16.5 14h2l.5-3h-2.5V9.5c0-.7.2-1.2 1.2-1.2H19V6.2c-.2 0-.9-.1-1.7-.1-2 0-2.8 1.2-2.8 2.7V11H12v3h2.5v7h3V14z" fill="#7B294E"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="14" fill="#FFD700" />
                <rect x="8" y="8" width="12" height="12" rx="4" fill="#7B294E"/>
                <circle cx="14" cy="14" r="3" fill="#FFD700"/>
                <circle cx="18" cy="10" r="1" fill="#7B294E"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="14" fill="#FFD700" />
                <rect x="9" y="11" width="2" height="6" fill="#7B294E"/>
                <rect x="13" y="13" width="2" height="4" fill="#7B294E"/>
                <circle cx="10" cy="9" r="1" fill="#7B294E"/>
                <rect x="17" y="13" width="2" height="4" fill="#7B294E"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="14" fill="#FFD700" />
                <path d="M10 18L18 10M10 10l8 8" stroke="#7B294E" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
          <div className="text-sm text-white/80">
            © {new Date().getFullYear()} Optimal Management Consultancy — Doha, Qatar
          </div>
          <div className="text-sm mt-1">
            Design by{" "}
            <a
              href="https://lalatech.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[color:var(--gold)] underline hover:text-white transition"
            >
              LALA TECH
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
