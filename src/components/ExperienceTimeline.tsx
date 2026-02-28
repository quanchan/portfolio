import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const experiences = [
  {
    from: 'Aug 2022',
    to: 'Present',
    role: 'Software Engineer',
    company: 'WiseTech Global',
    type: 'Full-Time',
    description:
      'High impact mid-level engineer on the Developer Experience team, enabling web development across 20+ internal teams. Re-architected a YAML-based form flow engine with zero regression defects, resolved 30+ production bugs, and delivered 20+ framework enhancements. Led migration of 70+ JavaScript files to TypeScript (~30% fewer runtime errors), mentored 5+ engineers, and drove AI-assisted workflows across a 10M+ LOC codebase improving productivity by 2x for 200+ developers.',
  },
  {
    from: 'Mar 2023',
    to: 'Oct 2023',
    role: 'Technical Founder',
    company: 'Datawise',
    type: 'Startup',
    description:
      'Conceived and built a configurable database generation platform supporting multi-table schemas and complex relational constraints. Designed the full stack with Next.js, React, and Chakra UI; modelled 60+ PostgreSQL data types; built extensible SQL adapters for MySQL, Oracle, and PostgreSQL; enforced relational integrity via custom parsers; and containerised the app with Docker Compose. Led a team of 5 across planning, reviews, and delivery.',
  },
  {
    from: 'Nov 2020',
    to: 'May 2022',
    role: 'Part-Time Software Engineer',
    company: 'BENIT PTY LTD',
    type: 'Part-Time',
    description:
      'Delivered full-stack outsourcing projects using React, Next.js, and React Native. Refactored 50+ components from JavaScript to TypeScript, designed auth/authorisation services, and maintained Java Spring, NestJS, and Express microservices. Optimised PostgreSQL systems by ~35%, designed MongoDB schemas across 10+ domains, managed 20+ AWS EC2 instances, and integrated third-party APIs including Google Ads, payment gateways, and Amazon S3.',
  },
];

const fadeViewport = { once: false, margin: '0px 0px -12% 0px' };

export default function ExperienceTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 15%'],
  });

  const rawHeight = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });
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
        <h2
          className="bg-gradient-to-b from-white to-purple-600 bg-clip-text
            text-5xl leading-[1.1] tracking-tight text-transparent md:text-6xl"
        >
          My career &amp;
          <br />
          experience
        </h2>
      </motion.div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Track line */}
        <div
          className="absolute top-0 left-5 h-full w-px translate-x-0
            bg-neutral-800 md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />

        {/* Animated fill line */}
        <motion.div
          className="absolute top-0 left-5 w-px origin-top translate-x-0
            bg-gradient-to-b from-white via-purple-400 to-purple-600 md:left-1/2
            md:-translate-x-1/2"
          style={{ height: lineHeight }}
          aria-hidden="true"
        />

        {/* Glowing dot */}
        <motion.div
          className="absolute left-5 z-10 h-3 w-3 -translate-x-1/2
            -translate-y-1/2 rounded-full bg-purple-400
            shadow-[0_0_28px_10px_rgba(192,132,252,0.85)] md:left-1/2"
          style={{ top: dotY }}
          aria-hidden="true"
        />
        {/* Rows */}
        {experiences.map((item) => (
          <motion.div
            key={item.from}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={fadeViewport}
            transition={{ duration: 0.5 }}
            className="py-14 pl-12 md:grid md:grid-cols-[1fr_9rem_1fr]
              md:items-center md:py-20 md:pl-0"
          >
            {/* On mobile: flex row with role left + year right.
    On desktop: md:contents dissolves this wrapper so both
    children become direct grid columns 1 and 2. */}
            <div className="flex items-start justify-between md:contents">
              {/* Col 1 - role + company */}
              <div className="flex-1 md:pr-16">
                <h3
                  className="text-xl leading-snug font-semibold text-white
                    md:text-2xl"
                >
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-purple-400">
                  {item.company}
                </p>
                <p className="text-xs text-neutral-500">{item.type}</p>
              </div>

              {/* Col 2 - date range */}
              <div
                className="relative z-20 ml-4 shrink-0 md:ml-0 md:flex
                  md:items-center md:justify-center"
              >
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <span
                    className="text-base font-semibold text-white tabular-nums
                      md:text-xl"
                  >
                    {item.to}
                  </span>
                  <span className="text-xs text-neutral-500"></span>
                  <span
                    className="text-base font-bold text-purple-400 tabular-nums
                      md:text-xl"
                  >
                    {item.from}
                  </span>
                </div>
              </div>
            </div>

            {/* Col 3 - description (full-width on mobile, right col on desktop) */}
            <div className="mt-3 md:mt-0 md:pl-16">
              <p
                className="text-sm leading-relaxed text-neutral-400
                  md:text-base"
              >
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
