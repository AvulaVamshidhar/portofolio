import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { AppProvider } from "./lib/app-context";
import { Backdrop } from "./components/Backdrop";
import { Cursor } from "./components/Cursor";
import { Spotlight } from "./components/Spotlight";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import { ScrollProgress } from "./components/ScrollProgress";
import { BackToTop } from "./components/BackToTop";
import { CommandPalette } from "./components/CommandPalette";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [intro, setIntro] = useState(false);

  return (
    <AppProvider>
      <MotionConfig reducedMotion="user">
        <div className="grain relative min-h-screen">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[220] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[12px] focus:font-medium focus:text-bg"
          >
            Skip to content
          </a>

          <Loader onDone={() => setIntro(true)} />
          <Backdrop />
          <Spotlight />
          <Cursor />
          <ScrollProgress />
          <Nav />

          <main id="main" className="relative">
            <Hero start={intro} />
            <About />
            <Skills />
            <Projects />
            <Resume />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
          <CommandPalette />
        </div>
      </MotionConfig>
    </AppProvider>
  );
}
