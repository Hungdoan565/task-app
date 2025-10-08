# UI Redesign Guide

This document consolidates the current UI assessment and turns it into a concrete, prioritized plan. It is the source of truth we will follow while rebuilding the dashboard UI.

---

## 1) Current Assessment (Problems to Solve)

Visual hierarchy (weak)
- Stats cards look small and get lost in whitespace
- Task card is flat, lacks depth and focal points
- No clear attention path

Spacing & Density (wasteful)
- Excessive empty space (~70% of viewport unused)
- Stats need larger numbers and stronger presence
- Task list must occupy more vertical space

Typography (low contrast & hierarchy)
- Font sizes are too similar across elements
- Titles should be bigger and bolder
- Metric numbers must be 2–3x larger

Visual feedback (missing)
- Hover states are subtle or absent
- Checkbox has no micro-interaction
- New Task button not prominent

Empty state (weak)
- No illustration or motivational copy
- No strong CTA for first action

Sidebar (needs polish)
- Icons slightly small
- Active state not prominent enough
- User profile section missing at the bottom

Task card (too basic)
- Needs visual priority badge, due date cue, quick actions on hover
- Tags/labels, assignee avatar, subtask progress

Filters & actions bar (low prominence)
- Show Filters button too subtle
- Quick filter chips lack a strong active state
- Sort dropdown looks disabled

Performance & UX
- Loading and skeletons are not visible
- Missing error boundaries
- No optimistic update visuals

Accessibility
- Focus states not strong enough
- WCAG contrast needs verification
- Missing keyboard shortcut hints

---

## 2) Priorities & Acceptance Criteria

P0 – Critical
1) Density & Layout
- Task list area min-height: 60vh
- Above-the-fold must include: Search, Stats, Filters/Actions, and first screen of tasks

2) Stats Cards Redesign
- Number font-size: 2.5–3.0rem (clamp for responsive)
- Add trend indicator (▲/▼ N%) with color coding
- Card visual depth: subtle shadow and border

3) Task Card Enhancement
- Depth: default border-gray-200 + shadow-sm; hover: shadow-md + border-gray-300
- Priority badge with clear color coding (low/medium/high)
- Due date with icon and overdue cue (text + left border tint)
- Quick actions (edit/delete) appear on hover/focus

P1 – High
1) Empty State
- Add illustration (placeholder SVG ok)
- Title + helpful text + prominent CTA (“+ New Task”)

2) Typography Scale
- h1: 32–36px, h2: 24px, h3: 18px
- Body: 16px; Small: 14px; Caption: 12px
- Stats number: 40–48px (responsive clamp)

3) Interactive Feedback
- Clear hover/active/focus-visible states for chips/buttons/menus
- Checkbox micro-interactions on toggle

P2 – Medium
1) Sidebar Polish
- Icon size +10–15%
- Active state indicator (animated bar)
- User profile block at bottom with avatar + email + menu

2) Micro-animations
- Checkbox spring
- Smooth transitions on cards/menus

3) Filters UX
- Show Filters gains prominence
- Quick filter chips with strong active visuals

---

## 3) Design System (Typography, Spacing, Color)

Typography scale (rem)
- h1: clamp(2rem, 1.6rem + 1vw, 2.25rem)
- h2: 1.5rem
- h3: 1.125rem
- body: 1rem
- small: 0.875rem
- caption: 0.75rem
- metric number: clamp(2.5rem, 2rem + 2vw, 3rem)

Spacing & density
- Section gaps: 24–32px
- Grid gaps: 16–24px
- Card padding: 16–20px
- Task list min-height: 60vh

Color coding
- Primary: #3B82F6 (blue)
- Success: #10B981 (green)
- Warning: #F59E0B (orange)
- Danger: #EF4444 (red)
- Neutral: #6B7280 (gray)

States
- Hover: elevate + subtle tint
- Active: stronger border + background tint
- Focus-visible: 2px outline + 2px offset

---

## 4) Component Specifications (Updated)

Stats Card
- Large number, small label, optional trend badge
- Glass or soft-card styles (bg-white/80 + backdrop-blur)
- Clickable to filter task list

Task Card
- Title large/bold, multiline clamp 2
- Priority badge: colored badge + pulse on high severity
- Due date: icon + relative style (countdown if < 24h)
- Quick actions: reveal on hover/focus
- Tags (max 3) + "+N more" aggregator
- Assignee avatar (optional)
- Progress (optional): subtask completion ring

Sidebar
- Icon + label, larger icons
- Animated active indicator (motion layoutId)
- Bottom user profile (avatar + email + menu)

Filters & Actions
- Quick filter chips with strong active state
- Sort select with label and clear affordance
- Prominent "+ New Task" button (primary)
- Advanced filters panel via progressive disclosure

Empty State
- Illustration + heading + description + CTA
- Friendly tone, guides first action

---

## 5) Accessibility & Keyboard

- Strong focus-visible on all controls
- Keyboard shortcuts (display hints):
  - N: New task
  - J/K: Next/previous task
  - F or /: Focus search
  - Esc: Close menus/modals
- ARIA for menus, alerts, and live regions as needed
- Target WCAG 2.1 AA contrast

---

## 6) Performance & UX

- Skeleton loaders for task list and stats
- Error boundaries with friendly fallback
- Optimistic UI: fade/strike completed, fade-out delete, etc.

---

## 7) Implementation Order (Sprints)

Sprint A (P0)
- Layout density + min task list height
- Stats card redesign (big numbers + trend)
- Task card depth + hover + priority badge + due date cue + quick actions

Sprint B (P1)
- Empty state component + illustration
- Typography scale pass across dashboard
- Focus-visible + hover/active states polishing

Sprint C (P2)
- Sidebar polish + user profile block + active indicator motion
- Checkbox micro-animations + small transitions
- Filters prominence + chips improvements

Sprint D (Perf/A11y)
- Skeletons + error boundary
- Keyboard shortcuts + hints
- Contrast verification

---

## 8) Quick Wins (can do immediately)

CSS examples
- .stat-number { font-size: 2.5rem; font-weight: 700; }
- .task-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
- .stats-grid { gap: 1.5rem; margin-bottom: 2rem; }
- .task-list-container { min-height: 60vh; }

Use these as a baseline, then replace with design-system classes.
