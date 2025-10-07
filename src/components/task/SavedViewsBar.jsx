// src/components/task/SavedViewsBar.jsx
// Reusable saved views bar for tasks/search using local storage.

import React, { useMemo, useState } from 'react'
import { listViews, saveView, deleteView, getView } from '../../lib/savedViews'

export default function SavedViewsBar({ area, value, onApply, className = '' }) {
  const [selected, setSelected] = useState('')
  const [name, setName] = useState('')
  const views = useMemo(() => listViews(area), [area, selected, name])

  const applySelected = () => {
    if (!selected) return
    const v = getView(area, selected)
    if (v) onApply?.(v)
  }

  const doSave = () => {
    const n = name.trim()
    if (!n) return
    saveView(area, n, value)
    setSelected(n)
  }

  const doDelete = () => {
    if (!selected) return
    deleteView(area, selected)
    setSelected('')
  }

  return (
    <div className={`flex flex-col md:flex-row md:items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <label className="text-sm text-warm-gray-600 dark:text-warm-gray-400">Saved views</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white dark:bg-warm-gray-800 border border-warm-gray-300 dark:border-warm-gray-700 text-sm"
        >
          <option value="">Select view…</option>
          {views.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <button
          onClick={applySelected}
          disabled={!selected}
          className="px-3 py-2 rounded-lg bg-warm-gray-100 dark:bg-warm-gray-700 text-sm disabled:opacity-50"
        >Apply</button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New view name"
          className="px-3 py-2 rounded-lg bg-white dark:bg-warm-gray-800 border border-warm-gray-300 dark:border-warm-gray-700 text-sm"
        />
        <button
          onClick={doSave}
          className="px-3 py-2 rounded-lg bg-primary-600 text-white text-sm"
        >Save</button>
        <button
          onClick={doDelete}
          disabled={!selected}
          className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm disabled:opacity-50"
        >Delete</button>
      </div>
    </div>
  )
}
