import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Command,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Moon,
  Search,
  Volume2,
  VolumeX,
  type LucideIcon,
} from "lucide-react";
import { useApp } from "../lib/app-context";
import { navItems, profile } from "../lib/data";
import { EASE } from "../lib/motion";
import { cn, downloadResume, scrollToSection } from "../lib/utils";

interface CommandItem {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  keywords: string;
  action: () => void;
}

interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, toggleTheme, toggleSound, soundOn, copyText } =
    useApp();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!paletteOpen) return;
    setQuery("");
    setActiveIndex(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [paletteOpen]);

  const groups = useMemo<CommandGroup[]>(() => {
    const close = () => setPaletteOpen(false);
    return [
      {
        label: "Navigate",
        items: navItems.map((item) => ({
          id: `nav-${item.id}`,
          label: item.label,
          hint: "Section",
          icon: ArrowDown,
          keywords: `go to ${item.label} section`,
          action: () => {
            close();
            scrollToSection(item.id);
          },
        })),
      },
      {
        label: "Elsewhere",
        items: [
          {
            id: "github",
            label: "Open GitHub",
            hint: "@AvulaVamshidhar",
            icon: Github,
            keywords: "code repositories",
            action: () => {
              close();
              window.open(profile.github, "_blank", "noopener,noreferrer");
            },
          },
          {
            id: "linkedin",
            label: "Open LinkedIn",
            hint: "Profile",
            icon: Linkedin,
            keywords: "network professional",
            action: () => {
              close();
              window.open(profile.linkedin, "_blank", "noopener,noreferrer");
            },
          },
          {
            id: "email",
            label: "Send an email",
            hint: profile.email,
            icon: Mail,
            keywords: "contact mail",
            action: () => {
              close();
              window.location.href = `mailto:${profile.email}`;
            },
          },
        ],
      },
      {
        label: "Actions",
        items: [
          {
            id: "resume",
            label: "Download resume",
            hint: "PDF",
            icon: Download,
            keywords: "cv pdf file",
            action: () => {
              close();
              downloadResume(profile.resume);
            },
          },
          {
            id: "copy-email",
            label: "Copy email address",
            hint: profile.email,
            icon: Copy,
            keywords: "clipboard",
            action: () => {
              close();
              void copyText(profile.email, "Email copied");
            },
          },
          {
            id: "theme",
            label: "Switch theme",
            hint: "Dark / light",
            icon: Moon,
            keywords: "appearance color mode dark light",
            action: () => {
              close();
              toggleTheme();
            },
          },
          {
            id: "sound",
            label: soundOn ? "Turn sounds off" : "Turn sounds on",
            hint: soundOn ? "On" : "Off by default",
            icon: soundOn ? Volume2 : VolumeX,
            keywords: "audio hover interface mute",
            action: () => {
              close();
              toggleSound();
            },
          },
          {
            id: "top",
            label: "Back to top",
            hint: "Home",
            icon: ArrowUp,
            keywords: "scroll up",
            action: () => {
              close();
              scrollToSection("home");
            },
          },
        ],
      },
    ];
  }, [
    copyText,
    setPaletteOpen,
    soundOn,
    toggleSound,
    toggleTheme,
  ]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          `${item.label} ${item.hint} ${item.keywords}`
            .toLowerCase()
            .includes(normalized),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const flat = useMemo(
    () => filtered.flatMap((group) => group.items),
    [filtered],
  );

  useEffect(() => {
    if (activeIndex > flat.length - 1) setActiveIndex(0);
  }, [flat.length, activeIndex]);

  const run = (item: CommandItem | undefined) => {
    if (!item) return;
    item.action();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setPaletteOpen(false);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (flat.length ? (index + 1) % flat.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        flat.length ? (index - 1 + flat.length) % flat.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(flat[activeIndex]);
    }
  };

  let cursor = -1;

  return (
    <AnimatePresence>
      {paletteOpen ? (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close command menu"
            tabIndex={-1}
            onClick={() => setPaletteOpen(false)}
            className="absolute inset-0 bg-bg/70 backdrop-blur-xl"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="glass-strong relative z-10 w-full max-w-[560px] overflow-hidden rounded-2xl shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3 border-b border-line/10 px-4">
              <Search size={15} className="shrink-0 text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search sections, links and actions…"
                aria-label="Search commands"
                autoComplete="off"
                spellCheck={false}
                data-cursor="text"
                className="h-14 w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-faint"
              />
              <kbd className="hidden rounded-md border border-line/15 bg-ink/[0.05] px-1.5 py-0.5 font-mono text-[9px] text-faint sm:block">
                esc
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-[12.5px] text-faint">
                  No commands match “{query}”.
                </p>
              ) : (
                filtered.map((group) => (
                  <div key={group.label} className="mb-1 last:mb-0">
                    <p className="px-3 pb-1.5 pt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-faint">
                      {group.label}
                    </p>
                    {group.items.map((item) => {
                      cursor += 1;
                      const index = cursor;
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => run(item)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                            isActive
                              ? "bg-ink/[0.07] text-ink"
                              : "text-muted hover:text-ink",
                          )}
                        >
                          <item.icon size={15} className="shrink-0" />
                          <span className="flex-1 truncate text-[13px]">
                            {item.label}
                          </span>
                          <span className="hidden max-w-[180px] truncate text-[10.5px] text-faint sm:block">
                            {item.hint}
                          </span>
                          {isActive ? (
                            <span className="flex items-center gap-1 font-mono text-[9px] text-faint">
                              <Command size={9} />↵
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line/10 px-4 py-2.5 text-[10px] text-faint">
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-line/15 px-1 py-0.5 font-mono">
                  ↑↓
                </kbd>
                to navigate
              </span>
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-line/15 px-1 py-0.5 font-mono">
                  ↵
                </kbd>
                to select
              </span>
              <span className="hidden items-center gap-2 sm:flex">
                <kbd className="rounded border border-line/15 px-1 py-0.5 font-mono">
                  ⌘K
                </kbd>
                to toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
