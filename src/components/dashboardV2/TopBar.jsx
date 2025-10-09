import React from 'react'
import { Search, Plus, Bell } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function TopBar() {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/80 dark:bg-warm-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-warm-gray-800 sticky top-0 z-10 rounded-xl">
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Tìm kiếm"
          aria-label="Tìm kiếm"
        />
      </div>
      <button className="p-2 rounded-lg bg-gray-100 dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700" aria-label="Thông báo">
        <Bell className="w-4 h-4 text-gray-600 dark:text-warm-gray-300" />
      </button>
      <ThemeToggle />
      <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold flex items-center gap-1">
        <Plus className="w-4 h-4" />
        Mới
      </button>
    </div>
  )
}
