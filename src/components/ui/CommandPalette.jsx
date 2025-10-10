// src/components/ui/CommandPalette.jsx
// Lightweight command palette opened with Ctrl+K / Cmd+K

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { useUser } from '@/contexts/UserContext'
import { trackEvent } from '@/lib/analytics'
import { createTask } from '@/services/taskService'

const DEFAULT_ACTIONS = [
  { id: 'goto_dashboard', label: 'Go to Dashboard', shortcut: 'D', path: '/dashboard' },
  { id: 'goto_tasks', label: 'Go to Tasks', shortcut: 'T', path: '/tasks' },
  { id: 'goto_kanban', label: 'Go to Kanban', shortcut: 'K', path: '/dashboard/kanban' },
  { id: 'goto_profile', label: 'Go to Profile', shortcut: 'P', path: '/dashboard/profile' },
  { id: 'toggle_theme', label: 'Toggle Theme (Light/Dark)', shortcut: 'U', action: 'toggle_theme' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleTheme } = useTheme()
  const { user } = useUser()

  // Open palette with Ctrl+K or Cmd+K; also listen custom events cmdk:toggle/cmdk:open
  useEffect(() => {
    const handler = (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const mod = isMac ? e.metaKey : e.ctrlKey
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
        try { trackEvent('cmdk_toggle', { open: !open, from: location.pathname }) } catch (_) {}
      }
    }
    const onToggle = () => {
      setOpen((v) => {
        try { trackEvent('cmdk_toggle', { open: !v, from: location.pathname }) } catch (_) {}
        return !v
      })
    }
    const onOpen = () => {
      setOpen(true)
      try { trackEvent('cmdk_toggle', { open: true, from: location.pathname }) } catch (_) {}
    }
    window.addEventListener('keydown', handler)
    window.addEventListener('cmdk:toggle', onToggle)
    window.addEventListener('cmdk:open', onOpen)
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('cmdk:toggle', onToggle)
      window.removeEventListener('cmdk:open', onOpen)
    }
  }, [open, location.pathname])

  const actions = useMemo(() => {
    const q = query.trim()
    const qLower = q.toLowerCase()
    let base = DEFAULT_ACTIONS
    if (qLower) base = base.filter(a => a.label.toLowerCase().includes(qLower))

    // Quick add task: if query starts with add/new/t/+
    const prefixes = ['add ', 'new ', 'task ', 't ', '+']
    let quickTitle = ''
    for (const p of prefixes) {
      if (qLower.startsWith(p.trim())) {
        quickTitle = q.slice(p.length).trim()
        break
      }
    }
    if (!quickTitle && q && !qLower.includes(' ')) {
      // If single word and user typed "+MyTask" or "t:MyTask"
      if (qLower.startsWith('t:')) quickTitle = q.slice(2)
      if (qLower.startsWith('+')) quickTitle = q.slice(1)
    }
    if (quickTitle) {
      const qa = { id: 'quick_add_task', label: `Create task: "${quickTitle}"`, shortcut: 'Enter', action: 'quick_add_task', meta: { title: quickTitle } }
      return [qa, ...base]
    }
    return base
  }, [query])

  const runAction = async (a) => {
    try { trackEvent('cmdk_action', { id: a.id }) } catch (_) {}
    if (a.action === 'toggle_theme') {
      toggleTheme()
      setOpen(false)
      return
    }
    if (a.action === 'quick_add_task') {
      const title = a?.meta?.title?.trim()
      if (title && user?.uid) {
        try {
          await createTask(user.uid, { title })
          try { trackEvent('cmdk_quick_add', { source: 'palette' }) } catch (_) {}
          navigate('/dashboard/tasks')
        } catch (_) {}
      }
      setOpen(false)
      return
    }
    if (a.path) {
      navigate(a.path)
      setOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-24 w-full max-w-xl rounded-2xl bg-white dark:bg-warm-gray-800 shadow-lg border border-warm-gray-200 dark:border-warm-gray-700 overflow-hidden"
          >
            <div className="p-3 border-b border-warm-gray-200 dark:border-warm-gray-700">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search (e.g. Tasks, Kanban, Theme)"
                className="w-full bg-transparent outline-none px-3 py-2 text-warm-gray-900 dark:text-warm-gray-50 placeholder:warm-gray-400"
                aria-label="Command palette input"
              />
            </div>
            <ul className="max-h-80 overflow-auto p-2">
              {actions.length === 0 ? (
                <li className="px-3 py-2 text-sm text-warm-gray-500">No matching commands</li>
              ) : (
                actions.map((a) => (
                  <li key={a.id}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 text-sm text-warm-gray-900 dark:text-warm-gray-50"
                      onClick={() => runAction(a)}
                    >
                      <span>{a.label}</span>
                      {a.shortcut && (
                        <kbd className="px-1.5 py-0.5 rounded bg-warm-gray-200 dark:bg-warm-gray-700 text-xs">
                          {a.shortcut}
                        </kbd>
                      )}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
