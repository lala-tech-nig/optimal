import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 2200);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex items-end gap-2">
      {/* Popup message */}
      <div
        className={`transition-all duration-700 ${
          showMsg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        } bg-white text-[#25D366] font-semibold px-4 py-2 rounded-xl shadow-lg mb-2`}
        style={{ fontSize: "1rem" }}
      >
        How can we help you?
      </div>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/2348037316413"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center w-14 h-14 rounded-full shadow-lg animate-bounce"
        style={{ background: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG Logo */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#25D366" />
          <path
            d="M23.5 8.5C21.6 6.6 19.2 5.5 16.7 5.5C11.2 5.5 6.7 10 6.7 15.5C6.7 17.1 7.1 18.7 7.8 20.1L6 27L12.1 25.2C13.5 25.9 15.1 26.3 16.7 26.3C22.2 26.3 26.7 21.8 26.7 16.3C26.7 13.8 25.6 11.4 23.5 8.5ZM16.7 24.3C15.3 24.3 13.9 24 12.6 23.4L12.2 23.2L8.7 24.2L9.7 20.7L9.5 20.3C8.8 19 8.4 17.3 8.4 15.5C8.4 11.1 12.3 7.2 16.7 7.2C18.3 7.2 19.9 7.8 21.2 8.9C23.1 10.8 24.2 13.2 24.2 15.7C24.2 20.1 20.3 24 16.7 24.3ZM20.2 18.7C19.9 18.6 18.7 18 18.5 17.9C18.3 17.8 18.1 17.7 17.9 17.9C17.7 18.1 17.1 18.7 16.9 18.9C16.7 19.1 16.5 19.1 16.2 19C15.9 18.9 15 18.6 13.9 17.6C13 16.7 12.4 15.7 12.3 15.4C12.2 15.1 12.3 14.9 12.4 14.8C12.5 14.7 12.6 14.6 12.7 14.5C12.8 14.4 12.9 14.2 13 14.1C13.1 13.9 13.1 13.8 13.2 13.7C13.3 13.6 13.3 13.5 13.2 13.4C13.1 13.3 12.7 12.2 12.5 11.7C12.3 11.2 12.1 11.3 11.9 11.3C11.7 11.3 11.5 11.3 11.3 11.3C11.1 11.3 10.9 11.5 10.9 11.7C10.9 11.9 10.9 13.1 11.7 14.5C12.5 15.9 13.7 17.2 15.1 18.2C16.5 19.2 17.7 19.5 18.1 19.5C18.5 19.5 18.7 19.5 18.8 19.5C18.9 19.5 19.1 19.5 19.2 19.3C19.3 19.1 19.3 18.8 19.2 18.7Z"
            fill="#fff"
          />
        </svg>
      </a>
    </div>
  );
}
