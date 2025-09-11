"use client";
const SERVICES = [
  {
    title: "Management Systems Consultancy",
    desc: "Establishment, documentation, implementation and monitoring of ISO management systems (9001, 14001, 27001, 22301, etc.).",
    link: "https://www.iso.org"
  },
  {
    title: "Fire & Life Safety Consultancy",
    desc: "Fire risk assessments, fire safety audits, civil defence approvals, fire engineering and emergency preparedness.",
    link: "https://www.qatarcivildefence.gov.qa"
  },
  {
    title: "Professional & Technical Trainings",
    desc: "Accredited courses: NEBOSH, IOSH, PMP, Lead Auditor, and customized in-house programs in Arabic and English.",
    link: "https://www.optimalqatar.com"
  }
];

export default function Services() {
  return (
    <section id="services" className="h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-center font-bold text-[color:var(--gold)]">
          Our Core Services
        </h2>
        <p className="text-center mt-3 text-white/80 max-w-2xl mx-auto">
          We provide consultancy and training services tailored to industry needs, with local knowledge and international standards alignment.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={i} className="card p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-white/85">{s.desc}</p>
              </div>
              <div className="mt-6">
                <a
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 rounded-md border border-[color:var(--gold)] text-[color:var(--gold)]"
                >
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
