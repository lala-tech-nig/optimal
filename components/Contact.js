"use client";
import { useState, useRef, useEffect } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toast, setToast] = useState("");
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(500);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, [formRef.current, form]);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", message: "" });
        setShowConfetti(true);
        setToast(`We will get back to you as soon as possible. Thank you, ${form.name}!`);
        setTimeout(() => setShowConfetti(false), 3500);
        setTimeout(() => setToast(""), 4000);
      } else {
        setStatus("error");
        setToast("Error — please try again later.");
        setTimeout(() => setToast(""), 3500);
      }
    } catch (err) {
      setStatus("error");
      setToast("Error — please try again later.");
      setTimeout(() => setToast(""), 3500);
    }
    setTimeout(() => setStatus(null), 3500);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 relative"
      style={{
        background: "linear-gradient(135deg, #4B183B 0%, #7B294E 100%)",
      }}
    >
      {/* Confetti Canvas */}
      {showConfetti && (
        <Confetti />
      )}

      {/* Toast Message */}
      {toast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-[color:var(--gold)] text-black px-8 py-4 rounded-xl shadow-lg font-semibold text-lg transition-all">
          {toast}
        </div>
      )}

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Left: Video */}
        <div className="flex justify-center items-center">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[color:var(--gold)] bg-black/70 flex items-center"
            style={{ height: formHeight }}
          >
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              loop
              muted
              playsInline
              width="700"
              height={formHeight}
              className="object-cover w-full h-full"
              poster="https://images.pexels.com/videos/3184292/free-video-3184292.jpg"
              style={{ minWidth: 350, minHeight: 250 }}
            />
          </div>
        </div>

        {/* Right: Contact Form */}
        <form
          ref={formRef}
          onSubmit={submit}
          className="card grid gap-5 bg-black/60 rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-4xl font-extrabold text-[color:var(--gold)] mb-4 drop-shadow-lg text-center tracking-wide">
            Get In Touch
          </h2>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="p-4 rounded-lg bg-[rgba(255,255,255,0.06)] text-white/90 font-medium border border-[color:var(--gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="p-4 rounded-lg bg-[rgba(255,255,255,0.06)] text-white/90 font-medium border border-[color:var(--gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            className="p-4 rounded-lg bg-[rgba(255,255,255,0.06)] text-white/90 font-medium border border-[color:var(--gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
          />
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows="5"
            placeholder="Message"
            className="p-4 rounded-lg bg-[rgba(255,255,255,0.06)] text-white/90 font-medium border border-[color:var(--gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
          />
          <div className="flex items-center gap-4 mt-2">
            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-[color:var(--gold)] font-bold text-black shadow-lg hover:bg-yellow-400 transition-all"
            >
              Send Message
            </button>
            <div className="text-sm text-white/80">
              {status === "sending" && "Sending..."}
              {status === "sent" && ""}
              {status === "error" && "Error — please try again later."}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

// Simple Confetti Canvas Component
function Confetti() {
  const confettiArray = Array.from({ length: 80 });
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <svg width="100vw" height="100vh" style={{ width: "100vw", height: "100vh" }}>
        {confettiArray.map((_, i) => {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          const r = 6 + Math.random() * 10;
          const colors = ["#FFD700", "#FF69B4", "#7B294E", "#4B183B", "#fff"];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={color}
              opacity={0.8}
            />
          );
        })}
      </svg>
    </div>
  );
}
