"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

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
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
    setTimeout(() => setStatus(null), 3500);
  };

  return (
    <section id="contact" className="h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold text-[color:var(--gold)]">Contact & Office</h2>
          <p className="mt-3 text-white/85">
            For enquiries, training bookings or consultancy, reach us via the form or the details below. 
            We provide bilingual (English / Arabic) services and in-house training as required.
          </p>

          <div className="mt-4 text-white/80">
            <p><strong>Email:</strong> info@optimalqatar.com</p>
            <p className="mt-2"><strong>Phone:</strong> +974 0000 0000 (placeholder)</p>
            <p className="mt-2">
              <strong>Website:</strong>{" "}
              <a
                href="https://www.optimalqatar.com"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                optimalqatar.com
              </a>
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="card grid gap-3">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="p-3 rounded-lg bg-[rgba(255,255,255,0.02)]"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="p-3 rounded-lg bg-[rgba(255,255,255,0.02)]"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            className="p-3 rounded-lg bg-[rgba(255,255,255,0.02)]"
          />
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows="5"
            placeholder="Message"
            className="p-3 rounded-lg bg-[rgba(255,255,255,0.02)]"
          />
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="px-5 py-3 rounded-full bg-[color:var(--gold)] font-semibold"
            >
              Send Message
            </button>
            <div className="text-sm">
              {status === "sending" && "Sending..."}
              {status === "sent" && "Sent — we'll respond shortly."}
              {status === "error" && "Error — please try again later."}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
