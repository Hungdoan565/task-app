import { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Custom hook for accessibility features
 */
export const useAccessibility = () => {
  const prefersReducedMotion = useReducedMotion();
  const [focusVisible, setFocusVisible] = useState(false);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');
  
  // Detect keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setFocusVisible(true);
      }
    };
    
    const handleMouseDown = () => {
      setFocusVisible(false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
  // Screen reader announcement helper
  const announce = useCallback((message, priority = 'polite') => {
    setScreenReaderAnnouncement(message);
    // Clear after announcement
    setTimeout(() => setScreenReaderAnnouncement(''), 1000);
  }, []);
  
  // Get animation settings based on user preference
  const getAnimationSettings = useCallback(() => {
    if (prefersReducedMotion) {
      return {
        duration: 0.01,
        animate: false,
        transition: { duration: 0.01 }
      };
    }
    
    return {
      duration: 0.3,
      animate: true,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    };
  }, [prefersReducedMotion]);
  
  // Focus management helpers
  const trapFocus = useCallback((containerRef) => {
    if (!containerRef.current) return;
    
    const focusableElements = containerRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    };
    
    containerRef.current.addEventListener('keydown', handleTabKey);
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('keydown', handleTabKey);
      }
    };
  }, []);
  
  return {
    focusVisible,
    prefersReducedMotion,
    screenReaderAnnouncement,
    announce,
    getAnimationSettings,
    trapFocus
  };
};

/**
 * Custom hook for responsive features
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      setIsDesktop(width >= 1024);
      setOrientation(width > height ? 'landscape' : 'portrait');
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Touch detection
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  // Viewport-based component visibility helper
  const getResponsiveValue = useCallback((mobileValue, tabletValue, desktopValue) => {
    if (isMobile) return mobileValue;
    if (isTablet) return tabletValue;
    return desktopValue;
  }, [isMobile, isTablet]);
  
  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    orientation,
    getResponsiveValue
  };
};

/**
 * Hook for keyboard navigation
 */
export const useKeyboardNavigation = (items, options = {}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { wrap = true, orientation = 'vertical' } = options;
  
  const handleKeyDown = useCallback((e) => {
    const isNext = orientation === 'vertical' 
      ? e.key === 'ArrowDown'
      : e.key === 'ArrowRight';
    
    const isPrev = orientation === 'vertical'
      ? e.key === 'ArrowUp'
      : e.key === 'ArrowLeft';
    
    if (isNext) {
      e.preventDefault();
      setFocusedIndex(prev => {
        const next = prev + 1;
        if (next >= items.length) {
          return wrap ? 0 : prev;
        }
        return next;
      });
    } else if (isPrev) {
      e.preventDefault();
      setFocusedIndex(prev => {
        const next = prev - 1;
        if (next < 0) {
          return wrap ? items.length - 1 : 0;
        }
        return next;
      });
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusedIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setFocusedIndex(items.length - 1);
    }
  }, [items.length, wrap, orientation]);
  
  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
    getFocusProps: (index) => ({
      tabIndex: index === focusedIndex ? 0 : -1,
      'data-focused': index === focusedIndex
    })
  };
};