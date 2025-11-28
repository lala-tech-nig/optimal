"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SERVICES = [
  {
    id: 1,
    title: "Management Consultancy",
    desc: "We help organisations engineer excellence, achieve international compliance, and optimize operations. Our tailored solutions boost efficiency, strengthen teams, and ensure lasting measurable impact across industries.",
    video: "/management.mp4",
  },
  {
    id: 2,
    title: "Professional Trainings",
    desc: "Upskill your workforce with high-impact, certified trainings delivered by industry experts. Our programs empower teams, unlock potential, and drive transformative results that align with global best practices.",
    video: "/training.mp4",
  },
];

export default function Services() {
  const router = useRouter();

  const handleLearnMore = (id) => {
    if (id === 1) {
      router.push("/services/management");
    } else if (id === 2) {
      router.push("/services/training");
    }
  };

  return (
    <section
      id="services"
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
          Our Core Services
        </h2>
        <p className="mt-6 text-lg md:text-xl text-[#7B294E] leading-relaxed font-medium">
          We deliver world-class consulting and training solutions that empower
          organisations and individuals to excel in a competitive global
          landscape. Only the best, tailored for your success.
        </p>
      </motion.div>

      {/* SERVICES */}
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2 gap-10 items-center bg-white/80 rounded-3xl shadow-2xl p-6 border border-[color:var(--gold)]/20 ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* VIDEO */}
            <div className="flex justify-center items-center">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[color:var(--gold)] bg-black/70">
                <video
                  src={service.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-[400px] h-[260px] md:w-[500px] md:h-[350px]"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="flex flex-col justify-center items-start px-2">
              <h3 className="text-3xl md:text-4xl font-extrabold text-[color:#7B294E] mb-4">
                {service.title}
              </h3>
              <p className="text-[#7B294E] text-lg md:text-xl leading-relaxed font-medium mb-6">
                {service.desc}
              </p>
              <button
                onClick={() => handleLearnMore(service.id)}
                className="px-6 py-3 rounded-full bg-[color:var(--gold)] text-black font-bold shadow-lg hover:bg-[#7B294E] hover:text-white transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
