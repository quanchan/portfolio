import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { MdMailOutline } from 'react-icons/md';

const links = [
  { href: 'https://github.com/quanchan', label: 'GitHub', icon: FaGithub },
  {
    href: 'https://www.linkedin.com/in/alan-tran-165192237',
    label: 'LinkedIn',
    icon: FaLinkedinIn,
  },
  {
    href: 'mailto:quan.trananh12@gmail.com',
    label: 'Email',
    icon: MdMailOutline,
  },
];

export default function SocialLinks() {
  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={link.label}
          className="inline-flex h-10 w-10 items-center justify-center
            rounded-full border border-white/20 bg-neutral-900/85
            text-neutral-200 transition hover:scale-105 hover:border-white/60
            hover:text-white focus:outline-none focus-visible:ring-2
            focus-visible:ring-white/60"
        >
          <link.icon className="h-5 w-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
