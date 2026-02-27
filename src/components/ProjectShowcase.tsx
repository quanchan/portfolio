import {
	SiChakraui,
	SiDocker,
	SiNextdotjs,
	SiNodedotjs,
	SiOracle,
	SiPostgresql,
	SiReact,
	SiTypescript
} from 'react-icons/si';
import type { IconType } from 'react-icons';

type Project = {
	title: string;
	description: string;
	tech: { name: string; icon: IconType }[];
	background: string;
	preview: string;
};

const projects: Project[] = [
	{
		title: 'Code-Driven Form Flow Engine',
		description:
			'Re-architected a core YAML-based flow engine at WiseTech Global into a code-driven workflow with zero regression defects, improving flexibility and long-term maintainability for 20+ internal teams.',
		tech: [
			{ name: 'TypeScript', icon: SiTypescript },
			{ name: 'Node.js', icon: SiNodedotjs },
			{ name: 'React', icon: SiReact }
		],
		background: 'bg-slate-900',
		preview: 'Framework engine redesign, migration strategy, and zero-regression rollout'
	},
	{
		title: 'Datawise SQL Generation Platform',
		description:
			'Founded and built a configurable database generation platform supporting multi-table schemas, 60+ data types, and relational constraints with cross-vendor SQL output.',
		tech: [
			{ name: 'Next.js', icon: SiNextdotjs },
			{ name: 'Chakra UI', icon: SiChakraui },
			{ name: 'PostgreSQL', icon: SiPostgresql },
			{ name: 'Oracle', icon: SiOracle },
			{ name: 'Docker', icon: SiDocker }
		],
		background: 'bg-slate-800',
		preview: 'Schema modeling, SQL parser validation, and containerized data generation workflows'
	},
	{
		title: 'AI-Accelerated Developer Enablement',
		description:
			'Built reusable AI engineering assets (prompts, skill libraries, MCP server integrations, Copilot Spaces, and CLI tooling) to support analysis, refactoring, migration, and validation in a ~10M+ LOC ecosystem.',
		tech: [
			{ name: 'TypeScript', icon: SiTypescript },
			{ name: 'Node.js', icon: SiNodedotjs },
			{ name: 'React', icon: SiReact }
		],
		background: 'bg-gray-900',
		preview: 'Agent orchestration and automation toolkit that doubled productivity for 200+ developers'
	}
];

export default function ProjectShowcase() {
	return (
		<div className="space-y-8">
			<h2 className="section-title">Selected Projects</h2>
			{projects.map((project) => (
				<article
					key={project.title}
					className={`${project.background} grid gap-8 rounded-3xl border border-white/10 p-6 md:grid-cols-2 md:gap-12 md:p-10`}
				>
					<div className="flex flex-col justify-center">
						<h3 className="text-2xl font-semibold text-white md:text-3xl">{project.title}</h3>
						<p className="mt-4 max-w-xl leading-relaxed text-neutral-300">{project.description}</p>
						<div className="mt-6 flex flex-wrap gap-3">
							{project.tech.map((item) => (
								<span
									key={item.name}
									className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-neutral-100"
								>
									<item.icon className="h-4 w-4" aria-hidden="true" />
									{item.name}
								</span>
							))}
						</div>
					</div>
					<div className="flex items-center justify-center">
						<div className="flex h-56 w-full items-center justify-center rounded-2xl border border-white/15 bg-black/25 p-6 text-center text-sm text-neutral-300 md:h-72">
							{project.preview}
						</div>
					</div>
				</article>
			))}
		</div>
	);
}