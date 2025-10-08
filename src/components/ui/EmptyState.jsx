// src/components/ui/EmptyState.jsx
// Reusable Empty State with illustration, typography, and primary action
import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

function TasksIllustration({ className = '' }) {
  // Simple inline SVG illustration (clipboard with list)
  return (
    <svg
      className={className}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      role="img"
      aria-label="Empty tasks illustration"
    >
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6172f3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e879f9" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect x="30" y="30" width="140" height="160" rx="16" fill="url(#grad)" opacity="0.12" />
      <rect x="45" y="45" width="110" height="20" rx="6" fill="#6172f3" opacity="0.2" />
      <rect x="45" y="80" width="110" height="10" rx="5" fill="#6172f3" opacity="0.35" />
      <rect x="45" y="100" width="80" height="10" rx="5" fill="#6172f3" opacity="0.25" />
      <rect x="45" y="120" width="100" height="10" rx="5" fill="#6172f3" opacity="0.25" />
      <rect x="45" y="140" width="70" height="10" rx="5" fill="#6172f3" opacity="0.2" />
      <circle cx="100" cy="45" r="12" fill="#fff" stroke="#6172f3" strokeWidth="2" />
      <rect x="92" y="40" width="16" height="6" rx="3" fill="#6172f3" />
    </svg>
  )
}

const ILLUSTRATIONS = {
  tasks: TasksIllustration,
}

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'Get started by creating your first item.',
  primaryAction,
  secondaryAction,
  illustration = 'tasks',
  compact = false,
}) {
  const shouldReduceMotion = useReducedMotion()
  const Illustration = ILLUSTRATIONS[illustration] || TasksIllustration

  const variants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 12 },
    show: shouldReduceMotion ? {} : { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }

  return (
    <motion.div
      className={`empty-state mx-auto text-center rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm ${
        compact ? 'max-w-md py-12 px-6' : 'max-w-xl py-20 px-8'
      }`}
      initial="hidden"
      animate="show"
      variants={variants}
      role="status"
    >
      <div className="mx-auto mb-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
        >
          <Illustration className="opacity-80 hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
      <motion.h3
        className="mb-3 text-[1.25rem] font-semibold text-[hsl(var(--foreground))]"
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } },
        }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="mx-auto mb-8 max-w-md text-base text-[hsl(var(--muted-foreground))]"
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4 } },
        }}
      >
        {description}
      </motion.p>

      <div className="flex items-center justify-center gap-3">
        {primaryAction && (
          <Button onClick={primaryAction.onClick} aria-label={primaryAction.label}>
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button variant="outline" onClick={secondaryAction.onClick} aria-label={secondaryAction.label}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </motion.div>
  )
}