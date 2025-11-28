'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ for going back
import { ArrowLeft } from "lucide-react";    // ✅ nice icon (install lucide-react if not already)

const EVENTS = [
  {
    title: "Annual Leadership Summit jjjjjjj",
    description: "Highlights from our annual summit with industry leaders.",
    cover: "/training1.jpg",
    images: ["/training2.jpg", "/training3.jpg", "/training4.jpg", "/training5.jpg"]
  },
  {
    title: "Team Building Retreat",
    description: "A glimpse into our fun and productive team retreat.",
    cover: "/training6.jpg",
    images: ["/training7.jpg", "/training8.jpg", "/training9.jpg", "/training10.jpg"]
  },
  {
    title: "Client Workshop",
    description: "Snapshots from our interactive client workshop.",
    cover: "/collage1.jpg",
    images: ["/collage2.jpg", "/collage3.jpg", "/collage4.jpg"]
  },
  {
    title: "Strategy Session",
    description: "Moments from our strategic planning session.",
    cover: "collagethird1.jpg",
    images: ["collagethird2.jpg", "collagethird3.jpg", "collagethird4.jpg"]
  },
  {
    title: "Innovation Workshop",
    description: "Creative ideas and teamwork in action.",
    cover: "collagesecond1.jpg",
    images: ["collagesecond2.jpg", "collagesecond3.jpg", "collagesecond4.jpg"]
  },
  {
    title: "Awards Night",
    description: "Celebrating achievements and milestones.",
    cover: "trainingphoto1.jpg",
    images: ["trainingphoto2.jpg", "trainingphoto3.jpg", "trainingphoto4.jpg"]
  }
];

// Duplicate for demo
while (EVENTS.length < 24) {
  EVENTS.push({ ...EVENTS[EVENTS.length % 6], title: EVENTS[EVENTS.length % 6].title + " " + EVENTS.length });
}

const PAGE_SIZE = 12;

export default function FullGallery() {
  const [page, setPage] = useState(1);
  const [openEvent, setOpenEvent] = useState(null);
  const [openImageIdx, setOpenImageIdx] = useState(0);
  const router = useRouter(); // ✅ initialize router

  const totalPages = Math.ceil(EVENTS.length / PAGE_SIZE);
  const pageEvents = EVENTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section
      className="min-h-screen px-6 py-12 flex flex-col items-center relative"
      style={{
        background: "linear-gradient(135deg, #f7f7fa 0%, #e3e3e8 100%)"
      }}
    >
      {/* ✅ Back Arrow Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white text-[#7B294E] rounded-full shadow-lg hover:bg-[color:var(--gold)] hover:text-black transition-all font-bold"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h2 className="text-5xl text-center font-extrabold text-[color:var(--gold)] mb-8 drop-shadow-lg">
        Full Gallery
      </h2>

      {/* Gallery Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pageEvents.map((event, i) => (
          <div
            key={i + (page - 1) * PAGE_SIZE}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 border border-gray-200 flex flex-col"
            style={{ minHeight: "220px", maxWidth: "320px", margin: "0 auto" }}
            onClick={() => { setOpenEvent(event); setOpenImageIdx(0); }}
          >
            <img src={event.cover} alt={event.title} className="w-full h-40 object-cover" />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-[color:var(--gold)] mb-1">{event.title}</h3>
              <p className="text-[#7B294E] text-sm flex-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          className="px-4 py-2 rounded-full bg-[color:var(--gold)] text-[#7B294E] font-bold shadow hover:bg-[#7B294E] hover:text-[color:var(--gold)] transition"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded-full font-bold ${
              page === idx + 1
                ? "bg-[color:var(--gold)] text-[#7B294E] shadow"
                : "bg-white text-[color:var(--gold)] border border-[color:var(--gold)]"
            }`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded-full bg-[color:var(--gold)] text-[#7B294E] font-bold shadow hover:bg-[#7B294E] hover:text-[color:var(--gold)] transition"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {openEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2">
          <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row items-center p-8">
            <button
              onClick={() => setOpenEvent(null)}
              className="absolute top-6 right-6 px-4 py-2 bg-[color:var(--gold)] text-black rounded-full font-bold shadow hover:bg-yellow-400 transition-all"
            >
              Close
            </button>
            <div className="flex-1 flex flex-col items-center justify-center">
              <img
                src={openEvent.images[openImageIdx]}
                alt={`event-img-${openImageIdx}`}
                className="rounded-2xl object-contain bg-gray-100 max-h-[70vh] w-full mb-4"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
              />
              <div className="flex gap-3 overflow-x-auto py-2 justify-center">
                {openEvent.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`min-w-[70px] h-16 rounded-xl overflow-hidden cursor-pointer border-2 ${idx === openImageIdx ? "border-[color:var(--gold)]" : "border-gray-200"}`}
                    onClick={() => setOpenImageIdx(idx)}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 px-6">
              <h3 className="text-3xl font-bold text-[color:var(--gold)] mb-3">{openEvent.title}</h3>
              <p className="text-[#7B294E] mb-4 text-lg">{openEvent.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
