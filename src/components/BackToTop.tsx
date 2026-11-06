import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";
import { EASE } from "../lib/motion";
import { scrollToSection } from "../lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 760);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.92 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed bottom-5 right-5 z-[110] sm:bottom-7 sm:right-7"
        >
          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              aria-label="Back to top"
              data-cursor="link"
              className="glass-strong group grid h-11 w-11 place-items-center rounded-full text-muted transition-colors duration-300 hover:text-ink"
            >
              <ArrowUp
                size={16}
                className="transition-transform duration-500 group-hover:-translate-y-0.5"
              />
            </button>
          </Magnetic>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
