import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

// All photos are relay running and health-related — no cycling or skiing
const photos = [
	{
		src: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=75',
		alt: 'Thousands of runners in a community marathon',
		caption: 'A sea of runners — every age, every region.',
		span: 'sm:col-span-2 sm:row-span-2',
	},
	{
		src: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=800&q=75',
		alt: 'Group of friends running together outdoors',
		caption: 'Friends become teammates.',
	},
	{
		src: '/Relay/images/relay-kids.svg',
		alt: 'Children running joyfully in a community event',
		caption: 'Young hearts leading the way.',
	},
	{
		src: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=75',
		alt: 'Runner on an open road at sunrise',
		caption: 'Every morning is a new start.',
	},
	{
		src: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&w=800&q=75',
		alt: 'Runners at the start line of a relay race',
		caption: 'At the start line — heart racing!',
	},
	{
		src: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=800&q=75',
		alt: 'Community run participants',
		caption: 'Community bonds over kilometres.',
	},
	{
		src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=75',
		alt: 'Fitness and wellness activity outdoors',
		caption: 'Health is wealth — always.',
	},
];

// Placeholder for broken images
const PLACEHOLDER_SVG =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23888" font-size="18"%3EImage unavailable%3C/text%3E%3C/svg%3E';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;

  img.onerror = null; // important: stops infinite loop
  img.src = PLACEHOLDER_SVG;
};
export default function Gallery() {
	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const img = e.currentTarget;
		
		// Prevent infinite loop by checking if already tried fallback
		if (img.src === PLACEHOLDER_SVG || img.dataset.errorAttempted === 'true') {
			console.warn('Image failed to load, using placeholder:', img.alt);
			return;
		}
		
		// Mark that we've attempted the fallback
		img.dataset.errorAttempted = 'true';
		
		// Try with base path first
		const fallbackSrc = '/Relay/images/relay-community.svg';
		img.src = fallbackSrc;
	};

	return (
		<section
			id="gallery"
			className="relative py-20 sm:py-28 bg-[#080808]"
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				<div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-saffron-500/6 blur-[90px]" />
				<div className="absolute top-1/3 right-0 h-48 w-48 rounded-full bg-leaf-500/6 blur-[80px]" />
			</div>
			<div className="container-x">
				<div className="text-center max-w-3xl mx-auto">
					<span className="section-eyebrow">
						<Camera className="h-3.5 w-3.5" /> Gallery
					</span>
					<h2 className="section-title mt-4">
						See it. Feel it. Join it.
					</h2>
					<p className="mt-4 text-gray-400 text-lg">
						Real moments from relay routes — the energy, the smiles, the
						sweat, the finish lines.
					</p>
				</div>

				<div className="mt-12 grid grid-cols-2 sm:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4">
					{photos.map((p, i) => (
						<motion.figure
							key={p.src}
							initial={{ opacity: 0, scale: 0.94 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.5, delay: i * 0.06 }}
							whileHover={{ y: -6, scale: 1.02 }}
							className={`relative group overflow-hidden rounded-2xl border border-white/10 ${p.span ?? ''
								}`}
						>
							<img
								src={p.src}
								alt={p.alt}
								loading="lazy"
								className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
								onError={handleImageError}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
							{/* Hover glow ring */}
							<div className="absolute inset-0 ring-0 ring-saffron-500/0 group-hover:ring-1 group-hover:ring-saffron-500/40 rounded-2xl transition duration-500" />
							<figcaption className="absolute bottom-0 inset-x-0 p-3 text-white text-xs sm:text-sm font-semibold translate-y-1 group-hover:translate-y-0 transition duration-300">
								{p.caption}
							</figcaption>
						</motion.figure>
					))}
				</div>
			</div>
		</section>
	);
}
