import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes với conflict resolution
 * Được sử dụng bởi tất cả shadcn/ui components
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format date theo Notion-style
 * @param {Date|string} date - Date object hoặc date string
 * @param {string} format - Format type: 'relative', 'short', 'long'
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'relative') {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now - dateObj) / 1000)
  
  if (format === 'relative') {
    // Relative time (Today, Yesterday, 2 days ago, etc.)
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 172800) return 'Yesterday'
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(dateObj)
  }
  
  if (format === 'short') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(dateObj)
  }
  
  if (format === 'long') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(dateObj)
  }
  
  return dateObj.toLocaleDateString()
}

/**
 * Get initials from name cho Avatar
 */
export function getInitials(name) {
  if (!name) return '??'
  
  const words = name.trim().split(' ')
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

/**
 * Generate color từ string (cho avatars)
 */
export function generateColorFromString(str) {
  if (!str) return '#6366f1' // default indigo
  
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const colors = [
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#f59e0b', // amber
    '#10b981', // emerald
    '#3b82f6', // blue
    '#ef4444', // red
    '#14b8a6', // teal
  ]
  
  return colors[Math.abs(hash) % colors.length]
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Check if date is overdue
 */
export function isOverdue(date) {
  if (!date) return false
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj < new Date()
}

/**
 * Check if date is today
 */
export function isToday(date) {
  if (!date) return false
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  
  return dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
}
