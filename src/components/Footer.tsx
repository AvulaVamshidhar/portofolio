import { ArrowUp, Clock, Github, Linkedin, Mail } from "lucide-react";
import { useClock } from "../hooks/useClock";
import { navItems, profile } from "../lib/data";
import { scrollToSection } from "../lib/utils";

export function Footer() {
  const { time, zone } = useClock(profile.timeZone);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line/10">
      <div className="shell relative z-10 pb-28 pt-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-gradient-to-br from-accent/90 via-accent to-accent-2/90 text-[10.5px] font-semibold text-white">
                {profile.initials}
              </span>
              <div>
                <p className="text-[13px] font-medium tracking-tight">
                  {profile.fullName}
                </p>
                <p className="text-[10.5px] text-faint">{profile.role}</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[12px] leading-relaxed text-muted">
              {profile.tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-faint">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              {profile.availability}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-faint">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className="text-[11.5px] text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-faint">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 text-[11.5px] text-muted transition-colors hover:text-ink"
                >
                  <Github size={12} /> github.com/AvulaVamshidhar
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 text-[11.5px] text-muted transition-colors hover:text-ink"
                >
                  <Linkedin size={12} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 text-[11.5px] text-muted transition-colors hover:text-ink"
                >
                  <Mail size={12} /> {profile.email}
                </a>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-line/10 px-3 py-1.5 text-[10.5px] text-muted transition-colors hover:border-line/20 hover:text-ink"
            >
              Back to top <ArrowUp size={11} />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line/10 pt-5 text-[10px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.fullName}. Built with React, TypeScript &amp;
            Tailwind.
          </p>
          <p className="inline-flex items-center gap-1.5">
            <Clock size={10} /> {time} {zone} · Hyderabad, India
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-4 select-none whitespace-nowrap text-center text-[clamp(3.6rem,15vw,12rem)] font-semibold leading-none tracking-[-0.05em] text-ink/[0.035]"
      >
        VAMSHIDHAR
      </div>
    </footer>
  );
}
