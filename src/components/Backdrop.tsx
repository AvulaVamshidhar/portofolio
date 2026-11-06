/** Fixed ambient background: gradient light, a masked grid and a vignette. */
export function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_75%_at_50%_-8%,rgb(var(--surface)/0.9),transparent_62%)]" />

      <div className="absolute -left-[18%] top-[-14%] h-[62vw] max-h-[760px] w-[62vw] max-w-[760px] animate-drift rounded-full bg-accent/[0.16] blur-[130px]" />
      <div className="absolute -right-[14%] top-[26%] h-[54vw] max-h-[640px] w-[54vw] max-w-[640px] animate-drift-reverse rounded-full bg-accent-2/[0.14] blur-[140px]" />
      <div className="absolute bottom-[-18%] left-[24%] h-[46vw] max-h-[520px] w-[46vw] max-w-[520px] animate-drift rounded-full bg-accent/[0.08] blur-[150px]" />

      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--line) / 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line) / 0.22) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage:
            "radial-gradient(ellipse 90% 65% at 50% 10%, black 10%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 65% at 50% 10%, black 10%, transparent 78%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t from-bg via-bg/70 to-transparent" />
    </div>
  );
}
