import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import { Reveal, SectionHeading } from "./ui/Reveal";
import { EASE } from "../lib/motion";
import {
  skillCategories,
  skills,
  type SkillCategory,
} from "../lib/data";
import { cn } from "../lib/utils";

type Filter = SkillCategory | "all";

export function Skills() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? skills
        : skills.filter((skill) => skill.category === filter),
    [filter],
  );

  const labelFor = (category: SkillCategory) =>
    skillCategories.find((entry) => entry.id === category)?.label ?? category;

  return (
    <section id="skills" className="relative py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Toolkit"
          title={
            <>
              The tools I{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-ink/70">
                think
              </span>{" "}
              in.
            </>
          }
          description="Languages, frameworks and practices I reach for when building software and working with data."
        />

        <Reveal delay={0.08} className="mt-10 lg:mt-14">
          <div
            role="group"
            aria-label="Filter skills by category"
            className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {skillCategories.map((category) => {
              const isActive = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(category.id)}
                  aria-pressed={isActive}
                  data-cursor="link"
                  className={cn(
                    "relative shrink-0 rounded-full border px-3.5 py-2 text-[12px] transition-colors duration-300",
                    isActive
                      ? "border-line/20 text-ink"
                      : "border-line/10 text-muted hover:border-line/20 hover:text-ink",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="skill-filter-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-ink/[0.07]"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.article
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="group relative overflow-hidden rounded-2xl border border-line/10 bg-ink/[0.028] p-4 transition-colors duration-500 hover:border-line/20 hover:bg-ink/[0.05] sm:p-5"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(240px circle at 26% 0%, rgb(var(--accent) / 0.16), transparent 68%)",
                    }}
                  />
                  <div className="relative flex items-start justify-between gap-2">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line/10 bg-ink/[0.05] text-muted transition-colors duration-500 group-hover:border-accent/30 group-hover:text-accent">
                      <Icon size={17} strokeWidth={1.7} />
                    </span>
                    <span className="rounded-full border border-line/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-faint opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {skill.kind}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-[13.5px] font-medium tracking-tight">
                    {skill.name}
                  </h3>
                  <p className="relative mt-1 text-[9.5px] uppercase tracking-[0.16em] text-faint">
                    {labelFor(skill.category)}
                  </p>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1} className="mt-7">
          <p className="flex items-start gap-2 text-[11px] leading-relaxed text-faint">
            <Info size={12} className="mt-0.5 shrink-0" />
            Proficiency meters are intentionally left out — the work above is the
            honest signal, not invented percentages.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
