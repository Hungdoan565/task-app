import React from 'react'

export default function DonutProgress({ value = 70, size = 140, stroke = 12, color = '#16a34a', label = 'Performance' }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  const dash = (pct / 100) * c

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size/2} ${size/2})`}>
          <circle cx={size/2} cy={size/2} r={r} stroke="#E5E7EB" strokeWidth={stroke} fill="none" />
          <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeDasharray={`${dash} ${c-dash}`} strokeLinecap="round" />
        </g>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-bold" fill="#111827">{pct}%</text>
      </svg>
    </div>
  )
}
