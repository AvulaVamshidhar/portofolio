import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  Copy,
  Download,
  Github,
  Linkedin,
  Moon,
  Search,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { useApp } from "../lib/app-context";
import { navItems, profile, sectionIds } from "../lib/data";
import { useClock } from "../hooks/useClock";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { EASE } from "../lib/motion";
import { cn, scrollToSection } from "../lib/utils";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(sectionIds);
  const { theme, toggleTheme, soundOn, toggleSound, setPaletteOpen } = useApp();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="shell pt-3 sm:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            "glass-strong relative flex items-center justify-between gap-2 rounded-2xl px-2.5 py-2 transition-all duration-500 ease-out-expo sm:rounded-full sm:px-3",
            scrolled &&
              "shadow-[0_24px_70px_-38px_rgba(0,0,0,0.95)] sm:px-4",
          )}
        >
          <Magnetic strength={0.18}>
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                navigate("home");
              }}
              className="group flex items-center gap-2.5 rounded-full py-0.5 pl-0.5 pr-2"
              aria-label="AV — Avula Vamshidhar, back to top"
              data-cursor="link"
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-accent/90 via-accent to-accent-2/90 text-[10.5px] font-semibold tracking-[-0.02em] text-white shadow-[0_8px_24px_-10px_rgb(var(--accent)/0.9)]">
                <span className="relative z-10">{profile.initials}</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-white/60"
                />
              </span>
              <span className="hidden text-[12px] font-medium tracking-tight sm:block">
                Avula Vamshidhar
              </span>
            </a>
          </Magnetic>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(item.id);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    data-cursor="link"
                    className={cn(
                      "relative z-10 block rounded-full px-3.5 py-2 text-[12px] transition-colors duration-300",
                      isActive ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 34 }
                      }
                      className="absolute inset-0 rounded-full border border-line/10 bg-ink/[0.07]"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-0.5">
            <IconButton
              label={soundOn ? "Mute interface sounds" : "Enable interface sounds"}
              onClick={toggleSound}
              pressed={soundOn}
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </IconButton>

            <IconButton
              label={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </IconButton>

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command menu"
              data-cursor="link"
              className="hidden items-center gap-2 rounded-full border border-line/10 bg-ink/[0.04] px-2.5 py-1.5 text-[11px] text-muted transition-colors duration-300 hover:border-line/20 hover:text-ink sm:flex"
            >
              <Search size={12} />
              <span className="hidden md:inline">Search</span>
              <kbd className="rounded-md border border-line/15 bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[9px] tracking-tight">
                ⌘K
              </kbd>
            </button>

            <IconButton
              label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((value) => !value)}
              className="lg:hidden"
              expanded={menuOpen}
              controls="mobile-navigation"
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-4 bg-current transition-all duration-300",
                    menuOpen ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 block h-px w-4 bg-current transition-all duration-300",
                    menuOpen ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px w-4 bg-current transition-all duration-300",
                    menuOpen ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </IconButton>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="glass-strong mt-2 overflow-hidden rounded-2xl p-2 lg:hidden"
            >
              <ul className="grid gap-0.5">
                {navItems.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        navigate(item.id);
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-3 text-[13.5px] transition-colors",
                        active === item.id
                          ? "bg-ink/[0.06] text-ink"
                          : "text-muted hover:bg-ink/[0.04] hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-[9px] text-faint">
                        0{index + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-2 grid gap-1 border-t border-line/10 pt-2">
                <MobileRow
                  icon={<Clock size={14} />}
                  label="Local time"
                  value={<LiveClock compact />}
                />
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setPaletteOpen(true);
                  }}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[12.5px] text-muted transition-colors hover:bg-ink/[0.04] hover:text-ink"
                >
                  <span className="flex items-center gap-2.5">
                    <Search size={14} /> Command menu
                  </span>
                  <kbd className="font-mono text-[9.5px] text-faint">⌘K</kbd>
                </button>
                <a
                  href={profile.resume}
                  download="Avula-Vamshidhar-Resume.pdf"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12.5px] text-muted transition-colors hover:bg-ink/[0.04] hover:text-ink"
                >
                  <Download size={14} /> Download resume
                </a>
                <div className="flex items-center gap-1 px-1 pt-1">
                  <SocialMini
                    href={profile.github}
                    label="GitHub"
                    icon={<Github size={14} />}
                  />
                  <SocialMini
                    href={profile.linkedin}
                    label="LinkedIn"
                    icon={<Linkedin size={14} />}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(profile.email);
                      setMenuOpen(false);
                    }}
                    aria-label="Copy email address"
                    className="grid h-8 w-8 place-items-center rounded-full border border-line/10 text-muted transition-colors hover:text-ink"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

function LiveClock({ compact = false }: { compact?: boolean }) {
  const { time, zone } = useClock(profile.timeZone);
  return (
    <span
      className={cn(
        "font-mono tabular-nums tracking-tight text-ink/80",
        compact ? "text-[11px]" : "text-[12px]",
      )}
    >
      {time} <span className="text-faint">{zone}</span>
    </span>
  );
}

interface IconButtonProps {
  label: string;
  onClick: () => void;
  children: ReactNode;
  pressed?: boolean;
  expanded?: boolean;
  controls?: string;
  className?: string;
}

function IconButton({
  label,
  onClick,
  children,
  pressed,
  expanded,
  controls,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      aria-expanded={expanded}
      aria-controls={controls}
      data-cursor="link"
      className={cn(
        "grid h-8 w-8 place-items-center rounded-full text-muted transition-all duration-300 hover:bg-ink/[0.06] hover:text-ink",
        className,
      )}
    >
      {children}
    </button>
  );
}

function MobileRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[12.5px] text-muted">
      <span className="flex items-center gap-2.5">
        {icon} {label}
      </span>
      {value}
    </div>
  );
}

function SocialMini({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-full border border-line/10 text-muted transition-colors hover:text-ink"
    >
      {icon}
    </a>
  );
}
