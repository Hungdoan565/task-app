// src/components/task/TasksPanel.jsx
// Enhanced tasks panel with animations and polished UI

import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlus, HiSearch, HiRefresh, HiSparkles } from 'react-icons/hi'
import { useUser } from '../../contexts/UserContext'
import { createTask, deleteTask, getTasksByOwner, nextStatus, updateTask, subscribeTasksByOwner } from '../../services/taskService'
import TaskItem from './TaskItem'
import TaskModal from './TaskModal'
import { track, trackEvent } from '@/lib/analytics'

const STATUS_LABELS = {
  all: { label: 'All', color: 'bg-gray-500' },
  todo: { label: 'To do', color: 'bg-gray-500' },
  in_progress: { label: 'In progress', color: 'bg-amber-500' },
  done: { label: 'Done', color: 'bg-green-500' }
}

export default function TasksPanel() {
  const { user, isAuthenticated } = useUser()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Debounced search tracking
  useEffect(() => {
    if (!searchQuery) return
    const t = setTimeout(() => {
      trackEventSafe('tasks_search', { q_len: searchQuery.length })
      trackEventSafe('search_performed', { location: 'tasks_panel', q_len: searchQuery.length })
    }, 400)
    return () => clearTimeout(t)
  }, [searchQuery])

  function trackEventSafe(name, params = {}) {
    try { trackEventImpl(name, params) } catch (_) {}
  }
  async function trackEventImpl(name, params) {
    await trackEvent(name, params)
  }

  const filtered = useMemo(() => {
    let result = tasks
    if (filter !== 'all') {
      result = result.filter((t) => t.status === filter)
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((t) => 
        t.title.toLowerCase().includes(query) ||
        (t.description && t.description.toLowerCase().includes(query))
      )
    }
    return result
  }, [tasks, filter, searchQuery])

  const counts = useMemo(() => ({
    all: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length
  }), [tasks])

// Use unified service subscription for realtime tasks
useEffect(() => {
  if (!isAuthenticated || !user) return
  setLoading(true)

  const unsubscribe = subscribeTasksByOwner(
    user.uid,
    (items) => {
      setTasks(items)
      setError('')
      setLoading(false)
    },
    { status: 'all' }
  )

  return () => {
    try { unsubscribe?.() } catch (_) {}
  }
}, [isAuthenticated, user?.uid])

  // Manual refresh function (optional, kept for refresh button)
  async function load() {
    if (!user) return
    try {
      setLoading(true)
      const list = await getTasksByOwner(user.uid, { status: filter })
      setTasks(list)
      setError('')
    } catch (e) {
      setError('Failed to load tasks')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd(e) {
    e?.preventDefault()
    const t = title.trim()
    if (!t) return
    try {
      const newTask = await createTask(user.uid, { title: t })
      setTasks((prev) => [newTask, ...prev])
      setTitle('')
      track.cta('task_create', { source: 'tasks_panel' })
      trackEventSafe('create_task', { source: 'tasks_panel' })
    } catch (e) {
      setError('Failed to create task')
      console.error(e)
    }
  }

  async function handleToggle(task) {
    try {
      const newStatus = nextStatus(task.status)
      await updateTask(task.id, { status: newStatus })
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)))
      trackEventSafe('task_status_cycle', { from: task.status, to: newStatus })
    } catch (e) {
      setError('Failed to update task')
      console.error(e)
    }
  }

  async function handleUpdate(id, updates) {
    try {
      const prevStatus = tasks.find(t => t.id === id)?.status
      await updateTask(id, updates)
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
      if (selectedTask?.id === id) {
        setSelectedTask({ ...selectedTask, ...updates })
      }
      const kind = updates.status ? 'task_move' : 'task_update'
      trackEventSafe(kind, { id, keys: Object.keys(updates).join(',') })
      if (updates.status) {
        trackEventSafe('task_moved', { id, from: prevStatus, to: updates.status })
      }
    } catch (e) {
      setError('Failed to update task')
      console.error(e)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
      if (selectedTask?.id === id) {
        setIsModalOpen(false)
        setSelectedTask(null)
      }
      trackEventSafe('task_delete', { id })
    } catch (e) {
      setError('Failed to delete task')
      console.error(e)
    }
  }

  function handleOpenDetail(task) {
    setSelectedTask(task)
    setIsModalOpen(true)
    trackEventSafe('task_modal_open', { id: task.id })
  }

  if (!isAuthenticated) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-warm-gray-200/50 dark:border-warm-gray-700/50 p-6"
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-warm-gray-50 flex items-center gap-2">
              <HiSparkles className="w-6 h-6 text-primary-500" />
              Your Tasks
            </h3>
            <p className="text-warm-gray-600 dark:text-warm-gray-400 text-sm mt-1">
              {counts.all} total · {counts.done} completed
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(STATUS_LABELS).map(([key, config]) => (
<motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setFilter(key); trackEventSafe('tasks_filter', { filter: key }) }}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800 ${
                  filter === key
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white dark:bg-warm-gray-800 text-warm-gray-700 dark:text-warm-gray-300 border border-warm-gray-300 dark:border-warm-gray-700 hover:border-primary-500'
                }`}
                aria-pressed={filter === key}
              >
                {config.label}
                {counts[key] > 0 && (
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                    filter === key ? 'bg-white/20' : 'bg-warm-gray-100 dark:bg-warm-gray-700'
                  }`}>
                    {counts[key]}
                  </span>
                )}
              </motion.button>
            ))}
<motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { load(); trackEventSafe('tasks_refresh') }}
              className="p-2 rounded-xl bg-white dark:bg-warm-gray-800 text-warm-gray-700 dark:text-warm-gray-300 border border-warm-gray-300 dark:border-warm-gray-700 hover:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
              title="Refresh"
              aria-label="Refresh"
            >
              <HiRefresh className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Search and Add */}
        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-warm-gray-900 border-2 border-warm-gray-200 dark:border-warm-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all"
            />
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleAdd} className="flex gap-3 flex-1 lg:flex-initial">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-warm-gray-900 border-2 border-warm-gray-200 dark:border-warm-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold shadow-lg shadow-primary-500/25 flex items-center gap-2"
            >
              <HiPlus className="w-5 h-5" />
              Add
            </motion.button>
          </form>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-gray-100 dark:bg-warm-gray-800 mb-4">
              <HiSparkles className="w-8 h-8 text-warm-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-warm-gray-900 dark:text-warm-gray-50 mb-2">
              {searchQuery ? 'No tasks found' : 'No tasks yet'}
            </h4>
            <p className="text-warm-gray-600 dark:text-warm-gray-400">
              {searchQuery ? 'Try a different search term' : 'Create your first task to get started'}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {filtered.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleStatus={handleToggle}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onOpenDetail={handleOpenDetail}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Task Detail Modal */}
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTask(null)
          trackEventSafe('task_modal_close')
        }}
        onUpdate={handleUpdate}
      />
    </>
  )
}
