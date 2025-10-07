// src/components/task/TaskItem.jsx
// Task item with animations and inline edit

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPencil, HiTrash, HiCheck, HiX, HiDotsVertical, HiClock, HiFlag } from 'react-icons/hi'

const PRIORITY_CONFIG = {
  high: { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', label: 'High' },
  medium: { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'Medium' },
  low: { color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-900/20', label: 'Low' }
}

const STATUS_CONFIG = {
  todo: { label: 'To do', color: 'bg-gray-500' },
  in_progress: { label: 'In progress', color: 'bg-amber-500' },
  done: { label: 'Done', color: 'bg-green-500' }
}

export default function TaskItem({ task, onToggleStatus, onUpdate, onDelete, onOpenDetail }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSaveEdit = async () => {
    const trimmed = editTitle.trim()
    if (trimmed && trimmed !== task.title) {
      await onUpdate(task.id, { title: trimmed })
    }
    setIsEditing(false)
    setEditTitle(task.title)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditTitle(task.title)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(task.id)
  }

  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium
  const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`
        group relative p-4 rounded-xl border-2 
        ${task.status === 'done' 
          ? 'border-green-200 dark:border-green-800/30 bg-green-50/50 dark:bg-green-900/10' 
          : 'border-warm-gray-200 dark:border-warm-gray-700/50 bg-white dark:bg-warm-gray-800/50'
        }
        backdrop-blur-sm shadow-sm hover:shadow-md
        transition-all duration-300
      `}
    >
      <div className="flex items-start gap-3">
        {/* Status Indicator */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleStatus(task)}
          className="mt-1 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800 rounded-full"
          title="Toggle status"
          aria-label="Toggle status"
        >
          <div className={`w-4 h-4 rounded-full ${status.color} ring-2 ring-offset-2 ring-offset-transparent hover:ring-offset-white dark:hover:ring-offset-warm-gray-800 hover:ring-current transition-all duration-200`} />
        </motion.button>

        {/* Content */}
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit()
                  if (e.key === 'Escape') handleCancelEdit()
                }}
                autoFocus
                className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-warm-gray-900 border-2 border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveEdit}
                className="p-1.5 rounded-lg text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
                aria-label="Save"
              >
                <HiCheck className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancelEdit}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
                aria-label="Cancel edit"
              >
                <HiX className="w-4 h-4" />
              </motion.button>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between">
                <h3 
                  className={`font-medium text-warm-gray-900 dark:text-warm-gray-50 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                    task.status === 'done' ? 'line-through opacity-60' : ''
                  }`}
                  onClick={() => onOpenDetail(task)}
                >
                  {task.title}
                </h3>
                
                {/* Actions - hidden by default, shown on hover */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 rounded-lg text-warm-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
                    aria-label="Edit task"
                  >
                    <HiPencil className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-1.5 rounded-lg text-warm-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
                    aria-label="Delete task"
                  >
                    <HiTrash className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-3 mt-2">
                {/* Priority */}
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${priority.bg} ${priority.color}`}>
                  <HiFlag className="w-3 h-3" />
                  {priority.label}
                </span>

                {/* Status */}
                <span className="text-xs text-warm-gray-500 dark:text-warm-gray-400">
                  {status.label}
                </span>

                {/* Description indicator */}
                {task.description && (
                  <span className="text-xs text-warm-gray-400 dark:text-warm-gray-500">
                    Has description
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}