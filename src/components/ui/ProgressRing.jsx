import React from 'react'

export default function ProgressRing({ value = 0, size = 64, stroke = 8, className = '', color = '#6172f3' }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} className={className} role="img" aria-label={`Progress: ${value}%`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-warm-gray-900 dark:fill-warm-gray-50 text-sm font-semibold"
      >
        {Math.round(value)}%
      </text>
    </svg>
  )
}