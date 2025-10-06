import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { useUser } from '../../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import ThemeToggle from '../ui/ThemeToggle'

export default function DashboardLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { getUserDisplayName, getUserEmail, getProvider } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const navItems = [
    {
      icon: '🏠',
      label: 'Home',
      path: '/dashboard',
      exact: true
    },
    {
      icon: '📝',
      label: 'Tasks',
      path: '/dashboard/tasks'
    },
    {
      icon: '📊',
      label: 'Kanban',
      path: '/dashboard/kanban'
    },
    {
      icon: '👤',
      label: 'Profile',
      path: '/dashboard/profile'
    },
    {
      icon: '⚙️',
      label: 'Settings',
      path: '/dashboard/settings'
    }
  ]

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path
    }
    return location.pathname.startsWith(item.path)
  }

  return (
    <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900 flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed lg:relative w-64 h-full bg-white dark:bg-warm-gray-800 border-r border-warm-gray-200 dark:border-warm-gray-700 flex flex-col z-50 lg:translate-x-0">
        {/* Close button (mobile only) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors"
          aria-label="Close sidebar"
        >
          <HiX className="w-6 h-6 text-warm-gray-600 dark:text-warm-gray-400" />
        </button>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-warm-gray-200 dark:border-warm-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600" />
            <span className="font-semibold text-warm-gray-900 dark:text-warm-gray-50">TaskApp</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item)
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-warm-gray-700 dark:text-warm-gray-300 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between p-3 bg-warm-gray-50 dark:bg-warm-gray-700 rounded-lg">
            <span className="text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300">Theme</span>
            <ThemeToggle />
          </div>
        </div>

        {/* User Info & Sign Out */}
        <div className="p-4 border-t border-warm-gray-200 dark:border-warm-gray-700">
          <div className="mb-3 p-3 bg-warm-gray-50 dark:bg-warm-gray-700 rounded-lg">
            <p className="text-sm font-medium text-warm-gray-900 dark:text-warm-gray-50 truncate">
              {getUserDisplayName()}
            </p>
            <p className="text-xs text-warm-gray-600 dark:text-warm-gray-400 truncate">
              {getUserEmail()}
            </p>
            <p className="text-xs text-warm-gray-500 dark:text-warm-gray-500 mt-1">
              via {getProvider()}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white dark:bg-warm-gray-800 border-b border-warm-gray-200 dark:border-warm-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors"
              aria-label="Open sidebar"
            >
              <HiMenu className="w-6 h-6 text-warm-gray-600 dark:text-warm-gray-400" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600" />
              <span className="font-semibold text-warm-gray-900 dark:text-warm-gray-50">TaskApp</span>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
