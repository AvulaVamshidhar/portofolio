import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Scroll-triggered reveal. Kept cheap: opacity + small translate + blur. */
export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-14",
        className,
      )}
    >
      <div className="max-w-3xl">
        <Reveal>
          <span className="eyebrow">
            <span aria-hidden className="h-px w-6 bg-accent/70" />
            {index} — {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 text-[clamp(2.15rem,5.4vw,3.85rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            {title}
          </h2>
        </Reveal>
      </div>
      {description ? (
        <Reveal delay={0.12} className="max-w-xs md:pb-2 md:text-right">
          <p className="text-[13.5px] leading-relaxed text-muted">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
