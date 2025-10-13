import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

// src/components/ui/Tooltip.jsx
// Lightweight tooltip (hover/focus) with portal and smooth animation
export default function Tooltip({
  content,
  children,
  side = 'right', // 'top' | 'right' | 'bottom' | 'left'
  offset = 12,
  delay = 300,
  disabled = false,
}) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const timer = useRef(null)
  const ref = useRef(null)

  const show = () => {
    if (disabled) return
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      let x = r.left + r.width / 2
      let y = r.top + r.height / 2
      if (side === 'right') x = r.right + offset
      if (side === 'left') x = r.left - offset
      if (side === 'top') y = r.top - offset
      if (side === 'bottom') y = r.bottom + offset
      // Clamp to viewport with 8px margin
      const margin = 8
      x = Math.max(margin, Math.min(window.innerWidth - margin, x))
      y = Math.max(margin, Math.min(window.innerHeight - margin, y))
      setCoords({ x, y })
      setOpen(true)
    }, delay)
  }
  const hide = () => { clearTimeout(timer.current); setOpen(false) }

  useEffect(() => {
    const onScrollOrResize = () => { if (open) hide() }
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
      clearTimeout(timer.current)
    }
  }, [open])

  const child = React.isValidElement(children)
    ? React.cloneElement(children, {
        ref,
        onMouseEnter: (e) => { children.props.onMouseEnter?.(e); show() },
        onMouseLeave: (e) => { children.props.onMouseLeave?.(e); hide() },
        onFocus: (e) => { children.props.onFocus?.(e); show() },
        onBlur: (e) => { children.props.onBlur?.(e); hide() },
      })
    : <span ref={ref}>{children}</span>

  return (
    <>
      {child}
      {!disabled && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="tt"
              initial={side==='right' ? { opacity: 0, x: -4 } : side==='left' ? { opacity: 0, x: 4 } : side==='top' ? { opacity: 0, y: 4 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={side==='right' ? { opacity: 0, x: -2 } : side==='left' ? { opacity: 0, x: 2 } : side==='top' ? { opacity: 0, y: 2 } : { opacity: 0, y: -2 }}
              transition={{ duration: 0.15, ease: [0.2, 0.6, 0.3, 1] }}
              className="pointer-events-none fixed z-[9999]"
              style={{
                left: coords.x,
                top: coords.y,
                transform: `translate(${side==='right'||side==='left' ? '0' : '-50%'}, ${side==='top'||side==='bottom' ? '0' : '-50%'})`,
                transformOrigin: side === 'right' ? 'left center' : side === 'left' ? 'right center' : side === 'top' ? 'center bottom' : 'center top'
              }}
            >
              <div className="relative rounded-lg border border-white/10 bg-[#1f2937] text-[#f9fafb] text-[13px] font-medium tracking-[0.01em] px-3 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.4)] whitespace-nowrap">
                {content}
                {/* Arrow */}
                <span
                  className="absolute bg-[#1f2937] border border-white/10 rotate-45 w-[6px] h-[6px]"
                  style={{
                    left: side==='right' ? '-4px' : side==='left' ? 'auto' : '50%',
                    right: side==='left' ? '-4px' : 'auto',
                    top: side==='bottom' ? '-4px' : side==='top' ? 'auto' : '50%',
                    bottom: side==='top' ? '-4px' : 'auto',
                    transform: side==='right'||side==='left' ? 'translateY(-50%) rotate(45deg)' : 'translateX(-50%) rotate(45deg)'
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
