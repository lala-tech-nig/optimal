"use client";
import { useState, useEffect } from "react";

const GALLERY = [
  "https://images.unsplash.com/photo-1555992336-03a23c2c6f60?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1581092795361-1b5fa4b7f42d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80"
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (openIndex === null) return;
      if (e.key === "ArrowRight") setOpenIndex(i => Math.min(i + 1, GALLERY.length - 1));
      if (e.key === "ArrowLeft") setOpenIndex(i => Math.max(i - 1, 0));
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <section id="gallery" className="h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-center font-bold text-[color:var(--gold)]">Gallery</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {GALLERY.map((src, i) => (
            <div key={i} className="rounded-lg overflow-hidden cursor-pointer" onClick={() => setOpenIndex(i)}>
              <img src={src} alt={`gallery-${i}`} className="w-full h-64 object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6">
          <div className="max-w-5xl w-full">
            <button onClick={() => setOpenIndex(null)} className="mb-4 px-3 py-2 rounded-md btn-outline">Close</button>
            <div className="bg-black/60 rounded-lg overflow-hidden">
              <img src={GALLERY[openIndex]} alt="large" className="w-full h-[60vh] object-contain bg-black" />
            </div>

            <div className="mt-3 flex gap-3 overflow-x-auto py-2">
              {GALLERY.map((s, idx) => (
                <div key={idx} className={`min-w-[120px] h-20 rounded overflow-hidden cursor-pointer ${idx === openIndex ? "ring-2 ring-[color:var(--gold)]" : ""}`} onClick={() => setOpenIndex(idx)}>
                  <img src={s} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
