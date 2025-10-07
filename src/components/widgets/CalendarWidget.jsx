import React, { useMemo, useState } from 'react'
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday } from 'date-fns'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'

export default function CalendarWidget({ className = '', onSelectDate }) {
  const [current, setCurrent] = useState(new Date())

  const { days, weeks, monthLabel } = useMemo(() => {
    const start = startOfMonth(current)
    const end = endOfMonth(current)
    const gridStart = startOfWeek(start, { weekStartsOn: 1 })
    const gridEnd = endOfWeek(end, { weekStartsOn: 1 })

    const allDays = eachDayOfInterval({ start: gridStart, end: gridEnd })
    const weeks = []
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7))
    }
    return {
      days: allDays,
      weeks,
      monthLabel: format(current, 'MMMM yyyy')
    }
  }, [current])

  return (
    <div className={`rounded-2xl border border-warm-gray-200 dark:border-warm-gray-700 bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur ${className}`}>
      <div className="p-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-warm-gray-900 dark:text-warm-gray-50">{monthLabel}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrent((d) => subMonths(d, 1))}
            className="p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Previous month"
            title="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((d) => addMonths(d, 1))}
            className="p-2 rounded-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Next month"
            title="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="px-3 pb-3">
        <div className="grid grid-cols-7 text-xs text-warm-gray-500 mb-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="text-center py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weeks.map((week, wi) => (
            <React.Fragment key={wi}>
              {week.map((day) => {
                const muted = !isSameMonth(day, current)
                const today = isToday(day)
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => onSelectDate?.(day)}
                    className={`relative aspect-square rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors ${
                      today
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200/70 dark:border-primary-800/40'
                        : muted
                          ? 'text-warm-gray-400 hover:bg-warm-gray-100/50 dark:text-warm-gray-600 dark:hover:bg-warm-gray-700/50'
                          : 'text-warm-gray-800 dark:text-warm-gray-100 hover:bg-warm-gray-100/70 dark:hover:bg-warm-gray-700/70'
                    }`}
                    title={format(day, 'PPP')}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      {format(day, 'd')}
                    </span>
                  </button>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}