import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiViewBoards, HiViewList, HiPlus, HiSearch } from 'react-icons/hi'
import { useUser } from '../contexts/UserContext'
import { createTask, updateTask, deleteTask, subscribeTasksByOwner } from '../services/taskService'
import DashboardLayout from '../components/layout/DashboardLayout'
import KanbanBoard from '../components/board/KanbanBoard'
import TasksPanel from '../components/task/TasksPanel'
import TaskModal from '../components/task/TaskModal'

export default function KanbanPage() {
  const { user, isAuthenticated } = useUser()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('kanban') // 'kanban' or 'list'
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

// Real-time listener for tasks via service subscription
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

  // Handlers
  const handleCreateTask = async (taskData) => {
    try {
      await createTask(user.uid, taskData)
    } catch (e) {
      setError('Failed to create task')
      console.error(e)
    }
  }

  const handleUpdateTask = async (id, updates) => {
    try {
      await updateTask(id, updates)
      if (selectedTask?.id === id) {
        setSelectedTask({ ...selectedTask, ...updates })
      }
    } catch (e) {
      setError('Failed to update task')
      console.error(e)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id)
      if (selectedTask?.id === id) {
        setIsModalOpen(false)
        setSelectedTask(null)
      }
    } catch (e) {
      setError('Failed to delete task')
      console.error(e)
    }
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  // Filter tasks by search
  const filteredTasks = tasks.filter(task => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      task.title.toLowerCase().includes(query) ||
      (task.description && task.description.toLowerCase().includes(query))
    )
  })

  if (!isAuthenticated) return null

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-white mb-2">
                  Tasks Board
                </h1>
                <p className="text-warm-gray-600 dark:text-warm-gray-400">
                  {tasks.length} tasks · {tasks.filter(t => t.status === 'done').length} completed
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden md:block">
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks..."
                    className="pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all w-64"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 p-1 bg-warm-gray-100 dark:bg-warm-gray-800 rounded-xl">
<button
                    onClick={() => setViewMode('kanban')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800 ${
                      viewMode === 'kanban'
                        ? 'bg-white dark:bg-warm-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-warm-gray-600 dark:text-warm-gray-400 hover:text-warm-gray-900 dark:hover:text-warm-gray-200'
                    }`}
                  >
                    <HiViewBoards className="w-5 h-5" />
                    <span className="hidden sm:inline">Kanban</span>
                  </button>
<button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800 ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-warm-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-warm-gray-600 dark:text-warm-gray-400 hover:text-warm-gray-900 dark:hover:text-warm-gray-200'
                    }`}
                  >
                    <HiViewList className="w-5 h-5" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden relative mb-4">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 focus:border-primary-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
            >
              {error}
            </motion.div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
            </div>
          ) : (
            /* View Content */
<motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-warm-gray-800 rounded-2xl shadow border border-warm-gray-200 dark:border-warm-gray-700 p-6"
            >
              {viewMode === 'kanban' ? (
                <KanbanBoard
                  tasks={filteredTasks}
                  onUpdateTask={handleUpdateTask}
                  onCreateTask={handleCreateTask}
                  onDeleteTask={handleDeleteTask}
                  onTaskClick={handleTaskClick}
                />
              ) : (
                <TasksPanel />
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTask(null)
        }}
        onUpdate={handleUpdateTask}
      />
    </DashboardLayout>
  )
}
