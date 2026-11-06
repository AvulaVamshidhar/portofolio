import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "../../hooks/useMagnetic";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Wraps an interactive element with a subtle magnetic pull. */
export function Magnetic({ children, className, strength }: MagneticProps) {
  const { ref, x, y, handlers } = useMagnetic(strength);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      {...handlers}
      className={className}
    >
      {children}
    </motion.div>
  );
}
