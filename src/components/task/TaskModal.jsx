// src/components/task/TaskModal.jsx
// Task detail modal with animations

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiFlag, HiClock, HiPencil, HiCheck } from 'react-icons/hi'

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'text-gray-600' },
  { value: 'medium', label: 'Medium', color: 'text-amber-600' },
  { value: 'high', label: 'High', color: 'text-red-600' }
]

export default function TaskModal({ task, isOpen, onClose, onUpdate }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDesc, setIsEditingDesc] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  useEffect(() => {
    if (task) {
      setTitle(task.title || '')
      setDescription(task.description || '')
      setPriority(task.priority || 'medium')
    }
  }, [task])

  const handleSaveTitle = async () => {
    const trimmed = title.trim()
    if (trimmed && trimmed !== task.title) {
      await onUpdate(task.id, { title: trimmed })
    }
    setIsEditingTitle(false)
  }

  const handleSaveDescription = async () => {
    if (description !== task.description) {
      await onUpdate(task.id, { description })
    }
    setIsEditingDesc(false)
  }

  const handlePriorityChange = async (newPriority) => {
    setPriority(newPriority)
    await onUpdate(task.id, { priority: newPriority })
  }

  if (!isOpen || !task) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 max-w-2xl w-full z-50"
          >
            <div className="bg-white/95 dark:bg-warm-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-warm-gray-200 dark:border-warm-gray-700">
              {/* Header */}
              <div className="p-6 border-b border-warm-gray-200 dark:border-warm-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {isEditingTitle ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTitle()
                            if (e.key === 'Escape') {
                              setTitle(task.title)
                              setIsEditingTitle(false)
                            }
                          }}
                          autoFocus
                          className="flex-1 text-xl font-semibold bg-transparent border-b-2 border-primary-500 focus:outline-none"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSaveTitle}
                          className="p-1.5 rounded-lg text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20"
                        >
                          <HiCheck className="w-5 h-5" />
                        </motion.button>
                      </div>
                    ) : (
                      <h2 
                        onClick={() => setIsEditingTitle(true)}
                        className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 cursor-pointer hover:text-primary-600 transition-colors flex items-center gap-2 group"
                      >
                        {task.title}
                        <HiPencil className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h2>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 rounded-lg text-warm-gray-500 hover:text-warm-gray-700 dark:hover:text-warm-gray-300 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700/50 transition-colors"
                  >
                    <HiX className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-4 mt-4">
                  {/* Priority Selector */}
                  <div className="flex items-center gap-2">
                    <HiFlag className="w-4 h-4 text-warm-gray-500" />
                    <div className="flex items-center gap-1">
                      {PRIORITY_OPTIONS.map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePriorityChange(option.value)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            priority === option.value
                              ? `${option.color} bg-current/10 ring-2 ring-current/20`
                              : 'text-warm-gray-600 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700/50'
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      task.status === 'done' ? 'bg-green-500' :
                      task.status === 'in_progress' ? 'bg-amber-500' : 'bg-gray-500'
                    }`} />
                    <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                      {task.status === 'done' ? 'Done' :
                       task.status === 'in_progress' ? 'In Progress' : 'To Do'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-2">
                      Description
                    </label>
                    {isEditingDesc ? (
                      <div>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                              setDescription(task.description || '')
                              setIsEditingDesc(false)
                            }
                          }}
                          autoFocus
                          rows={4}
                          className="w-full px-4 py-2 rounded-xl bg-white dark:bg-warm-gray-900 border-2 border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none"
                          placeholder="Add a description..."
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setDescription(task.description || '')
                              setIsEditingDesc(false)
                            }}
                            className="px-4 py-2 rounded-lg text-warm-gray-600 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700/50"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSaveDescription}
                            className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                          >
                            Save
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setIsEditingDesc(true)}
                        className="min-h-[100px] p-4 rounded-xl bg-warm-gray-50 dark:bg-warm-gray-900/50 cursor-pointer hover:bg-warm-gray-100 dark:hover:bg-warm-gray-900 transition-colors"
                      >
                        {description || (
                          <span className="text-warm-gray-400">Click to add description...</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Timestamps */}
                  <div className="flex items-center gap-4 text-sm text-warm-gray-500 dark:text-warm-gray-400">
                    <span>Created {new Date(task.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}</span>
                    {task.updatedAt && (
                      <span>Updated {new Date(task.updatedAt.seconds * 1000).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}