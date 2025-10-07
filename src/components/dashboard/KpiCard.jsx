import React from 'react'
import { cn } from '@/lib/utils'
import ProgressRing from '@/components/ui/ProgressRing'

export default function KpiCard({ icon, label, value, tone = 'indigo', progress = null, className = '' }) {
  const toneMap = {
    indigo: {
      ring: 'from-indigo-500/40 to-indigo-600/50',
      badge: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300',
      color: '#6172f3'
    },
    green: {
      ring: 'from-emerald-500/40 to-emerald-600/50',
      badge: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300',
      color: '#10b981'
    },
    purple: {
      ring: 'from-purple-500/40 to-purple-600/50',
      badge: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
      color: '#8b5cf6'
    },
    orange: {
      ring: 'from-amber-500/40 to-amber-600/50',
      badge: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
      color: '#f59e0b'
    }
  }
  const t = toneMap[tone] || toneMap.indigo
  const pct = typeof progress === 'number' && isFinite(progress) ? Math.max(0, Math.min(100, progress)) : null

  return (
    <div className={cn(
      'relative rounded-xl border border-warm-gray-200 dark:border-warm-gray-700 bg-white dark:bg-warm-gray-800 p-5 overflow-hidden',
      'before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r', t.ring,
      className
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="text-2xl" aria-hidden>{icon}</div>
        <span className={cn('text-xs px-2 py-0.5 rounded-full', t.badge)}>{label}</span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50">{value}</div>
        {pct !== null && (
          <ProgressRing value={pct} size={56} stroke={6} color={t.color} className="shrink-0" />
        )}
      </div>
    </div>
  )
}
