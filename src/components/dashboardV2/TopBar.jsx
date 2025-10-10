import React from 'react'
import { Search, Plus, Bell, Menu } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useToast } from '@/contexts/ToastContext'
import { useV2UIStore } from '@/store/v2UIStore'

export default function TopBar() {
  const { addToast } = useToast()
  const toggleSidebar = useV2UIStore(s => s.toggleSidebar)
  const onRipple = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const span = document.createElement('span')
    span.className = 'ripple'
    span.style.left = x + 'px'
    span.style.top = y + 'px'
    span.style.width = span.style.height = Math.max(rect.width, rect.height) + 'px'
    btn.appendChild(span)
    setTimeout(() => span.remove(), 650)
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-white/80 dark:bg-warm-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-warm-gray-800 sticky top-0 z-10 rounded-xl">
      <button className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700" aria-label="Mở sidebar" onClick={toggleSidebar}>
        <Menu className="w-5 h-5 text-gray-600 dark:text-warm-gray-300" />
      </button>
      <div className="relative dv2-search w-64 md:w-80 max-w-full">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Tìm kiếm"
          aria-label="Tìm kiếm"
        />
      </div>
      <button className="relative p-2 rounded-lg bg-gray-100 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700" aria-label="Thông báo">
        <Bell className="w-4 h-4 text-gray-600 dark:text-warm-gray-300" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full grid place-items-center">3</span>
      </button>
      <ThemeToggle />
      <button
        onClick={(e)=>{ onRipple(e); addToast({ title: 'Gợi ý', description: 'Mở Command Palette (Ctrl/⌘+K) để tạo nhanh', variant:'info' }) }}
        className="ripple-container relative px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold flex items-center gap-1"
      >
        <Plus className="w-4 h-4" />
        + Tạo mới
      </button>
      <script suppressHydrationWarning>{''}</script>
    </div>
  )
}
