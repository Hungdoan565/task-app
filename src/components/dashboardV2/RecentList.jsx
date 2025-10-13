import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function RecentList() {
  const [recents, setRecents] = useState([])
  useEffect(()=>{
    try {
      const raw = localStorage.getItem('taskflow:v2:recents')
      setRecents(raw? JSON.parse(raw) : [])
    } catch {}
  }, [])
  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">Gần đây</h3>
      </div>
      <ul className="space-y-1 text-sm">
        {recents.length===0 ? <li className="text-gray-500">Trống.</li> : recents.map((r,i)=> (
          <li key={i}><NavLink to={r.path} className="text-emerald-600 hover:underline">{r.label}</NavLink></li>
        ))}
      </ul>
    </div>
  )
}