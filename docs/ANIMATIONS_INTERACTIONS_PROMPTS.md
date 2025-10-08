# Animations & Interactions Prompts

This document defines concrete prompts and patterns to bring the interface to life. We will implement them incrementally. All timing and easing values are defaults unless otherwise noted.

---

## Part 1: Motion & Interactions

### Prompt 1.1: Fade-in on mount (Framer Motion)
- Initial: opacity 0, translateY 20px
- Animate: opacity 1, translateY 0
- Duration: 0.4s, easing "easeOut"
- Stagger: 0.1s between cards

Example (list with stagger):
```jsx
import { motion } from 'framer-motion'

const list = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

<motion.ul variants={list} initial="hidden" animate="show">
  {tasks.map(t => (
    <motion.li key={t.id} variants={item}>...</motion.li>
  ))}
</motion.ul>
```

### Prompt 1.2: Task Card Hover Effect
- Hover: scale 1 → 1.02
- Shadow: shadow-sm → shadow-lg
- Border: gray-200 → blue-300
- Duration: 0.2s
- Use Framer Motion whileHover + utility classes

```jsx
<motion.div
  className="task-card border border-gray-200 shadow-sm"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
  ...
</motion.div>
```

### Prompt 1.3: Checkbox Animation
- Scale 1 → 1.3 → 1 (spring)
- Checkmark draws L→R (SVG strokeDashoffset)
- Text fades 1 → 0.5; strikethrough expands 0% → 100%
- Total duration: ~0.5s

Steps:
1. Wrap checkbox in motion.div with spring scale on click
2. Use SVG with strokeDasharray = total length; animate strokeDashoffset to 0
3. Animate task title opacity + add absolute ::after for strikethrough width animation

### Prompt 1.4: Delete Animation (exit)
- Slide left 100px (0.3s), fade 1→0, scale 1→0.8
- After animation, unmount
- Remaining cards animate up (0.4s)

```jsx
<motion.div
  initial={{ opacity: 1 }}
  exit={{ x: -100, opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
/>
```

### Prompt 1.5: Page/Tab Transition
- New view: translateX 100% → 0, opacity 0 → 1
- Old view: 0 → -100%, opacity 1 → 0
- Duration: 0.4s, cubic-bezier(0.4, 0, 0.2, 1)
- Use AnimatePresence

### Prompt 1.6: Active Tab Indicator (Sidebar)
- Blue-500 vertical bar on active item
- Animate to new item with layoutId
- Slight height scale 1 → 1.1 → 1 on move

```jsx
{items.map(i => (
  <div key={i.id} className="relative">
    {active === i.id && (
      <motion.span layoutId="active-line" className="absolute left-0 top-0 h-full w-1 bg-blue-500" />
    )}
    ...
  </div>
))}
```

### Prompt 1.7: Metric Count Up
- Animate numbers 0 → value
- Duration 1.5s, easeOut
- Use react-countup or custom hook with requestAnimationFrame
- Trigger when in viewport (IntersectionObserver)

### Prompt 1.8: "+ New Task" Button Micro-interaction
- Hover: bg blue-500 → blue-600; + icon rotates 90deg
- Click: scale 1 → 0.95 → 1 (spring bounce)
- Optional ripple effect from click position

### Prompt 1.9: Filter Buttons (Chips)
- Active: background morph to blue-500; text → white
- Inactive: hover bg gray-100
- Use layoutId on background for smooth morph

---

## Part 2: Icons & Visual Improvements

### Prompt 2.1: Hero Icons Setup
1. `npm i @heroicons/react`
2. Create IconWrapper: props { name, size, variant }
3. Map names to outline/solid icons
4. Default: outline; active: solid with fade+scale cross-fade

### Prompt 2.2: Sidebar Icons with States
- Map sections to icons (Dashboard/Tasks/Projects/Calendar/Settings)
- Active: swap to solid, cross-fade 0.2s + slight scale

### Prompt 2.3: Metrics Icons
- Total: ClipboardDocumentListIcon (orange)
- In Progress: ClockIcon (yellow, slow rotate)
- Completed: CheckCircleIcon (green, pulse)
- Overdue: ExclamationTriangleIcon (red, subtle shake)

### Prompt 2.4: Card Depth
- Default: border-gray-200, bg-white, shadow-sm
- Hover: border-gray-300, bg-gray-50, shadow-md
- Transition: 300ms ease-in-out

### Prompt 2.5: Glassmorphism for Metrics
- bg-white/80 + backdrop-blur-md + border-white/20
- shadow-xl with colored tint (blue-500/10)

---

## Part 3: Empty States & Skeletons

### Prompt 3.1: Empty State Component
- Centered column, py-16
- Illustration (200x200), heading, description, CTA
- Fade-in on mount

### Prompt 3.2: Loading Skeletons
- 3 skeleton task cards
- Shimmer gradient animation
- Fade out, replace with data smoothly

---

## Part 4: Haptic & Audio Feedback

### Prompt 4.1: useHaptic Hook
- `navigator.vibrate` fallback-aware
- Levels: light(10ms), medium(20ms), heavy(50ms)
- Respect user preference (enable/disable)

### Prompt 4.2: Audio Manager
- Methods: preload, play(name, volume=0.3)
- Sounds: task-complete.mp3, task-delete.mp3, button-click.mp3
- Respect reduced-motion

### Prompt 4.3: Integration
- Complete: medium haptic + complete sound
- Delete: heavy haptic + delete sound
- Filter click: light haptic
- New task: light haptic + click sound

---

## Part 5: Advanced Interactions

### Prompt 5.1: Drag & Drop (Reordering)
- Grab: scale 1.05, shadow lg, rotate 2deg
- Dragging: cursor-grabbing, opacity 0.8
- Drop zones highlight dashed; other cards shift with spring
- Libraries: @dnd-kit/core or framer-motion drag

### Prompt 5.2: Mobile Swipe Actions
- Swipe right: Complete (green background)
- Swipe left: Delete (red background)
- Threshold 80px (trigger preview), >150px (commit)
- Haptic feedback on threshold

### Prompt 5.3: Search with Debounce Animation
- While typing: search icon → spinner
- Results fade with 0.05s stagger
- Highlight matched text
- Debounce 300ms; clear button rotates on clear

---

## Part 6: Dark Mode Transitions

### Prompt 6.1: Dark Mode Toggle Animation
- Sun ↔ Moon cross-fade + 180° rotate (0.3s)
- Background/text/borders transition 0.3s
- Persist in localStorage; respect system preference

### Prompt 6.2: Theme Ripple (Bonus)
- Ripple from toggle button using View Transitions API (if supported)
- Duration 0.6s easeInOut; elements color-fade during ripple

---

## Part 7: Micro-interactions

### Prompt 7.1: Priority Badge Animation
- Low: subtle pulse (green), Medium: pulse (yellow), High: strong pulse + glow (red)
- Hover: scale 1.1 + tooltip fade-in
- Click-to-change: rotate + color morph (optional)

### Prompt 7.2: Due Date Countdown
- >24h: static
- <24h: text fades to red + pulse
- Overdue: shake + light red background
- Live updates via setInterval(1s) with requestAnimationFrame for smoothness

---

## Implementation Notes

1) Start with P0 visuals: card depth, big metrics, density, clear hover/focus. Then add animations in this order: mount fade-in → hover → checkbox → delete exit → tab/page transitions → count-up → button/filter micro-interactions.
2) Keep `prefers-reduced-motion` in mind; guard all animations accordingly.
3) Gate haptic/audio behind user settings and avoid spamming.
4) Use `layoutId` where continuity matters (active chips/indicator).
5) Keep transitions short (200–400ms) and consistent.
