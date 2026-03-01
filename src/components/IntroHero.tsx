import { motion } from 'framer-motion';

const portraitSrc = `${import.meta.env.BASE_URL}/assets/portrait.avif`;

export default function IntroHero() {
  return (
    <div
      className="relative z-10 flex w-full flex-col items-center gap-10
        md:flex-row md:items-center md:gap-16"
    >
      {/* Text content */}
      <div className="text-center md:flex-1 md:text-left">
        <p className="mb-4 text-sm tracking-[0.3em] text-neutral-400 uppercase">
          Full Stack Software Engineer
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl text-5xl leading-tight font-semibold
            tracking-tight text-white md:text-7xl"
          style={{ fontFamily: '"Lexend Mega", sans-serif' }}
        >
          ALAN TRAN
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300
            md:text-xl"
        >
          I build software that scales. 5+ years turning complex problems into
          clean, production-grade systems. <br /> From full stack web frameworks
          and applications to AI-assisted developer tooling across enterprise
          and startup environments.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start"
        >
          <a
            href="#experience"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium
              text-neutral-900 transition hover:bg-neutral-200"
          >
            My Experience
          </a>
          <a
            href="#projects"
            className="rounded-full border border-neutral-700 px-6 py-3 text-sm
              font-medium text-neutral-200 transition hover:border-neutral-500"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      {/* Portrait — top on mobile, right on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative order-first shrink-0 md:order-last"
      >
        {/* Ambient glow */}
        <div
          className="absolute -inset-4 rounded-full bg-gradient-to-br
            from-cyan-500/20 via-indigo-500/15 to-fuchsia-500/20 blur-2xl"
        />
        <img
          src={portraitSrc}
          alt="Alan Tran"
          width={176}
          height={176}
          fetchPriority="high"
          className="relative block h-36 w-36 rounded-full object-cover
            brightness-95 md:h-44 md:w-44"
        />
      </motion.div>
    </div>
  );
}
