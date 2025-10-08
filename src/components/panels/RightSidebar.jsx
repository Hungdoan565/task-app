// src/components/panels/RightSidebar.jsx
import React, { useMemo } from 'react'
import './RightSidebar.css'

function toDateLike(d) {
  if (!d) return null
  if (d?.toDate) return d.toDate()
  if (d?.seconds) return new Date(d.seconds * 1000)
  try { return new Date(d) } catch { return null }
}

function MiniCalendar({ tasks = [], onSelectDay, selectedDate }) {
  const today = new Date()
  const [view, setView] = React.useState({ year: today.getFullYear(), month: today.getMonth() })
  const [focusedDate, setFocusedDate] = React.useState(null)
  const year = view.year
  const month = view.month
  const first = new Date(year, month, 1)
  const startDay = (first.getDay() + 6) % 7 // week starts Mon
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Count tasks per day in current month
  const counts = new Map()
  for (const t of tasks) {
    const d = toDateLike(t?.dueDate)
    if (!d) continue
    if (d.getFullYear() !== year || d.getMonth() !== month) continue
    const day = d.getDate()
    counts.set(day, (counts.get(day) || 0) + 1)
  }

  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  const isToday = (d) =>
    !!d &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === d

  const isSelected = (d) =>
    !!d &&
    !!selectedDate &&
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month &&
    selectedDate.getDate() === d


  return (
    <div className="panel-card">
      <div className="panel-header calendar-header">
        <button className="nav-btn" onClick={() => setView(v => ({ year: v.month === 0 ? v.year-1 : v.year, month: (v.month+11)%12 }))}>{'<'}</button>
        <span className="cal-title">{new Date(year, month, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button className="nav-btn" onClick={() => setView(v => ({ year: v.month === 11 ? v.year+1 : v.year, month: (v.month+1)%12 }))}>{'>'}</button>
      </div>
      <div className="mini-cal">
        {["Mo","Tu","We","Th","Fr","Sa","Su"].map((w) => (
          <div key={w} className="mini-cal-cell mini-cal-head">{w}</div>
        ))}
        {cells.map((d, i) => {
          const isFocused = focusedDate && d && focusedDate === d
          return (
            <div
              key={i}
              className={`mini-cal-cell ${isToday(d) ? 'mini-cal-today' : ''} ${isSelected(d) ? 'mini-cal-selected' : ''} ${isFocused ? 'mini-cal-focused' : ''}`}
              onClick={() => d && onSelectDay && onSelectDay(new Date(year, month, d))}
              onKeyDown={(e) => {
                if (!d) return
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectDay && onSelectDay(new Date(year, month, d))
                } else if (e.key === 'ArrowLeft' && i % 7 > 0) {
                  const prev = cells[i - 1]
                  if (prev) setFocusedDate(prev)
                } else if (e.key === 'ArrowRight' && i % 7 < 6) {
                  const next = cells[i + 1]
                  if (next) setFocusedDate(next)
                } else if (e.key === 'ArrowUp' && i >= 7) {
                  const up = cells[i - 7]
                  if (up) setFocusedDate(up)
                } else if (e.key === 'ArrowDown' && i < cells.length - 7) {
                  const down = cells[i + 7]
                  if (down) setFocusedDate(down)
                }
              }}
              role={d ? 'button' : 'presentation'}
              tabIndex={d ? 0 : -1}
              aria-label={d ? new Date(year, month, d).toDateString() : undefined}
              aria-selected={d && isSelected(d)}
              aria-current={d && isToday(d) ? 'date' : undefined}
            >
            {d || ''}
            {!!d && counts.get(d) ? (
              <span className="mini-cal-badge" aria-label={`${counts.get(d)} tasks`}>{counts.get(d)}</span>
            ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DueSoonPanel({ tasks }) {
  const items = useMemo(() => {
    const list = (tasks || [])
      .map((t) => ({ ...t, _due: toDateLike(t.dueDate) }))
      .filter((t) => t._due && !t.completed)
      .sort((a, b) => a._due - b._due)
      .slice(0, 5)
    return list
  }, [tasks])

  return (
    <div className="panel-card">
      <div className="panel-header">Due Soon</div>
      {items.length === 0 ? (
        <div className="panel-empty">No upcoming tasks</div>
      ) : (
        <ul className="panel-list">
          {items.map((t) => (
            <li key={t.id} className="panel-item">
              <span className="dot dot-amber" />
              <span className="truncate">{t.title}</span>
              <span className="muted">{t._due?.toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ActivityPanel() {
  const items = [
    { id: 'a1', text: 'You created "New Task"' },
    { id: 'a2', text: 'No overdue tasks today 🎉' },
  ]
  return (
    <div className="panel-card">
      <div className="panel-header">Activity</div>
      <ul className="panel-list">
        {items.map((a) => (
          <li key={a.id} className="panel-item">
            <span className="dot dot-blue" />
            <span className="truncate">{a.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function RightSidebar({ tasks, onSelectDay, selectedDate }) {
  return (
    <aside className="right-panel">
      <MiniCalendar tasks={tasks} onSelectDay={onSelectDay} selectedDate={selectedDate} />
      <DueSoonPanel tasks={tasks} />
      <ActivityPanel />
    </aside>
  )
}
