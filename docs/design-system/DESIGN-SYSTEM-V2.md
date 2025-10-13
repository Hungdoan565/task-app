# Design System V2
# TaskApp - Comprehensive Design System

**Version:** 2.0  
**Last Updated:** January 2025  
**Status:** Active

---

## Overview

TaskApp Design System V2 is a comprehensive, accessibility-first design system that ensures consistency, scalability, and exceptional user experience across all platforms. Inspired by industry leaders (Notion, Linear, Stripe), this system provides a solid foundation for building world-class interfaces.

### Design Principles

1. **Accessibility First** - WCAG 2.1 AA compliant by default
2. **Performance Optimized** - Lightweight, fast-loading components
3. **Consistency** - Predictable patterns across the application
4. **Flexibility** - Adaptable to different use cases
5. **Scalability** - Grows with the product

---

## Color System

### Philosophy

Our color system is built on **semantic tokens** that adapt to light and dark modes while maintaining WCAG AA contrast ratios. Colors are organized by purpose, not just hue.

### Base Palette

#### Neutral Colors (Warm Gray)

```css
/* Light Mode */
--gray-50: #fafaf9;   /* Backgrounds */
--gray-100: #f5f5f4;  /* Subtle backgrounds */
--gray-200: #e7e5e4;  /* Borders */
--gray-300: #d6d3d1;  /* Borders (hover) */
--gray-400: #a8a29e;  /* Disabled text */
--gray-500: #78716c;  /* Secondary text */
--gray-600: #57534e;  /* Body text */
--gray-700: #44403c;  /* Headings */
--gray-800: #292524;  /* Emphasis */
--gray-900: #1c1917;  /* Primary text */
--gray-950: #0c0a09;  /* Maximum contrast */

/* Dark Mode */
.dark {
  --gray-50: #0c0a09;
  --gray-100: #1c1917;
  --gray-200: #292524;
  --gray-300: #44403c;
  --gray-400: #57534e;
  --gray-500: #78716c;
  --gray-600: #a8a29e;
  --gray-700: #d6d3d1;
  --gray-800: #e7e5e4;
  --gray-900: #f5f5f4;
  --gray-950: #fafaf9;
}
```

#### Brand Colors (Primary)

```css
/* Emerald/Green - Primary brand color */
--primary-50: #ecfdf5;
--primary-100: #d1fae5;
--primary-200: #a7f3d0;
--primary-300: #6ee7b7;
--primary-400: #34d399;
--primary-500: #10b981;  /* Main brand color */
--primary-600: #059669;
--primary-700: #047857;
--primary-800: #065f46;
--primary-900: #064e3b;
--primary-950: #022c22;
```

#### Semantic Colors

```css
/* Success */
--success-50: #ecfdf5;
--success-500: #10b981;
--success-600: #059669;
--success-700: #047857;

/* Warning */
--warning-50: #fffbeb;
--warning-500: #f59e0b;
--warning-600: #d97706;
--warning-700: #b45309;

/* Error */
--error-50: #fef2f2;
--error-500: #ef4444;
--error-600: #dc2626;
--error-700: #b91c1c;

/* Info */
--info-50: #eff6ff;
--info-500: #3b82f6;
--info-600: #2563eb;
--info-700: #1d4ed8;
```

### Semantic Tokens

#### Surface Colors

```css
:root {
  /* Backgrounds */
  --bg-primary: var(--gray-50);
  --bg-secondary: var(--gray-100);
  --bg-tertiary: var(--gray-200);
  --bg-overlay: rgba(0, 0, 0, 0.5);
  
  /* Surfaces */
  --surface-primary: #ffffff;
  --surface-secondary: var(--gray-50);
  --surface-tertiary: var(--gray-100);
  --surface-elevated: #ffffff;
  
  /* Borders */
  --border-primary: var(--gray-200);
  --border-secondary: var(--gray-300);
  --border-focus: var(--primary-500);
  --border-error: var(--error-500);
}

.dark {
  --bg-primary: var(--gray-950);
  --bg-secondary: var(--gray-900);
  --bg-tertiary: var(--gray-800);
  --bg-overlay: rgba(0, 0, 0, 0.7);
  
  --surface-primary: var(--gray-900);
  --surface-secondary: var(--gray-800);
  --surface-tertiary: var(--gray-700);
  --surface-elevated: var(--gray-800);
  
  --border-primary: var(--gray-800);
  --border-secondary: var(--gray-700);
  --border-focus: var(--primary-400);
  --border-error: var(--error-400);
}
```

#### Text Colors

```css
:root {
  /* Text - Light Mode */
  --text-primary: var(--gray-900);      /* 16:1 contrast */
  --text-secondary: var(--gray-600);    /* 7:1 contrast */
  --text-tertiary: var(--gray-500);     /* 4.5:1 contrast */
  --text-disabled: var(--gray-400);     /* 3:1 contrast */
  --text-inverse: #ffffff;
  --text-link: var(--primary-600);
  --text-link-hover: var(--primary-700);
}

.dark {
  /* Text - Dark Mode */
  --text-primary: var(--gray-50);       /* 16:1 contrast */
  --text-secondary: var(--gray-400);    /* 7:1 contrast */
  --text-tertiary: var(--gray-500);     /* 4.5:1 contrast */
  --text-disabled: var(--gray-600);     /* 3:1 contrast */
  --text-inverse: var(--gray-900);
  --text-link: var(--primary-400);
  --text-link-hover: var(--primary-300);
}
```

#### Interactive Colors

```css
:root {
  /* Primary Actions */
  --interactive-primary: var(--primary-600);
  --interactive-primary-hover: var(--primary-700);
  --interactive-primary-active: var(--primary-800);
  --interactive-primary-disabled: var(--gray-300);
  
  /* Secondary Actions */
  --interactive-secondary: var(--gray-200);
  --interactive-secondary-hover: var(--gray-300);
  --interactive-secondary-active: var(--gray-400);
  
  /* Danger Actions */
  --interactive-danger: var(--error-600);
  --interactive-danger-hover: var(--error-700);
  --interactive-danger-active: var(--error-800);
}

.dark {
  --interactive-primary: var(--primary-500);
  --interactive-primary-hover: var(--primary-400);
  --interactive-primary-active: var(--primary-300);
  --interactive-primary-disabled: var(--gray-700);
  
  --interactive-secondary: var(--gray-800);
  --interactive-secondary-hover: var(--gray-700);
  --interactive-secondary-active: var(--gray-600);
  
  --interactive-danger: var(--error-500);
  --interactive-danger-hover: var(--error-400);
  --interactive-danger-active: var(--error-300);
}
```

### Status Colors

```css
/* Task Status */
--status-todo: var(--info-500);
--status-in-progress: var(--warning-500);
--status-done: var(--success-500);
--status-blocked: var(--error-500);

/* Priority */
--priority-critical: var(--error-600);
--priority-high: var(--error-500);
--priority-medium: var(--warning-500);
--priority-low: var(--info-500);
```

### Color Usage Guidelines

#### Do's ✅

- Use semantic tokens, not raw colors
- Maintain minimum 4.5:1 contrast for text
- Use status colors consistently
- Test in both light and dark modes

#### Don'ts ❌

- Don't use colors alone to convey information
- Don't use too many colors in one view
- Don't use low-contrast colors for important text
- Don't hardcode color values

---

## Typography

### Font Family

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
}
```

### Type Scale

```css
/* Simplified, harmonious scale */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights

```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Typography Hierarchy

#### Headings

```css
/* H1 - Page Title */
.heading-1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

/* H2 - Section Title */
.heading-2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

/* H3 - Subsection Title */
.heading-3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--text-primary);
}

/* H4 - Card Title */
.heading-4 {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-snug);
  color: var(--text-primary);
}

/* H5 - Small Heading */
.heading-5 {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--text-primary);
}

/* H6 - Label */
.heading-6 {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

#### Body Text

```css
/* Large Body */
.body-lg {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
}

/* Regular Body */
.body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-primary);
}

/* Small Body */
.body-sm {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

/* Caption */
.caption {
  font-size: var(--text-xs);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-tertiary);
}
```

#### Special Text

```css
/* Code */
.code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  padding: 0.125rem 0.25rem;
  background: var(--surface-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0.25rem;
}

/* Link */
.link {
  color: var(--text-link);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 150ms ease;
}

.link:hover {
  color: var(--text-link-hover);
}

/* Label */
.label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Typography Usage Guidelines

#### Do's ✅

- Use heading hierarchy (H1 → H2 → H3)
- Maintain consistent line heights
- Use appropriate font weights
- Consider reading width (45-75 characters)

#### Don'ts ❌

- Don't skip heading levels
- Don't use too many font sizes
- Don't use all caps for long text
- Don't use justified text

---

## Spacing & Layout

### Spacing Scale (8px Grid)

```css
/* Base unit: 8px */
--space-0: 0;
--space-px: 1px;
--space-0-5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-7: 1.75rem;     /* 28px */
--space-8: 2rem;        /* 32px */
--space-9: 2.25rem;     /* 36px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-14: 3.5rem;     /* 56px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
```

### Component Spacing

```css
/* Padding */
--padding-xs: var(--space-2);   /* 8px */
--padding-sm: var(--space-3);   /* 12px */
--padding-md: var(--space-4);   /* 16px */
--padding-lg: var(--space-6);   /* 24px */
--padding-xl: var(--space-8);   /* 32px */

/* Gap (for flex/grid) */
--gap-xs: var(--space-2);
--gap-sm: var(--space-3);
--gap-md: var(--space-4);
--gap-lg: var(--space-6);
--gap-xl: var(--space-8);
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px */
--radius-base: 0.5rem;   /* 8px */
--radius-md: 0.75rem;    /* 12px */
--radius-lg: 1rem;       /* 16px */
--radius-xl: 1.5rem;     /* 24px */
--radius-2xl: 2rem;      /* 32px */
--radius-full: 9999px;
```

### Shadows

```css
/* Elevation system */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
             0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
             0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
             0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
             0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);

/* Dark mode shadows */
.dark {
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 
               0 1px 2px -1px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 
               0 2px 4px -2px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 
               0 4px 6px -4px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 
               0 8px 10px -6px rgba(0, 0, 0, 0.4);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

### Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Container Sizes

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
--container-full: 100%;
```

---

## Animation System

### Duration Scale

```css
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;
```

### Easing Functions

```css
/* Standard easing */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Custom easing */
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Animation Guidelines

#### Micro-interactions

```css
/* Hover */
.hover-lift {
  transition: transform var(--duration-200) var(--ease-out),
              box-shadow var(--duration-200) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Press */
.press-scale {
  transition: transform var(--duration-100) var(--ease-out);
}

.press-scale:active {
  transform: scale(0.98);
}

/* Focus */
.focus-ring {
  transition: box-shadow var(--duration-150) var(--ease-out);
}

.focus-ring:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--border-focus);
}
```

#### Page Transitions

```jsx
// Framer Motion variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
}
```

#### Loading States

```jsx
// Skeleton animation
const skeletonVariants = {
  initial: {
    opacity: 0.6,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
}

// Spinner animation
const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Component Library

### Buttons

#### Variants

```jsx
// Primary Button
<button className="
  inline-flex items-center justify-center
  px-4 py-2
  text-base font-medium
  text-white
  bg-primary-600
  hover:bg-primary-700
  active:bg-primary-800
  disabled:bg-gray-300 disabled:cursor-not-allowed
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
">
  Primary Action
</button>

// Secondary Button
<button className="
  inline-flex items-center justify-center
  px-4 py-2
  text-base font-medium
  text-gray-700 dark:text-gray-200
  bg-gray-200 dark:bg-gray-800
  hover:bg-gray-300 dark:hover:bg-gray-700
  active:bg-gray-400 dark:active:bg-gray-600
  disabled:opacity-50 disabled:cursor-not-allowed
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
">
  Secondary Action
</button>

// Ghost Button
<button className="
  inline-flex items-center justify-center
  px-4 py-2
  text-base font-medium
  text-gray-700 dark:text-gray-200
  bg-transparent
  hover:bg-gray-100 dark:hover:bg-gray-800
  active:bg-gray-200 dark:active:bg-gray-700
  disabled:opacity-50 disabled:cursor-not-allowed
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
">
  Ghost Action
</button>

// Danger Button
<button className="
  inline-flex items-center justify-center
  px-4 py-2
  text-base font-medium
  text-white
  bg-error-600
  hover:bg-error-700
  active:bg-error-800
  disabled:bg-gray-300 disabled:cursor-not-allowed
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2
">
  Danger Action
</button>
```

#### Sizes

```jsx
// Small
<button className="px-3 py-1.5 text-sm">Small</button>

// Medium (default)
<button className="px-4 py-2 text-base">Medium</button>

// Large
<button className="px-6 py-3 text-lg">Large</button>
```

#### States

```jsx
// Loading
<button disabled className="relative">
  <span className="opacity-0">Loading...</span>
  <span className="absolute inset-0 flex items-center justify-center">
    <Loader className="animate-spin" size={20} />
  </span>
</button>

// With Icon
<button className="inline-flex items-center gap-2">
  <Plus size={20} />
  <span>Add Task</span>
</button>
```

### Inputs

#### Text Input

```jsx
<div className="space-y-1">
  <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Task Title
  </label>
  <input
    id="task-title"
    type="text"
    placeholder="Enter task title..."
    className="
      w-full
      px-3 py-2
      text-base
      text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-500
      bg-white dark:bg-gray-900
      border border-gray-300 dark:border-gray-700
      rounded-lg
      transition-colors duration-150
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
      disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
    "
  />
  <p className="text-sm text-gray-500 dark:text-gray-400">
    Keep it short and descriptive
  </p>
</div>
```

#### Textarea

```jsx
<textarea
  rows={4}
  placeholder="Enter description..."
  className="
    w-full
    px-3 py-2
    text-base
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
    bg-white dark:bg-gray-900
    border border-gray-300 dark:border-gray-700
    rounded-lg
    transition-colors duration-150
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    resize-none
  "
/>
```

#### Select

```jsx
<select className="
  w-full
  px-3 py-2
  text-base
  text-gray-900 dark:text-gray-100
  bg-white dark:bg-gray-900
  border border-gray-300 dark:border-gray-700
  rounded-lg
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
  cursor-pointer
">
  <option>Select priority...</option>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
```

### Cards

```jsx
// Basic Card
<div className="
  p-6
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-800
  rounded-lg
  shadow-sm
">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600 dark:text-gray-400">Card content goes here.</p>
</div>

// Interactive Card
<div className="
  p-6
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-800
  rounded-lg
  shadow-sm
  transition-all duration-200
  hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700
  cursor-pointer
">
  <h3 className="text-xl font-semibold mb-2">Interactive Card</h3>
  <p className="text-gray-600 dark:text-gray-400">Hover to see effect.</p>
</div>

// Elevated Card
<div className="
  p-6
  bg-white dark:bg-gray-900
  rounded-lg
  shadow-lg
">
  <h3 className="text-xl font-semibold mb-2">Elevated Card</h3>
  <p className="text-gray-600 dark:text-gray-400">Higher elevation.</p>
</div>
```

### Badges

```jsx
// Status Badge
<span className="
  inline-flex items-center
  px-2.5 py-0.5
  text-xs font-medium
  rounded-full
  bg-success-100 dark:bg-success-900/20
  text-success-800 dark:text-success-300
">
  Completed
</span>

// Priority Badge
<span className="
  inline-flex items-center
  px-2.5 py-0.5
  text-xs font-medium
  rounded-full
  bg-error-100 dark:bg-error-900/20
  text-error-800 dark:text-error-300
">
  High Priority
</span>

// Count Badge
<span className="
  inline-flex items-center justify-center
  min-w-[1.25rem] h-5
  px-1
  text-xs font-medium
  rounded-full
  bg-primary-600
  text-white
">
  5
</span>
```

### Tooltips

```jsx
<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>

// Implementation
const Tooltip = ({ content, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="
        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
        px-2 py-1
        text-xs font-medium
        text-white
        bg-gray-900 dark:bg-gray-700
        rounded
        opacity-0 group-hover:opacity-100
        transition-opacity duration-150
        pointer-events-none
        whitespace-nowrap
      ">
        {content}
        <div className="
          absolute top-full left-1/2 -translate-x-1/2
          border-4 border-transparent border-t-gray-900 dark:border-t-gray-700
        " />
      </div>
    </div>
  )
}
```

---

## Iconography

### Icon System

**Library:** Lucide React  
**Style:** Outline  
**Stroke Width:** 2px

### Icon Sizes

```jsx
// Extra Small (inline with text)
<Icon size={14} strokeWidth={2} />

// Small
<Icon size={16} strokeWidth={2} />

// Medium (default)
<Icon size={20} strokeWidth={2} />

// Large
<Icon size={24} strokeWidth={2} />

// Extra Large
<Icon size={32} strokeWidth={2} />
```

### Icon Usage

```jsx
// With Text
<button className="inline-flex items-center gap-2">
  <Plus size={20} />
  <span>Add Task</span>
</button>

// Icon Only (with aria-label)
<button aria-label="Delete task">
  <Trash2 size={20} />
</button>

// With Color
<Check size={20} className="text-success-600" />
<X size={20} className="text-error-600" />
<AlertCircle size={20} className="text-warning-600" />
```

### Common Icons

```jsx
// Navigation
<Home size={20} />
<CheckSquare size={20} />
<Calendar size={20} />
<Folder size={20} />

// Actions
<Plus size={20} />
<Edit size={20} />
<Trash2 size={20} />
<MoreHorizontal size={20} />

// Status
<Check size={20} />
<X size={20} />
<AlertCircle size={20} />
<Info size={20} />

// UI
<Search size={20} />
<Settings size={20} />
<User size={20} />
<Bell size={20} />
```

---

## Best Practices

### Accessibility

1. **Color Contrast**
   - Maintain 4.5:1 for normal text
   - Maintain 3:1 for large text and UI components
   - Test with tools (WebAIM, Stark)

2. **Keyboard Navigation**
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order

3. **ARIA Labels**
   - Label all icon buttons
   - Use semantic HTML
   - Provide alternative text

4. **Screen Readers**
   - Test with VoiceOver/NVDA
   - Use proper heading hierarchy
   - Announce dynamic content

### Performance

1. **CSS**
   - Use CSS variables for theming
   - Minimize specificity
   - Avoid deep nesting

2. **Animations**
   - Use transform and opacity
   - Respect reduced motion
   - Keep under 300ms

3. **Images**
   - Use WebP format
   - Lazy load images
   - Provide responsive images

### Consistency

1. **Spacing**
   - Use 8px grid system
   - Consistent padding/margins
   - Align to grid

2. **Typography**
   - Follow hierarchy
   - Consistent line heights
   - Appropriate font weights

3. **Colors**
   - Use semantic tokens
   - Test in both modes
   - Maintain consistency

---

## Implementation Guide

### Getting Started

1. **Import Design Tokens**
   ```css
   @import './design-system/tokens.css';
   ```

2. **Use Semantic Classes**
   ```jsx
   <h1 className="heading-1">Page Title</h1>
   <p className="body">Body text</p>
   ```

3. **Apply Consistent Spacing**
   ```jsx
   <div className="p-4 space-y-4">
     {/* Content */}
   </div>
   ```

### Migration Path

1. **Audit Current Components** (Week 1)
   - Identify inconsistencies
   - Document deviations
   - Prioritize fixes

2. **Update Design Tokens** (Week 2)
   - Replace hardcoded values
   - Test in both modes
   - Fix contrast issues

3. **Refactor Components** (Weeks 3-4)
   - Apply new patterns
   - Update documentation
   - Test accessibility

4. **Quality Assurance** (Week 5)
   - Visual regression testing
   - Accessibility audit
   - Performance testing

---

## Resources

### Tools

- **Color Contrast:** WebAIM Contrast Checker
- **Accessibility:** axe DevTools, WAVE
- **Design:** Figma, Sketch
- **Development:** Storybook, Chromatic

### References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design](https://material.io/design)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/)
- [Inclusive Components](https://inclusive-components.design/)

---

**Version:** 2.0  
**Last Updated:** January 2025  
**Next Review:** April 2025

