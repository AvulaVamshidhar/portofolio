import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "../lib/data";
import { EASE } from "../lib/motion";

/** Premium intro: the AV monogram, a hairline progress bar, then a soft clean exit. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.loading = "true";

    const timer = window.setTimeout(
      () => setVisible(false),
      reduce ? 260 : 1500,
    );

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      delete document.documentElement.dataset.loading;
    };
  }, [reduce]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        delete document.documentElement.dataset.loading;
        onDone();
      }}
    >
      {visible ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.75, ease: EASE }}
          aria-label="Loading portfolio"
          role="status"
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, rgb(var(--accent) / 0.14), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-serif text-[86px] italic leading-none tracking-[-0.03em] sm:text-[104px]"
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--ink)) 10%, rgb(var(--accent)) 62%, rgb(var(--accent-2)) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {profile.initials}
            </motion.span>

            <div className="mt-7 h-px w-[168px] overflow-hidden bg-line/12">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduce ? 0.2 : 1.15,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="h-px w-full origin-left bg-gradient-to-r from-accent via-accent to-accent-2"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-5 font-mono text-[9px] uppercase tracking-[0.42em] text-faint"
            >
              Avula Vamshidhar
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
