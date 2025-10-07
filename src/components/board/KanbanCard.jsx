import React from 'react'
import { motion } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { HiDotsVertical, HiTrash, HiPencil, HiClock } from 'react-icons/hi'

export default function KanbanCard({ task, onClick, onDelete, isDragging = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Priority colors
  const priorityConfig = {
    low: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Low' },
    medium: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', label: 'Medium' },
    high: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', label: 'High' },
    urgent: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'Urgent' },
  }

  const priority = task.priority || 'low'
  const config = priorityConfig[priority]

  // Format date if exists
  const formatDate = (date) => {
    if (!date) return null
    const d = date instanceof Date ? date : new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`
        group relative p-4 rounded-xl 
        bg-white dark:bg-warm-gray-800 
        border border-warm-gray-200 dark:border-warm-gray-700
        shadow-sm hover:shadow-md
        transition-all cursor-pointer
        ${(isDragging || isSortableDragging) ? 'opacity-50 cursor-grabbing' : 'cursor-grab active:cursor-grabbing'}
      `}
    >
      {/* Priority Badge */}
      {priority && priority !== 'low' && (
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2 ${config.bg} ${config.text}`}>
          {config.label}
        </div>
      )}

      {/* Title */}
      <h4 className="font-medium text-warm-gray-900 dark:text-white mb-2 line-clamp-2">
        {task.title || 'Untitled Task'}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-warm-gray-600 dark:text-warm-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-warm-gray-500 dark:text-warm-gray-400">
        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <HiClock className="w-3.5 h-3.5" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}

        {/* Actions (show on hover) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
            className="p-1.5 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
            aria-label="Edit task"
          >
            <HiPencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (window.confirm('Are you sure you want to delete this task?')) {
                onDelete?.()
              }
            }}
            className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
            aria-label="Delete task"
          >
            <HiTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drag Handle Indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">
        <HiDotsVertical className="w-4 h-4 text-warm-gray-400" />
      </div>
    </motion.div>
  )
}
