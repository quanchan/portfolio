import {
	SiAstro,
	SiDocker,
	SiFramer,
	SiGit,
	SiJest,
	SiMongodb,
	SiNodedotjs,
	SiPostgresql,
	SiReact,
	SiPython,
	SiRedis,
	SiTypescript
} from 'react-icons/si';
import type { IconType } from 'react-icons';

type StackItem = {
	name: string;
	icon: IconType;
};

const stackItems: StackItem[] = [
	{ name: 'TypeScript', icon: SiTypescript },
	{ name: 'React', icon: SiReact },
	{ name: 'Node.js', icon: SiNodedotjs },
	{ name: 'Python', icon: SiPython },
	{ name: 'PostgreSQL', icon: SiPostgresql },
	{ name: 'MongoDB', icon: SiMongodb },
	{ name: 'Redis', icon: SiRedis },
	{ name: 'Docker', icon: SiDocker },
	{ name: 'Jest', icon: SiJest },
	{ name: 'Git', icon: SiGit },

];

export default function TechStackSection() {
	return (
		<div>
			<h2 className="section-title">Tech Stack</h2>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{stackItems.map((item) => (
					<div
						key={item.name}
						className="group rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:border-white/40"
					>
						<div className="flex items-center gap-4">
							<item.icon
								className="h-8 w-8 text-white grayscale transition duration-300 group-hover:grayscale-0"
								aria-hidden="true"
							/>
							<p className="text-base font-medium text-neutral-100">{item.name}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}