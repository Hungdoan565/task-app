/**
 * GENIUS Design System - Spatial Digital Experience
 * A revolutionary design system that transforms flat interfaces into living digital spaces
 * Based on physical light behavior and depth perception
 */

// Core Philosophy: Light from above (45° angle)
export const lighting = {
  angle: '145deg',
  ambient: {
    intensity: 0.95,
    color: '#ffffff',
  },
  keyLight: {
    color: '#ffffff',
    opacity: 0.7,
    blur: '20px',
    distance: '-5px -5px',
  },
  fillLight: {
    color: '#b8c0d3',
    opacity: 0.3,
    blur: '30px',
    distance: '10px 10px',
  },
};

// Spatial Color System - Depth through luminosity
export const spatialColors = {
  // Background layers - creating depth
  space: {
    deep: '#e0e5ec',      // Deepest background
    base: '#e9ecf2',      // Main background
    raised: '#f0f3f7',    // Raised surfaces
    float: '#f8fafb',     // Floating elements
    glow: '#ffffff',      // Highest elevation
  },
  
  // Semantic colors with depth variants
  primary: {
    deep: '#5521b5',
    base: '#7c3aed',
    light: '#8b5cf6',
    glow: '#a78bfa',
    shadow: 'rgba(124, 58, 237, 0.3)',
  },
  
  success: {
    deep: '#047857',
    base: '#10b981',
    light: '#34d399',
    glow: '#6ee7b7',
    shadow: 'rgba(16, 185, 129, 0.3)',
  },
  
  warning: {
    deep: '#d97706',
    base: '#f59e0b',
    light: '#fbbf24',
    glow: '#fcd34d',
    shadow: 'rgba(245, 158, 11, 0.3)',
  },
  
  danger: {
    deep: '#dc2626',
    base: '#ef4444',
    light: '#f87171',
    glow: '#fca5a5',
    shadow: 'rgba(239, 68, 68, 0.3)',
  },
  
  // Text colors for contrast
  text: {
    primary: '#1e293b',
    secondary: '#475569',
    tertiary: '#64748b',
    disabled: '#cbd5e1',
    inverse: '#ffffff',
  },
};

// Elevation System - Multi-layered shadows for physical depth
export const elevation = {
  // Flat (pressed) state
  pressed: {
    boxShadow: `
      inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      inset -2px -2px 5px rgba(255, 255, 255, 0.7)
    `,
    transform: 'scale(0.98)',
  },
  
  // Level 0 - Ground level
  ground: {
    boxShadow: 'none',
    transform: 'none',
  },
  
  // Level 1 - Subtle raise
  raised: {
    boxShadow: `
      ${lighting.keyLight.distance} ${lighting.keyLight.blur} rgba(255, 255, 255, ${lighting.keyLight.opacity}),
      ${lighting.fillLight.distance} ${lighting.fillLight.blur} rgba(184, 192, 211, ${lighting.fillLight.opacity})
    `,
    transform: 'translateY(-1px)',
  },
  
  // Level 2 - Standard card
  float: {
    boxShadow: `
      -8px -8px 24px rgba(255, 255, 255, 0.8),
      8px 8px 24px rgba(184, 192, 211, 0.4),
      inset 1px 1px 1px rgba(255, 255, 255, 0.3)
    `,
    transform: 'translateY(-2px)',
  },
  
  // Level 3 - Hovering
  hover: {
    boxShadow: `
      -10px -10px 30px rgba(255, 255, 255, 0.85),
      10px 10px 30px rgba(184, 192, 211, 0.45),
      inset 1px 1px 2px rgba(255, 255, 255, 0.4)
    `,
    transform: 'translateY(-4px)',
  },
  
  // Level 4 - Active/Selected
  active: {
    boxShadow: `
      -12px -12px 36px rgba(255, 255, 255, 0.9),
      12px 12px 36px rgba(184, 192, 211, 0.5),
      inset 2px 2px 3px rgba(255, 255, 255, 0.5),
      0 0 30px rgba(139, 92, 246, 0.2)
    `,
    transform: 'translateY(-6px) scale(1.02)',
  },
};

// Typography with physical presence
export const spatialTypography = {
  // Display numbers - bold and prominent
  display: {
    fontSize: '4rem',
    fontWeight: '800',
    lineHeight: '1',
    letterSpacing: '-0.04em',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  
  // Headlines with depth
  h1: {
    fontSize: '2.5rem',
    fontWeight: '700',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  
  h2: {
    fontSize: '2rem',
    fontWeight: '600',
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
  },
  
  h3: {
    fontSize: '1.5rem',
    fontWeight: '600',
    lineHeight: '1.4',
  },
  
  // Body text
  body: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.6',
  },
  
  small: {
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  
  tiny: {
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '1.4',
  },
};

// Animation physics
export const physics = {
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  
  smooth: {
    type: 'tween',
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  },
  
  bounce: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  },
  
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// Component recipes
export const components = {
  // Neumorphic card
  card: {
    base: `
      relative
      bg-gradient-to-br from-gray-50 to-white
      rounded-2xl
      transition-all duration-300
      cursor-pointer
    `,
    elevated: elevation.float,
    hover: elevation.hover,
    pressed: elevation.pressed,
  },
  
  // Spatial button
  button: {
    base: `
      relative inline-flex items-center justify-center
      px-6 py-3 rounded-xl
      font-semibold
      transition-all duration-200
      select-none
    `,
    primary: {
      background: 'linear-gradient(145deg, #8b5cf6, #7c3aed)',
      color: spatialColors.text.inverse,
      boxShadow: elevation.float.boxShadow,
    },
    secondary: {
      background: spatialColors.space.raised,
      color: spatialColors.text.primary,
      boxShadow: elevation.raised.boxShadow,
    },
    ghost: {
      background: 'transparent',
      color: spatialColors.text.secondary,
      boxShadow: 'none',
    },
  },
  
  // Input field with depth
  input: {
    base: `
      w-full px-4 py-3
      bg-transparent
      rounded-xl
      font-medium
      transition-all duration-200
      placeholder:text-gray-400
    `,
    normal: {
      boxShadow: `
        inset 2px 2px 5px rgba(0, 0, 0, 0.05),
        inset -2px -2px 5px rgba(255, 255, 255, 0.9)
      `,
    },
    focus: {
      boxShadow: `
        inset 3px 3px 7px rgba(0, 0, 0, 0.08),
        inset -3px -3px 7px rgba(255, 255, 255, 1),
        0 0 0 3px rgba(139, 92, 246, 0.1)
      `,
    },
  },
  
  // Metric card with prominent numbers
  metric: {
    container: `
      relative p-6
      bg-gradient-to-br from-white to-gray-50
      rounded-2xl
      overflow-hidden
    `,
    value: {
      ...spatialTypography.display,
      background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    label: {
      ...spatialTypography.small,
      color: spatialColors.text.secondary,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  },
};

// Spatial utilities
export const spatial = {
  // Glow effect for active elements
  glow: (color) => ({
    boxShadow: `
      0 0 30px ${color}40,
      0 0 60px ${color}20,
      inset 0 0 20px ${color}10
    `,
  }),
  
  // Floating animation
  float: {
    animation: 'float 3s ease-in-out infinite',
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  },
  
  // Pulse for important elements
  pulse: {
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
      '0%': { boxShadow: '0 0 0 0 rgba(139, 92, 246, 0.4)' },
      '70%': { boxShadow: '0 0 0 20px rgba(139, 92, 246, 0)' },
      '100%': { boxShadow: '0 0 0 0 rgba(139, 92, 246, 0)' },
    },
  },
};

// Glass morphism overlay
export const glass = {
  light: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  dark: {
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
};

// Export helper functions
export const createShadow = (elevation = 'float') => {
  return components.card[elevation] || components.card.elevated;
};

export const createGradient = (startColor, endColor, angle = 145) => {
  return `linear-gradient(${angle}deg, ${startColor}, ${endColor})`;
};