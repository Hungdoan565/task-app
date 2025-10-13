import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Sidebar from '@/components/dashboardV2/Sidebar'
import TopBar from '@/components/dashboardV2/TopBar'
import CommandPalette from '@/components/ui/CommandPalette'
import { useV2UIStore } from '@/store/v2UIStore'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function DashboardV2Layout({ children }) {
  const location = useLocation()
  const { sidebarOpen, closeSidebar } = useV2UIStore()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--dv2-sidebar-width', isDesktop ? (getComputedStyle(document.documentElement).getPropertyValue('--dv2-sidebar-width') || '220px') : '0px')
    }
  }, [isDesktop])

  // Track recents for Command Palette
  useEffect(() => {
    try {
      const map = {
        '/dashboard': 'Trang chủ',
        '/inbox': 'Hộp thư đến', '/tasks':'Nhiệm vụ','/notes':'Ghi chú','/projects':'Dự án','/calendar':'Lịch','/wiki':'Tài liệu/Wiki','/templates':'Mẫu','/shared':'Được chia sẻ','/recent':'Gần đây','/trash':'Thùng rác'
      }
      const label = map[location.pathname] || location.pathname
      const key = 'taskflow:v2:recents'
      const raw = localStorage.getItem(key)
      const arr = raw ? JSON.parse(raw) : []
      const next = [{ path: location.pathname, label }, ...arr.filter(i => i.path !== location.pathname)].slice(0, 10)
      localStorage.setItem(key, JSON.stringify(next))
    } catch {}
  }, [location.pathname])
  return (
<div className="min-h-screen bg-gray-50 dark:bg-warm-gray-950 p-3 sm:p-4 transition-colors duration-200">
      <div className="relative">
        {/* Fixed Sidebar */}
        <AnimatePresence>
          {!isDesktop && sidebarOpen ? (
            <motion.div
              className="fixed inset-0 z-10 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />
          ) : null}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.div
          className="fixed left-3 sm:left-4 top-3 sm:top-4 bottom-3 sm:bottom-4 z-20"
          animate={{ x: !isDesktop ? (sidebarOpen ? 0 : -300) : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          style={{ width: isDesktop ? 'auto' : '220px' }}
        >
          <Sidebar />
        </motion.div>

        {/* Content shifts by CSS var --dv2-sidebar-width */}
        <div className="relative" style={{ marginLeft: isDesktop ? 'var(--dv2-sidebar-width, 220px)' : 0 }}>
          <div className="max-w-screen-xl mx-auto px-3 sm:px-4">
            <TopBar />
            <div className="mt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
            <CommandPalette />
          </div>
        </div>

        {/* Mobile FAB for Create */}
        <button
          onClick={() => window.dispatchEvent(new Event('cmdk:open'))}
          className="lg:hidden fixed bottom-5 right-5 z-30 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-[0_6px_16px_rgba(16,185,129,0.35)] active:scale-95"
          aria-label="Tạo mới"
        >
          +
        </button>
      </div>
    </div>
  )
}
