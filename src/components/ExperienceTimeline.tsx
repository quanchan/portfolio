import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const experiences = [
{
year: 'NOW',
role: 'Software Engineer',
company: 'WiseTech Global',
type: 'Full-Time',
description:
'Re-architected core framework flows, resolved 30+ production defects, delivered 20+ framework enhancements, and migrated 70+ files to TypeScript with ~30% fewer runtime type errors.'
},
{
year: '2023',
role: 'Technical Founder',
company: 'Datawise',
type: 'Startup',
description:
'Built a configurable database generation platform with multi-table constraints, 60+ PostgreSQL data types, vendor-specific SQL adapters, and Docker-based deployment.'
},
{
year: '2020',
role: 'Part-Time Software Engineer',
company: 'BENIT PTY LTD',
type: 'Part-Time',
description:
'Delivered full-stack outsourcing solutions, refactored 50+ React components to TypeScript, optimised PostgreSQL systems by ~35%, and managed 20+ AWS EC2 instances.'
}
];

const fadeViewport = { once: false, margin: '0px 0px -12% 0px' };

export default function ExperienceTimeline() {
const timelineRef = useRef<HTMLDivElement>(null);

const { scrollYProgress } = useScroll({
target: timelineRef,
offset: ['start 85%', 'end 15%']
});

const rawHeight = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });
const lineHeight = useTransform(rawHeight, [0, 1], ['0%', '100%']);
const dotY = useTransform(rawHeight, [0, 1], ['0%', '100%']);

return (
<div>
{/* Heading */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="mb-16 text-center"
>
<h2 className="bg-gradient-to-b from-white to-purple-600 bg-clip-text text-5xl font-light leading-[1.1] tracking-tight text-transparent md:text-6xl">
My career &amp;<br />experience
</h2>
</motion.div>

{/* Timeline */}
<div ref={timelineRef} className="relative">
{/* Track line */}
<div
className="absolute left-5 top-0 h-full w-px translate-x-0 bg-neutral-800 md:left-1/2 md:-translate-x-1/2"
aria-hidden="true"
/>

{/* Animated fill line */}
<motion.div
className="absolute left-5 top-0 w-px origin-top translate-x-0 bg-gradient-to-b from-white via-purple-400 to-purple-600 md:left-1/2 md:-translate-x-1/2"
style={{ height: lineHeight }}
aria-hidden="true"
/>

{/* Glowing dot */}
<motion.div
className="absolute left-5 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400 shadow-[0_0_28px_10px_rgba(192,132,252,0.85)] md:left-1/2"
style={{ top: dotY }}
aria-hidden="true"
/>

{/* Rows */}
{experiences.map((item) => (
<div
key={item.year}
className="py-14 pl-12 md:grid md:grid-cols-[1fr_9rem_1fr] md:items-center md:pl-0 md:py-20"
>
{/* On mobile: flex row with role left + year right.
    On desktop: md:contents dissolves this wrapper so both
    children become direct grid columns 1 and 2. */}
<div className="flex items-start justify-between md:contents">
{/* Col 1  role + company */}
<motion.div
initial={{ opacity: 0, x: -16 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={fadeViewport}
transition={{ duration: 0.5 }}
className="flex-1 md:pr-16"
>
<h3 className="text-xl font-semibold leading-snug text-white md:text-2xl">{item.role}</h3>
<p className="mt-1 text-sm font-medium text-purple-400">{item.company}</p>
<p className="text-xs text-neutral-500">{item.type}</p>
</motion.div>

{/* Col 2  year */}
<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={fadeViewport}
transition={{ duration: 0.4 }}
className="relative z-20 ml-4 shrink-0 md:ml-0 md:flex md:items-center md:justify-center"
>
<span className="text-4xl font-bold tabular-nums text-white md:text-5xl">{item.year}</span>
</motion.div>
</div>

{/* Col 3  description (full-width on mobile, right col on desktop) */}
<motion.div
initial={{ opacity: 0, x: 16 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={fadeViewport}
transition={{ duration: 0.5 }}
className="mt-3 md:mt-0 md:pl-16"
>
<p className="text-sm leading-relaxed text-neutral-400 md:text-base">{item.description}</p>
</motion.div>
</div>
))}
</div>
</div>
);
}