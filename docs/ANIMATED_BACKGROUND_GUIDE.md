# 🎨 AnimatedBackground Component Guide

## Overview
The `AnimatedBackground` component provides stunning animated backgrounds with multiple variants to choose from. Each variant offers unique visual effects perfect for modern web applications.

## Basic Usage

```jsx
import AnimatedBackground from '../components/ui/AnimatedBackground'

function MyPage() {
  return (
    <AnimatedBackground variant="gradient-orbs" className="min-h-screen">
      <YourContent />
    </AnimatedBackground>
  )
}
```

## Available Variants

### 1. **Default** (recommended)
```jsx
<AnimatedBackground variant="default">
```
- ✨ Combination of particles + gradient orbs
- 🎨 Balanced visual appeal
- ⚡ Good performance
- 💡 **Best for:** General purpose, auth pages

**Features:**
- 25 floating particles
- 3 large gradient orbs (primary, secondary, accent)
- Mouse parallax effect
- Smooth animations

---

### 2. **Particles**
```jsx
<AnimatedBackground variant="particles">
```
- ✨ 30 floating particle elements
- 🌟 Clean and minimal
- ⚡ Lightweight performance
- 💡 **Best for:** Subtle backgrounds, focus on content

**Features:**
- More particles for dense effect
- Random sizes (1-5px)
- Vertical and horizontal movement
- Opacity pulsing

---

### 3. **Blobs**
```jsx
<AnimatedBackground variant="blobs">
```
- 🫧 3 large morphing blob shapes
- 🎨 Abstract and artistic
- 🌈 Mix-blend-multiply effect
- 💡 **Best for:** Creative designs, portfolios

**Features:**
- Primary blob (96x96, top-left)
- Secondary blob (80x80, bottom-right)
- Accent blob (72x72, center)
- Continuous morphing animation
- Heavy blur (3xl)

---

### 4. **Gradient Orbs** (current default for auth)
```jsx
<AnimatedBackground variant="gradient-orbs">
```
- 🔮 Large radial gradient spheres
- 🌟 Rotating and scaling animations
- ✨ Most visually impressive
- 💡 **Best for:** Hero sections, landing pages, auth pages

**Features:**
- 3 massive gradient orbs (800px, 600px, 400px)
- Rotating animation (30s, 25s, 20s cycles)
- Opacity pulsing
- Radial gradient from 30% to transparent

---

### 5. **Waves**
```jsx
<AnimatedBackground variant="waves">
```
- 🌊 Animated wave pattern at bottom
- ✨ 20 particles in sky
- 🎨 Ocean/water theme
- 💡 **Best for:** Aquatic themes, calm designs

**Features:**
- SVG wave animation
- Morphing wave paths
- 10s animation cycle
- Particles floating above

---

### 6. **Mesh**
```jsx
<AnimatedBackground variant="mesh">
```
- 🎨 Multiple gradient mesh layers
- 🌈 Conic gradient overlay
- ✨ Modern abstract look
- 💡 **Best for:** Tech/modern designs, dashboards

**Features:**
- 3 radial gradients at different positions
- 1 conic gradient overlay
- All gradients at 40% opacity
- No animation (static but beautiful)

---

## Advanced Customization

### Custom Mouse Parallax Strength

The background responds to mouse movement. To adjust:

```jsx
// In AnimatedBackground.jsx, modify:
const x = (clientX / width - 0.5) * 20  // Change 20 to your desired strength
const y = (clientY / height - 0.5) * 20
```

### Custom Particle Count

```jsx
// In your component
<AnimatedBackground variant="particles">
  <ParticleField count={50} /> {/* Custom count */}
</AnimatedBackground>
```

### Combining Elements

You can create custom variants by combining components:

```jsx
<AnimatedBackground variant="default" className="min-h-screen">
  <ParticleField count={100} />
  <GradientOrbs />
  <WavePattern />
  {children}
</AnimatedBackground>
```

## Performance Tips

### 1. **Particle Count**
- Mobile: 15-20 particles
- Desktop: 25-50 particles
- High-end: 50-100 particles

### 2. **Animation Optimization**
- Use `will-change: transform` for animated elements
- Prefer `transform` and `opacity` over other properties
- Use `transform3d` to trigger GPU acceleration

### 3. **Conditional Rendering**
```jsx
const isMobile = window.innerWidth < 768

<AnimatedBackground 
  variant={isMobile ? "particles" : "gradient-orbs"}
>
```

## Dark Mode Support

All variants automatically support dark mode:

```css
/* Light mode */
from-warm-gray-50 via-warm-gray-100

/* Dark mode */
dark:from-warm-gray-900 dark:via-warm-gray-800
```

## Responsive Design

Variants automatically adjust for mobile:

```jsx
// Example: Reduce complexity on mobile
<AnimatedBackground 
  variant={window.innerWidth < 768 ? "particles" : "gradient-orbs"}
  className="min-h-screen"
>
```

## Color Customization

To change gradient colors, modify in `globals.css`:

```css
@theme {
  --color-primary-400: #8198ff;    /* Change primary color */
  --color-secondary-400: #2dd4bf;  /* Change secondary color */
  --color-accent-400: #e879f9;     /* Change accent color */
}
```

## Accessibility

- All animations respect `prefers-reduced-motion`
- Backgrounds don't interfere with content readability
- Proper contrast maintained in both light/dark modes

## Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (with reduced particle count)

## Examples

### Example 1: Login Page
```jsx
<AnimatedBackground variant="gradient-orbs" className="min-h-screen">
  <LoginForm />
</AnimatedBackground>
```

### Example 2: Dashboard Hero
```jsx
<AnimatedBackground variant="mesh" className="h-96">
  <Hero title="Welcome Back" />
</AnimatedBackground>
```

### Example 3: Landing Page
```jsx
<AnimatedBackground variant="waves" className="min-h-screen">
  <LandingContent />
</AnimatedBackground>
```

## Troubleshooting

### Performance Issues
1. Reduce particle count
2. Use simpler variant (particles instead of gradient-orbs)
3. Disable mouse parallax effect

### Visual Issues
1. Check z-index conflicts
2. Verify backdrop-filter support
3. Test in different browsers

### Animation Stutter
1. Add `will-change: transform` to animated elements
2. Use `transform3d(0,0,0)` to force GPU acceleration
3. Reduce animation complexity

## Related Files

- `src/components/ui/AnimatedBackground.jsx` - Main component
- `src/hooks/useAnimations.js` - Animation hooks
- `src/styles/globals.css` - Animation keyframes and utilities

## Credits

Designed and developed for modern React applications with Framer Motion and Tailwind CSS.
