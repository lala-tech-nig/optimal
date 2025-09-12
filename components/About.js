"use client";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="h-screen flex items-center justify-center px-6 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <motion.div
        className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center card"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left: Text Content */}
        <div>
          <motion.h2
            className="text-5xl font-extrabold text-[color:var(--gold)] mb-6 drop-shadow-lg"
            variants={itemVariants}
          >
            About Optimal Management Consultancy
          </motion.h2>

          <motion.p
            className="mb-8 text-lg text-white/90"
            variants={itemVariants}
          >
            Optimal Management Consultancy (OMC) helps organisations uplift
            operational standards to comply with international standards,
            enabling competitiveness and accreditation in their sectors. We
            support both local and international clients with documentation,
            training, implementation and monitoring of management systems in
            English and Arabic.
          </motion.p>

          <motion.div variants={itemVariants}>
            <table className="w-full text-left rounded-lg overflow-hidden shadow-lg bg-black/40">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-[color:var(--gold)] text-xl font-semibold bg-black/60">
                    Mission
                  </th>
                  <th className="px-4 py-3 text-[color:var(--gold)] text-xl font-semibold bg-black/60">
                    Vision
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-4 text-white/80 border-r border-white/10 align-top">
                    We enhance our clients’ success by improving corporate value,
                    caring for people and delivering measurable results through
                    innovation.
                  </td>
                  <td className="px-4 py-4 text-white/80 align-top">
                    To gain client confidence through unmatched consulting
                    services — Qatari in origin, global in scope.
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          <motion.div className="mt-8" variants={itemVariants}>
            <div className="p-4 rounded-lg bg-black/40 shadow-md">
              <h3 className="font-semibold text-[color:var(--gold)] text-lg mb-2">
                Approach
              </h3>
              <p className="text-white/80 text-base">
                Practical, tailored solutions with compliance to local (Qatar
                Civil Defence) and international standards.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Video */}
        <motion.div
          className="flex justify-center items-center"
          variants={itemVariants}
        >
          <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-[color:var(--gold)] bg-black/70">
            <video
              src="https://player.vimeo.com/external/449973934.sd.mp4?s=6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e&profile_id=164&oauth2_token_id=57447761"
              autoPlay
              loop
              muted
              playsInline
              className="w-[400px] h-[300px] object-cover"
              poster="https://images.pexels.com/videos/3184292/free-video-3184292.jpg"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
