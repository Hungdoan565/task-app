import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// src/components/ui/Modal.jsx
// Accessible, headless Modal with focus management, ESC/overlay close
export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md', // sm | md | lg
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Autofocus dialog
    setTimeout(() => { try { dialogRef.current?.focus() } catch {} }, 0)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])

  if (!open) return null

  const sizeClass = size === 'lg' ? 'max-w-2xl' : size === 'sm' ? 'max-w-sm' : 'max-w-lg'

  return createPortal(
    <div className="fixed inset-0 z-[var(--z-modal,50)] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Dialog'}
        className={`relative w-full ${sizeClass} mx-4 rounded-xl bg-white dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-800 shadow-xl outline-none`}
        tabIndex={-1}
        ref={dialogRef}
      >
        {title ? (
          <div className="px-4 py-3 border-b border-gray-200 dark:border-warm-gray-800">
            {typeof title === 'string' ? (
              <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">{title}</h3>
            ) : (
              title
            )}
          </div>
        ) : null}
        <div className="px-4 py-3">
          {children}
        </div>
        {footer !== null && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-warm-gray-800 flex items-center justify-end gap-2">
            {footer !== undefined ? footer : (
              <>
                <button onClick={onClose} className="px-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-warm-gray-700 bg-gray-50 dark:bg-warm-gray-800">Hủy</button>
                <button onClick={onClose} className="px-3 py-1.5 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700">OK</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
