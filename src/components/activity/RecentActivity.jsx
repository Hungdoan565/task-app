import React from 'react'
import { CheckCircle2, PlusCircle, MessageSquare, Clock } from 'lucide-react'

// Simple placeholder activity list. Replace with real activity feed later.
export default function RecentActivity({ items }) {
  const data = items ?? [
    { id: 'a1', icon: <PlusCircle className="w-4 h-4 text-primary-600" />, title: 'Created task "Wireframe dashboard"', time: '2h ago' },
    { id: 'a2', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />, title: 'Completed "Setup Firebase rules"', time: '5h ago' },
    { id: 'a3', icon: <MessageSquare className="w-4 h-4 text-indigo-600" />, title: 'Commented on "Calendar widget"', time: 'yesterday' },
  ]

  return (
    <div className="rounded-2xl border border-warm-gray-200 dark:border-warm-gray-700 bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur p-4">
      <h3 className="text-sm font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-3">Recent Activity</h3>
      <ul className="space-y-2">
        {data.map(item => (
          <li key={item.id} className="flex items-start gap-3">
            <div className="mt-1">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-warm-gray-800 dark:text-warm-gray-100 truncate">{item.title}</p>
              <div className="text-xs text-warm-gray-500 inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}