/**
 * Animation Configuration
 * 
 * Adjust these settings to customize the animation behavior
 * across your application.
 */

export const animationConfig = {
  // Background animations
  background: {
    variant: 'gradient-orbs', // 'default' | 'particles' | 'blobs' | 'gradient-orbs' | 'waves' | 'mesh'
    particleCount: {
      mobile: 15,
      desktop: 25,
    },
  },

  // Form animations
  form: {
    // v2.1.1: Removed all mouse-tracking effects for smoothest experience
    // Now uses only CSS transitions - no React state updates on mouse move
    interactionEffect: 'none', // All hover effects disabled for comfort
    
    // CSS-only hover shadow (smooth, no jitter)
    enableCSSHoverShadow: true,
    
    // Removed features (caused jitter):
    enableSubtleScale: false, // ❌ Removed
    enableGlowOnHover: false, // ❌ Removed  
    enable3DParallax: false,  // ❌ Removed
    enableMouseTracking: false, // ❌ Removed
  },

  // Input animations
  input: {
    enableFloatingLabels: true,
    enableFocusLine: true,
    enableIconScale: true,
  },

  // Button animations
  button: {
    enableRipple: true,
    enableHoverScale: true,
    hoverScale: 1.02,
    enableMicroBounce: true,
  },

  // OAuth specific
  oauth: {
    timeoutDuration: 30000, // 30 seconds
    enableInstantReset: true, // Reset loading state immediately on error
    showDetailedErrors: true,
  },

  // Loading states
  loading: {
    enableSkeletons: true,
    enableSpinners: true,
    enableProgressBars: false,
  },

  // Transitions
  transitions: {
    duration: {
      fast: 0.15,
      normal: 0.3,
      slow: 0.6,
    },
    easing: 'easeOut',
  },

  // Accessibility
  accessibility: {
    respectReducedMotion: true, // Always respect user preferences
    enableKeyboardAnimations: true,
    enableFocusIndicators: true,
  },

  // Performance
  performance: {
    // Reduce animations on low-end devices
    enableAdaptiveQuality: true,
    
    // FPS target
    targetFPS: 60,
    
    // Use GPU acceleration
    useGPUAcceleration: true,
  },
}

/**
 * Get animation config with device-specific optimizations
 */
export const getOptimizedConfig = () => {
  const isMobile = window.innerWidth < 768
  const isLowEnd = navigator.hardwareConcurrency <= 4
  
  const config = { ...animationConfig }
  
  // Optimize for mobile
  if (isMobile) {
    config.background.particleCount = config.background.particleCount.mobile
    config.background.variant = 'particles' // Simpler variant for mobile
    config.form.enable3DParallax = false
  } else {
    config.background.particleCount = config.background.particleCount.desktop
  }
  
  // Optimize for low-end devices
  if (isLowEnd) {
    config.button.enableRipple = false
    config.background.particleCount = Math.min(config.background.particleCount, 15)
  }
  
  // Respect user motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    config.form.enable3DParallax = false
    config.form.enableSubtleScale = false
    config.button.enableHoverScale = false
    config.button.enableMicroBounce = false
    config.background.variant = 'mesh' // Static variant
  }
  
  return config
}

/**
 * Animation presets for quick switching
 */
export const animationPresets = {
  // Maximum visual appeal (default)
  full: {
    ...animationConfig,
    form: {
      ...animationConfig.form,
      interactionEffect: 'both',
      enable3DParallax: false,
      enableSubtleScale: true,
      enableGlowOnHover: true,
    },
  },
  
  // Minimal animations (accessibility-friendly)
  minimal: {
    ...animationConfig,
    background: {
      ...animationConfig.background,
      variant: 'mesh',
    },
    form: {
      ...animationConfig.form,
      interactionEffect: 'none',
      enable3DParallax: false,
      enableSubtleScale: false,
      enableGlowOnHover: false,
    },
    button: {
      ...animationConfig.button,
      enableRipple: false,
      enableHoverScale: false,
      enableMicroBounce: false,
    },
  },
  
  // Subtle and professional
  professional: {
    ...animationConfig,
    background: {
      ...animationConfig.background,
      variant: 'particles',
      particleCount: {
        mobile: 10,
        desktop: 15,
      },
    },
    form: {
      ...animationConfig.form,
      interactionEffect: 'glow',
      enable3DParallax: false,
      enableSubtleScale: false,
      enableGlowOnHover: true,
    },
  },
  
  // Playful and energetic
  playful: {
    ...animationConfig,
    background: {
      ...animationConfig.background,
      variant: 'blobs',
    },
    form: {
      ...animationConfig.form,
      interactionEffect: 'both',
      enable3DParallax: false,
      enableSubtleScale: true,
      scaleAmount: 1.03,
      enableGlowOnHover: true,
    },
    button: {
      ...animationConfig.button,
      enableMicroBounce: true,
      hoverScale: 1.05,
    },
  },
  
  // Performance-optimized
  performance: {
    ...animationConfig,
    background: {
      ...animationConfig.background,
      variant: 'mesh',
      particleCount: {
        mobile: 0,
        desktop: 10,
      },
    },
    form: {
      ...animationConfig.form,
      interactionEffect: 'subtle-scale',
      enable3DParallax: false,
      enableSubtleScale: true,
      scaleAmount: 1.005,
      enableGlowOnHover: false,
    },
    button: {
      ...animationConfig.button,
      enableRipple: false,
    },
  },
}

/**
 * Apply preset
 */
export const applyPreset = (presetName) => {
  if (animationPresets[presetName]) {
    return animationPresets[presetName]
  }
  return animationConfig
}