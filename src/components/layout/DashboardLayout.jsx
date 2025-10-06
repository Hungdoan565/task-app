import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'

export default function DashboardLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { getUserDisplayName, getUserEmail, getProvider } = useUser()

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
      icon: '📝',
      label: 'Tasks',
      path: '/dashboard',
      exact: true
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
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-warm-gray-800 border-r border-warm-gray-200 dark:border-warm-gray-700 flex flex-col">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
