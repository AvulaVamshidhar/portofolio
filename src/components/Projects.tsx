import { ArrowUpRight, Check, Github } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/Reveal";
import { ProjectPreview } from "./ProjectPreview";
import { useTilt } from "../hooks/useTilt";
import { projects, type Project } from "../lib/data";
import { cn } from "../lib/utils";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title={
            <>
              Things I&rsquo;ve{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-ink/70">
                built
              </span>
              .
            </>
          }
          description="Two projects taken end to end — from data ingestion and APIs to the interface people actually touch."
        />

        <div className="mt-12 lg:mt-16">
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:gap-7 md:overflow-visible md:px-0 md:pb-0">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} flip={index % 2 === 1} />
            ))}
          </div>
          <p className="mt-3 flex items-center gap-2 text-[10.5px] text-faint md:hidden">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Swipe to explore the second project
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  const { ref, rotateX, rotateY, glare, handlers } = useTilt();

  return (
    <motion.article
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      {...handlers}
      data-cursor="card"
      className="group relative w-[86%] shrink-0 snap-center overflow-hidden rounded-[26px] border border-line/10 bg-ink/[0.025] p-2.5 backdrop-blur-xl transition-colors duration-500 hover:border-line/20 sm:w-[88%] md:w-auto md:min-w-0"
    >
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 z-20 rounded-[26px]"
      />

      <div className="grid gap-3 lg:grid-cols-2 lg:gap-2">
        <div
          className={cn(
            "relative overflow-hidden rounded-[20px] border border-line/10",
            flip && "lg:order-2",
          )}
        >
          <ProjectPreview kind={project.mock} />
        </div>

        <div className="flex flex-col px-3 pb-5 pt-4 sm:px-5 lg:justify-center lg:px-8 lg:py-10">
          <div className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.24em] text-faint">
            <span className="text-accent">{project.index}</span>
            <span aria-hidden className="h-px w-4 bg-line/20" />
            {project.category}
          </div>

          <h3 className="mt-4 text-[clamp(1.65rem,3.2vw,2.15rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[11.5px] leading-snug text-muted">
            {project.subtitle}
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-5 space-y-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-[11.5px] leading-relaxed text-ink/70"
              >
                <Check size={12} className="mt-1 shrink-0 text-accent/80" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line/10 bg-ink/[0.04] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <PendingAction
              label="GitHub"
              icon={<Github size={13} />}
              project={project.title}
            />
            <PendingAction
              label="Live demo"
              icon={<ArrowUpRight size={13} />}
              project={project.title}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Public repository and demo URLs have not been supplied, so the buttons stay
 * visibly inert instead of pointing at invented links.
 */
function PendingAction({
  label,
  icon,
  project,
}: {
  label: string;
  icon: React.ReactNode;
  project: string;
}) {
  return (
    <button
      type="button"
      disabled
      title={`${label} link for ${project} is coming soon`}
      className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-line/10 px-3.5 py-2 text-[11.5px] text-muted/60"
    >
      {icon}
      {label}
      <span className="rounded-full bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-faint">
        Soon
      </span>
    </button>
  );
}
