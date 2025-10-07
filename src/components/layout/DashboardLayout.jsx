import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiChevronLeft, HiSearch } from 'react-icons/hi'
import { Home, LayoutGrid, Kanban, User, Cog, Bell, ChevronDown, LogOut } from 'lucide-react'
import { useUser } from '../../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import ThemeToggle from '../ui/ThemeToggle'
import { Avatar } from '../ui/Avatar'
import { trackEvent } from '@/lib/analytics'

export default function DashboardLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { getUserDisplayName, getUserEmail, getProvider, user } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try { return localStorage.getItem('dash_sidebar_collapsed') === '1' } catch (_) { return false }
  })
  useEffect(() => {
    try { localStorage.setItem('dash_sidebar_collapsed', sidebarCollapsed ? '1' : '0') } catch (_) {}
  }, [sidebarCollapsed])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  // Close sidebar on escape key and menus
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false)
        setNotifOpen(false)
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      try { trackEvent('signout_click') } catch (_) {}
      navigate('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Home', path: '/dashboard', exact: true },
    { icon: <LayoutGrid className="h-5 w-5" />, label: 'Tasks', path: '/dashboard/tasks' },
    { icon: <Kanban className="h-5 w-5" />, label: 'Kanban', path: '/dashboard/kanban' },
    { icon: <User className="h-5 w-5" />, label: 'Profile', path: '/dashboard/profile' },
    { icon: <Cog className="h-5 w-5" />, label: 'Settings', path: '/dashboard/settings' },
  ]

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path
    }
    return location.pathname.startsWith(item.path)
  }

  return (
    <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900 flex">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white dark:bg-warm-gray-800 border px-3 py-1 rounded">Skip to content</a>
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
        className={`fixed lg:relative ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64 h-full bg-white dark:bg-warm-gray-800 border-r border-warm-gray-200 dark:border-warm-gray-700 flex flex-col z-50 lg:translate-x-0`}>
        {/* Close button (mobile only) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
          aria-label="Close sidebar"
        >
          <HiX className="w-6 h-6 text-warm-gray-600 dark:text-warm-gray-400" />
        </button>
        {/* Logo/Brand */}
        <div className="p-4 border-b border-warm-gray-200 dark:border-warm-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600" />
              {!sidebarCollapsed && (
                <span className="font-semibold text-warm-gray-900 dark:text-warm-gray-50">TaskApp</span>
              )}
            </div>
            <button onClick={() => setSidebarCollapsed(v => !v)}
              className="hidden lg:inline-flex items-center justify-center p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={sidebarCollapsed ? 'Expand' : 'Collapse'}
            >
              <HiChevronLeft className={`w-5 h-5 text-warm-gray-600 dark:text-warm-gray-400 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => { try { trackEvent('dashboard_nav', { label: item.label, path: item.path }) } catch (_) {} ; navigate(item.path) }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800 ${
                    isActive(item)
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-warm-gray-700 dark:text-warm-gray-300 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700'
                  }`}
                  aria-current={isActive(item) ? 'page' : undefined}
                  title={item.label}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && <span className="font-medium truncate">{item.label}</span>}
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
      <main id="main" className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white dark:bg-warm-gray-800 border-b border-warm-gray-200 dark:border-warm-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setSidebarOpen(true); try { trackEvent('sidebar_open') } catch (_) {} }}
              className="p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
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
        {/* Desktop Topbar */}
        <div className="hidden lg:block sticky top-0 z-20 bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur border-b border-warm-gray-200 dark:border-warm-gray-700 px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-xl">
              <button
                onClick={() => window.dispatchEvent(new Event('cmdk:toggle'))}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-gray-100 dark:bg-warm-gray-700 text-warm-gray-600 dark:text-warm-gray-300 hover:bg-warm-gray-200 dark:hover:bg-warm-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
                aria-label="Open command palette"
                title="Search (Ctrl/Cmd + K)"
              >
                <HiSearch className="w-5 h-5" />
                <span className="flex-1 text-left truncate">Search or jump…</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/70 dark:bg-warm-gray-800/70 text-xs">Ctrl/Cmd + K</kbd>
              </button>
            </div>
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(v => !v)}
                  className="relative p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Open notifications"
                  aria-expanded={notifOpen}
                >
                  <Bell className="w-5 h-5 text-warm-gray-700 dark:text-warm-gray-300" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-warm-gray-800 animate-pulse-glow" aria-hidden />
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-xl border border-warm-gray-200 dark:border-warm-gray-700 bg-white dark:bg-warm-gray-800 shadow-lg overflow-hidden">
                    <div className="px-4 py-2 border-b border-warm-gray-200 dark:border-warm-gray-700 text-sm font-semibold">Notifications</div>
                    <ul className="max-h-80 overflow-auto">
                      {[{ id: 'n1', title: 'New comment on "Calendar widget"', time: '2m ago' }, { id: 'n2', title: 'Task "Wireframe dashboard" due today', time: '1h ago' }, { id: 'n3', title: 'Kanban board updated', time: 'yesterday' }].map(n => (
                        <li key={n.id} className="px-4 py-3 hover:bg-warm-gray-50 dark:hover:bg-warm-gray-700/50">
                          <p className="text-sm text-warm-gray-900 dark:text-warm-gray-100">{n.title}</p>
                          <p className="text-xs text-warm-gray-500">{n.time}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-2 text-right">
                      <button onClick={() => { setUnreadCount(0); setNotifOpen(false) }} className="text-xs text-primary-600 hover:underline">Mark all as read</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme and User */}
              <ThemeToggle />
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                >
                  <Avatar size="sm" name={getUserDisplayName()} src={user?.photoURL || undefined} />
                  <ChevronDown className="w-4 h-4 text-warm-gray-600 dark:text-warm-gray-400" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-warm-gray-200 dark:border-warm-gray-700 bg-white dark:bg-warm-gray-800 shadow-lg overflow-hidden">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-warm-gray-900 dark:text-warm-gray-50 truncate">{getUserDisplayName()}</p>
                      <p className="text-xs text-warm-gray-500 truncate">{getUserEmail()}</p>
                    </div>
                    <div className="py-1">
                      <button onClick={() => { setUserMenuOpen(false); navigate('/dashboard/profile') }} className="w-full px-4 py-2 text-left text-sm hover:bg-warm-gray-50 dark:hover:bg-warm-gray-700/50 flex items-center gap-2">
                        <User className="w-4 h-4" /> Profile
                      </button>
                      <button onClick={() => { setUserMenuOpen(false); navigate('/dashboard/settings') }} className="w-full px-4 py-2 text-left text-sm hover:bg-warm-gray-50 dark:hover:bg-warm-gray-700/50 flex items-center gap-2">
                        <Cog className="w-4 h-4" /> Settings
                      </button>
                      <div className="my-1 border-t border-warm-gray-200 dark:border-warm-gray-700" />
                      <button onClick={() => { setUserMenuOpen(false); handleSignOut() }} className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
