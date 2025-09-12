"use client";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6"
      style={{
        background: "linear-gradient(135deg, #f7f7fa 0%, #e3e3e8 100%)", // Elegant gradient gray
      }}
    >
      {/* Top: Centered Heading and Paragraph */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-5xl font-extrabold text-[color:var(--gold)] mb-6 drop-shadow-lg">
          About Optimal Management Consultancy
        </h2>
        <p className="mb-4 text-lg text-[#7B294E]">
          Optimal Management Consultancy (OMC) helps organisations uplift
          operational standards to comply with international standards,
          enabling competitiveness and accreditation in their sectors. We
          support both local and international clients with documentation,
          training, implementation and monitoring of management systems in
          English and Arabic.
        </p>
      </div>

      {/* Bottom: Video (left) and Mission/Vision (right) */}
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Video */}
        <div className="flex justify-center items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#7B294E] bg-black/70">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              loop
              muted
              playsInline
              width="800"
              height="500"
              className="object-cover"
              poster="https://images.pexels.com/videos/3184292/free-video-3184292.jpg"
            />
          </div>
        </div>

        {/* Right: Mission & Vision Table */}
        <div className="flex flex-col gap-8">
          <div>
            <table className="w-full text-left rounded-lg overflow-hidden shadow-lg bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-4 text-[color:var(--gold)] text-2xl font-extrabold bg-white border-b border-gray-200 tracking-wide">
                    Mission
                  </th>
                  <th className="px-4 py-4 text-[color:var(--gold)] text-2xl font-extrabold bg-white border-b border-gray-200 tracking-wide">
                    Vision
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-6 text-[#7B294E] font-semibold text-lg border-r border-gray-200 align-top leading-relaxed">
                    We enhance our clients’ success by improving corporate value,
                    caring for people and delivering measurable results through
                    innovation.
                  </td>
                  <td className="px-4 py-6 text-[#7B294E] font-semibold text-lg align-top leading-relaxed">
                    To gain client confidence through unmatched consulting
                    services — Qatari in origin, global in scope.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div>
            <div className="p-4 rounded-lg bg-black/40 shadow-md">
              <h3 className="font-semibold text-[color:var(--gold)] text-lg mb-2">
                Approach
              </h3>
              <p className="text-[#7B294E] text-base">
                Practical, tailored solutions with compliance to local (Qatar
                Civil Defence) and international standards.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
