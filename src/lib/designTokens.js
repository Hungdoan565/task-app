// Unified Design Token System
// This ensures consistency across all components

export const designTokens = {
  // Border Radius System
  radius: {
    none: '0',
    sm: '0.25rem',    // 4px - for small elements like badges
    md: '0.5rem',     // 8px - for buttons, inputs
    lg: '0.75rem',    // 12px - for cards, modals
    xl: '1rem',       // 16px - for large cards
    '2xl': '1.5rem',  // 24px - for hero sections
    full: '9999px',   // for circular elements
  },

  // Spacing System (consistent with Tailwind)
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem',      // 384px
  },

  // Typography Scale
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],       // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],      // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],// 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
    '5xl': ['3rem', { lineHeight: '1' }],          // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],        // 72px
    '8xl': ['6rem', { lineHeight: '1' }],          // 96px
    '9xl': ['8rem', { lineHeight: '1' }],          // 128px
  },

  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Colors with semantic meanings
  colors: {
    // Primary brand colors
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
    },

    // Success colors
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },

    // Warning colors
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
    },

    // Error colors
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
    },

    // Neutral colors
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  // Shadow System
  shadows: {
    none: '0 0 #0000',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Transitions
  transitions: {
    none: 'none',
    all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'background-color, border-color, color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Animation Durations
  durations: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },

  // Z-Index Scale
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// Helper functions for using design tokens
export const getRadius = (size = 'md') => designTokens.radius[size] || designTokens.radius.md;
export const getSpacing = (size) => designTokens.spacing[size] || size;
export const getShadow = (size = 'base') => designTokens.shadows[size] || designTokens.shadows.base;
export const getColor = (color, shade = 500) => {
  const colorGroup = designTokens.colors[color];
  return colorGroup ? (colorGroup[shade] || colorGroup[500]) : '#000';
};

// Component-specific presets
export const componentStyles = {
  button: {
    base: {
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
      borderRadius: designTokens.radius.md,
      fontSize: designTokens.fontSize.sm[0],
      fontWeight: designTokens.fontWeight.medium,
      transition: designTokens.transitions.all,
    },
    primary: {
      backgroundColor: designTokens.colors.primary[600],
      color: '#ffffff',
      '&:hover': {
        backgroundColor: designTokens.colors.primary[700],
        boxShadow: designTokens.shadows.lg,
      },
      '&:active': {
        backgroundColor: designTokens.colors.primary[800],
        transform: 'scale(0.98)',
      },
    },
    secondary: {
      backgroundColor: designTokens.colors.gray[100],
      color: designTokens.colors.gray[700],
      '&:hover': {
        backgroundColor: designTokens.colors.gray[200],
      },
    },
  },
  
  card: {
    base: {
      backgroundColor: '#ffffff',
      borderRadius: designTokens.radius.lg,
      padding: designTokens.spacing[6],
      boxShadow: designTokens.shadows.base,
      border: `1px solid ${designTokens.colors.gray[200]}`,
      transition: designTokens.transitions.shadow,
      '&:hover': {
        boxShadow: designTokens.shadows.xl,
      },
    },
  },

  input: {
    base: {
      width: '100%',
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
      borderRadius: designTokens.radius.md,
      border: `1px solid ${designTokens.colors.gray[300]}`,
      fontSize: designTokens.fontSize.base[0],
      transition: designTokens.transitions.colors,
      '&:focus': {
        outline: 'none',
        borderColor: designTokens.colors.primary[500],
        boxShadow: `0 0 0 3px ${designTokens.colors.primary[100]}`,
      },
      '&:hover': {
        borderColor: designTokens.colors.gray[400],
      },
    },
  },

  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${designTokens.spacing[0.5]} ${designTokens.spacing[2]}`,
      borderRadius: designTokens.radius.full,
      fontSize: designTokens.fontSize.xs[0],
      fontWeight: designTokens.fontWeight.medium,
    },
  },
};

// Accessibility helpers
export const focusRing = {
  outline: 'none',
  boxShadow: `0 0 0 3px ${designTokens.colors.primary[100]}`,
  borderColor: designTokens.colors.primary[500],
};

// Export default object for easy import
export default designTokens;