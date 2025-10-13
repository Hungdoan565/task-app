import React, { useMemo } from 'react'
import { CalendarDays, Clock } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function AgendaMini({ slots = [] }) {
  // slots: [{ time: '09:00', title }]
  const next = useMemo(() => {
    // Build Date objects for today based on HH:mm, then pick the soonest >= now
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const withDate = slots
      .map(s => {
        const [h, m] = (s.time || '').split(':').map(Number)
        if (Number.isNaN(h) || Number.isNaN(m)) return null
        const d = new Date(today)
        d.setHours(h || 0, m || 0, 0, 0)
        return { ...s, date: d }
      })
      .filter(Boolean)
      .sort((a, b) => a.date - b.date)
    const upcoming = withDate.find(s => s.date >= now)
    return upcoming || null
  }, [slots])

  const fmtTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const fmtCountdown = (d) => {
    const diffMs = d - new Date()
    if (diffMs <= 0) return 'Đang diễn ra'
    const mins = Math.round(diffMs / 60000)
    if (mins < 60) return `${mins} phút nữa`
    const hours = Math.floor(mins / 60)
    const rest = mins % 60
    return rest ? `${hours} giờ ${rest} phút nữa` : `${hours} giờ nữa`
  }

  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">Lịch hôm nay</h3>
        <NavLink to="/calendar" className="text-xs text-emerald-600 hover:underline">Xem lịch</NavLink>
      </div>

      {/* One-line next event */}
      {next ? (
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
          <CalendarDays className="w-4 h-4 text-emerald-600" />
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-900 dark:text-warm-gray-100 truncate">{next.title}</div>
            <div className="text-xs text-gray-600 dark:text-warm-gray-300 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 opacity-70" />
              <span>{fmtTime(next.date)}</span>
              <span>•</span>
              <span>{fmtCountdown(next.date)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-3 py-2 rounded-lg border border-dashed border-gray-200 dark:border-warm-gray-700 text-sm text-gray-500">
          Không có sự kiện tiếp theo hôm nay.
        </div>
      )}
    </div>
  )
}
