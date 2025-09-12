"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Example event gallery data
const EVENTS = [
	{
		title: "Annual Leadership Summit",
		description: "Highlights from our annual summit with industry leaders.",
		cover: "/training1.jpg",
		images: [
			"/training2.jpg",
			"/training3.jpg",
			"/training4.jpg",
			"/training5.jpg",
		]
	},
	{
		title: "Team Building Retreat",
		description: "A glimpse into our fun and productive team retreat.",
		cover: "/training6.jpg",
		images: [
			"/training7.jpg",
			"/training8.jpg",
			"/training9.jpg",
			"/training10.jpg",
			"/training11.jpg",
			"/training12.jpg",
			"/training13.jpg",
		]
	},
	{
		title: "Client Workshop",
		description: "Snapshots from our interactive client workshop.",
		cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80"
		]
	},
	{
		title: "Strategy Session",
		description: "Moments from our strategic planning session.",
		cover: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1400&q=80",
			"https://images.unsplash.com/photo-1465101178521-c1a0725c397b?auto=format&fit=crop&w=1400&q=80"
		]
	},
	{
		title: "Innovation Workshop",
		description: "Creative ideas and teamwork in action.",
		cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
			"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80"
		]
	},
	{
		title: "Awards Night",
		description: "Celebrating achievements and milestones.",
		cover: "https://images.unsplash.com/photo-1515165562835-cf7747b6c9df?auto=format&fit=crop&w=800&q=80",
		images: [
			"https://images.unsplash.com/photo-1515165562835-cf7747b6c9df?auto=format&fit=crop&w=1400&q=80"
		]
	}
];

export default function Gallery() {
	const [openEvent, setOpenEvent] = useState(null);
	const [openImageIdx, setOpenImageIdx] = useState(0);
	const router = useRouter();

	return (
		<section
			id="gallery"
			className="min-h-screen flex flex-col items-center justify-center px-6"
			style={{
				background: "linear-gradient(135deg, #f7f7fa 0%, #e3e3e8 100%)"
			}}
		>
			<div className="max-w-6xl mx-auto w-full mt-8">
				<h2 className="text-5xl text-center font-extrabold text-[color:var(--gold)] mb-4 drop-shadow-lg">
					Event Gallery
				</h2>
				<p className="text-center text-[#7B294E] mb-8 text-lg">
					Browse our events and explore memorable moments from each occasion.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{EVENTS.slice(0, 6).map((event, i) => (
						<div
							key={i}
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
				<div className="flex justify-center mt-8 mb-8">
					<button
						className="px-8 py-3 rounded-full bg-[color:var(--gold)] text-black font-bold shadow-lg hover:bg-yellow-400 transition-all text-lg"
						onClick={() => router.push("/gallery")}
					>
						View More
					</button>
				</div>
			</div>

			{/* Modal for Event Images */}
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
