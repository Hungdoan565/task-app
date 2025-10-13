import React from 'react'

export default function NextUp({ items=[] }) {
  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">Sắp tới (48h)</h3>
      </div>
      <ul className="space-y-2">
        {items.length === 0 ? <li className="text-sm text-gray-500">Trống.</li> : items.map((i)=> (
          <li key={i.id} className="text-sm flex items-center justify-between">
            <span className="text-gray-900 dark:text-warm-gray-100">{i.title}</span>
            <span className="text-xs text-gray-500 dark:text-warm-gray-400">{i.when}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}