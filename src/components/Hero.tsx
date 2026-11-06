import { useRef } from "react";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Magnetic } from "./ui/Magnetic";
import { Portrait } from "./ui/Portrait";
import { ActionButton } from "./ui/ActionButton";
import { useClock } from "../hooks/useClock";
import { profile } from "../lib/data";
import { EASE, fadeUp, lineRise, stagger } from "../lib/motion";
import { scrollToSection } from "../lib/utils";

export function Hero({ start }: { start: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { time, zone } = useClock(profile.timeZone);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 sm:pt-36 lg:pb-28"
    >
      {/* Ambient hero light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-24%] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgb(var(--accent)/0.22),transparent_66%)] blur-[100px]" />
        <div className="absolute bottom-[-26%] right-[-8%] h-[480px] w-[480px] rounded-full bg-accent-2/[0.16] blur-[120px]" />
        <div className="absolute left-[6%] top-[38%] h-[280px] w-[280px] rounded-full bg-accent/[0.08] blur-[100px]" />
      </div>

      <div className="shell relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={start ? "show" : "hidden"}
          className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10"
        >
          <motion.div style={{ y: contentY }} className="lg:col-span-7">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-ink/85">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {profile.availability}
              </span>
              <span className="hidden text-[11px] text-faint sm:inline">
                Portfolio — 2026
              </span>
            </motion.div>

            <h1 className="mt-8 text-[clamp(3.05rem,9.2vw,7.9rem)] font-semibold leading-[0.85] tracking-[-0.055em]">
              <span className="block overflow-hidden pb-[0.045em]">
                <motion.span variants={lineRise} className="block">
                  {profile.firstName.toUpperCase()}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.045em]">
                <motion.span variants={lineRise} className="block">
                  {profile.lastName.toUpperCase()}
                  <span className="text-accent">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[12.5px] text-muted sm:text-[13px]"
            >
              <span className="text-ink/90">Software Developer</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-faint" />
              <span>Data Science Student</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-faint" />
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} className="text-accent/80" />
                {profile.location}
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md font-serif text-[clamp(1.28rem,2.4vw,1.72rem)] italic leading-[1.35] text-muted"
            >
              “{profile.tagline}”
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <ActionButton
                onClick={() => scrollToSection("projects")}
                ariaLabel="Explore my work"
              >
                Explore my work
                <ArrowRight
                  size={15}
                  className="transition-transform duration-500 group-hover:translate-x-0.5"
                />
              </ActionButton>
              <ActionButton
                variant="glass"
                href={profile.resume}
                download="Avula-Vamshidhar-Resume.pdf"
                ariaLabel="Download resume as PDF"
              >
                Download resume
                <Download size={14} className="text-muted" />
              </ActionButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line/10 pt-5 text-[11px] text-faint"
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative h-1 w-1 rounded-full bg-accent" />
                </span>
                <span className="font-mono tabular-nums tracking-[0.06em] text-ink/80">
                  {time}
                </span>
                <span className="uppercase tracking-[0.16em]">{zone}</span>
              </span>
              <span className="hidden h-3 w-px bg-line/15 sm:block" />
              <span className="hidden sm:inline">Hyderabad, India</span>
              <span className="hidden h-3 w-px bg-line/15 lg:block" />
              <span className="hidden lg:inline">
                B.Tech CSE — Data Science
              </span>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5">
            <motion.div
              style={{ y: portraitY }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 30 }}
              animate={start ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.15, delay: 0.35, ease: EASE }}
            >
              <PortraitFrame />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection("about");
        }}
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-2.5 text-[9px] uppercase tracking-[0.4em] text-faint transition-colors hover:text-ink lg:flex"
        data-cursor="link"
        aria-label="Scroll to about section"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-line/15">
          <span className="absolute left-0 top-0 h-2.5 w-px animate-scroll-dot bg-ink/80" />
        </span>
      </motion.a>
    </section>
  );
}

function PortraitFrame() {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 18 });

  return (
    <div className="relative mx-auto w-full max-w-[382px] [perspective:1400px] lg:ml-auto lg:mr-0">
      {/* Ambient bloom behind the portrait */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-[1.18] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgb(var(--accent)/0.26),transparent_62%)] blur-3xl"
      />

      {/* Orbit rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-full border border-line/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-9 hidden rounded-full border border-dashed border-line/[0.08] sm:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 animate-spin-slow rounded-full"
      >
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgb(var(--accent))]" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(event) => {
          if (reduce || event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 9);
          rotateX.set((0.5 - (event.clientY - rect.top) / rect.height) * 7);
        }}
        onPointerLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
        }}
        className="relative"
      >
        <div className="glass group relative rounded-full p-2.5 sm:p-3">
          <div className="portrait-shine relative aspect-square overflow-hidden rounded-full bg-surface">
            <Portrait eager focus="50% 32%" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/15"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_116%,rgba(0,0,0,0.42),transparent_54%)]"
            />
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-1 h-px rounded-full bg-gradient-to-r from-transparent via-white/55 to-transparent"
          />
        </div>

        <div
          className="absolute -left-1 top-[15%] hidden sm:block"
          style={{ transform: "translateZ(70px)" }}
        >
          <Magnetic strength={0.4}>
            <div className="glass-strong flex items-center gap-2 rounded-full px-3 py-2 text-[10.5px] text-white/80 shadow-xl">
              <MapPin size={11} className="text-accent" />
              Hyderabad, IN
            </div>
          </Magnetic>
        </div>

        <div
          className="absolute -right-1 bottom-[16%] hidden sm:block"
          style={{ transform: "translateZ(90px)" }}
        >
          <div className="glass-strong flex items-center gap-2 rounded-full px-3 py-2 text-[10.5px] text-white/80 shadow-xl">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            Open to opportunities
          </div>
        </div>
      </motion.div>

      {/* Identity strip overlapping the circle */}
      <div className="glass-strong relative z-10 mx-auto -mt-7 flex w-[88%] items-center justify-between gap-3 rounded-2xl px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-medium tracking-tight">
            {profile.fullName}
          </p>
          <p className="mt-0.5 truncate text-[10px] text-muted">
            Software Developer · Data Science
          </p>
        </div>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-accent">
          <Sparkles size={12} />
        </span>
      </div>
    </div>
  );
}
