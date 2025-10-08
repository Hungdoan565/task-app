// src/hooks/useHaptic.js
import { useMemo } from 'react';

export default function useHaptic() {
  const supportsVibrate = typeof window !== 'undefined' && 'vibrate' in navigator;
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const vibrate = (pattern) => {
    if (prefersReducedMotion) return;
    if (supportsVibrate) navigator.vibrate(pattern);
  };

  return {
    light: () => vibrate(10),
    medium: () => vibrate(20),
    heavy: () => vibrate([30, 20, 30]),
  };
}