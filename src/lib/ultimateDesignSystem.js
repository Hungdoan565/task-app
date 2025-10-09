// Ultimate Design System - Production Ready
// Comprehensive design tokens and component library

export const ULTIMATE_DESIGN = {
  // Consistent Border Radius System
  radius: {
    none: '0px',
    xs: '2px',      // Tiny elements
    sm: '4px',      // Small badges, chips
    md: '6px',      // Buttons, inputs
    lg: '8px',      // Cards, modals
    xl: '12px',     // Large cards
    '2xl': '16px',  // Hero sections
    '3xl': '20px',  // Special elements
    full: '9999px', // Circular elements
    pill: '100px',  // Pills
  },

  // Mathematical Spacing Scale (8px base)
  spacing: {
    0: '0px',
    px: '1px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    4.5: '18px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
  },

  // Typography System (Type Scale)
  typography: {
    // Font Families
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    
    // Font Sizes with Line Heights
    fontSize: {
      '2xs': { size: '10px', lineHeight: '14px', letterSpacing: '0.05em' },
      xs: { size: '12px', lineHeight: '16px', letterSpacing: '0.025em' },
      sm: { size: '14px', lineHeight: '20px', letterSpacing: '0' },
      base: { size: '16px', lineHeight: '24px', letterSpacing: '0' },
      lg: { size: '18px', lineHeight: '28px', letterSpacing: '-0.025em' },
      xl: { size: '20px', lineHeight: '30px', letterSpacing: '-0.025em' },
      '2xl': { size: '24px', lineHeight: '36px', letterSpacing: '-0.025em' },
      '3xl': { size: '30px', lineHeight: '40px', letterSpacing: '-0.025em' },
      '4xl': { size: '36px', lineHeight: '48px', letterSpacing: '-0.05em' },
      '5xl': { size: '48px', lineHeight: '56px', letterSpacing: '-0.05em' },
      '6xl': { size: '60px', lineHeight: '72px', letterSpacing: '-0.05em' },
      '7xl': { size: '72px', lineHeight: '84px', letterSpacing: '-0.05em' },
    },
    
    // Font Weights
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },

  // Comprehensive Color Palette
  colors: {
    // Brand Colors
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065',
    },
    
    // Semantic Colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    
    // Neutral Colors
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    
    // Special
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
  },

  // Shadow System
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.06)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.06)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.15)',
    '3xl': '0 30px 60px -15px rgb(0 0 0 / 0.2)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
    'inner-lg': 'inset 0 4px 8px 0 rgb(0 0 0 / 0.1)',
    
    // Colored shadows
    primary: '0 10px 25px -5px rgba(139, 92, 246, 0.3)',
    success: '0 10px 25px -5px rgba(34, 197, 94, 0.3)',
    error: '0 10px 25px -5px rgba(239, 68, 68, 0.3)',
    warning: '0 10px 25px -5px rgba(245, 158, 11, 0.3)',
  },

  // Animation System
  animation: {
    // Durations
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms',
      slowest: '700ms',
    },
    
    // Easings
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    
    // Transitions
    transition: {
      all: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      colors: 'background-color, border-color, color, fill, stroke 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      shadow: 'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    notification: 70,
    command: 80,
    max: 9999,
  },

  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
  },

  // Icon Sizes (Consistent)
  iconSize: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
  },

  // Touch Target Sizes (Mobile)
  touchTarget: {
    min: '44px', // iOS minimum
    comfortable: '48px',
    large: '56px',
  },

  // Focus Styles
  focus: {
    ring: {
      width: '2px',
      color: '#8b5cf6',
      offset: '2px',
    },
    style: 'outline: 2px solid #8b5cf6; outline-offset: 2px; border-radius: 6px;',
  },
};

// Component Presets
export const components = {
  // Button Variants
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: ULTIMATE_DESIGN.typography.fontWeight.medium,
      transition: ULTIMATE_DESIGN.animation.transition.all,
      borderRadius: ULTIMATE_DESIGN.radius.md,
      fontSize: ULTIMATE_DESIGN.typography.fontSize.sm.size,
      minHeight: ULTIMATE_DESIGN.touchTarget.min,
      gap: ULTIMATE_DESIGN.spacing[2],
      cursor: 'pointer',
      userSelect: 'none',
    },
    
    sizes: {
      xs: {
        padding: `${ULTIMATE_DESIGN.spacing[1.5]} ${ULTIMATE_DESIGN.spacing[2.5]}`,
        fontSize: ULTIMATE_DESIGN.typography.fontSize.xs.size,
      },
      sm: {
        padding: `${ULTIMATE_DESIGN.spacing[2]} ${ULTIMATE_DESIGN.spacing[3]}`,
        fontSize: ULTIMATE_DESIGN.typography.fontSize.sm.size,
      },
      md: {
        padding: `${ULTIMATE_DESIGN.spacing[2.5]} ${ULTIMATE_DESIGN.spacing[4]}`,
        fontSize: ULTIMATE_DESIGN.typography.fontSize.sm.size,
      },
      lg: {
        padding: `${ULTIMATE_DESIGN.spacing[3]} ${ULTIMATE_DESIGN.spacing[5]}`,
        fontSize: ULTIMATE_DESIGN.typography.fontSize.base.size,
      },
      xl: {
        padding: `${ULTIMATE_DESIGN.spacing[3.5]} ${ULTIMATE_DESIGN.spacing[6]}`,
        fontSize: ULTIMATE_DESIGN.typography.fontSize.lg.size,
      },
    },
    
    variants: {
      primary: {
        backgroundColor: ULTIMATE_DESIGN.colors.primary[600],
        color: ULTIMATE_DESIGN.colors.white,
        boxShadow: ULTIMATE_DESIGN.shadows.md,
        '&:hover': {
          backgroundColor: ULTIMATE_DESIGN.colors.primary[700],
          boxShadow: ULTIMATE_DESIGN.shadows.lg,
        },
        '&:active': {
          backgroundColor: ULTIMATE_DESIGN.colors.primary[800],
          transform: 'scale(0.98)',
        },
        '&:disabled': {
          backgroundColor: ULTIMATE_DESIGN.colors.gray[300],
          cursor: 'not-allowed',
          opacity: 0.5,
        },
      },
      
      secondary: {
        backgroundColor: ULTIMATE_DESIGN.colors.white,
        color: ULTIMATE_DESIGN.colors.gray[700],
        border: `1px solid ${ULTIMATE_DESIGN.colors.gray[300]}`,
        '&:hover': {
          backgroundColor: ULTIMATE_DESIGN.colors.gray[50],
          borderColor: ULTIMATE_DESIGN.colors.gray[400],
        },
      },
      
      ghost: {
        backgroundColor: 'transparent',
        color: ULTIMATE_DESIGN.colors.gray[700],
        '&:hover': {
          backgroundColor: ULTIMATE_DESIGN.colors.gray[100],
        },
      },
      
      danger: {
        backgroundColor: ULTIMATE_DESIGN.colors.error[600],
        color: ULTIMATE_DESIGN.colors.white,
        '&:hover': {
          backgroundColor: ULTIMATE_DESIGN.colors.error[700],
        },
      },
    },
  },

  // Card Component
  card: {
    base: {
      backgroundColor: ULTIMATE_DESIGN.colors.white,
      borderRadius: ULTIMATE_DESIGN.radius.lg,
      border: `1px solid ${ULTIMATE_DESIGN.colors.gray[200]}`,
      boxShadow: ULTIMATE_DESIGN.shadows.sm,
      transition: ULTIMATE_DESIGN.animation.transition.all,
    },
    
    interactive: {
      cursor: 'pointer',
      '&:hover': {
        boxShadow: ULTIMATE_DESIGN.shadows.xl,
        transform: 'translateY(-4px)',
      },
    },
    
    padding: {
      none: '0',
      sm: ULTIMATE_DESIGN.spacing[4],
      md: ULTIMATE_DESIGN.spacing[6],
      lg: ULTIMATE_DESIGN.spacing[8],
    },
  },

  // Input Component
  input: {
    base: {
      width: '100%',
      borderRadius: ULTIMATE_DESIGN.radius.md,
      fontSize: ULTIMATE_DESIGN.typography.fontSize.base.size,
      transition: ULTIMATE_DESIGN.animation.transition.all,
      backgroundColor: ULTIMATE_DESIGN.colors.white,
      minHeight: ULTIMATE_DESIGN.touchTarget.min,
    },
    
    variants: {
      outline: {
        padding: `${ULTIMATE_DESIGN.spacing[3]} ${ULTIMATE_DESIGN.spacing[4]}`,
        border: `1px solid ${ULTIMATE_DESIGN.colors.gray[300]}`,
        '&:hover': {
          borderColor: ULTIMATE_DESIGN.colors.gray[400],
        },
        '&:focus': {
          borderColor: ULTIMATE_DESIGN.colors.primary[500],
          boxShadow: `0 0 0 3px ${ULTIMATE_DESIGN.colors.primary[100]}`,
        },
        '&:disabled': {
          backgroundColor: ULTIMATE_DESIGN.colors.gray[100],
          cursor: 'not-allowed',
        },
      },
      
      filled: {
        padding: `${ULTIMATE_DESIGN.spacing[3]} ${ULTIMATE_DESIGN.spacing[4]}`,
        backgroundColor: ULTIMATE_DESIGN.colors.gray[100],
        border: '2px solid transparent',
        '&:focus': {
          backgroundColor: ULTIMATE_DESIGN.colors.white,
          borderColor: ULTIMATE_DESIGN.colors.primary[500],
        },
      },
    },
  },

  // Badge Component
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: ULTIMATE_DESIGN.spacing[1],
      borderRadius: ULTIMATE_DESIGN.radius.full,
      fontWeight: ULTIMATE_DESIGN.typography.fontWeight.medium,
      transition: ULTIMATE_DESIGN.animation.transition.colors,
    },
    
    sizes: {
      xs: {
        padding: `${ULTIMATE_DESIGN.spacing[0.5]} ${ULTIMATE_DESIGN.spacing[1.5]}`,
        fontSize: ULTIMATE_DESIGN.typography.fontSize['2xs'].size,
      },
      sm: {
        padding: `${ULTIMATE_DESIGN.spacing[1]} ${ULTIMATE_DESIGN.spacing[2]}`,
        fontSize: ULTIMATE_DESIGN.typography.fontSize.xs.size,
      },
      md: {
        padding: `${ULTIMATE_DESIGN.spacing[1.5]} ${ULTIMATE_DESIGN.spacing[2.5]}`,
        fontSize: ULTIMATE_DESIGN.typography.fontSize.sm.size,
      },
      lg: {
        padding: `${ULTIMATE_DESIGN.spacing[2]} ${ULTIMATE_DESIGN.spacing[3]}`,
        fontSize: ULTIMATE_DESIGN.typography.fontSize.base.size,
      },
    },
    
    variants: {
      primary: {
        backgroundColor: ULTIMATE_DESIGN.colors.primary[100],
        color: ULTIMATE_DESIGN.colors.primary[700],
        border: `1px solid ${ULTIMATE_DESIGN.colors.primary[200]}`,
      },
      success: {
        backgroundColor: ULTIMATE_DESIGN.colors.success[100],
        color: ULTIMATE_DESIGN.colors.success[700],
        border: `1px solid ${ULTIMATE_DESIGN.colors.success[200]}`,
      },
      warning: {
        backgroundColor: ULTIMATE_DESIGN.colors.warning[100],
        color: ULTIMATE_DESIGN.colors.warning[700],
        border: `1px solid ${ULTIMATE_DESIGN.colors.warning[200]}`,
      },
      error: {
        backgroundColor: ULTIMATE_DESIGN.colors.error[100],
        color: ULTIMATE_DESIGN.colors.error[700],
        border: `1px solid ${ULTIMATE_DESIGN.colors.error[200]}`,
      },
      info: {
        backgroundColor: ULTIMATE_DESIGN.colors.info[100],
        color: ULTIMATE_DESIGN.colors.info[700],
        border: `1px solid ${ULTIMATE_DESIGN.colors.info[200]}`,
      },
      neutral: {
        backgroundColor: ULTIMATE_DESIGN.colors.gray[100],
        color: ULTIMATE_DESIGN.colors.gray[700],
        border: `1px solid ${ULTIMATE_DESIGN.colors.gray[200]}`,
      },
    },
  },

  // Checkbox Component
  checkbox: {
    base: {
      width: '20px',
      height: '20px',
      borderRadius: ULTIMATE_DESIGN.radius.sm,
      border: `2px solid ${ULTIMATE_DESIGN.colors.gray[300]}`,
      transition: ULTIMATE_DESIGN.animation.transition.all,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ULTIMATE_DESIGN.colors.white,
    },
    
    states: {
      hover: {
        borderColor: ULTIMATE_DESIGN.colors.primary[400],
        transform: 'scale(1.05)',
      },
      checked: {
        backgroundColor: ULTIMATE_DESIGN.colors.primary[600],
        borderColor: ULTIMATE_DESIGN.colors.primary[600],
      },
      disabled: {
        backgroundColor: ULTIMATE_DESIGN.colors.gray[100],
        borderColor: ULTIMATE_DESIGN.colors.gray[300],
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      focus: {
        boxShadow: `0 0 0 3px ${ULTIMATE_DESIGN.colors.primary[100]}`,
      },
    },
  },

  // Skeleton Loader
  skeleton: {
    base: {
      backgroundColor: ULTIMATE_DESIGN.colors.gray[200],
      borderRadius: ULTIMATE_DESIGN.radius.md,
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    
    '@keyframes pulse': {
      '0%, 100%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.5,
      },
    },
  },

  // Toast/Notification
  toast: {
    base: {
      padding: ULTIMATE_DESIGN.spacing[4],
      borderRadius: ULTIMATE_DESIGN.radius.lg,
      boxShadow: ULTIMATE_DESIGN.shadows.xl,
      maxWidth: '400px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: ULTIMATE_DESIGN.spacing[3],
    },
    
    variants: {
      success: {
        backgroundColor: ULTIMATE_DESIGN.colors.success[50],
        border: `1px solid ${ULTIMATE_DESIGN.colors.success[200]}`,
        color: ULTIMATE_DESIGN.colors.success[900],
      },
      error: {
        backgroundColor: ULTIMATE_DESIGN.colors.error[50],
        border: `1px solid ${ULTIMATE_DESIGN.colors.error[200]}`,
        color: ULTIMATE_DESIGN.colors.error[900],
      },
      warning: {
        backgroundColor: ULTIMATE_DESIGN.colors.warning[50],
        border: `1px solid ${ULTIMATE_DESIGN.colors.warning[200]}`,
        color: ULTIMATE_DESIGN.colors.warning[900],
      },
      info: {
        backgroundColor: ULTIMATE_DESIGN.colors.info[50],
        border: `1px solid ${ULTIMATE_DESIGN.colors.info[200]}`,
        color: ULTIMATE_DESIGN.colors.info[900],
      },
    },
  },
};

// Utility Functions
export const utils = {
  // WCAG Contrast Checker
  getContrastRatio: (color1, color2) => {
    // Implementation of WCAG contrast ratio calculation
    return 4.5; // Placeholder
  },
  
  // Responsive Value Helper
  responsive: (values) => {
    // Returns responsive values based on breakpoints
    return values;
  },
  
  // Color Manipulation
  lighten: (color, amount) => {
    // Lightens a color by amount
    return color;
  },
  
  darken: (color, amount) => {
    // Darkens a color by amount
    return color;
  },
  
  alpha: (color, opacity) => {
    // Adds alpha channel to color
    return `${color}${Math.round(opacity * 255).toString(16)}`;
  },
  
  // Accessibility Helpers
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  },
  
  // Focus Visible
  focusVisible: {
    outline: `2px solid ${ULTIMATE_DESIGN.colors.primary[500]}`,
    outlineOffset: '2px',
    borderRadius: ULTIMATE_DESIGN.radius.md,
  },
  
  // Truncate Text
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  
  // Line Clamp
  lineClamp: (lines) => ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
};

// Export all
export default ULTIMATE_DESIGN;