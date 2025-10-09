/**
 * Enterprise Command Center Design System
 * A professional-grade spatial design system for desktop-first enterprise SaaS
 * Optimized for large screens, power users, and data-rich interactions
 */

// Core Layout Grid System - Desktop First
export const layout = {
  // Minimum 3-column flexible grid
  grid: {
    cols: 24, // 24-column grid for maximum flexibility
    gap: 16,
    containerPadding: 24,
    minColWidth: 320,
  },
  
  // Fixed sidebar dimensions
  sidebar: {
    width: 280,
    collapsedWidth: 72,
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Global filter bar
  filterBar: {
    height: 64,
    padding: 16,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  },
  
  // Command palette
  commandPalette: {
    width: 680,
    maxHeight: '70vh',
    borderRadius: 16,
  },
};

// Enterprise Color System - Professional & Accessible
export const enterpriseColors = {
  // Base surfaces with depth
  surface: {
    0: '#F8FAFC',    // Main background
    1: '#FFFFFF',    // Card background
    2: '#F1F5F9',    // Hover state
    3: '#E2E8F0',    // Selected state
    4: '#CBD5E1',    // Borders
  },
  
  // Professional accent colors
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',  // Main
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  
  // Status colors for business context
  status: {
    success: { light: '#D1FAE5', main: '#10B981', dark: '#047857', text: '#064E3B' },
    warning: { light: '#FEF3C7', main: '#F59E0B', dark: '#D97706', text: '#78350F' },
    danger: { light: '#FEE2E2', main: '#EF4444', dark: '#DC2626', text: '#7F1D1D' },
    info: { light: '#DBEAFE', main: '#3B82F6', dark: '#2563EB', text: '#1E3A8A' },
  },
  
  // Data visualization palette
  chart: {
    purple: '#8B5CF6',
    blue: '#3B82F6',
    cyan: '#06B6D4',
    teal: '#14B8A6',
    green: '#10B981',
    yellow: '#F59E0B',
    red: '#EF4444',
    pink: '#EC4899',
  },
};

// Advanced Elevation System for Desktop
export const enterpriseElevation = {
  // Resting state
  rest: {
    boxShadow: `
      inset 0 1px 2px 0 rgba(255, 255, 255, 0.9),
      0 1px 3px 0 rgba(0, 0, 0, 0.08),
      0 2px 8px -2px rgba(0, 0, 0, 0.1)
    `,
    transform: 'translateY(0)',
  },
  
  // Hover state - subtle lift
  hover: {
    boxShadow: `
      inset 0 2px 4px 0 rgba(255, 255, 255, 1),
      0 4px 12px -2px rgba(0, 0, 0, 0.12),
      0 8px 24px -4px rgba(0, 0, 0, 0.08)
    `,
    transform: 'translateY(-2px)',
  },
  
  // Active/Pressed state
  active: {
    boxShadow: `
      inset 0 -2px 4px 0 rgba(0, 0, 0, 0.06),
      inset 0 2px 4px 0 rgba(0, 0, 0, 0.06),
      0 0 0 3px rgba(99, 102, 241, 0.1)
    `,
    transform: 'translateY(0) scale(0.99)',
  },
  
  // Dragging state
  dragging: {
    boxShadow: `
      0 8px 32px -4px rgba(0, 0, 0, 0.16),
      0 16px 48px -8px rgba(0, 0, 0, 0.1)
    `,
    transform: 'scale(1.02)',
    cursor: 'grabbing',
  },
  
  // Modal/Overlay
  modal: {
    boxShadow: `
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04)
    `,
  },
};

// Professional Typography
export const enterpriseTypography = {
  // Display metrics
  metric: {
    value: {
      fontSize: '3rem',
      fontWeight: '800',
      lineHeight: '1',
      letterSpacing: '-0.02em',
      fontFeatureSettings: '"tnum" on, "lnum" on',
    },
    label: {
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      opacity: 0.7,
    },
  },
  
  // Headers
  h1: { fontSize: '1.875rem', fontWeight: '700', lineHeight: '1.2' },
  h2: { fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.3' },
  h3: { fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.4' },
  h4: { fontSize: '1.125rem', fontWeight: '500', lineHeight: '1.5' },
  
  // Body
  body: { fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.5' },
  small: { fontSize: '0.8125rem', fontWeight: '400', lineHeight: '1.5' },
  tiny: { fontSize: '0.75rem', fontWeight: '500', lineHeight: '1.4' },
};

// Widget System
export const widgetSystem = {
  // Base widget styles
  base: {
    minHeight: 120,
    padding: 24,
    borderRadius: 12,
    background: enterpriseColors.surface[1],
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Widget sizes (grid spans)
  sizes: {
    xs: { cols: 6, rows: 1 },    // 1/4 width
    sm: { cols: 8, rows: 1 },    // 1/3 width
    md: { cols: 12, rows: 1 },   // 1/2 width
    lg: { cols: 16, rows: 1 },   // 2/3 width
    xl: { cols: 24, rows: 1 },   // Full width
    tall: { cols: 12, rows: 2 }, // Double height
  },
  
  // Resize handle
  resizeHandle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    cursor: 'se-resize',
    opacity: 0,
    transition: 'opacity 0.2s',
    '&:hover': { opacity: 1 },
  },
  
  // Quick actions overlay
  quickActions: {
    position: 'absolute',
    top: 12,
    right: 12,
    display: 'flex',
    gap: 8,
    opacity: 0,
    transition: 'opacity 0.2s',
  },
};

// Animation Presets
export const animations = {
  // Number counting animation
  countUp: {
    duration: 1000,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 100,
  },
  
  // Chart draw animation
  chartDraw: {
    duration: 1500,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    stagger: 50,
  },
  
  // Widget entrance
  widgetEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  
  // Micro interactions
  microInteraction: {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  },
};

// Interactive States
export const interactiveStates = {
  // Hover state for widgets
  widgetHover: {
    ...enterpriseElevation.hover,
    '.quick-actions': { opacity: 1 },
    '.resize-handle': { opacity: 0.5 },
    cursor: 'pointer',
  },
  
  // Active/Selected widget
  widgetActive: {
    ...enterpriseElevation.active,
    border: `2px solid ${enterpriseColors.primary[500]}`,
  },
  
  // Dragging widget
  widgetDragging: {
    ...enterpriseElevation.dragging,
    opacity: 0.8,
    zIndex: 999,
  },
  
  // Clickable metrics
  clickableMetric: {
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      color: enterpriseColors.primary[600],
      transform: 'translateX(2px)',
    },
    '&:active': {
      transform: 'translateX(0) scale(0.98)',
    },
  },
};

// Responsive breakpoints (Desktop-first)
export const breakpoints = {
  '4k': 2560,
  'desktop-xl': 1920,
  'desktop': 1440,
  'desktop-sm': 1280,
  'tablet': 1024, // Below this, show mobile version
};

// Keyboard shortcuts
export const shortcuts = {
  commandPalette: ['cmd+k', 'ctrl+k'],
  search: ['cmd+f', 'ctrl+f'],
  newTask: ['cmd+n', 'ctrl+n'],
  toggleSidebar: ['cmd+b', 'ctrl+b'],
  refreshData: ['cmd+r', 'ctrl+r'],
  switchView: {
    dashboard: ['cmd+1', 'ctrl+1'],
    tasks: ['cmd+2', 'ctrl+2'],
    team: ['cmd+3', 'ctrl+3'],
    reports: ['cmd+4', 'ctrl+4'],
  },
};

// Export utility functions
export const createWidget = (type, size = 'md', config = {}) => {
  return {
    ...widgetSystem.base,
    ...widgetSystem.sizes[size],
    ...config,
    type,
    id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
};

export const calculateGridPosition = (widgets, containerWidth) => {
  const cols = layout.grid.cols;
  const positions = [];
  
  widgets.forEach(widget => {
    // Grid positioning logic
    positions.push({
      ...widget,
      gridColumn: `span ${widget.cols}`,
      gridRow: `span ${widget.rows}`,
    });
  });
  
  return positions;
};