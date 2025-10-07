import React, { useEffect, useMemo, useState } from 'react'
import { format, isToday, isPast, addDays, startOfDay } from 'date-fns'
import DashboardLayout from '../components/layout/DashboardLayout'
import useTasks from '../hooks/useTasks'
import { useUser } from '../contexts/UserContext'
import { updateTask } from '../services/taskService'
import { Timestamp } from 'firebase/firestore'
import { trackEvent } from '../lib/analytics'

export default function CalendarPage() {
  const { user, isAuthenticated } = useUser()
const { tasks, loading, error } = useTasks(user?.uid, { status: 'all', includeLegacy: true })
  const [windowDays] = useState(14) // show next 14 days
  const [mode, setMode] = useState('list') // 'list' | 'week'

  const groups = useMemo(() => {
    const map = new Map()
    const now = new Date()
    const horizon = addDays(startOfDay(now), windowDays)
tasks.forEach(t => {
      let d = null
      if (t.dueDate?.toDate) d = t.dueDate.toDate()
      else if (typeof t.dueDate === 'number') d = new Date(t.dueDate)
      else if (typeof t.dueDate === 'string') d = new Date(t.dueDate)
      else if (t.dueDate?.seconds) d = new Date(t.dueDate.seconds * 1000)
      if (!d || isNaN(d)) return
      if (d > horizon) return
      const key = format(startOfDay(d), 'yyyy-MM-dd')
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(t)
    })
    // also include today key even if empty
    const days = []
    for (let i = 0; i <= windowDays; i++) {
      const day = addDays(startOfDay(new Date()), i)
      const key = format(day, 'yyyy-MM-dd')
      days.push({ key, date: day, items: map.get(key) || [] })
    }
    return days
  }, [tasks, windowDays])

  if (!isAuthenticated) return null

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50">Calendar</h1>
              <div className="flex items-center gap-2 p-1 bg-warm-gray-100 dark:bg-warm-gray-800 rounded-xl">
                <button
                  onClick={() => setMode('list')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === 'list' ? 'bg-white dark:bg-warm-gray-700 text-primary-600 dark:text-primary-400' : 'text-warm-gray-600 dark:text-warm-gray-400'}`}
                >List</button>
                <button
                  onClick={() => setMode('week')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === 'week' ? 'bg-white dark:bg-warm-gray-700 text-primary-600 dark:text-primary-400' : 'text-warm-gray-600 dark:text-warm-gray-400'}`}
                >Week</button>
              </div>
            </div>
            <p className="text-warm-gray-600 dark:text-warm-gray-400">Plan your work by due dates (next {windowDays} days)</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">{error}</div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
            </div>
          ) : mode === 'list' ? (
            <div className="space-y-6">
              {groups.map(g => (
                <DayBlock key={g.key} date={g.date} items={g.items} />
              ))}
            </div>
          ) : (
            <WeekView groups={groups} />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

function WeekView({ groups }) {
  // groups: [{key, date, items}]
  const onDropTo = (date) => async (e) => {
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    try {
      const day = startOfDay(date)
      await updateTask(id, { dueDate: Timestamp.fromDate(day) })
      try { trackEvent('task_due_rescheduled', { id, to: format(day, 'yyyy-MM-dd') }) } catch (_) {}
    } catch (_) {}
  }
  const onDragOver = (e) => e.preventDefault()
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
      {groups.slice(0,7).map((g) => (
        <div key={g.key}
          onDragOver={onDragOver}
          onDrop={onDropTo(g.date)}
          className="min-h-[320px] bg-white dark:bg-warm-gray-800 rounded-xl border border-warm-gray-200 dark:border-warm-gray-700 p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-warm-gray-900 dark:text-warm-gray-50">{format(g.date, 'EEE dd')}</h3>
            <span className="text-xs text-warm-gray-500">{g.items.length}</span>
          </div>
          <div className="space-y-2">
            {g.items.map((t) => (
              <div key={t.id}
                   draggable
                   onDragStart={(e) => e.dataTransfer.setData('text/plain', t.id)}
                   className="text-sm bg-warm-gray-50 dark:bg-warm-gray-900 border border-warm-gray-200 dark:border-warm-gray-700 rounded-lg px-2 py-1 cursor-move">
                {t.title}
              </div>
            ))}
          </div>
          <p className="text-xs text-warm-gray-400 mt-2">Drag tasks here to reschedule</p>
        </div>
      ))}
    </div>
  )
}

function DayBlock({ date, items }) {
  const label = isToday(date) ? 'Today' : format(date, 'EEE, dd MMM yyyy')
  const past = isPast(date) && !isToday(date)
  return (
    <div className="bg-white dark:bg-warm-gray-800 rounded-xl border border-warm-gray-200 dark:border-warm-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-lg font-semibold ${past ? 'text-warm-gray-500' : 'text-warm-gray-900 dark:text-warm-gray-50'}`}>{label}</h3>
        <span className="text-sm text-warm-gray-500">{items.length} task(s)</span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-warm-gray-500">No tasks</p>
      ) : (
        <ul className="space-y-2">
          {items.map(t => (
            <li key={t.id} className="flex items-center justify-between bg-warm-gray-50 dark:bg-warm-gray-900 rounded-lg px-3 py-2">
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-warm-gray-200 dark:bg-warm-gray-700 capitalize">{t.status?.replace('_',' ') || 'todo'}</span>
                <span className="text-sm text-warm-gray-900 dark:text-warm-gray-50">{t.title}</span>
              </div>
              <DuePicker task={t} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function DuePicker({ task }) {
  const initial = task.dueDate?.toDate ? task.dueDate.toDate() : (task.dueDate?.seconds ? new Date(task.dueDate.seconds * 1000) : (task.dueDate ? new Date(task.dueDate) : null))
  const [value, setValue] = useState(initial ? initial.toISOString().slice(0,10) : '')
  const [saving, setSaving] = useState(false)
  const onChange = async (e) => {
    const v = e.target.value
    setValue(v)
    try {
      setSaving(true)
      const date = v ? new Date(v + 'T00:00:00') : null
      await updateTask(task.id, { dueDate: date ? Timestamp.fromDate(date) : null })
    } finally { setSaving(false) }
  }
  return (
    <div className="flex items-center gap-2">
      <input type="date" value={value} onChange={onChange} className="px-2 py-1 rounded border dark:bg-warm-gray-900 dark:border-warm-gray-700 text-sm" />
      {saving && <span className="text-xs text-warm-gray-500">Saving…</span>}
    </div>
  )
}
