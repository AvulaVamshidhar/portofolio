import type { ReactNode } from "react";
import { GraduationCap, MapPin, Target } from "lucide-react";
import { Reveal, SectionHeading } from "./ui/Reveal";
import { Portrait } from "./ui/Portrait";
import { education, interests, profile } from "../lib/data";

export function About() {
  const degree = education[0];

  return (
    <section id="about" className="relative py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Beyond the{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-ink/70">
                code
              </span>
              .
            </>
          }
          description="A developer who likes the part where clean engineering meets real, messy data."
        />

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="group relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent)/0.16),transparent_65%)] blur-2xl"
              />
              <div className="glass rounded-[30px] p-3">
                <div className="relative mx-auto w-full max-w-[340px]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-3 rounded-full border border-line/[0.08]"
                  />
                  <div className="portrait-shine relative aspect-square overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-white/10">
                    <Portrait focus="50% 28%" />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_116%,rgba(0,0,0,0.45),transparent_55%)]"
                    />
                  </div>
                </div>

                <div className="px-3 pb-4 pt-6 text-center">
                  <p className="text-[13.5px] font-medium tracking-tight">
                    {profile.fullName}
                  </p>
                  <p className="mt-1 text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    {profile.role}
                  </p>
                  <div className="hairline my-5" />
                  <p className="font-serif text-[17px] italic leading-snug text-ink/80">
                    “{profile.tagline}”
                  </p>
                  <p className="mt-4 flex items-center justify-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.26em] text-faint">
                    <MapPin size={9} /> Hyderabad, India
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:pt-2">
            <Reveal>
              <p className="text-[16.5px] leading-[1.75] text-ink/85 sm:text-[17.5px]">
                {profile.about}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 text-[14px] leading-[1.8] text-muted sm:text-[14.5px]">
                {profile.aboutSecondary}
              </p>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Reveal delay={0.12}>
                <InfoCard
                  icon={<GraduationCap size={14} />}
                  label="Education"
                  title="B.Tech — CSE (Data Science)"
                  detail={`${degree.institution} · 3rd year · CGPA 7.72`}
                />
              </Reveal>
              <Reveal delay={0.18}>
                <InfoCard
                  icon={<Target size={14} />}
                  label="Current focus"
                  title="Full-stack & applied data"
                  detail={profile.currentFocus}
                />
              </Reveal>
            </div>

            <Reveal delay={0.22} className="mt-8">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-faint">
                Interests
              </p>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <li key={interest} className="chip">
                    {interest}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  title,
  detail,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="glass h-full rounded-2xl p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-lg border border-line/10 bg-ink/[0.05] text-accent">
          {icon}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-faint">
          {label}
        </span>
      </div>
      <p className="mt-4 text-[13.5px] font-medium leading-snug tracking-tight">
        {title}
      </p>
      <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">{detail}</p>
    </div>
  );
}
