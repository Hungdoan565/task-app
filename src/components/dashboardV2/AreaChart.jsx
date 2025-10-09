import React, { useMemo, useState } from 'react'

// Simple AreaChart using inline SVG (no external deps)
export default function AreaChart({ values = [], labels = [], color = '#16a34a' }) {
  const [hoverIdx, setHoverIdx] = useState(null)

  const { path, points, min, max, w, h, padX, padY } = useMemo(() => {
    if (!values.length) return { path: '', points: [], min: 0, max: 0, w: 640, h: 180, padX: 24, padY: 16 }
    const w = 640
    const h = 180
    const padX = 24
    const padY = 16
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = Math.max(1, max - min)
    const stepX = (w - padX * 2) / (values.length - 1)
    const pts = values.map((v, i) => {
      const x = padX + i * stepX
      const y = padY + (h - padY * 2) * (1 - (v - min) / range)
      return [x, y]
    })

    const d = [
      `M ${pts[0][0]} ${pts[0][1]}`,
      ...pts.slice(1).map(([x, y]) => `L ${x} ${y}`),
      `L ${padX + (values.length - 1) * stepX} ${h - padY}`,
      `L ${padX} ${h - padY}`,
      'Z'
    ].join(' ')

    return { path: d, points: pts, min, max, w, h, padX, padY }
  }, [values])

  const gridLines = 4

  return (
    <div className="w-full relative">
      <svg viewBox="0 0 640 220" className="w-full">
        <defs>
          <linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <g transform="translate(0, 20)">
          {/* Grid lines */}
          {Array.from({ length: gridLines + 1 }).map((_, i) => {
            const y = padY + (i * (h - padY * 2)) / gridLines
            return <line key={`h-${i}`} x1={padX} x2={w - padX} y1={y} y2={y} stroke="#E5E7EB" strokeWidth="1" opacity="0.6" />
          })}
          {/* Vertical grid for labels */}
          {points.map(([x], i) => (
            <line key={`v-${i}`} x1={x} x2={x} y1={padY} y2={h - padY} stroke="#F1F5F9" strokeWidth="1" opacity="0.5" />
          ))}

          {/* Area and line */}
          <path d={path} fill="url(#gArea)" stroke="none" opacity={hoverIdx !== null ? 0.7 : 1} />
          <polyline
            points={points.map(p => p.join(',')).join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            opacity={hoverIdx !== null ? 0.9 : 1}
          />

          {/* Dots */}
          {points.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={hoverIdx === i ? 4 : 2}
              fill={color}
              opacity={hoverIdx !== null && hoverIdx !== i ? 0.25 : 0.85}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            />
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {hoverIdx !== null && points[hoverIdx] && (
        <div
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-3 text-xs bg-white dark:bg-warm-gray-800 border border-gray-200 dark:border-warm-gray-700 text-gray-700 dark:text-warm-gray-200 px-2 py-1 rounded shadow-sm"
          style={{ left: points[hoverIdx][0], top: points[hoverIdx][1] }}
        >
          <div className="font-semibold">{labels?.[hoverIdx] ?? `#${hoverIdx + 1}`}</div>
          <div className="opacity-80">{values?.[hoverIdx]}</div>
        </div>
      )}

      {labels?.length ? (
        <div className="mt-1 grid grid-cols-12 text-[10px] text-gray-500 dark:text-warm-gray-400">
          {labels.map((l, i) => (
            <span key={i} className="text-center">{l}</span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
