# Avula Vamshidhar — Personal Portfolio

A dark-first, Apple-inspired portfolio for **Avula Vamshidhar**, Software Developer & Data Science Student.
Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Before publishing

1. **Profile photograph** — included at `public/profile.jpg`, sourced from the
   GitHub avatar at its native 460×460 resolution (GitHub's maximum) and stored
   as a quality-96 JPEG. Both frames are circular, matching the source portrait.
   Replace the file to update the photo; `.jpeg`, `.png` and `.webp` are also
   picked up automatically. Crop framing is set via the `focus` prop on
   `<Portrait />` in `Hero.tsx` / `About.tsx`.
2. **Project links** — the GitHub and Live Demo buttons are intentionally inert
   ("Soon") because no repository or demo URLs were supplied. Add them to the
   `github` / `demo` fields in `src/lib/data.ts` and update `PendingAction` in
   `src/components/Projects.tsx` to render links once URLs exist.
3. **Resume** — `public/avula-vamshidhar-resume.pdf` is generated from the
   supplied resume content. Regenerate after editing content with:

   ```bash
   npm run resume
   ```

## Structure

```
src/
  components/        UI, chrome (nav, cursor, loader, palette) and sections
  components/ui/     Reveal, SectionHeading, Magnetic, ActionButton, Portrait
  hooks/             useClock, useScrollSpy, useMagnetic, useTilt, useMediaQuery
  lib/               data (all content), app-context, motion, utils
  index.css          design tokens, glass materials, cursor and motion primitives
scripts/             resume PDF generator
public/              favicon, profile photo, resume PDF
```

All copy and content lives in `src/lib/data.ts` — edit there rather than in the
section components.

## Design system

- Background `#08090D`, surface `#111318`, text `#FFFFFF` / `#A1A1AA`
- Accent electric blue `#3B82F6`, subtle violet `#8B5CF6`
- Liquid-glass materials are CSS variables + `.glass` / `.glass-strong` layers,
  so light mode gets its own tuned material instead of an inverted dark theme.
- Typography: Inter (variable) for UI, Instrument Serif for editorial accents.

## Interaction notes

- Custom magnetic cursor, pointer spotlight and 3D card tilt are all mouse-only
  and switch off for touch and `prefers-reduced-motion`.
- Magnetic buttons are a few pixels of travel, not a full cursor replacement.
- Native scrolling is preserved (no scroll hijacking); the smooth behaviour comes
  from CSS plus Framer Motion scroll-linked transforms.
- Hover sounds are synthesised with the Web Audio API, default **off**, and
  remembered in `localStorage`.
- Theme preference is remembered and applied before first paint to avoid flashes.

## Accessibility

Semantic landmarks, skip link, visible focus rings, labelled controls,
`aria-current` navigation state, keyboard-driven command palette with
`role="dialog"`, inline form errors with `role="alert"`, and full
`prefers-reduced-motion` handling.

## Deploy

Static build — deploy on Vercel with:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

No environment variables or server runtime are required.
