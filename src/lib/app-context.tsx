import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

type Theme = "dark" | "light";
type Tone = "hover" | "click";

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  soundOn: boolean;
  toggleSound: () => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  notify: (message: string) => void;
  copyText: (text: string, message?: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside <AppProvider>");
  }
  return context;
}

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

function readSound(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("av-sound") === "on";
  } catch {
    return false;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [soundOn, setSoundOn] = useState<boolean>(readSound);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    null,
  );
  const toastTimer = useRef<number | undefined>(undefined);
  const audioRef = useRef<AudioContext | null>(null);

  /* Theme ---------------------------------------------------------- */
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    try {
      localStorage.setItem("av-theme", theme);
    } catch {
      /* storage can be unavailable */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "light" ? "#F4F4F6" : "#08090D");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  /* Sound ---------------------------------------------------------- */
  const playTone = useCallback((tone: Tone) => {
    if (typeof window === "undefined") return;
    const AudioCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtor) return;

    try {
      audioRef.current ??= new AudioCtor();
      const context = audioRef.current;
      if (context.state === "suspended") void context.resume();

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      const duration = tone === "hover" ? 0.09 : 0.16;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(tone === "hover" ? 1180 : 720, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        tone === "hover" ? 980 : 560,
        now + duration,
      );

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(
        tone === "hover" ? 0.018 : 0.032,
        now + 0.012,
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.02);
    } catch {
      /* audio is a progressive enhancement */
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((current) => {
      const next = !current;
      try {
        localStorage.setItem("av-sound", next ? "on" : "off");
      } catch {
        /* ignore */
      }
      if (next) {
        // Resume the audio context on this user gesture, then confirm audibly.
        window.setTimeout(() => playTone("click"), 30);
      }
      return next;
    });
  }, [playTone]);

  useEffect(() => {
    if (!soundOn) return;
    let last: Element | null = null;

    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const interactive = target?.closest(
        'a, button, [data-sound="true"], [role="button"]',
      );
      if (interactive && interactive !== last) {
        last = interactive;
        playTone("hover");
      }
    };
    const handleClick = () => playTone("click");

    document.addEventListener("pointerover", handleOver, { passive: true });
    document.addEventListener("click", handleClick, { passive: true });
    return () => {
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("click", handleClick);
    };
  }, [soundOn, playTone]);

  /* Command palette shortcut -------------------------------------- */
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* Toasts --------------------------------------------------------- */
  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const copyText = useCallback(
    async (text: string, message = "Copied to clipboard") => {
      try {
        await navigator.clipboard.writeText(text);
        notify(message);
      } catch {
        notify("Copy failed — select the text manually");
      }
    },
    [notify],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      toggleTheme,
      soundOn,
      toggleSound,
      paletteOpen,
      setPaletteOpen,
      notify,
      copyText,
    }),
    [
      theme,
      toggleTheme,
      soundOn,
      toggleSound,
      paletteOpen,
      notify,
      copyText,
    ],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[140] flex justify-center px-4"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[13px] text-ink shadow-2xl"
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                <Check size={11} strokeWidth={3} />
              </span>
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}
