import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { HiPlus } from 'react-icons/hi'
import KanbanCard from './KanbanCard'

export default function KanbanColumn({ 
  id, 
  title, 
  color, 
  count, 
  tasks, 
  onTaskClick, 
  onDeleteTask,
  onCreateTask 
}) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const { setNodeRef, isOver } = useDroppable({
    id: id,
  })

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTaskTitle.trim()) {
      onCreateTask(newTaskTitle.trim())
      setNewTaskTitle('')
      setShowAddForm(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-shrink-0 w-80"
    >
      {/* Column Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <h3 className="font-semibold text-warm-gray-900 dark:text-white">
              {title}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-warm-gray-200 dark:bg-warm-gray-700 text-xs font-medium text-warm-gray-600 dark:text-warm-gray-400">
              {count}
            </span>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="p-1.5 rounded-lg hover:bg-warm-gray-200 dark:hover:bg-warm-gray-700 transition-colors"
            aria-label="Add task"
          >
            <HiPlus className="w-5 h-5 text-warm-gray-600 dark:text-warm-gray-400" />
          </button>
        </div>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={`
          min-h-[500px] rounded-2xl p-4 transition-all
          ${isOver 
            ? 'bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500' 
            : 'bg-warm-gray-100/50 dark:bg-warm-gray-800/50'
          }
        `}
      >
        {/* Add Task Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddTask}
              className="mb-3"
            >
              <input
                autoFocus
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onBlur={() => {
                  if (!newTaskTitle.trim()) setShowAddForm(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setShowAddForm(false)
                    setNewTaskTitle('')
                  }
                }}
                placeholder="Enter task title..."
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-warm-gray-900 border-2 border-primary-500 focus:outline-none text-sm"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewTaskTitle('')
                  }}
                  className="px-3 py-1.5 bg-warm-gray-200 dark:bg-warm-gray-700 hover:bg-warm-gray-300 dark:hover:bg-warm-gray-600 text-warm-gray-700 dark:text-warm-gray-300 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Tasks List */}
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            <AnimatePresence>
              {tasks.map((task) => (
                <KanbanCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick(task)}
                  onDelete={() => onDeleteTask(task.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>

        {/* Empty State */}
        {tasks.length === 0 && !showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-sm text-warm-gray-500 dark:text-warm-gray-400">
              No tasks yet
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              Add your first task
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
