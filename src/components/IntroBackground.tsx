import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

const animationSrc = `${import.meta.env.BASE_URL}/assets/blob.lottie`;

export default function IntroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 h-full w-full
        overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-500/10
          via-sky-500/5 to-neutral-950"
      />
      <div
        className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2
          rounded-full bg-cyan-400/12 blur-2xl"
      />
      <div
        className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full
          bg-fuchsia-400/10 blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 h-[72vmin] max-h-[900px]
          min-h-[360px] w-[72vmin] max-w-[900px] min-w-[360px] -translate-x-1/2
          -translate-y-1/2 will-change-transform"
      >
        <DotLottieReact
          src={animationSrc}
          autoplay
          loop
          speed={1}
          useFrameInterpolation
          layout={{ fit: 'contain', align: [0.5, 0.5] }}
          renderConfig={{ autoResize: true, devicePixelRatio: 0.8 }}
          className="h-full w-full opacity-90"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20
          to-neutral-950/70"
      />
    </div>
  );
}
