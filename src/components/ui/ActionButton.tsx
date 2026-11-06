import type { ReactNode } from "react";
import { Magnetic } from "./Magnetic";
import { cn } from "../../lib/utils";

type Variant = "primary" | "glass" | "ghost";

interface ActionButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  download?: boolean | string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-medium tracking-tight transition-all duration-500 ease-out-expo disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-bg shadow-[0_14px_40px_-20px_rgb(var(--accent)/0.65)] hover:shadow-[0_20px_50px_-20px_rgb(var(--accent)/0.85)]",
  glass:
    "glass text-ink hover:border-line/25 hover:shadow-[0_24px_60px_-40px_rgb(0_0_0/0.9)]",
  ghost: "text-muted hover:text-ink",
};

export function ActionButton({
  children,
  href,
  variant = "primary",
  className,
  magnetic = true,
  onClick,
  download,
  external,
  type = "button",
  disabled,
  ariaLabel,
}: ActionButtonProps) {
  const classes = cn(base, variants[variant], className);

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      >
        <span className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-14deg] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const element = href ? (
    <a
      href={href}
      onClick={onClick}
      download={download}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={classes}
      data-cursor="link"
    >
      {inner}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
      data-cursor="link"
    >
      {inner}
    </button>
  );

  if (!magnetic) return element;

  return <Magnetic className="inline-flex">{element}</Magnetic>;
}
