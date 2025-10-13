import React, { useEffect, useState } from 'react'
import { Bookmark, ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function PinnedCards({ items = [] }) {
  const storageKey = 'taskflow:v2:pinned:collapsed'
  const [collapsed, setCollapsed] = useState(() => {
    try { const v = localStorage.getItem(storageKey); return v != null ? JSON.parse(v) : true } catch { return true }
  })
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(collapsed)) } catch {} }, [collapsed])

  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">Đã ghim</h3>
        <button onClick={() => setCollapsed(v => !v)} className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-warm-gray-900 flex items-center gap-1" aria-expanded={!collapsed} aria-controls="pinned-content">
          <span>{collapsed ? 'Mở' : 'Thu gọn'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>
      {!collapsed && (
        <div id="pinned-content" className="grid grid-cols-2 gap-2">
          {items.length === 0 ? (
            <div className="text-sm text-gray-500">Chưa có trang ghim.</div>
          ) : (
            items.map((p, i) => (
              <NavLink key={i} to={p.to} className="rounded-lg border border-gray-200 dark:border-warm-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-warm-gray-900 flex items-center gap-2 text-sm">
                <Bookmark className="w-4 h-4 text-emerald-600" />
                <span className="text-gray-900 dark:text-warm-gray-100">{p.label}</span>
              </NavLink>
            ))
          )}
        </div>
      )}
    </div>
  )
}
