import { motion } from 'framer-motion';

export default function IntroHero() {
	return (
		<div className="relative z-10 w-full">
			<p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400">Software Engineer Portfolio</p>
			<motion.h1
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: 'easeOut' }}
				className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl"
			>
				ALAN TRAN
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
				className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 md:text-xl"
			>
				Full-Stack Software Engineer with 5+ years of experience delivering scalable web applications,
				developer frameworks, and AI-assisted engineering workflows across enterprise and startup teams.
			</motion.p>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className="mt-10 flex flex-wrap gap-4"
			>
				<a
					href="#projects"
					className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-200"
				>
					View Projects
				</a>
				<a
					href="#experience"
					className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 transition hover:border-neutral-500"
				>
					My Experience
				</a>
			</motion.div>
		</div>
	);
}