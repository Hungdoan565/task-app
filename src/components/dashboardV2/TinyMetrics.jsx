import React from 'react'

export default function TinyMetrics({ streak=3, doneToday=2, doneWeek=12 }) {
  const items = [
    { label: 'Chuỗi ngày', value: `${streak}d` },
    { label: 'Hoàn thành hôm nay', value: doneToday },
    { label: 'Hoàn thành tuần này', value: doneWeek },
  ]
  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100 mb-2">Hiệu suất nhanh</div>
      <div className="grid grid-cols-3 gap-2">
        {items.map((i,idx)=> (
          <div key={idx} className="rounded-lg border border-gray-200 dark:border-warm-gray-700 p-3 text-center">
            <div className="text-xs text-gray-500">{i.label}</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-warm-gray-100">{i.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}