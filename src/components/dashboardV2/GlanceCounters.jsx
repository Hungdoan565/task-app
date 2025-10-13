import React from 'react'

export default function GlanceCounters({ overdue=0, today=0, upcoming=0 }) {
  const Item = ({ color, label, value }) => (
    <div className="flex-1 min-w-0 rounded-xl border border-gray-200 dark:border-warm-gray-800 bg-white dark:bg-warm-gray-800 px-3 py-2 flex items-center gap-2">
      <span className={`inline-block w-2 h-2 rounded-full`} style={{ backgroundColor: color }} />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 dark:text-warm-gray-400 truncate">{label}</div>
        <div className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">{value}</div>
      </div>
    </div>
  )

  return (
    <div className="flex items-stretch gap-3">
      <Item color="#ef4444" label="Quá hạn" value={overdue} />
      <Item color="#10b981" label="Hôm nay" value={today} />
      <Item color="#22c55e" label="Sắp tới (48h)" value={upcoming} />
    </div>
  )
}
