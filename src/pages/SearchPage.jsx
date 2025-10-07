import React, { useEffect, useMemo, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import useTasks from '../hooks/useTasks'
import { useUser } from '../contexts/UserContext'
import { loadViews, saveView, getLastUsed, setLastUsed, getView } from '../lib/savedViews'
import VirtualList from '@/components/ui/VirtualList'

export default function SearchPage() {
  const { user, isAuthenticated } = useUser()
  const { tasks, loading, error } = useTasks(user?.uid, { status: 'all' })
  const [q, setQ] = useState('')
  const [views, setViews] = useState([])
  const [viewId, setViewId] = useState('')
  useEffect(() => {
    const v = loadViews('search')
    setViews(v)
    const last = getLastUsed('search')
    if (last) {
      const found = getView('search', last)
      if (found?.data?.q) {
        setQ(found.data.q)
        setViewId(found.id)
      }
    }
  }, [])
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return tasks
    return tasks.filter(t =>
      t.title?.toLowerCase().includes(s) ||
      (t.description && t.description.toLowerCase().includes(s))
    )
  }, [q, tasks])

  useEffect(() => {
    if (!q) return
    const t = setTimeout(() => {
      import('../lib/analytics').then(({ trackEvent }) => trackEvent('search_performed', { location: 'search_page', q_len: q.length })).catch(() => {})
    }, 400)
    return () => clearTimeout(t)
  }, [q])

  if (!isAuthenticated) return null

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">Search</h1>
            <div className="relative flex gap-2 items-center">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tasks by title or description..."
                className="flex-1 pl-4 pr-4 py-3 rounded-xl bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all"
              />
              <select
                value={viewId}
                onChange={(e) => {
                  const id = e.target.value
                  setViewId(id)
                  setLastUsed('search', id)
                  const v = getView('search', id)
                  if (v?.data?.q) setQ(v.data.q)
                }}
                className="px-2 py-2 rounded-lg bg-white dark:bg-warm-gray-800 border border-warm-gray-300 dark:border-warm-gray-700 text-sm"
                aria-label="Saved search"
              >
                <option value="">Saved…</option>
                {views.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
              <button
                onClick={() => {
                  const name = window.prompt('Save search as:', 'My search')
                  if (!name) return
                  const saved = saveView('search', name, { q })
                  setViews(loadViews('search'))
                  setViewId(saved.id)
                }}
                className="px-3 py-2 rounded-lg bg-warm-gray-100 dark:bg-warm-gray-700 hover:bg-warm-gray-200 dark:hover:bg-warm-gray-600 text-sm"
                aria-label="Save search"
              >
                Save
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">{error}</div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.length === 0 ? (
                <p className="text-warm-gray-600 dark:text-warm-gray-400">No results.</p>
              ) : filtered.length > 150 ? (
                <div className="h-[600px]">
                  <VirtualList
                    items={filtered}
                    rowHeight={72}
                    overscan={8}
                    renderItem={(t) => (
                      <div key={t.id} className="mb-2 last:mb-0 bg-white dark:bg-warm-gray-800 border border-warm-gray-200 dark:border-warm-gray-700 rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-warm-gray-900 dark:text-warm-gray-50">{t.title}</h3>
                            {t.description && (
                              <p className="text-xs text-warm-gray-600 dark:text-warm-gray-400 mt-1 line-clamp-2">{t.description}</p>
                            )}
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-warm-gray-100 dark:bg-warm-gray-700 capitalize">{t.status?.replace('_',' ') || 'todo'}</span>
                        </div>
                      </div>
                    )}
                  />
                </div>
              ) : (
                filtered.map(t => (
                  <div key={t.id} className="bg-white dark:bg-warm-gray-800 border border-warm-gray-200 dark:border-warm-gray-700 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-warm-gray-900 dark:text-warm-gray-50">{t.title}</h3>
                        {t.description && (
                          <p className="text-xs text-warm-gray-600 dark:text-warm-gray-400 mt-1 line-clamp-2">{t.description}</p>
                        )}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-warm-gray-100 dark:bg-warm-gray-700 capitalize">{t.status?.replace('_',' ') || 'todo'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
