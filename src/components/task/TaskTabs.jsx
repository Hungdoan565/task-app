import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '@/contexts/UserContext'
import useTasks from '@/hooks/useTasks'
import TasksPanel from '@/components/task/TasksPanel'

function toDateLike(dueDate) {
  if (!dueDate) return null
  if (dueDate?.toDate) return dueDate.toDate()
  if (dueDate?.seconds) return new Date(dueDate.seconds * 1000)
  try { return new Date(dueDate) } catch { return null }
}

const TABS = [
  { key: 'today', label: 'Today' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'all', label: 'All' },
]

export default function TaskTabs() {
  const { user } = useUser()
  const { tasks, loading, error, refresh } = useTasks(user?.uid, { status: 'all', includeLegacy: true })
  const [active, setActive] = useState('today')

  const counts = useMemo(() => {
    const now = new Date()
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)
    let today = 0, upcoming = 0
    for (const t of tasks) {
      const d = toDateLike(t.dueDate)
      if (!d || isNaN(d)) continue
      if (d.toDateString() === now.toDateString()) today += 1
      else if (d > now) upcoming += 1
    }
    return { today, upcoming, all: tasks.length }
  }, [tasks])

  const filtered = useMemo(() => {
    if (active === 'all') return tasks
    const now = new Date()
    return tasks.filter(t => {
      const d = toDateLike(t.dueDate)
      if (!d || isNaN(d)) return false
      if (active === 'today') return d.toDateString() === now.toDateString()
      if (active === 'upcoming') return d > now
      return true
    })
  }, [tasks, active])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {TABS.map((tab) => (
          <motion.button
            key={tab.key}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive(tab.key)}
            className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800 ${
              active === tab.key
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'bg-white dark:bg-warm-gray-800 text-warm-gray-700 dark:text-warm-gray-300 border border-warm-gray-300 dark:border-warm-gray-700 hover:border-primary-500'
            }`}
            aria-pressed={active === tab.key}
          >
            {tab.label}
            {counts[tab.key] > 0 && (
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                active === tab.key ? 'bg-white/20' : 'bg-warm-gray-100 dark:bg-warm-gray-700'
              }`}>
                {counts[tab.key]}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Delegate list rendering to existing TasksPanel with external data */}
      <TasksPanel
        externalTasks={filtered}
        externalLoading={loading}
        externalError={error}
        externalRefresh={refresh}
      />
    </div>
  )
}