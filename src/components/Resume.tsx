import { ArrowUpRight, Award, Download } from "lucide-react";
import { ActionButton } from "./ui/ActionButton";
import { Reveal } from "./ui/Reveal";
import {
  certifications,
  education,
  profile,
  projects,
  skillCategories,
  skills,
} from "../lib/data";

export function Resume() {
  const grouped = skillCategories
    .filter((category) => category.id !== "all")
    .map((category) => ({
      label: category.label,
      items: skills
        .filter((skill) => skill.category === category.id)
        .map((skill) => skill.name),
    }));

  return (
    <section id="resume" className="relative py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <div className="glass relative overflow-hidden rounded-[30px] p-6 sm:p-8 lg:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-accent/[0.14] blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-accent-2/[0.12] blur-[100px]"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="eyebrow">
                <span aria-hidden className="h-px w-6 bg-accent/70" />
                04 — Resume
              </span>
              <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.35rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                The short{" "}
                <span className="font-serif font-normal italic tracking-[-0.02em] text-ink/70">
                  version
                </span>
                .
              </h2>
              <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-muted">
                Education, technical skills, projects and certifications. One
                page, no filler — the same document I send to teams.
              </p>

              <div className="mt-8">
                <ActionButton
                  href={profile.resume}
                  download="Avula-Vamshidhar-Resume.pdf"
                  ariaLabel="Download the resume as a PDF"
                >
                  Download resume
                  <Download size={14} />
                </ActionButton>
              </div>
              <p className="mt-3 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                PDF <span className="h-1 w-1 rounded-full bg-faint" /> One page
                <span className="h-1 w-1 rounded-full bg-faint" /> 2026
              </p>

              <div className="mt-10">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-faint">
                  Certifications
                </p>
                <ul className="mt-4 space-y-2">
                  {certifications.map((certification) => {
                    const content = (
                      <>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line/10 bg-ink/[0.05] text-accent">
                          <Award size={14} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12.5px] font-medium tracking-tight">
                            {certification.name}
                          </span>
                          <span className="mt-0.5 block text-[10.5px] text-faint">
                            {certification.issuer} · {certification.year}
                          </span>
                        </span>
                        {certification.href ? (
                          <ArrowUpRight
                            size={14}
                            className="shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-ink"
                          />
                        ) : null}
                      </>
                    );

                    return (
                      <li key={certification.name}>
                        {certification.href ? (
                          <a
                            href={certification.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group flex items-center gap-3 rounded-xl border border-line/10 bg-ink/[0.03] p-3 transition-colors duration-300 hover:border-line/20 hover:bg-ink/[0.05]"
                            data-cursor="link"
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="flex items-center gap-3 rounded-xl border border-line/10 bg-ink/[0.03] p-3">
                            {content}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 lg:border-l lg:border-line/10 lg:pl-12">
              <Reveal>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-faint">
                  Education
                </p>
                <ol className="mt-5 space-y-6">
                  {education.map((entry) => (
                    <li key={entry.institution} className="relative pl-6">
                      <span
                        aria-hidden
                        className="absolute left-0 top-1.5 grid h-3 w-3 place-items-center rounded-full border border-line/20 bg-bg"
                      >
                        <span className="h-1 w-1 rounded-full bg-accent" />
                      </span>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[13.5px] font-medium leading-snug tracking-tight">
                          {entry.program}
                        </p>
                        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                          {entry.status}
                        </span>
                      </div>
                      <p className="mt-1 text-[11.5px] text-muted">
                        {entry.institution}
                      </p>
                      <p className="mt-0.5 text-[11px] text-faint">{entry.detail}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.08} className="mt-10">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-faint">
                  Selected work
                </p>
                <ul className="mt-4 divide-y divide-line/10">
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                    >
                      <span className="text-[13px] font-medium tracking-tight">
                        {project.title}
                      </span>
                      <span className="text-[10.5px] text-faint">
                        {project.tech.slice(0, 4).join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.14} className="mt-10">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-faint">
                  Technical skills
                </p>
                <dl className="mt-4 space-y-2.5">
                  {grouped.map((group) => (
                    <div
                      key={group.label}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                    >
                      <dt className="w-32 shrink-0 text-[10px] uppercase tracking-[0.14em] text-faint">
                        {group.label}
                      </dt>
                      <dd className="flex-1 text-[12px] leading-relaxed text-ink/75">
                        {group.items.join(", ")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.2} className="mt-10">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line/10 bg-ink/[0.03] px-4 py-3">
                  <p className="text-[11.5px] text-muted">
                    Open to software development and data roles.
                  </p>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    {profile.availability}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
