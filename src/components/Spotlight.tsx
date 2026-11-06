import { useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

/**
 * Global ambient spotlight that drifts toward the pointer. Transform-only,
 * so it stays on the compositor; disabled entirely on touch devices.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (!finePointer || reduce) return;
    const node = ref.current;
    if (!node) return;

    let targetX = window.innerWidth * 0.62;
    let targetY = window.innerHeight * 0.28;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      node.style.transform = `translate3d(${currentX - 450}px, ${currentY - 450}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    node.style.transform = `translate3d(${currentX - 450}px, ${currentY - 450}px, 0)`;
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [finePointer, reduce]);

  if (!finePointer || reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        ref={ref}
        className="h-[900px] w-[900px] rounded-full opacity-[0.32] blur-[110px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent) / 0.3) 0%, rgb(var(--accent-2) / 0.12) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
