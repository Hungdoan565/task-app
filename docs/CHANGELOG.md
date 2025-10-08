# Changelog

All notable changes to this project will be documented here.

## 2025-10-08 – Sprint B (P1) UI Enhancements

- Added reusable EmptyState component (src/components/ui/EmptyState.jsx) with illustration, motion fade-in, and CTA button.
- Wired EmptyState into HomePage when no tasks are found.
- Applied typography scale variables and updated dashboard header sizing (h2 → 24px) on HomePage.
- Polished global focus-visible rings and transitions for interactive elements (buttons, inputs, selects, links) via globals.css.
- Added prefers-reduced-motion guard for animations/transitions in globals.css.

Notes:
- EmptyState uses Tailwind utility classes and shadcn/ui Button for consistency.
- Further typography pass on other pages/components can use the new CSS variables (--fs-h1, --fs-h2, --fs-h3, etc.).
