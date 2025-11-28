"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const trustPoints = [
  "Proven track record with local and international clients",
  "Deep expertise in global standards & management systems",
  "Training delivered by certified, industry-seasoned experts",
  "Practical, tailored & impact-driven solutions",
  "Support available in both English and Arabic",
];

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen py-24 px-6 bg-gradient-to-br from-[#f8f8fb] to-[#e3e3ea]"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-[color:var(--gold)] drop-shadow-xl tracking-tight">
          Optimal Management Consultancy
        </h2>
        <p className="mt-6 text-lg md:text-xl text-[#7B294E] leading-relaxed font-medium">
          At OMC, we empower organisations to achieve operational excellence,
          comply with international standards, and elevate their competitiveness
          through world-class management consulting and high-impact professional
          trainings.
        </p>
      </motion.div>

      {/* PHILOSOPHY + MISSION/VISION (SIDE BY SIDE) */}
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* OUR PHILOSOPHY */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
        >
          <h3 className="text-3xl font-bold text-[color:var(--gold)] mb-4">
            Our Philosophy
          </h3>
          <p className="text-[#7B294E] text-lg leading-relaxed font-medium">
            Excellence isn’t accidental — it is engineered through structure,
            clarity, capacity, and accountability. We design solutions that
            enable organisations to exceed standards consistently and confidently.
          </p>
        </motion.div>

        {/* MISSION & VISION */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200"
        >
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FFF6E5]">
                <th className="px-6 py-4 text-[color:var(--gold)] text-2xl font-extrabold border-b border-gray-200">
                  Mission
                </th>
                <th className="px-6 py-4 text-[color:var(--gold)] text-2xl font-extrabold border-b border-gray-200">
                  Vision
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-6 text-[#7B294E] text-lg font-semibold border-r border-gray-200 leading-relaxed">
                  To empower organisations by enhancing corporate value,
                  strengthening people performance, and delivering innovative
                  solutions that generate measurable, lasting impact.
                </td>
                <td className="px-6 py-6 text-[#7B294E] text-lg font-semibold leading-relaxed">
                  To be the most trusted consulting powerhouse from Qatar to the
                  world — renowned for excellence, reliability, and transformative
                  expertise.
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      {/* VIDEO + WHY TRUST (SIDE BY SIDE) */}
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* VIDEO */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[color:var(--gold)] bg-black/70"
        >
          <video
            src="/mission.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
            poster="https://images.pexels.com/videos/3184292/free-video-3184292.jpg"
          />
        </motion.div>

        {/* WHY ORGANISATIONS TRUST US */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#FFF6E5] p-8 rounded-3xl shadow-lg border border-[color:var(--gold)]/20 flex flex-col gap-6"
        >
          <h3 className="text-3xl font-bold text-[color:var(--gold)] mb-6">
            Why Organisations Trust OMC
          </h3>
          <div className="grid md:grid-cols-1 gap-4">
            {trustPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="text-[color:var(--gold)] mt-1" />
                <p className="text-[#7B294E] text-lg font-medium">{point}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
