/**
 * TaskFlow Design System
 * A comprehensive design system ensuring consistency across the application
 * Based on Material Design and modern SaaS best practices
 */

// Color Palette - WCAG AA compliant
export const colors = {
  // Primary brand colors
  primary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6', // Main brand color
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  
  // Semantic colors for statuses
  status: {
    todo: {
      light: '#EEF2FF',
      main: '#6366F1',
      dark: '#4F46E5',
      contrast: '#FFFFFF',
    },
    doing: {
      light: '#FEF3C7',
      main: '#F59E0B',
      dark: '#D97706',
      contrast: '#FFFFFF',
    },
    done: {
      light: '#D1FAE5',
      main: '#10B981',
      dark: '#059669',
      contrast: '#FFFFFF',
    },
  },
  
  // Priority colors with accessibility in mind
  priority: {
    critical: {
      light: '#FEE2E2',
      main: '#DC2626',
      dark: '#B91C1C',
      contrast: '#FFFFFF',
    },
    high: {
      light: '#FEE2E2',
      main: '#EF4444',
      dark: '#DC2626',
      contrast: '#FFFFFF',
    },
    medium: {
      light: '#FEF3C7',
      main: '#F59E0B',
      dark: '#D97706',
      contrast: '#FFFFFF',
    },
    low: {
      light: '#DBEAFE',
      main: '#3B82F6',
      dark: '#2563EB',
      contrast: '#FFFFFF',
    },
  },
  
  // Neutral colors for UI elements
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Functional colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
};

// Typography System
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing System (8px base)
export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  base: '0.5rem',  // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  full: '9999px',
};

// Shadows (optimized for light mode)
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Animation Durations
export const transitions = {
  fast: '150ms',
  base: '250ms',
  slow: '350ms',
  slower: '500ms',
};

// Z-index System
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Common Component Styles
export const components = {
  button: {
    base: `
      inline-flex items-center justify-center
      font-medium rounded-lg
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    variants: {
      primary: `bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500`,
      secondary: `bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500`,
      ghost: `bg-transparent hover:bg-gray-100 focus:ring-gray-500`,
      danger: `bg-error text-white hover:bg-red-600 focus:ring-red-500`,
    },
  },
  
  card: {
    base: `bg-white rounded-lg border border-gray-200 overflow-hidden`,
    interactive: `hover:shadow-md transition-shadow duration-200`,
    padding: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  
  input: {
    base: `
      w-full px-3 py-2
      border border-gray-300 rounded-lg
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
      placeholder:text-gray-400
      transition-all duration-200
    `,
    error: `border-error focus:ring-error`,
  },
};

// Layout Grid System
export const grid = {
  container: 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
  cols: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  },
  gap: {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  },
};

// Accessibility Helpers
export const a11y = {
  visuallyHidden: `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `,
  
  focusRing: `
    outline: 2px solid transparent;
    outline-offset: 2px;
    &:focus-visible {
      outline-color: ${colors.primary[500]};
    }
  `,
  
  skipLink: `
    position: absolute;
    top: -40px;
    left: 0;
    background: ${colors.primary[600]};
    color: white;
    padding: ${spacing[2]} ${spacing[4]};
    z-index: ${zIndex.tooltip};
    text-decoration: none;
    border-radius: ${borderRadius.base};
    
    &:focus {
      top: ${spacing[2]};
    }
  `,
};

// Export helper functions
export const getColorContrast = (backgroundColor) => {
  // Simple contrast calculation - in production use a proper library
  const colors = {
    light: '#FFFFFF',
    dark: '#000000',
  };
  
  // This is a simplified version - use proper WCAG contrast calculation
  return backgroundColor.startsWith('#F') ? colors.dark : colors.light;
};

export const getPriorityColor = (priority) => {
  const map = {
    critical: colors.priority.critical,
    high: colors.priority.high,
    medium: colors.priority.medium,
    low: colors.priority.low,
  };
  return map[priority] || map.medium;
};

export const getStatusColor = (status) => {
  const map = {
    todo: colors.status.todo,
    doing: colors.status.doing,
    done: colors.status.done,
  };
  return map[status] || map.todo;
};