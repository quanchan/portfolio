import { motion } from 'framer-motion';

type StackItem = { name: string; icon: string };

/**
 * Devicon CDN base. Each icon slug follows the pattern:
 * {slug}/{slug}-original.svg  (colored version)
 */
const d = (slug: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg`;

const stackItems: StackItem[] = [
  // Row 1 (8)
  { name: 'JavaScript', icon: d('javascript') },
  { name: 'TypeScript', icon: d('typescript') },
  { name: 'Python', icon: d('python') },
  { name: 'C#', icon: d('csharp') },
  { name: 'Java', icon: d('java') },
  { name: 'Bash', icon: d('bash') },
  { name: 'PowerShell', icon: d('powershell') },
  { name: 'React', icon: d('react') },
  // Row 2 (7)
  { name: 'Next.js', icon: d('nextjs') },
  { name: 'Node.js', icon: d('nodejs') },
  { name: 'NestJS', icon: d('nestjs') },
  { name: 'Spring Boot', icon: d('spring') },
  { name: '.NET', icon: d('dotnetcore') },
  { name: 'Material UI', icon: d('materialui') },
  { name: 'LangChain', icon: d('python') },
  // Row 3 (6)
  { name: 'TensorFlow', icon: d('tensorflow') },
  { name: 'PyTorch', icon: d('pytorch') },
  { name: 'PostgreSQL', icon: d('postgresql') },
  { name: 'MongoDB', icon: d('mongodb') },
  { name: 'Redis', icon: d('redis') },
  { name: 'Docker', icon: d('docker') },
  // Row 4 (5)
  { name: 'AWS', icon: d('amazonwebservices', 'original-wordmark') },
  { name: 'Linux', icon: d('linux') },
  { name: 'Claude Code', icon: '/portfolio/assets/claude_icon.avif' },
  { name: 'ESLint', icon: d('eslint') },
  { name: 'Vitest', icon: d('vitest') },
  // Row 5 (3)
  { name: 'VS Code', icon: d('vscode') },
  { name: 'Visual Studio', icon: d('visualstudio') },
  { name: 'Figma', icon: d('figma') },
  // Row 6 (2)
  { name: 'GitHub Copilot', icon: d('github', 'original') },
];

/**
 * Build a reverse-pyramid: the first row is the widest, each subsequent row
 * has fewer items (or equal). Handles any total count gracefully.
 */
function buildPyramidRows(items: StackItem[]): StackItem[][] {
  const rows: StackItem[][] = [];
  let remaining = items.length;
  let maxRow = Math.ceil(Math.sqrt(remaining * 2));

  let cursor = 0;
  while (remaining > 0) {
    const count = Math.min(maxRow, remaining);
    rows.push(items.slice(cursor, cursor + count));
    cursor += count;
    remaining -= count;
    maxRow = Math.max(count - 1, 2);
    if (remaining > 0 && remaining <= maxRow) {
      rows.push(items.slice(cursor, cursor + remaining));
      break;
    }
  }
  return rows;
}

function SkillPlaque({ item }: { item: StackItem }) {
  return (
    <div
      className="group flex w-20 flex-col items-center gap-1.5 rounded-xl border
        border-white/10 bg-white/5 px-2 py-3 backdrop-blur-md transition-all
        duration-300 hover:scale-110 hover:border-purple-400/80
        hover:bg-white/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
    >
      <img
        src={item.icon}
        alt={item.name}
        width={32}
        height={32}
        className="h-8 w-8 transition-all duration-300
          group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
        loading="lazy"
      />
      <span
        className="w-full text-center text-[0.6rem] leading-tight tracking-wide
          text-neutral-400 transition-colors duration-300
          group-hover:text-white"
      >
        {item.name}
      </span>
    </div>
  );
}

export default function TechStackSection() {
  const rows = buildPyramidRows(stackItems);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
      }}
    >
      {/* Background video — covers 100vw at any zoom level */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        src="/portfolio/assets/skills_bg.webm"
      />
      {/* Dark overlay so text/icons remain legible */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content — re-constrained to match rest of page */}
      <div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:px-10
          md:py-24"
      >
        <h2
          className="mb-4 text-center text-4xl text-white md:text-5xl
            lg:text-6xl"
        >
          <span
            className="bg-gradient-to-b from-white to-purple-600 bg-clip-text
              text-transparent"
          >
            The Tech Forge
          </span>
        </h2>
        <motion.p
          className="mx-auto mb-14 max-w-xl text-center text-neutral-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Battle-tested technologies powering projects I shipped.
        </motion.p>
        <div className="flex flex-col items-center gap-5">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className="flex flex-wrap justify-center gap-4 md:gap-5"
            >
              {row.map((item) => (
                <SkillPlaque key={item.name} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
