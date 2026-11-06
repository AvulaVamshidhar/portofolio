import { useCallback, useRef } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";

interface TiltResult {
  ref: React.RefObject<HTMLDivElement | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  glare: MotionValue<string>;
  handlers: {
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerLeave: () => void;
  };
}

/**
 * Subtle 3D tilt + moving glare for project cards. Mouse only.
 */
export function useTilt(maxTilt = 5.5): TiltResult {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 180, damping: 22, mass: 0.4 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.09), transparent 55%)`;

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || event.pointerType !== "mouse") return;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      rotateY.set((px - 0.5) * maxTilt * 2);
      rotateX.set((0.5 - py) * maxTilt * 2);
      glareX.set(px * 100);
      glareY.set(py * 100);
    },
    [reduce, maxTilt, rotateX, rotateY, glareX, glareY],
  );

  const onPointerLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  }, [rotateX, rotateY, glareX, glareY]);

  return {
    ref,
    rotateX,
    rotateY,
    glare,
    handlers: { onPointerMove, onPointerLeave },
  };
}
