import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function resample(values, count) {
  if (!values || values.length === 0) return new Array(count).fill(0)
  if (values.length === 1) return new Array(count).fill(values[0])
  const out = []
  const step = (values.length - 1) / (count - 1)
  for (let i = 0; i < count; i++) {
    const pos = i * step
    const left = Math.floor(pos)
    const right = Math.min(values.length - 1, left + 1)
    const t = pos - left
    const v = values[left] * (1 - t) + values[right] * t
    out.push(v)
  }
  return out
}

// Simple AreaChart using inline SVG (no external deps)
export default function AreaChart({ values = [], labels = [], color = '#16a34a' }) {
  const [hoverIdx, setHoverIdx] = useState(null)

  const prevResampledRef = useRef(null)
  const SAMPLE_COUNT = 48

  const { areaD, lineD, prevLineD, points, min, max, w, h, padX, padY } = useMemo(() => {
    if (!values.length) return { areaD: '', lineD: '', prevLineD: '', points: [], min: 0, max: 0, w: 640, h: 180, padX: 24, padY: 16 }
    const w = 640
    const h = 180
    const padX = 24
    const padY = 16
    // Resample to fixed count for smooth morphing
    const resampled = resample(values, SAMPLE_COUNT)

    const min = Math.min(...resampled)
    const max = Math.max(...resampled)
    const range = Math.max(1, max - min)
    const stepX = (w - padX * 2) / (SAMPLE_COUNT - 1)
    const pts = resampled.map((v, i) => {
      const x = padX + i * stepX
      const y = padY + (h - padY * 2) * (1 - (v - min) / range)
      return [x, y]
    })

    const area = [
      `M ${pts[0][0]} ${pts[0][1]}`,
      ...pts.slice(1).map(([x, y]) => `L ${x} ${y}`),
      `L ${padX + (values.length - 1) * stepX} ${h - padY}`,
      `L ${padX} ${h - padY}`,
      'Z'
    ].join(' ')
    const line = [`M ${pts[0][0]} ${pts[0][1]}`, ...pts.slice(1).map(([x, y]) => `L ${x} ${y}`)].join(' ')

    // Previous line (for initial morph)
    const prev = prevResampledRef.current
    let prevLine = ''
    if (prev && Array.isArray(prev) && prev.length === SAMPLE_COUNT) {
      const prevMin = Math.min(...prev)
      const prevMax = Math.max(...prev)
      const prevRange = Math.max(1, prevMax - prevMin)
      const prevPts = prev.map((v, i) => {
        const x = padX + i * stepX
        const y = padY + (h - padY * 2) * (1 - (v - prevMin) / prevRange)
        return [x, y]
      })
      prevLine = [`M ${prevPts[0][0]} ${prevPts[0][1]}`, ...prevPts.slice(1).map(([x, y]) => `L ${x} ${y}`)].join(' ')
    }

    return { areaD: area, lineD: line, prevLineD: prevLine, points: pts, min, max, w, h, padX, padY }
  }, [values])

  const gridLines = 4

  const polyRef = useRef(null)
  useEffect(() => {
    if (!polyRef.current) return
    try {
      const len = polyRef.current.getTotalLength?.() || 0
      polyRef.current.style.setProperty('--dash', String(len))
    } catch {}
  }, [points])

  // Save resampled values as prev for next morph
  useEffect(() => {
    prevResampledRef.current = resample(values, SAMPLE_COUNT)
  }, [values])

  return (
    <div className="w-full relative">
      <svg viewBox="0 0 640 220" className="w-full">
        <defs>
          <linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <g transform="translate(0, 20)">
          {/* Grid lines */}
          {Array.from({ length: gridLines + 1 }).map((_, i) => {
            const y = padY + (i * (h - padY * 2)) / gridLines
            const val = (min + (max - min) * (1 - i / gridLines))
            return (
              <g key={`h-${i}`}>
                <line x1={padX} x2={w - padX} y1={y} y2={y} stroke="#E5E7EB" strokeWidth="1" opacity="0.6" />
                <text x={padX - 6} y={y + 3} textAnchor="end" className="axis-text">{Math.round(val)}</text>
              </g>
            )
          })}
          {/* Vertical grid for labels */}
          {points.map(([x], i) => (
            <line key={`v-${i}`} x1={x} x2={x} y1={padY} y2={h - padY} stroke="#F1F5F9" strokeWidth="1" opacity="0.5" />
          ))}

          {/* Area and line (morph on data change) */}
          <motion.path d={areaD} animate={{ d: areaD }} transition={{ duration: 0.6, ease: 'easeInOut' }} fill="url(#gArea)" stroke="none" opacity={hoverIdx !== null ? 0.7 : 1} />
          <motion.path
            ref={polyRef}
            className={polyRef.current ? '' : 'draw-line'}
            d={lineD}
            animate={{ d: lineD }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            opacity={hoverIdx !== null ? 0.9 : 1}
          />

          {/* Guideline */}
          {hoverIdx !== null && (
            <line x1={points[hoverIdx][0]} x2={points[hoverIdx][0]} y1={padY} y2={h - padY} stroke="#94a3b8" opacity="0.7" />
          )}

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
          style={{ left: points[hoverIdx][0], top: points[hoverIdx][1], transform: 'translate(-50%, -0.75rem) scale(1)', transition: 'transform 200ms ease-out, opacity 200ms', opacity: 1 }}
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
