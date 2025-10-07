import React from 'react'
import { format } from 'date-fns'

function toDateLike(dueDate) {
  if (!dueDate) return null
  if (dueDate?.toDate) return dueDate.toDate()
  if (dueDate?.seconds) return new Date(dueDate.seconds * 1000)
  try { return new Date(dueDate) } catch { return null }
}

export default function DueSoonList({ tasks = [], days = 7 }) {
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + days)
  const items = tasks.filter(t => {
    const d = toDateLike(t.dueDate)
    if (!d || isNaN(d)) return false
    return d >= now && d <= end
  }).slice(0, 8)

  if (items.length === 0) {
    return <p className="text-sm text-warm-gray-500">No tasks due in the next {days} days.</p>
  }

  return (
    <ul className="space-y-2">
      {items.map(t => (
        <li key={t.id} className="flex items-center justify-between bg-warm-gray-50 dark:bg-warm-gray-900 rounded-lg px-3 py-2">
          <span className="text-sm text-warm-gray-900 dark:text-warm-gray-50 truncate mr-3">{t.title}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-warm-gray-200 dark:bg-warm-gray-700">
            {format(toDateLike(t.dueDate), 'MMM dd')}
          </span>
        </li>
      ))}
    </ul>
  )
}