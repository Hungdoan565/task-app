import React, { useState } from 'react'

export default function QuickCapture({ onAdd }) {
  const [val, setVal] = useState('')
  const submit = () => {
    const title = val.trim()
    if (!title) return
    onAdd?.({ title })
    setVal('')
  }
  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100 mb-2">Ghi nhanh</div>
      <div className="flex items-center gap-2">
        <input
          value={val}
          onChange={(e)=>setVal(e.target.value)}
          onKeyDown={(e)=>{ if (e.key==='Enter') submit() }}
          className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700 text-sm"
          placeholder="Nhập nhiệm vụ và nhấn Enter"
          aria-label="Ghi nhanh"
        />
        <button onClick={submit} className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:brightness-110">Thêm</button>
      </div>
    </div>
  )
}