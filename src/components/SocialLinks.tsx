import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { MdMailOutline } from 'react-icons/md';

const base = import.meta.env.BASE_URL;

const links = [
  {
    href: 'https://github.com/quanchan',
    label: 'GitHub',
    icon: FaGithub,
    text: undefined,
    download: undefined,
  },
  {
    href: 'https://www.linkedin.com/in/anhquantran12',
    label: 'LinkedIn',
    icon: FaLinkedinIn,
    text: undefined,
    download: undefined,
  },
  {
    href: 'mailto:quan.trananh12@gmail.com',
    label: 'Email',
    icon: MdMailOutline,
    text: undefined,
    download: undefined,
  },
  {
    href: `${base}/CV.pdf`,
    label: 'Download CV',
    icon: undefined,
    text: 'CV',
    download: 'Alan_Tran_CV.pdf',
  },
];

export default function SocialLinks() {
  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
      {links.map((link) => (
        <div key={link.label} className="group flex items-center gap-2">
          <a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            download={link.download}
            aria-label={link.label}
            className="inline-flex h-10 w-10 shrink-0 items-center
              justify-center rounded-full border border-white/20
              bg-neutral-900/85 text-neutral-200 transition hover:scale-105
              hover:border-white/60 hover:text-white focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {link.icon ? (
              <link.icon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <span
                className="text-xs font-bold tracking-wide"
                aria-hidden="true"
              >
                {link.text}
              </span>
            )}
          </a>
          <span
            className="pointer-events-none text-xs font-semibold tracking-wider
              whitespace-nowrap text-neutral-200 uppercase opacity-0
              transition-all duration-200 group-hover:opacity-100"
          >
            {link.label}
          </span>
        </div>
      ))}
    </div>
  );
}
