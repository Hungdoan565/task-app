import React from 'react'
import { motion } from 'framer-motion'

export default function StatsCard({ title, value, subtitle, icon: Icon, color = '#16a34a' }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 dark:text-warm-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-warm-gray-50">{value}</p>
          {subtitle && <p className="text-xs mt-1 text-gray-500 dark:text-warm-gray-400">{subtitle}</p>}
        </div>
        {Icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
