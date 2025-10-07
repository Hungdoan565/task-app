import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, ChevronRight } from 'lucide-react'

// Simple breadcrumb generator from the URL path with a mapping to readable labels
const LABELS = {
  'dashboard': 'Dashboard',
  'tasks': 'Tasks',
  'kanban': 'Kanban',
  'calendar': 'Calendar',
  'team': 'Team',
  'profile': 'Profile',
  'settings': 'Settings'
}

export default function Breadcrumbs({ className = '' }) {
  const location = useLocation()
  const parts = location.pathname.split('/').filter(Boolean)

  const items = parts.reduce((acc, part, idx) => {
    const to = '/' + parts.slice(0, idx + 1).join('/')
    const label = LABELS[part] || part.charAt(0).toUpperCase() + part.slice(1)
    acc.push({ to, label })
    return acc
  }, [])

  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-sm text-warm-gray-600 dark:text-warm-gray-400">
        <li>
          <Link to="/dashboard" className="inline-flex items-center gap-1 hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-900 rounded px-1">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={item.to} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 opacity-60" aria-hidden />
            {idx < items.length - 1 ? (
              <Link to={item.to} className="hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-900 rounded px-1">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-warm-gray-900 dark:text-warm-gray-100">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}