import React, { useEffect, useRef, useState } from 'react'

// src/components/ui/Popover.jsx
// Minimal Popover with click-outside and ESC to close
export default function Popover({ trigger, children, align = 'end', className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDocClick); document.removeEventListener('keydown', onKey) }
  }, [])

  const triggerEl = React.isValidElement(trigger)
    ? React.cloneElement(trigger, {
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        onClick: (e) => { trigger.props.onClick?.(e); setOpen((o) => !o) },
      })
    : (
        <button onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>
          {trigger}
        </button>
      )

  const alignClass = align === 'start' ? 'left-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-0'

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      {triggerEl}
      {open && (
        <div
          role="menu"
          className={`absolute z-[var(--z-popover,50)] mt-2 min-w-[12rem] rounded-md border border-gray-200 dark:border-warm-gray-800 bg-white dark:bg-warm-gray-900 text-gray-700 dark:text-warm-gray-200 shadow-lg p-1 ${alignClass}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
