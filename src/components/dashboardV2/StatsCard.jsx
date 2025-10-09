import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import useCountUp from '@/hooks/useCountUp'

export default function StatsCard({ title, value, subtitle, icon: Icon, color = '#16a34a', animate = true }) {
  const num = useMemo(() => {
    const digits = String(value).replace(/[^0-9.]/g, '')
    return Number(digits || 0)
  }, [value])
  const counted = useCountUp(num, { duration: 1000, startOnMount: animate })
  const formatted = useMemo(() => {
    if (!animate) return value
    const prefix = typeof value === 'string' && value.trim().startsWith('$') ? '$' : ''
    return prefix + new Intl.NumberFormat('en-US').format(counted)
  }, [counted, value, animate])

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4 shadow-sm hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 dark:text-warm-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-warm-gray-50">{formatted}</p>
          {subtitle && <p className="text-xs mt-1 text-gray-500 dark:text-warm-gray-400">{subtitle}</p>}
        </div>
        {Icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}15`, boxShadow: `0 4px 14px ${color}22` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
