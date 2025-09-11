"use client";
export default function About() {
  return (
    <section id="about" className="h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl card text-center">
        <h2 className="text-3xl font-bold text-[color:var(--gold)]">
          About Optimal Management Consultancy
        </h2>

        <p className="mt-4 text-white/90">
          Optimal Management Consultancy (OMC) helps organisations uplift operational standards to comply with international standards, enabling competitiveness and accreditation in their sectors. We support both local and international clients with documentation, training, implementation and monitoring of management systems in English and Arabic.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-black/40">
            <h3 className="font-semibold">Mission</h3>
            <p className="text-sm mt-2 text-white/80">
              We enhance our clients’ success by improving corporate value, caring for people and delivering measurable results through innovation.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-black/40">
            <h3 className="font-semibold">Vision</h3>
            <p className="text-sm mt-2 text-white/80">
              To gain client confidence through unmatched consulting services — Qatari in origin, global in scope.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-black/40">
            <h3 className="font-semibold">Approach</h3>
            <p className="text-sm mt-2 text-white/80">
              Practical, tailored solutions with compliance to local (Qatar Civil Defence) and international standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
