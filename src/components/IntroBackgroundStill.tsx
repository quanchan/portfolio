import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const animationSrc = `${import.meta.env.BASE_URL}/assets/blob.lottie`;

export default function IntroBackgroundStill() {
	return (
		<div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden" aria-hidden="true">
			<div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-sky-500/5 to-neutral-950" />
			<div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
			<div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-fuchsia-400/10 blur-3xl" />

			<div className="absolute left-1/2 top-1/2 h-[68vmin] w-[68vmin] min-h-[280px] min-w-[280px] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-90">
				<DotLottieReact
					src={animationSrc}
					autoplay
					loop={false}
					segment={[0, 1]}
					speed={0.01}
					useFrameInterpolation={false}
					layout={{ fit: 'contain', align: [0.5, 0.5] }}
					renderConfig={{ autoResize: true, devicePixelRatio: 1 }}
					className="h-full w-full"
				/>
			</div>

			<div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-neutral-950/70" />
		</div>
	);
}
