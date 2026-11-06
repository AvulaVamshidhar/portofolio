import { useCallback, useRef } from "react";
import {
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";

interface MagneticResult {
  ref: React.RefObject<HTMLDivElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  handlers: {
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerLeave: () => void;
  };
}

/**
 * Magnetic pull toward the pointer, capped to a few pixels so it feels
 * physical rather than gimmicky. Disabled for touch and reduced motion.
 */
export function useMagnetic(strength = 0.28): MagneticResult {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 260, damping: 20, mass: 0.35 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || event.pointerType !== "mouse") return;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      const limit = 10;
      x.set(Math.max(-limit, Math.min(limit, offsetX * strength)));
      y.set(Math.max(-limit, Math.min(limit, offsetY * strength)));
    },
    [reduce, strength, x, y],
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x, y, handlers: { onPointerMove, onPointerLeave } };
}
