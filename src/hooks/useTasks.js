// src/hooks/useTasks.js
// Unified realtime tasks hook (owner-based) with background backfill

import { useEffect, useState } from 'react'
import { subscribeTasksByOwner, getTasksByOwner, backfillOwnerFieldForUser } from '../services/taskService'

export default function useTasks(ownerId, opts = {}) {
  const { status = 'all' } = opts
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!ownerId) {
      setTasks([])
      setLoading(false)
      return
    }

    setLoading(true)
    let unsub = null


    try {
      unsub = subscribeTasksByOwner(
        ownerId,
        (items) => {
          setTasks(items)
          setError('')
          setLoading(false)
        },
        { status }
      )
    } catch (e) {
      if (import.meta.env.DEV) console.error('subscribe owner error', e)
      setError('Failed to subscribe tasks')
      setLoading(false)
    }

    return () => {
      try { unsub?.() } catch (_) {}
    }
  }, [ownerId, status])

  const refresh = async () => {
    if (!ownerId) return
    try {
      setLoading(true)
      const items = await getTasksByOwner(ownerId, { status })
      setTasks(items)
      setError('')
    } catch (e) {
      if (import.meta.env.DEV) console.error(e)
      setError('Failed to refresh tasks')
    } finally {
      setLoading(false)
    }
  }

  return { tasks, loading, error, refresh }
}
