import { useEffect, useRef, useState } from "react";

/**
 * A custom cursor with a lerped ring and an instant dot. Hover states are
 * driven by data attributes and CSS, so pointer movement never re-renders React.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;

    const handleMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;

      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      );

      let variant = "default";
      if (interactive) {
        const explicit = interactive.dataset.cursor;
        if (explicit) {
          variant = explicit;
        } else if (
          interactive.tagName === "INPUT" ||
          interactive.tagName === "TEXTAREA" ||
          interactive.tagName === "SELECT"
        ) {
          variant = "text";
        } else {
          variant = "link";
        }
      }
      if (ring.dataset.variant !== variant) ring.dataset.variant = variant;
    };

    const tick = () => {
      ringX += (pointerX - ringX) * 0.18;
      ringY += (pointerY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const hide = () =>
      document.documentElement.setAttribute("data-cursor-hidden", "true");
    const show = () =>
      document.documentElement.removeAttribute("data-cursor-hidden");

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      document.documentElement.removeAttribute("data-cursor-hidden");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none">
      <div ref={ringRef} className="cursor-ring" data-variant="default">
        <div className="cursor-ring__inner" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
