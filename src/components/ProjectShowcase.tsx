import { useState, useEffect } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';

const base = import.meta.env.BASE_URL;
const img = (name: string) => `${base}/assets/project_img/${name}`;
const gradient = (name: string) => `${base}/assets/gradients/${name}`;

/** True only on devices with a fine pointer that supports hover (desktop). */
function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
  }, []);
  return canHover;
}

type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  images: string[];
  imageType: 'web' | 'mobile';
  tech: string[];
  cardBg: string;
};

const projects: Project[] = [
  {
    number: '01',
    category: 'WEB APP',
    title: 'PTE Magic',
    description:
      'An AI-powered PTE exam preparation platform that helps learners practice real-exam questions and take full-length mock tests with instant feedback.',
    images: [
      img('ptemagic1.avif'),
      img('ptemagic2.avif'),
      img('ptemagic3.avif'),
    ],
    imageType: 'web',
    tech: ['TypeScript', 'Next.js', 'React', 'Java Spring', 'PostgreSQL'],
    cardBg: gradient('gradient3.avif'),
  },
  {
    number: '02',
    category: 'WEB APP',
    title: 'Datawise',
    description:
      'A configurable database generation platform that creates realistic, multi-table test datasets with relational constraints, supporting MySQL, Oracle, and PostgreSQL.',
    images: [
      img('datawise1.avif'),
      img('datawise2.avif'),
      img('datawise3.avif'),
    ],
    imageType: 'web',
    tech: [
      'TypeScript',
      'React',
      'Next.js',
      'Chakra UI',
      'PostgreSQL',
      'Docker',
    ],
    cardBg: gradient('gradient1.avif'),
  },
  {
    number: '03',
    category: 'WEB APP',
    title: 'Valentine Gift',
    description:
      'A galaxy-themed romantic web experience with polished visuals, smooth animations, and delightful interactive elements.',
    images: [
      img('valentine1.avif'),
      img('valentine2.avif'),
      img('valentine3.avif'),
    ],
    imageType: 'web',
    tech: ['React', 'TypeScript', 'Framer Motion'],
    cardBg: gradient('gradient4.avif'),
  },
  {
    number: '04',
    category: 'MOBILE APP',
    title: 'TodoRPG',
    description:
      'An RPG adventure that turns your daily tasks into quests, making productivity and personal growth fun and addictive.',
    images: [
      img('todo-rpg1.avif'),
      img('todo-rpg2.avif'),
      img('todo-rpg3.avif'),
    ],
    imageType: 'mobile',
    tech: ['PhaserJS', 'TypeScript'],
    cardBg: gradient('gradient2.avif'),
  },
];

/**
 * Minimal MacBook screen mockup — the image fills the screen area.
 */
function MacbookFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`flex h-full w-full flex-col ${className ?? ''}`}>
      {/* Lid */}
      <div
        className="flex flex-1 flex-col rounded-lg border border-neutral-500/50
          bg-neutral-900 p-[3px] shadow-xl"
      >
        {/* Camera */}
        <div className="flex shrink-0 justify-center py-[3px]">
          <div className="h-[4px] w-[4px] rounded-full bg-neutral-600" />
        </div>
        {/* Screen */}
        <div className="min-h-0 flex-1 overflow-hidden rounded-[2px] bg-black">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal iPhone-style mockup — the image fills the screen area.
 */
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl border-[3px]
        border-neutral-600 bg-neutral-900 shadow-2xl"
    >
      {/* Power button */}
      <div
        className="absolute top-[24%] right-[-5px] h-8 w-[3px] rounded-r
          bg-neutral-600"
      />
      {/* Volume up */}
      <div
        className="absolute top-[18%] left-[-5px] h-5 w-[3px] rounded-l
          bg-neutral-600"
      />
      {/* Volume down */}
      <div
        className="absolute top-[28%] left-[-5px] h-5 w-[3px] rounded-l
          bg-neutral-600"
      />
      {/* Screen */}
      <div className="h-full w-full overflow-hidden rounded-[14px] bg-black">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
        {/* Home indicator */}
        <div
          className="pointer-events-none absolute bottom-2 left-1/2 h-[3px] w-12
            -translate-x-1/2 rounded-full bg-white/25"
        />
      </div>
    </div>
  );
}

/**
 * Sliding carousel for landscape (web) screenshots.
 * - Images slide in/out from the correct side based on swipe direction.
 * - Hover zoom is on the outer container so it persists across slides.
 */
function WebImageStack({
  images,
  title,
  onFrontHoverChange,
}: {
  images: string[];
  title: string;
  onFrontHoverChange?: (h: boolean) => void;
}) {
  const [frontIndex, setFrontIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const canHover = useCanHover();

  const navigate = (dir: 1 | -1) => {
    if (images.length <= 1) return;
    setDirection(dir);
    setFrontIndex((prev) => (prev + dir + images.length) % images.length);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
  };

  return (
    <div
      className="relative h-full w-full"
      role="region"
      aria-label={`${title} screenshots`}
    >
      {/* Zoom + drag wrapper — dots are intentionally outside so they don't scale */}
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ transformOrigin: 'bottom center' }}
        whileHover={
          canHover
            ? {
                scale: 1.2,
                zIndex: 50,
                transition: { duration: 0.15, ease: 'easeOut' },
              }
            : undefined
        }
        onHoverStart={() => canHover && onFrontHoverChange?.(true)}
        onHoverEnd={() => canHover && onFrontHoverChange?.(false)}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_: unknown, info: PanInfo) => {
          if (info.offset.x < -40 || info.velocity.x < -400) navigate(1);
          else if (info.offset.x > 40 || info.velocity.x > 400) navigate(-1);
        }}
      >
        {/* Slide track — clips images entering/exiting from the sides */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={frontIndex}
              custom={direction}
              className="absolute inset-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <MacbookFrame src={images[frontIndex]} alt={`${title} preview`} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Dot indicators — outside the zoom wrapper, always stay in place */}
      {images.length > 1 && (
        <div
          className="absolute bottom-2 left-1/2 z-[60] flex -translate-x-1/2
            gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur-sm"
        >
          {images.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => {
                setDirection(i > frontIndex ? 1 : -1);
                setFrontIndex(i);
              }}
              aria-label={`Go to screenshot ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === frontIndex
                  ? 'w-5 bg-white'
                  : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Phone screens — swipe horizontally (or use dots) to cycle. Front is
 * centered; others fan out to the sides.
 */
function MobileImageStack({
  images,
  title,
  onFrontHoverChange,
}: {
  images: string[];
  title: string;
  onFrontHoverChange?: (h: boolean) => void;
}) {
  const [frontIndex, setFrontIndex] = useState(0);
  const canHover = useCanHover();

  const navigate = (dir: 1 | -1) => {
    if (images.length <= 1) return;
    setFrontIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div
      className="relative h-full w-full"
      role="region"
      aria-label={`${title} screenshots`}
    >
      {/* Back images */}
      <div className="absolute inset-0 overflow-hidden">
        {images.map((src, i) => {
          if (i === frontIndex) return null;
          let offset = i - frontIndex;
          if (offset > images.length / 2) offset -= images.length;
          if (offset < -images.length / 2) offset += images.length;
          return (
            <motion.div
              key={i}
              className="absolute top-4 h-60 w-30"
              style={{ translateX: '-50%', transformOrigin: 'top center' }}
              animate={{
                left: `${50 + offset * 28}%`,
                rotate: offset * 8,
                opacity: 0.65,
                zIndex: 5 - Math.abs(offset),
              }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <PhoneFrame src={src} alt={`${title} screenshot ${i + 1}`} />
            </motion.div>
          );
        })}
      </div>

      {/* Front image — drag to swipe; hover-zooms on desktop only */}
      <motion.div
        key={frontIndex}
        className="absolute top-1 h-60 w-30 cursor-grab active:cursor-grabbing"
        style={{
          translateX: '-50%',
          left: '50%',
          transformOrigin: 'center center',
        }}
        animate={{ zIndex: 10, opacity: 1 }}
        whileHover={
          canHover
            ? {
                scale: 1.2,
                y: -18,
                zIndex: 50,
                transition: { duration: 0.15, ease: 'easeOut' },
              }
            : undefined
        }
        onHoverStart={() => canHover && onFrontHoverChange?.(true)}
        onHoverEnd={() => canHover && onFrontHoverChange?.(false)}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_: unknown, info: PanInfo) => {
          if (info.offset.x < -40 || info.velocity.x < -400) navigate(1);
          else if (info.offset.x > 40 || info.velocity.x > 400) navigate(-1);
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <PhoneFrame src={images[frontIndex]} alt={`${title} preview`} />
      </motion.div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div
          className="absolute bottom-2 left-1/2 z-[60] flex -translate-x-1/2
            gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur-sm"
        >
          {images.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setFrontIndex(i)}
              aria-label={`Go to screenshot ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === frontIndex
                  ? 'w-5 bg-white'
                  : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Per-card wrapper */
function ProjectCard({ project }: { project: Project }) {
  const [isOverflow, setIsOverflow] = useState(false);

  return (
    <article className="flex h-full flex-col">
      {/* Number + Category */}
      <div
        className="mb-3 flex items-center gap-3 text-xs tracking-[0.15em]
          text-neutral-500 uppercase"
      >
        <span className="font-semibold">{project.number}</span>
        <span className="h-px w-6 bg-neutral-600" />
        <span>{project.category}</span>
      </div>

      {/* Title */}
      <h3 className="mb-5 text-2xl font-bold text-white md:text-3xl">
        {project.title}
      </h3>

      {/* Colored card */}
      <div
        className={`relative flex flex-1 flex-col rounded-3xl border
          border-white/10 transition-[overflow] ${
            isOverflow ? 'overflow-visible' : 'overflow-hidden'
          }`}
      >
        {/* Gradient background — always clipped to card shape */}
        <div
          className="pointer-events-none absolute inset-0 -z-0 overflow-hidden
            rounded-3xl"
        >
          <img
            src={project.cardBg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <p
          className="relative z-10 px-6 pt-6 text-base leading-relaxed
            font-medium text-white/90 sm:h-[8rem] md:h-[12rem] md:px-8 md:pt-8
            md:text-lg xl:h-[7rem]"
        >
          {project.description}
        </p>

        {/* Image showcase area */}
        <div
          className={`relative z-10 mt-auto h-52 rounded-b-3xl px-4 pt-6 md:h-64
            md:px-6 ${isOverflow ? 'overflow-visible' : 'overflow-hidden'}`}
        >
          {project.imageType === 'mobile' ? (
            <MobileImageStack
              images={project.images}
              title={project.title}
              onFrontHoverChange={setIsOverflow}
            />
          ) : (
            <WebImageStack
              images={project.images}
              title={project.title}
              onFrontHoverChange={setIsOverflow}
            />
          )}
        </div>
      </div>

      {/* Tech tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((name) => (
          <span
            key={name}
            className="rounded-full border border-white/10 bg-white/5 px-3.5
              py-1.5 text-xs tracking-wide text-neutral-300 uppercase"
          >
            {name}
          </span>
        ))}
      </div>
    </article>
  );
}

/**
 * Animates a card in once when it enters the viewport.
 */
function CardReveal({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: Math.floor(i / 2) * 0.15,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectShowcase() {
  return (
    <>
      {/* Section header */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Featured Projects</h2>
        <motion.p
          className="mx-auto mt-4 text-neutral-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Personal projects showcasing ideas and experiments outside my
          commercial work.
        </motion.p>
      </motion.div>

      {/* Project grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
        {projects.map((project, i) => (
          <CardReveal key={project.title} i={i}>
            <ProjectCard project={project} />
          </CardReveal>
        ))}
      </div>
    </>
  );
}
