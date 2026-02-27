import { motion } from 'framer-motion';

const experiences = [
	{
		period: 'Aug 2022 — Present',
		role: 'Software Engineer',
		company: 'WiseTech Global',
		highlights:
			'Re-architected core framework flows, resolved 30+ production defects, delivered 20+ framework enhancements, and migrated 70+ files to TypeScript with ~30% fewer runtime type errors.'
	},
	{
		period: 'Mar 2023 — Oct 2023',
		role: 'Technical Founder',
		company: 'Datawise',
		highlights:
			'Built a configurable database generation platform with multi-table constraints, 60+ PostgreSQL data types, vendor-specific SQL adapters, and Docker-based deployment.'
	},
	{
		period: 'Nov 2020 — May 2022',
		role: 'Part-Time Software Engineer',
		company: 'BENIT PTY LTD',
		highlights:
			'Delivered full-stack outsourcing solutions, refactored 50+ React components to TypeScript, optimized PostgreSQL systems by ~35%, and managed 20+ AWS EC2 instances.'
	}
];

export default function ExperienceTimeline() {
	return (
		<div>
			<h2 className="section-title">My Career & Experience</h2>
			<div className="relative mt-10 pl-8">
				<div className="absolute left-2 top-1 h-[calc(100%-0.5rem)] w-px bg-neutral-700" aria-hidden="true" />
				<div className="space-y-8">
					{experiences.map((item, index) => (
						<motion.article
							key={item.role}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.45, delay: index * 0.1 }}
							className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
						>
							<div
								className="absolute -left-[2.1rem] top-7 h-3 w-3 rounded-full border border-neutral-500 bg-neutral-900"
								aria-hidden="true"
							/>
							<p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{item.period}</p>
							<h3 className="mt-2 text-xl font-semibold text-white">{item.role}</h3>
							<p className="mt-1 text-neutral-300">{item.company}</p>
							<p className="mt-4 leading-relaxed text-neutral-300">{item.highlights}</p>
						</motion.article>
					))}
				</div>
			</div>
		</div>
	);
}