import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const base = import.meta.env.BASE_URL;
const img = (name: string) => `${base}/assets/project_img/${name}`;

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
    title: 'Datawise',
    description:
      'Configurable database generation platform supporting ' +
      'multi-table schemas, 60+ data types, and relational constraints ' +
      'with cross-vendor SQL output.',
    images: [img('datawise1.png'), img('datawise2.png'), img('datawise3.png')],
    imageType: 'web',
    tech: ['Next.js', 'Chakra UI', 'PostgreSQL', 'Docker'],
    cardBg: 'linear-gradient(135deg, #f97316 0%, #d97706 100%)',
  },
  {
    number: '02',
    category: 'MOBILE APP',
    title: 'TodoRPG',
    description:
      'Full-stack mobile app with cloud server ' +
      'that gamifies personal development and task management.',
    images: [img('todo-rpg1.png'), img('todo-rpg2.png'), img('todo-rpg3.png')],
    imageType: 'mobile',
    tech: ['React Native', 'Expo', 'Java', 'Spring Boot'],
    cardBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    number: '03',
    category: 'WEB APP',
    title: 'PTE Magic',
    description:
      'Full-featured web application for students to practice for the ' +
      'PTE test with microservice architecture and robust data persistence.',
    images: [img('ptemagic1.png'), img('ptemagic2.png'), img('ptemagic3.png')],
    imageType: 'web',
    tech: ['Next.js', 'Java', 'Spring Boot', 'PostgreSQL'],
    cardBg: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  },
  {
    number: '04',
    category: 'WEB APP',
    title: 'Valentine',
    description:
      "Interactive Valentine's Day web experience " +
      'with animations and personalized messages.',
    images: [
      img('valentine1.jpg'),
      img('valentine2.jpg'),
      img('valentine3.png'),
    ],
    imageType: 'web',
    tech: ['React', 'TypeScript', 'Framer Motion'],
    cardBg: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
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
        className="flex flex-1 flex-col rounded-lg border
          border-neutral-500/50 bg-neutral-900 p-[3px] shadow-xl"
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
            loading="lazy"
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
      className="relative h-full w-full overflow-hidden rounded-2xl
        border-[3px] border-neutral-600 bg-neutral-900 shadow-2xl"
    >
      {/* Power button */}
      <div
        className="absolute right-[-5px] top-[24%] h-8 w-[3px] rounded-r
          bg-neutral-600"
      />
      {/* Volume up */}
      <div
        className="absolute left-[-5px] top-[18%] h-5 w-[3px] rounded-l
          bg-neutral-600"
      />
      {/* Volume down */}
      <div
        className="absolute left-[-5px] top-[28%] h-5 w-[3px] rounded-l
          bg-neutral-600"
      />
      {/* Screen */}
      <div
        className="h-full w-full overflow-hidden rounded-[14px] bg-black"
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
        {/* Home indicator */}
        <div
          className="pointer-events-none absolute bottom-2 left-1/2
            -translate-x-1/2 h-[3px] w-12 rounded-full bg-white/25"
        />
      </div>
    </div>
  );
}

/**
 * Fanned stack of browser windows — back images fan out behind
 * the front image. Click the stack to cycle which image is in front.
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

  const advance = useCallback(() => {
    if (images.length <= 1) return;
    setFrontIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Build ordered list: front image + the rest as back images
  const backImages = images
    .map((src, i) => ({ src, originalIndex: i }))
    .filter((_, i) => i !== frontIndex);

  return (
    <div
      className="relative h-full w-full"
      role="region"
      aria-label={`${title} screenshots`}
    >
      {/* Back images — always clipped inside their own overflow-hidden wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        {backImages.map(({ src, originalIndex }, i) => {
          const rotation = (i + 1) * (i % 2 === 0 ? 4 : -3);
          const offsetX = (i + 1) * (i % 2 === 0 ? 6 : -4);
          const offsetY = (i + 1) * 2;
          return (
            <div
              key={originalIndex}
              className="absolute inset-0 opacity-50"
              style={{
                zIndex: i,
                transform: `rotate(${rotation}deg) translate(${offsetX}%, ${offsetY}%)`,
                transformOrigin: 'bottom center',
              }}
            >
              <MacbookFrame src={src} alt={`${title} screenshot ${originalIndex + 1}`} />
            </div>
          );
        })}
      </div>

      {/* Front image (clickable, scales on hover) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={frontIndex}
          className="absolute inset-0"
          onClick={advance}
          onHoverStart={() => onFrontHoverChange?.(true)}
          onHoverEnd={() => onFrontHoverChange?.(false)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          whileHover={{
            scale: 1.2,
            zIndex: 50,
            transition: { duration: 0.05, ease: 'easeOut' },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            zIndex: backImages.length,
            transformOrigin: 'bottom center',
          }}
        >
          <MacbookFrame
            src={images[frontIndex]}
            alt={`${title} preview`}
            className={images.length > 1 ? 'cursor-pointer' : ''}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div
          className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2
            gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur-sm"
        >
          {images.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={(e) => {
                e.stopPropagation();
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
 * Phone screens anchored to the bottom-center. The front image is always
 * centered; others fan out to the sides. Click to cycle the front image.
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

  const advance = useCallback(() => {
    if (images.length <= 1) return;
    setFrontIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  return (
    <div
      className="relative h-full w-full"
      role="region"
      aria-label={`${title} screenshots`}
    >
      {/* Back images — always clipped inside their own overflow-hidden wrapper */}
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
              onClick={advance}
            >
              <PhoneFrame src={src} alt={`${title} screenshot ${i + 1}`} />
            </motion.div>
          );
        })}
      </div>

      {/* Front image — sibling outside the clipping wrapper, can overflow when card allows */}
      <motion.div
        key={frontIndex}
        className="absolute top-1 h-60 w-30"
        style={{
          translateX: '-50%',
          left: '50%',
          transformOrigin: 'top center',
        }}
        animate={{ zIndex: 10, opacity: 1 }}
        whileHover={{
          scale: 1.2,
          zIndex: 50,
          transition: { duration: 0.12, ease: 'easeOut' },
        }}
        onHoverStart={() => onFrontHoverChange?.(true)}
        onHoverEnd={() => onFrontHoverChange?.(false)}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        onClick={advance}
      >
        <PhoneFrame src={images[frontIndex]} alt={`${title} preview`} />
      </motion.div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div
          className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2
            gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur-sm"
        >
          {images.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={(e) => {
                e.stopPropagation();
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

/** Per-card wrapper — owns the overflow state so only the front image breaks out. */
function ProjectCard({ project }: { project: Project }) {
  const [isOverflow, setIsOverflow] = useState(false);

  return (
    <article className="flex flex-col">
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
        style={{ background: project.cardBg }}
      >
        <p
          className="px-6 pt-6 text-base leading-relaxed font-medium
            text-white/90 md:px-8 md:pt-8 md:text-lg"
        >
          {project.description}
        </p>

        {/* Image showcase area */}
        <div
          className={`relative mt-auto h-52 rounded-b-3xl px-4 pt-6 md:h-64
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

export default function ProjectShowcase() {
  return (
    <div>
      {/* Section header */}
      <div className="mb-16 text-center">
        <p
          className="mb-4 text-sm font-semibold tracking-[0.2em] text-purple-400
            uppercase"
        >
          Portfolio
        </p>
        <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          Featured{' '}
          <span
            className="bg-gradient-to-r from-purple-400 via-pink-400
              to-emerald-400 bg-clip-text text-transparent"
          >
            Projects
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">
          A curated selection of projects that made me confident in building
          software.
        </p>
      </div>

      {/* Project grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
