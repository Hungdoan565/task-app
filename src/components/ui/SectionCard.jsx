import React, { useEffect, useState } from 'react'

// Unified card with collapsible content and optional actions slot
export default function SectionCard({ id, title, actions = null, defaultOpen = true, children, className = '' }) {
  const key = `taskflow:home:card:${id}:open`
  const [open, setOpen] = useState(() => {
    try {
      const v = localStorage.getItem(key)
      return v == null ? defaultOpen : JSON.parse(v)
    } catch {
      return defaultOpen
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(open)) } catch {}
  }, [open])

  return (
    <div className={`rounded-xl border border-gray-200 dark:border-warm-gray-800 bg-white dark:bg-warm-gray-800 ${className}`}>
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">{title}</div>
        <div className="flex items-center gap-2">
          {actions}
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-xs text-gray-600 dark:text-warm-gray-300 hover:underline"
            aria-expanded={open}
            aria-controls={`section-${id}`}
          >
            {open ? 'Thu gọn' : 'Mở'}
          </button>
        </div>
      </div>
      {open && (
        <div id={`section-${id}`} className="p-4">
          {children}
        </div>
      )}
    </div>
  )
}
