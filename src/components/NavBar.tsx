import { useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#intro' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#tech-stack' },
  { label: 'Credits', href: '#credits' },
] as const;

export default function NavBar() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop pill — centered, hidden on mobile */}
      <nav
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all
          duration-300 md:block ${
            visible
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-8 opacity-0'
          }`}
      >
        <ul
          className="hidden items-center gap-1 rounded-full border
            border-white/10 bg-neutral-900/80 px-2 py-1.5 shadow-lg
            shadow-black/40 backdrop-blur-md md:flex"
        >
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  className={`relative block rounded-full px-4 py-1.5 text-sm
                  font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-neutral-700/80 text-white'
                      : 'text-neutral-400 hover:text-neutral-100'
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile hamburger — fixed top-right, hidden on md+ */}
      <div
        ref={menuRef}
        className={`fixed top-4 right-4 z-50 transition-all duration-300
          md:hidden ${
            visible
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-8 opacity-0'
          }`}
      >
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full
            border border-white/10 bg-neutral-900/80 shadow-lg shadow-black/40
            backdrop-blur-md"
        >
          <span className="flex flex-col gap-[5px]">
            <span
              className={`block h-[2px] w-5 rounded-full bg-white transition-all
                duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-white transition-all
                duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-white transition-all
                duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </span>
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <ul
            className="absolute top-12 right-0 min-w-40 rounded-2xl border
              border-white/10 bg-neutral-900/95 py-2 shadow-lg shadow-black/40
              backdrop-blur-md"
          >
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleClick(e, href)}
                    className={`block px-5 py-2.5 text-sm font-medium
                    transition-colors duration-150 ${
                      isActive
                        ? 'text-white'
                        : 'text-neutral-400 hover:text-neutral-100'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
