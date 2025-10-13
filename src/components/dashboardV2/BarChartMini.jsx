import React, { useState } from 'react'
import Tooltip from '@/components/ui/Tooltip'

export default function BarChartMini({ series = [], labels = [] }) {
  // series: [{ name, color, data: number[] }]
  const [hover, setHover] = useState(null) // {i, sIdx, x, y}
  const [hidden, setHidden] = useState(new Set())
  const max = Math.max(1, ...series.flatMap((s, si) => hidden.has(si) ? [] : s.data))

  const toggle = (idx) => {
    setHidden(prev => {
      const n = new Set(prev)
      if (n.has(idx)) {
        n.delete(idx)
      } else {
        n.add(idx)
      }
      return n
    })
  }

  return (
    <div className="w-full relative">
      {/* Legend */}
      <div className="flex items-center gap-3 mb-2">
        {series.map((s, sIdx) => (
          <Tooltip key={sIdx} content={s.name || `Series ${sIdx + 1}`} side="top">
            <button onClick={() => toggle(sIdx)} className="flex items-center gap-1 text-xs">
              <span className="inline-block w-2.5 h-2.5 rounded" style={{ background: s.color, opacity: hidden.has(sIdx) ? 0.3 : 1 }} />
              <span className={hidden.has(sIdx) ? 'text-gray-400 line-through' : 'text-gray-600'}>{s.name || `Series ${sIdx + 1}`}</span>
            </button>
          </Tooltip>
        ))}
      </div>
      <svg viewBox="0 0 360 160" className="w-full">
        <g transform="translate(30,10)">
          {/* Y-axis labels */}
          {Array.from({ length: 4 + 1 }).map((_, i) => {
            const y = 130 - (i * 120) / 4
            const v = Math.round((i * 100) / 4)
            return (
              <g key={`h-${i}`}>
                <line x1={0} x2={320} y1={y} y2={y} stroke="#E5E7EB" opacity="0.6" />
                <text x={-6} y={y + 3} textAnchor="end" className="axis-text">{v}</text>
              </g>
            )
          })}

          {labels.map((_, idx) => {
            const groupX = idx * (300 / labels.length) + 10
            const barWidth = 12
            const gap = 6
            return (
              <g key={idx} transform={`translate(${groupX},0)`}>
                {series.map((s, sIdx) => {
                  if (hidden.has(sIdx)) return null
                  const val = s.data[idx] ?? 0
                  const h = (val / max) * 120
                  const x = sIdx * (barWidth + gap)
                  const y = 130 - h
                  const isActive = hover && hover.i === idx && hover.sIdx === sIdx
                  const delay = (idx * 80) + (sIdx * 40)
                  return (
                    <rect
                      key={sIdx}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={h}
                      rx="3"
                      className="grow-bar"
                      style={{ animationDelay: `${delay}ms` }}
                      fill={s.color}
                      opacity={hover ? (isActive ? 1 : 0.25) : 0.9}
                      onMouseEnter={(e) => setHover({ i: idx, sIdx, x: groupX + x + 20, y })}
                      onMouseLeave={() => setHover(null)}
                    />
                  )
                })}
              </g>
            )
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {hover && (
        <div
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-2 text-xs bg-white dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700 text-gray-700 dark:text-warm-gray-200 px-2 py-1 rounded shadow-sm"
          style={{ left: hover.x, top: hover.y }}
        >
          <div className="font-semibold">{labels[hover.i]}</div>
          <div className="mt-0.5 space-y-0.5">
            {series.map((s, sIdx) => (
              <div key={sIdx} className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded" style={{ background: s.color }} />
                <span>{s.data[hover.i] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {labels?.length ? (
        <div className="-mt-2 grid" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0,1fr))` }}>
          {labels.map((l, i) => (
            <span key={i} className="text-[10px] text-gray-500 dark:text-warm-gray-400 text-center">{l}</span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
