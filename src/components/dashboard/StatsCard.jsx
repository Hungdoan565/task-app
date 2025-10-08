// src/components/dashboard/StatsCard.jsx
// Stats card component for dashboard overview (with CountUp animation)
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './StatsCard.css';

function useInView(ref, options = { threshold: 0.3 }) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options)
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, options.threshold])
  return inView
}

function useCountUp(target, startWhen, duration = 1500) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(0)
  const startRef = useRef(0)
  const fromRef = useRef(0)

  useEffect(() => {
    if (!startWhen) return
    cancelAnimationFrame(rafRef.current)
    startRef.current = performance.now()
    const from = display
    const to = Number(target) || 0
    fromRef.current = from

    const tick = (t) => {
      const elapsed = t - startRef.current
      const p = Math.min(1, elapsed / duration)
      // easeOut
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, startWhen, duration])

  return display
}

const StatsCard = ({ title, value, icon, color, trend, onClick, metricKey }) => {
  const ref = useRef(null)
  const inView = useInView(ref)
  const display = useCountUp(value, inView, 1500)
  const prefersReducedMotion = useReducedMotion()

  const iconAnim = useMemo(() => {
    if (prefersReducedMotion || !inView) return { animate: {}, transition: { duration: 0.2 } }
    switch (metricKey) {
      case 'inProgress':
        return { animate: { rotate: [0, 360] }, transition: { duration: 1.2, ease: 'linear' } }
      case 'completed':
        return { animate: { scale: [1, 1.08, 1] }, transition: { duration: 0.6, ease: 'easeInOut' } }
      case 'overdue':
        return { animate: { x: [0, -2, 2, 0] }, transition: { duration: 0.4 } }
      default:
        return { animate: {}, transition: { duration: 0.2 } }
    }
  }, [metricKey, inView, prefersReducedMotion, display])

  return (
    <motion.div
      ref={ref}
      className={`stats-card stats-card--${color}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className="stats-card__header">
        <motion.span
          key={`${metricKey}-${metricKey === 'completed' ? display : inView}`}
          className="stats-card__icon"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, ...iconAnim.animate }}
          transition={iconAnim.transition}
        >
          {icon}
        </motion.span>
        <h3 className="stats-card__title">{title}</h3>
      </div>

      <div className="stats-card__body">
        <p className="stats-card__value stat-number">{display}</p>
        {trend && (
          <span className={`stats-card__trend stats-card__trend--${trend.type}`}>
            {trend.type === 'up' ? '↑' : (trend.type === 'down' ? '↓' : '↔')} {trend.value}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
