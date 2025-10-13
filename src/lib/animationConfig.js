/**
 * Animation Configuration Utility
 * Provides optimized animation configs based on device and user preferences
 * 
 * Best Practices:
 * - Respect prefers-reduced-motion
 * - Reduce animations on mobile for better performance
 * - Use GPU-accelerated properties (transform, opacity)
 * - Keep animations under 300ms for perceived performance
 */

/**
 * Get animation config based on shouldAnimate flag
 * @param {boolean} shouldAnimate - Whether animations should be enabled
 * @returns {object} Animation configuration
 */
export const getAnimationConfig = (shouldAnimate) => {
  if (!shouldAnimate) {
    return {
      initial: {},
      animate: {},
      exit: {},
      transition: { duration: 0 }
    }
  }

  return {
    // Default configurations for different animation types
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 }
    },
    
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    
    // Stagger children animations
    staggerContainer: {
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    },
    
    staggerItem: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 }
    }
  }
}

/**
 * Get hover/tap animation based on shouldAnimate
 * @param {boolean} shouldAnimate 
 * @returns {object} Interaction animation config
 */
export const getInteractionConfig = (shouldAnimate) => {
  if (!shouldAnimate) {
    return {}
  }

  return {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  }
}

/**
 * Get scroll-triggered animation config
 * @param {boolean} shouldAnimate 
 * @returns {object} Viewport animation config
 */
export const getViewportConfig = (shouldAnimate) => {
  if (!shouldAnimate) {
    return {}
  }

  return {
    viewport: { once: true, amount: 0.3 },
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

/**
 * Performance-optimized animation variants
 * Uses only transform and opacity (GPU-accelerated)
 */
export const performanceVariants = {
  hidden: { 
    opacity: 0, 
    transform: 'translateY(20px)' 
  },
  visible: { 
    opacity: 1, 
    transform: 'translateY(0px)',
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

/**
 * Mobile-specific animation config
 * Reduced complexity for better performance
 */
export const mobileAnimationConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 } // Faster for mobile
}

/**
 * Desktop-enhanced animation config
 * More elaborate animations for powerful devices
 */
export const desktopAnimationConfig = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { 
    duration: 0.5, 
    ease: [0.25, 0.1, 0.25, 1] // Custom easing
  }
}


