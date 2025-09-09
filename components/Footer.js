export default function Footer() {
  return (
    <footer className="py-10 bg-wine border-t border-gold text-center">
      <div className="container mx-auto px-6">
        {/* Copyright */}
        <p className="text-gold text-sm md:text-base">
          © {new Date().getFullYear()} <span className="font-semibold">Optimal</span>. All Rights Reserved.
        </p>

        {/* Divider */}
        <div className="w-20 h-[1px] bg-gold mx-auto my-6 opacity-60"></div>

        {/* Developed by */}
        <p className="text-gold/90 text-xs md:text-sm tracking-wide">
          Designed & Developed by{" "}
          <a
            href="https://lalatech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-yellow-400 transition-colors cursor-pointer"
          >
            LALA TECH
          </a>
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="#"
            className="text-gold hover:text-yellow-400 transition-colors text-sm md:text-base"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="#"
            className="text-gold hover:text-yellow-400 transition-colors text-sm md:text-base"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-gold hover:text-yellow-400 transition-colors text-sm md:text-base"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
