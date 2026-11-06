import { useState } from "react";
import { cn } from "../../lib/utils";

interface PortraitProps {
  className?: string;
  eager?: boolean;
  alt?: string;
  /** CSS object-position — tunes the crop so the face stays in frame. */
  focus?: string;
}

/**
 * Drop the real photograph into `public/` as profile.jpg, profile.jpeg,
 * profile.png or profile.webp and it is picked up automatically. Until then a
 * designed monogram panel holds the composition.
 */
const PHOTO_CANDIDATES = [
  "/profile.jpg",
  "/profile.jpeg",
  "/profile.png",
  "/profile.webp",
] as const;

export function Portrait({
  className,
  eager = false,
  alt = "Portrait of Avula Vamshidhar",
  focus = "50% 30%",
}: PortraitProps) {
  const [candidate, setCandidate] = useState(0);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const src = PHOTO_CANDIDATES[candidate];

  const handleError = () => {
    if (candidate < PHOTO_CANDIDATES.length - 1) {
      setCandidate((index) => index + 1);
      setState("loading");
      return;
    }
    setState("error");
  };

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-surface", className)}>
      {state !== "error" ? (
        <>
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              state === "ready" ? "opacity-0" : "opacity-100",
            )}
            style={{
              background:
                "radial-gradient(90% 80% at 30% 15%, rgb(var(--accent) / 0.22), transparent 65%), radial-gradient(80% 80% at 80% 90%, rgb(var(--accent-2) / 0.2), transparent 60%)",
            }}
          />
          <img
            key={src}
            src={src}
            alt={alt}
            width={460}
            height={460}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={eager ? "high" : "auto"}
            draggable={false}
            onLoad={() => setState("ready")}
            onError={handleError}
            style={{ objectPosition: focus }}
            className={cn(
              "h-full w-full object-cover transition-all duration-[900ms] ease-out-expo group-hover:scale-[1.03]",
              state === "ready"
                ? "scale-[1.015] opacity-100 blur-0"
                : "scale-[1.05] opacity-0 blur-md",
            )}
          />
        </>
      ) : (
        <MonogramFallback />
      )}
    </div>
  );
}

function MonogramFallback() {
  return (
    <div
      className="relative grid h-full w-full place-items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(100% 90% at 20% 0%, rgb(var(--accent) / 0.28), transparent 62%), radial-gradient(90% 90% at 85% 100%, rgb(var(--accent-2) / 0.26), transparent 58%), rgb(var(--surface))",
      }}
      role="img"
      aria-label="Monogram placeholder for the portrait of Avula Vamshidhar"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--line) / 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line) / 0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 50% 45%, black 20%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 45%, black 20%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="absolute h-[68%] w-[68%] rounded-full border border-line/10"
      />
      <div
        aria-hidden
        className="absolute h-[86%] w-[86%] rounded-full border border-line/[0.06]"
      />
      <div className="relative text-center">
        <span className="font-serif text-[clamp(4rem,11vw,7rem)] italic leading-none text-ink/90">
          AV
        </span>
        <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.4em] text-muted">
          Portrait
        </p>
      </div>
    </div>
  );
}
