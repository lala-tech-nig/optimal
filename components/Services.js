"use client";
const SERVICES = [
	{
		title: "Management Systems Consultancy",
		desc: "Establishment, documentation, implementation and monitoring of ISO management systems (9001, 14001, 27001, 22301, etc.).",
		link: "https://www.iso.org",
		video: "https://www.w3schools.com/html/mov_bbb.mp4",
	},
	{
		title: "Fire & Life Safety Consultancy",
		desc: "Fire risk assessments, fire safety audits, civil defence approvals, fire engineering and emergency preparedness.",
		link: "https://www.qatarcivildefence.gov.qa",
		video: "https://www.w3schools.com/html/movie.mp4",
	},
];

export default function Services() {
	return (
		<section
			id="services"
			className="min-h-screen flex flex-col justify-center px-6 py-12"
			style={{
				background: "linear-gradient(135deg, #f7f7fa 0%, #e3e3e8 100%)",
			}}
		>
			<div className="max-w-5xl mx-auto w-full">
				<h2 className="text-5xl text-center font-extrabold text-[color:var(--gold)] mb-4 drop-shadow-lg tracking-wide">
					Our Core Services
				</h2>
				<p className="text-center mt-3 text-[color:#7B294E] text-lg max-w-2xl mx-auto font-medium">
					We provide consultancy and training services tailored to industry needs,
					with local knowledge and international standards alignment.
				</p>

				{/* Service 1: Video Left, Content Right */}
				<div className="mt-12 grid md:grid-cols-2 gap-10 items-center bg-white/70 rounded-2xl shadow-lg p-6">
					<div className="flex justify-center items-center">
						<div className="rounded-2xl overflow-hidden shadow-xl border-4 border-[color:var(--gold)] bg-black/70">
							<video
								src={SERVICES[0].video}
								autoPlay
								loop
								muted
								playsInline
								width="500"
								height="350"
								className="object-cover w-[400px] h-[260px] md:w-[500px] md:h-[350px]"
								poster="https://images.pexels.com/videos/3184292/free-video-3184292.jpg"
							/>
						</div>
					</div>
					<div className="flex flex-col justify-center items-start px-2">
						<h3 className="text-2xl font-bold text-[color:#7B294E] mb-3">
							{SERVICES[0].title}
						</h3>
						<p className="text-gray-700 text-base mb-6">
							{SERVICES[0].desc}
						</p>
						<a
							href={SERVICES[0].link}
							target="_blank"
							rel="noreferrer"
							className="px-6 py-2 rounded-full bg-[color:var(--gold)] text-black font-bold shadow hover:bg-yellow-400 transition-all"
						>
							Know More
						</a>
					</div>
				</div>

				{/* Service 2: Content Left, Video Right */}
				<div className="mt-12 grid md:grid-cols-2 gap-10 items-center bg-white/70 rounded-2xl shadow-lg p-6">
					<div className="flex flex-col justify-center items-start px-2 order-2 md:order-1">
						<h3 className="text-2xl font-bold text-[color:#7B294E] mb-3">
							{SERVICES[1].title}
						</h3>
						<p className="text-gray-700 text-base mb-6">
							{SERVICES[1].desc}
						</p>
						<a
							href={SERVICES[1].link}
							target="_blank"
							rel="noreferrer"
							className="px-6 py-2 rounded-full bg-[color:var(--gold)] text-black font-bold shadow hover:bg-yellow-400 transition-all"
						>
							Know More
						</a>
					</div>
					<div className="flex justify-center items-center order-1 md:order-2">
						<div className="rounded-2xl overflow-hidden shadow-xl border-4 border-[color:var(--gold)] bg-black/70">
							<video
								src={SERVICES[1].video}
								autoPlay
								loop
								muted
								playsInline
								width="500"
								height="350"
								className="object-cover w-[400px] h-[260px] md:w-[500px] md:h-[350px]"
								poster="https://images.pexels.com/videos/3184292/free-video-3184292.jpg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
