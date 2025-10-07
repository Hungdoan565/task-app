import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ListTodo, FolderKanban, CalendarDays, Users, Settings, Bell, ChevronDown, LogOut, Search, X, Menu } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import { useUser } from '@/contexts/UserContext'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { key: 'tasks', label: 'My Tasks', icon: ListTodo, path: '/dashboard/tasks' },
  { key: 'projects', label: 'Projects', icon: FolderKanban, path: '/dashboard/projects' },
  { key: 'calendar', label: 'Calendar', icon: CalendarDays, path: '/dashboard/calendar' },
  { key: 'team', label: 'Team', icon: Users, path: '/dashboard/team' },
  { key: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
]

export default function AppShell({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { getUserDisplayName, getUserEmail, user } = useUser()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(2)

  useEffect(() => {
    setSidebarOpen(false)
    setNotifOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false)
        setNotifOpen(false)
        setUserMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  const isActive = (path) => location.pathname.startsWith(path)

  async function handleSignOut() {
    try { await signOut(auth) } finally { navigate('/auth') }
  }

  return (
    <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 lg:z-20 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64 bg-white/90 dark:bg-warm-gray-800/90 backdrop-blur border-r border-warm-gray-200 dark:border-warm-gray-700 p-4 flex flex-col`}
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600" />
            <span className="font-semibold text-warm-gray-900 dark:text-warm-gray-50">TaskApp</span>
          </div>
          <button className="lg:hidden p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Nav */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <li key={item.key}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full inline-flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 text-warm-gray-700 dark:text-warm-gray-300'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
        {/* User summary */}
        <div className="mt-4 border-t border-warm-gray-200 dark:border-warm-gray-700 pt-4">
          <div className="flex items-center gap-3">
            <Avatar size="sm" name={getUserDisplayName()} src={user?.photoURL || undefined} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-warm-gray-900 dark:text-warm-gray-50 truncate">{getUserDisplayName()}</p>
              <p className="text-xs text-warm-gray-500 truncate">{getUserEmail()}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-warm-gray-800/60 backdrop-blur border-b border-warm-gray-200 dark:border-warm-gray-700">
          <div className="px-4 lg:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 lg:hidden">
              <button className="p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
                <Menu className="w-5 h-5" />
              </button>
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600" />
            </div>
            <div className="flex-1 max-w-2xl">
              <button
                onClick={() => window.dispatchEvent(new Event('cmdk:toggle'))}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-gray-100 dark:bg-warm-gray-700 text-warm-gray-600 dark:text-warm-gray-300 hover:bg-warm-gray-200 dark:hover:bg-warm-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800"
                aria-label="Open global search"
              >
                <Search className="w-4 h-4" />
                <span className="flex-1 text-left truncate">Search or jump…</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/70 dark:bg-warm-gray-800/70 text-xs">Ctrl/Cmd + K</kbd>
              </button>
            </div>
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(v => !v)}
                  className="relative p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Open notifications"
                  aria-expanded={notifOpen}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-warm-gray-800 animate-pulse-glow" aria-hidden />}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-xl border border-warm-gray-200 dark:border-warm-gray-700 bg-white dark:bg-warm-gray-800 shadow-lg overflow-hidden">
                    <div className="px-4 py-2 border-b border-warm-gray-200 dark:border-warm-gray-700 text-sm font-semibold">Notifications</div>
                    <ul className="max-h-80 overflow-auto">
                      {[{ id: 'n1', title: 'New comment on "Calendar widget"', time: '2m ago' }, { id: 'n2', title: 'Task "Wireframe dashboard" due today', time: '1h ago' }].map(n => (
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
              <ThemeToggle />
              {/* User menu */}
              <div className="relative">
                <button onClick={() => setUserMenuOpen(v => !v)} className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-haspopup="menu" aria-expanded={userMenuOpen}>
                  <Avatar size="sm" name={getUserDisplayName()} src={user?.photoURL || undefined} />
                  <ChevronDown className="w-4 h-4" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-warm-gray-200 dark:border-warm-gray-700 bg-white dark:bg-warm-gray-800 shadow-lg overflow-hidden">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-warm-gray-900 dark:text-warm-gray-50 truncate">{getUserDisplayName()}</p>
                      <p className="text-xs text-warm-gray-500 truncate">{getUserEmail()}</p>
                    </div>
                    <div className="py-1">
                      <button onClick={() => { setUserMenuOpen(false); navigate('/dashboard/settings') }} className="w-full px-4 py-2 text-left text-sm hover:bg-warm-gray-50 dark:hover:bg-warm-gray-700/50 flex items-center gap-2"><Settings className="w-4 h-4" /> Settings</button>
                      <div className="my-1 border-t border-warm-gray-200 dark:border-warm-gray-700" />
                      <button onClick={() => { setUserMenuOpen(false); handleSignOut() }} className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2"><LogOut className="w-4 h-4" /> Sign Out</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Breadcrumb bar */}
          <div className="px-4 lg:px-6 py-2 border-t border-warm-gray-200 dark:border-warm-gray-700 bg-white/60 dark:bg-warm-gray-800/60">
            <Breadcrumbs />
          </div>
        </header>

        {/* Content */}
        <main className="px-4 lg:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}