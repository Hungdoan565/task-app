// src/contexts/ToastContext.jsx
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const ToastContext = createContext(null)

let idSeq = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timersRef = useRef(new Map())
  const reduce = useReducedMotion()

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const tm = timersRef.current.get(id)
    if (tm) {
      clearTimeout(tm)
      timersRef.current.delete(id)
    }
  }, [])

  const addToast = useCallback((toast) => {
    const id = `${Date.now()}_${idSeq++}`
    const t = {
      id,
      title: toast.title || '',
      description: toast.description || '',
      variant: toast.variant || 'info', // 'success' | 'error' | 'info'
      duration: typeof toast.duration === 'number' ? toast.duration : 3000,
      action: toast.action || null, // { label, onClick }
    }
    setToasts((prev) => [t, ...prev])
    if (t.duration > 0) {
      const tm = setTimeout(() => removeToast(id), t.duration)
      timersRef.current.set(id, tm)
    }
    return id
  }, [removeToast])

  const api = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast])

  const variants = {
    initial: reduce ? {} : { opacity: 0, y: 12, scale: 0.98 },
    animate: reduce ? {} : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: reduce ? {} : { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.18, ease: 'easeIn' } },
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Viewport */}
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div key={t.id} layout variants={variants} initial="initial" animate="animate" exit="exit" className={`toast toast--${t.variant}`} role="status">
              <div className="toast__content">
                {t.title && <div className="toast__title">{t.title}</div>}
                {t.description && <div className="toast__desc">{t.description}</div>}
              </div>
              <div className="toast__actions">
                {t.action && (
                  <button
                    className="toast__btn"
                    onClick={() => {
                      try { t.action.onClick?.() } finally { removeToast(t.id) }
                    }}
                  >
                    {t.action.label}
                  </button>
                )}
                <button className="toast__close" aria-label="Close" onClick={() => removeToast(t.id)}>✕</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}