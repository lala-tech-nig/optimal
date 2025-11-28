"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toast, setToast] = useState("");
  const formRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [cardHeight, setCardHeight] = useState(0);

  // Track window size for confetti
  useEffect(() => {
    const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Match video card height with form card
  useEffect(() => {
    if (formRef.current) {
      setCardHeight(formRef.current.offsetHeight);
    }
  }, [formRef.current, form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sent");
    setToast(`Thanks ${form.name}! Our team will get back to you soon.`);
    setShowConfetti(true);

    setForm({ name: "", email: "", phone: "", message: "" });

    setTimeout(() => setShowConfetti(false), 10000); // Confetti lasts 7s
    setTimeout(() => setToast(""), 7500);
    setTimeout(() => setStatus(null), 10500);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-[#f7f7fa] to-[#e3e3e8] relative">
      {/* Real Confetti */}
      {showConfetti && <ReactConfetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={250} />}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-400 text-black px-6 py-3 rounded-xl shadow-xl font-semibold text-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-10">
        <h2 className="text-5xl md:text-6xl font-extrabold text-[color:var(--gold)] drop-shadow-lg">
          Contact Us
        </h2>
        <p className="mt-3 text-lg md:text-xl text-gray-700 font-medium">
          We’d love to hear from you! Reach out and let’s create something amazing together.
        </p>
      </motion.div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-start">
        {/* Video Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#7B294E] bg-black/70"
          style={{ minHeight: cardHeight || 250 }}
        >
          <video
            src="/contact.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Form Card */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl shadow-2xl p-8 grid gap-4"
        >
          <h3 className="text-2xl font-extrabold text-[color:var(--gold)] mb-4 text-center drop-shadow-md">
            Get In Touch
          </h3>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="p-3 rounded-lg border border-[#7B294E] bg-gray-100 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] transition"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="p-3 rounded-lg border border-[#7B294E] bg-gray-100 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] transition"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone (optional)"
            className="p-3 rounded-lg border border-[#7B294E] bg-gray-100 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] transition"
          />
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Message"
            rows={4}
            className="p-3 rounded-lg border border-[#7B294E] bg-gray-100 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] transition resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-yellow-400 text-black font-bold shadow-lg hover:bg-[#7B294E] hover:text-white transition-all duration-300"
            >
              Send Message
            </button>
            <span className="text-gray-700 font-medium">
              {status === "sending" && "Sending..."}
              {status === "error" && "Error — please try again later."}
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
