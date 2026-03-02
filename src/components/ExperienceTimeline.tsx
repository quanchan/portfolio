import { useRef } from 'react';
import type React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const experiences: {
  from: string;
  to: string;
  role: string;
  company: string;
  type: string;
  description: React.ReactNode;
}[] = [
  {
    from: 'Aug 2022',
    to: 'Present',
    role: 'Software Engineer',
    company: 'WiseTech Global',
    type: 'Full-Time',
    description: (
      <>
        <p>
          I joined the Glow Developer Experience team with one mission: make it
          easier for{' '}
          <strong className="text-neutral-200">20+ product teams</strong> to
          build better software, faster.
        </p>
        <p>
          Over time, that evolved into becoming one of the internal voices
          pushing for{' '}
          <strong className="text-neutral-200">AI-assisted engineering</strong>{' '}
          , building agent orchestration workflows, MCP servers, and Copilot
          tooling that contributes to{' '}
          <strong className="text-neutral-200">
            2x productivity for 200+ developers
          </strong>{' '}
          across a{' '}
          <strong className="text-neutral-200">10M+ line codebase</strong>.
        </p>
        <p>
          Beyond the AI work, I re-architected core framework engines, led{' '}
          <strong className="text-neutral-200">
            TypeScript migrations that cut runtime errors by 30%
          </strong>
          , and{' '}
          <strong className="text-neutral-200">
            enhanced enterprise end-to-end JavaScript ecosystems
          </strong>{' '}
          spanning tooling, build infrastructure, test frameworks, and runtime
          environments.
        </p>
        <p>
          What I'm most proud of?{' '}
          <strong className="text-neutral-200">
            Owning hard problems end-to-end
          </strong>{' '}
          , from the first question asked to the last line of production code,
          and remaining accountable for their stability long after they ship.
        </p>
      </>
    ),
  },
  {
    from: 'Mar 2023',
    to: 'Oct 2023',
    role: 'Technical Founder',
    company: 'Datawise',
    type: 'Startup',
    description: (
      <>
        <p>
          Datawise started as a question: why is generating realistic test data
          still so painful? So I built the answer, a{' '}
          <strong className="text-neutral-200">
            configurable database generation platform
          </strong>{' '}
          from scratch, modelling{' '}
          <strong className="text-neutral-200">60+ data types</strong> and
          building vendor-specific SQL adapters for{' '}
          <strong className="text-neutral-200">
            MySQL, Oracle, and PostgreSQL
          </strong>
          .
        </p>
        <p>
          Running a startup while working full-time taught me a different kind
          of discipline, making sharp technical trade-offs with limited time,
          keeping a team aligned, and{' '}
          <strong className="text-neutral-200">
            directly creating tangible business impact
          </strong>
          .
        </p>
      </>
    ),
  },
  {
    from: 'Nov 2020',
    to: 'May 2022',
    role: 'Part-Time Software Engineer',
    company: 'BENIT PTY LTD',
    type: 'Part-Time',
    description: (
      <>
        <p>
          This is where I grew up as an engineer. Across a range of outsourcing
          projects,{' '}
          <strong className="text-neutral-200">
            I touched almost every layer of the stack{' '}
          </strong>{' '}
          , React frontends, Java Spring and NestJS microservices, PostgreSQL
          optimisations that boosted performance by 35% , AWS infrastructure,
          and CI/CD pipelines.
        </p>
        <p>
          I also got my first taste of{' '}
          <strong className="text-neutral-200">technical leadership</strong>,
          mentoring junior developers and learning how to bring people along,
          not just write good code. It was fast-paced, broad, and exactly the
          foundation I needed.
        </p>
      </>
    ),
  },
];

const fadeViewport = { once: true, margin: '0px 0px -8% 0px' };

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
    <>
      {/* Heading — animates on mount (component only hydrates when near viewport) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="section-title">
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
              <div className="flex-1 md:pr-8 md:pl-16">
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
            <div
              className="mt-3 flex flex-col gap-3 text-sm leading-relaxed
                text-neutral-400 md:mt-0 md:pl-8 md:text-base"
            >
              {item.description}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
