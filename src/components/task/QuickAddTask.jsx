import React, { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { createTask } from '../../services/taskService'
import { trackEvent } from '../../lib/analytics'

export default function QuickAddTask({ placeholder = 'Quick add a task...', onCreated }) {
  const { user } = useUser()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e?.preventDefault()
    const t = title.trim()
    if (!t || !user?.uid) return
    try {
      setLoading(true)
      await createTask(user.uid, { title: t })
      setTitle('')
      try { trackEvent('create_task', { source: 'quick_add' }) } catch (_) {}
      onCreated?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all"
      />
      <button
        type="submit"
        disabled={!title.trim() || loading}
        className="px-4 py-3 rounded-xl bg-primary-600 text-white font-semibold shadow disabled:opacity-50"
      >
        {loading ? 'Adding…' : 'Add'}
      </button>
    </form>
  )
}
